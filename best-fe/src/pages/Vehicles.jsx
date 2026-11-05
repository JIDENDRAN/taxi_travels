import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ArrowRight, ShieldCheck, ThumbsUp, Heart, PhoneCall,
  Wind, Sparkles, Car as CarIcon
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getVehicleImage } from '../utils/imageImports';
import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

const parseDesc = (descString) => {
  if (!descString) return null;
  const plans = {};
  const sections = descString.split(/\n\s*\n/);
  let planCount = 0;
  sections.forEach(sec => {
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    const titleLine = lines[0];
    const title = titleLine.replace('[', '').replace(']', '').toUpperCase();
    const items = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(':');
      if (parts.length >= 2) {
        const label = parts[0].trim();
        let value = parts.slice(1).join(':').trim();

        if (/^\d+$/.test(value)) {
          const lowerLabel = label.toLowerCase();
          if (lowerLabel.includes('rate') || lowerLabel.includes('per km')) {
            value = `₹${value}/km`;
          } else if (lowerLabel.includes('min distance')) {
            value = `Above ${value} km`;
          } else if (lowerLabel.includes('driver')) {
            value = `₹${value}/day`;
          } else if (lowerLabel.includes('base rent')) {
            value = `₹${value}`;
          }
        }
        items.push({ label, value });
      }
    }
    plans[`plan_${planCount++}`] = { title, items };
  });
  return plans;
};

const filterTabs = [
  { id: 'all', label: 'All Fleet', icon: '🚗' },
  { id: 'sedan', label: 'Sedans (Etios/Dzire)', icon: '🚙' },
  { id: 'suv', label: 'SUVs (Innova Crysta)', icon: '🚐' },
  { id: 'tempo', label: 'Tempo Travellers', icon: '🚌' },
  { id: 'luxury', label: 'Luxury Urbania', icon: '👑' },
];

const Vehicles = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '' });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cars`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setCars(data);
        }
      } catch (error) {
        console.error('Failed to fetch cars', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const openBookingModal = (vehicleName) => setModalData({ isOpen: true, vehicle: vehicleName });

  const filtered = cars.filter(v =>
    activeFilter === 'all' ||
    (v.type && v.type.toLowerCase() === activeFilter) ||
    (v.seats && v.seats.includes('12') && activeFilter === 'tempo') ||
    (v.seats && !v.seats.includes('12') && v.seats.includes('7') && activeFilter === 'suv') ||
    (v.seats && v.seats.includes('4') && activeFilter === 'sedan')
  );

  return (
    <div className="bg-[#030712] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── LUXURY PAGE HERO ──────────────────────────────── */}
      <section className="relative h-80 pt-24 flex items-center justify-center overflow-hidden bg-[#030712]">
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Fleet Hero" className="w-full h-full object-cover opacity-20" />
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
            Madurai Best Taxi Travels • Executive Fleet
          </div>
          <h1 className="text-4xl lg:text-6xl font-cinzel font-black text-white leading-tight">
            THE <span className="text-gold-gradient">FLEET</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Spotless, climate-controlled sedans, Toyota Innova Crystas, and coaches for outstation & airport transfers.
          </p>
        </motion.div>
      </section>

      {/* ── FILTER BAR ────────────────────────────────────── */}
      <div className="bg-[#0B0F19] border-y border-white/10 sticky top-20 z-30 shadow-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <span>/</span>
            <span className="text-white font-bold">Vehicles</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-gold-gradient text-black font-black shadow-lg shadow-[#D4AF37]/25'
                    : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-[#D4AF37]/30 hover:text-white'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── VEHICLES GRID ─────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading executive fleet...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((v, i) => (
                  <motion.div
                    key={v.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="glass-obsidian rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] flex flex-col group"
                  >
                    <div className="relative h-60 bg-gradient-to-b from-[#1F2937]/50 to-[#0B0F19] p-6 flex flex-col items-center justify-center">
                      <div className="absolute top-4 right-4 bg-black/60 border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[10px] font-bold text-[#F5D061] uppercase tracking-wider">
                        {v.seats}
                      </div>
                      <img
                        src={getVehicleImage(v.image)}
                        alt={v.name}
                        loading="lazy"
                        className="w-full h-44 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      />
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[11px] text-gray-300">
                          <Wind className="w-3.5 h-3.5 text-[#D4AF37]" /> {v.ac || 'AC'}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-300">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Sanitized
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h3 className="font-cinzel text-xl font-bold text-white mb-2">{t(v.name)}</h3>

                      <div className="space-y-2 mb-6 flex-grow">
                        {(() => {
                          const plans = parseDesc(v.desc);
                          if (plans && Object.keys(plans).length > 0) {
                            return Object.values(plans).map((plan, pIdx) => (
                              <div key={pIdx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                                <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{plan.title}</div>
                                {plan.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400">{item.label}</span>
                                    <span className="font-bold text-white">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            ));
                          }
                          return (
                            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs flex justify-between">
                              <span className="text-gray-400">Outstation Rate</span>
                              <span className="font-bold text-[#F5D061]">{v.price || 'Competitive Rate'}</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400">Base Price</div>
                          <div className="text-lg font-cinzel font-black text-gold-gradient">{v.price}</div>
                        </div>
                        <button
                          onClick={() => openBookingModal(v.name)}
                          className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <BookingModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        defaultVehicle={modalData.vehicle}
      />
    </div>
  );
};

export default Vehicles;
