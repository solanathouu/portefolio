'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const STORAGE_KEY = 'avatar-rotation-done';

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
 * Hook pour bloquer le scroll et contrôler une animation de frames.
 * Le 360° ne se fait qu'une seule fois par session.
 */
export function useScrollLockAnimation({
  frameCount,
  onComplete,
}: UseScrollLockAnimationProps): UseScrollLockAnimationReturn {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const accumulatedScrollRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollSensitivity = 20;

  // Check if rotation was already completed this session
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setCurrentFrame(frameCount - 1);
      setIsAnimationComplete(true);
      onComplete?.();
    }
  }, [frameCount, onComplete]);

  const markComplete = useCallback(() => {
    setIsAnimationComplete(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (isAnimationComplete) return;

    heroRef.current = document.getElementById('hero');

    const isHeroVisible = () => {
      const hero = heroRef.current;
      if (!hero) return false;
      const rect = hero.getBoundingClientRect();
      // Hero is considered visible if its top half is in view
      return rect.top < window.innerHeight / 2 && rect.bottom > 0;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isHeroVisible()) return;

      e.preventDefault();

      accumulatedScrollRef.current += e.deltaY;

      const scrollPerFrame = scrollSensitivity;
      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(accumulatedScrollRef.current / scrollPerFrame))
      );

      setCurrentFrame(newFrame);

      if (newFrame >= frameCount - 1) {
        markComplete();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isHeroVisible()) return;
      const touch = e.touches[0];
      accumulatedScrollRef.current = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isHeroVisible()) return;

      e.preventDefault();
      const touch = e.touches[0];
      const delta = accumulatedScrollRef.current - touch.clientY;

      const scrollPerFrame = scrollSensitivity * 3;
      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(Math.abs(delta) / scrollPerFrame))
      );

      setCurrentFrame(newFrame);

      if (newFrame >= frameCount - 1) {
        markComplete();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [frameCount, isAnimationComplete, markComplete]);

  const progress = currentFrame / (frameCount - 1);

  return {
    currentFrame,
    isAnimationComplete,
    progress,
  };
}
