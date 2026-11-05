import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Users, PhoneCall, Car,
  ArrowRight, CheckCircle, Navigation
} from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function InlineBookingForm({ defaultVehicle, defaultPackage }) {
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error('Failed to load fleet:', err));

    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error('Failed to load packages:', err));
  }, []);

  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    vehicle: defaultVehicle || 'Select Vehicle',
    packageType: defaultPackage || 'Custom Trip',
  });

  useEffect(() => {
    if (defaultVehicle) {
      setFormData(prev => ({ ...prev, vehicle: defaultVehicle }));
    }
  }, [defaultVehicle]);

  useEffect(() => {
    if (defaultPackage) {
      setFormData(prev => ({ ...prev, packageType: defaultPackage }));
    }
  }, [defaultPackage]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  /* ---- Google Maps Autocomplete ---- */
  useEffect(() => {
    // No Google Maps API to load anymore
  }, []);

  /* ---- Geolocation ---- */
  const detectLocation = (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;
    setLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation not supported.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        await fallbackNominatim(latitude, longitude, isPickup);
        setLoading(false);
      },
      (err) => {
        alert('Could not get location. Please type manually.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const fallbackNominatim = async (lat, lon, isPickup) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`);
      const data = await res.json();
      const addr = data.display_name || `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
      setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: addr }));
    } catch {
      setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: `${lat.toFixed(6)}, ${lon.toFixed(6)}` }));
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert(t('Please fill in all required fields.'));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save booking');

      setIsSuccess(true);
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        setIsSuccess(false);
        setFormData({ fromLocation: '', toLocation: '', date: '', time: '', name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip' });
      }, 3000);
    } catch {
      alert(t('There was an error. Please try WhatsApp directly.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- Shared input class ---- */
  const inputCls = 'w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#1a3c34]/15 focus:ring-2 focus:ring-[#1a3c34]/20 focus:border-[#1a3c34] transition-all outline-none text-sm text-[#0f2420] placeholder:text-emerald-950/40';
  const selectCls = 'w-full px-4 py-3 rounded-xl bg-white border border-[#1a3c34]/15 focus:ring-2 focus:ring-[#1a3c34]/20 focus:border-[#1a3c34] transition-all outline-none appearance-none font-medium text-emerald-900 text-sm';

  return (
    <section className="py-8 px-4 bg-[#0f2420]" id="booking-section">
      {/* Section header */}
      <div className="max-w-[380px] mx-auto mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#d4951e]/15 border border-[#d4951e]/30 rounded-full px-4 py-1.5 mb-3">
          <Car className="w-4 h-4 text-[#f5c842]" />
          <span className="text-[#f5c842] text-xs font-bold uppercase tracking-widest">{t('Quick Booking')}</span>
        </div>
        <h2 className="text-2xl font-poppins font-extrabold text-white leading-tight">
          {t('Book Your Ride')}
        </h2>
        <p className="text-white/60 text-xs mt-1">{t('Fill in the details below and we\'ll confirm instantly')}</p>
      </div>

      <div className="max-w-[380px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#1a3c34]/10">
        {/* Gold accent strip */}
        <div className="h-1.5 bg-[#d4951e]" />

        <div className="p-5 bg-[#f5f0e8]">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-[#0f2420] mb-2">{t('Booking Confirmed!')}</h3>
              <p className="text-[#2d5a4e] text-sm mb-5">{t('Your booking details have been sent. We will contact you shortly.')}</p>
              <div className="w-full h-1.5 bg-[#ede5d5] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                  className="h-full bg-green-600"
                />
              </div>
              <p className="text-xs text-emerald-950/60 mt-3">{t('Redirecting to WhatsApp...')}</p>
            </motion.div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Pickup */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                <input
                  ref={pickupInputRef}
                  type="text"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  placeholder={t('Pickup Location')}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => detectLocation('pickup')}
                  className="absolute right-3 top-3.5 text-emerald-900/40 hover:text-[#d4951e] transition-colors"
                  title={t('Detect Location')}
                >
                  {loadingPickup
                    ? <div className="w-4 h-4 border-2 border-[#d4951e] border-t-transparent rounded-full animate-spin" />
                    : <Navigation className="w-4 h-4" />}
                </button>
              </div>

              {/* Drop */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                <input
                  ref={dropInputRef}
                  type="text"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  placeholder={t('Drop Location')}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => detectLocation('drop')}
                  className="absolute right-3 top-3.5 text-emerald-900/40 hover:text-[#d4951e] transition-colors"
                  title={t('Detect Location')}
                >
                  {loadingDrop
                    ? <div className="w-4 h-4 border-2 border-[#d4951e] border-t-transparent rounded-full animate-spin" />
                    : <Navigation className="w-4 h-4" />}
                </button>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                    className={`${inputCls} pr-4 ${!formData.date ? 'text-emerald-900/40' : 'text-[#0f2420]'}`}
                    required
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }}
                    className={`${inputCls} pr-4 ${!formData.time ? 'text-emerald-900/40' : 'text-[#0f2420]'}`}
                    required
                  />
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('Your Name')}
                    className={`${inputCls} pr-4`}
                    required
                  />
                </div>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-3.5 text-emerald-900/40 w-4 h-4" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('Phone Number')}
                    className={`${inputCls} pr-4`}
                    required
                  />
                </div>
              </div>

              {/* Vehicle & Package */}
              <div className="grid grid-cols-2 gap-3">
                <select name="vehicle" value={formData.vehicle} onChange={handleInputChange} className={selectCls}>
                  <option>{t('Select Vehicle')}</option>
                  {cars.map(c => (
                    <option key={c.id} value={c.name}>{t(c.name)} ({t(c.seats)})</option>
                  ))}
                </select>
                <select name="packageType" value={formData.packageType} onChange={handleInputChange} className={selectCls}>
                  <option>{t('Custom Trip')}</option>
                  {packages.map(p => (
                    <option key={p.id} value={p.name}>{t(p.name)}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 bg-[#d4951e] text-white font-extrabold py-4 rounded-xl shadow-lg shadow-[#d4951e]/15 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm group"
              >
                {isSubmitting ? t('PROCESSING...') : (
                  <>
                    {t('CONFIRM BOOKING')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
