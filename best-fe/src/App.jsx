// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopLayout from './components/desktop/DesktopLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logo from './assets/new_logo.jpg';
import FloatingButtons from './components/FloatingButtons';

const AppContent = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track page views on route change for Google Tag
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Dynamic Route-Based Metadata (SEO) for client-side navigation
  useEffect(() => {
    const routeTitles = {
      '/': 'Madurai Best Taxi Travels | Premium Taxi Service, Airport Transfers & South India Tours',
      '/about': 'About Us | Madurai Best Taxi Travels | Trusted Cab Partner Since 2015',
      '/vehicles': 'Our Fleet - Cabs, Innova & Tempo Travellers | Madurai Best Taxi Travels',
      '/packages': 'South India Tour Packages | Madurai Best Taxi Travels',
      '/gallery': 'Travel Memories & Fleet Gallery | Madurai Best Taxi Travels',
      '/contact': 'Contact Us 24/7 | Madurai Best Taxi Travels | Palanganatham, Madurai',
      '/privacy-policy': 'Privacy Policy | Madurai Best Taxi Travels',
      '/terms-and-conditions': 'Terms & Conditions | Madurai Best Taxi Travels',
      '/madurai-taxi-service': 'Madurai Taxi Service & 24/7 Cab Booking | Madurai Best Taxi Travels',
      '/madurai-airport-taxi': 'Madurai Airport Taxi & Transfers | Madurai Best Taxi Travels',
      '/madurai-tour-packages': 'Best Madurai Tour Packages | Madurai Best Taxi Travels',
      '/madurai-to-rameswaram-taxi': 'Madurai to Rameswaram Taxi & Cabs | Madurai Best Taxi Travels',
      '/madurai-to-kodaikanal-taxi': 'Madurai to Kodaikanal Taxi Service | Madurai Best Taxi Travels',
      '/tempo-traveller-rental-madurai': 'Tempo Traveller Rental in Madurai | Madurai Best Taxi Travels'
    };

    const routeDescriptions = {
      '/': 'Madurai Best Taxi Travels provides top-rated 24/7 taxi service in Madurai, airport pickup & drop, outstation cabs, Tempo Traveller rental, and custom South India tour packages at Palanganatham, Madurai.',
      '/about': 'About Madurai Best Taxi Travels: No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai. Professional drivers, pristine vehicles, and reliable South India travel.',
      '/vehicles': 'Choose from our premium fleet: Swift Dzire, Toyota Etios, Innova Crysta, Tempo Traveller & Urbania with Madurai Best Taxi Travels.',
      '/packages': 'Curated South India tour packages from Madurai: Rameswaram, Kodaikanal, Ooty, Munnar, Kanyakumari, and Kerala with Madurai Best Taxi Travels.',
      '/gallery': 'Photo gallery of happy travelers, scenic destinations, and our fleet across South India with Madurai Best Taxi Travels.',
      '/contact': 'Contact Madurai Best Taxi Travels: No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai - 625003. Call +91 63825 13075 for 24/7 bookings.',
      '/privacy-policy': 'Privacy Policy of Madurai Best Taxi Travels regarding customer data and booking details.',
      '/terms-and-conditions': 'Terms and conditions for hiring cabs, tempo travellers, and tour packages with Madurai Best Taxi Travels.',
      '/madurai-taxi-service': 'Book reliable, punctual Madurai taxi service for local trips, sightseeing, and round trips with Madurai Best Taxi Travels.',
      '/madurai-airport-taxi': 'Madurai Airport taxi transfers with on-time flight tracking and 24/7 pickups by Madurai Best Taxi Travels.',
      '/madurai-tour-packages': 'Custom Madurai temple and sightseeing tour packages covering Meenakshi Temple, Thirumalai Nayakkar Mahal & beyond.',
      '/madurai-to-rameswaram-taxi': 'Madurai to Rameswaram taxi service with one-way drops and flexible round-trip packages by Madurai Best Taxi Travels.',
      '/madurai-to-kodaikanal-taxi': 'Safe hill station trips from Madurai to Kodaikanal with expert mountain drivers from Madurai Best Taxi Travels.',
      '/tempo-traveller-rental-madurai': 'Rent 12, 14, and 18-seater luxury Tempo Travellers in Madurai for family outings, pilgrimages, and group travel.'
    };

    const title = routeTitles[location.pathname] || routeTitles['/'];
    const desc = routeDescriptions[location.pathname] || routeDescriptions['/'];

    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper font-['Inter',sans-serif]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#0F172A] select-none overflow-hidden"
          >
            {/* Subtle navy radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative mb-6"
              >
                <div className="relative z-10 w-28 h-28 lg:w-32 lg:h-32 rounded-3xl bg-white shadow-[0_12px_40px_rgba(30,58,138,0.12)] border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                  <img src={Logo} alt="Madurai Best Taxi Travels Logo" className="w-full h-full object-contain rounded-2xl" />
                </div>
                {/* Modern pulsing ring in royal blue */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-[2rem] border-2 border-transparent border-t-blue-600 border-r-blue-400/40 pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center text-center px-6"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-blue-600 mb-1">
                  TAXI TRAVELS
                </span>
                <h2 className="font-['DM_Sans',sans-serif] font-black text-2xl lg:text-3xl tracking-tight text-[#0F172A]">
                  MADURAI <span className="text-blue-600">BEST</span>
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Palanganatham, Madurai • 24/7 Premium Cabs</p>
              </motion.div>

              {/* Minimal modern blue loader bar */}
              <div className="mt-8 w-36 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col text-slate-800 bg-[#F8FAFC]">
        <main className="flex-grow">
          {isAdminRoute ? (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          ) : (
            <DesktopLayout />
          )}
        </main>
        {!isAdminRoute && <FloatingButtons />}
      </div>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
