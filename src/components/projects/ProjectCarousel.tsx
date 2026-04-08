'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectCarouselCard from '@/components/projects/ProjectCarouselCard';
import ProjectDescription from '@/components/projects/ProjectDescription';

function getCardStyle(
  index: number,
  activeIndex: number,
  total: number,
  containerWidth: number
): React.CSSProperties {
  const gap = Math.min(containerWidth * 0.22, 280);
  const isActive = index === activeIndex;
  const isLeft = (activeIndex - 1 + total) % total === index;
  const isRight = (activeIndex + 1) % total === index;

  if (isActive) {
    return {
      zIndex: 3,
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateX(0px) scale(1) rotateY(0deg)',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  if (isLeft) {
    return {
      zIndex: 2,
      opacity: 0.7,
      pointerEvents: 'auto',
      transform: `translateX(-${gap}px) scale(0.85) rotateY(15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  if (isRight) {
    return {
      zIndex: 2,
      opacity: 0.7,
      pointerEvents: 'auto',
      transform: `translateX(${gap}px) scale(0.85) rotateY(-15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  return {
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  };
}

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const router = useRouter();

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActiveIndex((p) => (p - 1 + projects.length) % projects.length);
      if (e.key === 'ArrowRight') setActiveIndex((p) => (p + 1) % projects.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + projects.length) % projects.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % projects.length);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative w-full h-[360px] md:h-[400px]"
        style={{ perspective: '1000px' }}
      >
        {projects.map((project, index) => (
          <ProjectCarouselCard
            key={project.id}
            project={project}
            style={getCardStyle(index, activeIndex, projects.length, containerWidth)}
            isActive={index === activeIndex}
            onClick={() => router.push(`/projects/${project.id}`)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-11 h-11 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-lg
            hover:bg-[rgba(120,80,255,0.15)] hover:border-[rgba(120,80,255,0.3)] hover:text-white
            transition-all duration-300"
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-11 h-11 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-lg
            hover:bg-[rgba(120,80,255,0.15)] hover:border-[rgba(120,80,255,0.3)] hover:text-white
            transition-all duration-300"
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <ProjectDescription project={projects[activeIndex]} />
    </div>
  );
}
