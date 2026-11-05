import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users, PhoneCall, Car, ArrowRight, CheckCircle, Navigation } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const BookingModal = ({ isOpen, onClose, defaultVehicle, defaultPackage }) => {
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch(`${API_BASE_URL}/api/cars`)
        .then(res => res.json())
        .then(data => setCars(data))
        .catch(err => console.error('Failed to load fleet for booking modal:', err));

      fetch(`${API_BASE_URL}/api/packages`)
        .then(res => res.json())
        .then(data => setPackages(data))
        .catch(err => console.error('Failed to load packages for booking modal:', err));
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    vehicle: defaultVehicle || 'Select Vehicle',
    packageType: defaultPackage || 'Custom Trip'
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      vehicle: defaultVehicle || 'Select Vehicle',
      packageType: defaultPackage || 'Custom Trip'
    }));
  }, [defaultVehicle, defaultPackage, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);

  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  const detectLocation = async (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`);
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            [isPickup ? 'fromLocation' : 'toLocation']: data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        } catch {
          setFormData(prev => ({
            ...prev,
            [isPickup ? 'fromLocation' : 'toLocation']: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        }
        setLoading(false);
      },
      () => {
        alert("Could not detect location. Please type manually.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert(t("Please fill in all required fields."));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save booking');

      setIsSuccess(true);
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nBooked via: Madurai Best Taxi Travels (Palanganatham)`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        onClose();
        setIsSuccess(false);
      }, 2500);

    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(t('There was an error processing your booking. Please try WhatsApp directly.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalInputCls = "w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#030712]/90 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative bg-[#0B0F19] rounded-3xl w-full max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden border border-[#D4AF37]/30 text-left"
          >
            {/* Header */}
            <div className="bg-[#030712] p-6 flex justify-between items-center text-white border-b border-white/10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-white leading-tight">
                    Madurai <span className="text-gold-gradient">Best</span> Taxi
                  </h3>
                  <p className="text-[11px] text-gray-400">Direct Reservation Desk</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] mb-4">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white mb-2">{t('Booking Confirmed!')}</h3>
                  <p className="text-gray-400 text-sm mb-6">{t('Redirecting to WhatsApp...')}</p>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                      className="h-full bg-gold-gradient"
                    />
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input
                        ref={pickupInputRef}
                        type="text"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleInputChange}
                        placeholder={t('Start Location')}
                        className={modalInputCls}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('pickup')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#F5D061] transition-colors cursor-pointer"
                      >
                        {loadingPickup ? <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input
                        ref={dropInputRef}
                        type="text"
                        name="toLocation"
                        value={formData.toLocation}
                        onChange={handleInputChange}
                        placeholder={t('End Location')}
                        className={modalInputCls}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('drop')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#F5D061] transition-colors cursor-pointer"
                      >
                        {loadingDrop ? <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} onKeyDown={(e) => e.preventDefault()} onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }} className={modalInputCls} required />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="time" name="time" value={formData.time} onChange={handleInputChange} onKeyDown={(e) => e.preventDefault()} onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }} className={modalInputCls} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('Your Name')} className={modalInputCls} required />
                    </div>
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('Phone Number')} className={modalInputCls} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <select name="vehicle" value={formData.vehicle} onChange={handleInputChange} className="w-full px-4 py-3.5 rounded-2xl bg-[#030712]/90 border border-white/10 text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none">
                      <option>{t('Select Vehicle')}</option>
                      {cars.map(c => (
                        <option key={c.id} value={c.name} className="bg-[#0B0F19] text-white">{t(c.name)} ({t(c.seats)})</option>
                      ))}
                    </select>

                    <select name="packageType" value={formData.packageType} onChange={handleInputChange} className="w-full px-4 py-3.5 rounded-2xl bg-[#030712]/90 border border-white/10 text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none">
                      <option>{t('Custom Trip')}</option>
                      {packages.map(p => (
                        <option key={p.id} value={p.name} className="bg-[#0B0F19] text-white">{t(p.name)}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-gold-gradient text-black font-extrabold py-4 rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 cursor-pointer text-xs uppercase tracking-widest gold-glow"
                  >
                    {isSubmitting ? t('Confirming...') : (
                      <>
                        {t('Confirm Reservation')} <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
