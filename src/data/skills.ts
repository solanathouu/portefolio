export type SkillCategory = 'frontend' | 'backend' | 'tools';

export interface Skill {
  name: string;
  icon: string; // Icon name from react-icons (e.g., 'SiReact')
  category: SkillCategory;
  color: string; // Hex color for glow effect
}

export const skills: Skill[] = [
  // Frontend Skills
  {
    name: 'React',
    icon: 'SiReact',
    category: 'frontend',
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    icon: 'SiNextdotjs',
    category: 'frontend',
    color: '#000000',
  },
  {
    name: 'TypeScript',
    icon: 'SiTypescript',
    category: 'frontend',
    color: '#3178C6',
  },
  {
    name: 'JavaScript',
    icon: 'SiJavascript',
    category: 'frontend',
    color: '#F7DF1E',
  },
  {
    name: 'Tailwind CSS',
    icon: 'SiTailwindcss',
    category: 'frontend',
    color: '#06B6D4',
  },
  {
    name: 'HTML5',
    icon: 'SiHtml5',
    category: 'frontend',
    color: '#E34F26',
  },
  {
    name: 'CSS3',
    icon: 'SiCss3',
    category: 'frontend',
    color: '#1572B6',
  },
  // Backend Skills
  {
    name: 'Node.js',
    icon: 'SiNodedotjs',
    category: 'backend',
    color: '#339933',
  },
  {
    name: 'Express',
    icon: 'SiExpress',
    category: 'backend',
    color: '#000000',
  },
  {
    name: 'MongoDB',
    icon: 'SiMongodb',
    category: 'backend',
    color: '#47A248',
  },
  {
    name: 'PostgreSQL',
    icon: 'SiPostgresql',
    category: 'backend',
    color: '#4169E1',
  },
  // Tools & Others
  {
    name: 'Git',
    icon: 'SiGit',
    category: 'tools',
    color: '#F05032',
  },
  {
    name: 'GitHub',
    icon: 'SiGithub',
    category: 'tools',
    color: '#181717',
  },
  {
    name: 'VS Code',
    icon: 'VscVscode',
    category: 'tools',
    color: '#007ACC',
  },
  {
    name: 'Figma',
    icon: 'SiFigma',
    category: 'tools',
    color: '#F24E1E',
  },
];

export const skillsByCategory = {
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
  tools: skills.filter(s => s.category === 'tools'),
};
