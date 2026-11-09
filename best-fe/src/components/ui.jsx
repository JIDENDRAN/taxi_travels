import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, ChevronRight, Check } from 'lucide-react';
import { SITE } from '../data/site';
import { useBooking } from '../context/BookingContext';

/** Fade-up on scroll. */
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

export function SectionHeading({ eyebrow, title, intro, action, light = false, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`flex flex-col gap-5 mb-10 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${light ? '!text-gold-300' : ''}`}>{eyebrow}</p>}
        <h2 className={`h-display !font-bold text-2xl sm:text-3xl lg:text-[2rem] mt-2 ${light ? 'text-white' : 'text-ink-950'}`}>{title}</h2>
        {intro && <p className={`mt-3 text-base sm:text-lg ${light ? 'text-forest-100' : 'text-ink-600'}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Small trust badge used on photo banners. */
export function TrustPill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 border border-white/30 backdrop-blur px-3.5 py-1.5 text-[13px] font-semibold text-white">
      <Check className="w-3.5 h-3.5 text-gold-300" aria-hidden /> {children}
    </span>
  );
}

/** Inner-page banner: forest band with a toned photo, breadcrumb and title. */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children, compact = false, pills }) {
  return (
    <section className={`relative isolate overflow-hidden bg-forest-800 text-white ${compact ? 'py-14 sm:py-16' : 'py-16 sm:py-20 lg:py-24'}`}>
      {image && <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 w-full h-full object-cover opacity-40 mix-blend-luminosity" fetchPriority="high" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900 via-forest-800/85 to-forest-700/30" />
      <div className="container-x">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-forest-100">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden />
                  <span className="text-white font-semibold" aria-current="page">{c}</span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl">
          {eyebrow && <p className="eyebrow !text-gold-300">{eyebrow}</p>}
          <h1 className={`h-display mt-3 ${compact ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'}`}>{title}</h1>
          {intro && <p className="mt-4 text-lg text-forest-100 max-w-2xl">{intro}</p>}
          {pills && <div className="flex flex-wrap gap-2 mt-6">{pills.map((p) => <TrustPill key={p}>{p}</TrustPill>)}</div>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  title = 'Ready to travel? We pick up 24/7.',
  text = 'Tell us where you want to go. We confirm the vehicle and fare on a quick call — nothing to pay online.',
  preset,
}) {
  const { openBooking } = useBooking();
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-forest-700 text-white px-6 py-10 sm:px-12 sm:py-14">
          <div className="absolute -right-20 -bottom-24 w-80 h-80 rounded-full bg-gold-500/20" aria-hidden />
          <div className="absolute right-24 -top-16 w-40 h-40 rounded-full bg-gold-300/10" aria-hidden />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-2xl">
              <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
              <p className="mt-3 text-forest-100">{text}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => openBooking(preset)} className="btn btn-primary">Book a ride <ArrowRight className="w-4 h-4" /></button>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              <a href={SITE.phoneHref} className="btn btn-ghost-light"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArrowLink({ to, children }) {
  return (
    <Link to={to} className="btn btn-outline">
      {children} <ArrowRight className="w-4 h-4" aria-hidden />
    </Link>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-sand-200/70 rounded-[18px] ${className}`} />;
}
