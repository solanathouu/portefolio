'use client';

import { useImageSequence } from '@/lib/hooks/useImageSequence';
import { cn } from '@/lib/utils/cn';

interface Avatar3DProps {
  frameCount?: number;
  scrollStart?: number;
  scrollEnd?: number;
  className?: string;
}

export default function Avatar3D({
  frameCount = 173,
  scrollStart = 0,
  scrollEnd = 200,
  className,
}: Avatar3DProps) {
  const { currentFrame, isLoaded } = useImageSequence({
    frameCount,
    scrollStart,
    scrollEnd,
  });

  // Générer le path de l'image actuelle
  const frameNumber = String(currentFrame).padStart(3, '0');
  const imageSrc = `/assets/avatar/frame_${frameNumber}.jpg`;

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

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-xs font-mono">
          Frame: {currentFrame + 1} / {frameCount}
        </div>
      )}
    </div>
  );
}
