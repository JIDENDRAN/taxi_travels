import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Car, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.jpeg';


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef(null);
  const mobileLangRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (langOpen) {
        const insideDesktop = langRef.current && langRef.current.contains(e.target);
        const insideMobile = mobileLangRef.current && mobileLangRef.current.contains(e.target);
        if (!insideDesktop && !insideMobile) {
          setLangOpen(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 glassmorphic-premium ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-lg' 
        : 'bg-white border-b border-slate-100 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
                              <img src={Logo} alt="Madurai Best Tours and Travels" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col hidden sm:flex">
                <span className="font-poppins font-black text-xl leading-none bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(250,204,21,0.2)]">MADURAI</span>
                <span className="font-poppins font-bold text-lg leading-none text-slate-850 group-hover:text-yellow-600 transition-colors">TOURS AND TRAVELS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-700 hover:text-yellow-500 font-medium font-poppins transition-colors"
              >
                {t(link.name)}
              </Link>
            ))}

            {/* Language Selector */}
              <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors"
              >
                <span>{languages.find(l => l.code === i18n.language)?.label.split(' ')[0] || 'English'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
                            {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-100"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700"
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Admin Link */}
            <Link 
              to="/admin/login" 
              className="text-slate-700 hover:text-yellow-500 transition-colors flex items-center justify-center bg-slate-100 hover:bg-yellow-50 w-10 h-10 rounded-full"
              title="Admin Login"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Header (Language Selector + Menu Button) */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            {/* Language Selector (Mobile) */}
            <button
              ref={mobileLangRef}
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors text-sm"
            >
              <span>{languages.find(l => l.code === i18n.language)?.label.split(' ')[0] || 'En'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="p-2 rounded-md text-slate-700 hover:bg-slate-100">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="md:hidden bg-white border-t border-slate-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">


  {navLinks.map((link) => (
    <Link
      key={link.name}
      to={link.path}
      onClick={() => setIsOpen(false)}
      className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-yellow-500 hover:bg-slate-50 rounded-lg"
    >
      {t(link.name)}
    </Link>
  ))}
</div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
