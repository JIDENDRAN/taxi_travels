import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ArrowRight, ShieldCheck, ThumbsUp, Heart, PhoneCall,
  Wind, Car as CarIcon
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getVehicleImage } from '../utils/imageImports';

import ThirumalaiDesktop from '../assets/thirumalai_desktop.png';

// Helper to parse description string into structured plans
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
        
        // Auto-format if they only typed numbers
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
  { id: 'all', label: 'All Vehicles', icon: '🚗' },
  { id: 'sedan', label: 'Sedan', icon: '🚙' },
  { id: 'suv', label: 'SUV', icon: '🚐' },
  { id: 'tempo', label: 'Tempo Traveller', icon: '🚌' },
  { id: 'luxury', label: 'Luxury', icon: '👑' },
];

const whyItems = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: 'Safety First',
    desc: 'GPS tracking, verified drivers, and well-maintained vehicles for complete safety.',
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-blue-600" />,
    title: 'Pristine Fleet',
    desc: 'Regularly serviced, air-conditioned cars for the highest travel comfort.',
  },
  {
    icon: <Heart className="w-6 h-6 text-blue-600" />,
    title: 'Customer Satisfaction',
    desc: 'Transparent pricing with zero hidden surcharges or surprise tolls.',
  },
  {
    icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
    title: '24/7 Support',
    desc: 'Our dispatch team is always ready to assist you before, during, and after your trip.',
  },
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
          if (data && data.length > 0) {
            setCars(data);
          }
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
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif]">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative h-80 pt-20 flex items-center justify-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img src={ThirumalaiDesktop} alt="Fleet Hero" className="w-full h-full object-cover opacity-25" />
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
            Madurai Best Taxi Travels Fleet
          </div>
          <h1 className="text-4xl lg:text-6xl font-['DM_Sans',sans-serif] font-black text-white leading-tight">
            Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Fleet</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Clean, sanitized, and air-conditioned sedans, SUVs, and luxury Tempo Travellers for every journey.
          </p>
        </motion.div>
      </section>

      {/* ── BREADCRUMB & FILTERS ───────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>&gt;</span>
            <span className="text-slate-900 font-bold">Vehicles</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-1">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FLEET SECTION ────────────────────────────── */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 font-semibold text-sm">Loading vehicles...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full pb-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((v, i) => (
                  <motion.div
                    key={v.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm w-full flex flex-col md:flex-row h-auto hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
                  >
                    {/* Left: Vehicle Image */}
                    <div className="bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8 md:w-2/5 min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100 relative">
                      <img
                        src={getVehicleImage(v.image)}
                        alt={v.name}
                        loading="lazy"
                        className="w-full max-h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = getVehicleImage('sedan_cab-removebg-preview.png'); }}
                      />
                      <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          {v.seats}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200">
                          <Wind className="w-3.5 h-3.5 text-blue-600" />
                          {v.ac || 'AC Available'}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200">
                          <CarIcon className="w-3.5 h-3.5 text-blue-600" />
                          GPS Enabled
                        </div>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-between text-left md:w-3/5">
                      <div>
                        {/* Type tag & Name */}
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">{v.seats}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                            {v.type ? v.type.charAt(0).toUpperCase() + v.type.slice(1) : 'Vehicle'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-['DM_Sans'] font-black text-slate-900 mb-4">{t(v.name)}</h3>

                        {/* Plans Section */}
                        <div className="flex flex-col gap-3.5 mb-6">
                          {(() => {
                            const plans = parseDesc(v.desc);
                            if (plans && Object.keys(plans).length > 0) {
                              return Object.values(plans).map((plan, pIdx) => (
                                <div key={pIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-2 h-2 rounded-full ${pIdx % 2 === 0 ? 'bg-blue-600' : 'bg-emerald-500'}`}></div>
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{plan.title}</span>
                                  </div>
                                  {plan.items.map((item, iIdx) => (
                                    <div key={iIdx} className={`flex justify-between items-center ${iIdx !== plan.items.length - 1 ? 'mb-2' : ''}`}>
                                      <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                                      <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              ));
                            }
                            
                            // Legacy Fallback
                            return (
                              <>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Outstation Plan</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-slate-500">Rate</span>
                                    <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{v.price || v.perKm}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-slate-500">Min Distance</span>
                                    <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{v.minKm?.toLowerCase().includes('above') ? v.minKm : `Above ${v.minKm || '300 kms'}`}</span>
                                  </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Day Rental Plan</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-slate-500">Base Rent</span>
                                    <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{v.dayRent || '—'}</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-slate-500">Per km Charge</span>
                                    <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{v.perKm ? (v.perKm.includes('/km') ? v.perKm : `${v.perKm}/km`) : '—'}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-slate-500">Driver Charge</span>
                                    <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{v.driverCharge || '—'}</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Starting From</div>
                          <div className="text-2xl font-['DM_Sans'] font-black text-slate-900">{v.price}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openBookingModal(v.name)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-xl transition-all text-sm tracking-wide cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95"
                          >
                            {t('Book Now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest block mb-2">OUR GUARANTEE</span>
            <h2 className="text-3xl lg:text-4xl font-['DM_Sans',sans-serif] font-black text-slate-900">
              Why Ride with Madurai Best Taxi Travels?
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-['DM_Sans'] font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
