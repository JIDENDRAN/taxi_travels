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
    className="btn btn-whatsapp hidden lg:inline-flex fixed bottom-6 right-6 z-40 !min-h-12 shadow-[4px_4px_0_0_var(--color-ink-900)]"
    aria-label="Chat with us on WhatsApp"
  >
    <MessageCircle className="w-5 h-5" aria-hidden /> WhatsApp us
  </motion.a>
);

export default FloatingButtons;
