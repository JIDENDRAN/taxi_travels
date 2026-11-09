import { MapPin, Clock, Car, HeartHandshake, Compass, Landmark, ArrowUpRight } from 'lucide-react';
import Hero from '../assets/opt/madurai-aerial.webp';
import Team1 from '../assets/opt/traveller-17.webp';
import Team2 from '../assets/opt/traveller-3.webp';
import Team3 from '../assets/opt/traveller-1.webp';
import { SITE } from '../data/site';
import { CtaBand, Marquee, PageHero, Reveal, SectionHeading } from '../components/ui';

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
      title="Madurai's own taxi & tour desk."
      intro={`Since ${SITE.since} we've helped families, pilgrims and travellers explore Tamil Nadu and Kerala safely and comfortably — turning journeys into stories worth retelling.`}
      image={Hero}
      crumbs={['About']}
    />

    {/* Fact strip */}
    <section className="border-b-2 border-ink-900 bg-white">
      <dl className="container-x grid grid-cols-3 divide-x-2 divide-ink-900">
        {[
          { k: 'Driving since', v: String(SITE.since) },
          { k: 'Booking desk', v: '24/7' },
          { k: 'Coverage', v: 'TN + KL' },
        ].map((s) => (
          <div key={s.k} className="py-8 px-3 sm:px-8 first:pl-0">
            <dt className="mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-ink-500">{s.k}</dt>
            <dd className="h-display text-4xl sm:text-6xl text-ink-950 mt-2">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className="py-20 sm:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeading index="01" eyebrow="Our story" title="Welcome to Madurai Best Taxi Travels" className="!mb-8" />
          <div className="space-y-5 text-lg text-ink-700 leading-relaxed">
            <p>We are a trusted travel partner dedicated to making your journeys safe, comfortable and memorable. From our base in Palanganatham, Madurai, we run airport transfers, outstation cabs, Tempo Traveller hire and complete tour packages across South India.</p>
            <p>Our mission is simple: help people explore with a travel service they can trust. Our vision is to be the most preferred travel company in South India — earned one trip at a time.</p>
          </div>
        </div>
        <Reveal className="relative h-[460px] sm:h-[540px]">
          <figure className="absolute left-0 top-0 w-[62%] bg-white border-2 border-ink-900 p-2 -rotate-3 shadow-[6px_6px_0_0_var(--color-ink-900)] z-10">
            <img src={Team1} alt="Our driver welcoming a guest at Madurai Airport" loading="lazy" className="w-full aspect-[4/5] object-cover border-2 border-ink-900" />
          </figure>
          <figure className="absolute right-0 top-10 w-[52%] bg-white border-2 border-ink-900 p-2 rotate-2 shadow-[6px_6px_0_0_var(--color-ink-900)]">
            <img src={Team2} alt="Guests ready to begin their tour with us" loading="lazy" className="w-full aspect-[4/5] object-cover border-2 border-ink-900" />
          </figure>
          <figure className="absolute right-8 bottom-0 w-[58%] bg-white border-2 border-ink-900 p-2 -rotate-1 shadow-[6px_6px_0_0_var(--color-ink-900)] z-20">
            <img src={Team3} alt="A family of travellers with their cab on a bridge" loading="lazy" className="w-full aspect-[4/3] object-cover border-2 border-ink-900" />
          </figure>
        </Reveal>
      </div>
    </section>

    <Marquee items={['Customer first', 'Safe rides', 'Honest fares', 'Local drivers', 'Open 24/7']} />

    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading index="02" eyebrow="What we stand for" title="How we look after every guest" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="card p-6">
              <span className="w-12 h-12 grid place-items-center bg-gold-500 border-2 border-ink-900 rounded-[6px]"><v.icon className="w-6 h-6" aria-hidden /></span>
              <h3 className="h-display text-2xl text-ink-950 mt-5">{v.title}</h3>
              <p className="text-ink-600 mt-2">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-20 sm:pb-28">
      <div className="container-x grid md:grid-cols-2 gap-6">
        <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="group card card-hover p-8 block">
          <MapPin className="w-7 h-7" aria-hidden />
          <p className="mono text-xs font-bold uppercase tracking-[0.14em] text-ink-500 mt-6">Head office</p>
          <address className="not-italic h-display text-2xl sm:text-3xl text-ink-950 mt-2 leading-tight">
            {SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <span className="mono text-xs font-bold uppercase inline-flex items-center gap-1 mt-5 border-b-2 border-ink-900">Open in Google Maps <ArrowUpRight className="w-3.5 h-3.5" aria-hidden /></span>
        </a>
        <a href={SITE.phoneHref} className="group card card-hover p-8 block bg-ink-900 text-sand-50">
          <Clock className="w-7 h-7 text-gold-400" aria-hidden />
          <p className="mono text-xs font-bold uppercase tracking-[0.14em] text-ink-300 mt-6">Always reachable</p>
          <p className="h-display text-2xl sm:text-3xl mt-2 leading-tight">Our reservation desk is open 24 hours, 7 days a week.</p>
          <span className="h-display text-3xl text-gold-400 block mt-5">{SITE.phoneDisplay}</span>
        </a>
      </div>
    </section>

    <CtaBand title="Your travel companion across South India." />
  </>
);

export default About;
