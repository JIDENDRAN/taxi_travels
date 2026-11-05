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

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-slate-800 font-medium placeholder:text-slate-400 text-xs sm:text-sm';

  return (
    <div className="bg-white text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-left">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/70 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              24/7 Booking Desk & Travel Inquiries
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-['Outfit'] font-black text-slate-900 mb-4 tracking-tight leading-tight">
              CONTACT <span className="text-blue-700">MADURAI BEST</span> TAXI
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Located at Palanganatham, Madurai. Get instant taxi quotes, outstation itineraries, and airport pickup confirmations in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OFFICIAL CONTACT SECTION ──────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            
            {/* Left: Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl p-7 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <CarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-['Outfit'] font-black text-lg text-slate-900">Madurai Best Taxi</h3>
                  <p className="text-blue-700 text-xs font-semibold">Registered Office • Palanganatham</p>
                </div>
              </div>
              
              <div className="space-y-6 text-xs sm:text-sm">
                {/* Official Address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Official Address</h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      No. 18, Kovalan Nagar Last,<br/>
                      Muniyandi Street,<br/>
                      Palanganatham, Madurai,<br/>
                      Tamil Nadu, India.<br/>
                      <strong className="text-slate-900">Pin Code: 625003</strong>
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-blue-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Hotline (24/7)</h4>
                    <a href="tel:+916382513075" className="text-blue-700 font-bold text-sm hover:underline block">
                      +91 63825 13075
                    </a>
                    <span className="text-slate-400 text-[11px]">Instant dispatch & inquiries</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">WhatsApp Support</h4>
                    <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">
                      +91 63825 13075
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-blue-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Email Desk</h4>
                    <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="text-slate-600 text-xs hover:text-blue-700 transition-colors break-all">
                      maduraibesttoursandtravels01@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Availability</h4>
                    <p className="text-slate-600 text-xs">Open 24 Hours • 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Message Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-sm"
            >
              <div className="mb-6">
                <h3 className="font-['Outfit'] text-2xl font-black text-slate-900">
                  Request a Trip Quote or Inquiry
                </h3>
                <p className="text-slate-500 text-xs mt-1">Direct coordination with our South India tour specialists.</p>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-['Outfit'] font-bold text-slate-900 mb-2">Inquiry Received!</h3>
                  <p className="text-slate-500 text-xs max-w-md mx-auto">
                    Thank you for contacting Madurai Best Taxi Travels. Our dispatch coordinator will connect with you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Anand Sharma" required />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. +91 98765 43210" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        className={inputCls} placeholder="anand@example.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Destination / Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Madurai to Kodaikanal 3-Day Trip" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Trip Details & Requirements *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange}
                      rows="4" className={`${inputCls} resize-none`}
                      placeholder="Share pickup date, pickup location, passenger count, preferred car type (Sedan, Innova, Tempo)..." required />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry Now'}
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP EMBED ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="w-full h-[380px] rounded-3xl overflow-hidden relative border border-slate-200 shadow-sm">
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
