import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle, Navigation, CheckCircle, ChevronDown } from 'lucide-react';
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
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif] text-left">
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
      <section className="relative min-h-[55vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden bg-[#0F172A] pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/50" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                Madurai Best Taxi Travels • Palanganatham
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-['DM_Sans',sans-serif] font-black text-white leading-tight mb-4">
                {title}
              </h1>
              <p className="text-slate-300 text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              
              <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full" />

              <div className="flex flex-wrap gap-3.5">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-blue-600/25 cursor-pointer active:scale-95"
                >
                  <Navigation className="w-4 h-4" /> Book Ride Online
                </button>
                <a 
                  href="tel:6382513075" 
                  className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wider backdrop-blur-md"
                >
                  <PhoneCall className="w-4 h-4 text-blue-400" /> Call +91 63825 13075
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none text-slate-700"
              >
                <h2 className="text-2xl lg:text-3xl font-['DM_Sans',sans-serif] font-bold text-slate-900 mb-4">
                  {section.heading}
                </h2>
                <div 
                  className="leading-relaxed space-y-4 text-sm sm:text-base text-slate-600"
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
                <h2 className="text-2xl lg:text-3xl font-['DM_Sans',sans-serif] font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden cursor-pointer">
                      <summary className="flex items-center justify-between font-bold text-slate-800 p-5 select-none text-sm sm:text-base">
                        {faq.q}
                        <ChevronDown className="w-4 h-4 text-blue-600 transition-transform group-open:rotate-180 shrink-0 ml-3" />
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
            <div className="sticky top-24 space-y-6">
              {/* Trust Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs">
                <h3 className="font-['DM_Sans'] font-bold text-slate-900 text-lg mb-4">Why Ride with Us?</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {[
                    "No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai",
                    "Ghat-Road Trained Professional Drivers",
                    "Sanitized Sedans, Innova Crysta & Tempo Travellers",
                    "Transparent Pricing with Zero Hidden Surprises",
                    "24/7 Flight Pickup Tracking at Madurai Airport"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-[#0F172A] rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl" />
                
                <h3 className="font-['DM_Sans'] font-bold text-lg mb-1 relative z-10">Instant Cab Booking</h3>
                <p className="text-slate-400 text-xs mb-6 relative z-10">Available 24/7 across Madurai and all South India routes.</p>
                
                <div className="flex flex-col gap-3 relative z-10">
                  <a href="tel:6382513075" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider shadow-md shadow-blue-600/30">
                    <PhoneCall className="w-4 h-4" /> +91 63825 13075
                  </a>
                  <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20">
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
