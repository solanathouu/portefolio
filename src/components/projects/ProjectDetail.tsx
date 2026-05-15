'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { FiArrowLeft, FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  SiPython, SiFastapi, SiOpenai, SiJavascript, SiHtml5, SiCss3,
  SiReact, SiSupabase, SiPostgresql, SiExpo, SiGit, SiGithub,
  SiTypescript, SiLangchain, SiGooglemaps, SiFirebase, SiSlack,
  SiGooglesheets, SiGmail, SiGooglecalendar, SiGooglegemini,
  SiHuggingface, SiClaude, SiNotion,
} from 'react-icons/si';
import {
  FaDatabase, FaServer, FaCloud, FaSpider, FaGlobe, FaFileExport,
  FaLink, FaShieldAlt, FaKey, FaRobot, FaProjectDiagram, FaCogs,
  FaCode, FaSearch, FaBolt, FaBrain, FaNewspaper, FaImages,
  FaSyncAlt, FaIcons, FaHdd, FaPencilAlt, FaMagic, FaLinkedin,
} from 'react-icons/fa';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import { withBase } from '@/lib/utils/basePath';

/* ── Tech icon mapping ── */
const techIcons: Record<string, IconType> = {
  // Languages & Frameworks
  'python': SiPython,
  'fastapi': SiFastapi,
  'javascript': SiJavascript,
  'typescript': SiTypescript,
  'html': SiHtml5,
  'css': SiCss3,
  'react native': SiReact,
  'react': SiReact,
  'expo': SiExpo,
  'supabase': SiSupabase,
  'postgresql': SiPostgresql,
  'postgis': SiPostgresql,
  // AI & Models
  'openai': SiOpenai,
  'gpt': SiOpenai,
  'langchain': SiLangchain,
  'embedding': SiOpenai,
  'rag': FaBrain,
  'gemini': SiGooglegemini,
  'huggingface': SiHuggingface,
  'reranker': FaRobot,
  'claude': SiClaude,
  'mistral': FaBolt,
  'ai analyse': FaBrain,
  // Data & DB
  'chromadb': FaDatabase,
  'csv': FaFileExport,
  'batch': FaCogs,
  'json': FaCode,
  // Scraping & Web
  'cloudscraper': FaCloud,
  'beautifulsoup': FaSpider,
  'mediawiki': FaGlobe,
  'urllib': FaLink,
  'web context': FaSearch,
  // Servers & Infra
  'uvicorn': FaServer,
  'rest': FaGlobe,
  'session': FaServer,
  'async': FaBolt,
  'oauth': FaKey,
  // APIs & Services
  'google maps': SiGooglemaps,
  'firebase': SiFirebase,
  'slack': SiSlack,
  'google sheets': SiGooglesheets,
  'gmail': SiGmail,
  'google calendar': SiGooglecalendar,
  'notion': SiNotion,
  'prim': FaGlobe,
  // Tools & Dev
  'git': SiGit,
  'github': SiGithub,
  'n8n': FaProjectDiagram,
  'dust': FaMagic,
  'row level security': FaShieldAlt,
  'navigation': FaGlobe,
  'reanimated': FaSyncAlt,
  'vector icons': FaIcons,
  'asyncstorage': FaHdd,
  'paper': SiReact,
  // Content & SEO
  'prompt': FaPencilAlt,
  'geo': FaSearch,
  'newsletter': FaNewspaper,
  'multi-format': FaImages,
  // Regex
  're': FaCode,
};

function getTechIcon(techName: string): IconType | null {
  const lower = techName.toLowerCase();
  for (const [key, icon] of Object.entries(techIcons)) {
    if (lower.includes(key)) return icon;
  }
  return null;
}

/* ── Accent colors per project ── */
const ACCENT_COLORS = ['#00d4ff', '#4f8aff', '#00e676', '#ff9100', '#b388ff'];

/* ── Component ── */
interface ProjectDetailProps {
  project: Project;
  currentIndex: number;
}

export default function ProjectDetail({ project, currentIndex }: ProjectDetailProps) {
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const accent = ACCENT_COLORS[currentIndex % ACCENT_COLORS.length];

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

  // Flatten all tech items for the visual grid
  const allTechItems = project.technologies?.flatMap((cat) => cat.items) ?? [];

  return (
    <div className="relative">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Back button — minimal */}
        <button
          onClick={() => router.push('/#projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '40px',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
        >
          <FiArrowLeft style={{ width: 16, height: 16 }} />
          <span>Retour</span>
        </button>

        {/* Hero image */}
        {project.media && project.media.length > 0 && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '48px',
              background: project.coverFit === 'contain'
                ? (project.coverBackground ?? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)')
                : undefined,
            }}
          >
            <Image
              src={withBase(project.media[0].url)}
              alt={project.title}
              fill
              sizes="900px"
              style={{
                objectFit: project.coverFit ?? 'cover',
                padding: project.coverFit === 'contain' ? `${project.coverPadding?.hero ?? 60}px` : 0,
              }}
              priority
            />
            {project.coverFit !== 'contain' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%), linear-gradient(135deg, ${accent}15 0%, transparent 40%)`,
                }}
              />
            )}
          </div>
        )}

        {/* Title + metadata */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            {project.title}
          </h1>

          {/* Metadata pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {project.role && (
              <span
                style={{
                  padding: '6px 16px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {project.role}
              </span>
            )}
            <span
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                borderRadius: '999px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {project.year || '2025'}
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  transition: 'background-color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
              >
                <FiGithub style={{ width: 18, height: 18 }} />
                Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#000',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  transition: 'opacity 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <FiExternalLink style={{ width: 18, height: 18 }} />
                Voir le projet
              </a>
            )}
            {project.linkedinUrl && (
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  transition: 'background-color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
              >
                <FaLinkedin style={{ width: 18, height: 18, color: '#0A66C2' }} />
                Post LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.65)',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 56px',
          }}
        >
          {project.longDescription || project.description}
        </p>

        {/* ── Challenges ── */}
        {project.challenges && project.challenges.length > 0 && (
          <section style={{ marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: accent,
                opacity: 0.7,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '24px',
              }}
            >
              Défis techniques
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    padding: '20px 24px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderLeft: `3px solid ${accent}40`,
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderLeftColor: `${accent}40`,
                    borderLeftWidth: '3px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: accent,
                      opacity: 0.6,
                      flexShrink: 0,
                      width: '28px',
                      textAlign: 'right',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Outcomes ── */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section style={{ marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: accent,
                opacity: 0.7,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '24px',
              }}
            >
              Résultats
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
            >
              {project.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '14px',
                    backgroundColor: `${accent}08`,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Tech Stack ── */}
        {allTechItems.length > 0 && (
          <section style={{ marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: accent,
                opacity: 0.7,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '28px',
              }}
            >
              Stack technique
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              {allTechItems.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <div
                    key={tech}
                    className="tech-chip"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 20px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {Icon && <Icon style={{ width: 20, height: 20, color: accent, opacity: 0.8, flexShrink: 0 }} />}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Screenshots ── */}
        {project.media && project.media.length > 1 && (
          <section style={{ marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: accent,
                opacity: 0.7,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '24px',
              }}
            >
              Screenshots
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
              }}
            >
              {project.media.slice(1).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (item.linkUrl) {
                      const target = item.linkUrl.startsWith('http')
                        ? item.linkUrl
                        : withBase(item.linkUrl);
                      window.open(target, '_blank', 'noopener,noreferrer');
                    } else {
                      setLightboxIndex(idx + 1);
                    }
                  }}
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  className="screenshot-thumb"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBase(item.url)}
                    alt={item.caption || `${project.title} screenshot ${idx + 2}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {item.caption && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '32px 12px 12px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Project Navigation ── */}
        <section>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: prevProject && nextProject ? '1fr 1fr' : '1fr',
              gap: '12px',
            }}
          >
            {prevProject && (
              <button
                onClick={() => router.push(`/projects/${prevProject.id}`)}
                className="nav-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '24px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = `${ACCENT_COLORS[(currentIndex - 1 + ACCENT_COLORS.length) % ACCENT_COLORS.length]}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiChevronLeft style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.4)' }} />
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Précédent
                  </span>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{prevProject.title}</span>
              </button>
            )}

            {nextProject && (
              <button
                onClick={() => router.push(`/projects/${nextProject.id}`)}
                className="nav-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: nextProject && prevProject ? 'flex-end' : 'flex-start',
                  gap: '8px',
                  padding: '24px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  textAlign: nextProject && prevProject ? 'right' : 'left',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = `${ACCENT_COLORS[(currentIndex + 1) % ACCENT_COLORS.length]}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Suivant
                  </span>
                  <FiChevronRight style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.4)' }} />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{nextProject.title}</span>
              </button>
            )}
          </div>
        </section>
      </div>

      {/* ── LIGHTBOX ── */}
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
          }}
          onClick={closeLightbox}
        >
          <div
            onClick={closeLightbox}
            style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer', zIndex: 10, padding: 8 }}
          >
            <FiX style={{ width: 28, height: 28, color: 'rgba(255,255,255,0.7)' }} />
          </div>

          {project.media.length > 1 && (
            <div
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10, padding: 12 }}
            >
              <FiChevronLeft style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          )}

          <div key={lightboxIndex} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(project.media[lightboxIndex].url)}
              alt={project.media[lightboxIndex].caption || `${project.title} screenshot`}
              style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain', display: 'block', borderRadius: '12px' }}
            />
            {project.media[lightboxIndex].linkUrl && (
              <a
                href={
                  project.media[lightboxIndex].linkUrl!.startsWith('http')
                    ? project.media[lightboxIndex].linkUrl!
                    : withBase(project.media[lightboxIndex].linkUrl!)
                }
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
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <FiExternalLink style={{ width: 16, height: 16 }} />
                Ouvrir le PDF
              </a>
            )}
          </div>

          {project.media.length > 1 && (
            <div
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 10, padding: 12 }}
            >
              <FiChevronRight style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          )}

          {project.media.length > 1 && (
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
              {lightboxIndex + 1} / {project.media.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
