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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Dynamic Route Titles
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

    document.title = routeTitles[location.pathname] || routeTitles['/'];
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900 min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-slate-900 select-none overflow-hidden"
          >
            {/* Luminous soft radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative mb-5"
              >
                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white shadow-[0_15px_35px_rgba(15,23,42,0.12)] border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                  <img src={Logo} alt="Madurai Best Taxi Travels Logo" className="w-full h-full object-contain rounded-xl" />
                </div>
                {/* Soft rotating pulse ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2.5 rounded-[1.8rem] border-2 border-transparent border-t-amber-500 border-r-blue-600/40 pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center px-6"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-blue-700 mb-1">
                  TAXI TRAVELS
                </span>
                <h2 className="font-['Outfit'] font-black text-2xl tracking-wide text-slate-900">
                  MADURAI <span className="text-amber-500">BEST</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Palanganatham, Madurai • Official Travels</p>
              </motion.div>

              {/* Modern progress indicator */}
              <div className="mt-6 w-36 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-white">
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
