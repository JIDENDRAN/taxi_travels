import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Heart, 
  Mountain, 
  Compass, 
  Building, 
  Map, 
  Car, 
  Smile,
  Info
} from 'lucide-react';

// Static imports of the 8 images from the gallery folder
import imgMeenakshi from '../assets/gallery/51714.png';
import imgAlagar from '../assets/gallery/51887.jpg.jpeg';
import imgThirumalai from '../assets/gallery/51893.jpg.jpeg';
import imgRameswaram from '../assets/gallery/51904.png';
import imgKodaikanal from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.12 PM.jpeg';
import imgOoty from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.14 PM.jpeg';
import imgKanyakumari from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.16 PM.jpeg';
import imgCustomers from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.18 PM.jpeg';

// Import a hero background image
import heroBg from '../assets/meenakshi_desktop.png';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Gallery items matching the mockup and actual assets
  const galleryItems = [
    {
      id: 1,
      title: 'Meenakshi Amman Temple',
      location: 'Madurai',
      category: 'temple',
      image: imgMeenakshi,
      desc: 'An architectural marvel and a spiritual beacon of South India.'
    },
    {
      id: 2,
      title: 'Alagar Kovil',
      location: 'Madurai',
      category: 'temple',
      image: imgAlagar,
      desc: 'A historic temple dedicated to Lord Vishnu, nestled at the foot of Alagar Hills.'
    },
    {
      id: 3,
      title: 'Thirumalai Nayakkar Mahal',
      location: 'Madurai',
      category: 'heritage',
      image: imgThirumalai,
      desc: 'A magnificent 17th-century palace showcasing Indo-Saracenic architecture.'
    },
    {
      id: 4,
      title: 'Rameswaram Temple',
      location: 'Rameswaram',
      category: 'temple',
      image: imgRameswaram,
      desc: 'One of the twelve sacred Jyotirlinga temples with spectacular corridors.'
    },
    {
      id: 5,
      title: 'Kodaikanal Hills',
      location: 'Kodaikanal',
      category: 'hills',
      image: imgKodaikanal,
      desc: 'Mist-clad mountains, deep valleys, and beautiful pine forests in the Princess of Hill Stations.'
    },
    {
      id: 6,
      title: 'Ooty Tea Gardens',
      location: 'Ooty',
      category: 'hills',
      image: imgOoty,
      desc: 'Vibrant green tea plantations sprawling across the scenic slopes of Nilgiri Hills.'
    },
    {
      id: 7,
      title: 'Kanyakumari Sunset',
      location: 'Kanyakumari',
      category: 'outstation',
      image: imgKanyakumari,
      desc: 'The spectacular confluence of three seas meeting under a magical sunset sky.'
    },
    {
      id: 8,
      title: 'Our Happy Customers',
      location: 'Customer Diaries',
      category: 'customers',
      image: imgCustomers,
      desc: 'Creating golden memories and providing safe journeys for families worldwide.'
    }
  ];

  // Filtering logic
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Categories definition
  const filters = [
    { id: 'all', name: 'All', icon: <Image className="w-4 h-4" /> },
    { id: 'temple', name: 'Temple Tours', icon: <Compass className="w-4 h-4" /> },
    { id: 'hills', name: 'Hill Stations', icon: <Mountain className="w-4 h-4" /> },
    { id: 'heritage', name: 'Heritage Places', icon: <Building className="w-4 h-4" /> },
    { id: 'outstation', name: 'Outstation Trips', icon: <Map className="w-4 h-4" /> },
    { id: 'vehicles', name: 'Vehicles', icon: <Car className="w-4 h-4" /> },
    { id: 'customers', name: 'Happy Customers', icon: <Smile className="w-4 h-4" /> }
  ];

  // Lightbox handlers
  const handleOpenLightbox = (index) => {
    // Find absolute index in the filtered list
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-[#f5f0e8] min-h-screen pb-16 overflow-hidden select-none">
      {/* 1. HERO SECTION */}
      <div className="relative h-[48vh] lg:h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Madurai Travels Gallery" 
            className="w-full h-full object-cover object-center scale-105 animate-[pulse-slow_12s_ease-in-out_infinite]"
          />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,36,32,0.75)] via-[rgba(15,36,32,0.6)] to-[rgba(15,36,32,0.92)]" />
          {/* Accent Glows */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[rgba(212,149,30,0.15)] rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6">
          <motion.p 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['Dancing_Script'] text-3xl md:text-5xl text-yellow-400 font-bold tracking-wide drop-shadow-md mb-2"
          >
            {t('Our Gallery')}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-6xl font-poppins font-black text-white tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {t('Memories from Our Journeys')}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4 mb-4 rounded-full flex items-center justify-center"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-slate-200 font-light max-w-2xl mx-auto drop-shadow-sm tracking-wide leading-relaxed"
          >
            {t('Glimpses of beautiful destinations and happy moments with our travelers.')}
          </motion.p>
        </div>
      </div>

      {/* 2. FILTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-12">
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 scrollbar-none gap-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedImageIndex(null);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-poppins font-semibold text-sm transition-all duration-300 shrink-0 shadow-sm cursor-pointer border ${
                  isActive 
                    ? 'bg-[#1a3c34] text-white border-[#1a3c34] shadow-md shadow-[rgba(26,60,52,0.3)]' 
                    : 'bg-white text-gray-700 border-[rgba(26,60,52,0.15)] hover:bg-[#f5f0e8] hover:text-[#1a3c34]'
                }`}
              >
                <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>{filter.icon}</span>
                <span>{t(filter.name)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. CARD GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Find the global index of this item in the filtered items array
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative h-[240px] rounded-3xl overflow-hidden cursor-pointer shadow-md bg-slate-950 card-3d-lift"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                  {/* Subtle glass reflection sweep on hover */}
                  <div className="reflection-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. INSTAGRAM CALL TO ACTION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[rgba(26,60,52,0.08)] border border-[rgba(26,60,52,0.2)] rounded-[32px] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-[#d4951e] rounded-full flex items-center justify-center shadow-lg shadow-[rgba(212,149,30,0.3)] shrink-0">
              <svg className="w-7 h-7 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-poppins font-black text-[#1a3c34] tracking-wide">
                {t('Want to share your travel moments with us?')}
              </h4>
              <p className="text-slate-600 font-medium mt-1">
                {t('Tag us on Instagram')} <span className="text-[#d4951e] font-bold">@madurai.travels</span>
              </p>
            </div>
          </div>
          
          <motion.a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#1a3c34] hover:bg-[#2d5a4e] text-white font-poppins font-bold px-8 py-4 rounded-2xl shadow-lg transition-all text-sm shrink-0 cursor-pointer"
          >
            <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>{t('Follow Us')}</span>
          </motion.a>
        </motion.div>
      </div>

      {/* 5. LIGHTBOX OVERLAY MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-[100] bg-[rgba(15,36,32,0.95)] backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer border border-white/10 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer border border-white/10 shadow-lg hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Right Nav Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer border border-white/10 shadow-lg hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              {/* Image Container */}
              <div className="relative max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-slate-900">
                <img 
                  src={filteredItems[selectedImageIndex].image} 
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain object-center rounded-3xl"
                />
              </div>

              {/* Details Overlay (Placed below the image) */}
              <div className="w-full text-center mt-6 text-white max-w-2xl px-4">
                <div className="inline-flex items-center gap-1.5 justify-center opacity-85">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold tracking-widest uppercase text-slate-300">
                    {t(filteredItems[selectedImageIndex].location)}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-poppins font-black mt-2 text-yellow-400 tracking-wide drop-shadow-md">
                  {t(filteredItems[selectedImageIndex].title)}
                </h2>
                {filteredItems[selectedImageIndex].desc && (
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mt-3 drop-shadow-sm max-w-lg mx-auto">
                    {t(filteredItems[selectedImageIndex].desc)}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
