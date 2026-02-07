'use client';

import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 px-8 md:px-12 lg:px-16"
      style={{ backgroundColor: '#303030' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-end justify-between flex-wrap gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-mono uppercase tracking-widest mb-4"
                style={{ color: '#00f0ff' }}
              >
                // Portfolio
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-bold leading-none font-mono uppercase text-white">
                Selected
                <br />
                <span style={{ color: '#ff00ff' }}>Works</span>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 max-w-md text-base leading-relaxed font-mono"
            >
              A curated collection of projects spanning web development,
              interactive experiences, and digital experimentation.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-12 h-1 origin-left"
            style={{
              background: 'linear-gradient(90deg, #00f0ff 0%, #ff00ff 50%, #ccff00 100%)',
              opacity: 0.3,
            }}
          />
        </motion.div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto" style={{ gap: '6rem' }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 text-center"
        >
          <p className="text-white/30 font-mono text-sm">
            More experiments on{' '}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline transition-all"
              style={{ color: '#00f0ff' }}
            >
              GitHub
            </a>
            {' '}→
          </p>
        </motion.div>
      </div>
    </section>
  );
}
