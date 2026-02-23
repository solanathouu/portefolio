export type SkillCategory = 'languages' | 'data' | 'tools';

export interface Skill {
  name: string;
  icon: string; // Icon name from react-icons
  category: SkillCategory;
  color: string; // Hex color for glow effect
  url?: string; // External link opened on click (certificate, profile, etc.)
}

export const skills: Skill[] = [
  // Langages
  {
    name: 'Python',
    icon: 'SiPython',
    category: 'languages',
    color: '#3776AB',
  },
  {
    name: 'SQL',
    icon: 'FaDatabase',
    category: 'languages',
    color: '#336791',
  },
  {
    name: 'JavaScript',
    icon: 'SiJavascript',
    category: 'languages',
    color: '#F7DF1E',
  },
  {
    name: 'Anglais',
    icon: 'FaGlobe',
    category: 'languages',
    color: '#E63946',
    url: '/certificates/anglais.pdf',
  },
  // Data & Analyse
  {
    name: 'Excel',
    icon: 'FaFileExcel',
    category: 'data',
    color: '#217346',
  },
  {
    name: 'Web Scraping',
    icon: 'FaSpider',
    category: 'data',
    color: '#E44D26',
  },
  {
    name: 'Dataiku',
    icon: 'SiDataiku',
    category: 'data',
    color: '#2AB1AC',
    url: '/certificates/dataiku-core-designer.pdf',
  },
  // Outils
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
    url: 'https://github.com/solanathouu',
  },
  {
    name: 'VS Code',
    icon: 'VscVscode',
    category: 'tools',
    color: '#007ACC',
  },
];

export const skillsByCategory = {
  languages: skills.filter(s => s.category === 'languages'),
  data: skills.filter(s => s.category === 'data'),
  tools: skills.filter(s => s.category === 'tools'),
};
