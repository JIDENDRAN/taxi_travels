import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/** Sticky action bar on phones and tablets. */
const MobileBottomNav = () => {
  const { openBooking } = useBooking();
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-ink-900 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[auto_auto_1fr] gap-2 max-w-lg mx-auto">
        <a href={SITE.phoneHref} className="btn btn-outline !min-h-12 !px-4 !border-sand-50" aria-label={`Call ${SITE.phoneDisplay}`}>
          <Phone className="w-5 h-5" aria-hidden />
        </a>
        <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp !min-h-12 !px-4 !border-sand-50" aria-label="Chat on WhatsApp">
          <MessageCircle className="w-5 h-5" aria-hidden />
        </a>
        <button type="button" onClick={() => openBooking()} className="btn btn-primary !min-h-12 !text-base !border-sand-50 !shadow-none">
          Book a ride <ArrowUpRight className="w-5 h-5" aria-hidden />
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
