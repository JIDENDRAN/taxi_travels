import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Plane,
  MapPin,
  Luggage,
  Users,
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SITE } from '../../data/site';
import { useBooking } from '../../context/BookingContext';
import { PageHero, Reveal, SectionHeading, CtaBand } from '../../components/ui';

import HeroBg from '../../assets/opt/madurai-aerial.webp';
import SedanImg from '../../assets/opt/sedan-cutout.webp';
import InnovaImg from '../../assets/opt/innova-cutout.webp';
import TempoImg from '../../assets/opt/tempo-cutout.webp';
import MeenakshiImg from '../../assets/opt/meenakshi.webp';
import RameswaramImg from '../../assets/opt/rameswaram.webp';
import KodaikanalImg from '../../assets/opt/kodaikanal.webp';
import MunnarImg from '../../assets/opt/munnar.webp';

const MaduraiAirportTaxi = () => {
  const { openBooking } = useBooking();

  const airportFleet = [
    {
      name: 'Sedan (Dzire / Etios)',
      image: SedanImg,
      seats: '4 Passengers',
      bags: '2 Suitcases',
      fare: '₹699',
      bestFor: 'Solo travelers, couples & business trips',
      vehicleName: 'Sedan'
    },
    {
      name: 'Innova Crysta SUV',
      image: InnovaImg,
      seats: '7 Passengers',
      bags: '4 Suitcases',
      fare: '₹1,499',
      bestFor: 'Families, extra luggage & hill drives',
      vehicleName: 'Innova Crysta'
    },
    {
      name: 'AC Tempo Traveller',
      image: TempoImg,
      seats: '12-16 Passengers',
      bags: '10+ Bags',
      fare: '₹2,499',
      bestFor: 'Large families, pilgrimage & corporate groups',
      vehicleName: 'Tempo Traveller'
    }
  ];

  const popularRoutes = [
    {
      to: 'Madurai City & Meenakshi Temple',
      image: MeenakshiImg,
      distance: '15 km',
      time: '30 mins',
      fare: '₹699'
    },
    {
      to: 'Rameswaram Island',
      image: RameswaramImg,
      distance: '175 km',
      time: '3.5 hrs',
      fare: '₹2,499'
    },
    {
      to: 'Kodaikanal Hill Station',
      image: KodaikanalImg,
      distance: '135 km',
      time: '3.5 hrs',
      fare: '₹2,799'
    },
    {
      to: 'Munnar Tea Mist',
      image: MunnarImg,
      distance: '165 km',
      time: '4.5 hrs',
      fare: '₹3,499'
    }
  ];

  const features = [
    {
      title: 'Live Flight Tracking',
      desc: 'Delayed flight? We monitor your landing time automatically at zero extra charge.',
      icon: Plane
    },
    {
      title: 'Arrival Gate Nameboard',
      desc: 'Your chauffeur greets you right at the terminal exit gate and helps with luggage.',
      icon: Users
    },
    {
      title: 'Zero Hidden Charges',
      desc: 'Transparent fares with toll and parking clarity upfront. No surge pricing.',
      icon: ShieldCheck
    },
    {
      title: '24/7 Instant Availability',
      desc: 'Late-night or early-morning flights — our airport fleet is always on standby.',
      icon: Clock
    }
  ];

  const faqs = [
    {
      q: 'How far is Madurai Airport (IXM) from the city center?',
      a: 'Madurai Airport is around 15 km from the city center and Meenakshi Temple. The drive takes 25 to 35 minutes depending on time of day.'
    },
    {
      q: 'What happens if my flight is delayed?',
      a: 'No stress — our 24/7 team monitors your live flight status. Your cab will be ready when you actually land, with zero waiting penalties.'
    },
    {
      q: 'Can I get a direct drop from Madurai Airport to Rameswaram or Kodaikanal?',
      a: 'Yes, direct outstation transfers are our specialty. Our driver picks you up from the terminal and takes you straight to your destination hotel.'
    }
  ];

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a }
          }))
        })}
      </script>

      {/* ── 1. HERO BANNER ──────────────────────────────────────── */}
      <PageHero
        eyebrow="Madurai Airport (IXM) • 24/7 Service"
        title="Madurai Airport Taxi & Transfers"
        intro="On-time terminal pickup, live flight tracking, and sanitized AC cabs. Pre-book your airport transfer in under a minute."
        image={HeroBg}
        crumbs={['Airport Taxi']}
        pills={['Flight Delay Protection', 'Terminal Gate Pickup', 'Fixed Transparent Fares']}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            type="button"
            onClick={() => openBooking({ tripType: 'airport', toLocation: 'Madurai Airport (IXM)' })}
            className="btn btn-primary"
          >
            Book Airport Taxi <ArrowRight className="w-4 h-4" />
          </button>
          <a href={SITE.phoneHref} className="btn btn-ghost-light">
            <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* ── 2. AIRPORT FLEET OPTIONS WITH IMAGES ───────────────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Airport Fleet"
            title="Choose your airport cab"
            intro="Clean AC vehicles with spacious boot space for your luggage and family."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {airportFleet.map((car, idx) => (
              <Reveal key={car.name} delay={idx * 0.08}>
                <div className="card p-6 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 border border-sand-200">
                  {/* Vehicle Image */}
                  <div className="h-44 flex items-center justify-center p-3 mb-4 bg-sand-50 rounded-2xl">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="max-h-36 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="h-display text-2xl text-ink-950">{car.name}</h3>
                    <p className="text-xs text-ink-500 font-medium mt-1">{car.bestFor}</p>

                    <div className="flex items-center gap-4 text-xs font-semibold text-ink-700 mt-4 py-3 border-y border-sand-200">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-forest-700" /> {car.seats}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Luggage className="w-4 h-4 text-forest-700" /> {car.bags}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between">
                      <span className="text-xs text-ink-500 font-medium">Starting from</span>
                      <span className="font-extrabold text-xl text-forest-800">{car.fare}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openBooking({
                        tripType: 'airport',
                        toLocation: 'Madurai Airport (IXM)',
                        vehicle: car.vehicleName
                      })
                    }
                    className="btn btn-primary w-full mt-6"
                  >
                    Book {car.vehicleName} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DIRECT OUTSTATION ROUTES FROM IXM WITH IMAGES ─── */}
      <section className="py-14 sm:py-20 bg-sand-100/50 border-t border-sand-200">
        <div className="container-x">
          <SectionHeading
            eyebrow="Popular Airport Transfers"
            title="Direct drops from Madurai Airport"
            intro="Land at Madurai Airport and head straight to your hotel or destination without entering city traffic."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, idx) => (
              <Reveal key={route.to} delay={idx * 0.08}>
                <div
                  onClick={() =>
                    openBooking({
                      tripType: 'oneway',
                      fromLocation: 'Madurai Airport (IXM)',
                      toLocation: route.to
                    })
                  }
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-sand-200"
                >
                  <img
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{route.distance} • {route.time}</span>
                    </div>
                    <h4 className="font-['Outfit'] font-bold text-xl text-white leading-tight mb-3">
                      {route.to}
                    </h4>
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <span className="text-xs text-white/80">From {route.fare}</span>
                      <span className="text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Book Drop ➔
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY FLYERS CHOOSE US (CONCISE 4 PILLARS) ───────── */}
      <section className="py-14 sm:py-20 bg-white border-t border-sand-200">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Airport Service Guarantee"
            title="The reliable way to travel from Madurai Airport"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.title} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-sand-50 border border-sand-200 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="h-display text-xl text-ink-950 mb-2">{feat.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed flex-1">{feat.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. SHORT ACCORDION FAQS ───────────────────────────── */}
      <section className="py-14 sm:py-20 bg-sand-100/40 border-t border-sand-200">
        <div className="container-x max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Help & Information"
            title="Airport transfer FAQs"
          />

          <div className="divide-y divide-sand-200 border-y border-sand-200 mt-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group py-2">
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-bold text-ink-950 text-base [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-ink-900 transition-transform group-open:rotate-180 shrink-0" aria-hidden />
                </summary>
                <p className="pb-5 text-ink-700 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING CTA BAND ───────────────────────────────── */}
      <CtaBand
        title="Landing at Madurai Airport? We're on standby 24/7."
        text="Give us your flight number and landing date. We'll have your car and chauffeur waiting at the gate."
        preset={{ tripType: 'airport', toLocation: 'Madurai Airport (IXM)' }}
      />
    </>
  );
};

export default MaduraiAirportTaxi;
