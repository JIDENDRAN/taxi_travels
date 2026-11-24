import { Users, Briefcase, Mountain, Plane, CarFront } from 'lucide-react';
import Hero from '../assets/opt/munnar.webp';
import { useCars } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { VehicleCard } from '../components/cards';
import { CtaBand, PageHero, Reveal, SectionHeading, Skeleton } from '../components/ui';

const GUIDE = [
  { icon: Users, size: '1–4 travellers', pick: 'Swift Dzire & Etios (Sedan)', text: 'AC sedan rental in Madurai for city rides, airport transfers, solo and couple highway drops.' },
  { icon: Briefcase, size: '5–7 travellers', pick: 'Toyota Innova Crysta (SUV)', text: '7 seater taxi & SUV rental in Madurai for family tours, mountain ghat climbs, and luggage comfort.' },
  { icon: Mountain, size: '8–20 travellers', pick: 'Tempo Traveller & Urbania', text: '12, 14, 18, 20-seater luxury group vehicles in Madurai for pilgrim circuits, weddings, and corporate outings.' },
];

const VEHICLE_FAQS = [
  {
    q: 'How do I hire an Innova Crysta in Madurai?',
    a: 'You can reserve a 7-seater or 8-seater Toyota Innova Crysta online or by calling +91 63807 07938. We provide dedicated Innova Crysta cabs for local sightseeing, Madurai Airport transfers, and outstation trips to Rameswaram, Kodaikanal, and Munnar.'
  },
  {
    q: 'Are all cabs provided with an experienced private driver?',
    a: 'Yes, all our vehicles are chauffeur-driven by professional, licensed, and background-verified drivers with extensive highway and mountain road experience.'
  },
  {
    q: 'What tempo traveller seating capacities are available in Madurai?',
    a: 'We offer 12-seater, 14-seater, 18-seater Tempo Travellers, and luxury Force Urbanias equipped with individual push-back seats, powerful dual AC, and spacious luggage boots.'
  },
  {
    q: 'Do you offer marriage and wedding car rentals in Madurai?',
    a: 'Yes! We provide decorated luxury sedans, premium Innova Crystas, and tempo travellers for weddings, VIP guest pickups, and family marriage events.'
  }
];

const Vehicles = () => {
  const { data: cars, loading, error } = useCars();
  const { openBooking } = useBooking();

  return (
    <>
      <PageHero
        eyebrow="Our fleet"
        title="Choose your cab"
        intro="Every vehicle is air-conditioned, cleaned before each trip and driven by a chauffeur who knows South India's roads."
        image={Hero}
        pills={['Clear per-km tariffs', 'AC vehicles', '24/7 airport pickups']}
        crumbs={['Fleet']}
      />

      <div className="container-x relative z-10 -mt-10">
        <div className="card grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sand-200">
          {GUIDE.map((g) => (
            <div key={g.pick} className="p-6 flex gap-4">
              <span className="w-12 h-12 shrink-0 rounded-[14px] bg-gold-100 text-forest-700 grid place-items-center"><g.icon className="w-5 h-5" aria-hidden /></span>
              <div>
                <p className="text-xs font-semibold text-ink-500">{g.size}</p>
                <h3 className="font-bold text-ink-950">{g.pick}</h3>
                <p className="text-sm text-ink-600 mt-1">{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Available vehicles" title="Our fleet & tariffs" intro="Not sure which fits? Choose “Suggest the best vehicle” when booking and we'll recommend one for your group." />
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[480px]" />)}</div>
          ) : cars.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 0.05}><VehicleCard car={c} /></Reveal>)}
            </div>
          ) : (
            <div className="card p-10 text-center max-w-xl mx-auto">
              <CarFront className="w-10 h-10 text-gold-500 mx-auto" aria-hidden />
              <h2 className="h-display text-3xl text-ink-950 mt-4">{error ? "We couldn't load the fleet right now" : 'Fleet list coming soon'}</h2>
              <p className="text-ink-600 mt-3">Sedans, SUVs and Tempo Travellers are available — tell us your group size and we'll assign the right vehicle.</p>
              <button type="button" onClick={() => openBooking()} className="btn btn-primary mt-6">Request a vehicle</button>
            </div>
          )}
          <p className="mt-10 flex items-center gap-2 text-sm text-ink-600"><Plane className="w-4 h-4 text-forest-700" aria-hidden /> Madurai Airport (IXM) pickups are available around the clock.</p>

          {/* Vehicle Hire FAQs */}
          <div className="mt-16 pt-12 border-t border-sand-200 max-w-4xl mx-auto">
            <h2 className="h-display text-2xl sm:text-3xl text-ink-950 mb-6 text-center">Frequently Asked Questions About Car Rental in Madurai</h2>
            <div className="divide-y divide-sand-200 border-y border-sand-200">
              {VEHICLE_FAQS.map((faq, idx) => (
                <div key={idx} className="py-4">
                  <h3 className="font-bold text-ink-950 text-base mb-1.5">{faq.q}</h3>
                  <p className="text-sm text-ink-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Vehicles;
