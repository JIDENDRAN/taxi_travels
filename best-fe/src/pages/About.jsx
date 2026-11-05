import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, ThumbsUp, Heart, Award, Star, MapPin, ArrowRight, PhoneCall, MessageCircle, Car, Headset, Sparkles, CheckCircle2 } from 'lucide-react';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import Logo from '../assets/new_logo.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      title: t('Safety & GPS Vigilance'),
      desc: t('24/7 route tracking, verified drivers, and zero-compromise mechanical maintenance on every highway & ghat journey.'),
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-amber-500" />,
      title: t('Executive Hospitality'),
      desc: t('Polite, seasoned chauffeurs who respect your schedule, provide clean bottled refreshments, and ensure tranquil rides.'),
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-700" />,
      title: t('Transparent Integrity'),
      desc: t('Strict no-hidden-cost guarantee. What we quote is exactly what you pay, with driver allowances and tolls clearly stated.'),
    },
  ];

  const teamStats = [
    { icon: <Car className="w-6 h-6 text-blue-700" />, count: '50+', name: 'Verified Chauffeurs', desc: 'Hill station & ghat-road trained' },
    { icon: <Headset className="w-6 h-6 text-amber-500" />, count: '24/7', name: 'Concierge Desk', desc: 'Direct phone & WhatsApp booking' },
    { icon: <MapPin className="w-6 h-6 text-blue-700" />, count: '10+', name: 'Travel Specialists', desc: 'Custom South India itinerary planning' },
    { icon: <Star className="w-6 h-6 text-amber-500" />, count: '1000+', name: '5-Star Reviews', desc: 'Real pilgrims, tourists & corporate guests' },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/70 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Madurai’s Trusted Travel Partner Since 2015
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-['Outfit'] font-black text-slate-900 mb-4 tracking-tight leading-tight">
              ABOUT <span className="text-blue-700">MADURAI BEST</span> TAXI TRAVELS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Operating proudly from Palanganatham, Madurai, we deliver bespoke taxi services, outstation trips, airport transfers, and family tour packages with absolute comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY & HERITAGE ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Narrative */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-6 h-0.5 bg-blue-700" />
                OUR STORY & MISSION
              </div>

              <h2 className="text-2xl sm:text-4xl font-['Outfit'] font-black text-slate-900 mb-4 leading-tight">
                Crafting Reliable & Comfortable <br />
                <span className="text-blue-700">Journeys Since 2015</span>
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                <strong>Madurai Best Taxi Travels</strong> was established to provide visitors and locals in the temple city of Madurai a dependable, courteous, and transparent travel experience.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-8">
                Operating directly from our registered office at <em>No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai - 625003</em>, we manage a premium fleet of Toyota Innova Crysta, modern sedans, and luxury Tempo Travellers. We ensure your journeys to Rameswaram, Kodaikanal, Ooty, Munnar, and Kerala are safe, tranquil, and memorable.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: <Star className="w-5 h-5 text-amber-500" />, val: '10+', label: 'Years Service' },
                  { icon: <Car className="w-5 h-5 text-blue-600" />, val: '50K+', label: 'Happy Travelers' },
                  { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, val: '100%', label: 'Safety Verified' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-200"
                  >
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-2xl font-['Outfit'] font-black text-slate-900">{stat.val}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={MeenakshiBg}
                  alt="Madurai Meenakshi Temple"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left z-20">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Palanganatham, Madurai</p>
                  <h3 className="text-2xl font-['Outfit'] font-bold text-white">Madurai Best Taxi Travels</h3>
                  <p className="text-xs text-slate-300">Punctual Drivers • 24/7 Booking Desk</p>
                </div>
              </div>

              {/* Floating Address Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-2xl p-4 flex items-center gap-3 border border-slate-200 shadow-xl z-20">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-1">
                  <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-xs">Official Travels</div>
                  <div className="text-blue-700 text-xs font-black">Palanganatham, Madurai</div>
                  <div className="text-slate-500 text-[10px]">Pin: 625003</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-2">WHAT DEFINES US</span>
            <h2 className="text-2xl sm:text-4xl font-['Outfit'] font-black text-slate-900">
              Our Core Commitments
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-lg font-['Outfit'] font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM STATS ──────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-100">
            {teamStats.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-['Outfit'] font-black text-slate-900 mb-1">
                  {item.count}
                </div>
                <h3 className="text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider">{item.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[180px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-['Outfit'] font-bold text-slate-900 leading-tight">
                  Ready to travel with Madurai Best?
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Instant reservation from Palanganatham or Madurai Airport (IXM).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:6382513075"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider shadow-xs"
              >
                <PhoneCall className="w-4 h-4 fill-slate-950" /> Call +91 63825 13075
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
