import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Logo from '../../assets/new_logo.jpg';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const services = [
    { name: 'Madurai Taxi Service', path: '/madurai-taxi-service' },
    { name: 'Airport Pickup & Drop', path: '/madurai-airport-taxi' },
    { name: 'South India Tour Packages', path: '/madurai-tour-packages' },
    { name: 'Madurai to Rameswaram', path: '/madurai-to-rameswaram-taxi' },
    { name: 'Madurai to Kodaikanal', path: '/madurai-to-kodaikanal-taxi' },
    { name: 'Tempo Traveller Rental', path: '/tempo-traveller-rental-madurai' },
  ];

  const destinations = [
    'Madurai Meenakshi Temple', 'Rameswaram & Dhanushkodi', 'Kodaikanal Hill Station', 'Ooty Tea Gardens', 'Kanyakumari Triveni', 'Munnar & Kerala'
  ];

  return (
    <footer className="bg-[#030712] text-white relative overflow-hidden border-t border-[#D4AF37]/20 pt-16 lg:pt-20 pb-8 text-left font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Subtle top golden light line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />
      
      {/* Radial background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Brand & Address Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 p-0.5 bg-gradient-to-br from-[#1F2937] to-[#0B0F19] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <div className="font-cinzel font-black text-white text-xl tracking-wider leading-none">
                  MADURAI <span className="text-gold-gradient">BEST</span>
                </div>
                <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.25em] uppercase mt-1">
                  TAXI TRAVELS
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-sm">
              South India’s premier luxury and family taxi service provider. Safe, punctual, and transparent travel since 2015.
            </p>

            {/* Official Business Details */}
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — <strong className="text-white">625003</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+916382513075" className="hover:text-[#F5D061] transition-colors font-semibold">
                  +91 63825 13075 (24/7 Hotline)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="hover:text-[#F5D061] transition-colors">
                  maduraibesttoursandtravels01@gmail.com
                </a>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="tel:6382513075"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-gold-gradient hover:text-black transition-all"
                title="Call Directly"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/916382513075"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://share.google/Fm3EQJUUHcn7X1uRe"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all"
                title="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-cinzel text-white text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#F5D061] text-xs transition-colors block hover:translate-x-1 duration-200"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-cinzel text-white text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    className="text-gray-400 hover:text-[#F5D061] text-xs transition-colors block hover:translate-x-1 duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Circuits & Dispatch */}
          <div className="lg:col-span-3">
            <h3 className="font-cinzel text-white text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Popular Routes
            </h3>
            <ul className="space-y-3">
              {destinations.map(d => (
                <li key={d} className="text-gray-400 text-xs flex items-center gap-2">
                  <span className="text-[#D4AF37]">✦</span> {d}
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-[#D4AF37]/20">
              <div className="text-[11px] font-bold text-[#F5D061] mb-1">24/7 Airport Cab Dispatch</div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Flight tracking included. Zero wait time for arrivals at Madurai Airport.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Madurai Best Taxi Travels. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-white/20">|</span>
              <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">{t('Privacy Policy')}</Link>
              <span className="text-white/20">|</span>
              <Link to="/terms-and-conditions" className="hover:text-[#D4AF37] transition-colors">{t('Terms & Conditions')}</Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">Engineered by</span>
            <div className="flex items-center gap-2">
              <img src={logo} alt="CodeThrive Logo" className="h-5 w-auto object-contain opacity-80" />
              <span className="font-semibold text-gray-300">Code Thrive Infotech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
