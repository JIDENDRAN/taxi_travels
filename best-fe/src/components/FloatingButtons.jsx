import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/**
 * Official WhatsApp Logo SVG:
 * Speech bubble with pointer tail and telephone receiver inside.
 */
const WhatsAppLogo = ({ className = "w-8 h-8 sm:w-9 sm:h-9" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * Floating Action Buttons:
 * 1. Bottom-Left corner: Quick Booking Button with "Book Now" label & icon.
 * 2. Bottom-Right corner: Clean circular Call and WhatsApp buttons.
 */
const FloatingButtons = () => {
  const { openBooking } = useBooking();

  return (
    <>
      {/* ───────────────────────────────────────────────────────────
          LEFT BOTTOM CORNER: Quick Booking Button
          ─────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Quick booking"
        className="fixed bottom-16 left-4 sm:bottom-20 sm:left-6 lg:bottom-24 z-50 pointer-events-none"
      >
        <div className="group relative flex items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => openBooking()}
            className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base border border-amber-300/80 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Book Cab Online"
            title="Book Now"
          >
            <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
            <span className="tracking-wide font-extrabold">Book Now</span>
          </button>
        </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────
          RIGHT BOTTOM CORNER: Clean Stacked Circular Action Buttons (Call, WhatsApp)
          ─────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Quick contact actions"
        className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 lg:bottom-24 z-50 flex flex-col items-end gap-3.5 sm:gap-4 pointer-events-none"
      >
        {/* 1. Call Button */}
        <div className="group relative flex items-center pointer-events-auto">
          <span
            className="hidden sm:inline-block absolute right-full mr-3.5 px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            Call 24/7
          </span>
          <a
            href={SITE.phoneHref}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0A192F] hover:bg-[#1E3A8A] text-[#FBBF24] flex items-center justify-center border border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label={`Call us at ${SITE.phoneDisplay}`}
            title="Call 24/7"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </a>
        </div>

        {/* 2. WhatsApp Button */}
        <div className="group relative flex items-center pointer-events-auto">
          <span
            className="hidden sm:inline-block absolute right-full mr-3.5 px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            WhatsApp
          </span>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center border border-emerald-400/40 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Chat with us on WhatsApp"
            title="WhatsApp"
          >
            <WhatsAppLogo className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
      </aside>
    </>
  );
};

export default FloatingButtons;
