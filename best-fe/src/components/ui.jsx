import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/** Fade-up on scroll. Renders a plain element during SSR so content is never hidden for crawlers. */
export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', action, light = false, className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} mb-10 lg:mb-12 ${className}`}>
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow ${light ? '!text-gold-300' : ''}`}>{eyebrow}</p>}
        <h2 className={`h-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-3 ${light ? 'text-white' : 'text-ink-900'}`}>{title}</h2>
        {intro && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-ink-200' : 'text-ink-600'}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Inner-page hero with photo background and breadcrumb. */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children, compact = false }) {
  return (
    <section className={`relative isolate overflow-hidden bg-ink-900 text-white ${compact ? 'pt-28 pb-14 sm:pt-32 sm:pb-16' : 'pt-32 pb-20 sm:pt-40 sm:pb-24'}`}>
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 w-full h-full object-cover opacity-55" fetchPriority="high" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20" />
        </>
      )}
      <div className="container-x">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-200">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-ink-400" aria-hidden />
                  <span className="text-white font-semibold" aria-current="page">{c}</span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && <p className="eyebrow !text-gold-300">{eyebrow}</p>}
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mt-3">{title}</h1>
          {intro && <p className="mt-5 text-base sm:text-lg text-ink-100 max-w-2xl">{intro}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/** Closing call-to-action band used at the bottom of pages. */
export function CtaBand({ title = 'Ready when you are — day or night.', text = 'Tell us where you want to go. We confirm the vehicle and fare on a quick call, no online payment needed.', preset }) {
  const { openBooking } = useBooking();
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[20px] bg-ink-900 px-6 py-10 sm:px-12 sm:py-14 text-white">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/10" aria-hidden />
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-gold-400/30" aria-hidden />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-2xl">
              <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
              <p className="mt-3 text-ink-200">{text}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => openBooking(preset)} className="btn btn-primary">
                Book a ride <ArrowRight className="w-4 h-4" />
              </button>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn btn-ghost-light">
                <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-sand-200/70 rounded-[10px] ${className}`} />;
}
