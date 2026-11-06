import { MapPin, Clock, Car, HeartHandshake, Compass, Landmark } from 'lucide-react';
import Hero from '../assets/opt/madurai-aerial.webp';
import Team1 from '../assets/opt/traveller-17.webp';
import Team2 from '../assets/opt/traveller-3.webp';
import { SITE } from '../data/site';
import { CtaBand, PageHero, Reveal, SectionHeading } from '../components/ui';

const VALUES = [
  { icon: HeartHandshake, title: 'Customer first', text: 'One point of contact from your first call to the final drop — no call centres, no hand-offs.' },
  { icon: Car, title: 'Safe & comfortable travel', text: 'Clean AC vehicles and drivers experienced on highways, ghat roads and city traffic alike.' },
  { icon: Compass, title: 'Honest, flexible plans', text: 'Packages are a starting point. We adjust days, stops and vehicles to suit your group and budget.' },
  { icon: Landmark, title: 'Local knowledge', text: 'Temple timings, festival crowds, the best sunrise spots — our drivers know South India first-hand.' },
];

const About = () => (
  <>
    <PageHero
      eyebrow="About us"
      title="Madurai's own travel company, driving South India since 2015"
      intro="We help families, pilgrims and travellers explore Tamil Nadu and Kerala safely and comfortably — turning journeys into stories worth retelling."
      image={Hero}
      crumbs={['About']}
    />

    <section className="py-20 sm:py-24">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="h-display text-3xl sm:text-4xl text-ink-900 mt-3">Welcome to Madurai Best Taxi Travels</h2>
          <div className="mt-6 space-y-4 text-ink-700 text-lg leading-relaxed">
            <p>
              We are a trusted travel partner dedicated to making your journeys safe, comfortable and memorable. From our base in Palanganatham, Madurai, we run airport transfers, outstation cabs, Tempo Traveller hire and complete tour packages across South India.
            </p>
            <p>
              Our mission is simple: to help people explore with a travel service they can trust. Our vision is to be the most preferred travel company in South India — earned one trip at a time.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-sand-200 pt-8">
            {[
              { k: 'Since', v: String(SITE.since) },
              { k: 'Booking desk', v: '24/7' },
              { k: 'Coverage', v: 'TN & Kerala' },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{s.k}</dt>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Reveal className="grid grid-cols-2 gap-4">
          <img src={Team1} alt="Our driver welcoming a guest at Madurai Airport" className="rounded-[16px] w-full h-[320px] sm:h-[420px] object-cover" loading="lazy" />
          <img src={Team2} alt="Guests ready to begin their tour with us" className="rounded-[16px] w-full h-[320px] sm:h-[420px] object-cover mt-10" loading="lazy" />
        </Reveal>
      </div>
    </section>

    <section className="py-20 sm:py-24 bg-white border-y border-sand-200">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="What we stand for" title="How we look after every guest" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="rounded-[14px] border border-sand-200 p-6 bg-sand-50">
              <v.icon className="w-6 h-6 text-gold-600" aria-hidden />
              <h3 className="font-bold text-lg text-ink-900 mt-4">{v.title}</h3>
              <p className="text-ink-600 mt-2 text-[0.95rem]">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-24">
      <div className="container-x grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <MapPin className="w-6 h-6 text-gold-600" aria-hidden />
          <h3 className="font-display text-2xl font-semibold text-ink-900 mt-4">Head office</h3>
          <address className="not-italic text-ink-700 mt-3 leading-relaxed">
            {SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 font-semibold text-gold-700 underline underline-offset-4">Open in Google Maps</a>
        </div>
        <div className="card p-8">
          <Clock className="w-6 h-6 text-gold-600" aria-hidden />
          <h3 className="font-display text-2xl font-semibold text-ink-900 mt-4">Always reachable</h3>
          <p className="text-ink-700 mt-3">Our reservation desk is open 24 hours a day, 7 days a week — for new bookings and for guests already on the road.</p>
          <a href={SITE.phoneHref} className="inline-block mt-4 font-semibold text-gold-700 underline underline-offset-4">{SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>

    <CtaBand title="Your trusted travel companion across South India." />
  </>
);

export default About;
