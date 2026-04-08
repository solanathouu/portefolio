'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/data/projects';

// Bento layout: first 2 projects span 2 cols, rest span 1
const COL_SPANS: Record<number, number> = { 0: 2, 3: 2 };

export default function ProjectBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-6xl mx-auto">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className={cn(
            'group relative p-4 rounded-xl overflow-hidden transition-all duration-300',
            'border border-[var(--border)] bg-[var(--bg)]',
            'hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]',
            'hover:-translate-y-0.5 will-change-transform',
            COL_SPANS[index] === 2 ? 'md:col-span-2' : 'col-span-1'
          )}
        >
          {/* Dot pattern on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            {/* Header: thumbnail + year */}
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-white/10 text-[var(--text-secondary)] transition-colors duration-300 group-hover:bg-white/20">
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
                    className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
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

          {/* Gradient border on hover */}
          <div className="absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      ))}
    </div>
  );
}
