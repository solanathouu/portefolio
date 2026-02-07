'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onLoadComplete: () => void;
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [loaderFrame, setLoaderFrame] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // ASCII loader frames
  const loaderFrames = [
    '--=-=++=--=-',
    '-=--=++=--=-',
    '=--=-++=--=-',
    '=--=++=--=--',
    '--=-++=--=-=',
    '--=++=--=-=-',
    '-=++=--=-=--',
    '=++=--=-=--=',
    '++=--=-=--=-',
    '+=--=-=--=+',
    '=--=-=--=++',
    '--=-=--=++=',
  ];

  useEffect(() => {
    // Animate the loader
    const frameInterval = setInterval(() => {
      setLoaderFrame((prev) => (prev + 1) % loaderFrames.length);
    }, 100);

    // Complete loading after 2.5 seconds
    const loadingTimeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadComplete, 600);
    }, 2500);

    return () => {
      clearInterval(frameInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadComplete, loaderFrames.length]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#303030',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Minimalist ASCII Loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 100000,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '2rem',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
                letterSpacing: '0.3em',
              }}
            >
              {loaderFrames[loaderFrame]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
