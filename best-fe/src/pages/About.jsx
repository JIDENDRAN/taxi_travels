import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, Compass, Eye, ShieldCheck, Heart, Award, Star, MapPin, ArrowRight, PhoneCall, Car, Users } from 'lucide-react';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import HeroImage from '../assets/hero.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const About = () => {
  const { t } = useTranslation();

  const checklist = [
    'Customer First Approach',
    'Safe & Comfortable Travel',
    'Affordable Packages & Fares',
    'Memorable Experiences & Punctuality'
  ];

  return (
    <div className="bg-white min-h-screen text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. ABOUT HERO BANNER (MATCHING REFERENCE ABOUT PAGE) ── */}
      <section className="relative h-80 sm:h-96 pt-24 flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={CinematicSouthIndiaBg}
            alt="About Madurai Best Taxi Travels"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Script Heading matching reference */}
            <h1 className="font-['Dancing_Script'] text-5xl sm:text-6xl text-amber-400 font-bold mb-2">
              About Us
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              Turning Journeys into Unforgettable Stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WELCOME TO MADURAI BEST TAXI TRAVELS (MATCHING REFERENCE) ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Narrative: Title, Paragraphs, Checklist, Mission & Vision */}
            <div className="lg:col-span-7 text-left">
              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 mb-4 leading-tight">
                Welcome to <br className="hidden sm:inline" />
                <span className="text-blue-900">Madurai Best Taxi Travels</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                We are a trusted travel partner, dedicated to making your journeys safe, comfortable and memorable. With years of experience in the travel industry, we bring you the best travel solutions for every destination across Madurai, Tamil Nadu, and South India.
              </p>

              {/* Checklist with Yellow Checkmark Icons matching reference */}
              <div className="space-y-3 mb-8">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* Mission & Vision Cards side-by-side matching reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-slate-900">Our Mission</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      To inspire and enable travelers to explore South India with reliable, safe, and transparent travel services.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-slate-900">Our Vision</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      To be the most preferred, customer-recommended taxi and tour company in Tamil Nadu.
                    </p>
                  </div>
                </div>
              </div>

              {/* Registered Address Stamp */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
                <strong className="text-slate-800">Official Head Office:</strong> No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — 625003.
              </div>
            </div>

            {/* Right: Modern Curved Image Container with Vehicle matching reference */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden border-4 border-[#FBBF24] shadow-xl bg-slate-100">
                <img
                  src={ThirumalaiDesktop}
                  alt="Madurai Travels Heritage"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FBBF24]">Madurai Best Taxi Travels</span>
                  <h3 className="font-['Outfit'] font-bold text-xl text-white">Palanganatham Hub</h3>
                  <p className="text-xs text-slate-300">Over 50,000+ Journeys Completed</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM SKYLINE BANNER (MATCHING REFERENCE) ──── */}
      <section className="bg-[#0A192F] text-white py-12 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="font-['Dancing_Script'] text-3xl sm:text-4xl text-[#FBBF24] block mb-2">
            Your Trusted Travel Companion
          </span>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Call or WhatsApp our 24/7 reservation desk for instant cab bookings and customized itineraries.
          </p>
          <a
            href="tel:6382513075"
            className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-amber-500 text-slate-950 font-black px-7 py-3 rounded-full text-xs uppercase tracking-wider shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-slate-950" /> Call +91 63825 13075
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;
