import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, Star, ShieldCheck, Calendar, Plane, MapPin, Search, Compass } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getPackageImage } from '../utils/imageImports';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';

const Packages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Search & Filter state matching reference image search bar
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterDuration, setFilterDuration] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setPackages(data); })
      .catch(err => console.error('Failed to load packages', err))
      .finally(() => setLoading(false));
  }, []);

  const openBookingModal = (packageName) => setModalData({ isOpen: true, packageType: packageName });

  const filteredPackages = packages.filter(pkg => {
    const matchDest = filterDestination === 'All' || pkg.name.toLowerCase().includes(filterDestination.toLowerCase()) || (pkg.places && pkg.places.toLowerCase().includes(filterDestination.toLowerCase()));
    const matchDur = filterDuration === 'All' || (pkg.duration && pkg.duration.toLowerCase().includes(filterDuration.toLowerCase()));
    return matchDest && matchDur;
  });

  return (
    <div className="bg-white min-h-screen text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. PACKAGES HERO BANNER (MATCHING REFERENCE PACKAGES PAGE) ── */}
      <section className="relative h-72 sm:h-80 pt-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EBF5FF] to-white border-b border-slate-100">
        
        {/* Decorative Airplane Icon in Sky matching reference */}
        <div className="absolute top-16 right-12 sm:right-24 text-blue-700/30 transform rotate-12">
          <Plane className="w-16 h-16" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Script Heading matching reference: "Our Travel Packages" */}
            <h1 className="font-['Dancing_Script'] text-5xl sm:text-6xl text-blue-900 font-bold mb-2">
              Our Travel Packages
            </h1>
            {/* Subtitle matching reference: "Explore. Experience. Enjoy." */}
            <p className="text-sm sm:text-base text-slate-600 font-semibold tracking-wide">
              Explore. Experience. Enjoy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FLOATING SEARCH & FILTER BAR (MATCHING REFERENCE PILL BAR) ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.08)] py-3 px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
            
            {/* Destination Dropdown */}
            <div className="flex items-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Destination</label>
                <select
                  value={filterDestination}
                  onChange={(e) => setFilterDestination(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer mt-0.5"
                >
                  <option value="All">All Destinations</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Rameswaram">Rameswaram</option>
                  <option value="Kodaikanal">Kodaikanal</option>
                  <option value="Ooty">Ooty</option>
                  <option value="Munnar">Munnar</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Kanyakumari">Kanyakumari</option>
                </select>
              </div>
            </div>

            {/* Trip Type Dropdown */}
            <div className="flex items-center gap-2 text-left sm:border-l border-slate-100 sm:pl-4">
              <Compass className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Trip Type</label>
                <select className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer mt-0.5">
                  <option>All Types</option>
                  <option>Temple Pilgrimage</option>
                  <option>Hill Station</option>
                  <option>Family Holiday</option>
                  <option>Weekend Getaway</option>
                </select>
              </div>
            </div>

            {/* Duration Dropdown */}
            <div className="flex items-center gap-2 text-left sm:border-l border-slate-100 sm:pl-4">
              <Clock className="w-4 h-4 text-blue-700 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Duration</label>
                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer mt-0.5"
                >
                  <option value="All">All Durations</option>
                  <option value="1 Day">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="5">5 Days</option>
                </select>
              </div>
            </div>

            {/* Yellow Search Button matching reference */}
            <div className="flex justify-end">
              <button
                type="button"
                className="w-full sm:w-auto bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── 3. PACKAGE CARDS (3-COLUMN GRID MATCHING REFERENCE) ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-slate-400 text-sm">
              Loading travel packages...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, i) => (
                <div
                  key={pkg.id || i}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Photo with subtle hover zoom */}
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    <img
                      src={getPackageImage(pkg.image)}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content matching reference */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-['Outfit'] font-black text-lg text-slate-900 mb-1 leading-tight">
                        {pkg.name}
                      </h3>
                      {/* Duration Line: e.g. "3 Days / 2 Nights" */}
                      <p className="text-xs text-slate-500 font-medium mb-4">
                        {pkg.duration || '3 Days / 2 Nights'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      {/* Yellow Price Badge: e.g. "₹ 8,999 per person" */}
                      <span className="bg-[#FEF3C7] text-amber-900 border border-amber-300/60 font-black text-xs px-3 py-1 rounded-full">
                        ₹ {pkg.price ? pkg.price.replace('₹', '') : '8,999'} per trip
                      </span>

                      {/* View Details Link with Arrow */}
                      <button
                        onClick={() => setSelectedDetails(pkg)}
                        className="text-xs font-bold text-slate-800 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. BOTTOM NAVY BANNER WITH SCRIPT (MATCHING REFERENCE) ── */}
      <section className="bg-[#0A192F] text-white py-12 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="font-['Dancing_Script'] text-3xl sm:text-4xl text-[#FBBF24] block mb-1">
              Your Next Adventure Awaits...
            </span>
            <p className="text-xs text-slate-300">
              Personalized itineraries for family vacations, divine temple tours, and hill escapes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-amber-400 rotate-45 hidden sm:inline" />
            <a
              href="tel:6382513075"
              className="bg-[#FBBF24] hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* ── DETAIL MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetails(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl z-10 overflow-hidden text-left border border-slate-200"
            >
              <div className="h-52 relative bg-slate-100">
                <img
                  src={getPackageImage(selectedDetails.image)}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDetails(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-slate-900/60 rounded-full flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-['Outfit'] font-black text-slate-900">{selectedDetails.name}</h3>
                  <div className="text-amber-600 font-bold text-sm mt-0.5">Starting at {selectedDetails.price}</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 leading-relaxed">
                  <div className="text-[10px] uppercase font-bold text-blue-700 mb-1">Sightseeing Highlights:</div>
                  {selectedDetails.places || 'Covers prime attractions, viewpoints, temple darshan and photo spots.'}
                </div>

                <button
                  onClick={() => {
                    const n = selectedDetails.name;
                    setSelectedDetails(null);
                    openBookingModal(n);
                  }}
                  className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black py-3.5 rounded-full transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Book This Tour Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultPackage={modalData.packageType}
      />
    </div>
  );
};

export default Packages;
