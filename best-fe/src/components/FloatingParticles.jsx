import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  // Generate random particles statically once on mount
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const startX = Math.random() * 100; // 0 to 100%
      const startY = Math.random() * 100;
      const driftX = Math.random() * 10 - 5; // -5% to +5% drift
      return {
        id: i,
        size: Math.random() * 3 + 1, // 1px to 4px
        startX,
        startY,
        endX: startX + driftX,
        endY: startY - 20, // Float upwards by 20%
        duration: Math.random() * 15 + 15, // 15s to 30s
        delay: Math.random() * 5,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            x: `${p.startX}vw`,
            y: `${p.startY}vh`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            x: `${p.endX}vw`,
            y: `${p.endY}vh`,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full bg-yellow-400 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(250, 204, 21, 0.6)`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;

