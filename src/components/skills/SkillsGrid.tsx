'use client';

import { skills, SkillCategory } from '@/data/skills';
import GlowCard from '@/components/ui/GlowCard';
import { getSkillIcon } from '@/lib/utils/skillIcons';

const categoryLabels: Record<SkillCategory, string> = {
  languages: 'Langages',
  data: 'Data & Analyse',
  tools: 'Outils',
};

const categoryGlowColors: Record<SkillCategory, 'purple' | 'cyan' | 'rose'> = {
  languages: 'purple',
  data: 'cyan',
  tools: 'rose',
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => {
                const Icon = getSkillIcon(skill.icon);
                const isLink = !!skill.url;

                const content = (
                  <>
                    {Icon && (
                      <Icon className="text-lg text-[var(--text-secondary)] group-hover:text-white transition-colors" />
                    )}
                    <span className="text-xs font-medium">{skill.name}</span>
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
                    className="group p-3 flex flex-col items-center gap-1.5 text-center"
                  >
                    {isLink ? (
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 w-full"
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
