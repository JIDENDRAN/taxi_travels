import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/** Fade-up on scroll. */
export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.9, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Numbered section heading: "02 — Tour packages" + big grotesque title. */
export function SectionHeading({ index, eyebrow, title, intro, action, light = false, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-10 lg:mb-14 ${className}`}>
      <div className={`flex items-center gap-4 pb-4 mb-6 border-b-2 ${light ? 'border-sand-50/25' : 'border-ink-900'} ${centered ? 'justify-center' : ''}`}>
        {index && <span className={`mono text-xs font-bold ${light ? 'text-gold-400' : 'text-ink-900'}`}>{index}</span>}
        {eyebrow && <span className={`mono text-xs font-bold uppercase tracking-[0.14em] ${light ? 'text-sand-100' : 'text-ink-600'}`}>{eyebrow}</span>}
      </div>
      <div className={`flex flex-col gap-6 ${centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
        <div className="max-w-3xl">
          <h2 className={`h-display text-[2.4rem] sm:text-5xl lg:text-[3.6rem] ${light ? 'text-sand-50' : 'text-ink-950'}`}>{title}</h2>
          {intro && <p className={`mt-5 text-lg max-w-2xl ${light ? 'text-ink-200' : 'text-ink-600'}`}>{intro}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/** Inner-page hero: big type on paper + framed photo with a yellow offset block. */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children, compact = false }) {
  return (
    <section className="relative border-b-2 border-ink-900 overflow-hidden">
      <div className={`container-x grid gap-10 lg:gap-14 items-center ${image ? 'lg:grid-cols-[1.15fr_1fr]' : ''} ${compact ? 'py-12 sm:py-16' : 'py-12 sm:py-16 lg:py-20'}`}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}>
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                <li><Link to="/" className="hover:text-ink-900">Home</Link></li>
                {crumbs.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    <span className="text-ink-900" aria-current="page">{c}</span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`h-display mt-4 text-ink-950 ${compact ? 'text-4xl sm:text-5xl' : 'text-[2.8rem] sm:text-6xl lg:text-[4.6rem]'}`}>{title}</h1>
          {intro && <p className="mt-6 text-lg sm:text-xl text-ink-600 max-w-xl">{intro}</p>}
          {children}
        </motion.div>
        {image && (
          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 20 }}
            animate={{ opacity: 1, rotate: -1.5, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.9, 0.2, 1] }}
            className={`relative ${compact ? 'hidden lg:block' : ''}`}
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-gold-500 border-2 border-ink-900 rounded-[8px]" aria-hidden />
            <div className={`relative border-2 border-ink-900 rounded-[8px] overflow-hidden bg-ink-900 ${compact ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
              <img src={image} alt="" aria-hidden className="w-full h-full object-cover" fetchPriority="high" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Infinite scrolling ticker. */
export function Marquee({ items, className = '' }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-2 border-ink-900 bg-ink-900 text-sand-50 ${className}`} aria-hidden>
      <div className="marquee-track py-3.5">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 h-display text-2xl sm:text-3xl whitespace-nowrap">
            {t}
            <span className="w-3 h-3 bg-gold-500 rotate-45 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  title = 'Need a cab? We pick up 24/7.',
  text = 'Tell us where you want to go. We confirm the vehicle and fare on a quick call — nothing to pay online.',
  preset,
}) {
  const { openBooking } = useBooking();
  return (
    <section className="bg-gold-500 border-y-2 border-ink-900">
      <div className="container-x py-16 sm:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
        <div>
          <p className="mono text-xs font-bold uppercase tracking-[0.14em] text-ink-900">Book in under a minute</p>
          <h2 className="h-display text-[2.6rem] sm:text-6xl text-ink-950 mt-3">{title}</h2>
          <p className="mt-5 text-lg text-ink-800 max-w-xl">{text}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <button type="button" onClick={() => openBooking(preset)} className="btn btn-dark sm:col-span-2 !min-h-14 !text-base">
            Book a ride <ArrowRight className="w-5 h-5" />
          </button>
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href={SITE.phoneHref} className="btn btn-outline">
            <Phone className="w-4 h-4" /> Call 24/7
          </a>
        </div>
      </div>
    </section>
  );
}

/** Small arrow link used in section headers. */
export function ArrowLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 font-bold text-ink-900 border-b-2 border-ink-900 pb-1 hover:border-gold-500">
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </Link>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-sand-200 border-2 border-sand-200 rounded-[6px] ${className}`} />;
}
