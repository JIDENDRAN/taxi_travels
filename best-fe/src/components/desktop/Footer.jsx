import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowRight, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/new_logo.jpg';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Fleet', path: '/vehicles' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const popularRoutes = [
    { name: 'Madurai Taxi Service', path: '/madurai-taxi-service' },
    { name: 'Madurai Airport Taxi (IXM)', path: '/madurai-airport-taxi' },
    { name: 'Madurai to Rameswaram Taxi', path: '/madurai-to-rameswaram-taxi' },
    { name: 'Madurai to Kodaikanal Cabs', path: '/madurai-to-kodaikanal-taxi' },
    { name: 'Tempo Traveller Rental', path: '/tempo-traveller-rental-madurai' },
    { name: 'South India Tour Packages', path: '/madurai-tour-packages' },
  ];

  const destinations = [
    'Madurai Meenakshi', 'Rameswaram', 'Kodaikanal', 'Ooty', 'Kanyakumari', 'Munnar', 'Kerala', 'Thanjavur'
  ];

  return (
    <footer className="bg-[#0A192F] text-slate-300 relative overflow-hidden pt-16 pb-10 text-left font-['Plus_Jakarta_Sans',sans-serif] border-t border-slate-800">
      
      {/* Top Yellow Ribbon matching reference yellow brand accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FBBF24]" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">

          {/* Brand & Address Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-300/60 p-0.5 bg-white shadow-md">
                <img src={Logo} alt="Madurai Best Taxi Travels" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="font-['Outfit'] font-black text-white text-xl tracking-tight leading-none">
                  Madurai Best
                </div>
                <div className="text-[#FBBF24] text-[11px] font-bold uppercase tracking-wider mt-0.5">
                  Taxi Travels • Palanganatham
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-6 max-w-sm">
              South India’s reliable private cab and tour operator. Trusted for sanitized vehicles, punctual chauffeurs, and transparent tariffs.
            </p>

            {/* Official Business Details */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FBBF24] mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India — <strong className="text-white">625003</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a href="tel:+916382513075" className="hover:text-[#FBBF24] transition-colors font-bold text-white">
                  +91 63825 13075 (24/7 Hotline)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="hover:text-[#FBBF24] transition-colors">
                  maduraibesttoursandtravels01@gmail.com
                </a>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="tel:6382513075"
                className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950" /> Call Now
              </a>
              <a
                href="https://wa.me/916382513075"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-[#FBBF24] transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                    <span>{t(link.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="lg:col-span-3">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Popular Routes
            </h4>
            <ul className="space-y-2.5 text-xs">
              {popularRoutes.map((svc) => (
                <li key={svc.name}>
                  <Link
                    to={svc.path}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                    <span>{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* South India Destinations & Google Rating */}
          <div className="lg:col-span-3">
            <h4 className="font-['Outfit'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Destinations
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {destinations.map((dest, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700"
                >
                  {dest}
                </span>
              ))}
            </div>

            {/* Google Rating Card */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-white font-bold text-xs">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Over 50,000+ satisfied passengers, tourists & temple pilgrims served since 2015.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Madurai Best Taxi Travels. All rights reserved. Palanganatham, Madurai.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
