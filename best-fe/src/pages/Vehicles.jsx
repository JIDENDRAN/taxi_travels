import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, ShieldCheck, Heart, PhoneCall, Wind, Sparkles, CheckCircle2, Luggage, Fuel } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import API_BASE_URL from '../apiConfig';
import { getVehicleImage } from '../utils/imageImports';
import HeroImage from '../assets/hero.png';

const fleetCategories = [
  { name: 'Luxury Coach', seats: '40 Seater', type: 'bus', image: 'coach' },
  { name: 'Mini AC Bus', seats: '21-32 Seater', type: 'bus', image: 'minibus' },
  { name: 'Tempo Traveller', seats: '12-16 Seater', type: 'tempo', image: 'tempo' },
  { name: 'Innova Crysta SUV', seats: '7 Seater', type: 'suv', image: 'innova' },
  { name: 'Executive Sedan', seats: '4 Seater', type: 'sedan', image: 'sedan' },
];

const Vehicles = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, vehicle: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setCars(data); })
      .catch(err => console.error('Failed to load cars', err))
      .finally(() => setLoading(false));
  }, []);

  const openBookingModal = (vehicleName) => setModalData({ isOpen: true, vehicle: vehicleName });

  return (
    <div className="bg-white min-h-screen text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── 1. FLEET HERO SECTION (MATCHING REFERENCE FLEET PAGE) ── */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-[#EBF5FF] to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl text-slate-900 mb-2">
              Our Fleet
            </h1>
            <p className="text-base sm:text-lg font-bold text-blue-900 mb-3">
              Travel in Comfort with Our Modern Fleet
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              We take pride in our well-maintained and comfortable fleet, designed to make your journey smooth, punctual and enjoyable across South India.
            </p>

            {/* Full-width Lineup Fleet Showcase Banner matching reference */}
            <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-sm p-4 bg-white border border-slate-200">
              <img
                src={HeroImage}
                alt="Madurai Best Taxi Fleet"
                className="w-full max-h-72 object-contain mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FLEET CATEGORY CARDS (MATCHING REFERENCE HORIZONTAL LINEUP) ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {cars.map((car, idx) => (
              <div
                key={car.id || idx}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-center hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Photo */}
                <div className="h-28 flex items-center justify-center p-2 mb-2">
                  <img
                    src={getVehicleImage(car.name, car.image)}
                    alt={car.name}
                    className="max-h-24 max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <h3 className="font-['Outfit'] font-black text-sm text-slate-900 line-clamp-1 mb-1">
                    {car.name}
                  </h3>
                  <div className="text-[11px] font-bold text-slate-500 mb-3">
                    ({car.seats || '4+1'} Seater)
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal(car.name)}
                  className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-bold py-2 rounded-full text-[11px] uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM NAVY FEATURE BAR (EXACT 4 PILLARS FROM REFERENCE FLEET PAGE) ── */}
      <section className="bg-[#0A192F] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {[
              { title: 'Well Maintained Vehicles', desc: 'Sanitized & inspected daily' },
              { title: 'Experienced Drivers', desc: 'Ghat & highway certified' },
              { title: 'On-Time Service', desc: 'Airport & doorstep pickup' },
              { title: 'Safe & Secure Travel', desc: 'GPS tracking & zero surge' }
            ].map((pillar, i) => (
              <div key={i} className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 text-left">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[#FBBF24]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-['Outfit'] font-bold text-xs sm:text-sm text-white">
                    {pillar.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {pillar.desc}
                  </div>
                </div>
              </div>
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
