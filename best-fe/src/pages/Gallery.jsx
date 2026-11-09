import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Hero from '../assets/opt/thirumalai-wide.webp';
import G1 from '../assets/opt/gallery-1.webp';
import G2 from '../assets/opt/gallery-2.webp';
import G3 from '../assets/opt/gallery-3.webp';
import G4 from '../assets/opt/gallery-4.webp';
import G5 from '../assets/opt/gallery-5.webp';
import G6 from '../assets/opt/gallery-6.webp';
import G7 from '../assets/opt/gallery-7.webp';
import G8 from '../assets/opt/gallery-8.webp';
import Meenakshi from '../assets/opt/meenakshi.webp';
import Rameswaram from '../assets/opt/rameswaram.webp';
import Kodaikanal from '../assets/opt/kodaikanal.webp';
import Munnar from '../assets/opt/munnar.webp';
import Thanjavur from '../assets/opt/thanjavur.webp';
import Alleppey from '../assets/opt/alleppey.webp';
import { TRAVELLER_PHOTOS } from '../data/site';
import { CtaBand, PageHero } from '../components/ui';

const PLACES = [
  { src: G8, title: 'Meenakshi Amman Temple from above', place: 'Madurai' },
  { src: G7, title: 'Vandiyur Mariamman Teppakulam', place: 'Madurai' },
  { src: G2, title: 'Thirumalai Nayakkar Mahal', place: 'Madurai' },
  { src: G3, title: 'Gandhi Memorial Museum', place: 'Madurai' },
  { src: G1, title: 'Vivekananda Rock & Thiruvalluvar Statue', place: 'Kanyakumari' },
  { src: G5, title: 'Dam and reservoir views', place: 'Tamil Nadu' },
  { src: G6, title: 'Hillside temple and tank', place: 'Tamil Nadu' },
  { src: G4, title: 'Gardens at golden hour', place: 'Tamil Nadu' },
  { src: Meenakshi, title: 'Temple gopurams at dusk', place: 'Madurai' },
  { src: Rameswaram, title: 'Island temple & Pamban Bridge', place: 'Rameswaram' },
  { src: Kodaikanal, title: 'Misty lake valley', place: 'Kodaikanal' },
  { src: Munnar, title: 'Tea estates', place: 'Munnar' },
  { src: Thanjavur, title: 'Brihadeeswarar Temple', place: 'Thanjavur' },
  { src: Alleppey, title: 'Backwater houseboat', place: 'Alleppey' },
];

const TRAVELLERS = TRAVELLER_PHOTOS.map((p) => ({ src: p.src, title: p.alt, place: 'Our guests' }));

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'places', label: 'Places' },
  { id: 'travellers', label: 'Our travellers' },
];

const Gallery = () => {
  const [tab, setTab] = useState('all');
  const [index, setIndex] = useState(null);

  const items = useMemo(() => {
    if (tab === 'places') return PLACES;
    if (tab === 'travellers') return TRAVELLERS;
    // interleave so guests' photos sit among the scenery
    const out = [];
    const max = Math.max(PLACES.length, TRAVELLERS.length);
    for (let i = 0; i < max; i++) {
      if (PLACES[i]) out.push(PLACES[i]);
      if (i % 2 === 1 && TRAVELLERS[(i - 1) / 2]) out.push(TRAVELLERS[(i - 1) / 2]);
    }
    return out.concat(TRAVELLERS.slice(Math.ceil(max / 2)));
  }, [tab]);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our gallery"
        intro="Scenes from across Tamil Nadu and Kerala — and photos our guests shared from their trips."
        image={Hero}
        crumbs={['Gallery']}
      />

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar" role="tablist" aria-label="Gallery filter">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${tab === t.id ? 'bg-forest-700 text-white border-forest-700' : 'bg-white text-ink-700 border-sand-200 hover:border-forest-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
            {items.map((item, i) => (
              <motion.button
                key={`${tab}-${i}`}
                type="button"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3) }}
                onClick={() => setIndex(i)}
                className="group relative block w-full break-inside-avoid bg-white border border-sand-200 p-2 pb-3 rounded-[14px] shadow-[var(--shadow-soft)] cursor-zoom-in text-left transition-transform hover:-translate-y-1"
                aria-label={`Open photo: ${item.title}`}
              >
                <span className="block overflow-hidden border border-sand-200"><img src={item.src} alt={item.title} loading="lazy" className="w-full h-auto img-zoom" /></span>
                <span className="block px-1 pt-2">
                  <span className="block text-xs font-semibold text-ink-500">{item.place}</span>
                  <span className="block text-sm font-bold text-ink-950 leading-snug line-clamp-2">{item.title}</span>
                </span>
                </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-950 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={close}
          >
            <div className="flex items-center justify-between p-4 text-white" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm text-ink-200">{index + 1} / {items.length}</p>
              <button onClick={close} className="p-2 rounded-full hover:bg-white/10 cursor-pointer" aria-label="Close"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16 relative">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-h-full max-w-full object-contain rounded-[12px]"
                onClick={(e) => e.stopPropagation()}
              />
              <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 sm:left-4 w-12 h-12 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer" aria-label="Previous photo"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 sm:right-4 w-12 h-12 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer" aria-label="Next photo"><ChevronRight className="w-6 h-6" /></button>
            </div>
            <div className="p-4 sm:p-6 text-center text-white" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-300">{current.place}</p>
              <p className="font-semibold mt-1">{current.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBand title="Make your own memories." />
    </>
  );
};

export default Gallery;
