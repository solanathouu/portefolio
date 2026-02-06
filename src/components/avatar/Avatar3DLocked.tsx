'use client';

import { useScrollLockAnimation } from '@/lib/hooks/useScrollLockAnimation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface Avatar3DLockedProps {
  frameCount?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export default function Avatar3DLocked({
  frameCount = 173,
  onAnimationComplete,
  className,
}: Avatar3DLockedProps) {
  const { currentFrame, isAnimationComplete } = useScrollLockAnimation({
    frameCount,
    onComplete: onAnimationComplete,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

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

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [frameCount]);

  const frameNumber = String(currentFrame).padStart(3, '0');
  const imageSrc = `/assets/avatar/frame_${frameNumber}.png`;

  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 rounded-full">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Avatar image */}
      <div
        className={cn(
          'relative w-full h-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <img
          src={imageSrc}
          alt="3D Avatar"
          className="w-full h-full object-contain scale-90"
          loading="eager"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Hint text */}
      {isLoaded && !isAnimationComplete && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-foreground/50">
            Scrollez pour découvrir ↓
          </p>
        </div>
      )}
    </div>
  );
}
