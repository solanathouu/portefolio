'use client';

import Avatar3DLocked from '@/components/avatar/Avatar3DLocked';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section
      id="hero"
      className="relative"
      style={{
        minHeight: animationComplete ? '200vh' : '100vh',
        backgroundColor: '#303030' // Anthracite
      }}
    >
      {/* Sticky container pour l'avatar */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Texte NATHAN en arrière-plan avec effet glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 0 }}
        >
          <h1
            className="font-black tracking-tighter"
            style={{
              fontSize: 'clamp(8rem, 20vw, 18rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
              textStroke: '2px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(2px)',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.05)',
            }}
          >
            NATHAN
          </h1>
        </motion.div>

        {/* Avatar centré */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl mx-auto px-6"
          style={{ height: '700px', zIndex: 10 }}
        >
          <Avatar3DLocked
            frameCount={173}
            onAnimationComplete={() => setAnimationComplete(true)}
            className="w-full h-full"
          />

          {/* Glow effect derrière l'avatar */}
          <div className="absolute inset-0 bg-primary/10 blur-[120px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
