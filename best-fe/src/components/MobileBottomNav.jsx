import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/**
 * Sticky action bar on phones/tablets: the three ways to book, always one tap away.
 * (Page navigation lives in the header menu.)
 */
const MobileBottomNav = () => {
  const { openBooking } = useBooking();

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-200 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-2 max-w-lg mx-auto">
        <a href={SITE.phoneHref} className="btn btn-outline !min-h-11 !px-2 !text-sm">
          <Phone className="w-4 h-4" aria-hidden /> Call
        </a>
        <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp !min-h-11 !px-2 !text-sm">
          <MessageCircle className="w-4 h-4" aria-hidden /> WhatsApp
        </a>
        <button type="button" onClick={() => openBooking()} className="btn btn-primary !min-h-11 !px-2 !text-sm">
          <CalendarCheck className="w-4 h-4" aria-hidden /> Book a ride
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
