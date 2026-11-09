import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock, Camera, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, POPULAR_ROUTES, SITE } from '../../data/site';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="checker" aria-hidden />
      <div className="container-x pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-gold-400">Book anytime</p>
            <p className="h-display text-4xl sm:text-5xl text-sand-50 mt-4">Call. WhatsApp.<br />We drive.</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href={SITE.phoneHref} className="btn btn-primary"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h3 className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-gold-400 mb-4">Explore</h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.path}><Link to={l.path} className="font-semibold text-sand-100 hover:text-gold-400">{l.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-gold-400 mb-4">Routes &amp; services</h3>
              <ul className="space-y-2.5 text-sm">
                {POPULAR_ROUTES.map((r) => (
                  <li key={r.path}><Link to={r.path} className="text-ink-200 hover:text-gold-400">{r.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="mono text-[11px] font-bold uppercase tracking-[0.14em] text-gold-400 mb-4">Office</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" aria-hidden />
                  <address className="not-italic leading-relaxed">{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
                </li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" aria-hidden /><a href={`mailto:${SITE.email}`} className="hover:text-gold-400 break-all">{SITE.email}</a></li>
                <li className="flex gap-3"><Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" aria-hidden />Open 24 hours, 7 days</li>
                <li className="flex gap-3"><Camera className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" aria-hidden /><a href={SITE.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-400">@maduraibesttourstravels</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <Link to="/" className="group block mt-16 border-t-2 border-sand-50/15 pt-8" aria-label="Home">
          <span className="flex items-end justify-between gap-4">
            <span className="h-display text-[14.5vw] lg:text-[11rem] leading-[0.8] text-gold-500 group-hover:text-sand-50 transition-colors">
              MADURAI BEST
            </span>
            <ArrowUpRight className="hidden sm:block w-16 h-16 text-gold-500 shrink-0 mb-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
          </span>
          <span className="mono block text-xs font-bold tracking-[0.4em] text-sand-100 mt-3">TAXI · TRAVELS · SINCE {SITE.since}</span>
        </Link>

        <div className="mt-10 pt-6 border-t-2 border-sand-50/15 flex flex-col sm:flex-row gap-4 items-center justify-between mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink-300">
          <p>© {year} {SITE.name}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-gold-400">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold-400">Terms</Link>
            <Link to="/admin/login" className="hover:text-gold-400">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
