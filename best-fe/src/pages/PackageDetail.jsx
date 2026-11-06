import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, CheckCircle2, ArrowRight, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { usePackages } from '../hooks/useCatalog';
import { useBooking } from '../context/BookingContext';
import { getPackageImage } from '../utils/imageImports';
import { PackageCard } from '../components/cards';
import { formatPrice } from '../utils/format';
import { CtaBand, Skeleton } from '../components/ui';
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
      <div className="container-x pt-32 pb-20 space-y-6">
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="bg-ink-900 text-white pt-36 pb-24">
        <div className="container-x max-w-2xl">
          <h1 className="h-display text-4xl">Package not found</h1>
          <p className="mt-4 text-ink-200">This package may have been updated or removed. Browse our current tours or ask us for a custom plan.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/packages" className="btn btn-primary">All packages <ArrowRight className="w-4 h-4" /></Link>
            <button type="button" onClick={() => openBooking()} className="btn btn-ghost-light">Plan a custom trip</button>
          </div>
        </div>
      </div>
    );
  }

  const price = formatPrice(pkg.price);
  const related = packages.filter((p) => p.id !== pkg.id).slice(0, 3);
  const book = () => openBooking({ packageType: pkg.name, toLocation: pkg.location || '' });

  return (
    <>
      <section className="relative isolate bg-ink-950 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <img src={getPackageImage(pkg.image)} alt="" aria-hidden className="absolute inset-0 -z-10 w-full h-full object-cover opacity-50" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="container-x">
          <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm text-ink-200 hover:text-white">
            <ArrowLeft className="w-4 h-4" aria-hidden /> All packages
          </Link>
          <div className="mt-24 sm:mt-32 max-w-3xl">
            <div className="flex flex-wrap gap-2 text-sm">
              {pkg.duration && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 font-semibold"><Clock className="w-4 h-4 text-gold-300" aria-hidden />{pkg.duration}</span>}
              {pkg.location && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 font-semibold"><MapPin className="w-4 h-4 text-gold-300" aria-hidden />{pkg.location}</span>}
            </div>
            <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mt-4">{pkg.name}</h1>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
          <div>
            {pkg.places && (
              <>
                <h2 className="h-display text-2xl sm:text-3xl text-ink-900">Tour highlights</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-700 max-w-2xl">{pkg.places}</p>
              </>
            )}

            <h2 className="h-display text-2xl sm:text-3xl text-ink-900 mt-12">Included with every tour</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {INCLUDED.map((x) => (
                <li key={x} className="flex gap-3 text-ink-700"><CheckCircle2 className="w-5 h-5 text-leaf-500 shrink-0" aria-hidden />{x}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-500">
              Tolls, parking, permits and entry tickets are confirmed with your quote. Want to add a stop or an extra day? Just tell us when you book.
            </p>
          </div>

          <aside className="lg:sticky lg:top-24 card p-6">
            {price && (
              <>
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-500">Starting from</p>
                <p className="font-display text-4xl font-semibold text-ink-900 mt-1">{price}</p>
                <p className="text-xs text-ink-500 mt-1">Final fare depends on vehicle and dates.</p>
              </>
            )}
            <button type="button" onClick={book} className="btn btn-primary w-full mt-6">Book this package <ArrowRight className="w-4 h-4" /></button>
            <a href={whatsappLink(`Hi, I'm interested in the "${pkg.name}" package. Please share details.`)} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full mt-2.5">
              <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
            </a>
            <a href={SITE.phoneHref} className="btn btn-outline w-full mt-2.5"><Phone className="w-4 h-4" /> {SITE.phoneDisplay}</a>
            <p className="text-xs text-ink-500 mt-4 text-center">No payment needed to request a booking.</p>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-sand-200">
          <div className="container-x">
            <h2 className="h-display text-3xl text-ink-900 mb-8">You might also like</h2>
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
