'use client';

import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

interface ProjectDetailProps {
  project: Project;
  currentIndex: number;
}

export default function ProjectDetail({ project, currentIndex }: ProjectDetailProps) {
  const router = useRouter();
  const accentColor = '#00f0ff';

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

        {/* Media Gallery */}
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
            <div className="space-y-12">
              {project.media.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="overflow-hidden"
                  style={{
                    border: `4px solid ${accentColor}20`,
                  }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-20">
                        {item.type === 'image' ? '🖼️' : item.type === 'video' ? '🎬' : '🎞️'}
                      </span>
                    </div>
                  </div>
                  {item.caption && (
                    <div className="p-6 bg-black/40">
                      <p className="text-white/60 text-sm">{item.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

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
