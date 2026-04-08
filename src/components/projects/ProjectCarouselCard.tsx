'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectCarouselCardProps {
  project: Project;
  style: React.CSSProperties;
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCarouselCard({
  project,
  style,
  isActive,
  onClick,
}: ProjectCarouselCardProps) {
  return (
    <div
      className="absolute w-full h-full rounded-2xl overflow-hidden border border-[var(--border)]"
      style={style}
      onClick={isActive ? onClick : undefined}
    >
      <div className="w-full h-full bg-[var(--surface)] backdrop-blur-[12px] p-6 flex flex-col cursor-pointer">
        <div className="relative flex-1 rounded-xl overflow-hidden mb-4 bg-black/20">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="400px"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
