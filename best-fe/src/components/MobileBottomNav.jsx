import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Briefcase, Image, PhoneCall } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Packages', path: '/packages', icon: Briefcase },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F] border-t border-slate-800 text-slate-300 py-2 px-3 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                active ? 'text-[#FBBF24] font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${active ? 'text-[#FBBF24]' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
