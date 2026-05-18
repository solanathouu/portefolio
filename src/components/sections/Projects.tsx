'use client';

import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative"
      style={{ minHeight: '100vh', padding: '64px 24px 128px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
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

        {/* Bento Grid — 9 projets, pattern asymétrique étendu */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: '300px 300px 300px 250px 300px 300px',
            gap: '16px',
          }}
        >
          {/* P1 (tall) — col 1, rows 1-2 */}
          {projects[0] && (
            <div className="bento-cell" style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <ProjectCard project={projects[0]} index={0} />
            </div>
          )}

          {/* P2 — col 2, row 1 */}
          {projects[1] && (
            <div className="bento-cell" style={{ gridColumn: '2', gridRow: '1' }}>
              <ProjectCard project={projects[1]} index={1} />
            </div>
          )}

          {/* P3 — col 2, row 2 */}
          {projects[2] && (
            <div className="bento-cell" style={{ gridColumn: '2', gridRow: '2' }}>
              <ProjectCard project={projects[2]} index={2} />
            </div>
          )}

          {/* P4 — col 1, row 3 */}
          {projects[3] && (
            <div className="bento-cell" style={{ gridColumn: '1', gridRow: '3' }}>
              <ProjectCard project={projects[3]} index={3} />
            </div>
          )}

          {/* P5 — col 2, row 3 */}
          {projects[4] && (
            <div className="bento-cell" style={{ gridColumn: '2', gridRow: '3' }}>
              <ProjectCard project={projects[4]} index={4} />
            </div>
          )}

          {/* P6 (wide) — full width, row 4 */}
          {projects[5] && (
            <div className="bento-cell" style={{ gridColumn: '1 / 3', gridRow: '4' }}>
              <ProjectCard project={projects[5]} index={5} />
            </div>
          )}

          {/* P7 — col 1, row 5 */}
          {projects[6] && (
            <div className="bento-cell" style={{ gridColumn: '1', gridRow: '5' }}>
              <ProjectCard project={projects[6]} index={6} />
            </div>
          )}

          {/* P8 (tall) — col 2, rows 5-6 */}
          {projects[7] && (
            <div className="bento-cell" style={{ gridColumn: '2', gridRow: '5 / 7' }}>
              <ProjectCard project={projects[7]} index={7} />
            </div>
          )}

          {/* P9 — col 1, row 6 */}
          {projects[8] && (
            <div className="bento-cell" style={{ gridColumn: '1', gridRow: '6' }}>
              <ProjectCard project={projects[8]} index={8} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
