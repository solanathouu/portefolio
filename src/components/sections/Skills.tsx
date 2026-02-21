'use client';

import { motion } from 'framer-motion';
import { skillsByCategory } from '@/data/skills';
import SkillCard from '@/components/skills/SkillCard';

const CATEGORIES = [
  { key: 'languages' as const, label: 'Langages', color: '#00f0ff' },
  { key: 'data' as const, label: 'Data & Analyse', color: '#ff00e5' },
  { key: 'tools' as const, label: 'Outils', color: '#a3ff00' },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 px-8 md:px-12 lg:px-16"
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
          className="mb-24"
        >
          <div className="flex items-end justify-between flex-wrap gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm uppercase tracking-widest mb-4 text-white/40"
              >
                // Expertise
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-bold leading-none uppercase text-white">
                Tech
                <br />
                Stack
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 max-w-md text-base leading-relaxed"
            >
              Langages, outils data et environnements
              que j&apos;utilise au quotidien.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-12 h-1 origin-left bg-white/20"
          />
        </motion.div>

        {/* Categories */}
        <div className="space-y-20">
          {CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
            >
              {/* Category Title */}
              <div className="mb-8">
                <h3
                  className="text-2xl font-bold uppercase tracking-widest"
                  style={{ color: category.color }}
                >
                  {category.label}
                </h3>
                <div
                  className="mt-3 h-0.5 w-16"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skillsByCategory[category.key].map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
