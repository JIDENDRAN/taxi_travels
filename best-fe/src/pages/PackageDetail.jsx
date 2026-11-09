import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, Check, ArrowRight, MessageCircle, Phone, ChevronRight } from 'lucide-react';
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
      </div>
    );
  }

  if (!pkg) {
    return (
      <section className="container-x py-24">
        <p className="eyebrow">Package not found</p>
        <h1 className="h-display text-5xl text-ink-950 mt-4 max-w-2xl">This package isn't available.</h1>
        <p className="mt-5 text-lg text-ink-600 max-w-xl">It may have been updated or removed. Browse current tours or ask us for a custom plan.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/packages" className="btn btn-dark">All packages <ArrowRight className="w-4 h-4" /></Link>
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
      <section className="relative isolate overflow-hidden bg-forest-800 text-white">
        <img src={getPackageImage(pkg.image)} alt="" aria-hidden className="absolute inset-0 -z-10 w-full h-full object-cover opacity-45 mix-blend-luminosity" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900 via-forest-800/85 to-forest-700/20" />
        <div className="container-x py-14 sm:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-forest-100">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden /><Link to="/packages" className="hover:text-white">Tour packages</Link></li>
              <li className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden /><span className="text-white font-semibold" aria-current="page">{pkg.name}</span></li>
            </ol>
          </nav>
          <div className="flex flex-wrap gap-2 mt-6">
            {pkg.duration && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-sm font-semibold"><Clock className="w-4 h-4 text-gold-300" aria-hidden />{pkg.duration}</span>}
            {pkg.location && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-sm font-semibold"><MapPin className="w-4 h-4 text-gold-300" aria-hidden />{pkg.location}</span>}
          </div>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mt-4 max-w-3xl">{pkg.name}</h1>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x grid lg:grid-cols-[1fr_370px] gap-10 lg:gap-14 items-start">
          <div>
            <div className="rounded-[22px] overflow-hidden aspect-[16/9] bg-sand-100">
              <img src={getPackageImage(pkg.image)} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
            {pkg.places && (
              <div className="mt-10">
                <p className="eyebrow">Tour highlights</p>
                <p className="h-display text-2xl sm:text-3xl text-ink-950 mt-3 leading-snug">{pkg.places}</p>
              </div>
            )}
            <div className="mt-10">
              <p className="eyebrow">Included with every tour</p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex items-center gap-3 rounded-[14px] bg-white border border-sand-200 px-4 py-3 font-medium text-ink-800">
                    <span className="w-7 h-7 rounded-full bg-gold-100 text-forest-700 grid place-items-center shrink-0"><Check className="w-4 h-4" aria-hidden /></span>{x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-500">Tolls, parking, permits and entry tickets are confirmed with your quote. Want an extra stop or day? Just tell us when you book.</p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 card p-6">
            {price ? (
              <>
                <p className="text-sm text-ink-500">Starting from</p>
                <p className="text-4xl font-extrabold text-forest-700 mt-1">{price}</p>
                <p className="text-xs text-ink-500 mt-1">Final fare depends on vehicle and dates.</p>
              </>
            ) : (
              <p className="h-display text-3xl text-ink-950">Fare on request</p>
            )}
            <div className="space-y-2.5 mt-6">
              <button type="button" onClick={book} className="btn btn-primary w-full">Book this package <ArrowRight className="w-4 h-4" /></button>
              <a href={whatsappLink(`Hi, I'm interested in the "${pkg.name}" package. Please share details.`)} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full"><MessageCircle className="w-4 h-4" /> Ask on WhatsApp</a>
              <a href={SITE.phoneHref} className="btn btn-outline w-full"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
            </div>
            <p className="text-xs text-ink-500 mt-4 text-center">No payment needed to request a booking.</p>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="container-x">
            <h2 className="h-display text-3xl sm:text-4xl text-ink-950 mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
