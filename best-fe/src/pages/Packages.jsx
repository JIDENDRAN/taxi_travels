import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, MapPin, Star, ShieldCheck, Calendar, Award } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getPackageImage } from '../utils/imageImports';

import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const trustItems = [
  { icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, title: 'Best Price Guarantee', desc: 'Direct rates from Palanganatham, Madurai' },
  { icon: <Calendar className="w-5 h-5 text-blue-400" />, title: 'Custom Itineraries', desc: 'Flexible stops & mountain-safe drivers' },
  { icon: <span className="text-blue-400 text-lg">🎧</span>, title: '24/7 Cab Dispatch', desc: 'Punctual airport & station pickups' },
  { icon: <Award className="w-5 h-5 text-blue-400" />, title: 'Trusted Travel Partner', desc: 'Serving South India since 2015' },
];

const Packages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [sortBy, setSortBy] = useState('Popular');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPackages(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch packages', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const openBookingModal = (packageName) => setModalData({ isOpen: true, packageType: packageName });

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif]">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative h-80 pt-20 flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Packages Hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/85 to-[#0F172A]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            Madurai Best Taxi Travels
          </div>
          <h1 className="text-4xl lg:text-6xl font-['DM_Sans',sans-serif] font-black text-white leading-tight">
            South India <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Tour Packages</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Curated temple tours, hill station escapes, and holiday packages with private cabs & Tempo Travellers.
          </p>
        </motion.div>
      </section>

      {/* ── BREADCRUMB & SORT ──────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>&gt;</span>
            <span className="text-slate-900 font-bold">Tour Packages</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Showing {packages.length} Packages</span>
          </div>
        </div>
      </div>

      {/* ── MAIN PACKAGES GRID ────────────────────────────── */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 font-semibold text-sm">Loading packages...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="h-56 relative overflow-hidden bg-slate-900">
                    <img
                      src={getPackageImage(pkg.image)}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                      {t(pkg.duration)}
                    </div>
                  </div>

                  <div className="p-6 text-left flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-['DM_Sans'] font-black text-slate-900 text-lg line-clamp-1">{t(pkg.name)}</h3>
                      {pkg.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{pkg.rating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-500 text-xs line-clamp-2 mb-6 leading-relaxed flex-grow">
                      {t(pkg.places)}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Package Price</div>
                        <div className="text-xl font-['DM_Sans'] font-black text-slate-900">{pkg.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDetails(pkg)}
                          className="px-3.5 py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => openBookingModal(pkg.name)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <section className="py-8 bg-[#0F172A] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 pt-4 md:pt-0 px-2 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-xs">{item.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGE DETAIL MODAL ──────────────────────────── */}
      <AnimatePresence>
        {selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetails(null)}
              className="absolute inset-0 bg-[#0F172A]/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl z-10 overflow-hidden text-left border border-slate-200"
            >
              <div className="h-52 relative bg-slate-900">
                <img
                  src={getPackageImage(selectedDetails.image)}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl font-['DM_Sans'] font-black text-white">{t(selectedDetails.name)}</h3>
                  <div className="text-blue-400 font-bold text-sm mt-0.5">Starting at {selectedDetails.price}</div>
                </div>
                <button
                  onClick={() => setSelectedDetails(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800 text-sm">{selectedDetails.duration}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-2">
                    Itinerary Highlights
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedDetails.places}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="ml-1 font-semibold">100% Guaranteed Satisfaction</span>
                </div>

                <button
                  onClick={() => {
                    const n = selectedDetails.name;
                    setSelectedDetails(null);
                    openBookingModal(n);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Book This Tour <ArrowRight className="w-4 h-4" />
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
