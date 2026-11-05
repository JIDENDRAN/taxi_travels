import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Headset, ShieldCheck, ArrowRight, Calendar, Car as CarIcon, CheckCircle2 } from 'lucide-react';
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

  const inputCls = 'w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 font-medium placeholder:text-slate-400 text-sm';

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['Inter',sans-serif]">

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[440px] lg:min-h-[520px] flex items-center pt-24 pb-14 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <img src={CinematicSouthIndiaBg} alt="Contact Madurai Best Taxi Travels" className="w-full h-full object-cover opacity-25 object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-blue-950/40" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              24/7 Available for Bookings
            </div>
            <h1 className="text-4xl lg:text-6xl font-['DM_Sans',sans-serif] font-black text-white mb-4 leading-tight">
              Get in Touch with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Madurai Best Taxi Travels
              </span>
            </h1>
            <p className="text-slate-300 text-base lg:text-lg mb-8 max-w-lg leading-relaxed">
              Serving you from Palanganatham, Madurai. Have questions about outstation rides, airport cabs, or custom tour packages? We are here 24/7.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="tel:6382513075" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30">
                <Phone className="w-4 h-4" /> Call +91 63825 13075
              </a>
              <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border border-emerald-500/40 bg-emerald-600/90 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-600/20">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: <Headset className="w-3.5 h-3.5" />, text: "Instant Response" },
                { icon: <Clock className="w-3.5 h-3.5" />, text: "24/7 Cab Service" },
                { icon: <CarIcon className="w-3.5 h-3.5" />, text: "Clean & Sanitized Fleet" },
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Transparent Billing" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 border border-slate-700/60 bg-slate-800/40 rounded-lg px-3.5 py-1.5 text-slate-300 text-xs font-medium backdrop-blur-sm">
                  <span className="text-blue-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-slate-400 font-medium">
        <a href="/" className="hover:text-blue-600 transition-colors">Home</a> &gt; <span className="text-slate-800 font-bold">Contact Us</span>
      </div>

      {/* ── MAIN CONTACT SECTION ───────────────────────────── */}
      <section className="py-8 lg:py-16 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest block mb-2">OFFICIAL BUSINESS DETAILS</span>
            <h2 className="text-3xl lg:text-4xl font-['DM_Sans',sans-serif] font-black text-slate-900 mb-3">
              We'd Love to Hear From You
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-3" />
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Reach out directly or visit our registered office in Palanganatham, Madurai for direct booking assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            
            {/* Left: Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-[#0F172A] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800 text-left"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <CarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-['DM_Sans'] font-black text-lg">Madurai Best Taxi Travels</h3>
                  <p className="text-blue-400 text-xs font-semibold">Registered Taxi & Tour Operator</p>
                </div>
              </div>
              
              <div className="space-y-6 relative z-10 text-sm">
                {/* Official Address */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Official Address</h4>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      No. 18, Kovalan Nagar Last,<br/>
                      Muniyandi Street,<br/>
                      Palanganatham, Madurai,<br/>
                      Tamil Nadu, India.<br/>
                      <strong className="text-blue-400">Pin Code: 625003</strong>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Direct Call (24/7)</h4>
                    <p className="text-slate-300 text-xs">
                      <a href="tel:+916382513075" className="hover:text-blue-400 font-bold text-sm transition-colors block">+91 63825 13075</a>
                      <span className="text-slate-400 text-[11px]">Instant cab dispatch & quotes</span>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">WhatsApp Chat</h4>
                    <p className="text-slate-300 text-xs">
                      <a href="https://wa.me/916382513075" target="_blank" rel="noreferrer" className="hover:text-emerald-400 font-bold transition-colors">
                        +91 63825 13075
                      </a>
                      <span className="text-slate-400 text-[11px] block mt-0.5">Quick booking & itinerary planning</span>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Email Support</h4>
                    <p className="text-slate-300 text-xs">
                      <a href="mailto:maduraibesttoursandtravels01@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                        maduraibesttoursandtravels01@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Operating Hours</h4>
                    <p className="text-slate-300 text-xs">Monday – Sunday : <strong className="text-emerald-400">24/7 Open</strong></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Message Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200 text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-['DM_Sans',sans-serif] font-bold text-slate-900 uppercase tracking-wide">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">We respond within 15 minutes during operating hours.</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </div>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-['DM_Sans'] font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Thank you for contacting Madurai Best Taxi Travels. Our tour coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Ramesh Kumar" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. +91 98765 43210" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        className={inputCls} placeholder="yourname@gmail.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Subject / Destination</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                        className={inputCls} placeholder="e.g. Madurai to Rameswaram Cab" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Message / Travel Details *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange}
                      rows="5" className={`${inputCls} resize-none`}
                      placeholder="Please share pickup date, pickup location, number of passengers, and vehicle preference..." required />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 shadow-lg shadow-blue-600/20 text-sm cursor-pointer"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Message Now'}
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24 relative">
        <div className="w-full h-[420px] rounded-3xl overflow-hidden bg-slate-200 relative border border-slate-200 shadow-sm">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.59736881774!2d78.0934!3d9.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sPalanganatham%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Madurai Best Taxi Travels Location Map"
          ></iframe>
          
          {/* Map Overlay Card */}
          <div className="absolute top-6 left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 flex items-start gap-4 max-w-sm text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-0.5">Madurai Best Taxi Travels</h4>
              <p className="text-blue-600 text-xs font-semibold mb-1">Palanganatham Branch</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                No. 18, Kovalan Nagar Last, Muniyandi St, Palanganatham, Madurai - 625003
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CONTACT US ───────────────────────────────── */}
      <section className="py-12 bg-white rounded-t-[2.5rem] border-t border-slate-200 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-extrabold uppercase tracking-widest block mb-2">WHY CHOOSE US</span>
            <h2 className="text-3xl lg:text-4xl font-['DM_Sans',sans-serif] font-black text-slate-900">
              Why Ride with Madurai Best Taxi Travels?
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Headset className="w-6 h-6" />, title: "Instant Booking", desc: "Immediate booking confirmation on phone and WhatsApp with zero advance delay." },
              { icon: <CarIcon className="w-6 h-6" />, title: "Pristine Fleet", desc: "Swift Dzire, Etios, Innova Crysta & Tempo Travellers cleaned before every trip." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Transparent Pricing", desc: "Fixed outstation and day-rental rates with zero hidden charges or surprises." },
              { icon: <MapPin className="w-6 h-6" />, title: "South India Specialists", desc: "Expert ghat-road drivers for safe trips to Kodaikanal, Ooty, Munnar & Rameswaram." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-200/80 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-5 border border-slate-200">
                  {feature.icon}
                </div>
                <h3 className="text-base font-['DM_Sans'] font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
