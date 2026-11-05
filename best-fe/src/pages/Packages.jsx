import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, Star, ShieldCheck, Calendar, Award } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getPackageImage } from '../utils/imageImports';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const trustItems = [
  { icon: <ShieldCheck className="w-5 h-5 text-blue-700" />, title: 'Transparent Guarantee', desc: 'Direct rates from Palanganatham, Madurai' },
  { icon: <Calendar className="w-5 h-5 text-amber-500" />, title: 'Tailored Itineraries', desc: 'Flexible stops & hill-trained chauffeurs' },
  { icon: <Award className="w-5 h-5 text-blue-700" />, title: '24/7 Airport Support', desc: 'Flight tracking for airport pickups' },
  { icon: <Star className="w-5 h-5 text-amber-500" />, title: 'Trusted Since 2015', desc: 'Over 50,000+ happy South India travelers' },
];

const Packages = () => {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, packageType: '' });
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setPackages(data);
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
    <div className="bg-white text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/70 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
              Madurai Best Taxi Travels • Curated Tours
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-['Outfit'] font-black text-slate-900 mb-4 tracking-tight leading-tight">
              SOUTH INDIA <span className="text-blue-700">TOUR PACKAGES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Curated spiritual pilgrimages, misty hill stations, and holiday circuits with private experienced drivers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-blue-700 transition-colors">Home</a>
            <span>/</span>
            <span className="text-slate-900 font-bold">Tour Packages</span>
          </div>
          <span className="text-blue-700 font-bold">{packages.length} Packages Available</span>
        </div>
      </div>

      {/* ── PACKAGES GRID ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Loading tour itineraries...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                >
                  <div className="h-56 relative overflow-hidden bg-slate-100">
                    <img
                      src={getPackageImage(pkg.image)}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {t(pkg.duration)}
                    </div>
                  </div>

                  <div className="p-6 text-left flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-['Outfit'] font-bold text-slate-900 text-lg line-clamp-1">{t(pkg.name)}</h3>
                      {pkg.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{pkg.rating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 mb-6 leading-relaxed flex-grow">
                      {t(pkg.places)}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Rate</div>
                        <div className="text-lg font-['Outfit'] font-black text-blue-700">{pkg.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDetails(pkg)}
                          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => openBookingModal(pkg.name)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
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
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-xs">{item.title}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl font-['Outfit'] font-bold text-white">{t(selectedDetails.name)}</h3>
                  <div className="text-amber-400 font-bold text-sm mt-0.5">Starting at {selectedDetails.price}</div>
                </div>
                <button
                  onClick={() => setSelectedDetails(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-slate-900/60 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-semibold text-slate-800 text-sm">{selectedDetails.duration}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-[10px] uppercase text-blue-700 font-bold tracking-wider mb-1.5">
                    Itinerary Highlights
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{selectedDetails.places}</p>
                </div>

                <button
                  onClick={() => {
                    const n = selectedDetails.name;
                    setSelectedDetails(null);
                    openBookingModal(n);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Book This Package <ArrowRight className="w-4 h-4" />
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
