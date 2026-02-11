'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/data/skills';
import { getSkillIcon } from '@/lib/utils/skillIcons';

interface SkillCardProps {
  skill: Skill;
  index: number;
  categoryColor: string;
}

export default function SkillCard({ skill, index, categoryColor }: SkillCardProps) {
  const Icon = getSkillIcon(skill.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col items-center gap-3 bg-black/30 py-6 px-4 cursor-default"
      style={{
        border: '2px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = categoryColor;
        e.currentTarget.style.boxShadow = `6px 6px 0 0 ${categoryColor}`;
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      {Icon && <Icon size={36} className="text-white" />}
      <span className="font-mono text-xs uppercase tracking-wider text-white/80">
        {skill.name}
      </span>
    </motion.div>
  );
}
