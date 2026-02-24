'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface ProjectDetailProps {
  project: Project;
  currentIndex: number;
}

export default function ProjectDetail({ project, currentIndex }: ProjectDetailProps) {
  const router = useRouter();
  const accentColor = '#00f0ff';
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null || !project.media) return;
    setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : project.media.length - 1);
  }, [lightboxIndex, project.media]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null || !project.media) return;
    setLightboxIndex(lightboxIndex < project.media.length - 1 ? lightboxIndex + 1 : 0);
  }, [lightboxIndex, project.media]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="px-8 md:px-12 lg:px-20 pt-12 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <button
            onClick={() => router.push('/#projects')}
            className="flex items-center gap-3 px-5 py-3 text-sm uppercase tracking-wider transition-all group"
            style={{
              border: `3px solid ${accentColor}`,
              color: accentColor,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translate(-4px, -4px)';
              e.currentTarget.style.boxShadow = `6px 6px 0 0 ${accentColor}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
              e.currentTarget.style.color = accentColor;
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '24px' }}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none uppercase text-center"
            style={{ color: accentColor, marginBottom: '32px' }}
          >
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-4xl" style={{ lineHeight: 1.75, marginBottom: '20px' }}>
            {project.longDescription || project.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '22px' }}>
            {project.role && (
              <div>
                <div className="text-xs uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                  Role
                </div>
                <div className="text-white text-lg">{project.role}</div>
              </div>
            )}
            {project.client && (
              <div>
                <div className="text-xs uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                  Client
                </div>
                <div className="text-white text-lg">{project.client}</div>
              </div>
            )}
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Year
              </div>
              <div className="text-white text-lg">{project.year || '2025'}</div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-6">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: accentColor,
                  color: '#000',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = `8px 8px 0 0 ${accentColor}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FiExternalLink className="w-5 h-5" />
                <span>View Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-wider transition-all"
                style={{
                  border: `3px solid ${accentColor}`,
                  color: accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = `8px 8px 0 0 ${accentColor}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = accentColor;
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FiGithub className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Media Gallery — Thumbnail Grid */}
        {project.media && project.media.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: '34px' }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold uppercase"
              style={{ color: accentColor, marginBottom: '18px' }}
            >
              Visual Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.media.map((item, idx) => {
                const thumbContent = (
                  <>
                    <Image
                      src={item.url}
                      alt={item.caption || `${project.title} screenshot ${idx + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs uppercase tracking-widest">
                        {item.linkUrl ? 'Ouvrir PDF' : 'Agrandir'}
                      </span>
                    </div>
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70">
                        <p className="text-white/70 text-xs truncate">{item.caption}</p>
                      </div>
                    )}
                  </>
                );

                const sharedProps = {
                  className: 'group/thumb relative overflow-hidden cursor-pointer block',
                  style: {
                    border: `3px solid ${accentColor}20`,
                    height: '200px',
                  } as React.CSSProperties,
                  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = accentColor;
                  },
                  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = `${accentColor}20`;
                  },
                };

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  >
                    {item.linkUrl ? (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...sharedProps}
                      >
                        {thumbContent}
                      </a>
                    ) : (
                      <button
                        onClick={() => setLightboxIndex(idx)}
                        {...sharedProps}
                      >
                        {thumbContent}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && project.media && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                onClick={closeLightbox}
              >
                <FiX className="w-8 h-8" />
              </button>

              {/* Previous arrow */}
              {project.media.length > 1 && (
                <button
                  className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                >
                  <FiChevronLeft className="w-10 h-10" />
                </button>
              )}

              {/* Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={project.media[lightboxIndex].url}
                  alt={project.media[lightboxIndex].caption || `${project.title} screenshot`}
                  width={1920}
                  height={1080}
                  className="object-contain"
                  style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto' }}
                />
                {project.media[lightboxIndex].caption && (
                  <p className="text-center text-white/60 text-sm mt-4">
                    {project.media[lightboxIndex].caption}
                  </p>
                )}
              </motion.div>

              {/* Next arrow */}
              {project.media.length > 1 && (
                <button
                  className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                >
                  <FiChevronRight className="w-10 h-10" />
                </button>
              )}

              {/* Counter */}
              {project.media.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono">
                  {lightboxIndex + 1} / {project.media.length}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginBottom: '44px' }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold uppercase"
              style={{ color: accentColor, marginBottom: '18px' }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {project.technologies.map((tech, idx) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                  className="p-8"
                  style={{
                    border: `3px solid ${accentColor}30`,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  }}
                >
                  <h3 className="text-sm uppercase tracking-widest" style={{ color: accentColor, marginBottom: '16px' }}>
                    {tech.category}
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tech.items.map((item) => (
                      <li key={item} className="text-white/80 text-sm flex items-start gap-2">
                        <span style={{ color: accentColor }}>→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Challenges & Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '30px', marginBottom: '44px' }}>
          {project.challenges && project.challenges.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold uppercase" style={{ color: accentColor, marginBottom: '14px' }}>
                Challenges
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.challenges.map((challenge, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                    className="p-6 flex gap-6"
                    style={{
                      border: `3px solid ${accentColor}20`,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                  >
                    <span className="text-2xl font-bold" style={{ color: accentColor, marginRight: '24px', flexShrink: 0 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-white/80 text-base leading-relaxed" style={{ flex: 1 }}>{challenge}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}

          {project.outcomes && project.outcomes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold uppercase" style={{ color: accentColor, marginBottom: '14px' }}>
                Outcomes
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.outcomes.map((outcome, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + idx * 0.1 }}
                    className="p-6"
                    style={{
                      border: `3px solid ${accentColor}`,
                      backgroundColor: `${accentColor}10`,
                    }}
                  >
                    <p className="text-white text-base leading-relaxed">{outcome}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}
        </div>

        {/* Project Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-20"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
            <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: accentColor }}>Navigation</span>
            <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: `${accentColor}15` }}>
            {/* Previous Project */}
            {prevProject ? (
              <button
                onClick={() => router.push(`/projects/${prevProject.id}`)}
                className="group relative py-10 px-8 text-center transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,240,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
                }}
              >
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FiArrowLeft
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                    style={{ color: accentColor }}
                  />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                    Précédent
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold uppercase tracking-wide transition-colors duration-300" style={{ color: accentColor }}>
                  {prevProject.title}
                </div>
                {/* Project number */}
                <span
                  className="absolute bottom-4 right-6 text-xs font-mono font-bold tracking-widest"
                  style={{ color: `${accentColor}50` }}
                >
                  {String(currentIndex).padStart(2, '0')}
                </span>
              </button>
            ) : (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
            )}

            {/* Next Project */}
            {nextProject ? (
              <button
                onClick={() => router.push(`/projects/${nextProject.id}`)}
                className="group relative py-10 px-8 text-center transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,240,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
                }}
              >
                {/* Accent line top */}
                <div
                  className="absolute top-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                    Suivant
                  </span>
                  <FiArrowRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: accentColor }}
                  />
                </div>
                <div className="text-xl md:text-2xl font-bold uppercase tracking-wide transition-colors duration-300" style={{ color: accentColor }}>
                  {nextProject.title}
                </div>
                {/* Project number */}
                <span
                  className="absolute bottom-4 left-6 text-xs font-mono font-bold tracking-widest"
                  style={{ color: `${accentColor}50` }}
                >
                  {String(currentIndex + 2).padStart(2, '0')}
                </span>
              </button>
            ) : (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
