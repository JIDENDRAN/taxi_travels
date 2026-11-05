import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Wallet, Navigation, ArrowRight,
  Wind, Sparkles, Award, ChevronDown
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../utils/imageImports';
import BookingModal from '../components/BookingModal';
import Logo from '../assets/new_logo.jpg';
import HeroImage from '../assets/hero.png';
import API_BASE_URL from '../apiConfig';

import MeenakshiDesktop from '../assets/meenakshi_desktop.png';
import MeenakshiMobile from '../assets/meenakshi_mobile.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import ThirumalaiMobile from '../assets/thirumalai_mobile.png';
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

// ─── Default Data ────────────────────────────────────────────
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
  { name: 'Rameswaram', subtext: 'Dhanushkodi & Pilgrimage', img: RameswaramBg, category: 'temple' },
  { name: 'Kodaikanal', subtext: 'Princess of Hill Stations', img: KodaikanalBg, category: 'hills' },
  { name: 'Ooty', subtext: 'Nilgiri Tea Estates', img: OotyBg, category: 'hills' },
  { name: 'Kanyakumari', subtext: 'Sunrise & Sunset Triveni', img: KanyakumariBg, category: 'beaches' },
  { name: 'Thanjavur', subtext: 'Brihadeeswarar Temple', img: ThanjavurBg, category: 'heritage' },
  { name: 'Kerala', subtext: "God's Own Country", img: KeralaBg, category: 'nature' },
  { name: 'Cochin', subtext: 'Queen of the Arabian Sea', img: CochinBg, category: 'heritage' },
  { name: 'Alleppey', subtext: 'Houseboats & Backwaters', img: AlleppeyBg, category: 'nature' },
  { name: 'Thiruvananthapuram', subtext: 'Padmanabhaswamy Temple', img: TrivandrumBg, category: 'temple' },
  { name: 'Munnar', subtext: 'Tea Valley & Waterfalls', img: MunnarBg, category: 'hills' },
  { name: 'Athirapilly', subtext: 'Majestic Waterfalls', img: AthirapillyBg, category: 'nature' },
];

// ─── Animated Counter ────────────────────────────────────────
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
    <div ref={ref} className="text-center font-['Inter',sans-serif]">
      <div className="text-4xl lg:text-5xl font-['DM_Sans'] font-black text-blue-400">{count.toLocaleString()}{suffix}</div>
      <div className="text-xs text-slate-300 uppercase tracking-widest mt-2 font-semibold">{label}</div>
    </div>
  );
};

// ─── Section Header ──────────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2.5 ${center ? 'justify-center' : ''}`}
    >
      <span className="w-5 h-0.5 bg-blue-600" />
      {tag}
      {center && <span className="w-5 h-0.5 bg-blue-600" />}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl lg:text-5xl font-['DM_Sans',sans-serif] font-black text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '50px' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`h-1 bg-blue-600 rounded-full mt-4 ${center ? 'mx-auto' : ''}`}
    />
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-sm lg:text-base text-slate-500 mt-4 max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ─── Home Page ───────────────────────────────────────────────
const Home = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], ['0%', '10%']);

  const [bgIndex, setBgIndex] = useState(0);
  const [destCategory, setDestCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
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
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDrop, setLoadingDrop] = useState(false);

  const desktopImages = [CinematicSouthIndiaBg, MeenakshiDesktop, ThirumalaiDesktop, RameswaramDesktop, MaduraiAerialBg];
  const mobileImages = [CinematicSouthIndiaBg, MeenakshiMobile, ThirumalaiMobile, RameswaramBg, MaduraiAerialBg];
  const heroImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setBgIndex(p => (p + 1) % heroImages.length), 6500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nBooked via: Madurai Best Taxi Travels`;
      setTimeout(() => {
        window.open(`https://wa.me/916382513075?text=${encodeURIComponent(text)}`, '_blank');
        setIsSuccess(false);
        setFormData({ fromLocation: '', toLocation: '', date: '', time: '', name: '', phone: '', vehicle: 'Select Vehicle', packageType: 'Custom Trip' });
      }, 2500);
    } catch { alert(t('Error. Please try WhatsApp directly.')); }
    finally { setIsSubmitting(false); }
  };

  const openBookingModal = (type, value) => {
    if (type === 'vehicle') setModalData({ isOpen: true, vehicle: value, packageType: '' });
    else setModalData({ isOpen: true, vehicle: '', packageType: value });
  };

  const inputCls = 'w-full pl-10 sm:pl-11 pr-10 sm:pr-11 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all';
  const selectCls = 'w-full pl-4 pr-10 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all cursor-pointer';

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif] text-left">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#0F172A] pt-24 pb-12 lg:py-24">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={bgIndex}
              src={heroImages[bgIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ y: yBg }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="South India Taxi Destination"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/40" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column Top: Brand Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 lg:row-start-1 lg:col-start-1 lg:self-end text-center lg:text-left flex flex-col items-center lg:items-start w-full order-1"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                24/7 Outstation Cabs & Airport Transfers
              </div>

              <h1 className="font-['DM_Sans',sans-serif] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-3">
                Madurai <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Best</span> Taxi Travels
              </h1>
              <p className="text-blue-300 text-xs sm:text-sm font-semibold tracking-wide mb-6">
                No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003
              </p>

              {/* Fleet Hero Graphic */}
              <div className="mb-6 lg:mb-4 w-full flex items-center justify-center lg:justify-start">
                <img
                  src={HeroImage}
                  alt="Madurai Best Taxi Travels Fleet"
                  className="w-11/12 md:w-5/6 lg:w-4/5 max-w-lg lg:max-w-xl object-contain drop-shadow-2xl rounded-3xl"
                />
              </div>
            </motion.div>

            {/* Left Column Bottom: Description & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 lg:row-start-2 lg:col-start-1 lg:self-start text-center lg:text-left flex flex-col items-center lg:items-start w-full order-3"
            >
              <p className="text-slate-300 text-sm max-w-xl mb-6 leading-relaxed">
                {t('Premier taxi service in Madurai. Specializing in Rameswaram, Kodaikanal, Ooty, Kerala holiday tours, and luxury Tempo Traveller rentals with verified drivers.')}
              </p>

              <div className="w-20 h-1 bg-blue-600 mb-8 rounded-full" />

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a href="tel:6382513075" className="flex items-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30">
                  <PhoneCall className="w-4 h-4" /> {t('Call +91 63825 13075')}
                </a>
                <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-7 py-3.5 border border-emerald-500/40 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20">
                  <MessageCircle className="w-4 h-4" /> {t('WhatsApp Us')}
                </a>
                <a href="/vehicles" className="flex items-center gap-2.5 px-6 py-3.5 border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider">
                  <CarIcon className="w-4 h-4 text-blue-400" /> View Fleet
                </a>
              </div>

              {/* Trust checklist */}
              <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-4 mt-8 w-full max-w-xl border-t border-slate-800 pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Safe & Reliable')}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{t('GPS tracking & sanitized vehicles')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Expert Drivers')}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{t('Ghat-road specialists & polite staff')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('Best Price Guarantee')}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{t('Fixed KM rates, no hidden charges')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('24/7 Support')}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{t('Instant dispatch from Palanganatham')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Sleek Modern Booking Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 lg:row-span-2 lg:col-start-8 lg:row-start-1 flex justify-center lg:justify-end w-full order-2 mb-8 lg:mb-0"
            >
              <div className="w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-left">
                <div className="text-center mb-5 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 mb-1 text-blue-600 text-xs font-black uppercase tracking-wider">
                    <CarIcon className="w-4 h-4" />
                    <span>Quick Ride Booking</span>
                  </div>
                  <h3 className="font-['DM_Sans'] font-bold text-lg text-slate-900">Book Your Private Taxi</h3>
                  <p className="text-slate-400 text-xs">Punctual • Air-Conditioned • Experienced Drivers</p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-3 border border-emerald-200">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{t('Booking Confirmed!')}</h3>
                    <p className="text-slate-500 text-xs mb-4">{t('Redirecting to WhatsApp...')}</p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5 }} className="h-full bg-emerald-500" />
                    </div>
                  </motion.div>
                ) : (
                  <form className="space-y-3" onSubmit={handleSubmit}>
                    {/* Pickup */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                      <input ref={pickupRef} type="text" name="fromLocation" value={formData.fromLocation}
                        onChange={handleChange} placeholder={t('Pickup Location (e.g. Madurai Airport)')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('pickup')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center" title="Detect live location">
                        {loadingPickup ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Drop */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                      <input ref={dropRef} type="text" name="toLocation" value={formData.toLocation}
                        onChange={handleChange} placeholder={t('Drop Location (e.g. Rameswaram)')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('drop')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center" title="Detect live location">
                        {loadingDrop ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Name */}
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder={t('Your Name')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder={t('Phone Number')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2 ${!formData.date ? 'text-slate-400' : 'text-slate-800'}`}
                          required
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2 ${!formData.time ? 'text-slate-400' : 'text-slate-800'}`}
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle & Package */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="relative">
                        <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                          <option>{t('Select Vehicle')}</option>
                          {vehicles.map(v => <option key={v.id || v.name} value={v.name}>{t(v.name)}</option>)}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-600" />
                      </div>
                      <div className="relative">
                        <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                          <option>{t('Custom Trip')}</option>
                          {packages.map(p => <option key={p.id || p.name} value={p.name}>{t(p.name)}</option>)}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-600" />
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 text-sm uppercase tracking-wider cursor-pointer mt-2"
                    >
                      {isSubmitting ? t('Processing...') : (
                        <>{t('Confirm & Book on WhatsApp')} <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 pt-2 text-xs text-slate-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Zero Advance Needed • 100% Transparent Billing</span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL BUSINESS INFO STRIP ─────────────────── */}
      <section className="py-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Madurai Best Taxi Travels</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Palanganatham, Madurai - 625003</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:6382513075" className="font-bold text-blue-600 hover:underline">
                📞 +91 63825 13075
              </a>
              <span className="text-slate-300">•</span>
              <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="font-bold text-emerald-600 hover:underline">
                💬 WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO INTRODUCTION SECTION ────────────────────── */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-sm text-center">
            <h2 className="text-3xl lg:text-4xl font-['DM_Sans',sans-serif] font-black text-slate-900 mb-4">
              Best Taxi Service & Tour Packages in Madurai
            </h2>
            <div className="h-1 bg-blue-600 w-20 mx-auto rounded-full mb-6" />
            <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
              <strong>Madurai Best Taxi Travels</strong> is your reliable cab company located at <strong>No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai - 625003</strong>. We specialize in 24/7 local taxi bookings, <Link to="/madurai-airport-taxi" className="text-blue-600 hover:underline font-semibold">Madurai airport pickup and drops</Link>, <Link to="/tempo-traveller-rental-madurai" className="text-blue-600 hover:underline font-semibold">Tempo Traveller rentals</Link>, <Link to="/madurai-to-rameswaram-taxi" className="text-blue-600 hover:underline font-semibold">Madurai to Rameswaram taxi service</Link>, <Link to="/madurai-to-kodaikanal-taxi" className="text-blue-600 hover:underline font-semibold">Kodaikanal hill station cabs</Link>, and customized <Link to="/packages" className="text-blue-600 hover:underline font-semibold">South India tour packages</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR VEHICLES SECTION ──────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              tag="Fleet & Rentals"
              title={<>Premium <span className="text-blue-600">Vehicles</span></>}
              subtitle="Choose from well-maintained sedans, spacious SUVs, and luxury Tempo Travellers."
              center={false}
            />
            <Link
              to="/vehicles"
              className="hidden sm:flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:gap-2.5 transition-all mb-12"
            >
              View All Vehicles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 w-full pb-4">
            {vehicles.slice(0, 4).map((v, i) => (
              <motion.div
                key={v.name + i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm w-full flex flex-col md:flex-row h-auto hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
              >
                {/* Left: Vehicle Image */}
                <div className="bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8 md:w-2/5 min-h-[280px] border-b md:border-b-0 md:border-r border-slate-100">
                  <img
                    src={getVehicleImage(v.image)}
                    alt={`${v.name} taxi rental Madurai`}
                    loading="lazy"
                    className="w-full max-h-56 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
                    <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      {v.seats}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      <Wind className="w-3.5 h-3.5 text-blue-600" />
                      {v.ac || 'AC'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Sanitized
                    </span>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between text-left md:w-3/5">
                  <div>
                    <div className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">{v.seats}</div>
                    <h3 className="text-xl md:text-2xl font-['DM_Sans'] font-black text-slate-900 mb-4">{t(v.name)}</h3>

                    <div className="flex flex-col gap-3 mb-6">
                      {(() => {
                        const plans = parseDesc(v.desc);
                        if (plans && Object.keys(plans).length > 0) {
                          return Object.values(plans).map((plan, pIdx) => (
                            <div key={pIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${pIdx % 2 === 0 ? 'bg-blue-600' : 'bg-emerald-500'}`} />
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{plan.title}</span>
                              </div>
                              {plan.items.map((item, iIdx) => (
                                <div key={iIdx} className={`flex justify-between items-center ${iIdx !== plan.items.length - 1 ? 'mb-1.5' : ''}`}>
                                  <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                                  <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          ));
                        }
                        return (
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-slate-500">Rate</span>
                              <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">{v.price || v.perKm}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-semibold text-slate-500">Min Distance</span>
                              <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">{v.minKm || 'Above 300 kms'}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Starting Rate</div>
                      <div className="text-xl font-['DM_Sans'] font-black text-slate-900">{v.price}</div>
                    </div>
                    <button
                      onClick={() => openBookingModal('vehicle', v.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm tracking-wide shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
                    >
                      {t('Book Now')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link to="/vehicles" className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl transition-all text-sm">
              Explore Complete Fleet ({vehicles.length} Vehicles) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ──────────────────────────── */}
      <section className="py-14 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHeader
              tag="Destinations"
              title="Explore South India with Us"
              subtitle="Temples, hill stations, beaches and cultural heritage destinations from Madurai."
              center={false}
            />
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 font-bold text-sm rounded-full transition-all shadow-xs mb-10"
            >
              {t('Explore All Packages')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'temple', label: 'Temples' },
              { id: 'hills', label: 'Hills' },
              { id: 'beaches', label: 'Beaches' },
              { id: 'heritage', label: 'Heritage' },
              { id: 'nature', label: 'Nature' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDestCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${destCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {destinations
                .filter(dest => destCategory === 'all' || dest.category === destCategory)
                .map((dest) => (
                  <motion.div
                    key={dest.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => window.location.href = '/packages'}
                  >
                    <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                      <img src={dest.img} alt={`${dest.name} Tour`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-left z-10">
                        <h3 className="text-white font-['DM_Sans'] font-black text-base sm:text-lg leading-tight">{dest.name}</h3>
                        <span className="text-[10px] text-blue-300 font-semibold block mt-1">{dest.subtext}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ─────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              tag="Tour Packages"
              title={<>Handcrafted <span className="text-blue-600">Travel Itineraries</span></>}
              subtitle="Tailored for families, pilgrims, couples and group travelers starting from Madurai."
              center={false}
            />
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:gap-2.5 transition-all mb-12"
            >
              {t('View All Packages')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {packages.slice(0, 6).map((pkg, i) => (
              <motion.div
                key={pkg.id || pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col w-full h-full"
              >
                <div className="h-56 relative overflow-hidden bg-slate-900 w-full shrink-0">
                  <img
                    src={getPackageImage(pkg.image)}
                    alt={`${pkg.name} Tour Package`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-20">
                    {t(pkg.duration)}
                  </div>
                </div>
                <div className="p-5 text-left flex flex-col flex-grow w-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-['DM_Sans'] font-black text-slate-900 text-lg line-clamp-1 flex-grow">{t(pkg.name)}</h3>
                    {pkg.rating && (
                      <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{pkg.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-5 leading-relaxed min-h-[32px]">{t(pkg.places)}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Fare From</span>
                      <span className="text-slate-900 font-['DM_Sans'] font-black text-lg">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => openBookingModal('package', pkg.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer active:scale-95"
                    >
                      {t('Book Now')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ─────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-indigo-500 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <AnimatedCounter end={5000} suffix="+" label="Happy Travelers" />
            <AnimatedCounter end={100} suffix="+" label="South India Tours" />
            <AnimatedCounter end={50} suffix="+" label="Destinations Covered" />
            <AnimatedCounter end={80} suffix="+" label="Fleet Vehicles" />
          </div>
        </div>
      </section>

      {/* ── RATINGS BANNER ──────────────────────────────────── */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white text-base">
              5.0
            </div>
            <div className="text-left">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-300 fill-current" />)}
              </div>
              <div className="text-xs text-white/90 font-bold uppercase tracking-wider">Top Rated Taxi in Madurai</div>
            </div>
          </div>

          <div className="h-8 w-px bg-white/20 hidden md:block" />

          <div className="text-center md:text-left text-xs sm:text-sm font-medium text-white/90">
            Over <strong>1,000+ verified customer reviews</strong> across Google & travel portals.
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (GOOGLE REVIEWS) ────────────────── */}
      <Suspense fallback={<div className="py-12 bg-white text-center text-slate-400">Loading reviews...</div>}>
        <GoogleReviews />
      </Suspense>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-[#0F172A] relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 opacity-15">
          <img src={CinematicSouthIndiaBg} alt="South India Travel Banner" className="w-full h-full object-cover" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Direct Booking Hotline
          </div>
          <h2 className="text-3xl lg:text-5xl font-['DM_Sans',sans-serif] font-black text-white mb-4">
            Ready to Start Your Journey with <span className="text-blue-400">Madurai Best?</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Book now for transparent rates, punctual pickups from Palanganatham or Madurai Airport, and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href="tel:6382513075"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 text-xs uppercase tracking-wider"
            >
              <PhoneCall className="w-4 h-4" /> Call +91 63825 13075
            </a>
            <a
              href="https://wa.me/916382513075"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── SEO FAQ SECTION ───────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <FAQAccordion />
        </div>
      </section>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

// FAQ Accordion Component
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Where is Madurai Best Taxi Travels located?',
      a: 'Our registered office is located at No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, Pin Code: 625003. We provide 24/7 pickups across all areas of Madurai.'
    },
    {
      q: 'How much is a taxi from Madurai Airport to city or outstation?',
      a: 'Taxi fares from Madurai Airport start from ₹700 for local city drops, while outstation travel starts from ₹13–₹14/km depending on vehicle type (Sedan, Innova, or Tempo Traveller).'
    },
    {
      q: 'Do you offer Tempo Traveller and Innova Crysta rentals?',
      a: 'Yes! We provide 12, 14, and 18-seater air-conditioned Tempo Travellers and premium 7-seater Toyota Innova Crystas with experienced drivers for group travel.'
    },
    {
      q: 'Can I book a one-way cab from Madurai to Rameswaram or Kodaikanal?',
      a: 'Yes, we offer both one-way drops and round-trip customized tour packages from Madurai to Rameswaram, Kodaikanal, Ooty, Munnar, Kanyakumari, and beyond.'
    },
    {
      q: 'How can I confirm my cab booking?',
      a: 'You can instantly book by filling out the online booking form on our website, calling us directly at +91 63825 13075, or messaging us on WhatsApp.'
    }
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">HAVE QUESTIONS?</span>
        <h2 className="text-3xl font-['DM_Sans'] font-black text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-3" />
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-['DM_Sans'] font-bold text-slate-800 text-sm md:text-base hover:bg-slate-100/60 transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-blue-600 shrink-0 ml-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-40 border-t border-slate-200' : 'max-h-0'}`}
            >
              <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-white">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
