import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SITE } from '../data/site';

/** Desktop-only WhatsApp shortcut (phones use the bottom action bar). */
const FloatingButtons = () => (
  <motion.a
    href={SITE.whatsappHref}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.4 }}
    className="hidden lg:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 pl-3 pr-4 py-3 rounded-full bg-leaf-500 hover:bg-leaf-600 text-white font-bold text-sm shadow-[0_12px_30px_-10px_rgb(23_128_74/0.7)] transition-colors"
    aria-label="Chat with us on WhatsApp"
  >
    <span className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">
      <MessageCircle className="w-4 h-4" aria-hidden />
    </span>
    Chat on WhatsApp
  </motion.a>
);

export default FloatingButtons;
