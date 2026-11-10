import React from 'react';
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
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { SITE } from '../../data/site';
import { useBooking } from '../../context/BookingContext';
import { PageHero, Reveal, SectionHeading, CtaBand } from '../../components/ui';
import HeroBg from '../../assets/opt/madurai-aerial.webp';

const MaduraiAirportTaxi = () => {
  const { openBooking } = useBooking();

  const transferServices = [
    {
      title: 'Airport to City Drop',
      desc: 'Driver greets you at the terminal arrivals exit with a nameboard and drops you directly at your hotel, home, or temple in Madurai.',
      badge: 'From ₹699',
      highlight: 'Terminal Pickup'
    },
    {
      title: 'City to Airport Drop',
      desc: 'Punctual doorstep pickup from anywhere in Madurai. Guaranteed on-time arrival at IXM terminal so you never rush or miss your flight.',
      badge: 'Fixed Fare',
      highlight: 'Doorstep Pickup'
    },
    {
      title: 'Round Trip Airport Transfer',
      desc: 'Ideal for day business travelers, doctors, and pilgrims. Includes scheduled return pickup matching your return flight itinerary.',
      badge: 'Best Value',
      highlight: 'Same Day / Return'
    }
  ];

  const features = [
    {
      title: 'Live Flight Tracking',
      desc: 'Delayed or early flight? We track your flight number in real-time. Your cab adjusts automatically with zero waiting fees.',
      icon: Plane
    },
    {
      title: 'Arrival Gate Nameboard',
      desc: 'No hunting for cabs outside the terminal. Your verified chauffeur holds a clear name sign right at the passenger exit.',
      icon: Users
    },
    {
      title: 'Zero Hidden Charges',
      desc: 'All-inclusive transparent rates with airport parking, tolls, and taxes clearly stated. No surge fares during peak hours.',
      icon: ShieldCheck
    },
    {
      title: '24/7 Dedicated Standby',
      desc: 'Whether it is a 3:00 AM red-eye flight or a midday departure, our airport reservation desk and drivers operate 24 hours daily.',
      icon: Clock
    }
  ];

  const faqs = [
    {
      q: 'How far is Madurai Airport (IXM) from Madurai city center?',
      a: 'Madurai Airport is located approximately 15 km from the city center and Meenakshi Amman Temple. The drive typically takes 25 to 35 minutes depending on traffic.'
    },
    {
      q: 'What happens if my flight is delayed?',
      a: 'We monitor live flight arrival times automatically. Your driver will be waiting at the terminal when you actually land, with zero waiting penalty.'
    },
    {
      q: 'How do I locate my driver at Madurai Airport?',
      a: 'Your driver will be waiting right at the passenger arrivals exit gate holding a nameboard with your name, and will assist you with your luggage.'
    },
    {
      q: 'Can I book a cab for an early morning or late night flight?',
      a: 'Yes, our airport cab service is available 24/7, 365 days a year. We recommend pre-booking at least 2 hours in advance for guaranteed allocation.'
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
        intro="On-time terminal pickup, live flight tracking, and comfortable AC cabs. Hassle-free transfers between Madurai Airport and the city."
        image={HeroBg}
        crumbs={['Airport Taxi']}
        pills={['Flight Delay Protection', 'Terminal Gate Pickup', 'Zero Waiting Surge']}
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

      {/* ── 2. AIRPORT TRANSFER SERVICES (FOCUSED & CLEAN) ─────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Airport Transfers"
            title="Fast, punctual airport cab booking"
            intro="Pre-book your Madurai airport cab in under a minute with zero advance payment."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {transferServices.map((service, idx) => (
              <Reveal key={service.title} delay={idx * 0.08}>
                <div className="card p-6 sm:p-7 flex flex-col justify-between h-full border border-sand-200 bg-sand-50/50 hover:bg-white hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full">
                        {service.highlight}
                      </span>
                      <span className="font-extrabold text-xs text-ink-900 bg-sand-200/80 px-2.5 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="h-display text-2xl text-ink-950 mb-2">{service.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{service.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openBooking({
                        tripType: 'airport',
                        toLocation: 'Madurai Airport (IXM)'
                      })
                    }
                    className="btn btn-primary w-full mt-6"
                  >
                    Book This Ride <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AIRPORT SERVICE GUARANTEES ─────────────────────── */}
      <section className="py-14 sm:py-20 bg-sand-100/50 border-t border-sand-200">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Service Guarantee"
            title="Why flyers choose our airport taxi"
            intro="Designed specifically for air travelers who value punctuality, comfort, and transparent pricing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.title} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-white border border-sand-200 h-full flex flex-col shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mb-4">
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

      {/* ── 4. AIRPORT FAQS ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-t border-sand-200">
        <div className="container-x max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Frequently Asked Questions"
            title="Airport transfer queries"
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

      {/* ── 5. CLOSING CTA BAND ───────────────────────────────── */}
      <CtaBand
        title="Landing at Madurai Airport? We're on standby 24/7."
        text="Share your flight arrival date and time. We'll have your verified chauffeur waiting at the arrivals gate."
        preset={{ tripType: 'airport', toLocation: 'Madurai Airport (IXM)' }}
      />
    </>
  );
};

export default MaduraiAirportTaxi;
