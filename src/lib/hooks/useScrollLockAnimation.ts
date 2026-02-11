'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// Module-level flag: survives client-side navigation, resets on hard refresh
let rotationDone = false;

interface UseScrollLockAnimationProps {
  frameCount: number;
  onComplete?: () => void;
}

interface UseScrollLockAnimationReturn {
  currentFrame: number;
  isAnimationComplete: boolean;
  progress: number;
}

export function useScrollLockAnimation({
  frameCount,
  onComplete,
}: UseScrollLockAnimationProps): UseScrollLockAnimationReturn {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const accumulatedScrollRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollSensitivity = 20;

  // Skip rotation if already done this page load
  useEffect(() => {
    if (rotationDone) {
      setCurrentFrame(frameCount - 1);
      setIsAnimationComplete(true);
      onComplete?.();
    }
  }, [frameCount, onComplete]);

  const markComplete = useCallback(() => {
    setIsAnimationComplete(true);
    rotationDone = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (isAnimationComplete) return;

    const isHeroVisible = () => {
      if (!heroRef.current) {
        heroRef.current = document.getElementById('hero');
      }
      const hero = heroRef.current;
      if (!hero) return false;
      const rect = hero.getBoundingClientRect();
      return rect.top < window.innerHeight / 2 && rect.bottom > 0;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isHeroVisible()) return;

      e.preventDefault();

      accumulatedScrollRef.current += e.deltaY;

      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(accumulatedScrollRef.current / scrollSensitivity))
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

      const newFrame = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(Math.abs(delta) / (scrollSensitivity * 3)))
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
