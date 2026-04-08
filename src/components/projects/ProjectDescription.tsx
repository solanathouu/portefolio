'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectDescriptionProps {
  project: Project;
}

export default function ProjectDescription({ project }: ProjectDescriptionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-2xl mx-auto mt-8"
      >
        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">{project.role} — {project.year}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.description.split(' ').map((word, i) => (
            <motion.span
              key={`${project.id}-${i}`}
              initial={{ filter: 'blur(8px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.02 * i }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
