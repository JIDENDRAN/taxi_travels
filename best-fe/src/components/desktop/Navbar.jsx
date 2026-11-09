import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';
import { NAV_LINKS, SITE } from '../../data/site';
import { useBooking } from '../../context/BookingContext';

function Wordmark() {
  return (
    <span className="leading-none">
      <span className="block h-display text-[1.35rem] sm:text-[1.5rem] tracking-[-0.04em] text-ink-950">MADURAI BEST</span>
      <span className="mono block text-[10px] font-bold tracking-[0.28em] mt-1 text-ink-600">TAXI · TRAVELS</span>
    </span>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden md:block bg-ink-900 text-sand-100">
        <div className="container-x flex items-center justify-between h-9 mono text-[11px] font-bold uppercase tracking-[0.12em]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-leaf-500 animate-[blink_1.6s_ease-in-out_infinite]" aria-hidden />
            Desk open 24/7 · Palanganatham, Madurai
          </span>
          <span className="flex items-center gap-6">
            <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-gold-400 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" aria-hidden /> WhatsApp</a>
            <a href={SITE.phoneHref} className="hover:text-gold-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" aria-hidden /> {SITE.phoneDisplay}</a>
          </span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 bg-sand-50 border-b-2 border-ink-900 transition-shadow ${scrolled ? 'shadow-[0_4px_0_0_rgb(23_22_18/0.08)]' : ''}`}>
        <div className="container-x flex items-center justify-between gap-4 h-[68px] lg:h-[76px]">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} — home`}>
            <span className="w-11 h-11 lg:w-12 lg:h-12 bg-gold-500 border-2 border-ink-900 rounded-[6px] p-0.5 shrink-0 shadow-[3px_3px_0_0_var(--color-ink-900)]">
              <img src={Logo} alt="" className="w-full h-full object-contain rounded-[3px] bg-white" width="48" height="48" />
            </span>
            <Wordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.filter((l) => l.path !== '/').map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-[6px] text-[0.95rem] font-bold border-2 transition-colors ${
                    isActive ? 'bg-gold-500 border-ink-900 text-ink-950' : 'border-transparent text-ink-800 hover:border-ink-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => openBooking()} className="btn btn-dark !min-h-11 hidden sm:inline-flex">
              Book a ride <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="lg:hidden w-11 h-11 grid place-items-center border-2 border-ink-900 rounded-[6px] bg-gold-500 cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70] bg-gold-500 flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex items-center justify-between h-[68px] border-b-2 border-ink-900 shrink-0">
              <Wordmark />
              <button onClick={() => setOpen(false)} className="w-11 h-11 grid place-items-center border-2 border-ink-900 rounded-[6px] bg-sand-50 cursor-pointer" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="container-x flex-1 overflow-y-auto py-4" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2.5 border-b-2 border-ink-900/15 text-ink-950"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="mono text-xs font-bold w-6">{String(i + 1).padStart(2, '0')}</span>
                        <span className={`h-display text-[2.4rem] ${isActive ? 'underline decoration-4 underline-offset-[6px]' : ''}`}>{link.name}</span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="container-x pb-8 pt-4 space-y-3 shrink-0">
              <button type="button" onClick={() => { setOpen(false); openBooking(); }} className="btn btn-dark w-full !min-h-14">
                Book a ride <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="w-4 h-4" /> Call</a>
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              </div>
              <p className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-800 flex items-center gap-2 justify-center pt-1">
                <Clock className="w-3.5 h-3.5" aria-hidden /> Open 24/7 · {SITE.phoneDisplay}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
