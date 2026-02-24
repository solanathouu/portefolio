'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
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

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  return (
    <div className="relative">
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

          {/* Screenshots */}
          {project.media && project.media.length > 0 && (
            <section style={{ marginBottom: '44px' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color: `${accentColor}80` }}>
                  Screenshots
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
              </div>
              <div className="flex gap-3 flex-wrap">
                {project.media.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (item.linkUrl) {
                        window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        openLightbox(idx);
                      }
                    }}
                    style={{
                      width: 300,
                      height: 300,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `2px solid ${accentColor}20`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.caption || `${project.title} screenshot ${idx + 1}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project Navigation */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-20"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
              <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: accentColor }}>Navigation</span>
              <div className="h-px flex-1" style={{ backgroundColor: `${accentColor}20` }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: `${accentColor}15` }}>
              {prevProject ? (
                <button
                  onClick={() => router.push(`/projects/${prevProject.id}`)}
                  className="group relative py-10 px-8 text-center transition-all duration-500 overflow-hidden"
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,240,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'; }}
                >
                  <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: accentColor }} />
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <FiArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" style={{ color: accentColor }} />
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Précédent</span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>{prevProject.title}</div>
                  <span className="absolute bottom-4 right-6 text-xs font-mono font-bold tracking-widest" style={{ color: `${accentColor}50` }}>{String(currentIndex).padStart(2, '0')}</span>
                </button>
              ) : (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
              )}

              {nextProject ? (
                <button
                  onClick={() => router.push(`/projects/${nextProject.id}`)}
                  className="group relative py-10 px-8 text-center transition-all duration-500 overflow-hidden"
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,240,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'; }}
                >
                  <div className="absolute top-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: accentColor }} />
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Suivant</span>
                    <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: accentColor }} />
                  </div>
                  <div className="text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>{nextProject.title}</div>
                  <span className="absolute bottom-4 left-6 text-xs font-mono font-bold tracking-widest" style={{ color: `${accentColor}50` }}>{String(currentIndex + 2).padStart(2, '0')}</span>
                </button>
              ) : (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes lightbox-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightbox-image {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && project.media && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'lightbox-backdrop 0.3s ease-out forwards',
          }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <div
            onClick={closeLightbox}
            style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer', zIndex: 10, padding: 8 }}
          >
            <FiX style={{ width: 28, height: 28, color: 'rgba(255,255,255,0.7)' }} />
          </div>

          {/* Prev arrow */}
          {project.media.length > 1 && (
            <div
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10, padding: 12 }}
            >
              <FiChevronLeft style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          )}

          {/* Image */}
          <div
            key={lightboxIndex}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '85vw',
              maxHeight: '85vh',
              animation: 'lightbox-image 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.media[lightboxIndex].url}
              alt={project.media[lightboxIndex].caption || `${project.title} screenshot`}
              style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            {/* Open link button (PDF etc.) */}
            {project.media[lightboxIndex].linkUrl && (
              <a
                href={project.media[lightboxIndex].linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: '#00f0ff',
                  color: '#000',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <FiExternalLink style={{ width: 16, height: 16 }} />
                Ouvrir le PDF
              </a>
            )}
          </div>

          {/* Next arrow */}
          {project.media.length > 1 && (
            <div
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10, padding: 12 }}
            >
              <FiChevronRight style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          )}

          {/* Counter */}
          {project.media.length > 1 && (
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace' }}>
              {lightboxIndex + 1} / {project.media.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
