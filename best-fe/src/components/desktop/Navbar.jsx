import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck, Phone, Menu, X } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
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
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100'
          : 'bg-gradient-to-b from-[#0F172A]/80 to-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-lg"
              >
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 font-['DM_Sans'] font-black text-lg text-[#2563EB] tracking-tight leading-none mb-0.5">
                  <span>MADURAI</span>
                  <span>BEST</span>
                </div>
                <span className={`font-['DM_Sans'] font-semibold text-xs tracking-widest uppercase leading-none ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}>TAXI TRAVELS</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${isScrolled
                    ? isActive(link.path)
                      ? 'text-blue-600'
                      : 'text-slate-700 hover:text-blue-600'
                    : isActive(link.path)
                      ? 'text-blue-400'
                      : 'text-white/90 hover:text-white'
                    }`}
                >
                  {t(link.name)}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${isActive(link.path) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`} />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1 text-sm font-medium px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all ${isScrolled
                    ? 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span>{languages.find(l => l.code === i18n.language)?.label || 'English'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className={`absolute right-0 mt-2 w-44 rounded-xl shadow-xl py-2 z-50 overflow-hidden ${isScrolled
                        ? 'bg-white border border-slate-200'
                        : 'bg-[#1B2A4A] border border-white/10'
                        }`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${isScrolled
                            ? i18n.language === lang.code
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                            : i18n.language === lang.code
                              ? 'text-blue-400 bg-white/10'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call CTA & Admin (Desktop Only) */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="tel:6382513075"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  Book Now
                </a>
                <Link
                  to="/admin/dashboard"
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${isScrolled
                    ? 'border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400'
                    : 'border-white/20 text-white/60 hover:text-white hover:border-white/50'
                    }`}
                  title="Admin"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
                  }`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <span className="font-['DM_Sans'] font-bold text-slate-800">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 flex-1 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(link.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-800 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                    >
                      {t(link.name)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.07 }}
                >
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                  >
                    {t('Admin')} <ShieldCheck className="w-4 h-4 ml-auto" />
                  </Link>
                </motion.div>
              </nav>
              <div className="p-4 border-t border-slate-200">
                <a href="tel:6382513075" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> +91 63825 13075
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
