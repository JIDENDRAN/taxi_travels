import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Users, Snowflake } from 'lucide-react';
import { getPackageImage, getVehicleImage } from '../utils/imageImports';
import { formatPrice, parseTariff } from '../utils/format';
import { useBooking } from '../context/BookingContext';

/** Tour package styled as a travel ticket: photo, perforation, fare stub. */
export function PackageCard({ pkg, index }) {
  const { openBooking } = useBooking();
  const price = formatPrice(pkg.price);
  const code = String(pkg.name || '').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'MDU';

  return (
    <article className="group card card-hover flex flex-col h-full overflow-visible">
      <Link to={`/packages/${pkg.id}`} className="block relative aspect-[16/11] overflow-hidden rounded-t-[4px] border-b-2 border-ink-900 bg-sand-100" aria-label={`View ${pkg.name}`}>
        <img src={getPackageImage(pkg.image)} alt={pkg.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
        <span className="absolute left-3 top-3 mono text-[11px] font-bold bg-gold-500 text-ink-950 border-2 border-ink-900 px-2 py-0.5">
          {index !== undefined ? `NO. ${String(index + 1).padStart(2, '0')}` : 'TOUR'}
        </span>
      </Link>

      <div className="px-5 pt-5 pb-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
          <span>MDU → {code}</span>
          {pkg.duration && <span>{pkg.duration}</span>}
        </div>
        <h3 className="h-display text-[1.65rem] text-ink-950 mt-2">
          <Link to={`/packages/${pkg.id}`} className="hover:underline decoration-gold-500 decoration-4 underline-offset-4">{pkg.name}</Link>
        </h3>
        {pkg.location && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-600"><MapPin className="w-3.5 h-3.5" aria-hidden /> {pkg.location}</p>
        )}
        {pkg.places && <p className="mt-3 text-sm text-ink-600 line-clamp-2">{pkg.places}</p>}
      </div>

      <div className="ticket-perf mt-auto px-5 py-4 flex items-center justify-between gap-3">
        <div>
          {price ? (
            <>
              <p className="mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Fare from</p>
              <p className="h-display text-[1.7rem] text-ink-950">{price}</p>
            </>
          ) : (
            <p className="mono text-xs font-bold uppercase text-ink-500">Fare on request</p>
          )}
        </div>
        <button type="button" onClick={() => openBooking({ packageType: pkg.name })} className="btn btn-primary !min-h-11 !px-4 !text-sm">
          Book <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}

/** Vehicle shown as a spec sheet with its tariff table. */
export function VehicleCard({ car }) {
  const { openBooking } = useBooking();
  const price = formatPrice(car.price);
  const plans = parseTariff(car.desc);

  return (
    <article className="group card card-hover flex flex-col h-full">
      <div className="relative aspect-[16/10] grid place-items-center p-6 bg-sand-100 border-b-2 border-ink-900 overflow-hidden rounded-t-[4px]">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gold-500/90 border-t-2 border-ink-900" aria-hidden />
        <img src={getVehicleImage(car.image)} alt={car.name} loading="lazy" className="img-zoom relative max-h-full max-w-full object-contain mix-blend-multiply" />
        {price && (
          <span className="absolute right-3 top-3 mono text-xs font-bold bg-ink-900 text-gold-400 px-2 py-1 rounded-[4px]">{price}</span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="h-display text-2xl text-ink-950">{car.name}</h3>
        <ul className="flex flex-wrap gap-2 mt-3">
          {car.seats && <li className="mono text-[11px] font-bold uppercase inline-flex items-center gap-1.5 border-2 border-ink-900 px-2 py-0.5 rounded-[4px]"><Users className="w-3.5 h-3.5" aria-hidden />{car.seats}</li>}
          {car.ac && <li className="mono text-[11px] font-bold uppercase inline-flex items-center gap-1.5 border-2 border-ink-900 px-2 py-0.5 rounded-[4px]"><Snowflake className="w-3.5 h-3.5" aria-hidden />{car.ac}</li>}
        </ul>

        {plans.length > 0 ? (
          <div className="mt-5 border-2 border-ink-900 rounded-[4px] divide-y-2 divide-ink-900">
            {plans.map((plan) => (
              <div key={plan.title}>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.14em] bg-ink-900 text-gold-400 px-3 py-1.5">{plan.title}</p>
                <dl className="px-3 py-2 text-[13px]">
                  {plan.rows.map(([k, v], i) => (
                    <div key={i} className="flex justify-between gap-3 py-0.5">
                      <dt className="text-ink-500">{k}</dt>
                      <dd className="font-bold text-ink-900 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          car.desc && <p className="mt-4 text-sm text-ink-600 line-clamp-3 whitespace-pre-line">{car.desc}</p>
        )}

        <div className="flex-1" />
        <button type="button" onClick={() => openBooking({ vehicle: car.name })} className="btn btn-dark w-full mt-5">
          Book the {car.name} <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
