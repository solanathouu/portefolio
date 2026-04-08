'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/data/projects';
import GlowCard from '@/components/ui/GlowCard';

// Bento layout: projects 0 and 3 span 2 cols
const COL_SPANS: Record<number, number> = { 0: 2, 3: 2 };

const GLOW_COLORS: ('purple' | 'cyan' | 'rose' | 'blue' | 'orange' | 'green')[] = [
  'purple', 'cyan', 'rose', 'blue', 'orange', 'green',
];

export default function ProjectBentoGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-6xl mx-auto">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={cn(
            COL_SPANS[index] === 2 ? 'md:col-span-2' : 'col-span-1'
          )}
        >
          <GlowCard
            glowColor={GLOW_COLORS[index % GLOW_COLORS.length]}
            onClick={() => router.push(`/projects/${project.id}`)}
            className="p-4 h-full"
          >
            {/* Dot pattern on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="flex flex-col space-y-3">
              {/* Header: thumbnail + year */}
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/10">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-white/10 text-[var(--text-secondary)]">
                  {project.year || 'Active'}
                </span>
              </div>

              {/* Title + role */}
              <div className="space-y-2">
                <h3 className="font-medium text-[var(--text-primary)] tracking-tight text-[15px]">
                  {project.title}
                  <span className="ml-2 text-xs text-[var(--text-muted)] font-normal">
                    {project.role}
                  </span>
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-snug">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir &rarr;
                </span>
              </div>
            </div>
          </GlowCard>
        </div>
      ))}
    </div>
  );
}
