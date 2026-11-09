import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, MapPin, Calendar, Clock, Search, Headphones, ShieldCheck,
  Sparkles, ReceiptText, Star, PhoneCall,
} from 'lucide-react';
import HeroImg from '../assets/opt/hero-south-india.webp';
import Polaroid from '../assets/opt/traveller-17.webp';
import { DESTINATIONS, POPULAR_ROUTES, SERVICE_PILLARS, SITE, TRAVELLER_PHOTOS, TRIP_TYPES } from '../data/site';
import { useBooking } from '../context/BookingContext';
import { useCars, usePackages } from '../hooks/useCatalog';
import { fetchGoogleReviews } from '../utils/googleReviewsService';
import { PackageCard, VehicleCard } from '../components/cards';
import { ArrowLink, CtaBand, Marquee, Reveal, SectionHeading, Skeleton } from '../components/ui';

const PILLAR_ICONS = { clock: Headphones, steering: ShieldCheck, sparkle: Sparkles, receipt: ReceiptText };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/* ── Hero search, styled as a ride ticket ─────────────────────── */
function TripSearch() {
  const { openBooking } = useBooking();
  const [q, setQ] = useState({ tripType: 'oneway', fromLocation: 'Madurai', toLocation: '', date: '', time: '' });
  const set = (k) => (e) => setQ((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    openBooking(q);
  };

  const cell = 'px-4 py-3 border-ink-900';
  const lbl = 'mono flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500';
  const inp = 'w-full bg-transparent text-base font-bold text-ink-950 placeholder:text-ink-300 placeholder:font-medium outline-none mt-1';

  return (
    <form onSubmit={submit} className="bg-white border-2 border-ink-900 rounded-[8px] shadow-[8px_8px_0_0_var(--color-ink-900)]" aria-label="Plan your trip">
      <div className="flex items-center justify-between gap-3 bg-ink-900 text-gold-400 px-4 py-2.5 rounded-t-[5px]">
        <span className="mono text-[11px] font-bold uppercase tracking-[0.16em]">Ride request</span>
        <span className="mono text-[11px] font-bold uppercase tracking-[0.16em] text-sand-100">No online payment</span>
      </div>
      <div className="flex gap-1.5 p-2 overflow-x-auto no-scrollbar border-b-2 border-ink-900" role="radiogroup" aria-label="Trip type">
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={q.tripType === t.id}
            onClick={() => setQ((s) => ({ ...s, tripType: t.id, toLocation: t.id === 'airport' && !s.toLocation ? 'Madurai Airport (IXM)' : s.toLocation }))}
            className={`shrink-0 px-3.5 py-1.5 rounded-[4px] border-2 text-sm font-bold cursor-pointer transition-colors ${q.tripType === t.id ? 'bg-gold-500 border-ink-900 text-ink-950' : 'border-transparent text-ink-600 hover:border-ink-900'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2">
        <div className={`${cell} border-b-2 sm:border-r-2`}>
          <label htmlFor="ts-from" className={lbl}><MapPin className="w-3 h-3" aria-hidden />From</label>
          <input id="ts-from" className={inp} value={q.fromLocation} onChange={set('fromLocation')} placeholder="City, hotel or station" autoComplete="off" />
        </div>
        <div className={`${cell} border-b-2`}>
          <label htmlFor="ts-to" className={lbl}><MapPin className="w-3 h-3" aria-hidden />{q.tripType === 'local' ? 'Places to visit' : 'To'}</label>
          <input id="ts-to" className={inp} value={q.toLocation} onChange={set('toLocation')} placeholder="e.g. Rameswaram" autoComplete="off" />
        </div>
        <div className={`${cell} border-b-2 sm:border-b-0 border-r-2`}>
          <label htmlFor="ts-date" className={lbl}><Calendar className="w-3 h-3" aria-hidden />Date</label>
          <input id="ts-date" type="date" min={todayISO()} className={inp} value={q.date} onChange={set('date')} />
        </div>
        <div className={`${cell} border-b-2 sm:border-b-0`}>
          <label htmlFor="ts-time" className={lbl}><Clock className="w-3 h-3" aria-hidden />Pickup time</label>
          <input id="ts-time" type="time" className={inp} value={q.time} onChange={set('time')} />
        </div>
      </div>
      <div className="ticket-perf p-3 bg-sand-50 rounded-b-[6px]">
        <button type="submit" className="btn btn-primary w-full !min-h-13 !text-base">
          <Search className="w-5 h-5" aria-hidden /> Check availability
        </button>
      </div>
    </form>
  );
}

/* ── Live Google reviews (shown only when the API returns real ones) ── */
function GoogleReviewsStrip() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchGoogleReviews().then((d) => alive && d?.success && d.reviews?.length && setData(d));
    return () => { alive = false; };
  }, []);
  if (!data) return null;

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="h-display text-5xl text-ink-950">{Number(data.rating).toFixed(1)}</span>
        <span className="flex" aria-label={`${data.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-gold-500 text-ink-900" aria-hidden />)}
        </span>
        <span className="mono text-xs font-bold uppercase tracking-[0.1em] text-ink-600">{data.userRatingCount} Google reviews</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {data.reviews.slice(0, 3).map((r, i) => (
          <figure key={i} className="card p-6 flex flex-col">
            <blockquote className="text-ink-800 leading-relaxed line-clamp-6 flex-1">“{r.text}”</blockquote>
            <figcaption className="mt-5 pt-4 border-t-2 border-dashed border-ink-900 mono text-xs font-bold uppercase tracking-[0.08em]">
              {r.authorName}{r.relativeTime && <span className="text-ink-500"> · {r.relativeTime}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-2', 'rotate-1', 'rotate-2'];

const Home = () => {
  const { openBooking } = useBooking();
  const { data: packages, loading: pkgLoading } = usePackages();
  const { data: cars, loading: carsLoading } = useCars();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-ink-900">
        <div className="container-x grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-20 items-start">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Madurai · since {SITE.since} · open 24/7</motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
              className="h-display text-[3.4rem] sm:text-7xl xl:text-[6.2rem] text-ink-950 mt-5"
            >
              Temples,<br />
              hills &amp;{' '}
              <span className="relative inline-block isolate">
                <span className="absolute inset-x-[-0.1em] bottom-[0.08em] top-[0.45em] bg-gold-500 -z-10 -rotate-1" aria-hidden />
                highways.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 text-lg sm:text-xl text-ink-600 max-w-xl">
              Madurai's local taxi &amp; tour operator. Airport pickups, outstation cabs and South India tours — with drivers who know the road and a fare agreed before you leave.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="mt-9">
              <TripSearch />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
            className="relative lg:mt-6"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-gold-500 border-2 border-ink-900 rounded-[8px]" aria-hidden />
            <div className="relative border-2 border-ink-900 rounded-[8px] overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] bg-ink-900">
              <img src={HeroImg} alt="A highway winding past a South Indian temple gopuram and green hills at sunset" className="w-full h-full object-cover" fetchPriority="high" />
            </div>

            {/* Meter card */}
            <div className="absolute left-3 sm:-left-8 top-4 sm:top-6 bg-ink-900 text-gold-400 border-2 border-ink-900 rounded-[6px] px-4 py-3 shadow-[4px_4px_0_0_var(--color-gold-500)]">
              <p className="mono text-[10px] font-bold tracking-[0.16em] text-sand-100">BOOKING DESK</p>
              <p className="mono text-2xl font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 animate-[blink_1.4s_ease-in-out_infinite]" aria-hidden />
                OPEN 24/7
              </p>
            </div>

            {/* Real traveller polaroid */}
            <figure className="absolute -bottom-8 -left-2 sm:left-auto sm:-right-6 w-40 sm:w-48 bg-white border-2 border-ink-900 p-2 pb-3 rotate-3 shadow-[4px_4px_0_0_var(--color-ink-900)]">
              <img src={Polaroid} alt="Our driver with a guest at Madurai Airport" className="w-full aspect-square object-cover border-2 border-ink-900" />
              <figcaption className="mono text-[10px] font-bold uppercase tracking-[0.1em] text-center mt-2">IXM airport pickup</figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      <Marquee items={DESTINATIONS.map((d) => d.name)} />

      {/* ── 01 DESTINATIONS ─────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            index="01"
            eyebrow="Destinations"
            title="Where shall we drive you?"
            intro="Temple towns, hill stations and backwaters across Tamil Nadu and Kerala — every trip begins at your doorstep in Madurai."
            action={<ArrowLink to="/packages">All tour packages</ArrowLink>}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 0.05}>
                <Link to={`/packages?q=${encodeURIComponent(d.query)}`} className={`group block bg-white border-2 border-ink-900 p-2 pb-4 rounded-[4px] shadow-[4px_4px_0_0_var(--color-ink-900)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${ROTATIONS[i]}`}>
                  <span className="block aspect-[4/5] overflow-hidden border-2 border-ink-900 bg-sand-100">
                    <img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" className="img-zoom w-full h-full object-cover" />
                  </span>
                  <span className="flex items-end justify-between gap-2 mt-3 px-1">
                    <span className="min-w-0">
                      <span className="mono block text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">{d.region}</span>
                      <span className="h-display block text-xl sm:text-2xl text-ink-950 truncate">{d.name}</span>
                    </span>
                    <span className="w-8 h-8 shrink-0 grid place-items-center border-2 border-ink-900 rounded-[4px] bg-gold-500 group-hover:bg-ink-900 group-hover:text-gold-400 transition-colors">
                      <ArrowUpRight className="w-4 h-4" aria-hidden />
                    </span>
                  </span>
                  <span className="hidden sm:block text-sm text-ink-600 mt-1 px-1 line-clamp-1">{d.note}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 DEPARTURE BOARD (routes) ─────────────────────── */}
      <section className="bg-ink-900 text-sand-50 py-20 sm:py-24 border-y-2 border-ink-900">
        <div className="container-x">
          <SectionHeading light index="02" eyebrow="Departures" title="Most-booked routes from Madurai" />
          <div className="border-2 border-sand-50/20 rounded-[6px] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.4fr_1.3fr_0.8fr_auto] gap-4 px-5 py-3 bg-ink-800 mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300">
              <span>Route</span><span>Details</span><span>Status</span><span className="w-8" />
            </div>
            {POPULAR_ROUTES.map((r, i) => (
              <Link
                key={r.path}
                to={r.path}
                className="group grid md:grid-cols-[1.4fr_1.3fr_0.8fr_auto] gap-1 md:gap-4 items-center px-5 py-4 border-t-2 border-sand-50/10 hover:bg-gold-500 transition-colors"
              >
                <span className="board-cell text-lg sm:text-xl group-hover:text-ink-950">
                  <span className="text-ink-400 group-hover:text-ink-700 mr-3 text-sm">{String(i + 1).padStart(2, '0')}</span>
                  {r.label}
                </span>
                <span className="mono text-sm text-ink-200 group-hover:text-ink-900 uppercase">{r.detail}</span>
                <span className="mono text-xs font-bold uppercase tracking-[0.1em] text-leaf-500 group-hover:text-ink-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current" aria-hidden /> Bookable
                </span>
                <ArrowRight className="hidden md:block w-5 h-5 text-gold-400 group-hover:text-ink-950 group-hover:translate-x-1 transition-transform" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 TOUR PACKAGES (live catalogue) ───────────────── */}
      {(pkgLoading || packages.length > 0) && (
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading
              index="03"
              eyebrow="Tour packages"
              title="Pick a ticket. We'll tailor the trip."
              intro="Each package is a starting point — days, stops and vehicle are adjusted to your group."
              action={<ArrowLink to="/packages">Browse all packages</ArrowLink>}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pkgLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[460px]" />)
                : packages.slice(0, 6).map((p, i) => (
                    <Reveal key={p.id} delay={(i % 3) * 0.06}><PackageCard pkg={p} index={i} /></Reveal>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 04 WHY US (yellow band) ─────────────────────────── */}
      <section className="bg-gold-500 border-y-2 border-ink-900 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            index="04"
            eyebrow="Why ride with us"
            title="A local operator, not an app."
            intro={`You deal directly with our team in Palanganatham, Madurai — from the first call to the drop-off. We've been doing it since ${SITE.since}.`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-ink-900 border-2 border-ink-900 rounded-[6px] overflow-hidden">
            {SERVICE_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[p.icon];
              return (
                <Reveal key={p.title} delay={i * 0.06} className="p-6 lg:p-7 bg-sand-50">
                  <span className="w-12 h-12 grid place-items-center bg-ink-900 text-gold-400 rounded-[6px]">
                    <Icon className="w-6 h-6" aria-hidden />
                  </span>
                  <h3 className="h-display text-2xl text-ink-950 mt-5">{p.title}</h3>
                  <p className="text-ink-700 mt-2">{p.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05 FLEET ────────────────────────────────────────── */}
      {(carsLoading || cars.length > 0) && (
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading
              index="05"
              eyebrow="The fleet"
              title="Sedans to Tempo Travellers."
              intro="Clean, air-conditioned vehicles with transparent per-km and day-rental tariffs."
              action={<ArrowLink to="/vehicles">See every vehicle</ArrowLink>}
            />
            <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-3 pr-6">
              {carsLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[520px] min-w-[82%] sm:min-w-[46%] lg:min-w-0" />)
                : cars.slice(0, 3).map((c) => (
                    <div key={c.id} className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-auto"><VehicleCard car={c} /></div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 06 TRAVELLER WALL ───────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-sand-100 border-y-2 border-ink-900 overflow-hidden">
        <div className="container-x">
          <SectionHeading
            index="06"
            eyebrow="Traveller wall"
            title="Real guests. Real trips."
            intro="Photos our guests shared after riding with us across South India."
            action={
              <a href={SITE.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Star className="w-4 h-4" aria-hidden /> Read Google reviews
              </a>
            }
          />
          <div className="columns-2 md:columns-3 lg:columns-5 gap-4 sm:gap-6 [&>*]:mb-6">
            {TRAVELLER_PHOTOS.map((p, i) => (
              <Reveal key={i} delay={(i % 5) * 0.04} className="break-inside-avoid">
                <figure className={`bg-white border-2 border-ink-900 p-2 pb-2.5 shadow-[4px_4px_0_0_var(--color-ink-900)] ${ROTATIONS[i % ROTATIONS.length]} hover:rotate-0 transition-transform`}>
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-auto border-2 border-ink-900" />
                </figure>
              </Reveal>
            ))}
          </div>
          <GoogleReviewsStrip />
        </div>
      </section>

      {/* ── 07 HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading index="07" eyebrow="How booking works" title="Three stops. No surprises." />
          <ol className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Tell us the trip', d: 'Pickup, destination and date — online, on WhatsApp or by phone.' },
              { t: 'Get a confirmed fare', d: 'We call back with the right vehicle and the all-in fare for your route.' },
              { t: 'Ride stress-free', d: 'Your driver arrives on time and our desk stays reachable through the trip.' },
            ].map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="card p-7 relative">
                <span className="mono absolute -top-4 left-6 bg-gold-500 border-2 border-ink-900 rounded-[4px] px-2.5 py-0.5 text-sm font-bold">STOP {i + 1}</span>
                <h3 className="h-display text-3xl text-ink-950 mt-3">{s.t}</h3>
                <p className="text-ink-600 mt-3">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <button type="button" onClick={() => openBooking()} className="btn btn-primary !min-h-13">Start booking <ArrowRight className="w-4 h-4" /></button>
            <a href={SITE.phoneHref} className="btn btn-outline !min-h-13"><PhoneCall className="w-4 h-4" /> {SITE.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Home;
