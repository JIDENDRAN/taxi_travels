import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ChevronDown, ArrowRight, Car, MapPin, Clock, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { POPULAR_ROUTES, SITE } from '../data/site';
import { CtaBand, PageHero, Reveal } from './ui';

const TRUST = [
  `Office at Palanganatham, Madurai — operating since ${SITE.since}`,
  'Drivers experienced on highways, night drives and ghat roads',
  'Clean AC sedans, Innova Crysta & Tempo Travellers',
  'Transparent billing with fare confirmed before departure',
  '24/7 reservation desk, including Madurai Airport (IXM)',
];

const FLEET_PRESETS = [
  {
    name: 'Sedan (Swift Dzire / Etios)',
    capacity: '4 Passengers + 1 Driver',
    luggage: '2-3 Medium Bags',
    ideal: 'Airport drops, solo, couple, or small family trips',
    vehicleType: 'Sedan'
  },
  {
    name: 'Toyota Innova Crysta',
    capacity: '6 to 7 Passengers + 1 Driver',
    luggage: '4-5 Large Bags',
    ideal: 'Family vacations, outstation tours, ghat road comfort',
    vehicleType: 'Innova Crysta'
  },
  {
    name: 'Tempo Traveller / Force Urbania',
    capacity: '12, 14, 18 or 20 Seater',
    luggage: 'Large Luggage Boot',
    ideal: 'Pilgrimage groups, corporate tours, wedding events',
    vehicleType: 'Tempo Traveller'
  }
];

const SEOLandingPage = ({
  title,
  heroSubtitle,
  heroBg,
  sections,
  faqs,
  bookingPreset,
  canonicalPath,
  routeMeta
}) => {
  const { openBooking } = useBooking();
  const pageUrl = `https://www.maduraibesttravels.in${canonicalPath || ''}`;

  return (
    <>
      {/* Schema.org FAQPage */}
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            })
          }}
        />
      )}

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.maduraibesttravels.in/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: pageUrl
              }
            ]
          })
        }}
      />

      {/* Schema.org TaxiService / Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TaxiService',
            name: title,
            url: pageUrl,
            provider: {
              '@type': 'TravelAgency',
              name: 'Madurai Best Travels',
              telephone: SITE.phoneDisplay,
              email: SITE.email,
              url: 'https://www.maduraibesttravels.in/',
              address: {
                '@type': 'PostalAddress',
                streetAddress: SITE.addressLines.join(', '),
                addressLocality: 'Madurai',
                addressRegion: 'Tamil Nadu',
                postalCode: '625003',
                addressCountry: 'IN'
              }
            },
            areaServed: [
              { '@type': 'City', name: 'Madurai' },
              { '@type': 'AdministrativeArea', name: 'Tamil Nadu' }
            ],
            description: heroSubtitle
          })
        }}
      />

      <PageHero eyebrow={SITE.name} title={title} intro={heroSubtitle} image={heroBg} crumbs={[title]}>
        <div className="flex flex-wrap gap-3 mt-8">
          <button type="button" onClick={() => openBooking(bookingPreset)} className="btn btn-primary shadow-lg">
            Book Online <ArrowRight className="w-4 h-4" />
          </button>
          <a href={SITE.phoneHref} className="btn btn-ghost-light">
            <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
          </a>
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
            <MessageCircle className="w-4 h-4" /> WhatsApp Booking
          </a>
        </div>
      </PageHero>

      {/* Route Quick Info Strip if present */}
      {routeMeta && (
        <section className="bg-forest-900 text-white border-y border-forest-800 py-6">
          <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {routeMeta.distance && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold block mb-1">Total Distance</span>
                <span className="text-lg sm:text-xl font-bold">{routeMeta.distance}</span>
              </div>
            )}
            {routeMeta.duration && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold block mb-1">Travel Time</span>
                <span className="text-lg sm:text-xl font-bold">{routeMeta.duration}</span>
              </div>
            )}
            {routeMeta.bestRoute && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold block mb-1">Recommended Highway</span>
                <span className="text-lg sm:text-xl font-bold">{routeMeta.bestRoute}</span>
              </div>
            )}
            {routeMeta.vehicleOptions && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold block mb-1">Available Fleet</span>
                <span className="text-lg sm:text-xl font-bold">{routeMeta.vehicleOptions}</span>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-14 sm:py-20">
        <div className="container-x grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
          <article className="max-w-3xl">
            {sections.map((section, idx) => (
              <Reveal key={idx} className={idx > 0 ? 'mt-12 pt-12 border-t border-sand-200' : ''}>
                <h2 className="h-display text-3xl sm:text-4xl text-ink-950 mb-5">{section.heading}</h2>
                <div className="prose-site" dangerouslySetInnerHTML={{ __html: section.content }} />
              </Reveal>
            ))}

            {/* Fleet Options Card */}
            <div className="mt-14 pt-12 border-t border-sand-200">
              <h2 className="h-display text-3xl sm:text-4xl text-ink-950 mb-4">Choose Your Preferred Cab</h2>
              <p className="text-ink-700 mb-6">All vehicles are sanitized, fully air-conditioned, and driven by background-verified polite chauffeurs.</p>
              
              <div className="grid gap-4 sm:grid-cols-3">
                {FLEET_PRESETS.map((v, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-sand-200 shadow-sm flex flex-col justify-between hover:border-forest-500 transition-colors">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-3">
                        <Car className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-ink-950 text-lg leading-snug">{v.name}</h3>
                      <p className="text-xs text-forest-700 font-semibold mt-1">{v.capacity}</p>
                      <p className="text-xs text-ink-600 mt-2">{v.ideal}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBooking({ ...bookingPreset, vehicle: v.vehicleType })}
                      className="mt-4 btn btn-primary !min-h-9 !text-xs w-full"
                    >
                      Book {v.vehicleType}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {faqs && faqs.length > 0 && (
              <div className="mt-14 pt-12 border-t border-sand-200">
                <h2 className="h-display text-3xl sm:text-4xl text-ink-950 mb-6">Frequently Asked Questions</h2>
                <div className="divide-y divide-sand-200 border-y border-sand-200">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group py-1">
                      <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <ChevronDown className="w-5 h-5 text-ink-900 transition-transform group-open:rotate-180 shrink-0" aria-hidden />
                      </summary>
                      <p className="pb-5 text-ink-700 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="card !bg-forest-700 !border-forest-700 text-white p-6 shadow-xl">
              <h3 className="h-display text-2xl sm:text-3xl">Instant Cab Enquiry</h3>
              <p className="text-forest-100 text-sm mt-1.5">24/7 Fast Booking. Transparent rates with no surprise surge.</p>
              <button type="button" onClick={() => openBooking(bookingPreset)} className="btn btn-primary w-full mt-5">
                Book This Cab <ArrowRight className="w-4 h-4" />
              </button>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full mt-2.5">
                <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
              </a>
              <a href={SITE.phoneHref} className="btn btn-ghost-light w-full mt-2.5">
                <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-ink-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-leaf-600" /> Why Madurai Best Travels
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {TRUST.map((t) => (
                  <li key={t} className="flex gap-2.5 text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-leaf-500 shrink-0 mt-0.5" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <nav className="card p-6" aria-label="Related taxi routes">
              <h3 className="font-bold text-ink-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-forest-700" /> Popular Taxi Routes
              </h3>
              <ul className="mt-3 space-y-1">
                {POPULAR_ROUTES.slice(0, 10).map((r) => (
                  <li key={r.path}>
                    <Link to={r.path} className="flex items-center justify-between py-1.5 text-sm text-ink-700 hover:text-forest-600">
                      <span>{r.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-sand-200">
                <Link to="/blog" className="text-xs font-semibold text-forest-700 hover:underline flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Browse South India Travel Guides &rarr;
                </Link>
              </div>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBand preset={bookingPreset} />
    </>
  );
};

export default SEOLandingPage;
