'use client';

import { useEffect, useState, useRef } from 'react';

interface UseScrollLockAnimationProps {
  frameCount: number;
  onComplete?: () => void;
}

interface UseScrollLockAnimationReturn {
  currentFrame: number;
  isAnimationComplete: boolean;
  progress: number;
}

/**
 * Hook pour bloquer le scroll et contrôler une animation de frames
 * Le scroll est bloqué jusqu'à ce que toutes les frames aient été affichées
 */
export function useScrollLockAnimation({
  frameCount,
  onComplete,
}: UseScrollLockAnimationProps): UseScrollLockAnimationReturn {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const accumulatedScrollRef = useRef(0);
  const scrollSensitivity = 3; // Plus petit = plus sensible

  useEffect(() => {
    if (isAnimationComplete) return;

    const handleWheel = (e: WheelEvent) => {
      // Bloquer le scroll par défaut
      e.preventDefault();

      // Accumuler le scroll
      accumulatedScrollRef.current += e.deltaY;

      // Calculer la frame actuelle basée sur le scroll accumulé
      const scrollPerFrame = scrollSensitivity;
      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(accumulatedScrollRef.current / scrollPerFrame))
      );

      setCurrentFrame(newFrame);

      // Si on a atteint la dernière frame, débloquer le scroll
      if (newFrame >= frameCount - 1) {
        setIsAnimationComplete(true);
        onComplete?.();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isAnimationComplete) return;
      const touch = e.touches[0];
      accumulatedScrollRef.current = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimationComplete) return;

      e.preventDefault();
      const touch = e.touches[0];
      const delta = accumulatedScrollRef.current - touch.clientY;

      const scrollPerFrame = scrollSensitivity * 2;
      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(Math.abs(delta) / scrollPerFrame))
      );

      setCurrentFrame(newFrame);

      if (newFrame >= frameCount - 1) {
        setIsAnimationComplete(true);
        onComplete?.();
      }
    };

    // Ajouter les listeners avec passive: false pour permettre preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [frameCount, isAnimationComplete, onComplete]);

  const progress = currentFrame / (frameCount - 1);

  return {
    currentFrame,
    isAnimationComplete,
    progress,
  };
}
