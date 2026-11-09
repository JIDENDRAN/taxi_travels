import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Car, Plane, Clock, Map, Headphones, ShieldCheck, Sparkles,
  ReceiptText, Star, PhoneCall, Route, CarFront,
} from 'lucide-react';
import HeroImg from '../assets/opt/madurai-aerial.webp';
import { DESTINATIONS, POPULAR_ROUTES, SERVICE_PILLARS, SITE, TRAVELLER_PHOTOS } from '../data/site';
import { useBooking } from '../context/BookingContext';
import { useCars, usePackages } from '../hooks/useCatalog';
import { fetchGoogleReviews } from '../utils/googleReviewsService';
import { PackageCard, VehicleCard } from '../components/cards';
import { ArrowLink, CtaBand, Reveal, SectionHeading, Skeleton, TrustPill } from '../components/ui';

const PILLAR_ICONS = { clock: Headphones, steering: ShieldCheck, sparkle: Sparkles, receipt: ReceiptText };

const TABS = [
  { id: 'outstation', label: 'Outstation', icon: Car },
  { id: 'airport', label: 'Airport', icon: Plane },
  { id: 'local', label: 'Hourly Rental', icon: Clock },
  { id: 'package', label: 'Tour Packages', icon: Map },
];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/* ── Tabbed booking portal ─────────────────────────────────────── */
function BookingPortal() {
  const { openBooking } = useBooking();
  const { data: cars } = useCars();
  const { data: packages } = usePackages();
  const [tab, setTab] = useState('outstation');
  const [way, setWay] = useState('oneway');
  const [q, setQ] = useState({ fromLocation: 'Madurai', toLocation: '', packageType: 'Custom Trip', date: '', time: '', vehicle: 'Select Vehicle' });
  const set = (k) => (e) => setQ((s) => ({ ...s, [k]: e.target.value }));

  const chooseTab = (id) => {
    setTab(id);
    if (id === 'airport' && !q.toLocation) setQ((s) => ({ ...s, toLocation: 'Madurai Airport (IXM)' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const pkg = packages.find((p) => p.name === q.packageType);
    openBooking({
      tripType: tab === 'outstation' ? way : tab === 'package' ? 'roundtrip' : tab,
      fromLocation: q.fromLocation,
      toLocation: tab === 'package' ? (pkg?.location || '') : q.toLocation,
      packageType: tab === 'package' ? q.packageType : undefined,
      date: q.date,
      time: q.time,
      vehicle: q.vehicle !== 'Select Vehicle' ? q.vehicle : undefined,
    });
  };

  const cell = 'relative bg-white px-4 sm:px-5 py-3.5';
  const lbl = 'block text-xs font-medium text-ink-500';
  const big = 'w-full bg-transparent outline-none text-lg sm:text-xl font-extrabold text-ink-950 placeholder:text-ink-300 placeholder:font-bold mt-0.5 appearance-none';

  return (
    <form onSubmit={submit} className="relative bg-white rounded-[24px] shadow-[var(--shadow-panel)] pb-10" aria-label="Book a cab">
      <div className="flex overflow-x-auto no-scrollbar border-b border-sand-200 px-3 sm:px-5" role="tablist">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => chooseTab(id)}
            className={`shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-4 text-sm font-semibold border-b-[3px] -mb-px cursor-pointer transition-colors ${tab === id ? 'border-forest-700 text-forest-700' : 'border-transparent text-ink-500 hover:text-forest-700'}`}
          >
            <span className={`w-8 h-8 rounded-[10px] grid place-items-center ${tab === id ? 'bg-forest-700 text-white' : 'bg-forest-50 text-forest-700'}`}><Icon className="w-4 h-4" aria-hidden /></span>
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-7 pt-4">
        {tab === 'outstation' && (
          <div className="flex gap-6 mb-3 text-sm font-semibold" role="radiogroup" aria-label="Trip direction">
            {[['oneway', 'One Way'], ['roundtrip', 'Round Trip']].map(([id, label]) => (
              <label key={id} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="way" value={id} checked={way === id} onChange={() => setWay(id)} className="w-4 h-4 accent-[var(--color-forest-700)]" />
                {label}
              </label>
            ))}
          </div>
        )}
        {tab !== 'outstation' && <div className="h-3" />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.25fr_1.25fr_1fr_1fr_1fr] gap-px bg-sand-200 border border-sand-200 rounded-[16px] overflow-hidden">
          <div className={cell}>
            <label htmlFor="bp-from" className={lbl}>From</label>
            <input id="bp-from" className={big} value={q.fromLocation} onChange={set('fromLocation')} placeholder="Pickup city" autoComplete="off" />
            <span className="text-xs text-ink-400">City, hotel or station</span>
          </div>
          <div className={cell}>
            {tab === 'package' ? (
              <>
                <label htmlFor="bp-pkg" className={lbl}>Tour package</label>
                <select id="bp-pkg" className={`${big} !text-lg cursor-pointer`} value={q.packageType} onChange={set('packageType')}>
                  <option value="Custom Trip">Custom trip</option>
                  {packages.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
                <span className="text-xs text-ink-400">{packages.find((p) => p.name === q.packageType)?.duration || 'Tell us your plan'}</span>
              </>
            ) : (
              <>
                <label htmlFor="bp-to" className={lbl}>{tab === 'local' ? 'Places to visit' : 'To'}</label>
                <input id="bp-to" className={big} value={q.toLocation} onChange={set('toLocation')} placeholder={tab === 'local' ? 'e.g. City sightseeing' : 'Destination'} autoComplete="off" />
                <span className="text-xs text-ink-400">{tab === 'airport' ? 'Pickup or drop at IXM' : 'Anywhere in TN & Kerala'}</span>
              </>
            )}
          </div>
          <div className={cell}>
            <label htmlFor="bp-date" className={lbl}>Pickup date</label>
            <input id="bp-date" type="date" min={todayISO()} className={`${big} !text-base sm:!text-lg`} value={q.date} onChange={set('date')} />
          </div>
          <div className={cell}>
            <label htmlFor="bp-time" className={lbl}>Pickup time</label>
            <input id="bp-time" type="time" className={`${big} !text-base sm:!text-lg`} value={q.time} onChange={set('time')} />
          </div>
          <div className={`${cell} sm:col-span-2 lg:col-span-1`}>
            <label htmlFor="bp-car" className={lbl}>Cab type</label>
            <select id="bp-car" className={`${big} !text-lg cursor-pointer`} value={q.vehicle} onChange={set('vehicle')}>
              <option value="Select Vehicle">Any</option>
              {cars.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <span className="text-xs text-ink-400">{cars.find((c) => c.name === q.vehicle)?.seats || 'We suggest the best fit'}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -bottom-7 -translate-x-1/2">
        <button type="submit" className="btn btn-primary !min-h-14 !px-12 !text-base uppercase tracking-wider shadow-[0_14px_30px_-10px_rgb(139_168_74/0.9)]">
          Search cabs
        </button>
      </div>
    </form>
  );
}

/* ── Live Google reviews (only real data from the API is shown) ── */
function GoogleReviewsStrip() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchGoogleReviews().then((d) => alive && d?.success && d.reviews?.length && setData(d));
    return () => { alive = false; };
  }, []);
  if (!data) return null;
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-5">
      {data.reviews.slice(0, 3).map((r, i) => (
        <figure key={i} className="card p-6 flex flex-col">
          <div className="flex text-gold-500 mb-3" aria-label={`${r.rating} out of 5`}>
            {Array.from({ length: r.rating || 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" aria-hidden />)}
          </div>
          <blockquote className="text-ink-700 leading-relaxed line-clamp-6 flex-1">“{r.text}”</blockquote>
          <figcaption className="mt-4 pt-4 border-t border-sand-200 text-sm font-bold text-ink-900">{r.authorName}{r.relativeTime && <span className="font-normal text-ink-500"> · {r.relativeTime}</span>}</figcaption>
        </figure>
      ))}
    </div>
  );
}

const Home = () => {
  const { openBooking } = useBooking();
  const { data: packages, loading: pkgLoading } = usePackages();
  const { data: cars, loading: carsLoading } = useCars();

  return (
    <>
      {/* ── HERO BAND ───────────────────────────────────────── */}
      <section className="relative isolate bg-forest-800 text-white pb-44 sm:pb-40">
        <img src={HeroImg} alt="" aria-hidden className="absolute inset-0 -z-10 w-full h-full object-cover opacity-45 mix-blend-luminosity" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900 via-forest-800/85 to-forest-700/20" />
        <div className="container-x pt-14 sm:pt-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl">
            <p className="eyebrow !text-gold-300">Madurai · since {SITE.since} · open 24/7</p>
            <h1 className="h-display text-[2.5rem] sm:text-6xl lg:text-[4rem] mt-4">
              Book outstation cabs &amp; <em className="text-gold-300">South India tours</em> from Madurai
            </h1>
            <p className="mt-5 text-lg text-forest-100">Clear per-km fares · AC sedans, SUVs &amp; Tempo Travellers · 24/7 support</p>
            <div className="flex flex-wrap gap-2 mt-7">
              <TrustPill>Nothing to pay online</TrustPill>
              <TrustPill>Fare confirmed on call</TrustPill>
              <TrustPill>Local Madurai drivers</TrustPill>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING PORTAL ──────────────────────────────────── */}
      <div className="container-x relative z-10 -mt-32 sm:-mt-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <BookingPortal />
        </motion.div>
      </div>

      {/* ── POPULAR PACKAGES ────────────────────────────────── */}
      {(pkgLoading || packages.length > 0) && (
        <section className="pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="container-x">
            <SectionHeading eyebrow="Tour packages" title="Popular tour packages" intro="Fixed starting fares — days, stops and vehicle tailored to your group." action={<ArrowLink to="/packages">View all packages</ArrowLink>} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pkgLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[440px]" />)
                : packages.slice(0, 6).map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section className={pkgLoading || packages.length > 0 ? 'pb-16 sm:pb-20' : 'pt-24 pb-16 sm:pt-28'}>
        <div className="container-x">
          <div className="card grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-sand-200">
            {SERVICE_PILLARS.map((p) => {
              const Icon = PILLAR_ICONS[p.icon];
              return (
                <div key={p.title} className="p-6 flex gap-4">
                  <span className="w-12 h-12 shrink-0 rounded-[14px] bg-gold-100 text-forest-700 grid place-items-center"><Icon className="w-5 h-5" aria-hidden /></span>
                  <div>
                    <h3 className="font-bold text-ink-950">{p.title}</h3>
                    <p className="text-sm text-ink-600 mt-1">{p.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── POPULAR ROUTES ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-y border-sand-200">
        <div className="container-x">
          <SectionHeading eyebrow="Popular services" title="Most-booked routes from Madurai" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_ROUTES.map((r) => (
              <Link key={r.path} to={r.path} className="group flex items-center gap-4 rounded-[18px] border border-sand-200 bg-sand-50 p-5 hover:bg-white hover:border-forest-700/30 hover:shadow-[var(--shadow-soft)] transition-all">
                <span className="w-12 h-12 shrink-0 rounded-full bg-forest-700 text-white grid place-items-center">
                  {r.path.includes('tempo') ? <CarFront className="w-5 h-5" aria-hidden /> : <Route className="w-5 h-5" aria-hidden />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-ink-950">{r.label}</span>
                  <span className="block text-sm text-ink-500">{r.detail}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-forest-700 group-hover:translate-x-0.5 transition-all" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Destinations" title={<>Hills, temples &amp; <em className="text-forest-600">backwaters</em></>} intro="Every trip starts at your doorstep in Madurai." action={<ArrowLink to="/packages">Explore tours</ArrowLink>} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 0.05}>
                <Link to={`/packages?q=${encodeURIComponent(d.query)}`} className="group block bg-white rounded-[22px] p-2 border border-sand-200 hover:shadow-[var(--shadow-lift)] transition-shadow">
                  <span className="block aspect-[4/3] overflow-hidden rounded-[16px]"><img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" className="img-zoom w-full h-full object-cover" /></span>
                  <span className="flex items-center justify-between gap-2 px-2.5 pt-3 pb-1.5">
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-ink-950 truncate">{d.name}</span>
                      <span className="block text-xs text-ink-500 truncate">{d.note}</span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-forest-700" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ───────────────────────────────────────────── */}
      {(carsLoading || cars.length > 0) && (
        <section className="py-16 sm:py-20 bg-white border-y border-sand-200">
          <div className="container-x">
            <SectionHeading eyebrow="Our fleet" title="Choose your cab" intro="Clean AC vehicles with clear per-km and day-rental tariffs." action={<ArrowLink to="/vehicles">See all vehicles</ArrowLink>} />
            <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-2">
              {carsLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[480px] min-w-[82%] sm:min-w-[46%] lg:min-w-0" />)
                : cars.slice(0, 3).map((c) => <div key={c.id} className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-auto"><VehicleCard car={c} /></div>)}
            </div>
          </div>
        </section>
      )}

      {/* ── TRAVELLER PHOTOS ────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Happy travellers"
            title="Real guests, real trips"
            intro="Photos shared by families and visitors who travelled with us."
            action={<a href={SITE.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-outline"><Star className="w-4 h-4" aria-hidden /> Google reviews</a>}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {TRAVELLER_PHOTOS.map((p, i) => (
              <Reveal key={i} delay={(i % 5) * 0.04} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full min-h-[160px] object-cover rounded-[18px]" />
              </Reveal>
            ))}
          </div>
          <GoogleReviewsStrip />
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-sand-200">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="How booking works" title="Three simple steps" />
          <ol className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Tell us your trip', d: 'Pickup, destination and date — online, on WhatsApp or by phone.' },
              { t: 'Get a confirmed fare', d: 'We call back with the right vehicle and the all-in fare for your route.' },
              { t: 'Travel stress-free', d: 'Your driver arrives on time and our desk stays reachable through the trip.' },
            ].map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="rounded-[22px] bg-sand-50 border border-sand-200 p-7">
                <span className="w-11 h-11 rounded-full bg-forest-700 text-white grid place-items-center font-bold">{i + 1}</span>
                <h3 className="h-display text-2xl text-ink-950 mt-5">{s.t}</h3>
                <p className="text-ink-600 mt-2">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <button type="button" onClick={() => openBooking()} className="btn btn-primary">Start booking <ArrowRight className="w-4 h-4" /></button>
            <a href={SITE.phoneHref} className="btn btn-outline"><PhoneCall className="w-4 h-4" /> {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Home;
