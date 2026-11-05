import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, MapPin, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

import imgMeenakshi from '../assets/gallery/51714.png';
import imgAlagar from '../assets/gallery/51887.jpg.jpeg';
import imgThirumalai from '../assets/gallery/51893.jpg.jpeg';
import imgRameswaram from '../assets/gallery/51904.png';
import imgKodaikanal from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.12 PM.jpeg';
import imgOoty from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.14 PM.jpeg';
import imgKanyakumari from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.16 PM.jpeg';
import imgCustomers from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.18 PM.jpeg';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const galleryItems = [
    { id: 1, title: 'Meenakshi Amman Temple', location: 'Madurai', category: 'temple', image: imgMeenakshi, desc: 'Spiritual beacon of South India' },
    { id: 2, title: 'Alagar Kovil', location: 'Madurai', category: 'temple', image: imgAlagar, desc: 'Historic temple at the foot of Alagar Hills' },
    { id: 3, title: 'Thirumalai Nayakkar Mahal', location: 'Madurai', category: 'heritage', image: imgThirumalai, desc: '17th-century architectural grandeur' },
    { id: 4, title: 'Rameswaram Temple & Pamban', location: 'Rameswaram', category: 'temple', image: imgRameswaram, desc: 'Sacred coastal island & sea bridge' },
    { id: 5, title: 'Kodaikanal Hill Station', location: 'Kodaikanal', category: 'hills', image: imgKodaikanal, desc: 'Mist-clad mountains & pine forests' },
    { id: 6, title: 'Ooty Tea Estates', location: 'Ooty', category: 'hills', image: imgOoty, desc: 'Nilgiri lush green tea gardens' },
    { id: 7, title: 'Kanyakumari Triveni Sangam', location: 'Kanyakumari', category: 'heritage', image: imgKanyakumari, desc: 'Spectacular sunset & ocean confluence' },
    { id: 8, title: 'Our Happy Travelers', location: 'Customer Diaries', category: 'customers', image: imgCustomers, desc: 'Golden travel memories with families' },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'temple', name: 'Temple Circuits' },
    { id: 'hills', name: 'Hill Stations' },
    { id: 'heritage', name: 'Heritage' },
    { id: 'customers', name: 'Happy Customers' }
  ];

  return (
    <div className="bg-white min-h-screen text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. GALLERY HERO BANNER (MATCHING REFERENCE GALLERY PAGE) ── */}
      <section className="relative h-72 sm:h-80 pt-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EBF5FF] to-white border-b border-slate-100">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Script Title matching reference: "Our Gallery" */}
            <h1 className="font-['Dancing_Script'] text-5xl sm:text-6xl text-blue-900 font-bold mb-2">
              Our Gallery
            </h1>
            {/* Subtitle matching reference: "Capturing Moments, Creating Memories" */}
            <p className="text-sm sm:text-base text-slate-600 font-semibold tracking-wide">
              Capturing Moments, Creating Memories
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FILTER PILLS (MATCHING REFERENCE GALLERY PAGE) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                activeFilter === tab.id
                  ? 'bg-[#FBBF24] text-slate-950 font-black'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. PHOTO GRID (MATCHING REFERENCE PHOTO CARDS) ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative h-60 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-['Outfit'] font-bold text-sm leading-tight">{item.title}</h4>
                  <p className="text-[11px] text-amber-300 font-medium">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM NAVY WAVE BAR (MATCHING REFERENCE) ── */}
      <section className="bg-[#0A192F] text-white py-10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <span className="font-['Dancing_Script'] text-3xl sm:text-4xl text-[#FBBF24] block mb-1">
            Travel • Explore • Remember
          </span>
          <p className="text-xs text-slate-300">
            Book your next road journey with Madurai Best Taxi Travels.
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 cursor-pointer z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-3xl w-full max-h-[80vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={filteredItems[selectedImageIndex].image}
                alt=""
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
