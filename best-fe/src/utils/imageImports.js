/* src/utils/imageImports.js */
// Resolves image names stored in the database (cars.image, cars.bgImage, packages.image)
// to bundled, optimised WebP assets. Uploaded images (/uploads/...) and absolute URLs
// pass through unchanged.

import API_BASE_URL from '../apiConfig.js';

import InnovaImg from '../assets/opt/innova-cutout.webp';
import SedanImg from '../assets/opt/sedan-cutout.webp';
import SuvImg from '../assets/opt/suv-cutout.webp';
import EtiosImg from '../assets/opt/etios-cutout.webp';
import TravellerImg from '../assets/opt/tempo-cutout.webp';

import Car1 from '../assets/opt/car-1.webp';
import Car2 from '../assets/opt/car-2.webp';
import Car3 from '../assets/opt/car-3.webp';
import Car4 from '../assets/opt/car-4.webp';
import Car5 from '../assets/opt/car-5.webp';
import Car6 from '../assets/opt/car-6.webp';

import MeenakshiBg from '../assets/opt/meenakshi.webp';
import MaduraiAerialBg from '../assets/opt/madurai-aerial.webp';
import ThirumalaiBg from '../assets/opt/thirumalai.webp';
import RameswaramBg from '../assets/opt/rameswaram.webp';
import KodaikanalBg from '../assets/opt/kodaikanal.webp';
import OotyBg from '../assets/opt/ooty.webp';
import KanyakumariBg from '../assets/opt/kanyakumari.webp';
import MunnarBg from '../assets/opt/munnar.webp';
import ThanjavurBg from '../assets/opt/thanjavur.webp';
import KeralaBg from '../assets/opt/kerala.webp';
import HeroBg from '../assets/opt/hero-south-india.webp';

export const vehicleImageMap = {
  'innova_crysta-removebg-preview.png': InnovaImg,
  'sedan_cab-removebg-preview.png': SedanImg,
  'suv-removebg-preview.png': SuvImg,
  'toyota_etios-removebg-preview.png': EtiosImg,
  'tempo_traveller-removebg-preview.png': TravellerImg,
  'trmpo_traveller-removebg-preview.png': TravellerImg,
  'car 1.jpeg': Car1,
  'car 2.jpeg': Car2,
  'car 3.png': Car3,
  'car 4.jpg': Car4,
  'car 5.jpeg': Car5,
  'car 6.jpeg': Car6,
};

export const bgImageMap = {
  'meenakshi_bg.png': MeenakshiBg,
  'madurai_aerial_bg.png': MaduraiAerialBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'rameswaram_bg.png': RameswaramBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'ooty_bg.png': OotyBg,
  'kanyakumari_bg.png': KanyakumariBg,
  'munnar_bg.png': MunnarBg,
  'thanjavur_bg.png': ThanjavurBg,
  'kerala_bg.png': KeralaBg,
};

export const packageImageMap = {
  ...bgImageMap,
  'hero.png': HeroBg,
  'cinematic_south_india.png': HeroBg,
};

const resolveImage = (name, staticMap, fallback) => {
  if (!name) return fallback;
  if (name.startsWith('data:') || name.startsWith('http')) return name;
  if (name.startsWith('/uploads/')) return `${API_BASE_URL}${name}`;
  return staticMap[name] || fallback;
};

export const getVehicleImage = (name) => resolveImage(name, vehicleImageMap, SedanImg);
export const getBgImage = (name) => resolveImage(name, bgImageMap, KanyakumariBg);
export const getPackageImage = (name) => resolveImage(name, packageImageMap, MeenakshiBg);
