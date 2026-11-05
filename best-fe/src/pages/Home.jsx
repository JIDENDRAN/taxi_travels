import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Navigation, ArrowRight,
  Sparkles, Award, ChevronDown, Check, Compass, Fuel, Luggage, Plane, Phone
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../utils/imageImports';
import BookingModal from '../components/BookingModal';
import HeroImage from '../assets/hero.png';
import API_BASE_URL from '../apiConfig';

import MeenakshiDesktop from '../assets/meenakshi_desktop.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import RameswaramDesktop from '../assets/rameswaram_desktop.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import KeralaBg from '../assets/kerala_bg.png';

// ─── Default Data Parser ──────────────────────────────────────
const parseDesc = (descString) => {
  if (!descString) return null;
  const plans = {};
  const sections = descString.split(/\n\s*\n/);
  let planCount = 0;
  sections.forEach(sec => {
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    const titleLine = lines[0];
    const title = titleLine.replace('[', '').replace(']', '').toUpperCase();
    const items = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(':');
      if (parts.length >= 2) {
        const label = parts[0].trim();
        let value = parts.slice(1).join(':').trim();

        if (/^\d+$/.test(value)) {
          const lowerLabel = label.toLowerCase();
          if (lowerLabel.includes('rate') || lowerLabel.includes('per km')) {
            value = `₹${value}/km`;
          } else if (lowerLabel.includes('min distance')) {
            value = `Above ${value} km`;
          } else if (lowerLabel.includes('driver')) {
            value = `₹${value}/day`;
          } else if (lowerLabel.includes('base rent')) {
            value = `₹${value}`;
          }
        }
        items.push({ label, value });
      }
    }
    plans[`plan_${planCount++}`] = { title, items };
  });
  return plans;
};

const destinations = [
  { name: 'Madurai', subtext: 'Meenakshi Amman Temple', img: MeenakshiBg, category: 'temple' },
  { name: 'Rameswaram', subtext: 'Dhanushkodi & APJ Memorial', img: RameswaramBg, category: 'temple' },
  { name: 'Kodaikanal', subtext: 'Princess of Hill Stations', img: KodaikanalBg, category: 'hills' },
  { name: 'Ooty', subtext: 'Nilgiri Tea Paradise', img: OotyBg, category: 'hills' },
  { name: 'Kanyakumari', subtext: 'Triveni Sangam & Sunrise', img: KanyakumariBg, category: 'beaches' },
  { name: 'Thanjavur', subtext: 'Great Living Chola Temples', img: ThanjavurBg, category: 'heritage' },
  { name: 'Kerala', subtext: "God's Own Country", img: KeralaBg, category: 'nature' },
  { name: 'Munnar', subtext: 'Tea Valley & Waterfalls', img: MunnarBg, category: 'hills' },
];

// ─── Animated Metric Counter ──────────────────────────────────
const AnimatedCounter = ({ end, duration = 2, suffix = '+', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl lg:text-4xl font-['Outfit'] font-black text-blue-900 tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-slate-600 uppercase tracking-wider mt-1 font-bold">
        {label}
      </div>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 ${center ? 'justify-center' : ''}`}>
      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
      <span>{tag}</span>
    </div>
    <h2 className="text-2xl sm:text-4xl font-['Outfit'] font-black text-slate-900 tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Main Home Component ──────────────────────────────────────
const Home = () => {
  const { t } = useTranslation();
  const [bgIndex, setBgIndex] = useState(0);
  const [destCategory, setDestCategory] = useState('all');
  const [tripType, setTripType] = useState('outstation'); // 'outstation' | 'oneway' | 'airport' | 'package' | 'local'

  const heroBgs = [MeenakshiDesktop, ThirumalaiDesktop, RameswaramDesktop, CinematicSouthIndiaBg];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBgs.length]);

  const [formData, setFormData] = useState({
    fromLocation: '', toLocation: '', date: '', time: '',
    name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cars`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setVehicles(data);
        }
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setPackages(data);
        }
      } catch (error) {
        console.error('Failed to fetch packages', error);
      }
    };
    fetchPackages();
  }, []);

  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '', packageType: '' });
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

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

  const inputCls = 'w-full pl-10 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all';
  const selectCls = 'w-full px-3.5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold appearance-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all cursor-pointer';

  return (
    <div className="bg-[#FAF7F2] text-[#0F1D38] min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── FULL-WIDTH SCENIC HERO WITH CENTERED FLOATING BOOKING BOX ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        
        {/* Full-width scenic South India background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={bgIndex}
              src={heroBgs[bgIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="South India Scenic Travel"
            />
          </AnimatePresence>

          {/* Warm Dark Gradient Overlay for Maximum Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/95 via-[#0B1528]/80 to-[#0B1528]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">

          {/* Heritage Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Madurai’s Trusted Travel Partner • Since 2015</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Outfit'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-3"
          >
            MADURAI <span className="text-amber-400">BEST</span> TAXI TRAVELS
          </motion.h1>

          {/* Subtitle & Official Address */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base max-w-2xl mb-2 leading-relaxed"
          >
            Doorstep pickup, Madurai airport transfers, outstation drop taxis & customized South India temple & hill tour packages.
          </motion.p>

          <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 mb-8 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003</span>
          </div>

          {/* ── THE CENTERED FLOATING BOOKING & FARE ESTIMATOR BOX ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(11,21,40,0.35)] border border-amber-300/40 relative text-left"
          >
            {/* Tabbed Selectors */}
            <div className="flex flex-wrap rounded-2xl bg-slate-100 p-1 mb-5 gap-1">
              {[
                { id: 'outstation', label: '🚕 Outstation Trip' },
                { id: 'oneway', label: '🚗 One-Way Drop' },
                { id: 'airport', label: '✈️ Airport Pickup (IXM)' },
                { id: 'package', label: '🕉️ Tour Package' },
                { id: 'local', label: '🏙️ Local Sightseeing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTripType(tab.id)}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    tripType === tab.id
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-1">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500 mb-4">Connecting to WhatsApp with trip details...</p>
                <div className="w-full max-w-xs mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Pickup & Drop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-700 w-4 h-4" />
                    <input
                      type="text"
                      name="fromLocation"
                      value={formData.fromLocation}
                      onChange={handleChange}
                      placeholder="Pickup Location (e.g. Madurai Airport / Hotel / Railway)"
                      className={inputCls}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => detectLocation('pickup')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-700 hover:text-blue-900"
                      title="Detect GPS"
                    >
                      {loadingPickup ? <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" /> : <Navigation className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                    <input
                      type="text"
                      name="toLocation"
                      value={formData.toLocation}
                      onChange={handleChange}
                      placeholder="Drop Location (e.g. Rameswaram, Kodaikanal, Munnar)"
                      className={inputCls}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => detectLocation('drop')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-700"
                      title="Detect GPS"
                    >
                      {loadingDrop ? <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /> : <Navigation className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Row 2: Date, Time, Vehicle, Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    />
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

                {/* Row 3: Name, Phone & Instant Submit CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={inputCls}
                      required
                    />
                  </div>

                  <div className="relative">
                    <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone / WhatsApp"
                      className={inputCls}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? 'Confirming...' : (
                      <>
                        <span>Check Fare & Reserve Cab</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Highlights */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Zero Hidden Charges
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Free Cancellation
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Sanitized AC Cabs
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Pay Driver on Arrival
                  </span>
                </div>

              </form>
            )}
          </motion.div>

          {/* Quick Direct Hotline Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="tel:6382513075"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 fill-white" /> Direct Call: +91 63825 13075
            </a>
            <a
              href="https://wa.me/916382513075"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" /> WhatsApp 24/7 Booking
            </a>
          </div>

        </div>
      </section>

      {/* ── METRICS & HERITAGE TRUST STRIP ─────────────────── */}
      <section className="py-12 bg-white border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={50000} suffix="+" label="Happy Passengers" />
            <AnimatedCounter end={4} suffix=".9 / 5" label="Google Verified Rating" />
            <AnimatedCounter end={100} suffix="%" label="On-Time Dispatch" />
            <AnimatedCounter end={10} suffix="+ Yrs" label="Palanganatham, Madurai" />
          </div>
        </div>
      </section>

      {/* ── CERTIFIED FLEET SHOWCASE ───────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Verified Vehicle Fleet"
            title="Choose Your Ride for Comfort & Safety"
            subtitle="Spacious, clean, and fully sanitized air-conditioned vehicles driven by polite and experienced professionals."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((car) => {
              const plans = parseDesc(car.description);
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl border border-amber-200/60 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                >
                  {/* Car Image Preview */}
                  <div className="relative h-52 bg-gradient-to-b from-[#F5EFE6] to-white flex items-center justify-center p-6 border-b border-amber-100">
                    <img
                      src={getVehicleImage(car.name, car.image)}
                      alt={car.name}
                      className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                      {car.seats || '4+1'} Seater
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-['Outfit'] font-black text-xl text-slate-900 mb-1">
                        {car.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        Ideal for airport transfers, temple darshan & South India hill journeys.
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 justify-center">
                          <Users className="w-3.5 h-3.5 text-blue-700" />
                          <span>{car.seats || '4+1'} Seats</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <Luggage className="w-3.5 h-3.5 text-blue-700" />
                          <span>Boot Space</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <Fuel className="w-3.5 h-3.5 text-blue-700" />
                          <span>AC Cab</span>
                        </div>
                      </div>

                      {/* Pricing Specs */}
                      {plans && plans.plan_0 && (
                        <div className="space-y-1.5 mb-5 bg-[#FAF7F2] p-3 rounded-xl border border-amber-200/50 text-xs">
                          {plans.plan_0.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-slate-500">{item.label}</span>
                              <span className="font-bold text-slate-900">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => openBookingModal('vehicle', car.name)}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs"
                      >
                        Book {car.name.split(' ')[0]}
                      </button>
                      <a
                        href={`https://wa.me/916382513075?text=${encodeURIComponent(`Hi Madurai Best Taxi Travels, I want to book ${car.name}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl border border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Chat for this car"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-slate-900 font-bold px-7 py-3 rounded-xl border border-amber-200 shadow-xs transition-all text-xs uppercase tracking-wider"
            >
              <span>Explore Entire Fleet & Detailed Tariff</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE HERITAGE & HILL TOUR PACKAGES ───────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Curated Tour Packages"
            title="Temple Pilgrimages & Scenic Hill Stations"
            subtitle="Customized travel circuits covering Madurai Meenakshi, Rameswaram, Kodaikanal, Munnar, and Kanyakumari."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-amber-200/60 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getPackageImage(pkg.name, pkg.image)}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-xs">
                    {pkg.days ? `${pkg.days} Days` : 'Tour Special'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-['Outfit'] font-bold text-lg leading-tight text-white drop-shadow-md">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {pkg.description || 'Full day guided tour covering prime attractions, viewpoints & temple darshans with complete sightseeing.'}
                    </p>

                    <div className="space-y-1.5 mb-5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Pickup from Madurai Airport / Railway Station</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Experienced chauffeur with local route expertise</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting Rate</div>
                      <div className="font-['Outfit'] font-black text-lg text-blue-700">
                        {pkg.price ? `₹${pkg.price}` : 'Custom Quote'}
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal('package', pkg.name)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-xs transition-all text-xs uppercase tracking-wider"
            >
              <span>View All Tour Packages & Custom Itineraries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS GRID ─────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="South India Circuits"
            title="Popular Routes Starting from Madurai"
            subtitle="Direct pickup from Palanganatham, Madurai Junction, or Madurai Airport."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="group relative h-64 rounded-3xl overflow-hidden border border-amber-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer"
                onClick={() => openBookingModal('package', `${dest.name} Tour`)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-['Outfit'] font-bold text-lg leading-tight mb-1">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {dest.subtext}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:underline">
                    <span>Reserve Madurai to {dest.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (HERITAGE PILLARS) ───────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="The Madurai Best Standard"
            title="Why Families & Tourists Choose Us"
            subtitle="Honest pricing, licensed drivers, and reliable door-to-door transportation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "100% Honest Pricing",
                desc: "No sudden hidden charges or surprise tolls. Transparent per-km and fixed package tariffs explained clearly before every ride."
              },
              {
                icon: Compass,
                title: "Hill & Ghat-Road Experts",
                desc: "Certified chauffeurs trained for misty hill station hairpin bends (Kodaikanal, Ooty, Munnar) with deep cultural respect."
              },
              {
                icon: Clock,
                title: "24/7 Madurai Airport Pickup",
                desc: "Live flight arrival monitoring for Madurai Airport (IXM). On-time chauffeur pickup with complimentary waiting time."
              },
              {
                icon: Star,
                title: "Palanganatham Madurai Hub",
                desc: "Operating from Kovalan Nagar Last, Palanganatham with over 10 years of trusted service across South India."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] border border-amber-200/60 rounded-3xl p-6 text-left hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="font-['Outfit'] font-black text-lg text-slate-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS SECTION ────────────────────────── */}
      <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading customer reviews...</div>}>
        <GoogleReviews />
      </Suspense>

      {/* ── FREQUENTLY ASKED QUESTIONS (LIGHT ACCORDION) ──── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-amber-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Help & FAQs"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about booking our taxi travels in Madurai."
          />

          <div className="space-y-3.5">
            {[
              {
                q: "Where is Madurai Best Taxi Travels officially located?",
                a: "Our registered travels office is located at No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — Pin Code: 625003. We provide pickup from anywhere in Madurai city, railway station, and airport."
              },
              {
                q: "How do I book a cab from Madurai Airport (IXM)?",
                a: "You can book directly via our online form, call us at +91 63825 13075, or send a WhatsApp message with your flight number. Our chauffeur will meet you right at the arrival terminal with your name board."
              },
              {
                q: "Are outstation taxi rates fixed?",
                a: "Our outstation pricing is completely clear and transparent. Standard outstation rentals are based on per-km rates with a standard 300 km/day minimum plus driver bata. Toll and parking are charged at actuals."
              },
              {
                q: "Do you provide one-way drop taxis from Madurai?",
                a: "Yes! We offer one-way drop taxis to Chennai, Bangalore, Coimbatore, Trichy, Rameswaram, and all major cities across South India."
              },
              {
                q: "What vehicles do you offer for large families or groups?",
                a: "We have Toyota Innova Crystas (7-8 seater), Maruti Ertigas, and luxury 12 to 20-seater Force Tempo Travellers ideal for family pilgrimages and weddings."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-amber-200/60 rounded-2xl overflow-hidden cursor-pointer shadow-xs"
              >
                <summary className="flex items-center justify-between font-bold text-slate-900 p-5 select-none text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180 shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

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
