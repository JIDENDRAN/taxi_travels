import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5">
      {/* 24/7 Call Button */}
      <motion.a
        href="tel:6382513075"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.4)] border border-amber-300 transition-all cursor-pointer"
        title="Call Madurai Best Taxi Travels"
      >
        <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center">
          <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
        </div>
        <span className="text-xs tracking-wider uppercase pr-1 hidden sm:inline">
          Call 24/7
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/916382513075"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
        title="Chat on WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 fill-white text-white" />
        </div>
        <span className="text-xs uppercase tracking-wider pr-1 hidden sm:inline">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
