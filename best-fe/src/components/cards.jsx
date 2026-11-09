import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Users, Snowflake } from 'lucide-react';
import { getPackageImage, getVehicleImage } from '../utils/imageImports';
import { formatPrice, parseTariff } from '../utils/format';
import { useBooking } from '../context/BookingContext';

/** Tour package card: full-width photo, name, duration and starting fare. */
export function PackageCard({ pkg }) {
  const price = formatPrice(pkg.price);

  return (
    <Link to={`/packages/${pkg.id}`} className="group card card-hover overflow-hidden flex flex-col h-full !border-0">
      <span className="block relative aspect-[61/30] overflow-hidden bg-sand-100">
        <img src={getPackageImage(pkg.image)} alt={pkg.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
      </span>
      <span className="px-4 pt-4 pb-4 flex flex-col flex-1">
        <span className="font-semibold text-[1.05rem] text-ink-900 group-hover:text-forest-700">{pkg.name}</span>
        <span className="mt-auto pt-1.5 flex items-center justify-between gap-3">
          <span className="text-sm text-ink-500 flex items-center gap-1.5">
            {pkg.duration ? <><Clock className="w-3.5 h-3.5" aria-hidden />{pkg.duration}</> : pkg.location && <><MapPin className="w-3.5 h-3.5" aria-hidden />{pkg.location}</>}
          </span>
          <span className="font-extrabold text-lg text-forest-700 shrink-0">{price || 'On request'}</span>
        </span>
      </span>
    </Link>
  );
}

/** Vehicle card with its tariff table. */
export function VehicleCard({ car }) {
  const { openBooking } = useBooking();
  const price = formatPrice(car.price);
  const plans = parseTariff(car.desc);

  return (
    <article className="group card card-hover overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] grid place-items-center p-6 bg-gradient-to-b from-forest-50 to-white overflow-hidden">
        <img src={getVehicleImage(car.image)} alt={car.name} loading="lazy" className="img-zoom max-h-full max-w-full object-contain mix-blend-multiply" />
        {price && <span className="absolute right-3 top-3 rounded-full bg-forest-700 text-white text-xs font-bold px-3 py-1">{price}</span>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="h-display text-2xl text-ink-950">{car.name}</h3>
        <ul className="flex flex-wrap gap-2 mt-3 text-xs font-semibold text-forest-800">
          {car.seats && <li className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-2.5 py-1"><Users className="w-3.5 h-3.5" aria-hidden />{car.seats}</li>}
          {car.ac && <li className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-2.5 py-1"><Snowflake className="w-3.5 h-3.5" aria-hidden />{car.ac}</li>}
        </ul>
        {plans.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {plans.map((plan) => (
              <div key={plan.title} className="rounded-[12px] bg-sand-50 border border-sand-200 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-600">{plan.title}</p>
                <dl className="mt-1.5 space-y-1 text-xs">
                  {plan.rows.map(([k, v], i) => (
                    <div key={i}>
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
        <div className="flex-1" />
        <button type="button" onClick={() => openBooking({ vehicle: car.name })} className="btn btn-primary w-full mt-5">
          Book this vehicle <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
