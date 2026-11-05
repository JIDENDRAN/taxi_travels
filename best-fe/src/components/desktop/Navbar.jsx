import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ShieldCheck, Phone, Menu, X, Sparkles } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F19]/90 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#030712]/90 via-[#030712]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-20' : 'h-24'}`}>

            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 p-0.5 bg-gradient-to-br from-[#1F2937] to-[#0B0F19] shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:border-[#D4AF37] transition-all">
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 font-cinzel font-black text-xl tracking-wider leading-none">
                  <span className="text-white">MADURAI</span>
                  <span className="text-gold-gradient">BEST</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold tracking-[0.28em] text-[#D4AF37] uppercase leading-none">
                    TAXI TRAVELS
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive(link.path)
                      ? 'text-[#F5D061] bg-[#D4AF37]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(link.name)}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full border border-[#D4AF37]/40 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Action Icons & Direct CTA */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white text-xs font-medium px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                >
                  <span>{languages.find(l => l.code === i18n.language)?.label || 'English'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform text-[#D4AF37] ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-[#0B0F19] rounded-2xl shadow-2xl py-2 border border-[#D4AF37]/30 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                            i18n.language === lang.code
                              ? 'text-[#F5D061] bg-[#D4AF37]/15 font-bold'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* VIP Call CTA */}
              <a
                href="tel:6382513075"
                className="hidden sm:inline-flex items-center gap-2 bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 gold-glow hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              >
                <Phone className="w-3.5 h-3.5 fill-black" />
                <span>Book 24/7</span>
              </a>

              {/* Admin Dashboard */}
              <Link
                to="/admin/dashboard"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all bg-white/[0.02]"
                title="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>

              {/* Mobile Drawer Button */}
              <button
                className="lg:hidden text-white p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-[#0B0F19] border-l border-[#D4AF37]/25 z-50 lg:hidden flex flex-col shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl border border-[#D4AF37]/40 p-0.5 overflow-hidden">
                    <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left font-cinzel font-black text-sm text-gold-gradient">
                    MADURAI BEST
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white">
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
                        ? 'bg-[#D4AF37]/15 text-[#F5D061] border border-[#D4AF37]/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="tel:6382513075"
                  className="flex items-center justify-center gap-2 w-full bg-gold-gradient text-black font-extrabold py-3.5 rounded-xl shadow-lg text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 fill-black" /> Call +91 63825 13075
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
