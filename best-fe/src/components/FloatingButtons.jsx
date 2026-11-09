import { MessageCircle } from 'lucide-react';
import { SITE } from '../data/site';

/** Desktop-only WhatsApp shortcut (phones use the bottom action bar). */
const FloatingButtons = () => (
  <a
    href={SITE.whatsappHref}
    target="_blank"
    rel="noreferrer"
    className="btn btn-whatsapp anim-fade-up anim-delay-2 hidden lg:inline-flex fixed bottom-6 right-6 z-40 !min-h-12 shadow-[0_12px_30px_-10px_rgb(23_128_74/0.7)]"
    aria-label="Chat with us on WhatsApp"
  >
    <MessageCircle className="w-5 h-5" aria-hidden /> Chat on WhatsApp
  </a>
);

export default FloatingButtons;
