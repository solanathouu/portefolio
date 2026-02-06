export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // PLACEHOLDER PROJECT 1 - Featured Portfolio Website
  {
    id: 'portfolio-website',
    title: 'Portfolio Personnel',
    description: 'Un portfolio moderne et interactif construit avec Next.js 15, TypeScript et Tailwind CSS. Inclut des animations fluides, un design responsive et des effets de parallaxe.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: '/images/projects/portfolio-thumb.jpg', // PLACEHOLDER - Add your image
    media: [
      {
        type: 'image',
        url: '/images/projects/portfolio-1.jpg', // PLACEHOLDER
      },
      {
        type: 'image',
        url: '/images/projects/portfolio-2.jpg', // PLACEHOLDER
      },
    ],
    demoUrl: 'https://your-portfolio.com', // PLACEHOLDER - Update with your URL
    githubUrl: 'https://github.com/yourusername/portfolio', // PLACEHOLDER
    featured: true,
  },
  // PLACEHOLDER PROJECT 2 - E-commerce Application
  {
    id: 'ecommerce-app',
    title: 'Plateforme E-commerce',
    description: 'Application e-commerce full-stack avec gestion de panier, paiements sécurisés et tableau de bord admin. Interface utilisateur moderne et intuitive.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    thumbnail: '/images/projects/ecommerce-thumb.jpg', // PLACEHOLDER
    media: [
      {
        type: 'image',
        url: '/images/projects/ecommerce-1.jpg', // PLACEHOLDER
      },
      {
        type: 'video',
        url: '/videos/projects/ecommerce-demo.mp4', // PLACEHOLDER
      },
    ],
    demoUrl: 'https://demo-ecommerce.com', // PLACEHOLDER
    githubUrl: 'https://github.com/yourusername/ecommerce', // PLACEHOLDER
    featured: true,
  },
  // PLACEHOLDER PROJECT 3 - Task Management App
  {
    id: 'task-manager',
    title: 'Gestionnaire de Tâches',
    description: 'Application de gestion de tâches collaborative avec drag-and-drop, notifications en temps réel et synchronisation multi-appareils.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    thumbnail: '/images/projects/task-manager-thumb.jpg', // PLACEHOLDER
    media: [
      {
        type: 'gif',
        url: '/images/projects/task-manager-demo.gif', // PLACEHOLDER
      },
      {
        type: 'image',
        url: '/images/projects/task-manager-1.jpg', // PLACEHOLDER
      },
    ],
    githubUrl: 'https://github.com/yourusername/task-manager', // PLACEHOLDER
    featured: false,
  },
];
