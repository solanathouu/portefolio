'use client';

import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen pt-16 pb-32 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-11/12 max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Portfolio
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.4)',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Projets personnels et académiques mêlant développement web, scraping de données,
              intelligence artificielle et expériences mobiles.
            </motion.p>
          </div>
        </motion.div>

        {/* Bento Grid — inline grid for reliability */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: '300px 300px 300px 250px',
            gap: '16px',
          }}
        >
          {/* Project 1 — left column, spans 2 rows */}
          {projects[0] && (
            <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <ProjectCard project={projects[0]} index={0} />
            </div>
          )}

          {/* Project 2 — right column, row 1 */}
          {projects[1] && (
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              <ProjectCard project={projects[1]} index={1} />
            </div>
          )}

          {/* Project 3 — right column, row 2 */}
          {projects[2] && (
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              <ProjectCard project={projects[2]} index={2} />
            </div>
          )}

          {/* Project 4 — left column, row 3 */}
          {projects[3] && (
            <div style={{ gridColumn: '1', gridRow: '3' }}>
              <ProjectCard project={projects[3]} index={3} />
            </div>
          )}

          {/* Project 5 — right column, row 3 */}
          {projects[4] && (
            <div style={{ gridColumn: '2', gridRow: '3' }}>
              <ProjectCard project={projects[4]} index={4} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
