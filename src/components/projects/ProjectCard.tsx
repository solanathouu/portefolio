'use client';

import { Project } from '@/data/projects';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const accentColors = ['#00f0ff', '#ff00ff', '#ccff00']; // Cyan, Magenta, Lime
  const accentColor = accentColors[index % accentColors.length];
  const numberDisplay = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden bg-black/40 mb-16 md:mb-0"
      style={{
        border: `4px solid ${accentColor}20`,
        boxShadow: `0 0 0 0 ${accentColor}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `12px 12px 0 0 ${accentColor}`;
        e.currentTarget.style.transform = 'translate(-6px, -6px)';
        e.currentTarget.style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${accentColor}`;
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.borderColor = `${accentColor}20`;
      }}
    >
      {/* Giant Number Background */}
      <div
        className="absolute pointer-events-none select-none font-black leading-none font-mono"
        style={{
          top: '10px',
          right: '20px',
          fontSize: '10rem',
          color: accentColor,
          opacity: 0.12,
          zIndex: 1,
          lineHeight: '1',
        }}
      >
        {numberDisplay}
      </div>

      {/* Image Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-20">📁</span>
        </div>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative p-10 space-y-5" style={{ zIndex: 1 }}>
        {/* Number Label */}
        <div
          className="inline-block px-3 py-1 font-mono text-xs font-bold"
          style={{
            backgroundColor: accentColor,
            color: '#000',
          }}
        >
          {numberDisplay}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold leading-tight font-mono text-white uppercase tracking-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2 font-mono">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider"
              style={{
                border: `2px solid ${accentColor}40`,
                color: accentColor,
                backgroundColor: 'transparent',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: accentColor }}
            >
              <FiGithub className="w-5 h-5" />
              <span>Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: accentColor }}
            >
              <FiExternalLink className="w-5 h-5" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-8 right-8">
          <div
            className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest rotate-3"
            style={{
              backgroundColor: accentColor,
              color: '#000',
              boxShadow: `4px 4px 0 0 rgba(0,0,0,0.3)`,
            }}
          >
            Featured
          </div>
        </div>
      )}
    </motion.article>
  );
}
