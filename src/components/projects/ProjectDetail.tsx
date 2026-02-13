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
            className="flex items-center gap-3 px-5 py-3 font-mono text-sm uppercase tracking-wider transition-all group"
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
          className="mb-20"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none font-mono uppercase mb-10 text-center"
            style={{ color: accentColor }}
          >
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 font-mono leading-relaxed max-w-4xl mb-12">
            {project.longDescription || project.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {project.role && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                  Role
                </div>
                <div className="text-white font-mono text-lg">{project.role}</div>
              </div>
            )}
            {project.client && (
              <div>
                <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                  Client
                </div>
                <div className="text-white font-mono text-lg">{project.client}</div>
              </div>
            )}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Year
              </div>
              <div className="text-white font-mono text-lg">{project.year || '2025'}</div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-6">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all"
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
                className="flex items-center gap-3 px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all"
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
            className="mb-32"
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-mono uppercase mb-12"
              style={{ color: accentColor }}
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
                      <p className="text-white/60 font-mono text-sm">{item.caption}</p>
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
            className="mb-32"
          >
            <h2
              className="text-4xl md:text-5xl font-bold font-mono uppercase mb-12"
              style={{ color: accentColor }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <h3 className="text-sm font-mono uppercase tracking-widest mb-6" style={{ color: accentColor }}>
                    {tech.category}
                  </h3>
                  <ul className="space-y-3">
                    {tech.items.map((item) => (
                      <li key={item} className="text-white/80 font-mono text-sm flex items-start gap-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {project.challenges && project.challenges.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-mono uppercase mb-8" style={{ color: accentColor }}>
                Challenges
              </h2>
              <ul className="space-y-6">
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
                    <span className="text-2xl font-bold font-mono" style={{ color: accentColor, marginRight: '24px', flexShrink: 0 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-white/80 font-mono text-sm leading-relaxed" style={{ flex: 1 }}>{challenge}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold font-mono uppercase mb-8" style={{ color: accentColor }}>
                Outcomes
              </h2>
              <ul className="space-y-6">
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
                    <p className="text-white font-mono text-sm leading-relaxed">{outcome}</p>
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
          className="border-t pt-16"
          style={{ borderColor: `${accentColor}30` }}
        >
          <div className="flex justify-between items-center gap-8 flex-wrap">
            {prevProject ? (
              <button
                onClick={() => router.push(`/projects/${prevProject.id}`)}
                className="group flex items-center gap-4 p-6 flex-1 min-w-[250px] transition-all"
                style={{
                  border: `3px solid ${accentColor}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.backgroundColor = `${accentColor}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accentColor}30`;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <FiArrowLeft className="w-6 h-6" style={{ color: accentColor }} />
                <div className="text-left">
                  <div className="text-xs font-mono uppercase tracking-widest mb-1 text-white/40">Previous</div>
                  <div className="font-mono text-lg text-white">{prevProject.title}</div>
                </div>
              </button>
            ) : (
              <div className="flex-1 min-w-[250px]" />
            )}

            {nextProject ? (
              <button
                onClick={() => router.push(`/projects/${nextProject.id}`)}
                className="group flex items-center gap-4 p-6 flex-1 min-w-[250px] justify-end text-right transition-all"
                style={{
                  border: `3px solid ${accentColor}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.backgroundColor = `${accentColor}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accentColor}30`;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="text-right">
                  <div className="text-xs font-mono uppercase tracking-widest mb-1 text-white/40">Next</div>
                  <div className="font-mono text-lg text-white">{nextProject.title}</div>
                </div>
                <FiArrowRight className="w-6 h-6" style={{ color: accentColor }} />
              </button>
            ) : (
              <div className="flex-1 min-w-[250px]" />
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
