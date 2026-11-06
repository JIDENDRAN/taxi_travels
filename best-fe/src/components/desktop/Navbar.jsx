import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

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
            ? 'bg-white shadow-md py-2.5 border-b border-slate-200'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left: Brand Logo & Title (Matching Reference Header) */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 text-left">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-200 p-0.5 bg-white shadow-xs group-hover:border-amber-400 transition-colors">
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="font-['Outfit'] font-black text-lg tracking-tight leading-none text-[#0A192F]">
                  MADURAI BEST
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-1">
                  <span className="text-amber-500 font-extrabold">TAXI</span>
                  <span>• Tours & Travels</span>
                </div>
              </div>
            </Link>

            {/* Center: Navigation Links with Yellow Active Pill (Matching Mockup) */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-semibold transition-all duration-150 px-4 py-1.5 rounded-full ${
                      active
                        ? 'bg-[#FBBF24] text-slate-950 font-bold shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Phone Hotline + Yellow Contact Us Pill Button */}
            <div className="flex items-center gap-4">
              {/* Phone Hotline with Circular Icon */}
              <a
                href="tel:6382513075"
                className="hidden md:flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-amber-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#FBBF24] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <span>+91 63825 13075</span>
              </a>

              {/* Yellow Pill Button: Contact Us */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm px-5 py-2 rounded-full transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
              >
                Contact Us
              </Link>

              {/* Admin Dashboard */}
              <Link
                to="/admin/dashboard"
                className="w-8 h-8 rounded-full hidden sm:flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                title="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
              className="fixed inset-y-0 right-0 w-80 bg-white z-50 lg:hidden flex flex-col shadow-2xl p-6 text-left"
            >
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg border border-slate-200 p-0.5 overflow-hidden">
                    <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-slate-900 text-sm block">MADURAI BEST</span>
                    <span className="text-[10px] font-bold text-amber-600 block">Taxi & Tour Travels</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 py-6 space-y-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#FBBF24] text-slate-950 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className={`block px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    isActive('/contact')
                      ? 'bg-[#FBBF24] text-slate-950 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Contact Us
                </Link>
              </div>

              {/* Bottom Phone & Address */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href="tel:6382513075"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#0A192F] text-[#FBBF24] font-bold rounded-full text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call +91 63825 13075</span>
                </a>
                <p className="text-[11px] text-slate-500 text-center">
                  Palanganatham, Madurai • 24/7 Service
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
