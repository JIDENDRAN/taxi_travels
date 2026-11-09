import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, Check, ArrowRight, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { usePackages } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { getPackageImage } from '../utils/imageImports';
import { PackageCard } from '../components/cards';
import { CtaBand, Skeleton } from '../components/ui';
import { formatPrice } from '../utils/format';
import { SITE, whatsappLink } from '../data/site';

const INCLUDED = [
  'Private AC vehicle for your group',
  'Experienced local driver',
  'Pickup & drop at your hotel, station or airport',
  'Itinerary adjusted to temple timings',
];

export default function PackageDetail() {
  const { id } = useParams();
  const { data: packages, loading } = usePackages();
  const { openBooking } = useBooking();
  const pkg = packages.find((p) => String(p.id) === String(id));

  useEffect(() => {
    if (pkg) document.title = `${pkg.name} | ${SITE.name}`;
  }, [pkg]);

  if (loading) {
    return (
      <div className="container-x py-16 space-y-6">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <section className="container-x py-24">
        <p className="eyebrow">Package not found</p>
        <h1 className="h-display text-5xl text-ink-950 mt-4 max-w-2xl">This ticket has expired.</h1>
        <p className="mt-5 text-lg text-ink-600 max-w-xl">This package may have been updated or removed. Browse current tours or ask us for a custom plan.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/packages" className="btn btn-primary">All packages <ArrowRight className="w-4 h-4" /></Link>
          <button type="button" onClick={() => openBooking()} className="btn btn-outline">Plan a custom trip</button>
        </div>
      </section>
    );
  }

  const price = formatPrice(pkg.price);
  const related = packages.filter((p) => p.id !== pkg.id).slice(0, 3);
  const book = () => openBooking({ packageType: pkg.name, toLocation: pkg.location || '' });

  return (
    <>
      <section className="border-b-2 border-ink-900">
        <div className="container-x pt-8 pb-14 sm:pb-16">
          <Link to="/packages" className="mono inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-ink-600 hover:text-ink-950">
            <ArrowLeft className="w-4 h-4" aria-hidden /> All packages
          </Link>
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 mt-6 items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {pkg.duration && <span className="mono text-xs font-bold uppercase inline-flex items-center gap-1.5 bg-gold-500 border-2 border-ink-900 rounded-[4px] px-2.5 py-1"><Clock className="w-3.5 h-3.5" aria-hidden />{pkg.duration}</span>}
                {pkg.location && <span className="mono text-xs font-bold uppercase inline-flex items-center gap-1.5 bg-white border-2 border-ink-900 rounded-[4px] px-2.5 py-1"><MapPin className="w-3.5 h-3.5" aria-hidden />{pkg.location}</span>}
              </div>
              <h1 className="h-display text-[2.8rem] sm:text-6xl lg:text-7xl text-ink-950 mt-5">{pkg.name}</h1>
              <div className="relative mt-10">
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-gold-500 border-2 border-ink-900 rounded-[8px]" aria-hidden />
                <div className="relative aspect-[16/9] border-2 border-ink-900 rounded-[8px] overflow-hidden bg-ink-900">
                  <img src={getPackageImage(pkg.image)} alt={pkg.name} className="w-full h-full object-cover" fetchPriority="high" />
                </div>
              </div>
            </div>

            {/* Fare ticket */}
            <aside className="lg:sticky lg:top-28 card overflow-hidden">
              <div className="bg-ink-900 text-gold-400 px-5 py-3 mono text-[11px] font-bold uppercase tracking-[0.16em]">Tour ticket</div>
              <div className="p-6">
                {price ? (
                  <>
                    <p className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Fare from</p>
                    <p className="h-display text-5xl text-ink-950 mt-1">{price}</p>
                    <p className="text-sm text-ink-600 mt-2">Final fare depends on vehicle and dates.</p>
                  </>
                ) : (
                  <p className="h-display text-3xl text-ink-950">Fare on request</p>
                )}
              </div>
              <div className="ticket-perf p-6 space-y-2.5 bg-sand-50">
                <button type="button" onClick={book} className="btn btn-primary w-full">Book this package <ArrowRight className="w-4 h-4" /></button>
                <a href={whatsappLink(`Hi, I'm interested in the "${pkg.name}" package. Please share details.`)} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full"><MessageCircle className="w-4 h-4" /> Ask on WhatsApp</a>
                <a href={SITE.phoneHref} className="btn btn-outline w-full"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500 text-center pt-2">No payment needed to request</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          {pkg.places && (
            <div>
              <p className="eyebrow">Highlights</p>
              <p className="h-display text-3xl sm:text-4xl text-ink-950 mt-5 leading-[1.15]">{pkg.places}</p>
            </div>
          )}
          <div>
            <p className="eyebrow">Included with every tour</p>
            <ul className="mt-5 border-2 border-ink-900 rounded-[6px] bg-white divide-y-2 divide-ink-900">
              {INCLUDED.map((x) => (
                <li key={x} className="flex items-center gap-3 px-4 py-3.5 font-semibold text-ink-900">
                  <span className="w-6 h-6 grid place-items-center bg-gold-500 border-2 border-ink-900 rounded-[4px] shrink-0"><Check className="w-3.5 h-3.5" aria-hidden /></span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-600">Tolls, parking, permits and entry tickets are confirmed with your quote. Want an extra stop or day? Just tell us when you book.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 sm:py-20 bg-sand-100 border-t-2 border-ink-900">
          <div className="container-x">
            <h2 className="h-display text-4xl text-ink-950 mb-10">More tickets</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
