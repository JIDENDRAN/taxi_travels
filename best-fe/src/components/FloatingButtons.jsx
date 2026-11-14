import React from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/**
 * Floating Action Buttons:
 * 1. Bottom-Left corner: Luminous Booking Button with "Book Now" label & icon.
 * 2. Bottom-Right corner: Vertical stack of circular Call, WhatsApp, and Booking buttons.
 * All buttons feature an eye-catching animated glowing pulse to attract visitors.
 */
const FloatingButtons = () => {
  const { openBooking } = useBooking();

  return (
    <>
      {/* ───────────────────────────────────────────────────────────
          LEFT BOTTOM CORNER: Quick Booking Button (with Glowing Effect)
          ─────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Quick booking"
        className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50 pointer-events-none"
      >
        <div className="group relative flex items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => openBooking()}
            className="flex items-center gap-2 px-3.5 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base border border-amber-300 glow-btn-booking hover:scale-105 active:scale-90 transition-all duration-150 cursor-pointer shadow-xl"
            aria-label="Book Cab Online"
            title="Book Now"
          >
            <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            <span className="tracking-wide">Book Now</span>
          </button>
        </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────
          RIGHT BOTTOM CORNER: Stacked Circular Action Buttons (Call, WhatsApp, Booking)
          ─────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Quick contact and booking actions"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none"
      >
        {/* 1. Call Button (Circular + Glowing Pulse) */}
        <div className="group relative flex items-center pointer-events-auto">
          <span
            className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            Call 24/7
          </span>
          <a
            href={SITE.phoneHref}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0A192F] hover:bg-[#1E3A8A] text-[#FBBF24] flex items-center justify-center border border-slate-700/60 glow-btn-call hover:scale-105 active:scale-90 transition-all duration-150 cursor-pointer"
            aria-label={`Call us at ${SITE.phoneDisplay}`}
            title="Call 24/7"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </a>
        </div>

        {/* 2. WhatsApp Button (Circular + Glowing Pulse) */}
        <div className="group relative flex items-center pointer-events-auto">
          <span
            className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            WhatsApp
          </span>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center glow-btn-whatsapp hover:scale-105 active:scale-90 transition-all duration-150 cursor-pointer"
            aria-label="Chat with us on WhatsApp"
            title="WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
          </a>
        </div>

        {/* 3. Book Now Button (Circular + Glowing Pulse) */}
        <div className="group relative flex items-center pointer-events-auto">
          <span
            className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            Book Now
          </span>
          <button
            type="button"
            onClick={() => openBooking()}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 flex items-center justify-center border border-amber-300 glow-btn-booking hover:scale-105 active:scale-90 transition-all duration-150 cursor-pointer"
            aria-label="Book Cab Online"
            title="Book Now"
          >
            <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default FloatingButtons;
