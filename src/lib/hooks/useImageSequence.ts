'use client';

import { useEffect, useState, useRef } from 'react';

interface UseImageSequenceProps {
  frameCount: number;
  scrollStart?: number; // Position où l'animation commence (en vh)
  scrollEnd?: number; // Position où l'animation se termine (en vh)
}

interface UseImageSequenceReturn {
  currentFrame: number;
  progress: number; // 0 to 1
  isLoaded: boolean;
}

/**
 * Hook pour gérer une séquence d'images basée sur le scroll
 * @param frameCount - Nombre total de frames
 * @param scrollStart - Position de début de l'animation (défaut: 0)
 * @param scrollEnd - Position de fin de l'animation (défaut: 100)
 */
export function useImageSequence({
  frameCount,
  scrollStart = 0,
  scrollEnd = 100,
}: UseImageSequenceProps): UseImageSequenceReturn {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    // Preload toutes les images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `/assets/avatar/frame_${frameNumber}.png`;

        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setIsLoaded(true);
          }
        };

        images.push(img);
      }
    };

    preloadImages();

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [frameCount]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculer la position de scroll en viewport height
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollVh = (scrollY / windowHeight) * 100;

      // Calculer le progrès entre scrollStart et scrollEnd
      let scrollProgress = 0;
      if (scrollVh < scrollStart) {
        scrollProgress = 0;
      } else if (scrollVh > scrollEnd) {
        scrollProgress = 1;
      } else {
        scrollProgress = (scrollVh - scrollStart) / (scrollEnd - scrollStart);
      }

      setProgress(scrollProgress);

      // Calculer la frame actuelle
      const frame = Math.min(
        frameCount - 1,
        Math.floor(scrollProgress * frameCount)
      );

      // Optimisation: ne mettre à jour que si la frame change
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        setCurrentFrame(frame);
      }
    };

    // Throttle pour performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [frameCount, scrollStart, scrollEnd]);

  return { currentFrame, progress, isLoaded };
}
