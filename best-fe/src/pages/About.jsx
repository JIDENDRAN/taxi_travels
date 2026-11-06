import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Compass, Eye, PhoneCall, ShieldCheck, Star } from 'lucide-react';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';
import HeroImage from '../assets/hero.png';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const About = () => {
  const checklist = [
    'Customer First Approach',
    'Safe & Comfortable Travel',
    'Affordable Packages',
    'Memorable Experiences'
  ];

  return (
    <div className="bg-white min-h-screen text-[#0B192C] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. ABOUT HERO BANNER (MATCHING REFERENCE ABOUT PAGE) ── */}
      <section className="relative h-80 sm:h-96 pt-20 flex items-center justify-center overflow-hidden bg-[#0A192F] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={CinematicSouthIndiaBg}
            alt="About Madurai Best Taxi Travels"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Script Heading (Matching Mockup) */}
            <div className="font-script text-4xl sm:text-5xl text-[#FBBF24] mb-1">
              About Us
            </div>
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
              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#0A192F] mb-4 leading-tight">
                Welcome to <br />
                <span className="text-[#0B2545]">Madurai Best Taxi Travels</span>
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
                      To inspire and enable people to explore the world with trusted travel services.
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
                      To be the most preferred travel company in South India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Registered Address */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
                <strong className="text-slate-800">Official Head Office:</strong> No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — 625003.
              </div>
            </div>

            {/* Right: Curved Image Container with Vehicle matching reference */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md p-3 rounded-[2.5rem] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 shadow-2xl">
                <div className="w-full h-80 sm:h-96 rounded-[2.2rem] overflow-hidden bg-slate-900 relative">
                  <img
                    src={HeroImage}
                    alt="Madurai Best Taxi Fleet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FBBF24]">Madurai Best Taxi Travels</span>
                    <h3 className="font-['Outfit'] font-bold text-xl text-white">Palanganatham Hub</h3>
                    <p className="text-xs text-slate-300">Over 50,000+ Journeys Completed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM SKYLINE BANNER (MATCHING REFERENCE) ──── */}
      <section className="bg-[#0A192F] text-white py-12 text-center relative overflow-hidden">
        
        {/* City skyline silhouette illustration effect */}
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-blue-400 fill-current">
            <path d="M0 120 L0 80 L30 80 L30 60 L60 60 L60 90 L100 90 L100 40 L130 40 L130 90 L180 90 L180 50 L210 50 L210 100 L260 100 L260 30 L300 30 L300 100 L350 100 L350 70 L390 70 L390 100 L450 100 L450 45 L480 45 L480 100 L540 100 L540 60 L580 60 L580 100 L640 100 L640 25 L680 25 L680 100 L740 100 L740 55 L780 55 L780 100 L840 100 L840 35 L880 35 L880 100 L940 100 L940 70 L980 70 L980 100 L1050 100 L1050 40 L1090 40 L1090 100 L1150 100 L1150 65 L1200 65 L1200 120 Z"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white block mb-2">
            Your Trusted Travel Companion Across South India
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Call or WhatsApp our 24/7 reservation desk for instant cab bookings and customized itineraries.
          </p>
          <a
            href="tel:6382513075"
            className="btn-yellow-pill inline-flex items-center gap-2 px-7 py-3 text-xs uppercase tracking-wider shadow-md cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-slate-950" /> Call +91 63825 13075
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;
