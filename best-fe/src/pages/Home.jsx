import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, MapPin, Calendar, Clock, Search, ShieldCheck, Headphones,
  Sparkles, ReceiptText, Route, Star, CarFront, PhoneCall, CheckCircle2,
} from 'lucide-react';
import HeroImg from '../assets/opt/hero-south-india.webp';
import RoadImg from '../assets/opt/rameswaram-wide.webp';
import { DESTINATIONS, POPULAR_ROUTES, SERVICE_PILLARS, SITE, TRAVELLER_PHOTOS, TRIP_TYPES } from '../data/site';
import { useBooking } from '../context/BookingContext';
import { useCars, usePackages } from '../hooks/useCatalog';
import { fetchGoogleReviews } from '../utils/googleReviewsService';
import { PackageCard, VehicleCard } from '../components/cards';
import { CtaBand, Reveal, SectionHeading, Skeleton } from '../components/ui';

const PILLAR_ICONS = { clock: Headphones, steering: ShieldCheck, sparkle: Sparkles, receipt: ReceiptText };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/* ── Hero search widget ─────────────────────────────────────── */
function TripSearch() {
  const { openBooking } = useBooking();
  const [q, setQ] = useState({ tripType: 'oneway', fromLocation: 'Madurai', toLocation: '', date: '', time: '' });
  const set = (k) => (e) => setQ((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    openBooking(q);
  };

  const fieldWrap = 'relative flex-1 min-w-0 px-4 py-3 lg:py-2.5 border-b lg:border-b-0 lg:border-r border-sand-200 last:border-0';
  const lbl = 'block text-[11px] font-bold uppercase tracking-wider text-ink-500';
  const inp = 'w-full bg-transparent text-[0.95rem] font-semibold text-ink-900 placeholder:text-ink-400 placeholder:font-medium outline-none mt-0.5';

  return (
    <form onSubmit={submit} className="bg-white rounded-[18px] shadow-[var(--shadow-panel)] p-2 sm:p-3" aria-label="Plan your trip">
      <div className="flex gap-1 p-1 overflow-x-auto no-scrollbar" role="radiogroup" aria-label="Trip type">
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={q.tripType === t.id}
            onClick={() => setQ((s) => ({ ...s, tripType: t.id, toLocation: t.id === 'airport' && !s.toLocation ? 'Madurai Airport (IXM)' : s.toLocation }))}
            className={`shrink-0 px-4 py-2 rounded-[10px] text-sm font-bold transition-colors cursor-pointer ${q.tripType === t.id ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-sand-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-col lg:flex-row lg:items-stretch rounded-[12px] border border-sand-200 lg:border-0 lg:bg-sand-50">
        <div className={fieldWrap}>
          <label htmlFor="ts-from" className={lbl}><MapPin className="inline w-3 h-3 mr-1 -mt-0.5 text-gold-600" aria-hidden />Pickup</label>
          <input id="ts-from" className={inp} value={q.fromLocation} onChange={set('fromLocation')} placeholder="City, hotel or station" autoComplete="off" />
        </div>
        <div className={fieldWrap}>
          <label htmlFor="ts-to" className={lbl}><MapPin className="inline w-3 h-3 mr-1 -mt-0.5 text-gold-600" aria-hidden />{q.tripType === 'local' ? 'Places to visit' : 'Destination'}</label>
          <input id="ts-to" className={inp} value={q.toLocation} onChange={set('toLocation')} placeholder="e.g. Rameswaram" autoComplete="off" />
        </div>
        <div className="grid grid-cols-2 lg:contents">
          <div className={`${fieldWrap} border-r lg:border-r`}>
            <label htmlFor="ts-date" className={lbl}><Calendar className="inline w-3 h-3 mr-1 -mt-0.5 text-gold-600" aria-hidden />Date</label>
            <input id="ts-date" type="date" min={todayISO()} className={inp} value={q.date} onChange={set('date')} />
          </div>
          <div className={fieldWrap}>
            <label htmlFor="ts-time" className={lbl}><Clock className="inline w-3 h-3 mr-1 -mt-0.5 text-gold-600" aria-hidden />Time</label>
            <input id="ts-time" type="time" className={inp} value={q.time} onChange={set('time')} />
          </div>
        </div>
        <div className="p-2 lg:p-1.5">
          <button type="submit" className="btn btn-primary w-full h-full lg:!px-6 !min-h-12">
            <Search className="w-4 h-4" aria-hidden /> Check availability
          </button>
        </div>
      </div>
    </form>
  );
}

/* ── Google reviews (only real data from the API is ever shown) ─ */
function GoogleReviewsStrip() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchGoogleReviews().then((d) => alive && d?.success && d.reviews?.length && setData(d));
    return () => { alive = false; };
  }, []);
  if (!data) return null;

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="font-display text-3xl font-semibold text-ink-900">{Number(data.rating).toFixed(1)}</span>
        <span className="flex text-gold-500" aria-label={`${data.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden />)}
        </span>
        <span className="text-sm text-ink-600">{data.userRatingCount} Google reviews</span>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {data.reviews.slice(0, 3).map((r, i) => (
          <figure key={i} className="card p-6 flex flex-col">
            <div className="flex text-gold-500 mb-3" aria-label={`${r.rating} out of 5`}>
              {Array.from({ length: r.rating || 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" aria-hidden />)}
            </div>
            <blockquote className="text-ink-700 text-[0.95rem] leading-relaxed line-clamp-6 flex-1">“{r.text}”</blockquote>
            <figcaption className="mt-4 pt-4 border-t border-sand-200 text-sm">
              <span className="font-bold text-ink-900">{r.authorName}</span>
              {r.relativeTime && <span className="text-ink-500"> · {r.relativeTime}</span>}
            </figcaption>
          </figure>
        ))}
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
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate bg-ink-950 text-white">
        <img
          src={HeroImg}
          alt="A highway winding past a South Indian temple gopuram and green hills at sunset"
          className="absolute inset-0 -z-10 w-full h-full object-cover object-[50%_60%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/70 via-ink-950/35 to-ink-950/85" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/70 to-transparent" />

        <div className="container-x pt-32 sm:pt-40 lg:pt-44 pb-10 lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow !text-gold-300">Madurai · Since {SITE.since} · Open 24/7</p>
            <h1 className="h-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl mt-4">
              South India, <em className="not-italic text-gold-300">driven</em> with care.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-ink-100 max-w-2xl">
              Private cabs, airport transfers and temple-to-hill-station tours from Madurai — with local drivers and a fare agreed before you set off.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-100">
              {['Nothing to pay online', 'Sedans to Tempo Travellers', 'Tamil Nadu & Kerala'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold-400" aria-hidden />{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 lg:mt-14 text-ink-900"
          >
            <TripSearch />
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where we drive"
            title="Destinations our guests love"
            intro="From Madurai's temple city to misty hill stations and Kerala's backwaters — every trip starts at your doorstep."
            action={<Link to="/packages" className="btn btn-outline">All tour packages <ArrowRight className="w-4 h-4" /></Link>}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:auto-rows-[220px]">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 0.05} className={i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'lg:row-span-2' : i === DESTINATIONS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}>
                <Link
                  to={`/packages?q=${encodeURIComponent(d.query)}`}
                  className="group relative block h-full min-h-[200px] sm:min-h-[240px] overflow-hidden rounded-[14px] bg-ink-900"
                >
                  <img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">{d.region}</p>
                      <h3 className={`font-display font-semibold leading-tight ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{d.name}</h3>
                      <p className={`text-sm text-ink-100 mt-1 ${i === 0 ? 'block' : 'hidden sm:block'} line-clamp-1`}>{d.note}</p>
                    </div>
                    <span className="hidden sm:grid w-10 h-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur group-hover:bg-gold-500 group-hover:text-ink-950 transition-colors">
                      <ArrowUpRight className="w-4 h-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES (live from the catalogue) ──────── */}
      {(pkgLoading || packages.length > 0) && (
        <section className="py-20 sm:py-24 bg-white border-y border-sand-200">
          <div className="container-x">
            <SectionHeading
              eyebrow="Tour packages"
              title="Ready-made itineraries, tailored to you"
              intro="Pick a package as a starting point — we'll adjust the days, stops and vehicle to suit your group."
              action={<Link to="/packages" className="btn btn-outline">Browse all <ArrowRight className="w-4 h-4" /></Link>}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pkgLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[420px]" />)
                : packages.slice(0, 6).map((p, i) => (
                    <Reveal key={p.id} delay={(i % 3) * 0.06}><PackageCard pkg={p} /></Reveal>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY US ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[18px] overflow-hidden">
              <img src={RoadImg} alt="The Pamban sea bridge leading to Rameswaram at sunset" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:-right-6 sm:w-72 card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Our promise</p>
              <p className="font-display text-lg text-ink-900 mt-1.5 leading-snug">The fare we quote on the phone is the fare you pay.</p>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              className="!mb-8"
              eyebrow="Why travel with us"
              title="A local operator, not a booking app"
              intro={`We've been driving families, pilgrims and business travellers out of Palanganatham, Madurai since ${SITE.since}. You deal directly with us — from the first call to the drop-off.`}
            />
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {SERVICE_PILLARS.map((p, i) => {
                const Icon = PILLAR_ICONS[p.icon];
                return (
                  <Reveal key={p.title} delay={i * 0.05} className="flex gap-4">
                    <span className="w-11 h-11 shrink-0 rounded-[12px] bg-gold-100 text-gold-700 grid place-items-center">
                      <Icon className="w-5 h-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold text-ink-900">{p.title}</h3>
                      <p className="text-sm text-ink-600 mt-1">{p.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLEET ────────────────────────────────────────────── */}
      {(carsLoading || cars.length > 0) && (
        <section className="py-20 sm:py-24 bg-white border-y border-sand-200">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our fleet"
              title="The right vehicle for every group"
              intro="Air-conditioned sedans for couples, SUVs for families and Tempo Travellers for larger groups."
              action={<Link to="/vehicles" className="btn btn-outline">See the full fleet <ArrowRight className="w-4 h-4" /></Link>}
            />
            <div className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-2">
              {carsLoading
                ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[380px] min-w-[78%] sm:min-w-[45%] lg:min-w-0" />)
                : cars.slice(0, 4).map((c) => (
                    <div key={c.id} className="snap-start shrink-0 w-[78%] sm:w-[45%] lg:w-auto"><VehicleCard car={c} /></div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── POPULAR ROUTES ───────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Popular services" title="Most-booked routes from Madurai" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-200 rounded-[14px] overflow-hidden border border-sand-200">
            {POPULAR_ROUTES.map((r) => (
              <Link key={r.path} to={r.path} className="group bg-white p-6 flex items-center gap-4 hover:bg-sand-50 transition-colors">
                <span className="w-11 h-11 shrink-0 rounded-full bg-ink-50 text-ink-700 grid place-items-center group-hover:bg-ink-900 group-hover:text-gold-300 transition-colors">
                  {r.path.includes('tempo') ? <CarFront className="w-5 h-5" aria-hidden /> : <Route className="w-5 h-5" aria-hidden />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-ink-900">{r.label}</span>
                  <span className="block text-sm text-ink-500">{r.detail}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAVELLER MOMENTS (real customer photos) ─────────── */}
      <section className="py-20 sm:py-24 bg-ink-900 text-white overflow-hidden">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="On the road with our guests"
            title="Real trips, real travellers"
            intro="Photos shared by families, pilgrims and visitors we've driven across South India."
            action={
              <a href={SITE.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
                <Star className="w-4 h-4" aria-hidden /> Read our Google reviews
              </a>
            }
          />
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar px-4 sm:px-6 lg:px-[max(2rem,calc((100vw_-_1240px)/2_+_2rem))] pb-2">
          {TRAVELLER_PHOTOS.map((p, i) => (
            <figure key={i} className={`snap-start shrink-0 overflow-hidden rounded-[14px] bg-ink-800 ${i % 3 === 0 ? 'w-[78vw] sm:w-[420px]' : 'w-[62vw] sm:w-[300px]'} h-[300px] sm:h-[340px]`}>
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
          ))}
        </div>
        <div className="container-x">
          <div className="[&_.card]:bg-ink-800 [&_.card]:border-white/10 [&_blockquote]:text-ink-100 [&_figcaption_span:first-child]:text-white [&_figcaption]:border-white/10 [&_.font-display]:text-white [&_.text-ink-600]:text-ink-300">
            <GoogleReviewsStrip />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="How booking works" title="Three steps. No surprises." />
          <ol className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {[
              { t: 'Tell us your trip', d: 'Share pickup, destination and date online, on WhatsApp or by phone.' },
              { t: 'Get a confirmed quote', d: 'We call back with the right vehicle and the all-in fare for your route.' },
              { t: 'Travel stress-free', d: 'Your driver arrives on time and our desk stays reachable through the trip.' },
            ].map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="relative">
                <span className="font-display text-6xl font-semibold text-gold-300/70 leading-none">0{i + 1}</span>
                <h3 className="font-bold text-lg text-ink-900 mt-3">{s.t}</h3>
                <p className="text-ink-600 mt-1.5">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
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
