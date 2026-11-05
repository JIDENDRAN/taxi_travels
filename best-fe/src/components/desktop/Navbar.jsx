import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Fleet', path: '/vehicles' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-2.5'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left: Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 text-left">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200 p-0.5 bg-white shadow-xs group-hover:scale-105 transition-transform">
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="font-['Outfit'] font-black text-lg tracking-tight leading-none text-slate-900">
                  Madurai Best
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  Taxi Travels
                </div>
              </div>
            </Link>

            {/* Center: Nav Links matching reference image pill styling */}
            <nav className="hidden lg:flex items-center space-x-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-wider transition-all duration-200 px-4 py-1.5 rounded-full ${
                    isActive(link.path)
                      ? 'bg-[#FBBF24] text-slate-950 font-black shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 font-semibold'
                  }`}
                >
                  {t(link.name)}
                </Link>
              ))}
            </nav>

            {/* Right: Phone Hotline & Yellow Contact Us Button */}
            <div className="flex items-center gap-4">
              <a
                href="tel:6382513075"
                className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                </div>
                <span>+91 63825 13075</span>
              </a>

              <Link
                to="/contact"
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-200 shadow-xs cursor-pointer ${
                  isActive('/contact')
                    ? 'bg-[#F59E0B] text-slate-950 font-black'
                    : 'bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 active:scale-95'
                }`}
              >
                {t('Contact Us')}
              </Link>

              {/* Admin Icon */}
              <Link
                to="/admin/dashboard"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                title="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>

              {/* Mobile Drawer Button */}
              <button
                className="lg:hidden text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl p-6 text-left"
            >
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg border border-slate-200 p-0.5 overflow-hidden">
                    <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="font-['Outfit'] font-black text-sm text-slate-900">
                    Madurai Best <span className="text-slate-500 font-normal">Travels</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-800 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                      isActive(link.path)
                        ? 'bg-[#FBBF24] text-slate-950'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className={`block px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                    isActive('/contact')
                      ? 'bg-[#FBBF24] text-slate-950'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t('Contact Us')}
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs text-slate-500">
                  📍 No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003
                </div>
                <a
                  href="tel:6382513075"
                  className="flex items-center justify-center gap-2 w-full bg-[#FBBF24] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-full shadow-xs text-xs uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 fill-slate-950" /> Call +91 63825 13075
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
