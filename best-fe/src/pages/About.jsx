import { MapPin, Clock, Car, HeartHandshake, Compass, Landmark, ArrowUpRight } from 'lucide-react';
import Hero from '../assets/opt/madurai-aerial.webp';
import Team1 from '../assets/opt/traveller-17.webp';
import Team2 from '../assets/opt/traveller-3.webp';
import { SITE } from '../data/site';
import { CtaBand, PageHero, Reveal, SectionHeading } from '../components/ui';

const VALUES = [
  { icon: HeartHandshake, title: 'Customer first', text: 'One point of contact from your first call to the final drop — no call centres, no hand-offs.' },
  { icon: Car, title: 'Safe, comfortable rides', text: 'Clean AC vehicles and drivers experienced on highways, ghat roads and city traffic alike.' },
  { icon: Compass, title: 'Honest, flexible plans', text: 'Packages are a starting point. We adjust days, stops and vehicles to suit your group and budget.' },
  { icon: Landmark, title: 'Local knowledge', text: 'Temple timings, festival crowds, the best sunrise spots — our drivers know South India first-hand.' },
];

const About = () => (
  <>
    <PageHero
      eyebrow="About us"
      title="Madurai's own taxi & tour company"
      intro={`Since ${SITE.since} we've helped families, pilgrims and travellers explore Tamil Nadu and Kerala safely and comfortably.`}
      image={Hero}
      pills={[`Since ${SITE.since}`, 'Open 24/7', 'Tamil Nadu & Kerala']}
      crumbs={['About']}
    />

    <section className="py-16 sm:py-24">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-ink-950 mt-3">Welcome to Madurai Best <em className="text-forest-600">Taxi Travels</em></h2>
          <div className="mt-6 space-y-4 text-lg text-ink-700 leading-relaxed">
            <p>We are a trusted travel partner dedicated to making your journeys safe, comfortable and memorable. From our base in Palanganatham, Madurai, we run airport transfers, outstation cabs, Tempo Traveller hire and complete tour packages across South India.</p>
            <p>Our mission is simple: help people explore with a travel service they can trust. Our vision is to be the most preferred travel company in South India — earned one trip at a time.</p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3">
            {[
              { k: 'Since', v: String(SITE.since) },
              { k: 'Booking desk', v: '24/7' },
              { k: 'Coverage', v: 'TN & KL' },
            ].map((s) => (
              <div key={s.k} className="rounded-[18px] bg-white border border-sand-200 p-4">
                <dt className="text-xs font-semibold text-ink-500">{s.k}</dt>
                <dd className="h-display text-2xl sm:text-3xl text-forest-700 mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Reveal className="grid grid-cols-2 gap-4">
          <img src={Team1} alt="Our driver welcoming a guest at Madurai Airport" className="rounded-[24px] w-full h-[320px] sm:h-[440px] object-cover" loading="lazy" />
          <img src={Team2} alt="Guests ready to begin their tour with us" className="rounded-[24px] w-full h-[320px] sm:h-[440px] object-cover mt-12" loading="lazy" />
        </Reveal>
      </div>
    </section>

    <section className="py-16 sm:py-20 bg-white border-y border-sand-200">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="What we stand for" title="How we look after every guest" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="rounded-[22px] bg-sand-50 border border-sand-200 p-6">
              <span className="w-12 h-12 rounded-[14px] bg-forest-700 text-white grid place-items-center"><v.icon className="w-5 h-5" aria-hidden /></span>
              <h3 className="h-display text-2xl text-ink-950 mt-5">{v.title}</h3>
              <p className="text-ink-600 mt-2">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="container-x grid md:grid-cols-2 gap-6">
        <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="card card-hover p-8 block">
          <MapPin className="w-7 h-7 text-forest-700" aria-hidden />
          <h3 className="h-display text-2xl text-ink-950 mt-4">Head office</h3>
          <address className="not-italic text-ink-700 mt-3 leading-relaxed">{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <span className="inline-flex items-center gap-1 mt-4 font-semibold text-forest-700">Open in Google Maps <ArrowUpRight className="w-4 h-4" aria-hidden /></span>
        </a>
        <a href={SITE.phoneHref} className="card card-hover p-8 block !bg-forest-700 !border-forest-700 text-white">
          <Clock className="w-7 h-7 text-gold-300" aria-hidden />
          <h3 className="h-display text-2xl mt-4">Always reachable</h3>
          <p className="text-forest-100 mt-3">Our reservation desk is open 24 hours a day, 7 days a week — for new bookings and for guests already on the road.</p>
          <span className="block mt-4 text-2xl font-extrabold text-gold-300">{SITE.phoneDisplay}</span>
        </a>
      </div>
    </section>

    <CtaBand title="Your travel companion across South India." />
  </>
);

export default About;
