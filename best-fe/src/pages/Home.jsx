import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Navigation, ArrowRight,
  Plane, Compass, Award, ChevronDown, Check, Luggage, Fuel
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../utils/imageImports';
import BookingModal from '../components/BookingModal';
import HeroImage from '../assets/hero.png';
import API_BASE_URL from '../apiConfig';

import MeenakshiBg from '../assets/meenakshi_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import KeralaBg from '../assets/kerala_bg.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const popularDestinations = [
  {
    name: 'Kerala',
    subtitle: "God's Own Country",
    image: KeralaBg,
    category: 'Nature & Backwaters',
  },
  {
    name: 'Kodaikanal',
    subtitle: 'Princess of Hill Stations',
    image: KodaikanalBg,
    category: 'Scenic Escapes',
  },
  {
    name: 'Rameswaram',
    subtitle: 'Sacred Island & Pamban',
    image: RameswaramBg,
    category: 'Temple Pilgrimage',
  },
  {
    name: 'Munnar',
    subtitle: 'Tea Valley & Waterfalls',
    image: MunnarBg,
    category: 'Misty Mountains',
  },
];

const trustFeatures = [
  {
    icon: <Plane className="w-5 h-5 text-blue-700" />,
    title: 'Outstation & Airport Cabs',
    desc: 'Madurai (IXM) & South India routes'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    title: 'Safe & Comfortable Travel',
    desc: 'Sanitized daily & GPS tracked'
  },
  {
    icon: <Clock className="w-5 h-5 text-amber-500" />,
    title: '24/7 Travel Support',
    desc: 'Instant booking & dispatch'
  },
  {
    icon: <Users className="w-5 h-5 text-blue-700" />,
    title: 'Experienced Chauffeurs',
    desc: 'Hill station & ghat certified'
  }
];

const Home = () => {
  const { t } = useTranslation();
  const [tripType, setTripType] = useState('outstation');
  const [vehicles, setVehicles] = useState([]);
  const [packages, setPackages] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '', packageType: '' });

  const [formData, setFormData] = useState({
    fromLocation: '', toLocation: '', date: '', time: '',
    name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setVehicles(data); })
      .catch(err => console.error('Failed to load cars', err));

    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setPackages(data); })
      .catch(err => console.error('Failed to load packages', err));
  }, []);

  const detectLocation = (type) => {
    const isPickup = type === 'pickup';
    const setLoading = isPickup ? setLoadingPickup : setLoadingDrop;
    setLoading(true);
    if (!navigator.geolocation) { alert('Geolocation not supported.'); setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`);
          const data = await res.json();
          setFormData(prev => ({ ...prev, [isPickup ? 'fromLocation' : 'toLocation']: data.display_name || `${latitude}, ${longitude}` }));
        } catch { /* ignore */ }
        setLoading(false);
      },
      () => { alert('Could not get location.'); setLoading(false); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromLocation || !formData.toLocation || !formData.name || !formData.phone) {
      alert(t('Please fill in all required fields.')); return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setIsSuccess(true);
      const text = `*New Booking Request - Madurai Best Taxi Travels*\n\nTrip Type: ${tripType.toUpperCase()}\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nBooked via: Madurai Best Taxi Travels (Palanganatham)`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        setIsSuccess(false);
        setFormData({ fromLocation: '', toLocation: '', date: '', time: '', name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip' });
      }, 2000);
    } catch { alert(t('Error. Please try WhatsApp directly.')); }
    finally { setIsSubmitting(false); }
  };

  const openBookingModal = (type, value) => {
    if (type === 'vehicle') setModalData({ isOpen: true, vehicle: value, packageType: '' });
    else setModalData({ isOpen: true, vehicle: '', packageType: value });
  };

  const inputCls = 'w-full pl-9 pr-9 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all';
  const selectCls = 'w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold appearance-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all cursor-pointer';

  return (
    <div className="bg-white min-h-screen text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. HERO SECTION (MATCHING REFERENCE HOME PAGE HERO) ── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EBF5FF] via-[#F4F9FF] to-white border-b border-slate-100">
        
        {/* Soft Background Clouds / Scenic Hill Silhouette */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img src={CinematicSouthIndiaBg} alt="" className="w-full h-full object-cover object-bottom" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Script Tagline, Bold Title, Tagline, Yellow CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 text-left"
            >
              {/* Script Subtitle matching reference */}
              <div className="font-['Dancing_Script'] text-2xl sm:text-3xl text-blue-900 font-bold mb-1">
                Explore South India with
              </div>

              {/* Bold Title */}
              <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.08] tracking-tight mb-3">
                Madurai Best <br />
                <span className="text-slate-900">Taxi Travels</span>
              </h1>

              {/* Bullet Subtitle matching reference: "Travel More • Worry Less • Create Lifelong Memories" */}
              <p className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide mb-6">
                Travel More <span className="text-amber-500 mx-1">•</span> Worry Less <span className="text-amber-500 mx-1">•</span> Create Lifelong Memories
              </p>

              {/* Yellow Pill CTA Button matching reference: "Plan Your Trip →" */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="#book-ride"
                  className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>

                <a
                  href="tel:6382513075"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full shadow-xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                  <span>+91 63825 13075</span>
                </a>
              </div>

              {/* Verified Location Stamp */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003</span>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Vehicle / Fleet Image on Road */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <img
                  src={HeroImage}
                  alt="Madurai Best Taxi Fleet"
                  className="w-full object-contain filter drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. FLOATING PILL FEATURE BAR (EXACT REFERENCE OVERLAPPING CARD) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.08)] py-4 px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {trustFeatures.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 text-left">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. INSTANT CAB BOOKING / FARE ESTIMATOR CARD ──── */}
      <section id="book-ride" className="pt-16 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/70">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Online Fare Estimate & Reservation
                </span>
                <h2 className="font-['Outfit'] font-black text-2xl text-slate-900">
                  Book Your Cab in Madurai
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex rounded-full bg-slate-200/70 p-1">
                {[
                  { id: 'outstation', label: 'Outstation' },
                  { id: 'oneway', label: 'One-Way Drop' },
                  { id: 'airport', label: 'Airport (IXM)' },
                  { id: 'package', label: 'Tour Package' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTripType(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      tripType === tab.id
                        ? 'bg-[#FBBF24] text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {isSuccess ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Booking Request Sent!</h3>
                <p className="text-xs text-slate-500 mt-1">Connecting you to WhatsApp for instant fare confirmation...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-700 w-4 h-4" />
                    <input
                      type="text"
                      name="fromLocation"
                      value={formData.fromLocation}
                      onChange={handleChange}
                      placeholder="Pickup Location (e.g. Madurai Airport / Hotel)"
                      className={inputCls}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => detectLocation('pickup')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-700 hover:text-blue-900"
                      title="Detect GPS"
                    >
                      {loadingPickup ? <div className="w-3.5 h-3.5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                    <input
                      type="text"
                      name="toLocation"
                      value={formData.toLocation}
                      onChange={handleChange}
                      placeholder="Drop Location (e.g. Rameswaram, Kodaikanal)"
                      className={inputCls}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => detectLocation('drop')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-700"
                      title="Detect GPS"
                    >
                      {loadingDrop ? <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputCls} required />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} className={inputCls} required />
                  </div>
                  <div>
                    <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                      <option>Select Vehicle</option>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.name}>{v.name} ({v.seats})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                      <option>Custom Trip</option>
                      {packages.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={inputCls} required />
                  </div>
                  <div className="relative">
                    <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className={inputCls} required />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? 'Calculating...' : (
                      <>
                        <span>Check Fare & Reserve</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR DESTINATIONS (MATCHING REFERENCE HOME PAGE) ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-8 text-left">
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-slate-900">
              Popular Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover breathtaking destinations across South India and beyond
            </p>
          </div>

          {/* Cards Grid matching reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openBookingModal('package', `${dest.name} Tour`)}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent" />

                {/* Content at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="text-left text-white">
                    <h3 className="font-['Outfit'] font-black text-xl leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {dest.subtitle}
                    </p>
                  </div>

                  {/* Circular White Arrow Button matching reference */}
                  <div className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#FBBF24] transition-colors">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CURVED NAVY BANNER WITH SIGNATURE SCRIPT (MATCHING REFERENCE) ── */}
      <section className="relative bg-[#0A192F] text-white py-14 overflow-hidden">
        {/* Palm Frond Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className="font-['Dancing_Script'] text-3xl sm:text-4xl text-amber-400 block mb-1">
              Let's Travel Together...
            </span>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              From Meenakshi Temple darshan to misty Kodaikanal hills and Dhanushkodi beaches, Madurai Best Taxi Travels is your companion on every road.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:6382513075"
              className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 fill-slate-950" /> Call +91 63825 13075
            </a>
            <a
              href="https://wa.me/916382513075"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. FLEET PREVIEW SECTION ──────────────────────── */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
              Modern Vehicles
            </span>
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-slate-900">
              Our Certified Fleet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.slice(0, 3).map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-50 rounded-xl flex items-center justify-center p-4 mb-4">
                  <img
                    src={getVehicleImage(car.name, car.image)}
                    alt={car.name}
                    className="max-h-32 object-contain"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-blue-50 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                    {car.seats || '4+1'} Seater
                  </span>
                </div>

                <div className="text-left">
                  <h3 className="font-['Outfit'] font-black text-lg text-slate-900 mb-1">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Comfortable AC ride for families and outstation travel.
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting From</div>
                      <div className="font-['Outfit'] font-black text-base text-blue-700">{car.price || '₹12/km'}</div>
                    </div>
                    <button
                      onClick={() => openBookingModal('vehicle', car.name)}
                      className="bg-[#FBBF24] hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider"
            >
              <span>View All Fleet Vehicles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. GOOGLE REVIEWS SECTION ─────────────────────── */}
      <Suspense fallback={<div className="py-10 text-center text-slate-400">Loading reviews...</div>}>
        <GoogleReviews />
      </Suspense>

      {/* ── MODAL ─────────────────────────────────────────── */}
      {modalData.isOpen && (
        <BookingModal
          isOpen={modalData.isOpen}
          defaultVehicle={modalData.vehicle}
          defaultPackage={modalData.packageType}
          onClose={() => setModalData({ isOpen: false, vehicle: '', packageType: '' })}
        />
      )}

    </div>
  );
};

export default Home;
