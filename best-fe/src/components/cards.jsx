import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowUpRight, Users, Snowflake, ArrowRight } from 'lucide-react';
import { getPackageImage, getVehicleImage } from '../utils/imageImports';
import { formatPrice, parseTariff } from '../utils/format';
import { useBooking } from '../context/BookingContext';

export function PackageCard({ pkg }) {
  const { openBooking } = useBooking();
  const price = formatPrice(pkg.price);

  return (
    <article className="group card card-hover overflow-hidden flex flex-col h-full">
      <Link to={`/packages/${pkg.id}`} className="block relative aspect-[4/3] overflow-hidden bg-sand-100" aria-label={`View ${pkg.name}`}>
        <img src={getPackageImage(pkg.image)} alt={pkg.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
        {pkg.duration && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink-900">
            <Clock className="w-3.5 h-3.5 text-gold-600" aria-hidden /> {pkg.duration}
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {pkg.location && (
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500">
            <MapPin className="w-3.5 h-3.5 text-gold-600" aria-hidden /> {pkg.location}
          </p>
        )}
        <h3 className="font-display text-xl font-semibold text-ink-900 mt-1.5 leading-snug">
          <Link to={`/packages/${pkg.id}`} className="hover:text-gold-700 transition-colors">{pkg.name}</Link>
        </h3>
        {pkg.places && <p className="mt-2 text-sm text-ink-600 line-clamp-2">{pkg.places}</p>}
        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            {price && (
              <>
                <p className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">Starting from</p>
                <p className="font-display text-2xl font-semibold text-ink-900 leading-none mt-1">{price}</p>
              </>
            )}
          </div>
          <button type="button" onClick={() => openBooking({ packageType: pkg.name })} className="btn btn-dark !min-h-10 !px-4 !text-sm">
            Book <ArrowUpRight className="w-4 h-4" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}

export function VehicleCard({ car }) {
  const { openBooking } = useBooking();
  const price = formatPrice(car.price);
  const plans = parseTariff(car.desc);

  return (
    <article className="group card card-hover overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-gradient-to-b from-sand-100 to-white grid place-items-center p-6 overflow-hidden">
        <img src={getVehicleImage(car.image)} alt={car.name} loading="lazy" className="img-zoom max-h-full max-w-full object-contain mix-blend-multiply" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-ink-900">{car.name}</h3>
        <ul className="flex flex-wrap gap-2 mt-3 text-xs font-semibold text-ink-700">
          {car.seats && (
            <li className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1"><Users className="w-3.5 h-3.5" aria-hidden /> {car.seats}</li>
          )}
          {car.ac && (
            <li className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1"><Snowflake className="w-3.5 h-3.5" aria-hidden /> {car.ac}</li>
          )}
        </ul>
        {plans.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {plans.map((plan) => (
              <div key={plan.title} className="rounded-[10px] bg-sand-50 border border-sand-200 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700">{plan.title}</p>
                <dl className="mt-1.5 space-y-1 text-xs">
                  {plan.rows.map(([k, v], i) => (
                    <div key={i} className="flex flex-col">
                      {k && <dt className="text-ink-500">{k}</dt>}
                      <dd className="font-semibold text-ink-900">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          car.desc && <p className="mt-3 text-sm text-ink-600 line-clamp-3 whitespace-pre-line">{car.desc}</p>
        )}
        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            {price && (
              <>
                <p className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">From</p>
                <p className="font-display text-xl font-semibold text-ink-900 leading-none mt-1">{price}</p>
              </>
            )}
          </div>
          <button type="button" onClick={() => openBooking({ vehicle: car.name })} className="btn btn-primary !min-h-10 !px-4 !text-sm">
            Book this <ArrowRight className="w-4 h-4" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
