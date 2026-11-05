import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import Logo from '../../assets/new_logo.jpg';

const PhoneIcon = () => (
  <Phone className="w-5 h-5" />
);

const MessageIcon = () => (
  <MessageSquare className="w-5 h-5" />
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.8c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.8c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    { name: 'Airport Transfers', path: '/madurai-airport-taxi' },
    { name: 'Tour Packages', path: '/madurai-tour-packages' },
    { name: 'Madurai to Rameswaram', path: '/madurai-to-rameswaram-taxi' },
    { name: 'Madurai to Kodaikanal', path: '/madurai-to-kodaikanal-taxi' },
    { name: 'Tempo Traveller Rental', path: '/tempo-traveller-rental-madurai' },
  ];

  const destinations = [
    'Madurai', 'Rameswaram', 'Kodaikanal', 'Ooty', 'Kanyakumari', 'Thanjavur',
  ];

  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1B2A4A] via-[#2563EB] to-[#1B2A4A]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 lg:px-6 pt-12 lg:pt-16 pb-6 lg:pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 lg:gap-8 mb-10 lg:mb-14">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-4 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500/40">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-['DM_Sans'] font-black text-blue-400 leading-tight text-lg">MADURAI BEST</div>
                <div className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Taxi Travels</div>
              </div>
            </div>

            <p className="text-white/60 text-xs leading-relaxed mb-4 max-w-sm">
              {t('Curated heritage journeys, premium private tours & travel packages. Travel in safety and comfort since 2015.')}
            </p>

            <div className="mb-6 space-y-2">
              <div className="flex items-start gap-2 text-xs text-white/80">
                <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  No. 18, Kovalan Nagar Last, Muniyandi Street, Palanganatham, Madurai, Tamil Nadu, India - 625003
                </span>
              </div>
              <a href="tel:+916382513075" className="flex items-center gap-2 text-xs text-white/80 hover:text-blue-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                +91 63825 13075
              </a>
              <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="flex items-center gap-2 text-xs text-white/80 hover:text-blue-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                maduraibesttoursandtravels01@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2.5 mb-6">
              {[
                { href: 'sms:+916382513075', icon: <MessageIcon />, hover: 'hover:bg-blue-500', label: 'Message' },
                { href: 'tel:+916382513075', icon: <PhoneIcon />, hover: 'hover:bg-emerald-600', label: 'Call' },
                { href: 'https://www.instagram.com/maduraibesttourstravels', icon: <InstagramIcon />, hover: 'hover:bg-pink-500', label: 'Instagram' },
                { href: 'https://wa.me/916382513075', icon: <WhatsAppIcon />, hover: 'hover:bg-green-500', label: 'WhatsApp' },
                { href: 'https://share.google/Fm3EQJUUHcn7X1uRe', icon: <MapPin className="w-5 h-5" />, hover: 'hover:bg-red-500', label: 'Google Maps' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  title={s.label}
                  className={`w-9 h-9 bg-white/10 ${s.hover} rounded-xl flex items-center justify-center transition-all hover:scale-110`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2 text-left">
            <h3 className="text-blue-400 font-bold text-sm mb-5 relative uppercase tracking-wider">
              {t('Quick Links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-blue-400 text-xs transition-colors hover:pl-1 duration-200 block"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="col-span-1 lg:col-span-2 text-left">
            <h3 className="text-blue-400 font-bold text-sm mb-5 relative uppercase tracking-wider">
              {t('Top Destinations')}
            </h3>
            <ul className="space-y-3">
              {destinations.map(dest => (
                <li key={dest}>
                  <Link to="/packages" className="text-white/60 hover:text-blue-400 text-xs transition-colors hover:pl-1 duration-200 block">
                    {t(dest)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 text-left">
            <h3 className="text-blue-400 font-bold text-sm mb-5 relative uppercase tracking-wider">
              {t('Our Services')}
            </h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.name}>
                  <Link to={service.path} className="text-white/60 hover:text-blue-400 text-xs transition-colors cursor-pointer hover:pl-1 duration-200 block">
                    {t(service.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 text-left">
            <h3 className="text-blue-400 font-bold text-sm mb-5 relative uppercase tracking-wider">
              {t('Newsletter')}
            </h3>
            <p className="text-white/60 text-[11px] leading-relaxed mb-4">
              {t('Subscribe to get updates & exclusive travel offers.')}
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={t('Enter your email')}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all text-xs hover:shadow-lg">
                {t('Subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p>© 2026 Madurai Best Taxi Travels. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-white/20">|</span>
                <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">{t('Privacy Policy')}</Link>
                <span className="text-white/20">|</span>
                <Link to="/terms-and-conditions" className="hover:text-blue-400 transition-colors">{t('Terms & Conditions')}</Link>
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm">
              <span className="text-white/60">Developed by</span>
              <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src={logo} alt="CodeThrive Logo" className="h-6.5 w-auto object-contain" />
                <span className="font-poppins font-extrabold text-white tracking-wide text-sm sm:text-base">Code Thrive Infotech</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
