import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { POPULAR_ROUTES, SITE } from '../data/site';
import { CtaBand, PageHero, Reveal } from './ui';

const TRUST = [
  `Office at Palanganatham, Madurai — operating since ${SITE.since}`,
  'Drivers experienced on highways and ghat roads',
  'Clean AC sedans, Innova Crysta & Tempo Travellers',
  'Fare confirmed with you before the trip',
  '24/7 booking desk, including Madurai Airport (IXM)',
];

const SEOLandingPage = ({ title, heroSubtitle, heroBg, sections, faqs, bookingPreset }) => {
  const { openBooking } = useBooking();

  return (
    <>
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          })}
        </script>
      )}

      <PageHero eyebrow={SITE.name} title={title} intro={heroSubtitle} image={heroBg} crumbs={[title]}>
        <div className="flex flex-wrap gap-3 mt-8">
          <button type="button" onClick={() => openBooking(bookingPreset)} className="btn btn-primary">
            Book online <ArrowRight className="w-4 h-4" />
          </button>
          <a href={SITE.phoneHref} className="btn btn-ghost-light"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="container-x grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
          <article className="max-w-3xl">
            {sections.map((section, idx) => (
              <Reveal key={idx} className={idx > 0 ? 'mt-12 pt-12 border-t border-sand-200' : ''}>
                <h2 className="h-display text-2xl sm:text-3xl text-ink-900 mb-5">{section.heading}</h2>
                <div className="prose-site" dangerouslySetInnerHTML={{ __html: section.content }} />
              </Reveal>
            ))}

            {faqs && faqs.length > 0 && (
              <div className="mt-14 pt-12 border-t border-sand-200">
                <h2 className="h-display text-2xl sm:text-3xl text-ink-900 mb-6">Frequently asked questions</h2>
                <div className="divide-y divide-sand-200 border-y border-sand-200">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group py-1">
                      <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <ChevronDown className="w-5 h-5 text-ink-400 transition-transform group-open:rotate-180 shrink-0" aria-hidden />
                      </summary>
                      <p className="pb-5 text-ink-700 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="rounded-[16px] bg-ink-900 text-white p-6">
              <h3 className="font-display text-xl font-semibold">Book this trip</h3>
              <p className="text-ink-200 text-sm mt-1.5">Available 24/7. No payment needed to request a booking.</p>
              <button type="button" onClick={() => openBooking(bookingPreset)} className="btn btn-primary w-full mt-5">Get a quote <ArrowRight className="w-4 h-4" /></button>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full mt-2.5"><MessageCircle className="w-4 h-4" /> WhatsApp us</a>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-ink-900">Why book with us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {TRUST.map((t) => (
                  <li key={t} className="flex gap-2.5 text-ink-700"><CheckCircle2 className="w-4 h-4 text-leaf-500 shrink-0 mt-0.5" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
            <nav className="card p-6" aria-label="Related services">
              <h3 className="font-bold text-ink-900">Related services</h3>
              <ul className="mt-3 space-y-1">
                {POPULAR_ROUTES.map((r) => (
                  <li key={r.path}>
                    <Link to={r.path} className="flex items-center justify-between py-1.5 text-sm text-ink-700 hover:text-gold-700">
                      {r.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBand preset={bookingPreset} />
    </>
  );
};

export default SEOLandingPage;
