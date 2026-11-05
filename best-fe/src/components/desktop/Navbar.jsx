import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck, Phone, Menu, X, MapPin, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const changeLanguage = (lng) => { i18n.changeLanguage(lng); setLangOpen(false); };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        
        {/* Top Info Bar */}
        <div className={`bg-[#0B1528] text-amber-100 text-xs py-2 px-4 transition-all duration-300 hidden md:block ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Palanganatham, Madurai - 625003</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Outstation & Madurai Airport (IXM) Pickup</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>#1 Rated Taxi Travels in Madurai</span>
              </span>
              <span className="text-slate-600">•</span>
              <a href="tel:6382513075" className="text-white hover:text-amber-400 font-bold transition-colors">
                Hotline: +91 63825 13075
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-100 py-3'
              : 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 py-3.5 shadow-xs'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">

              {/* Brand Logo & Name */}
              <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-300/70 p-0.5 bg-white shadow-xs group-hover:border-blue-600 transition-all">
                  <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 font-['Outfit'] font-black text-xl tracking-tight leading-none text-slate-900">
                    <span>MADURAI</span>
                    <span className="text-blue-700">BEST</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-extrabold tracking-[0.22em] text-amber-600 uppercase leading-none">
                      TAXI TRAVELS
                    </span>
                    <span className="text-[9px] text-slate-400 hidden sm:inline">• Palanganatham</span>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-1 bg-[#FAF7F2] border border-amber-200/60 px-3 py-1.5 rounded-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-full ${
                      isActive(link.path)
                        ? 'text-white bg-blue-700 shadow-xs'
                        : 'text-slate-700 hover:text-blue-700 hover:bg-white'
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-3">
                
                {/* Language Selector */}
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer"
                  >
                    <span>{languages.find(l => l.code === i18n.language)?.label || 'English'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform text-slate-500 ${langOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl py-2 border border-slate-200 z-50 overflow-hidden"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                              i18n.language === lang.code
                                ? 'text-blue-700 bg-blue-50 font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Call Button */}
                <a
                  href="tel:6382513075"
                  className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Call 24/7</span>
                </a>

                {/* Admin Dashboard Icon */}
                <Link
                  to="/admin/dashboard"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-all bg-white"
                  title="Admin"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>

                {/* Mobile Hamburger */}
                <button
                  className="lg:hidden text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-80 bg-[#FAF7F2] border-l border-amber-200 z-50 lg:hidden flex flex-col shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-5 border-b border-amber-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg border border-amber-300 p-0.5 overflow-hidden bg-white">
                    <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left font-['Outfit'] font-black text-sm text-slate-900">
                    MADURAI <span className="text-blue-700">BEST</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-800 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-6 space-y-2 text-left">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(link.path)
                        ? 'bg-blue-700 text-white font-bold'
                        : 'text-slate-700 hover:bg-white'
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-amber-200/60 space-y-3">
                <div className="text-xs text-slate-600 leading-relaxed mb-2">
                  📍 No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003
                </div>
                <a
                  href="tel:6382513075"
                  className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3.5 rounded-xl shadow-sm text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 fill-slate-950" /> Call +91 63825 13075
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
