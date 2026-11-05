/* src/utils/imageImports.js */
// Centralized image imports for the Madurai Best Tours and Travels project
// This file provides mapping objects to resolve image names to imported modules.
// It enables static imports while allowing dynamic lookup based on image filename.

import API_BASE_URL from '../apiConfig.js';

// Vehicle images
import InnovaImg from '../assets/innova_crysta-removebg-preview.png';
import SedanImg from '../assets/sedan_cab-removebg-preview.png';
import SuvImg from '../assets/suv-removebg-preview.png';
import EtiosImg from '../assets/toyota_etios-removebg-preview.png';
import TravellerImg from '../assets/trmpo_traveller-removebg-preview.png';

import Car1 from '../assets/car 1.jpeg';
import Car2 from '../assets/car 2.jpeg';
import Car3 from '../assets/car 3.png';
import Car4 from '../assets/car 4.jpg';
import Car5 from '../assets/car 5.jpeg';
import Car6 from '../assets/car 6.jpeg';

export const vehicleImageMap = {
  'innova_crysta-removebg-preview.png': InnovaImg,
  'sedan_cab-removebg-preview.png': SedanImg,
  'suv-removebg-preview.png': SuvImg,
  'toyota_etios-removebg-preview.png': EtiosImg,
  'tempo_traveller-removebg-preview.png': TravellerImg,
  'car 1.jpeg': Car1,
  'car 2.jpeg': Car2,
  'car 3.png': Car3,
  'car 4.jpg': Car4,
  'car 5.jpeg': Car5,
  'car 6.jpeg': Car6
};

// Background images for vehicles and packages
import MeenakshiBg from '../assets/meenakshi_bg.png';
import MaduraiAerialBg from '../assets/madurai_aerial_bg.png';
import ThirumalaiBg from '../assets/thirumalai_mahal_bg.png';
import RameswaramBg from '../assets/rameswaram_bg.png';
import KodaikanalBg from '../assets/kodaikanal_bg.png';
import OotyBg from '../assets/ooty_bg.png';
import KanyakumariBg from '../assets/kanyakumari_bg.png';
import MunnarBg from '../assets/munnar_bg.png';
import ThanjavurBg from '../assets/thanjavur_bg.png';

export const bgImageMap = {
  'meenakshi_bg.png': MeenakshiBg,
  'madurai_aerial_bg.png': MaduraiAerialBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'rameswaram_bg.png': RameswaramBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'ooty_bg.png': OotyBg,
  'kanyakumari_bg.png': KanyakumariBg,
  'munnar_bg.png': MunnarBg,
  'thanjavur_bg.png': ThanjavurBg
};

// Package images (reuse some background images)
export const packageImageMap = {
  'hero.png': '../assets/hero.png', // direct path for lazy loading if needed
  'madurai_aerial_bg.png': MaduraiAerialBg,
  'meenakshi_bg.png': MeenakshiBg,
  'thirumalai_mahal_bg.png': ThirumalaiBg,
  'rameswaram_bg.png': RameswaramBg,
  'kodaikanal_bg.png': KodaikanalBg,
  'ooty_bg.png': OotyBg,
  'kanyakumari_bg.png': KanyakumariBg,
  'munnar_bg.png': MunnarBg,
  'thanjavur_bg.png': ThanjavurBg
};

// Helper functions
const resolveImage = (name, staticMap, fallback) => {
  if (!name) return fallback;
  if (name.startsWith('data:') || name.startsWith('http')) return name;
  if (name.startsWith('/uploads/')) return `${API_BASE_URL}${name}`;
  return staticMap[name] || fallback;
};

export const getVehicleImage = (name) => resolveImage(name, vehicleImageMap, SedanImg);
export const getBgImage = (name) => resolveImage(name, bgImageMap, KanyakumariBg);
export const getPackageImage = (name) => resolveImage(name, packageImageMap, MeenakshiBg);
