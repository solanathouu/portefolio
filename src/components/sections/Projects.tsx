'use client';

import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="mx-auto w-11/12 max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px' }}
        >
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-bold leading-none uppercase text-white">
              // Portfolio
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ marginTop: '40px' }}
            >
              Projets personnels et académiques mêlant développement web, scraping de données,
              intelligence artificielle et expériences mobiles — de la conception à la mise en production.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="h-1 origin-left bg-white/20"
            style={{ marginTop: '30px' }}
          />
        </motion.div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto" style={{ gap: '3.5rem' }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
