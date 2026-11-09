import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import Hero from '../assets/opt/rameswaram-sunset.webp';
import { SITE } from '../data/site';
import { PageHero } from '../components/ui';

const EMPTY = { name: '', phone: '', email: '', subject: '', message: '' };

const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid mobile number';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
  if (f.message.trim().length < 5) e.message = 'Tell us a little about your trip';
  return e;
};

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // the contacts table has no subject column, so keep it with the message
          message: form.subject.trim() ? `[${form.subject.trim()}] ${form.message.trim()}` : form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const field = (name) => ({
    id: `ct-${name}`,
    name,
    value: form[name],
    onChange,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `ct-${name}-err` : undefined,
  });
  const err = (name) => (errors[name] ? <p id={`ct-${name}-err`} className="field-error" role="alert">{errors[name]}</p> : null);

  const channels = [
    { icon: Phone, label: 'Call 24/7', value: SITE.phoneDisplay, href: SITE.phoneHref, tone: 'bg-gold-500' },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with the desk', href: SITE.whatsappHref, external: true, tone: 'bg-leaf-500 text-white' },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, tone: 'bg-white' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the booking desk."
        intro="Quotes, custom itineraries or a ride in the next hour — call, WhatsApp or send a message. We're open around the clock."
        image={Hero}
        crumbs={['Contact']}
      />

      {/* Channel strip */}
      <section className="border-b-2 border-ink-900">
        <div className="container-x grid md:grid-cols-3 gap-4 py-8">
          {channels.map((c) => (
            <a key={c.label} href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})} className="group card card-hover p-5 flex items-center gap-4">
              <span className={`w-12 h-12 grid place-items-center border-2 border-ink-900 rounded-[6px] shrink-0 ${c.tone}`}><c.icon className="w-5 h-5" aria-hidden /></span>
              <span className="min-w-0 flex-1">
                <span className="mono block text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">{c.label}</span>
                <span className="block font-bold text-ink-950 break-all">{c.value}</span>
              </span>
              <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Send a message</p>
            <h2 className="h-display text-5xl text-ink-950 mt-4">Request a quote.</h2>
            <p className="text-lg text-ink-600 mt-5">Share your dates, pickup point and group size — we'll reply with options and a clear fare.</p>
            <div className="mt-8 border-2 border-ink-900 rounded-[6px] bg-white divide-y-2 divide-ink-900">
              <div className="p-5 flex gap-4">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Office</p>
                  <address className="not-italic font-semibold text-ink-900 leading-relaxed mt-0.5">{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
                </div>
              </div>
              <div className="p-5 flex gap-4">
                <Clock className="w-5 h-5 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Hours</p>
                  <p className="font-semibold text-ink-900 mt-0.5">Open 24 hours · 7 days a week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="bg-ink-900 text-gold-400 px-6 py-3 mono text-[11px] font-bold uppercase tracking-[0.16em]">Enquiry form</div>
            <div className="p-6 sm:p-9">
              {status === 'sent' ? (
                <div className="py-10 text-center" role="status">
                  <CheckCircle2 className="w-14 h-14 text-leaf-500 mx-auto" aria-hidden />
                  <h2 className="h-display text-4xl text-ink-950 mt-5">Message received.</h2>
                  <p className="text-ink-600 mt-3 max-w-md mx-auto">Thank you for contacting us. Our team will get back to you shortly on the number you shared.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline mt-8">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ct-name" className="field-label">Your name *</label>
                    <input type="text" autoComplete="name" className="field" placeholder="Full name" {...field('name')} />
                    {err('name')}
                  </div>
                  <div>
                    <label htmlFor="ct-phone" className="field-label">Phone number *</label>
                    <input type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="10-digit mobile" {...field('phone')} />
                    {err('phone')}
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="field-label">Email (optional)</label>
                    <input type="email" autoComplete="email" className="field" placeholder="you@example.com" {...field('email')} />
                    {err('email')}
                  </div>
                  <div>
                    <label htmlFor="ct-subject" className="field-label">Destination / subject</label>
                    <input type="text" className="field" placeholder="e.g. Madurai to Kodaikanal, 3 days" {...field('subject')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ct-message" className="field-label">Trip details *</label>
                    <textarea rows={5} className="field resize-y" placeholder="Pickup date and place, number of travellers, preferred vehicle…" {...field('message')} />
                    {err('message')}
                  </div>
                  {status === 'error' && (
                    <p className="sm:col-span-2 rounded-[6px] border-2 border-signal-red bg-white p-3.5 text-sm text-ink-900" role="alert">
                      We couldn't send your message. Please try again, or reach us on <a className="font-bold underline" href={SITE.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a> / <a className="font-bold underline" href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
                    </p>
                  )}
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 justify-between pt-2">
                    <p className="text-xs text-ink-500">We use your details only to respond to this enquiry.</p>
                    <button type="submit" disabled={status === 'sending'} className="btn btn-primary">
                      {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send message <Send className="w-4 h-4" /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <div className="border-2 border-ink-900 rounded-[8px] overflow-hidden h-[320px] sm:h-[420px] shadow-[6px_6px_0_0_var(--color-ink-900)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.59736881774!2d78.0934!3d9.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sPalanganatham%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing our office in Palanganatham, Madurai"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
