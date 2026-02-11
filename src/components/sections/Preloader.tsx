'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const LOADER_FRAMES = [
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

const MIN_DISPLAY_MS = 800;

interface PreloaderProps {
  onLoadComplete: () => void;
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [loaderFrame, setLoaderFrame] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setLoaderFrame((prev) => (prev + 1) % LOADER_FRAMES.length);
    }, 100);

    const exit = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadComplete, 600);
      }, remaining);
    };

    // If already loaded, exit after minimum display time
    if (document.readyState === 'complete') {
      exit();
    } else {
      window.addEventListener('load', exit);
    }

    return () => {
      clearInterval(frameInterval);
      window.removeEventListener('load', exit);
    };
  }, [onLoadComplete]);

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
              {LOADER_FRAMES[loaderFrame]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
