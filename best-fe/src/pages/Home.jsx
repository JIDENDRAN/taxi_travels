import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
import {
  PhoneCall, Calendar, MapPin, Clock, Users, ShieldCheck, Car as CarIcon,
  CheckCircle2, MessageCircle, Star, Navigation, ArrowRight,
  Wind, Sparkles, Award, ChevronDown, Check
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../utils/imageImports';
import BookingModal from '../components/BookingModal';
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
      <div className="text-4xl lg:text-5xl font-cinzel font-black text-gold-gradient tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-semibold">
        {label}
      </div>
    </div>
  );
};

// ─── Luxury Section Header ────────────────────────────────────
const SectionHeader = ({ tag, title, subtitle, center = true }) => (
  <div className={`mb-14 ${center ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 ${center ? 'justify-center' : ''}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
      <span>{tag}</span>
      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl lg:text-5xl font-cinzel font-black text-white leading-tight tracking-wide"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '60px' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4 ${center ? 'mx-auto' : ''}`}
    />
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-sm lg:text-base text-gray-400 mt-4 max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ─── Main Home Component ──────────────────────────────────────
const Home = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], ['0%', '12%']);

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
      const text = `*New Booking Request*\n\nFrom: ${formData.fromLocation}\nTo: ${formData.toLocation}\nDate: ${formData.date}\nTime: ${formData.time}\nVehicle: ${formData.vehicle}\nPackage: ${formData.packageType}\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nBooked via: Madurai Best Taxi Travels (Palanganatham)`;
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

  const inputCls = 'w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#030712]/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none transition-all';
  const selectCls = 'w-full pl-4 pr-10 py-3.5 rounded-2xl bg-[#030712]/70 border border-white/10 text-white text-xs sm:text-sm font-semibold appearance-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] outline-none transition-all cursor-pointer';

  return (
    <div className="bg-[#030712] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── LUXURY HERO SECTION ───────────────────────────── */}
      <section className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden bg-[#030712] pt-28 pb-16 lg:py-28">
        
        {/* Dynamic Background Slideshow with Cinematic Shadow Gradient */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={bgIndex}
              src={heroImages[bgIndex]}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              style={{ y: yBg }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="South India Luxury Taxi Tours"
            />
          </AnimatePresence>
          {/* Obsidian Vignette Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/85 to-[#030712]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none" />
        </div>

        {/* Hero Interactive Core */}
        <div className="relative z-10 w-full animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Prestigious Typography */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Luxury Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 text-[#F5D061] text-xs font-bold uppercase tracking-[0.25em] mb-5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span>The Gold Standard in Cab Services</span>
              </div>

              <h1 className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-[1.08] mb-4">
                MADURAI <span className="text-gold-gradient">BEST</span> <br />
                <span className="text-2xl sm:text-4xl lg:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-silver-gradient tracking-tight">
                  TAXI TRAVELS
                </span>
              </h1>

              <p className="text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003
              </p>

              {/* Fleet Display */}
              <div className="my-4 w-full flex items-center justify-center lg:justify-start">
                <img
                  src={HeroImage}
                  alt="Madurai Best Taxi Fleet"
                  className="w-11/12 md:w-5/6 lg:w-4/5 max-w-lg lg:max-w-xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                />
              </div>

              <p className="text-gray-300 text-sm max-w-xl mb-8 leading-relaxed font-normal">
                {t('Experience seamless airport transfers, divine temple pilgrimages, and scenic hill station tours across South India in premium Innova Crystas, sedans, and luxury Tempo Travellers.')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="tel:6382513075"
                  className="flex items-center gap-2.5 px-8 py-4 bg-gold-gradient text-black font-extrabold rounded-full transition-all text-xs uppercase tracking-wider gold-glow hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
                >
                  <PhoneCall className="w-4 h-4 fill-black" /> {t('Call +91 63825 13075')}
                </a>
                <a
                  href="https://wa.me/916382513075"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-8 py-4 border border-emerald-500/40 bg-emerald-600/20 hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all text-xs uppercase tracking-wider shadow-lg hover:scale-105 backdrop-blur-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> {t('WhatsApp Us')}
                </a>
              </div>

              {/* Verified Trust Points */}
              <div className="hidden sm:grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10 w-full max-w-xl text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> GPS Monitored
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">Real-time safety on highway & ghats</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#D4AF37]" /> Expert Drivers
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">Verified & courteous chauffeurs</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[#D4AF37]" /> Punctual 24/7
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">Zero wait time airport pickup</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Premium Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            >
              <div className="w-full max-w-[450px] glass-obsidian-elevated rounded-3xl p-6 sm:p-8 gold-border-glow shadow-2xl relative overflow-hidden text-left">
                {/* Golden ambient corner light */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-6 pb-4 border-b border-white/10 text-left">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">
                    <CarIcon className="w-4 h-4" />
                    <span>Instant Taxi Booking</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">Reserve Your Cab</h3>
                  <p className="text-gray-400 text-xs mt-1">Direct confirmation • No hidden toll charges</p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{t('Reservation Dispatched!')}</h3>
                    <p className="text-gray-400 text-xs mb-5">{t('Connecting to WhatsApp booking desk...')}</p>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5 }} className="h-full bg-gold-gradient" />
                    </div>
                  </motion.div>
                ) : (
                  <form className="space-y-3.5" onSubmit={handleSubmit}>
                    {/* Pickup */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input ref={pickupRef} type="text" name="fromLocation" value={formData.fromLocation}
                        onChange={handleChange} placeholder={t('Pickup Location (e.g. Madurai Airport)')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('pickup')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#F5D061] transition-colors flex items-center justify-center cursor-pointer" title="Detect live location">
                        {loadingPickup ? <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Drop */}
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input ref={dropRef} type="text" name="toLocation" value={formData.toLocation}
                        onChange={handleChange} placeholder={t('Drop Location (e.g. Rameswaram / Kodaikanal)')} className={inputCls} required />
                      <button type="button" onClick={() => detectLocation('drop')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#F5D061] transition-colors flex items-center justify-center cursor-pointer" title="Detect live location">
                        {loadingDrop ? <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                          : <Navigation className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Customer Name */}
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder={t('Your Full Name')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder={t('Phone Number (e.g. +91 ...)')} className={`${inputCls} pr-2`} required />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2`}
                          required
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37] w-4 h-4" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          onKeyDown={(e) => e.preventDefault()}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className={`${inputCls} pr-2`}
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle & Package Selectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select name="vehicle" value={formData.vehicle} onChange={handleChange} className={selectCls}>
                          <option>{t('Select Vehicle')}</option>
                          {vehicles.map(v => <option key={v.id || v.name} value={v.name}>{t(v.name)}</option>)}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#D4AF37]" />
                      </div>
                      <div className="relative">
                        <select name="packageType" value={formData.packageType} onChange={handleChange} className={selectCls}>
                          <option>{t('Custom Trip')}</option>
                          {packages.map(p => <option key={p.id || p.name} value={p.name}>{t(p.name)}</option>)}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-gradient text-black font-extrabold py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs uppercase tracking-widest cursor-pointer mt-3 flex items-center justify-center gap-2 gold-glow"
                    >
                      {isSubmitting ? t('Confirming...') : (
                        <>{t('Confirm Reservation')} <ArrowRight className="w-4 h-4 stroke-[3]" /></>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-gray-400 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Zero Advance Required • 100% Guaranteed Pickup</span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRESTIGE FLEET SHOWCASE ───────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0B0F19] relative border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <SectionHeader
              tag="First-Class Travel"
              title={<>The <span className="text-gold-gradient">Executive Fleet</span></>}
              subtitle="Pristine sedans, luxury SUVs, and executive Tempo Travellers meticulously inspected before every dispatch."
              center={false}
            />
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gold-gradient hover:text-black font-bold text-xs uppercase tracking-wider transition-all mb-14"
            >
              View Full Fleet ({vehicles.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.slice(0, 6).map((v, i) => (
              <motion.div
                key={v.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-obsidian rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] flex flex-col group"
              >
                {/* Vehicle Image Container */}
                <div className="relative h-60 bg-gradient-to-b from-[#1F2937]/50 to-[#0B0F19] p-6 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute top-4 right-4 bg-black/60 border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[10px] font-bold text-[#F5D061] uppercase tracking-wider">
                    {v.seats}
                  </div>
                  <img
                    src={getVehicleImage(v.image)}
                    alt={v.name}
                    loading="lazy"
                    className="w-full h-44 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[11px] text-gray-300">
                      <Wind className="w-3.5 h-3.5 text-[#D4AF37]" /> {v.ac || 'AC'}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Sanitized
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">{t(v.name)}</h3>
                  
                  {/* Pricing Plans Summary */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {(() => {
                      const plans = parseDesc(v.desc);
                      if (plans && Object.keys(plans).length > 0) {
                        const firstPlan = Object.values(plans)[0];
                        return (
                          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                            <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{firstPlan.title}</div>
                            {firstPlan.items.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">{item.label}</span>
                                <span className="font-bold text-white">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs flex justify-between">
                          <span className="text-gray-400">Outstation Rate</span>
                          <span className="font-bold text-[#F5D061]">{v.price || 'Competitive Rate'}</span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Base Price</div>
                      <div className="text-lg font-cinzel font-black text-gold-gradient">{v.price}</div>
                    </div>
                    <button
                      onClick={() => openBookingModal('vehicle', v.name)}
                      className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURATED TOUR PACKAGES ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#030712] relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeader
            tag="Signature Itineraries"
            title={<>Curated South India <span className="text-gold-gradient">Experiences</span></>}
            subtitle="Explore spiritual temples, misty tea valleys, and tropical backwaters with our private tour coordinators."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.slice(0, 6).map((pkg, i) => (
              <motion.div
                key={pkg.id || pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-obsidian rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex flex-col group"
              >
                <div className="h-60 relative overflow-hidden bg-gray-900">
                  <img
                    src={getPackageImage(pkg.image)}
                    alt={pkg.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 right-4 bg-black/70 border border-[#D4AF37]/50 text-[#F5D061] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-cinzel text-lg font-bold text-white line-clamp-1">{t(pkg.name)}</h3>
                    {pkg.rating && (
                      <div className="flex items-center gap-1 text-xs font-bold text-[#F5D061] shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{pkg.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-6 leading-relaxed flex-grow">
                    {t(pkg.places)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Package Starting</span>
                      <span className="font-cinzel font-black text-lg text-gold-gradient">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => openBookingModal('package', pkg.name)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-gold-gradient hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ICONIC DESTINATIONS ───────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0B0F19] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeader
            tag="Explore South India"
            title={<>Iconic Travel <span className="text-gold-gradient">Destinations</span></>}
            subtitle="Round-trip and one-way drops originating from Palanganatham and Madurai Airport."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Circuits' },
              { id: 'temple', label: 'Pilgrimage & Temples' },
              { id: 'hills', label: 'Hill Stations' },
              { id: 'beaches', label: 'Coastal Escapes' },
              { id: 'nature', label: 'Nature & Backwaters' },
              { id: 'heritage', label: 'Royal Heritage' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDestCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  destCategory === tab.id
                    ? 'bg-gold-gradient text-black shadow-lg shadow-[#D4AF37]/20 font-black'
                    : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-[#D4AF37]/30 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                    className="group cursor-pointer rounded-3xl overflow-hidden border border-white/10 shadow-lg relative aspect-[3/4] bg-gray-950"
                    onClick={() => window.location.href = '/packages'}
                  >
                    <img
                      src={dest.img}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-left z-10">
                      <h4 className="font-cinzel font-bold text-white text-base leading-tight">{dest.name}</h4>
                      <p className="text-[10px] text-[#F5D061] mt-0.5 font-medium">{dest.subtext}</p>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PRESTIGE METRICS BAR ──────────────────────────── */}
      <section className="py-16 bg-[#030712] border-y border-[#D4AF37]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={5000} suffix="+" label="Satisfied Travelers" />
            <AnimatedCounter end={100} suffix="+" label="Tailored Tours" />
            <AnimatedCounter end={50} suffix="+" label="South India Destinations" />
            <AnimatedCounter end={80} suffix="+" label="Premium Cabs & Coaches" />
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS SECTION ────────────────────────── */}
      <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading verified reviews...</div>}>
        <GoogleReviews />
      </Suspense>

      {/* ── FAQ ACCORDION ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0B0F19] border-t border-white/[0.06]">
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

// ─── FAQ Component ────────────────────────────────────────────
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Where is Madurai Best Taxi Travels situated?',
      a: 'Our registered headquarters is located at No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, Pin Code: 625003. We provide instant pickups across all locations in Madurai, railway stations, and airport terminals.'
    },
    {
      q: 'How are the outstation cab fares calculated?',
      a: 'We offer fully transparent, fixed per-kilometer pricing starting from ₹13/km for sedans and ₹18/km for Innova Crysta, with driver allowances and tolls clearly stated upfront with zero hidden charges.'
    },
    {
      q: 'Do you offer pickup service from Madurai Airport (IXM)?',
      a: 'Yes, our airport transfer service includes complimentary flight tracking. Even if your flight is delayed, our chauffeur will be waiting for you at the arrival terminal.'
    },
    {
      q: 'What types of Tempo Travellers and group vehicles are available?',
      a: 'We provide luxury 12, 14, and 18-seater air-conditioned Force Tempo Travellers, alongside Force Urbania coaches equipped with individual pushback seats, charging ports, and luggage bays.'
    },
    {
      q: 'How do I secure an advance booking?',
      a: 'You can submit your trip details via our online reservation form, contact our 24/7 hotline at +91 63825 13075, or message us on WhatsApp for instant booking confirmation.'
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-2">HAVE QUESTIONS?</span>
        <h2 className="font-cinzel text-3xl lg:text-4xl font-bold text-white">
          Frequently Answered Inquiries
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-obsidian rounded-2xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-white text-sm sm:text-base hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 ml-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-48 border-t border-white/10' : 'max-h-0'}`}
            >
              <div className="p-5 text-gray-300 text-xs sm:text-sm leading-relaxed bg-black/40">
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
