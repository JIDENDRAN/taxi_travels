import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, Star, ShieldCheck, Calendar, Award } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getPackageImage } from '../utils/imageImports';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const trustItems = [
  { icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />, title: 'Transparent Guarantee', desc: 'Direct rates from Palanganatham, Madurai' },
  { icon: <Calendar className="w-5 h-5 text-[#D4AF37]" />, title: 'Tailored Itineraries', desc: 'Flexible stops & hill-trained chauffeurs' },
  { icon: <span className="text-[#D4AF37] text-lg">🎧</span>, title: '24/7 Concierge', desc: 'Flight tracking for airport pickups' },
  { icon: <Award className="w-5 h-5 text-[#D4AF37]" />, title: 'Trusted Since 2015', desc: 'Over 5,000+ happy South India travelers' },
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
    <div className="bg-[#030712] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── LUXURY PAGE HERO ──────────────────────────────── */}
      <section className="relative h-80 pt-24 flex items-center justify-center overflow-hidden bg-[#030712]">
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Packages Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/90 to-[#030712]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 text-[#F5D061] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Madurai Best Taxi Travels • Signature Tours
          </div>
          <h1 className="text-4xl lg:text-6xl font-cinzel font-black text-white leading-tight">
            TOUR <span className="text-gold-gradient">PACKAGES</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Curated spiritual pilgrimages, misty hill stations, and holiday circuits with private chauffeurs.
          </p>
        </motion.div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────── */}
      <div className="bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <span>/</span>
            <span className="text-white font-bold">Tour Packages</span>
          </div>
          <span className="text-[#F5D061] font-semibold">{packages.length} Curated Tours</span>
        </div>
      </div>

      {/* ── PACKAGES GRID ─────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading curated itineraries...</p>
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
                  className="glass-obsidian rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex flex-col group"
                >
                  <div className="h-60 relative overflow-hidden bg-gray-950">
                    <img
                      src={getPackageImage(pkg.image)}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 bg-black/70 border border-[#D4AF37]/50 text-[#F5D061] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {t(pkg.duration)}
                    </div>
                  </div>

                  <div className="p-6 text-left flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-cinzel font-bold text-white text-lg line-clamp-1">{t(pkg.name)}</h3>
                      {pkg.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-[#F5D061] shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{pkg.rating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-xs line-clamp-2 mb-6 leading-relaxed flex-grow">
                      {t(pkg.places)}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Starting Rate</div>
                        <div className="text-lg font-cinzel font-black text-gold-gradient">{pkg.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDetails(pkg)}
                          className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => openBookingModal(pkg.name)}
                          className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-105"
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
      <section className="py-10 bg-[#0B0F19] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 pt-4 md:pt-0 px-2 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-xs">{item.title}</div>
                  <div className="text-gray-400 text-[11px] mt-0.5">{item.desc}</div>
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
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-[#0B0F19] rounded-3xl max-w-md w-full shadow-2xl z-10 overflow-hidden text-left border border-[#D4AF37]/30"
            >
              <div className="h-56 relative bg-gray-950">
                <img
                  src={getPackageImage(selectedDetails.image)}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl font-cinzel font-bold text-white">{t(selectedDetails.name)}</h3>
                  <div className="text-[#F5D061] font-bold text-sm mt-0.5">Starting at {selectedDetails.price}</div>
                </div>
                <button
                  onClick={() => setSelectedDetails(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-semibold text-white text-sm">{selectedDetails.duration}</span>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                  <div className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-wider mb-2">
                    Itinerary Highlights
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedDetails.places}</p>
                </div>

                <button
                  onClick={() => {
                    const n = selectedDetails.name;
                    setSelectedDetails(null);
                    openBookingModal(n);
                  }}
                  className="w-full bg-gold-gradient text-black font-extrabold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer shadow-xl hover:scale-102"
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
