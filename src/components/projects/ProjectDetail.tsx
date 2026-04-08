'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import GlowCard from '@/components/ui/GlowCard';
import BackButton from '@/components/ui/BackButton';
import ShaderBackground from '@/components/three/ShaderBackground';

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <ShaderBackground opacity={0.1} />
      <BackButton />
      <motion.main
        className="relative z-10 min-h-screen pt-24 pb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <article className="max-w-[900px] mx-auto">
          {/* Header */}
          <header className="mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              {project.role} — {project.year}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">
              {project.title}
            </h1>
            <div className="flex gap-2 flex-wrap mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-full bg-[var(--accent-violet)] text-white hover:opacity-90 transition-opacity"
                >
                  Demo →
                </a>
              )}
            </div>
          </header>

          {/* Hero image */}
          {project.media[0] && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-[var(--border)]">
              <Image
                src={project.media[0].url}
                alt={project.media[0].caption || project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {project.longDescription && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </section>
          )}

          {/* Technologies */}
          {project.technologies && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.technologies.map((cat) => (
                  <GlowCard key={cat.category} className="p-5">
                    <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                ))}
              </div>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((ch, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent-violet)] font-bold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {project.outcomes.map((oc, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent-cyan)] font-bold">✓</span>
                    <span>{oc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Media gallery */}
          {project.media.length > 1 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Captures</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.media.slice(1).map((m, i) => (
                  <button
                    key={i}
                    onClick={() => m.linkUrl ? window.open(m.linkUrl, '_blank') : setLightboxIndex(i + 1)}
                    className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
                  >
                    <Image src={m.url} alt={m.caption || ''} fill className="object-cover" sizes="300px" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Prev/Next nav */}
          <nav className="flex justify-between items-center pt-8 border-t border-[var(--border)]">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                ← {prevProject.title}
              </Link>
            ) : <div />}
            <Link
              href="/projects"
              className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Tous les projets
            </Link>
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {nextProject.title} →
              </Link>
            ) : <div />}
          </nav>
        </article>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              ×
            </button>
            <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={project.media[lightboxIndex].url}
                alt={project.media[lightboxIndex].caption || ''}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
}
