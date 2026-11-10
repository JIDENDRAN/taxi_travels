import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Car, Plane, Clock, Map, Headphones, ShieldCheck, Sparkles,
  ReceiptText, Star, PhoneCall, Route, CarFront, CheckCircle2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import HeroImg from '../assets/opt/madurai-aerial.webp';
import { DESTINATIONS, POPULAR_ROUTES, SERVICE_PILLARS, SITE } from '../data/site';
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
    <form onSubmit={submit} className="relative bg-white rounded-[16px] shadow-[var(--shadow-panel)] pb-10" aria-label="Book a cab">
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
            <span className="w-8 h-8 rounded-[8px] grid place-items-center bg-forest-50 text-forest-700"><Icon className="w-4 h-4" aria-hidden /></span>
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
        <button type="submit" className="btn btn-primary !rounded-full !min-h-14 !px-16 !text-lg !font-extrabold uppercase tracking-wide !bg-gradient-to-r from-gold-500 to-gold-400 shadow-[0_14px_30px_-10px_rgb(255_122_26/0.8)]">
          Search cabs
        </button>
      </div>
    </form>
  );
}

/* ── Customer reviews data and grid ── */
const FEATURED_REVIEWS = [
  {
    name: 'Rajesh Kannan & Family',
    location: 'Coimbatore',
    text: 'Perfect family tour to Rameswaram & Madurai! Exceptionally clean vehicle & safe driving. Driver arrived 10 mins early and was very courteous throughout.',
    rating: 5,
    tag: 'Madurai to Rameswaram',
  },
  {
    name: 'Abhishek & Family',
    location: 'Bangalore',
    text: 'Amazing 5-day South India trip! Punctual driver, great routes, and super comfortable ride in Innova Crysta. Zero hidden charges or surge pricing.',
    rating: 5,
    tag: '5-Day South India Tour',
  },
  {
    name: 'Sunita Deshmukh',
    location: 'Pune',
    text: 'Super comfortable Innova Crysta. As solo women travelers, we felt extremely safe and well cared for. Chauffeur knew all ghat roads and safe halt points.',
    rating: 5,
    tag: 'Madurai to Kodaikanal',
  },
  {
    name: 'Dr. Sandeep Sen & Group',
    location: 'Kolkata',
    text: 'Excellent service! Large vehicle accommodated all our luggage easily, and friendly driver guided us through Madurai Meenakshi temple darshan smoothly.',
    rating: 5,
    tag: 'Madurai Temple Circuit',
  },
  {
    name: 'Aarthi & Friends',
    location: 'Chennai',
    text: 'Perfect sunset tour to Dhanushkodi! Safe driving, polite chauffeur, and clean AC car. Transparent per-km billing exactly as committed.',
    rating: 5,
    tag: 'Rameswaram & Dhanushkodi',
  },
  {
    name: 'Rakesh Balakrishnan',
    location: 'Bangalore',
    text: 'Punctual airport pickup at IXM and smooth drop to Munnar hills. Chauffeur had ghat section certification and drove very gently. Highly recommended!',
    rating: 5,
    tag: 'Madurai to Munnar',
  },
];

function ReviewsGrid() {
  const [reviews, setReviews] = useState(FEATURED_REVIEWS);

  useEffect(() => {
    let alive = true;
    fetchGoogleReviews().then((d) => {
      if (alive && d?.success && d.reviews?.length > 0) {
        const live = d.reviews.map((r) => ({
          name: r.authorName,
          location: r.relativeTime || 'Google Reviewer',
          text: r.text,
          rating: r.rating || 5,
          tag: 'Google Verified',
        }));
        setReviews([...live, ...FEATURED_REVIEWS].slice(0, 6));
      }
    });
    return () => { alive = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((r, i) => (
        <Reveal key={r.name + i} delay={(i % 3) * 0.08}>
          <div className="card p-6 sm:p-7 flex flex-col justify-between h-full bg-white border border-sand-200 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex text-amber-500" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                {r.tag && (
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sand-100 text-ink-700 border border-sand-200">
                    {r.tag}
                  </span>
                )}
              </div>
              <p className="text-ink-700 leading-relaxed text-sm sm:text-base italic">
                “{r.text}”
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-sand-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-ink-950 text-sm">{r.name}</div>
                <div className="text-xs text-ink-500">{r.location}</div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Auto-scroll horizontal row for side-by-side items ───────── */
function AutoScrollRow({ children, cardWidth = 340, intervalMs = 2000 }) {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (isPaused) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, cardWidth, intervalMs]);

  const scroll = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  return (
    <div
      className="relative group -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <button
        type="button"
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-sand-300 text-ink-900 shadow-md items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-forest-700 hover:text-white transition-all cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-sand-300 text-ink-900 shadow-md items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-forest-700 hover:text-white transition-all cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={containerRef}
        className="flex flex-nowrap gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
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
          <div className="max-w-5xl anim-fade-up">
                        <h1 className="h-display text-[2.3rem] sm:text-5xl lg:text-[3.4rem]">
              Book Outstation Cabs &amp;<br className="hidden sm:block" /> <em className="text-gold-300">South India Tours</em> from Madurai
            </h1>
            <p className="mt-5 text-lg text-forest-100">Transparent per-km fares · AC Sedans, SUVs &amp; Tempo Travellers · 24/7 support</p>
            <div className="flex flex-wrap gap-2 mt-7">
              <TrustPill>No online payment</TrustPill>
              <TrustPill>Fare confirmed on call</TrustPill>
              <TrustPill>Since {SITE.since}</TrustPill>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING PORTAL ──────────────────────────────────── */}
      <div className="container-x relative z-10 -mt-36 sm:-mt-32">
        <div className="anim-fade-up anim-delay-1">
          <BookingPortal />
        </div>
      </div>

      {/* ── POPULAR PACKAGES ────────────────────────────────── */}
      {(pkgLoading || packages.length > 0) && (
        <section className="pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="container-x">
            <SectionHeading title="Popular Tour Packages" action={<ArrowLink to="/packages">View all packages</ArrowLink>} />
            <AutoScrollRow cardWidth={320}>
              {pkgLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]">
                      <Skeleton className="h-[280px] w-full rounded-[18px]" />
                    </div>
                  ))
                : packages.map((p) => (
                    <div key={p.id} className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]">
                      <PackageCard pkg={p} />
                    </div>
                  ))}
            </AutoScrollRow>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-7 text-sm font-semibold text-ink-600">
              <span><b className="text-ink-900">24/7</b> booking desk</span>
              <span><b className="text-ink-900">Local</b> Madurai drivers</span>
              <span><b className="text-ink-900">Clear</b> per-km tariffs</span>
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
                      <span className="block font-semibold text-lg text-ink-950 truncate">{d.name}</span>
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
            <AutoScrollRow cardWidth={360}>
              {carsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="snap-start shrink-0 w-[290px] sm:w-[340px] lg:w-[360px]">
                      <Skeleton className="h-[480px] w-full rounded-[18px]" />
                    </div>
                  ))
                : cars.map((c) => (
                    <div key={c.id} className="snap-start shrink-0 w-[290px] sm:w-[340px] lg:w-[360px]">
                      <VehicleCard car={c} />
                    </div>
                  ))}
            </AutoScrollRow>
          </div>
        </section>
      )}

      {/* ── CUSTOMER REVIEWS ────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-sand-100/50 border-t border-sand-200">
        <div className="container-x">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Loved by travellers across South India"
            intro="Real feedback from families, pilgrims, and tourists who travelled with Madurai Best Taxi Travels."
            action={
              <a
                href={SITE.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden />
                <span>5.0 on Google (250+ reviews)</span>
              </a>
            }
          />
          <ReviewsGrid />
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
