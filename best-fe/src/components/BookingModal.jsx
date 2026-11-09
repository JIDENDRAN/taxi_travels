import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Navigation, Calendar, Users, Car, Map, User, Phone,
  ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Minus, Plus, Loader2, ShieldCheck,
} from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import { useCars, usePackages } from '../hooks/useCatalog';
import { SITE, TRIP_TYPES, whatsappLink } from '../data/site';

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const EMPTY = {
  tripType: 'oneway',
  fromLocation: '',
  toLocation: '',
  date: '',
  time: '',
  passengers: 2,
  vehicle: 'Select Vehicle',
  packageType: 'Custom Trip',
  name: '',
  phone: '',
};

const isValidPhone = (v) => {
  const digits = v.replace(/\D/g, '');
  return /^[+\d][\d\s-]+$/.test(v.trim()) && digits.length >= 10 && digits.length <= 13;
};

const formatDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
};

const tripLabel = (id) => TRIP_TYPES.find((t) => t.id === id)?.label || 'Custom';

export default function BookingModal({ isOpen, onClose, preset = {}, defaultVehicle, defaultPackage }) {
  const { t } = useTranslation();
  const { data: cars } = useCars();
  const { data: packages } = usePackages();

  // The provider remounts this component on every open, so state is initialised from the preset.
  const [form, setForm] = useState(() => {
    const p = preset || {};
    return {
      ...EMPTY,
      ...Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined && v !== '')),
      vehicle: p.vehicle || defaultVehicle || EMPTY.vehicle,
      packageType: p.packageType || defaultPackage || EMPTY.packageType,
    };
  });
  const [step, setStep] = useState(() => (preset?.fromLocation && preset?.toLocation && preset?.date && preset?.time ? 2 : 1));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null);
  const [locating, setLocating] = useState(null);
  const panelRef = useRef(null);

  // Lock scroll + Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    setTimeout(() => panelRef.current?.querySelector('input,select,button')?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };
  const onChange = (e) => set(e.target.name, e.target.value);

  const detectLocation = (field) => {
    if (!navigator.geolocation) {
      setErrors((e) => ({ ...e, [field]: 'Location is not supported on this device. Please type it.' }));
      return;
    }
    setLocating(field);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        let addr = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`);
          const data = await res.json();
          if (data.display_name) addr = data.display_name;
        } catch {
          /* keep coordinates */
        }
        set(field, addr);
        setLocating(null);
      },
      () => {
        setErrors((e) => ({ ...e, [field]: 'Could not detect your location. Please type it.' }));
        setLocating(null);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const validateTrip = () => {
    const e = {};
    if (!form.fromLocation.trim()) e.fromLocation = 'Enter a pickup location';
    if (!form.toLocation.trim()) e.toLocation = form.tripType === 'local' ? 'Enter the area or places to visit' : 'Enter a destination';
    if (!form.date) e.date = 'Choose a travel date';
    else if (form.date < todayISO()) e.date = 'Date cannot be in the past';
    if (!form.time) e.time = 'Choose a pickup time';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateContact = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter your name';
    if (!isValidPhone(form.phone)) e.phone = 'Enter a valid mobile number (10 digits)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (e) => {
    e.preventDefault();
    if (validateTrip()) setStep(2);
  };

  const buildWhatsAppText = (ref) =>
    [
      `*New Booking Request${ref ? ` #${ref}` : ''}*`,
      '',
      `Trip: ${tripLabel(form.tripType)}`,
      `From: ${form.fromLocation}`,
      `To: ${form.toLocation}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Passengers: ${form.passengers}`,
      `Vehicle: ${form.vehicle}`,
      `Package: ${form.packageType}`,
      '',
      '*Customer Details:*',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Booked via: ${SITE.name} website`,
    ].join('\n');

  const submit = async (e) => {
    e.preventDefault();
    if (!validateContact()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        fromLocation: form.fromLocation.trim(),
        toLocation: form.toLocation.trim(),
        date: form.date,
        time: form.time,
        name: form.name.trim(),
        phone: form.phone.trim(),
        vehicle: form.vehicle,
        packageType: form.packageType,
      };
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save booking');
      const data = await res.json().catch(() => ({}));
      setResult({ id: data?.booking?.id });
      setStep(3);
    } catch (err) {
      console.error('Error submitting booking:', err);
      setSubmitError('We could not submit your request right now. Please send it on WhatsApp or call us — we answer 24/7.');
    } finally {
      setSubmitting(false);
    }
  };

  const vehicleChosen = form.vehicle && form.vehicle !== 'Select Vehicle';
  const packageChosen = form.packageType && form.packageType !== 'Custom Trip';

  const summary = [
    { icon: Map, label: 'Trip', value: tripLabel(form.tripType) },
    { icon: MapPin, label: 'From', value: form.fromLocation },
    { icon: MapPin, label: 'To', value: form.toLocation },
    { icon: Calendar, label: 'When', value: [formatDate(form.date), formatTime(form.time)].filter(Boolean).join(' · ') },
    { icon: Users, label: 'Passengers', value: String(form.passengers) },
    { icon: Car, label: 'Vehicle', value: vehicleChosen ? form.vehicle : 'Best fit for your group' },
    ...(packageChosen ? [{ icon: Map, label: 'Package', value: form.packageType }] : []),
  ];

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} className="field-error" role="alert">
        {errors[name]}
      </p>
    ) : null;

  const fieldProps = (name) => ({
    id: `bk-${name}`,
    name,
    value: form[name],
    onChange,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/70"
          />

          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-4xl max-h-[94dvh] sm:max-h-[90vh] bg-sand-50 border-2 border-ink-900 rounded-t-[10px] sm:rounded-[8px] shadow-[var(--shadow-panel)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Summary rail (desktop) */}
            <aside className="hidden md:flex md:w-[300px] shrink-0 flex-col bg-gold-500 text-ink-950 p-7 border-r-2 border-dashed border-ink-900">
              <p className="mono text-[11px] font-bold uppercase tracking-[0.16em] bg-ink-900 text-gold-400 self-start px-2 py-1">Ride ticket</p>
              <h2 className="h-display text-3xl mt-4 mb-6">Your trip</h2>
              <dl className="space-y-4 text-sm flex-1">
                {summary.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="w-4 h-4 mt-0.5 text-ink-900 shrink-0" aria-hidden />
                    <div className="min-w-0">
                      <dt className="mono text-[10px] uppercase tracking-[0.12em] text-ink-700 font-bold">{label}</dt>
                      <dd className={`font-semibold break-words ${value ? 'text-ink-950' : 'text-ink-700 font-normal'}`}>{value || '—'}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-5 border-t-2 border-dashed border-ink-900 text-xs text-ink-900 font-medium leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-ink-900 inline mr-1.5 -mt-0.5" aria-hidden />
                No payment now. We call you to confirm the vehicle and final fare.
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0 flex flex-col min-h-0">
              <header className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b-2 border-ink-900">
                <div>
                  <h2 id="booking-title" className="h-display text-xl sm:text-2xl text-ink-900">
                    {step === 3 ? 'Request received' : 'Book your ride'}
                  </h2>
                  {step < 3 && (
                    <ol className="flex items-center gap-2 mt-2 text-xs font-semibold" aria-label="Booking steps">
                      {['Trip details', 'Your details'].map((s, i) => (
                        <li key={s} className={`flex items-center gap-2 ${step === i + 1 ? 'text-ink-900' : 'text-ink-400'}`} aria-current={step === i + 1 ? 'step' : undefined}>
                          <span className={`w-5 h-5 rounded-full grid place-items-center text-[11px] ${step > i + 1 ? 'bg-leaf-500 text-white' : step === i + 1 ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-500'}`}>
                            {step > i + 1 ? '✓' : i + 1}
                          </span>
                          {s}
                          {i === 0 && <span className="w-6 h-px bg-ink-200" aria-hidden />}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
                <button onClick={onClose} className="p-2 -mr-2 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-ink-50 cursor-pointer" aria-label="Close booking">
                  <X className="w-5 h-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5">
                {/* STEP 1 — trip */}
                {step === 1 && (
                  <form id="bk-step1" onSubmit={next} noValidate className="space-y-4">
                    <fieldset>
                      <legend className="field-label">Trip type</legend>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 border-2 border-ink-900 bg-white rounded-[6px]">
                        {TRIP_TYPES.map((tt) => (
                          <label key={tt.id} className={`text-center text-sm font-semibold py-2 rounded-[3px] cursor-pointer transition-colors ${form.tripType === tt.id ? 'bg-ink-900 text-gold-400' : 'text-ink-600 hover:text-ink-900'}`}>
                            <input type="radio" name="tripType" value={tt.id} checked={form.tripType === tt.id} onChange={onChange} className="sr-only" />
                            {tt.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'fromLocation', label: t('Pickup Location'), ph: 'e.g. Madurai Junction' },
                        { name: 'toLocation', label: form.tripType === 'local' ? 'Places to visit' : t('Drop Location'), ph: form.tripType === 'airport' ? 'e.g. Madurai Airport (IXM)' : 'e.g. Rameswaram' },
                      ].map(({ name, label, ph }) => (
                        <div key={name}>
                          <label htmlFor={`bk-${name}`} className="field-label">{label} <span className="text-gold-600">*</span></label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
                            <input type="text" autoComplete="off" placeholder={ph} className="field !pl-9 !pr-11" {...fieldProps(name)} />
                            <button type="button" onClick={() => detectLocation(name)} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg text-ink-500 hover:text-gold-600 hover:bg-gold-50 cursor-pointer" aria-label={`Use my current location for ${label}`} title="Use my location">
                              {locating === name ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                            </button>
                          </div>
                          {fieldError('name')}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="bk-date" className="field-label">Travel date <span className="text-gold-600">*</span></label>
                        <input type="date" min={todayISO()} className="field" {...fieldProps('date')} onClick={(e) => { try { e.currentTarget.showPicker(); } catch { /* unsupported */ } }} />
                        {fieldError('date')}
                      </div>
                      <div>
                        <label htmlFor="bk-time" className="field-label">Pickup time <span className="text-gold-600">*</span></label>
                        <input type="time" className="field" {...fieldProps('time')} onClick={(e) => { try { e.currentTarget.showPicker(); } catch { /* unsupported */ } }} />
                        {fieldError('time')}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-[auto_1fr] gap-4">
                      <div>
                        <span className="field-label" id="pax-label">Passengers</span>
                        <div className="flex items-center h-[2.875rem] border-2 border-ink-900 rounded-[6px] bg-white" role="group" aria-labelledby="pax-label">
                          <button type="button" onClick={() => set('passengers', Math.max(1, form.passengers - 1))} className="w-11 h-full grid place-items-center text-ink-600 hover:text-ink-900 cursor-pointer disabled:opacity-40" disabled={form.passengers <= 1} aria-label="Fewer passengers">
                            <Minus className="w-4 h-4" />
                          </button>
                          <output className="w-10 text-center font-bold text-ink-900" aria-live="polite">{form.passengers}</output>
                          <button type="button" onClick={() => set('passengers', Math.min(60, form.passengers + 1))} className="w-11 h-full grid place-items-center text-ink-600 hover:text-ink-900 cursor-pointer" aria-label="More passengers">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="bk-vehicle" className="field-label">Vehicle</label>
                        <select className="field" {...fieldProps('vehicle')}>
                          <option value="Select Vehicle">Suggest the best vehicle for me</option>
                          {cars.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}{c.seats ? ` · ${c.seats}` : ''}</option>
                          ))}
                          {vehicleChosen && !cars.some((c) => c.name === form.vehicle) && <option value={form.vehicle}>{form.vehicle}</option>}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bk-packageType" className="field-label">Tour package</label>
                      <select className="field" {...fieldProps('packageType')}>
                        <option value="Custom Trip">No package — custom trip</option>
                        {packages.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}{p.duration ? ` · ${p.duration}` : ''}</option>
                        ))}
                        {packageChosen && !packages.some((p) => p.name === form.packageType) && <option value={form.packageType}>{form.packageType}</option>}
                      </select>
                    </div>
                  </form>
                )}

                {/* STEP 2 — contact */}
                {step === 2 && (
                  <form id="bk-step2" onSubmit={submit} noValidate className="space-y-4">
                    {/* Mobile summary */}
                    <div className="md:hidden rounded-[6px] bg-gold-500 border-2 border-ink-900 p-4 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-ink-900">{tripLabel(form.tripType)} trip</span>
                        <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-gold-700 underline underline-offset-2 cursor-pointer">Edit</button>
                      </div>
                      <p className="text-ink-700 font-medium break-words">{form.fromLocation} → {form.toLocation}</p>
                      <p className="text-ink-500 text-xs mt-1">{formatDate(form.date)} · {formatTime(form.time)} · {form.passengers} pax</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="bk-name" className="field-label">{t('Your Name')} <span className="text-gold-600">*</span></label>
                        <div className="relative">
                          <User className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
                          <input type="text" autoComplete="name" placeholder="Full name" className="field !pl-9" {...fieldProps('name')} />
                        </div>
                        {fieldError('name')}
                      </div>
                      <div>
                        <label htmlFor="bk-phone" className="field-label">{t('Phone Number')} <span className="text-gold-600">*</span></label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
                          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className="field !pl-9" {...fieldProps('phone')} />
                        </div>
                        {fieldError('phone')}
                      </div>
                    </div>

                    <ul className="grid sm:grid-cols-3 gap-2 text-xs text-ink-600">
                      {['No online payment', 'Fare confirmed on call', 'Details used only for your trip'].map((x) => (
                        <li key={x} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-leaf-500 shrink-0" aria-hidden />{x}</li>
                      ))}
                    </ul>

                    {submitError && (
                      <div className="rounded-[6px] border-2 border-signal-red bg-white p-3.5 text-sm text-orange-900" role="alert">
                        <p>{submitError}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <a href={whatsappLink(buildWhatsAppText())} target="_blank" rel="noreferrer" className="btn btn-whatsapp !min-h-9 !text-sm">
                            <MessageCircle className="w-4 h-4" /> Send on WhatsApp
                          </a>
                          <a href={SITE.phoneHref} className="btn btn-outline !min-h-9 !text-sm"><Phone className="w-4 h-4" /> Call</a>
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* STEP 3 — confirmation */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-2">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-leaf-50 text-leaf-600 grid place-items-center shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-ink-900 font-bold text-lg">Thank you, {form.name.split(' ')[0]}.</p>
                        <p className="text-ink-600 text-sm mt-1">
                          Your request{result?.id ? <> <strong className="text-ink-900">#{result.id}</strong></> : ''} has reached our booking desk. We'll call you on <strong className="text-ink-900">{form.phone}</strong> to confirm the vehicle and fare.
                        </p>
                      </div>
                    </div>

                    <dl className="md:hidden mt-5 grid grid-cols-2 gap-3 text-sm rounded-[6px] bg-gold-500 border-2 border-ink-900 p-4">
                      {summary.map(({ label, value }) => (
                        <div key={label} className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">{label}</dt>
                          <dd className="font-semibold text-ink-900 break-words">{value || '—'}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 rounded-[6px] border-2 border-ink-900 bg-white p-4">
                      <p className="text-sm font-semibold text-ink-900">Want a faster reply?</p>
                      <p className="text-sm text-ink-600 mt-0.5">Send these details on WhatsApp and we'll respond right away.</p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <a href={whatsappLink(buildWhatsAppText(result?.id))} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                          <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
                        </a>
                        <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <footer className="px-5 sm:px-7 py-4 border-t-2 border-ink-900 bg-sand-100 flex items-center justify-between gap-3">
                {step === 1 && (
                  <>
                    <p className="hidden sm:block text-xs text-ink-500">Step 1 of 2 · takes under a minute</p>
                    <button type="submit" form="bk-step1" className="btn btn-dark w-full sm:w-auto">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                      <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
                    </button>
                    <button type="submit" form="bk-step2" disabled={submitting} className="btn btn-primary flex-1 sm:flex-none">
                      {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Request booking <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </>
                )}
                {step === 3 && (
                  <button type="button" onClick={onClose} className="btn btn-dark ml-auto">Done</button>
                )}
              </footer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
