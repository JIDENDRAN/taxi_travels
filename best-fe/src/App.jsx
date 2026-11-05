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
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper font-['Plus_Jakarta_Sans',sans-serif] bg-[#030712] text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] text-white select-none overflow-hidden"
          >
            {/* Golden radial aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative mb-6"
              >
                <div className="relative z-10 w-28 h-28 lg:w-32 lg:h-32 rounded-3xl bg-[#0B0F19] shadow-[0_0_50px_rgba(212,175,55,0.25)] border border-[#D4AF37]/40 p-2.5 flex items-center justify-center overflow-hidden">
                  <img src={Logo} alt="Madurai Best Taxi Travels Logo" className="w-full h-full object-contain rounded-2xl" />
                </div>
                {/* Rotating Gold Accent Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-[2.2rem] border border-transparent border-t-[#D4AF37] border-r-[#D4AF37]/30 pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center text-center px-6"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#D4AF37] mb-1">
                  TAXI TRAVELS
                </span>
                <h2 className="font-cinzel font-black text-2xl lg:text-3xl tracking-wider text-white">
                  MADURAI <span className="text-gold-gradient">BEST</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-1">Palanganatham, Madurai • Since 2015</p>
              </motion.div>

              {/* Shimmer Bar */}
              <div className="mt-8 w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-gold-gradient rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-[#030712]">
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
