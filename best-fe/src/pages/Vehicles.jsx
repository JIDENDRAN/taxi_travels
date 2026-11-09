import { Users, Briefcase, Mountain, Plane, CarFront } from 'lucide-react';
import Hero from '../assets/opt/munnar.webp';
import { useCars } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { VehicleCard } from '../components/cards';
import { CtaBand, PageHero, Reveal, SectionHeading, Skeleton } from '../components/ui';

const GUIDE = [
  { icon: Users, size: '1–4', pick: 'Sedan', text: 'City rides, airport transfers and couples on short trips.' },
  { icon: Briefcase, size: '5–7', pick: 'SUV / Innova', text: 'Families with luggage, hill stations and long highway days.' },
  { icon: Mountain, size: '8+', pick: 'Tempo Traveller', text: 'Pilgrim groups, weddings and multi-family tours.' },
];

const Vehicles = () => {
  const { data: cars, loading, error } = useCars();
  const { openBooking } = useBooking();

  return (
    <>
      <PageHero
        eyebrow="The fleet"
        title="Pick your ride. Read the tariff."
        intro="Every vehicle is air-conditioned, cleaned before each trip and driven by a chauffeur who knows South India's roads. Rates are shown up front."
        image={Hero}
        crumbs={['Fleet']}
      />

      {/* Size guide strip */}
      <section className="bg-ink-900 text-sand-50 border-b-2 border-ink-900">
        <div className="container-x grid md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-sand-50/15">
          {GUIDE.map((g) => (
            <div key={g.pick} className="py-7 md:px-7 first:md:pl-0 flex gap-5 items-start">
              <span className="h-display text-5xl text-gold-400 leading-none w-20 shrink-0">{g.size}</span>
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-300 flex items-center gap-1.5"><g.icon className="w-3.5 h-3.5" aria-hidden /> travellers</p>
                <h3 className="h-display text-2xl mt-1">{g.pick}</h3>
                <p className="text-sm text-ink-200 mt-1">{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading index="01" eyebrow="Available vehicles" title="The full line-up" intro="Not sure which fits? Choose “Suggest the best vehicle” when booking and we'll recommend one for your group." />
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[520px]" />)}</div>
          ) : cars.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 0.05}><VehicleCard car={c} /></Reveal>)}
            </div>
          ) : (
            <div className="card p-10 text-center max-w-xl mx-auto">
              <CarFront className="w-10 h-10 mx-auto" aria-hidden />
              <h2 className="h-display text-3xl text-ink-950 mt-4">{error ? "Couldn't load the fleet right now" : 'Fleet list coming soon'}</h2>
              <p className="text-ink-600 mt-3">Sedans, SUVs and Tempo Travellers are available — tell us your group size and we'll assign the right vehicle.</p>
              <button type="button" onClick={() => openBooking()} className="btn btn-primary mt-6">Request a vehicle</button>
            </div>
          )}
          <p className="mt-12 mono text-xs font-bold uppercase tracking-[0.1em] text-ink-700 flex items-center gap-2">
            <Plane className="w-4 h-4" aria-hidden /> Madurai Airport (IXM) pickups available around the clock
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Vehicles;
