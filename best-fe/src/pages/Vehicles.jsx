import { Users, Briefcase, Mountain, Plane, CarFront } from 'lucide-react';
import Hero from '../assets/opt/munnar.webp';
import { useCars } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { VehicleCard } from '../components/cards';
import { CtaBand, PageHero, Reveal, SectionHeading, Skeleton } from '../components/ui';

const GUIDE = [
  { icon: Users, size: '1–4 travellers', pick: 'Sedan', text: 'City rides, airport transfers and couples on short trips.' },
  { icon: Briefcase, size: '5–7 travellers', pick: 'SUV / Innova', text: 'Families with luggage, hill stations and long highway days.' },
  { icon: Mountain, size: '8+ travellers', pick: 'Tempo Traveller', text: 'Pilgrim groups, weddings and multi-family tours.' },
];

const Vehicles = () => {
  const { data: cars, loading, error } = useCars();
  const { openBooking } = useBooking();

  return (
    <>
      <PageHero
        eyebrow="Our fleet"
        title="Comfortable vehicles for every kind of trip"
        intro="Every car is air-conditioned, cleaned before each trip and driven by a chauffeur who knows South India's roads."
        image={Hero}
        crumbs={['Fleet']}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Choose your ride" title="Available vehicles" intro="Not sure which one fits? Pick “Suggest the best vehicle” when booking and we'll recommend one for your group." />
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[400px]" />)}</div>
          ) : cars.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 0.05}><VehicleCard car={c} /></Reveal>)}
            </div>
          ) : (
            <div className="card p-10 text-center max-w-xl mx-auto">
              <CarFront className="w-10 h-10 text-gold-500 mx-auto" aria-hidden />
              <h2 className="font-display text-2xl font-semibold text-ink-900 mt-4">{error ? "We couldn't load the fleet right now" : 'Fleet list coming soon'}</h2>
              <p className="text-ink-600 mt-2">Sedans, SUVs and Tempo Travellers are available — tell us your group size and we'll assign the right vehicle.</p>
              <button type="button" onClick={() => openBooking()} className="btn btn-primary mt-6">Request a vehicle</button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-y border-sand-200">
        <div className="container-x">
          <SectionHeading eyebrow="Quick guide" title="Which vehicle suits your group?" />
          <div className="grid md:grid-cols-3 gap-6">
            {GUIDE.map((g) => (
              <div key={g.size} className="rounded-[14px] border border-sand-200 p-6">
                <g.icon className="w-6 h-6 text-gold-600" aria-hidden />
                <p className="text-sm font-semibold text-ink-500 mt-4">{g.size}</p>
                <h3 className="font-display text-2xl font-semibold text-ink-900">{g.pick}</h3>
                <p className="text-ink-600 mt-2">{g.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-ink-600">
            <Plane className="w-4 h-4 text-gold-600" aria-hidden /> Airport pickups at Madurai (IXM) are available around the clock.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Vehicles;
