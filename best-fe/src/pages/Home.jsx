import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  CheckCircle2,
  Car,
  Star,
  ChevronRight,
  Sparkles,
  Plane
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import HeroImage from '../assets/hero.png';
import KeralaBg from '../assets/kerala_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MeenakshiBg from '../assets/meenakshi_bg.png';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [activeTab, setActiveTab] = useState('outstation'); // outstation, oneway, airport, local

  // Booking Form State
  const [tripType, setTripType] = useState('roundtrip');
  const [pickupCity, setPickupCity] = useState('Madurai');
  const [dropCity, setDropCity] = useState('Rameswaram');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('06:00');
  const [passengers, setPassengers] = useState('4');

  const openBooking = (vehicle = '') => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const handleQuickBook = (e) => {
    e.preventDefault();
    const text = `*New Booking Request - Madurai Best Taxi Travels*%0A%0A*Type:* ${activeTab.toUpperCase()}%0A*Pickup:* ${pickupCity}%0A*Drop:* ${dropCity}%0A*Date:* ${travelDate || 'Earliest'}%0A*Time:* ${travelTime}%0A*Passengers:* ${passengers} Persons%0A%0APlease share available cab options and final quote.`;
    window.open(`https://wa.me/916382513075?text=${text}`, '_blank');
  };

  const destinations = [
    {
      name: 'Kerala',
      tagline: "God's Own Country",
      image: KeralaBg,
      link: '/packages',
      price: '₹ 8,999'
    },
    {
      name: 'Kodaikanal',
      tagline: 'Princess of Hill Stations',
      image: KodaikanalBg,
      link: '/packages',
      price: '₹ 2,799'
    },
    {
      name: 'Rameswaram',
      tagline: 'Spiritual Island & Pamban',
      image: RameswaramBg,
      link: '/packages',
      price: '₹ 2,499'
    },
    {
      name: 'Munnar',
      tagline: 'Lush Green Tea Hills',
      image: MunnarBg,
      link: '/packages',
      price: '₹ 3,499'
    }
  ];

  const popularRoutes = [
    { from: 'Madurai', to: 'Rameswaram', km: '175 km', fare: '₹2,499', type: 'Sedan AC' },
    { from: 'Madurai', to: 'Kodaikanal', km: '120 km', fare: '₹2,799', type: 'Sedan AC' },
    { from: 'Madurai', to: 'Airport (IXM)', km: '15 km', fare: '₹699', type: 'Sedan AC' },
    { from: 'Madurai', to: 'Munnar', km: '160 km', fare: '₹3,499', type: 'Innova AC' },
    { from: 'Madurai', to: 'Kanyakumari', km: '245 km', fare: '₹3,999', type: 'Sedan AC' },
    { from: 'Madurai', to: 'Ooty Hills', km: '280 km', fare: '₹4,499', type: 'Innova AC' }
  ];

  return (
    <div className="bg-white min-h-screen text-[#0B192C] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. HERO SECTION (EXACT REPLICATION OF MOCKUP HOME PAGE) ── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#DDF0FF] via-[#EDF6FF] to-white">
        
        {/* Palm Leaves Framing Graphic on Top Left & Top Right */}
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 pointer-events-none opacity-25 -translate-x-10 -translate-y-10">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-emerald-800">
            <path d="M20 20 C60 10 120 40 140 100 C110 90 70 80 40 110 C40 70 30 40 20 20 Z" fill="currentColor" opacity="0.3"/>
            <path d="M10 50 C50 60 90 110 90 180 C70 140 40 120 10 130 Z" fill="currentColor" opacity="0.4"/>
            <path d="M0 0 C40 20 80 80 80 150 C50 110 30 80 0 70 Z" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 pointer-events-none opacity-25 translate-x-10 -translate-y-10 scale-x-[-1]">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-emerald-800">
            <path d="M20 20 C60 10 120 40 140 100 C110 90 70 80 40 110 C40 70 30 40 20 20 Z" fill="currentColor" opacity="0.3"/>
            <path d="M10 50 C50 60 90 110 90 180 C70 140 40 120 10 130 Z" fill="currentColor" opacity="0.4"/>
            <path d="M0 0 C40 20 80 80 80 150 C50 110 30 80 0 70 Z" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Script Tagline + Big Bold Title + Plan Your Trip Button */}
            <div className="lg:col-span-7">
              
              {/* Script Cursive Accent Text */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#0B2545] font-semibold tracking-wide mb-1"
              >
                Explore the World with
              </motion.div>

              {/* Bold Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.08] mb-4"
              >
                Madurai Best <br />
                <span className="text-[#0A192F]">Taxi Travels</span>
              </motion.h1>

              {/* Sub-tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-600 text-sm sm:text-base font-medium mb-7 flex items-center flex-wrap gap-2"
              >
                <span>Travel More</span>
                <span className="text-[#FBBF24]">•</span>
                <span>Worry Less</span>
                <span className="text-[#FBBF24]">•</span>
                <span>Create Lifelong Memories</span>
              </motion.p>

              {/* Plan Your Trip Button (Yellow Pill with Arrow) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <button
                  onClick={() => openBooking()}
                  className="btn-yellow-pill inline-flex items-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold shadow-md cursor-pointer"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <a
                  href="tel:6382513075"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-300 bg-white/80 hover:bg-white text-slate-800 text-sm font-bold shadow-xs hover:border-slate-400 transition-all"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>+91 63825 13075</span>
                </a>
              </motion.div>

              {/* Small trust badge */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span>4.9 / 5 Rating • 50,000+ Happy Travellers in Tamil Nadu</span>
              </div>
            </div>

            {/* Right Column: Hero Vehicle Visual on Highway */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Soft glow circle behind */}
                <div className="absolute inset-0 bg-blue-300/30 rounded-full blur-3xl scale-95" />
                
                {/* Modern vehicle showcase */}
                <img
                  src={HeroImage}
                  alt="Madurai Best Taxi & Coach Fleet"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── 2. FLOATING 4-PILLAR FEATURE STRIP (MATCHING REFERENCE MOCKUP) ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-xl p-4 sm:p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              
              <div className="flex items-center gap-3 px-2 sm:px-4 pt-2 sm:pt-0">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    Outstation & Local Trips
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">All South India</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 sm:px-4 pt-2 sm:pt-0">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    Safe & Comfortable
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Sanitized Vehicles</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 sm:px-4 pt-2 sm:pt-0">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    24/7 Travel Support
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Always Available</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 sm:px-4 pt-2 sm:pt-0">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    Experienced Team
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Ghat Certified Drivers</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ── 3. POPULAR DESTINATIONS (MATCHING MOCKUP DESTINATION CARDS) ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 mb-2">
              Popular Destinations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Discover breathtaking destinations across Tamil Nadu, Kerala, and South India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="destination-card group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-100"
                onClick={() => openBooking(dest.name)}
              >
                {/* Background Image with Dark Gradient Overlay */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left flex items-end justify-between">
                  <div>
                    <h3 className="font-['Outfit'] font-black text-2xl text-white tracking-tight mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-200 font-medium line-clamp-1">
                      {dest.tagline}
                    </p>
                    <div className="text-xs text-[#FBBF24] font-bold mt-1">
                      From {dest.price}
                    </div>
                  </div>

                  {/* Circular White Arrow Button (Matching Mockup) */}
                  <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#FBBF24] transition-colors">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. QUICK CAB BOOKING WIDGET & POPULAR FIXED FARES ── */}
      <section className="py-14 bg-gradient-to-b from-[#F8FAFC] to-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Instant Taxi Booking
            </span>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 mt-2 mb-2">
              Book Outstation Cabs & Airport Taxi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              No surge pricing • Transparent per-km rates • Chilled AC cabs
            </p>
          </div>

          {/* Quick Booking Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 mb-12">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 mb-6">
              {[
                { id: 'outstation', label: 'Outstation Round Trip' },
                { id: 'oneway', label: 'One-Way Drop Taxi' },
                { id: 'airport', label: 'Airport Transfer (IXM)' },
                { id: 'local', label: 'Local Hourly Rental' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#FBBF24] text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pickup City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-blue-600 focus:outline-none"
                    placeholder="e.g. Madurai"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Drop City / Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-blue-600 focus:outline-none"
                    placeholder="e.g. Rameswaram"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Popular Fixed Fare Route Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {route.type} • {route.km}
                  </div>
                  <div className="font-['Outfit'] font-black text-sm text-slate-900 mt-0.5">
                    {route.from} ➔ {route.to}
                  </div>
                  <div className="text-amber-600 font-extrabold text-sm mt-1">
                    {route.fare} <span className="text-[10px] text-slate-400 font-medium">all-inclusive</span>
                  </div>
                </div>
                <button
                  onClick={() => openBooking(`${route.from} to ${route.to}`)}
                  className="bg-slate-100 hover:bg-[#FBBF24] text-slate-900 font-bold text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Book ➔
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. BOTTOM BLUE WAVY BANNER WITH SCRIPT: "Let's Travel Together..." ── */}
      <section className="relative bg-[#0A192F] text-white overflow-hidden py-14">
        
        {/* Soft Wave SVG Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full object-cover">
            <path
              fill="#0284C7"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Cursive Tagline */}
          <div>
            <div className="font-script text-3xl sm:text-4xl text-[#FBBF24]">
              Let's Travel Together...
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Start your next journey across Madurai, Rameswaram, Kodaikanal and Kerala with trusted drivers and sanitized vehicles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className="btn-yellow-pill px-7 py-3 text-sm font-bold shadow-md cursor-pointer"
            >
              Book Cab Now
            </button>
            <a
              href="tel:6382513075"
              className="px-6 py-3 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white text-sm font-bold transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#FBBF24]" />
              <span>Call 24/7</span>
            </a>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVehicle={selectedVehicle}
      />

    </div>
  );
};

export default Home;
