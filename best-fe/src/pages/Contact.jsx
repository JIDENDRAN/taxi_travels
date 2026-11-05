import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Headset, ShieldCheck, Calendar, Car as CarIcon, CheckCircle2, Sparkles } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import CinematicSouthIndiaBg from '../assets/cinematic_south_india.png';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else alert(t('Failed to send message. Please call us instead.'));
    } catch {
      alert(t('Connection error. Please try calling or WhatsApp.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = 'w-full px-5 py-3.5 rounded-2xl bg-[#030712]/90 border border-white/10 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-white font-medium placeholder:text-gray-500 text-xs sm:text-sm';

  return (
    <div className="bg-[#030712] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── LUXURY PAGE HERO ──────────────────────────────── */}
      <section className="relative min-h-[480px] lg:min-h-[540px] flex items-center pt-28 pb-16 overflow-hidden bg-[#030712]">
        <div className="absolute inset-0">
          <img src={CinematicSouthIndiaBg} alt="Contact Madurai Best Taxi Travels" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 text-[#F5D061] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              24/7 Concierge & Dispatch Office
            </div>
            <h1 className="text-4xl lg:text-6xl font-cinzel font-black text-white mb-4 leading-tight">
              CONNECT WITH <br/>
              <span className="text-gold-gradient">MADURAI BEST</span>
            </h1>
            <p className="text-gray-300 text-sm lg:text-base mb-8 max-w-lg leading-relaxed font-normal">
              Located at Palanganatham, Madurai. Get instant taxi quotes, outstation itineraries, and airport pickup confirmations in minutes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="tel:6382513075" className="flex items-center gap-2.5 bg-gold-gradient text-black font-extrabold px-8 py-4 rounded-full transition-all text-xs uppercase tracking-wider gold-glow hover:scale-105">
                <Phone className="w-4 h-4 fill-black" /> Call +91 63825 13075
              </a>
              <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 border border-emerald-500/40 bg-emerald-600/20 hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-full transition-all text-xs uppercase tracking-wider hover:scale-105 backdrop-blur-md">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp 24/7
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFICIAL CONTACT SECTION ──────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#0B0F19] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            
            {/* Left: Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-obsidian-elevated rounded-3xl p-8 text-white relative overflow-hidden gold-border-glow shadow-2xl"
            >
              <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <CarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-cinzel font-black text-lg">Madurai Best Taxi</h3>
                  <p className="text-[#D4AF37] text-xs font-semibold">Registered Head Office</p>
                </div>
              </div>
              
              <div className="space-y-6 text-xs sm:text-sm">
                {/* Official Address */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1 text-xs">Official Address</h4>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      No. 18, Kovalan Nagar Last,<br/>
                      Muniyandi Street,<br/>
                      Palanganatham, Madurai,<br/>
                      Tamil Nadu, India.<br/>
                      <strong className="text-[#F5D061]">Pin Code: 625003</strong>
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1 text-xs">Hotline (24/7)</h4>
                    <a href="tel:+916382513075" className="text-[#F5D061] font-bold text-sm hover:underline block">
                      +91 63825 13075
                    </a>
                    <span className="text-gray-400 text-[11px]">Instant dispatch & inquiries</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1 text-xs">WhatsApp Support</h4>
                    <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">
                      +91 63825 13075
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1 text-xs">Email Desk</h4>
                    <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="text-gray-300 text-xs hover:text-[#F5D061] transition-colors break-all">
                      maduraibesttoursandtravels01@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-1 text-xs">Service Availability</h4>
                    <p className="text-gray-300 text-xs">Open 24 Hours • 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Message Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 glass-obsidian rounded-3xl p-8 lg:p-10 border border-white/10"
            >
              <div className="mb-8">
                <h3 className="font-cinzel text-2xl font-bold text-white uppercase tracking-wider">
                  Request a Customized Itinerary
                </h3>
                <p className="text-gray-400 text-xs mt-1">Direct coordination with our South India tour specialists.</p>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white mb-2">Inquiry Received!</h3>
                  <p className="text-gray-400 text-xs max-w-md mx-auto">
                    Thank you for contacting Madurai Best Taxi Travels. Our dispatch coordinator will connect with you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Anand Sharma" required />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. +91 98765 43210" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        className={inputCls} placeholder="anand@example.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">Destination / Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Madurai to Kodaikanal 3-Day Trip" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">Trip Details & Requirements *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange}
                      rows="5" className={`${inputCls} resize-none`}
                      placeholder="Share pickup date, pickup location, passenger count, preferred car type (Sedan, Innova, Tempo)..." required />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-gradient text-black font-extrabold py-4 rounded-2xl shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 text-xs uppercase tracking-widest cursor-pointer mt-2"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry Now'}
                    <Send className="w-4 h-4 ml-1 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP EMBED ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="w-full h-[400px] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.59736881774!2d78.0934!3d9.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sPalanganatham%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Madurai Best Taxi Travels Map"
          />
        </div>
      </section>

    </div>
  );
};

export default Contact;
