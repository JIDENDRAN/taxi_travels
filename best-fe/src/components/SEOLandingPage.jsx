import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle, Navigation, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';

const SEOLandingPage = ({ 
  title, 
  heroSubtitle, 
  heroBg, 
  sections, 
  faqs 
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 text-left">
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      )}

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/70 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Madurai Best Taxi Travels • Palanganatham
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-5xl font-['Outfit'] font-black text-slate-900 leading-tight mb-4">
                {title}
              </h1>
              <p className="text-slate-600 text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              
              <div className="w-16 h-1 bg-blue-700 mb-8 rounded-full" />

              <div className="flex flex-wrap gap-3.5">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" /> Book Ride Online
                </button>
                <a 
                  href="tel:6382513075" 
                  className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 fill-slate-950" /> Call +91 63825 13075
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-2xl lg:text-3xl font-['Outfit'] font-bold text-slate-900 mb-4">
                  {section.heading}
                </h2>
                <div 
                  className="leading-relaxed space-y-4 text-sm sm:text-base text-slate-600 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-slate-900"
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                />
              </motion.div>
            ))}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-14 pt-10 border-t border-slate-200"
              >
                <h2 className="text-2xl lg:text-3xl font-['Outfit'] font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer">
                      <summary className="flex items-center justify-between font-bold text-slate-900 p-5 select-none text-sm sm:text-base">
                        {faq.q}
                        <ChevronDown className="w-4 h-4 text-blue-700 transition-transform group-open:rotate-180 shrink-0 ml-3" />
                      </summary>
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 text-xs sm:text-sm">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Trust Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h3 className="font-['Outfit'] font-bold text-slate-900 text-lg mb-4">Why Madurai Best?</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {[
                    "No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai",
                    "Ghat-Road Trained Professional Chauffeurs",
                    "Sanitized Luxury Sedans, Innova Crysta & Tempo Travellers",
                    "Transparent All-Inclusive Pricing with Zero Hidden Surprises",
                    "24/7 Live Flight Tracking at Madurai Airport (IXM)"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-xl border border-slate-800">
                <h3 className="font-['Outfit'] font-bold text-lg mb-1 relative z-10 text-white">Direct Chauffeur Booking</h3>
                <p className="text-slate-400 text-xs mb-6 relative z-10">Available 24/7 across Madurai and all South India tour routes.</p>
                
                <div className="flex flex-col gap-3 relative z-10">
                  <a href="tel:6382513075" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider shadow-xs">
                    <PhoneCall className="w-4 h-4 fill-slate-950" /> +91 63825 13075
                  </a>
                  <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider shadow-xs">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <BookingModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default SEOLandingPage;
