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

  useEffect(() => {
    // No Google Maps API to load anymore
  }, []);

  const detectLocation = async (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

      navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fallbackNominatim(latitude, longitude, isPickup);
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Could not capture location automatically. Please type manually.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission was denied. Please type manually or enable location permissions in your browser.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable. Please type manually.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Please try again or type manually.";
        }
        alert(msg);
        setLoading(false);
      },
      options
    );
  };

  const fallbackNominatim = async (latitude, longitude, isPickup) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error("Failed to reverse geocode coordinate");
      }
      const data = await response.json();
      if (data && data.display_name) {
        const address = data.display_name;
        setFormData(prev => ({
          ...prev,
          [isPickup ? 'fromLocation' : 'toLocation']: address
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [isPickup ? 'fromLocation' : 'toLocation']: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
      }
    } catch (error) {
      console.error("Nominatim geocoding error:", error);
      setFormData(prev => ({
        ...prev,
        [isPickup ? 'fromLocation' : 'toLocation']: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      }));
    }
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

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      setIsSuccess(true);

      // WhatsApp notification
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        onClose();
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(t('There was an error processing your booking. Please try WhatsApp directly.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl w-full max-w-xl shadow-2xl z-10 overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1B2A4A] to-[#0F172A] p-6 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-['DM_Sans'] font-bold flex items-center gap-2 relative z-10">
                <Car className="w-6 h-6 text-blue-400" /> {t('Book Your Ride')}
              </h3>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 bg-slate-50 relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-['DM_Sans'] font-bold text-slate-900 mb-2">{t('Booking Confirmed!')}</h3>
                  <p className="text-slate-600 mb-6">{t('Your booking details have been sent successfully. We will contact you shortly.')}</p>
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                      className="h-full bg-green-600"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4">{t('Redirecting to WhatsApp...')}</p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input
                        ref={pickupInputRef}
                        type="text"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleInputChange}
                        placeholder={t('Start Location')}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('pickup')}
                        className="absolute right-3 top-3.5 text-blue-500 hover:text-blue-600 transition-colors focus:outline-none"
                        title={t("Detect Live Location")}
                      >
                        {loadingPickup ? (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Navigation className="w-4.5 h-4.5 hover:scale-110 active:scale-95 transition-transform" />
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input
                        ref={dropInputRef}
                        type="text"
                        name="toLocation"
                        value={formData.toLocation}
                        onChange={handleInputChange}
                        placeholder={t('End Location')}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => detectLocation('drop')}
                        className="absolute right-3 top-3.5 text-blue-500 hover:text-blue-600 transition-colors focus:outline-none"
                        title={t("Detect Live Location")}
                      >
                        {loadingDrop ? (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Navigation className="w-4.5 h-4.5 hover:scale-110 active:scale-95 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} onKeyDown={(e) => e.preventDefault()} onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }} className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none ${!formData.date ? 'text-slate-400' : 'text-slate-900'}`} required />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input type="time" name="time" value={formData.time} onChange={handleInputChange} onKeyDown={(e) => e.preventDefault()} onClick={(e) => { try { e.target.showPicker(); } catch(err) {} }} className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none ${!formData.time ? 'text-slate-400' : 'text-slate-900'}`} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('Your Name')} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                    </div>
                    <div className="relative">
                      <PhoneCall className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('Phone Number')} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="vehicle" value={formData.vehicle} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-slate-900">
                      <option>{t('Select Vehicle')}</option>
                      {cars.map(c => (
                        <option key={c.id} value={c.name}>{t(c.name)} ({t(c.seats)})</option>
                      ))}
                    </select>

                    <select name="packageType" value={formData.packageType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-slate-900">
                      <option>{t('Custom Trip')}</option>
                      {packages.map(p => (
                        <option key={p.id} value={p.name}>{t(p.name)}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group text-lg"
                  >
                    {isSubmitting ? t('PROCESSING...') : (
                      <>
                        {t('CONFIRM BOOKING')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
