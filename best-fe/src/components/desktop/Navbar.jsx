import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/new_logo.jpg';
import { NAV_LINKS, SITE } from '../../data/site';
import { useBooking } from '../../context/BookingContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Every public page opens with a dark photo hero, so the header is transparent until scrolled.
  const solid = scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
          solid ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_var(--color-sand-200),0_8px_24px_-16px_rgb(12_27_43/0.25)] py-2.5' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} — home`}>
            <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] overflow-hidden bg-white ring-1 ring-black/5 shrink-0">
              <img src={Logo} alt="" className="w-full h-full object-contain" width="44" height="44" />
            </span>
            <span className="leading-tight">
              <span className={`block font-display font-semibold text-[1.05rem] sm:text-lg tracking-tight ${solid ? 'text-ink-900' : 'text-white'}`}>
                Madurai Best
              </span>
              <span className={`block text-[11px] font-semibold tracking-[0.12em] uppercase ${solid ? 'text-gold-600' : 'text-gold-300'}`}>
                Tours &amp; Travels
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.filter((l) => l.path !== '/').map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-transform after:origin-left ${
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  } ${solid ? 'text-ink-800 hover:text-ink-950 after:bg-gold-500' : 'text-white/90 hover:text-white after:bg-gold-400'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phoneHref}
              className={`hidden md:inline-flex items-center gap-2 text-sm font-bold px-2 ${solid ? 'text-ink-900' : 'text-white'}`}
            >
              <Phone className="w-4 h-4 text-gold-500" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <button type="button" onClick={() => openBooking()} className="btn btn-primary !min-h-10 !px-4 hidden sm:inline-flex">
              Book a ride
            </button>
            <button
              type="button"
              className={`lg:hidden p-2 rounded-[10px] cursor-pointer ${solid ? 'text-ink-900 hover:bg-ink-50' : 'text-white hover:bg-white/10'}`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
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
              <div className="flex items-center justify-between px-5 py-4 border-b border-sand-200">
                <span className="font-display font-semibold text-lg text-ink-900">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 -mr-2 rounded-[10px] text-ink-600 hover:bg-ink-50 cursor-pointer" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.03 }}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-3.5 rounded-[10px] text-lg font-semibold ${isActive ? 'bg-sand-100 text-ink-950' : 'text-ink-700 hover:bg-sand-50'}`
                      }
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 text-ink-300" aria-hidden />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="p-5 border-t border-sand-200 space-y-2.5 bg-sand-50">
                <button type="button" onClick={() => { setOpen(false); openBooking(); }} className="btn btn-primary w-full">
                  Book a ride <ArrowRight className="w-4 h-4" />
                </button>
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
