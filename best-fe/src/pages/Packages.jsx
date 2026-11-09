import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Compass } from 'lucide-react';
import Hero from '../assets/opt/kodaikanal.webp';
import { usePackages } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { PackageCard } from '../components/cards';
import { CtaBand, PageHero, Reveal, Skeleton } from '../components/ui';
import { DESTINATIONS } from '../data/site';
import { durationDays } from '../utils/format';

const DURATIONS = [
  { id: '', label: 'Any length' },
  { id: '1', label: '1 day' },
  { id: '2-3', label: '2–3 days' },
  { id: '4+', label: '4+ days' },
];

const Packages = () => {
  const { data: packages, loading, error } = usePackages();
  const { openBooking } = useBooking();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const dur = params.get('days') || '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return packages.filter((p) => {
      const hay = `${p.name} ${p.places || ''} ${p.location || ''}`.toLowerCase();
      if (needle && !hay.includes(needle)) return false;
      if (dur) {
        const d = durationDays(p.duration);
        if (d === null) return false;
        if (dur === '1' && d !== 1) return false;
        if (dur === '2-3' && (d < 2 || d > 3)) return false;
        if (dur === '4+' && d < 4) return false;
      }
      return true;
    });
  }, [packages, q, dur]);

  const chips = useMemo(
    () => DESTINATIONS.filter((d) => packages.some((p) => `${p.name} ${p.places || ''} ${p.location || ''}`.toLowerCase().includes(d.query.toLowerCase()))),
    [packages]
  );

  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Tour packages across Tamil Nadu & Kerala"
        intro="Temple circuits, hill-station escapes and coastal getaways — each one adjustable to your dates, group size and pace."
        image={Hero}
        pills={['Private AC vehicle', 'Local driver', 'Fully customisable']}
        crumbs={['Tour packages']}
      />

      {/* Filter rail */}
      <div className="sticky top-[68px] lg:top-[74px] z-30 bg-white/95 backdrop-blur border-b border-sand-200">
        <div className="container-x py-3 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative lg:w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
            <label htmlFor="pkg-search" className="sr-only">Search packages</label>
            <input id="pkg-search" type="search" value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search a place or temple" className="field !pl-9 !min-h-11" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-1 py-1" role="group" aria-label="Filter by destination">
            {chips.map((c) => {
              const active = q.toLowerCase() === c.query.toLowerCase();
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => update('q', active ? '' : c.query)}
                  aria-pressed={active}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-colors ${active ? 'bg-forest-700 text-white border-forest-700' : 'bg-white text-ink-700 border-sand-200 hover:border-forest-700'}`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
          <label htmlFor="pkg-days" className="sr-only">Trip length</label>
          <select id="pkg-days" value={dur} onChange={(e) => update('days', e.target.value)} className="field !min-h-11 lg:w-44">
            {DURATIONS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="container-x">
          {!loading && (
            <div className="flex flex-wrap items-center gap-4 mb-8" aria-live="polite">
              <p className="text-sm font-semibold text-ink-600">
                {filtered.length} {filtered.length === 1 ? 'package' : 'packages'}{q && <> · “{q}”</>}
              </p>
              {(q || dur) && (
                <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-semibold inline-flex items-center gap-1 text-forest-700 hover:underline cursor-pointer">
                  <X className="w-3.5 h-3.5" aria-hidden /> Clear filters
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[460px]" />)}</div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.05}><PackageCard pkg={p} index={i} /></Reveal>)}
            </div>
          ) : (
            <div className="card p-10 text-center max-w-xl mx-auto">
              <Compass className="w-10 h-10 mx-auto text-gold-500" aria-hidden />
              <h2 className="h-display text-3xl text-ink-950 mt-4">{error ? "Couldn't load packages right now" : 'No package for that yet'}</h2>
              <p className="text-ink-600 mt-3">We plan custom itineraries every day. Tell us where you'd like to go{q ? ` — ${q} included` : ''} and we'll build the trip around it.</p>
              <button type="button" onClick={() => openBooking({ toLocation: q })} className="btn btn-primary mt-6">Plan a custom trip</button>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Don't see your perfect trip?" text="Tell us the places, dates and group size — we'll put together a custom itinerary and a clear quote." />
    </>
  );
};

export default Packages;
