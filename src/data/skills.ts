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
  {
    name: 'Power BI',
    icon: 'FaChartBar',
    category: 'data',
    color: '#F2C811',
  },
  {
    name: 'Tableau',
    icon: 'SiTableau',
    category: 'data',
    color: '#E97627',
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
  {
    name: 'N8N',
    icon: 'SiN8N',
    category: 'tools',
    color: '#EA4B71',
  },
  {
    name: 'Make',
    icon: 'SiMake',
    category: 'tools',
    color: '#6D00CC',
  },
  {
    name: 'Notion',
    icon: 'SiNotion',
    category: 'tools',
    color: '#FFFFFF',
  },
  {
    name: 'Dust',
    icon: 'FaRobot',
    category: 'tools',
    color: '#FF6B35',
  },
  {
    name: 'Claude',
    icon: 'SiClaude',
    category: 'tools',
    color: '#D4A574',
  },
];

export const skillsByCategory = {
  languages: skills.filter(s => s.category === 'languages'),
  data: skills.filter(s => s.category === 'data'),
  tools: skills.filter(s => s.category === 'tools'),
};
