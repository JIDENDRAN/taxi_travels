/** Tidies "₹2,499", "2499", "Rs 2499" into "₹2,499" without inventing a price. */
export function formatPrice(price) {
  if (price === null || price === undefined || price === '') return '';
  const raw = String(price).trim();
  const num = Number(raw.replace(/[^\d.]/g, ''));
  if (!raw.replace(/[^\d]/g, '') || Number.isNaN(num)) return raw;
  if (/[a-z/]/i.test(raw.replace(/rs\.?/i, ''))) return raw; // e.g. "₹12/km" or "On request": keep as entered
  return `₹${num.toLocaleString('en-IN')}`;
}

/** Splits a free-text "places" field into a list. */
export const splitPlaces = (places) =>
  String(places || '')
    .split(/[,•|\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Rough number of days in a duration like "2 Days / 120 KM" or "8 Hours / 80 KM". */
export function durationDays(duration) {
  const s = String(duration || '');
  const d = s.match(/(\d+)\s*d(ay)?s?/i);
  if (d) return Number(d[1]);
  if (/hour|hrs?\b/i.test(s)) return 1;
  return null;
}

/**
 * Parses vehicle tariff text such as
 *   "[Outstation Plan]\nRate: ₹19/km\nMin Distance: Above 300 kms\n\n[Day Rental Plan]\nBase Rent: Rs. 2300"
 * into [{ title, rows: [[label, value]] }]. Returns [] when the text isn't in that shape.
 */
export function parseTariff(text) {
  const src = String(text || '').trim();
  if (!/^\[.+\]/m.test(src)) return [];
  const plans = [];
  let current = null;
  for (const raw of src.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const head = line.match(/^\[(.+)\]$/);
    if (head) {
      current = { title: head[1].replace(/\s*plan$/i, '').trim(), rows: [] };
      plans.push(current);
    } else if (current) {
      const i = line.indexOf(':');
      current.rows.push(i > -1 ? [line.slice(0, i).trim(), line.slice(i + 1).trim()] : ['', line]);
    }
  }
  return plans;
}
