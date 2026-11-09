import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock, Camera } from 'lucide-react';
import Logo from '../../assets/new_logo.jpg';
import { NAV_LINKS, POPULAR_ROUTES, SITE } from '../../data/site';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-forest-100">
      <div className="container-x pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-[12px] overflow-hidden bg-white shrink-0">
                <img src={Logo} alt="" className="w-full h-full object-contain" loading="lazy" width="48" height="48" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-2xl text-white">Madurai Best</span>
                <span className="block text-[11px] font-bold tracking-[0.2em] text-gold-300">TAXI TRAVELS</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-forest-100/80 max-w-sm">
              Outstation cabs, airport transfers and South India tour packages from Palanganatham, Madurai — since {SITE.since}.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-6">
              <a href={SITE.phoneHref} className="btn btn-primary !min-h-10 !text-sm"><Phone className="w-4 h-4" /> Call 24/7</a>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost-light !min-h-10 !text-sm"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:col-span-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300 mb-4">Explore</h3>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((l) => <li key={l.path}><Link to={l.path} className="hover:text-white">{l.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300 mb-4">Popular services</h3>
              <ul className="space-y-2.5 text-sm">
                {POPULAR_ROUTES.map((r) => <li key={r.path}><Link to={r.path} className="hover:text-white">{r.label}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300 mb-4">Contact</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex gap-3"><MapPin className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" aria-hidden /><address className="not-italic leading-relaxed">{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address></li>
                <li className="flex gap-3"><Phone className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" aria-hidden /><a href={SITE.phoneHref} className="font-semibold text-white">{SITE.phoneDisplay}</a></li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" aria-hidden /><a href={`mailto:${SITE.email}`} className="hover:text-white break-all">{SITE.email}</a></li>
                <li className="flex gap-3"><Clock className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" aria-hidden />Open 24 hours, 7 days</li>
                <li className="flex gap-3"><Camera className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" aria-hidden /><a href={SITE.instagram} target="_blank" rel="noreferrer" className="hover:text-white">@maduraibesttourstravels</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-forest-100/70">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/admin/login" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
