'use client';

import { skills, SkillCategory } from '@/data/skills';
import GlowCard from '@/components/ui/GlowCard';
import { getSkillIcon } from '@/lib/utils/skillIcons';

const categoryLabels: Record<SkillCategory, string> = {
  languages: 'Langages',
  data: 'Data & Analyse',
  tools: 'Outils',
};

const categoryGlowColors: Record<SkillCategory, string> = {
  languages: 'rgba(120, 80, 255, 0.08)',
  data: 'rgba(0, 200, 255, 0.08)',
  tools: 'rgba(255, 60, 120, 0.08)',
};

const categories: SkillCategory[] = ['languages', 'data', 'tools'];

export default function SkillsGrid() {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category}>
          <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6">
            {categoryLabels[category]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => {
                const Icon = getSkillIcon(skill.icon);
                const isLink = !!skill.url;

                const content = (
                  <>
                    {Icon && (
                      <Icon className="text-2xl text-[var(--text-secondary)] group-hover:text-white transition-colors" />
                    )}
                    <span className="text-sm font-medium">{skill.name}</span>
                    {isLink && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(120,80,255,0.2)] text-[var(--accent-violet-light)]">
                        Certifié
                      </span>
                    )}
                  </>
                );

                return (
                  <GlowCard
                    key={skill.name}
                    glowColor={categoryGlowColors[category]}
                    className="group p-5 flex flex-col items-center gap-3 text-center"
                  >
                    {isLink ? (
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 w-full"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </GlowCard>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
