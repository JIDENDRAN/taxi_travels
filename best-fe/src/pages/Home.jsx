import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Navigation, ArrowRight,
  Sparkles, Award, ChevronDown, Check, Compass, Fuel, Luggage
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
import CochinBg from '../assets/cochin_bg.png';
import AlleppeyBg from '../assets/alleppey_bg.png';
import TrivandrumBg from '../assets/trivandrum_bg.png';
import AthirapillyBg from '../assets/athirapilly_bg.png';

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
  { name: 'Alleppey', subtext: 'Venice of the East', img: AlleppeyBg, category: 'nature' },
  { name: 'Cochin', subtext: 'Queen of the Arabian Sea', img: CochinBg, category: 'heritage' },
  { name: 'Trivandrum', subtext: 'Padmanabhaswamy Temple', img: TrivandrumBg, category: 'temple' },
  { name: 'Athirapilly', subtext: 'Niagara of India', img: AthirapillyBg, category: 'nature' },
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
    <div ref={ref} className="text-center font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="text-3xl lg:text-4xl font-['Outfit'] font-black text-slate-900 tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-slate-500 uppercase tracking-wider mt-1.5 font-bold">
        {label}
      </div>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 ${center ? 'justify-center' : ''}`}>
      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      <span>{tag}</span>
    </div>
    <h2 className="text-2xl sm:text-4xl lg:text-4xl font-['Outfit'] font-black text-slate-900 tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Main Home Component ──────────────────────────────────────
const Home = () => {
  const { t } = useTranslation();
  const [destCategory, setDestCategory] = useState('all');
  const [tripType, setTripType] = useState('outstation'); // 'outstation' | 'local' | 'airport' | 'package'

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
      const text = `*New Booking Request*\n\nTrip Type: ${tripType.toUpperCase()}\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nBooked via: Madurai Best Taxi Travels (Palanganatham)`;
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

  const inputCls = 'w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all';
  const selectCls = 'w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold appearance-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all cursor-pointer';

  return (
    <div className="bg-white text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── BRIGHT & ELEGANT HERO SECTION ─────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white overflow-hidden border-b border-slate-200/60">
        
        {/* Soft Ambient Shapes */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Clear Authority & Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>#1 Rated Taxi & Tour Travels in Madurai</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12] mb-4">
                MADURAI <span className="text-blue-700">BEST</span> <br className="hidden sm:inline" />
                <span className="text-slate-950">TAXI TRAVELS</span>
              </h1>

              {/* Official Address */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium mb-5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003</span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
                Enjoy comfortable outstation cabs, Madurai airport transfers (IXM), and South India temple & hill tours in clean AC Sedans, Innova Crystas, and Tempo Travellers. Fixed transparent rates with zero surge pricing.
              </p>

              {/* Fleet Hero Image */}
              <div className="my-2 w-full max-w-lg">
                <img
                  src={HeroImage}
                  alt="Madurai Best Taxi Fleet"
                  className="w-full object-contain filter drop-shadow-[0_15px_25px_rgba(15,23,42,0.1)]"
                />
              </div>

              {/* Key Highlights Pill Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl mt-6">
                {[
                  { title: "24/7 Available", sub: "Instant Dispatch" },
                  { title: "Zero Surge", sub: "Clear Rates" },
                  { title: "Clean AC Cabs", sub: "Sanitized Daily" },
                  { title: "Ghat Certified", sub: "Expert Drivers" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-2.5 text-center shadow-xs">
                    <div className="text-xs font-extrabold text-slate-900 leading-tight">{item.title}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3.5 mt-6">
                <a
                  href="tel:6382513075"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 fill-slate-950" /> Call +91 63825 13075
                </a>
                <a
                  href="https://wa.me/916382513075"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Right Column: Modern White Booking Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 relative">
                
                {/* Trip Type Selector Tabs */}
                <div className="flex rounded-xl bg-slate-100 p-1 mb-5">
                  {[
                    { id: 'outstation', label: 'Outstation' },
                    { id: 'local', label: 'Local City' },
                    { id: 'airport', label: 'Airport' },
                    { id: 'package', label: 'Tour Pkg' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTripType(tab.id)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        tripType === tab.id
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="text-left mb-4">
                  <h3 className="font-['Outfit'] font-black text-xl text-slate-900">
                    Book Your Cab
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get instant confirmation & driver details on WhatsApp.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 mb-1">Booking Received!</h4>
                    <p className="text-xs text-slate-500 mb-4">Connecting to WhatsApp with details...</p>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    
                    {/* Pickup & Drop Inputs */}
                    <div className="space-y-3">
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
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
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                          title="Detect GPS"
                        >
                          {loadingPickup ? <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
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

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
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
                    </div>

                    {/* Vehicle & Package Selector */}
                    <div className="grid grid-cols-2 gap-3">
                      <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                        <option>Select Vehicle</option>
                        {vehicles.map(v => (
                          <option key={v.id} value={v.name}>{v.name} ({v.seats})</option>
                        ))}
                      </select>
                      <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                        <option>Custom Trip</option>
                        {packages.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-2 gap-3">
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
                    </div>

                    {/* Book Now Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                    >
                      {isSubmitting ? 'Reserving...' : (
                        <>
                          <span>Check Fare & Confirm Cab</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Free Cancellation
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Pay Directly to Driver
                      </span>
                    </div>

                  </form>
                )}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── METRICS & TRUST BAR ───────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={50000} suffix="+" label="Safe Rides Completed" />
            <AnimatedCounter end={4} suffix=".9 / 5" label="Google Customer Rating" />
            <AnimatedCounter end={100} suffix="%" label="On-Time Guarantee" />
            <AnimatedCounter end={10} suffix="+ Yrs" label="Excellence in Palanganatham" />
          </div>
        </div>
      </section>

      {/* ── POPULAR VEHICLES & FLEET SHOWCASE ──────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Certified Fleet"
            title="Premium Cabs for Every Journey"
            subtitle="Spacious, clean, and fully sanitized air-conditioned vehicles driven by polite and experienced professionals."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((car) => {
              const plans = parseDesc(car.description);
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                >
                  {/* Car Image Area */}
                  <div className="relative h-52 bg-gradient-to-b from-slate-100 to-white flex items-center justify-center p-6 border-b border-slate-100">
                    <img
                      src={getVehicleImage(car.name, car.image)}
                      alt={car.name}
                      className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
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
                        Ideal for local transfers, temple visits & long distance tours.
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 justify-center">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>{car.seats || '4+1'} Seats</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <Luggage className="w-3.5 h-3.5 text-blue-600" />
                          <span>Luggage</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <Fuel className="w-3.5 h-3.5 text-blue-600" />
                          <span>AC Cab</span>
                        </div>
                      </div>

                      {/* Pricing Specs */}
                      {plans && plans.plan_0 && (
                        <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs">
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
                        className="p-3 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 transition-colors"
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
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold px-6 py-3 rounded-xl border border-slate-200 shadow-xs transition-all text-xs uppercase tracking-wider"
            >
              <span>Explore Entire Fleet & Detailed Tariff</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CURATED SOUTH INDIA TOUR PACKAGES ──────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Signature Journeys"
            title="Curated South India Tour Packages"
            subtitle="Customized temple tours, family hill vacations, and coastal road trips with dedicated drivers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getPackageImage(pkg.name, pkg.image)}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
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
                        <span>Dedicated vehicle with experienced driver</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Package Rate</div>
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

      {/* ── POPULAR DESTINATIONS FILTER ───────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Explore South India"
            title="Popular Routes From Madurai"
            subtitle="Connect seamlessly from Palanganatham, Madurai to Tamil Nadu & Kerala's most picturesque locations."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['all', 'temple', 'hills', 'nature', 'heritage', 'beaches'].map((cat) => (
              <button
                key={cat}
                onClick={() => setDestCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  destCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {destinations
              .filter(d => destCategory === 'all' || d.category === destCategory)
              .map((dest, i) => (
                <div
                  key={i}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer"
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
                      <span>Book Madurai to {dest.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (BENTO GRID) ────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="The Madurai Best Difference"
            title="Why Discerning Travellers Choose Us"
            subtitle="Reliable, certified, and customer-focused cab service rooted in Madurai."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Zero Hidden Charges",
                desc: "Transparent per-km and fixed package tariffs. Toll, parking, and driver allowances are clearly communicated with zero unexpected additions."
              },
              {
                icon: Compass,
                title: "Ghat-Road Certified Drivers",
                desc: "Experienced chauffeurs trained for misty hill station hairpin bends (Kodaikanal, Ooty, Munnar) with deep local cultural knowledge."
              },
              {
                icon: Clock,
                title: "24/7 Madurai Airport Tracking",
                desc: "Real-time flight arrival monitoring for Madurai Airport (IXM). Guaranteed on-time pickup even if flights are delayed."
              },
              {
                icon: Star,
                title: "Palanganatham Madurai Heritage",
                desc: "Serving thousands of pilgrims and tourists since 2015 with high ratings, verified cars, and dependable round-the-clock dispatch."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-700 group-hover:text-white transition-colors">
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
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about booking our cabs in Madurai."
          />

          <div className="space-y-3.5">
            {[
              {
                q: "Where is Madurai Best Taxi Travels officially located?",
                a: "Our official registered travels is located at No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — Pin Code: 625003. We provide pickup from anywhere in Madurai city, railway station, and airport."
              },
              {
                q: "How do I book a cab from Madurai Airport (IXM)?",
                a: "You can book directly via our online form, call us at +91 63825 13075, or send a WhatsApp message with your flight number. Our chauffeur will meet you right at the arrival terminal with your name board."
              },
              {
                q: "Are the outstation rates fixed or are there extra charges?",
                a: "Our outstation pricing is completely clear and transparent. Standard outstation rentals are based on per-km rates with a standard 300 km/day minimum plus driver bata. Toll, parking, and state permit fees are charged at actuals."
              },
              {
                q: "Do you provide one-way drop taxis from Madurai to Rameswaram or Kodaikanal?",
                a: "Yes! We offer both one-way drop taxi service as well as round-trip tour packages with waiting charges included."
              },
              {
                q: "What vehicles do you offer for large families or groups?",
                a: "We have Toyota Innova Crystas (7-8 seater), Maruti Ertigas, and luxury 12 to 20-seater Force Urbania / Tempo Travellers ideal for family pilgrimages and weddings."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-xs"
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
