// Central business facts & content used across the public site.
// Keep every factual claim here so it is edited in one place.

import Meenakshi from '../assets/opt/meenakshi.webp';
import Rameswaram from '../assets/opt/rameswaram.webp';
import Kodaikanal from '../assets/opt/kodaikanal.webp';
import Munnar from '../assets/opt/munnar.webp';
import Kanyakumari from '../assets/opt/kanyakumari.webp';
import Ooty from '../assets/opt/ooty.webp';
import Alleppey from '../assets/opt/alleppey.webp';
import Thanjavur from '../assets/opt/thanjavur.webp';

import T1 from '../assets/opt/traveller-1.webp';
import T2 from '../assets/opt/traveller-2.webp';
import T3 from '../assets/opt/traveller-3.webp';
import T5 from '../assets/opt/traveller-5.webp';
import T6 from '../assets/opt/traveller-6.webp';
import T7 from '../assets/opt/traveller-7.webp';
import T11 from '../assets/opt/traveller-11.webp';
import T13 from '../assets/opt/traveller-13.webp';
import T17 from '../assets/opt/traveller-17.webp';
import T20 from '../assets/opt/traveller-20.webp';

export const SITE = {
  name: 'Madurai Best Taxi Travels',
  shortName: 'Madurai Best',
  phoneDisplay: '+91 63825 13075',
  phoneHref: 'tel:+916382513075',
  whatsappNumber: '916382513075',
  whatsappHref: 'https://wa.me/916382513075',
  email: 'maduraibesttoursandtravels01@gmail.com',
  addressLines: ['No. 18, Kovalan Nagar Last', 'Muniyandi Street, Palanganatham', 'Madurai, Tamil Nadu 625003'],
  since: 2015,
  googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJyXG_6UZaADsR0Lq9mO32ZYo',
  instagram: 'https://www.instagram.com/maduraibesttourstravels',
  mapsUrl: 'https://maps.google.com/?q=Madurai+Best+Tours+and+Travels',
};

export const whatsappLink = (text) =>
  `${SITE.whatsappHref}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// `header: false` links appear in the mobile menu and footer, not the desktop header.
export const NAV_LINKS = [
  { name: 'Cabs', path: '/' },
  { name: 'Tour Packages', path: '/packages' },
  { name: 'Airport Taxi', path: '/madurai-airport-taxi' },
  { name: 'Fleet', path: '/vehicles' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about', header: false },
  { name: 'Contact', path: '/contact' },
  { name: 'Admin Portal', path: '/admin/dashboard', header: false },
];

export const TRIP_TYPES = [
  { id: 'oneway', label: 'One-way' },
  { id: 'roundtrip', label: 'Round trip' },
  { id: 'airport', label: 'Airport' },
  { id: 'local', label: 'Local hourly' },
];

// Destinations served (see areaServed in index.html + package catalogue).
// `query` is matched against package name/places on the Packages page.
export const DESTINATIONS = [
  { name: 'Madurai', region: 'Tamil Nadu', note: 'Meenakshi Amman Temple & the old city', image: Meenakshi, query: 'Madurai' },
  { name: 'Rameswaram', region: 'Tamil Nadu', note: 'Island temple, Pamban Bridge, Dhanushkodi', image: Rameswaram, query: 'Rameswaram' },
  { name: 'Kodaikanal', region: 'Tamil Nadu', note: 'Lake, pine forests and misty viewpoints', image: Kodaikanal, query: 'Kodaikanal' },
  { name: 'Munnar', region: 'Kerala', note: 'Rolling tea estates in the Western Ghats', image: Munnar, query: 'Munnar' },
  { name: 'Kanyakumari', region: 'Tamil Nadu', note: 'Sunrise where three seas meet', image: Kanyakumari, query: 'Kanyakumari' },
  { name: 'Ooty', region: 'Tamil Nadu', note: 'Nilgiri hills and the toy train', image: Ooty, query: 'Ooty' },
  { name: 'Alleppey', region: 'Kerala', note: 'Backwaters and houseboat stays', image: Alleppey, query: 'Alleppey' },
  { name: 'Thanjavur', region: 'Tamil Nadu', note: 'Brihadeeswarar Temple, a UNESCO site', image: Thanjavur, query: 'Thanjavur' },
];

// Route landing pages that already exist in the app.
// Distances are approximate road distances from Madurai.
export const POPULAR_ROUTES = [
  { label: 'Madurai Airport transfer', detail: 'IXM pickup & drop, 24/7', path: '/madurai-airport-taxi', destination: 'Madurai Airport (IXM)' },
  { label: 'Madurai → Rameswaram', detail: 'approx. 175 km · 3–3.5 hrs', path: '/madurai-to-rameswaram-taxi', destination: 'Rameswaram' },
  { label: 'Madurai → Kodaikanal', detail: 'approx. 120 km · ghat road', path: '/madurai-to-kodaikanal-taxi', destination: 'Kodaikanal' },
  { label: 'Tempo Traveller hire', detail: 'Group & family trips', path: '/tempo-traveller-rental-madurai', destination: '' },
  { label: 'Madurai city taxi', detail: 'Local & outstation cabs', path: '/madurai-taxi-service', destination: '' },
  { label: 'Madurai tour packages', detail: 'Temple & hill circuits', path: '/madurai-tour-packages', destination: '' },
];

// Real photos shared by customers on their trips.
export const TRAVELLER_PHOTOS = [
  { src: T1, alt: 'A family of travellers posing with their cab on a bridge' },
  { src: T17, alt: 'Our driver with a guest at Madurai Airport' },
  { src: T3, alt: 'Guests with a Toyota Innova Crysta before their tour' },
  { src: T6, alt: 'A family with our driver during their trip' },
  { src: T5, alt: 'Travellers at a seaside viewpoint at sunset' },
  { src: T20, alt: 'A group of guests with our chauffeur' },
  { src: T2, alt: 'A family with our driver on the road' },
  { src: T11, alt: 'Guests enjoying a boat ride' },
  { src: T7, alt: 'A senior family group with our driver' },
  { src: T13, alt: 'Travellers ready to depart from the airport' },
];

export const SERVICE_PILLARS = [
  { title: 'Available 24/7', text: 'Bookings, airport pickups and on-trip support at any hour.', icon: 'clock' },
  { title: 'Experienced drivers', text: 'Chauffeurs who know temple timings and ghat roads first-hand.', icon: 'steering' },
  { title: 'Clean, AC vehicles', text: 'Sedans, SUVs and Tempo Travellers cleaned before every trip.', icon: 'sparkle' },
  { title: 'Clear quotes', text: 'Your fare is confirmed with you before the trip starts.', icon: 'receipt' },
];
