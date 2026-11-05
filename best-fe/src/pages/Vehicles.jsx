import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ArrowRight, ShieldCheck, ThumbsUp, Heart, PhoneCall,
  Wind, Sparkles, Car as CarIcon, Luggage, Fuel
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
              Madurai Best Taxi Travels • Verified Cabs
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-['Outfit'] font-black text-slate-900 mb-4 tracking-tight leading-tight">
              OUR CERTIFIED <span className="text-blue-700">FLEET</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Spotless, climate-controlled sedans, Toyota Innova Crystas, and tempo travellers for outstation & airport transfers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <a href="/" className="hover:text-blue-700 transition-colors">Home</a>
            <span>/</span>
            <span className="text-slate-900 font-bold">Vehicles</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── VEHICLES GRID ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Loading available vehicles...</p>
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
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-56 bg-gradient-to-b from-slate-100 to-white p-6 flex flex-col items-center justify-center border-b border-slate-100">
                      <div className="absolute top-3 right-3 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase">
                        {v.seats}
                      </div>
                      <img
                        src={getVehicleImage(v.image)}
                        alt={v.name}
                        loading="lazy"
                        className="w-full h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Wind className="w-3.5 h-3.5 text-blue-600" /> {v.ac || 'AC'}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sanitized
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 mb-2">{t(v.name)}</h3>

                      <div className="space-y-2 mb-6 flex-grow">
                        {(() => {
                          const plans = parseDesc(v.desc);
                          if (plans && Object.keys(plans).length > 0) {
                            return Object.values(plans).map((plan, pIdx) => (
                              <div key={pIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                                <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">{plan.title}</div>
                                {plan.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            ));
                          }
                          return (
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between">
                              <span className="text-slate-500">Outstation Rate</span>
                              <span className="font-bold text-blue-700">{v.price || 'Standard Rate'}</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Starting From</div>
                          <div className="text-lg font-['Outfit'] font-black text-blue-700">{v.price}</div>
                        </div>
                        <button
                          onClick={() => openBookingModal(v.name)}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
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
