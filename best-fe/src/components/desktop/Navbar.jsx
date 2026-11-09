import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';
import { NAV_LINKS, SITE } from '../../data/site';
import { useBooking } from '../../context/BookingContext';

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} — home`}>
      <span className="w-11 h-11 rounded-[12px] overflow-hidden bg-white ring-1 ring-sand-200 shrink-0">
        <img src={Logo} alt="" className="w-full h-full object-contain" width="44" height="44" />
      </span>
      <span className="leading-tight">
        <span className="block font-display font-semibold text-[1.25rem] text-forest-700">Madurai Best</span>
        <span className="block text-[10.5px] font-bold tracking-[0.2em] text-gold-600">TAXI TRAVELS</span>
      </span>
    </Link>
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
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_6px_20px_-12px_rgb(15_31_23/0.35)]' : 'shadow-[0_1px_0_var(--color-sand-200)]'}`}>
        <div className="container-x flex items-center justify-between gap-4 h-[68px] lg:h-[74px]">
          <Brand />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-[0.95rem] font-semibold transition-colors ${isActive ? 'bg-forest-50 text-forest-700' : 'text-ink-700 hover:text-forest-700'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={SITE.phoneHref} className="hidden xl:inline-flex items-center gap-2 font-bold text-forest-700">
              <span className="w-9 h-9 grid place-items-center rounded-full bg-forest-50"><Phone className="w-4 h-4" aria-hidden /></span>
              {SITE.phoneDisplay}
            </a>
            <button type="button" onClick={() => openBooking()} className="btn btn-primary !min-h-11 hidden sm:inline-flex">Book Now</button>
            <button
              type="button"
              className="lg:hidden w-11 h-11 grid place-items-center rounded-full bg-forest-50 text-forest-700 cursor-pointer"
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
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-forest-950/50 lg:hidden" onClick={() => setOpen(false)} />
            <motion.aside
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[70] w-[min(88vw,380px)] bg-white flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-sand-200">
                <Brand />
                <button onClick={() => setOpen(false)} className="w-10 h-10 grid place-items-center rounded-full bg-forest-50 text-forest-700 cursor-pointer" aria-label="Close menu"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `flex items-center justify-between px-4 py-3.5 rounded-[14px] text-lg font-semibold ${isActive ? 'bg-forest-50 text-forest-700' : 'text-ink-800 hover:bg-sand-50'}`}
                  >
                    {link.name} <ArrowRight className="w-4 h-4 opacity-40" aria-hidden />
                  </NavLink>
                ))}
              </nav>
              <div className="p-5 border-t border-sand-200 space-y-2.5 bg-sand-50">
                <button type="button" onClick={() => { setOpen(false); openBooking(); }} className="btn btn-primary w-full">Book Now <ArrowRight className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={SITE.phoneHref} className="btn btn-outline"><Phone className="w-4 h-4" /> Call</a>
                  <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                </div>
                <p className="text-xs text-ink-500 text-center pt-1">Palanganatham, Madurai · Open 24/7</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
