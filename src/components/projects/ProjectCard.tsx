'use client';

import { Project } from '@/data/projects';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const accentColor = '#00f0ff'; // Electric Cyan - Unified color for all projects
  const numberDisplay = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden bg-black/40 mb-16 md:mb-0 cursor-pointer"
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
        className="absolute pointer-events-none select-none font-black leading-none text-white"
        style={{
          top: '10px',
          right: '20px',
          fontSize: '10rem',
          opacity: 0.08,
          zIndex: 1,
          lineHeight: '1',
        }}
      >
        {numberDisplay}
      </div>

      {/* Image Placeholder - Clickable */}
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-20">📁</span>
          </div>

          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulance type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* View Details Overlay on Hover */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-3 text-white text-sm uppercase tracking-wider">
              <span>View Details</span>
              <FiArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative p-10 space-y-5" style={{ zIndex: 1 }}>
          {/* Number Label */}
          <div
            className="inline-block px-3 py-1 text-xs font-bold"
            style={{
              backgroundColor: accentColor,
              color: '#000',
            }}
          >
            {numberDisplay}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white uppercase tracking-tight group-hover:translate-x-1 transition-transform">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  border: `2px solid ${accentColor}40`,
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  opacity: 0.8,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Links - Outside Link to prevent nesting */}
      <div className="relative px-10 pb-10 flex items-center gap-6" style={{ zIndex: 10 }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm uppercase tracking-wider transition-opacity group/link"
            style={{
              color: '#ffffff',
              opacity: 0.6,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub className="w-5 h-5" style={{ color: 'inherit' }} />
            <span style={{ color: 'inherit' }}>Code</span>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm uppercase tracking-wider transition-opacity group/link"
            style={{
              color: '#ffffff',
              opacity: 0.6,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink className="w-5 h-5" style={{ color: 'inherit' }} />
            <span style={{ color: 'inherit' }}>Live</span>
          </a>
        )}
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-8 right-8">
          <div
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest rotate-3"
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
