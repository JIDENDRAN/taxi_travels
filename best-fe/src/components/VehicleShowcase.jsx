import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, RefreshCw, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import InnovaImg from '../assets/innova_crysta-removebg-preview.png';
import SedanImg from '../assets/sedan_cab-removebg-preview.png';
import SuvImg from '../assets/suv-removebg-preview.png';
import TravellerImg from '../assets/trmpo_traveller-removebg-preview.png';

const showcaseVehicles = [
  { 
    id: 1, 
    name: 'Premium SUV', 
    seats: '7 Seater', 
    engine: '2.8L Auto / Quad-Motor Electric Sim', 
    power: 'G-Turn Enabled 360°', 
    desc: 'Perfect for rugged offroad trips and ultimate luxury comfort.', 
    image: SuvImg 
  },
  { 
    id: 2, 
    name: 'Innova Crysta', 
    seats: '7 Seater', 
    engine: '2.4L Diesel Comfort-Drive', 
    power: 'Ultra Smooth Touring', 
    desc: 'The gold standard in corporate and family long-distance travel.', 
    image: InnovaImg 
  },
  { 
    id: 3, 
    name: 'Swift Dzire', 
    seats: '4 Seater', 
    engine: '1.2L DualJet Mileage King', 
    power: 'Agile City Cruiser', 
    desc: 'Highly economical sedan for quick outstation and local transit.', 
    image: SedanImg 
  },
  { 
    id: 4, 
    name: 'Tempo Traveller', 
    seats: '12 Seater', 
    engine: '2.6L Turbo-Charged Force', 
    power: 'Spacious Group Tourer', 
    desc: 'Ideal for extended family trips, pilgrimages, and group tourism.', 
    image: TravellerImg 
  }
];

const backgrounds = [
  { id: 'showroom', label: 'Neon Showroom', class: 'from-slate-950 via-slate-900 to-[#0e1624] border-cyan-500/20' },
  { id: 'highway', label: 'Heritage Highway', class: 'from-sky-950 via-slate-900 to-emerald-950 border-emerald-500/20' },
  { id: 'offroad', label: 'Adventure Offroad', class: 'from-amber-950 via-stone-900 to-orange-950 border-amber-500/20' }
];

const VehicleShowcase = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBg, setActiveBg] = useState('showroom');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [dragRotation, setDragRotation] = useState(0);

  const activeVehicle = showcaseVehicles[currentIndex];

  const next = () => {
    if (isSpinning) return;
    setCurrentIndex((prev) => (prev + 1) % showcaseVehicles.length);
    setDragRotation(0);
    setSpinAngle(0);
  };

  const prev = () => {
    if (isSpinning) return;
    setCurrentIndex((prev) => (prev - 1 + showcaseVehicles.length) % showcaseVehicles.length);
    setDragRotation(0);
    setSpinAngle(0);
  };

  // Simulate G-Turn tank spin with high-fidelity camera rumble & friction sparks
  const handleGTurn = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setIsShaking(true);
    setSpinAngle(0);
    setDragRotation(0);

    // Dynamic camera rumble interval
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      setIsShaking((prev) => !prev);
      shakeCount++;
      if (shakeCount > 24) {
        clearInterval(shakeInterval);
        setIsShaking(false);
      }
    }, 100);

    // Friction sparks spawning simulator
    const sparkInterval = setInterval(() => {
      const newSparks = Array.from({ length: 12 }).map((_, i) => ({
        id: Math.random(),
        x: Math.random() * 200 - 100, // Spawn around tires
        y: Math.random() * 20 + 20,
        color: activeBg === 'showroom' ? 'bg-cyan-400' : activeBg === 'offroad' ? 'bg-amber-500' : 'bg-yellow-400',
        scale: Math.random() * 0.8 + 0.3,
        duration: Math.random() * 0.6 + 0.4
      }));
      setSparks((prev) => [...prev, ...newSparks].slice(-60));
    }, 150);

    // Rotation angle animator
    let angle = 0;
    const animateAngle = () => {
      angle += 6;
      setSpinAngle(angle);
      if (angle < 360) {
        requestAnimationFrame(animateAngle);
      } else {
        clearInterval(sparkInterval);
        setTimeout(() => {
          setIsSpinning(false);
          setSpinAngle(0);
          setSparks([]);
        }, 300);
      }
    };
    
    requestAnimationFrame(animateAngle);
  };

  // Manual Drag Rotation tracker
  const handleDrag = (event, info) => {
    if (isSpinning) return;
    // Calculate new rotation based on drag offset
    const delta = info.delta.x * 0.8;
    setDragRotation((prev) => (prev + delta) % 360);
  };

  return (
    <section className="bg-slate-950 py-24 relative overflow-hidden text-white font-roboto">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-yellow-400/30 text-yellow-400 font-bold mb-4 text-xs tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" /> Advanced Engineering
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-black mb-4">
            360° <span className="text-yellow-400">{t('Vehicle Interactive View')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {t('Interact directly with our luxury fleet. Drag to rotate or trigger the full G-Turn simulation to experience raw performance!')}
          </p>
        </div>

        {/* Showcase Core Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main 360 Interactive Stage */}
          <div className="lg:col-span-8 w-full">
            
            {/* Terrain & Environment Selectors */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => !isSpinning && setActiveBg(bg.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                    activeBg === bg.id 
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-md' 
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                  disabled={isSpinning}
                >
                  {t(bg.label)}
                </button>
              ))}
            </div>

            {/* Simulated Stage Box */}
            <motion.div
              animate={{ 
                x: isShaking ? [-3, 3, -2, 2, 0] : 0,
                y: isShaking ? [2, -2, 1, -1, 0] : 0
              }}
              transition={{ duration: 0.1, repeat: isShaking ? Infinity : 0 }}
              className={`relative h-[480px] w-full flex flex-col items-center justify-center bg-gradient-to-b ${
                backgrounds.find(b => b.id === activeBg).class
              } rounded-[40px] border shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-1000 group/stage`}
            >
              
              {/* Overlay Terrain Grids */}
              {activeBg === 'showroom' && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(14,22,36,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(14,22,36,0.3)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 z-0 pointer-events-none" />
              )}
              {activeBg === 'highway' && (
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center mix-blend-color-dodge" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800')` }} />
              )}
              {activeBg === 'offroad' && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-overlay animate-pulse" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800')`, animationDuration: '6s' }} />
              )}

              {/* Status HUD Info Box */}
              <div className="absolute top-6 left-8 z-20 hidden md:block">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-slate-400 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSpinning ? 'bg-yellow-400 animate-ping' : 'bg-green-500'} shadow-sm`} />
                  SYSTEM STATUS: {isSpinning ? 'G-TURN / 360° SPINNING' : 'DRAG TO ROTATE / READY'}
                </div>
              </div>

              {/* Stage Lighting Rings */}
              <div className="absolute top-6 right-8 z-20 flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 flex items-center justify-center text-yellow-400 hover:scale-105 cursor-pointer shadow-md" title="Engine Info">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              {/* Stage Navigation Arrows */}
              <button 
                onClick={prev} 
                className="absolute left-6 z-30 w-12 h-12 bg-slate-900/80 border border-slate-800 hover:bg-yellow-400 hover:text-slate-950 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                disabled={isSpinning}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Main Rotating Showcase Object Area */}
              <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] z-10 select-none">
                
                {/* 360 Platform Ring underneath vehicle */}
                <div 
                  className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-[75%] h-[120px] rounded-full border-2 bg-slate-950/30 transition-all duration-700 ${
                    isSpinning 
                      ? 'border-yellow-400/60 shadow-[0_0_50px_rgba(250,204,21,0.25)]' 
                      : 'border-slate-800/40 shadow-inner'
                  }`}
                  style={{ transform: "rotateX(78deg)" }}
                >
                  {/* Platform Spin Tracker Grid */}
                  <motion.div 
                    animate={{ rotate: isSpinning ? spinAngle : dragRotation }}
                    className="absolute inset-2 rounded-full border border-dashed border-slate-800/60 flex items-center justify-center"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/50 absolute left-0" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/50 absolute right-0" />
                  </motion.div>

                  {/* Laser Scanning Ring */}
                  <div className="absolute inset-0 rounded-full border border-yellow-400/20 animate-ping" style={{ animationDuration: '3.5s' }} />
                </div>

                {/* Tire Spark Particle Trail */}
                <AnimatePresence>
                  {sparks.map((spark) => (
                    <motion.div
                      key={spark.id}
                      initial={{ opacity: 1, scale: spark.scale, x: spark.x, y: spark.y }}
                      animate={{ opacity: 0, scale: 0.1, y: spark.y - 120, x: spark.x + (Math.random() * 100 - 50) }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: spark.duration, ease: "easeOut" }}
                      className={`absolute bottom-28 w-2 h-2 rounded-full ${spark.color} blur-[1.5px] z-20 pointer-events-none`}
                    />
                  ))}
                </AnimatePresence>

                {/* Main Vehicle Image Container with Interactive Mouse Drag */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.05}
                  onDrag={handleDrag}
                  style={{ 
                    rotateY: isSpinning ? spinAngle : dragRotation,
                    cursor: isSpinning ? 'not-allowed' : 'grab'
                  }}
                  whileTap={{ cursor: isSpinning ? 'not-allowed' : 'grabbing' }}
                  className="relative z-10 w-[70%] max-w-[550px] transition-shadow duration-500 flex flex-col items-center justify-center filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
                >
                  <img 
                    src={activeVehicle.image} 
                    alt={activeVehicle.name} 
                    className="w-full h-auto object-contain pointer-events-none brightness-110 contrast-105"
                  />
                  {/* Glass reflections overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 mix-blend-overlay rounded-2xl pointer-events-none" />
                </motion.div>

                {/* Tire Burn Marks overlay inside the offroad theme */}
                {isSpinning && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0.4] }}
                    transition={{ duration: 1.5 }}
                    className="absolute bottom-20 w-[60%] h-12 bg-black/60 rounded-full blur-[8px] z-0 pointer-events-none"
                    style={{ transform: 'rotateX(75deg)' }}
                  />
                )}

                {/* Immersive HUD Center Dial Overlay */}
                <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" />
              </div>

              {/* Stage Navigation Arrows (Right) */}
              <button 
                onClick={next} 
                className="absolute right-6 z-30 w-12 h-12 bg-slate-900/80 border border-slate-800 hover:bg-yellow-400 hover:text-slate-950 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                disabled={isSpinning}
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* Stage Control Tray (G-Turn Action Button) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-400 font-bold">Performance Switch</span>
                  <span className="text-sm font-poppins font-bold text-white">{activeVehicle.name}</span>
                </div>
                
                <button
                  onClick={handleGTurn}
                  disabled={isSpinning}
                  className={`px-6 py-2.5 rounded-xl font-bold font-poppins flex items-center gap-2 shadow-lg transition-all transform active:scale-95 ${
                    isSpinning 
                      ? 'bg-red-500 text-white cursor-not-allowed animate-pulse' 
                      : 'bg-yellow-400 text-slate-950 hover:bg-yellow-500 shadow-yellow-400/25 hover:scale-105 cursor-pointer'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? t('G-TURN IN PROGRESS') : t('ACTIVATE G-TURN SPIN')}
                </button>
              </div>

            </motion.div>
          </div>

          {/* Vehicle Tech Specifications Panel */}
          <div className="lg:col-span-4 w-full flex flex-col gap-6">
            
            {/* Spec Sheet Box */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-slate-800/80 text-left shadow-xl"
            >
              <h3 className="text-2xl font-poppins font-black text-white mb-2">{activeVehicle.name}</h3>
              <p className="text-sm text-yellow-400 uppercase font-mono font-bold tracking-wider mb-6 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {activeVehicle.power}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{activeVehicle.desc}</p>

              <div className="space-y-4 pt-6 border-t border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Seats Capacity</span>
                  <span className="text-sm font-semibold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{activeVehicle.seats}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Drive Powertrain</span>
                  <span className="text-sm font-semibold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{activeVehicle.engine}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ac System</span>
                  <span className="text-sm font-semibold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">Premium Climate-AC</span>
                </div>
              </div>
            </motion.div>

            {/* Compact Selector Slider */}
            <div className="grid grid-cols-4 gap-3">
              {showcaseVehicles.map((vehicle, idx) => (
                <button 
                  key={vehicle.id}
                  onClick={() => !isSpinning && setCurrentIndex(idx)}
                  disabled={isSpinning}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all p-1 hover:scale-105 active:scale-95 ${
                    currentIndex === idx 
                      ? 'border-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
                      : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                  } ${isSpinning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  <div className="aspect-[4/3] bg-white rounded-xl flex items-center justify-center p-1.5 overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-contain brightness-105"
                    />
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
