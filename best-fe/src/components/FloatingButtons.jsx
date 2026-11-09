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
    transition={{ delay: 1, duration: 0.35 }}
    className="btn btn-whatsapp hidden lg:inline-flex fixed bottom-6 right-6 z-40 !min-h-12 shadow-[0_12px_30px_-10px_rgb(23_128_74/0.7)]"
    aria-label="Chat with us on WhatsApp"
  >
    <MessageCircle className="w-5 h-5" aria-hidden /> Chat on WhatsApp
  </motion.a>
);

export default FloatingButtons;
