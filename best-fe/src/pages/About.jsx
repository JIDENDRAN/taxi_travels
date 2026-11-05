import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, ThumbsUp, Heart, Award, Star, MapPin, ArrowRight, PhoneCall, MessageCircle, Car, Headset, Sparkles } from 'lucide-react';
import MeenakshiBg from '../assets/meenakshi_bg.png';
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
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      title: t('Safety & GPS Vigilance'),
      desc: t('24/7 route tracking, verified drivers, and zero-compromise mechanical maintenance on every highway & ghat journey.'),
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-[#D4AF37]" />,
      title: t('Executive Hospitality'),
      desc: t('Polite, seasoned chauffeurs who respect your schedule, provide clean bottled refreshments, and ensure tranquil rides.'),
    },
    {
      icon: <Heart className="w-6 h-6 text-[#D4AF37]" />,
      title: t('Transparent Integrity'),
      desc: t('Strict no-hidden-cost guarantee. What we quote is exactly what you pay, with driver allowances and tolls clearly stated.'),
    },
  ];

  const teamStats = [
    { icon: <Car className="w-7 h-7 text-[#D4AF37]" />, count: '50+', name: 'Verified Chauffeurs', desc: 'Hill station & ghat-road trained' },
    { icon: <Headset className="w-7 h-7 text-[#D4AF37]" />, count: '24/7', name: 'Concierge Desk', desc: 'Direct phone & WhatsApp booking' },
    { icon: <MapPin className="w-7 h-7 text-[#D4AF37]" />, count: '10+', name: 'Travel Specialists', desc: 'Custom South India itinerary planning' },
    { icon: <Star className="w-7 h-7 text-[#D4AF37]" />, count: '1000+', name: '5-Star Reviews', desc: 'Real pilgrims, tourists & corporate guests' },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── LUXURY HERO ─────────────────────────────────── */}
      <section className="relative h-[55vh] lg:h-[65vh] flex items-center justify-center overflow-hidden bg-[#030712]">
        <div className="absolute inset-0">
          <img
            src={CinematicSouthIndiaBg}
            alt="About Us — Madurai Best Taxi Travels"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 text-[#F5D061] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Madurai’s Trusted Travel Partner Since 2015
          </div>

          <h1 className="text-4xl lg:text-7xl font-cinzel font-black text-white mb-4 leading-tight tracking-wide">
            ABOUT <span className="text-gold-gradient">US</span>
          </h1>
          <p className="text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Operating from Palanganatham, Madurai, we deliver bespoke taxi services, outstation trips, airport transfers, and family tour packages with absolute comfort.
          </p>
        </motion.div>
      </section>

      {/* ── STORY & HERITAGE ─────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0B0F19] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left Narrative */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                <span className="w-6 h-0.5 bg-[#D4AF37]" />
                OUR LEGACY & MISSION
              </div>

              <h2 className="text-3xl lg:text-5xl font-cinzel font-black text-white mb-4 leading-tight">
                Crafting Unforgettable <br />
                <span className="text-gold-gradient">Journeys Since 2015</span>
              </h2>
              <div className="h-0.5 w-16 bg-gold-gradient rounded-full mb-8" />

              <p className="text-gray-300 leading-relaxed text-sm lg:text-base mb-4">
                <strong>Madurai Best Taxi Travels</strong> was founded to offer travelers arriving in the temple city of Madurai a standard of transportation that matches luxury hotel hospitality.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm lg:text-base mb-8">
                Operating directly from our registered address at <em>No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai - 625003</em>, we manage a premium fleet of Toyota Innova Crysta, modern sedans, and luxury Force Tempo Travellers. We ensure your journeys to Rameswaram, Kodaikanal, Ooty, Munnar, and Kerala are safe, tranquil, and memorable.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: <Star className="w-5 h-5 text-[#D4AF37]" />, val: '10+', label: 'Years Experience' },
                  { icon: <Car className="w-5 h-5 text-[#D4AF37]" />, val: '5000+', label: 'Happy Travelers' },
                  { icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />, val: '100%', label: 'Safety Verified' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="glass-obsidian rounded-2xl p-4 text-center border border-white/10"
                  >
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-2xl font-cinzel font-bold text-gold-gradient">{stat.val}</div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30 gold-border-glow">
                <img
                  src={MeenakshiBg}
                  alt="Madurai Meenakshi Temple"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left z-20">
                  <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">Palanganatham, Madurai</p>
                  <h3 className="text-2xl font-cinzel font-bold text-white">Madurai Best Taxi Travels</h3>
                  <p className="text-xs text-gray-300">Punctual Chauffeurs • 24/7 Dispatch</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass-obsidian-elevated rounded-2xl p-4 flex items-center gap-3.5 border border-[#D4AF37]/40 shadow-2xl z-20">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center p-1">
                  <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-xs">Official Office</div>
                  <div className="font-cinzel text-gold-gradient text-sm font-bold">Palanganatham</div>
                  <div className="text-gray-400 text-[10px]">Pin: 625003</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#030712] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-2">WHAT DEFINES US</span>
            <h2 className="text-3xl lg:text-5xl font-cinzel font-black text-white">
              Our Core <span className="text-gold-gradient">Pillars</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-obsidian rounded-3xl p-8 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-cinzel font-bold text-white mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM STATS ──────────────────────────────────── */}
      <section className="py-16 bg-[#0B0F19] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {teamStats.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-2xl glass-obsidian border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-[#D4AF37]">
                  {item.icon}
                </div>
                <div className="text-3xl lg:text-5xl font-cinzel font-black text-gold-gradient mb-1">
                  {item.count}
                </div>
                <h3 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">{item.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[180px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#030712]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-obsidian-elevated rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 gold-border-glow">
            <div className="flex items-center gap-5 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-cinzel font-bold text-white leading-tight">
                  Travel in Comfort with <span className="text-gold-gradient">Madurai Best</span>
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Instant reservation from Palanganatham or Madurai Airport (IXM).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:6382513075"
                className="flex items-center gap-2 bg-gold-gradient text-black font-extrabold px-7 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider gold-glow hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 fill-black" /> Call +91 63825 13075
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
