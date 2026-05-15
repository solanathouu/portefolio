'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { getSkillIcon } from '@/lib/utils/skillIcons';
import { withBase } from '@/lib/utils/basePath';

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative pt-32 pb-16 px-8 md:px-12 lg:px-16"
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Compétences
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Langages, outils d&apos;analyse et environnements de développement
            que j&apos;utilise au quotidien.
          </p>
        </motion.div>

        {/* Skills grid — all in one flow */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {skills.map((skill, index) => {
            const Icon = getSkillIcon(skill.icon);
            const hasLink = !!skill.url;
            const isCertified = skill.url?.startsWith('/');

            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="skill-chip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 22px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: hasLink ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {Icon && (
                  <Icon
                    size={24}
                    style={{ color: skill.color, flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {skill.name}
                </span>
                {isCertified && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    Certifié
                  </span>
                )}
              </motion.div>
            );

            if (hasLink) {
              const isExternal = skill.url!.startsWith('http');
              const href = isExternal ? skill.url! : withBase(skill.url!);
              return (
                <a
                  key={skill.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {inner}
                </a>
              );
            }

            return <div key={skill.name}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
