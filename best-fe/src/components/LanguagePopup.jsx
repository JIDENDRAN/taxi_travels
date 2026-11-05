import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';

const LanguagePopup = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already selected a language
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    const isMobile = window.innerWidth <= 768;

    if (!hasSelectedLanguage && isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const selectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('languageSelected', 'true');
    setIsVisible(false);
  };

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-sm relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors z-10 bg-white/50 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center relative z-10 mb-6 mt-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-slate-900 mb-2">Welcome!</h3>
              <p className="text-slate-600 text-sm">Please select your preferred language for the best experience.</p>
            </div>

            <div className="space-y-3 relative z-10">
              {languages.map((lang, idx) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white rounded-xl border border-white/50 shadow-sm transition-all text-slate-800 group"
                >
                  <span className="font-poppins font-semibold">{lang.native}</span>
                  <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-md group-hover:bg-yellow-100 group-hover:text-yellow-700 transition-colors">
                    {lang.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LanguagePopup;
