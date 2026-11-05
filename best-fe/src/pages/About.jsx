import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, ThumbsUp, Heart, Award, Star, MapPin, ArrowRight, PhoneCall, MessageCircle, Car, Headset } from 'lucide-react';
import MeenakshiBg from '../assets/meenakshi_bg.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import Logo from '../assets/new_logo.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: t('Safety First'),
      desc: t('Your safety and comfort are our top priorities. We follow strict safety standards and GPS tracking on every journey.'),
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-blue-500" />,
      title: t('Customer Satisfaction'),
      desc: t('We go above and beyond to make sure every traveler experiences smooth journeys, punctuality, and transparent billing.'),
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-500" />,
      title: t('Passion for Travel'),
      desc: t('We love showcasing the beauty, temples, hill stations, and heritage of Tamil Nadu and South India with genuine hospitality.'),
    },
  ];

  const teamStats = [
    { icon: <Car className="w-7 h-7 text-blue-600" />, count: '50+', name: 'Professional Drivers', desc: 'Skilled, verified & ghat-road experienced' },
    { icon: <Headset className="w-7 h-7 text-blue-600" />, count: '24/7', name: 'Customer Support', desc: 'Always available for bookings & queries' },
    { icon: <MapPin className="w-7 h-7 text-blue-600" />, count: '10+', name: 'Travel Experts', desc: 'Crafting personalized South India itineraries' },
    { icon: <Star className="w-7 h-7 text-blue-600" />, count: '1000+', name: 'Happy Travelers', desc: 'Real 5-star ratings across South India' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[48vh] lg:h-[60vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img
            src={CinematicSouthIndiaBg}
            alt="About Us — Madurai Best Taxi Travels"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/80 to-[#0F172A]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Trusted Taxi Partner in Madurai Since 2015
          </div>

          <h1 className="text-4xl lg:text-6xl font-['DM_Sans',sans-serif] font-black text-white mb-4 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Madurai Best Taxi Travels</span>
          </h1>
          <p className="text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Headquartered at Palanganatham, Madurai, we provide top-tier car rentals, 24/7 outstation cabs, airport drops, and tailor-made South India holiday packages.
          </p>
        </motion.div>
      </section>

      {/* ── STORY SECTION ────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: Story */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-0.5 bg-blue-600" />
                OUR JOURNEY & PROMISE
              </div>

              <h2 className="text-3xl lg:text-5xl font-['DM_Sans',sans-serif] font-black text-slate-900 mb-4 leading-tight">
                Delivering Excellence in <br />
                <span className="text-blue-600">Every Single Ride</span>
              </h2>
              <div className="h-1 w-16 bg-blue-600 rounded-full mb-6" />

              <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-4">
                <strong>Madurai Best Taxi Travels</strong> was established with a singular vision: to make travel across Madurai, Tamil Nadu, and South India safe, affordable, and delightfully comfortable.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-8">
                Operating from our office at <em>No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai</em>, we manage a premium fleet of hatchbacks, sedans, luxury SUVs like Innova Crysta, and 12-18 seater Tempo Travellers. Whether it is an early-morning Madurai airport pickup, a family pilgrimage to Rameswaram, or a scenic mountain drive to Kodaikanal and Ooty, our experienced drivers make every trip effortless.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: <Star className="w-5 h-5 text-blue-600" />, val: '10+', label: 'Years Experience' },
                  { icon: <Car className="w-5 h-5 text-blue-600" />, val: '5000+', label: 'Happy Travelers' },
                  { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, val: '100%', label: 'Safety Verified' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 sm:p-5 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center mb-1.5">{stat.icon}</div>
                    <div className="text-2xl font-['DM_Sans'] font-black text-slate-900 mb-0.5">{stat.val}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image with floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -top-3 -left-3 w-full h-full rounded-3xl border-2 border-blue-500/20 z-0" />

              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={MeenakshiBg}
                  alt="Madurai Meenakshi Temple Taxi Travels"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left z-20">
                  <p className="text-xs uppercase font-bold tracking-widest text-blue-400">Headquarters</p>
                  <h3 className="text-xl font-['DM_Sans'] font-black">Palanganatham, Madurai</h3>
                  <p className="text-xs text-slate-300">Serving all South India tourist circuits</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3.5 border border-slate-200 z-20"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                  <img src={Logo} alt="Logo icon" className="w-8 h-8 object-contain" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-xs leading-tight">Madurai Best</div>
                  <div className="font-black text-blue-600 text-sm">Taxi Travels</div>
                  <div className="text-slate-400 text-[10px] font-medium">Pin: 625003</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2">WHAT WE STAND FOR</span>
            <h2 className="text-3xl lg:text-5xl font-['DM_Sans',sans-serif] font-black text-white">
              Our Core <span className="text-blue-400">Values</span>
            </h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  {v.icon}
                </div>
                <h3 className="text-xl font-['DM_Sans'] font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM STATS ────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">OUR STRENGTH</span>
            <h2 className="text-3xl lg:text-5xl font-['DM_Sans',sans-serif] font-black text-slate-900">
              The People Driving <span className="text-blue-600">Your Journey</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-200">
              {teamStats.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 text-blue-600">
                    {item.icon}
                  </div>
                  <div className="text-3xl lg:text-5xl font-['DM_Sans'] font-black text-slate-900 mb-1">
                    {item.count}
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-blue-600 mb-1.5 uppercase tracking-wider">{item.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[180px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F172A] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="relative z-10 flex items-center gap-5 text-left">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-['DM_Sans'] font-black text-white leading-tight">
                  Ready to Book with <span className="text-blue-400">Madurai Best?</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Enjoy reliable pickups, courteous drivers, and competitive rates.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <a
                href="tel:6382513075"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-blue-600/30 text-sm"
              >
                <PhoneCall className="w-4 h-4" /> Call +91 63825 13075
              </a>
              <a
                href="https://wa.me/916382513075"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-full transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
