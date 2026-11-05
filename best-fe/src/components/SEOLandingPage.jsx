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
    <div className="bg-[#030712] min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-slate-300 text-left selection:bg-[#D4AF37] selection:text-black">
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
      <section className="relative min-h-[55vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden bg-[#030712] pt-32 pb-20 border-b border-[#D4AF37]/15">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]/60" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F19] border border-[#D4AF37]/30 text-[#F5D061] text-xs font-semibold tracking-widest uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Madurai Best Taxi Travels • Palanganatham
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-['Cinzel',serif] font-bold text-white leading-tight mb-4 tracking-wide">
                {title}
              </h1>
              <p className="text-slate-300 text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mb-8 rounded-full" />

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C158] hover:to-[#B8871B] text-[#030712] font-bold rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" /> Reserve Private Cab
                </button>
                <a 
                  href="tel:6382513075" 
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#0B0F19] hover:bg-[#111827] border border-[#D4AF37]/30 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-widest backdrop-blur-md"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4AF37]" /> Call +91 63825 13075
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#030712]">
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
                className="bg-[#0B0F19] border border-white/5 rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-2xl lg:text-3xl font-['Cinzel',serif] font-bold text-white mb-4">
                  {section.heading}
                </h2>
                <div 
                  className="leading-relaxed space-y-4 text-sm sm:text-base text-slate-300 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-[#F5D061]"
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
                className="mt-14 pt-10 border-t border-white/10"
              >
                <h2 className="text-2xl lg:text-3xl font-['Cinzel',serif] font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-[#0B0F19] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#D4AF37]/30 transition-colors">
                      <summary className="flex items-center justify-between font-semibold text-white p-5 select-none text-sm sm:text-base">
                        {faq.q}
                        <ChevronDown className="w-4 h-4 text-[#D4AF37] transition-transform group-open:rotate-180 shrink-0 ml-3" />
                      </summary>
                      <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-3 text-xs sm:text-sm">
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
              <div className="bg-[#0B0F19] border border-[#D4AF37]/25 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />
                <h3 className="font-['Cinzel',serif] font-bold text-white text-lg mb-4">Why Madurai Best?</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {[
                    "No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai",
                    "Ghat-Road Trained Professional Chauffeurs",
                    "Sanitized Luxury Sedans, Innova Crysta & Urbania Travellers",
                    "Transparent All-Inclusive Pricing with Zero Hidden Surprises",
                    "24/7 Live Flight Tracking at Madurai Airport (IXM)"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-slate-300 font-normal leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-[#0B0F19] to-[#111827] rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-2xl border border-[#D4AF37]/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl" />
                
                <h3 className="font-['Cinzel',serif] font-bold text-lg mb-1 relative z-10 text-white">Direct Chauffeur Booking</h3>
                <p className="text-slate-400 text-xs mb-6 relative z-10">Available 24/7 across Madurai and all South India tour routes.</p>
                
                <div className="flex flex-col gap-3 relative z-10">
                  <a href="tel:6382513075" className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C158] hover:to-[#B8871B] text-[#030712] font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20">
                    <PhoneCall className="w-4 h-4" /> +91 63825 13075
                  </a>
                  <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="bg-[#128C7E] hover:bg-[#075E54] text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider shadow-md">
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
