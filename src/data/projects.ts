export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Detailed description for project page
  tags: string[];
  thumbnail: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
    caption?: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year?: string;
  client?: string;
  role?: string;
  technologies?: {
    category: string;
    items: string[];
  }[];
  challenges?: string[];
  outcomes?: string[];
}

export const projects: Project[] = [
  // PLACEHOLDER PROJECT 1 - Featured Portfolio Website
  {
    id: 'portfolio-website',
    title: 'Portfolio Personnel',
    description: 'Un portfolio moderne et interactif construit avec Next.js 15, TypeScript et Tailwind CSS. Inclut des animations fluides, un design responsive et des effets de parallaxe.',
    longDescription: 'Ce portfolio repousse les limites du web design moderne en combinant des animations 3D sophistiquées, un système de scroll immersif, et une esthétique Neo-Brutalist audacieuse. Chaque interaction est pensée pour créer une expérience mémorable, de la rotation de l\'avatar contrôlée par le scroll aux transitions fluides entre les sections.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: '/images/projects/portfolio-thumb.jpg',
    media: [
      {
        type: 'image',
        url: '/images/projects/portfolio-1.jpg',
        caption: 'Page d\'accueil avec avatar 3D interactif',
      },
      {
        type: 'image',
        url: '/images/projects/portfolio-2.jpg',
        caption: 'Section projets avec design Neo-Brutalist',
      },
    ],
    demoUrl: 'https://your-portfolio.com',
    githubUrl: 'https://github.com/yourusername/portfolio',
    featured: true,
    year: '2026',
    role: 'Design & Development',
    technologies: [
      {
        category: 'Frontend',
        items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
      },
      {
        category: 'Animation',
        items: ['Framer Motion', 'GSAP ScrollTrigger', 'Canvas API'],
      },
      {
        category: 'Tools',
        items: ['Figma', 'Git', 'Vercel'],
      },
    ],
    challenges: [
      'Synchroniser 173 frames d\'animation avec le scroll pour une rotation fluide à 60fps',
      'Créer un système de preload intelligent pour optimiser le temps de chargement',
      'Implémenter un design Neo-Brutalist cohérent tout en gardant une excellente UX',
    ],
    outcomes: [
      'Performance: 100/100 sur Lighthouse',
      'Temps de chargement < 2s avec preloader élégant',
      'Expérience utilisateur immersive et mémorable',
    ],
  },
  // PLACEHOLDER PROJECT 2 - E-commerce Application
  {
    id: 'ecommerce-app',
    title: 'Plateforme E-commerce',
    description: 'Application e-commerce full-stack avec gestion de panier, paiements sécurisés et tableau de bord admin. Interface utilisateur moderne et intuitive.',
    longDescription: 'Une plateforme e-commerce complète construite pour offrir une expérience d\'achat fluide et sécurisée. Le système inclut une gestion avancée des stocks, un tableau de bord admin complet, et une intégration Stripe pour les paiements. L\'architecture modulaire permet une scalabilité optimale.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    thumbnail: '/images/projects/ecommerce-thumb.jpg',
    media: [
      {
        type: 'image',
        url: '/images/projects/ecommerce-1.jpg',
        caption: 'Interface utilisateur avec panier et checkout',
      },
      {
        type: 'video',
        url: '/videos/projects/ecommerce-demo.mp4',
        caption: 'Démo du processus d\'achat complet',
      },
    ],
    demoUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    featured: true,
    year: '2025',
    client: 'Client Name',
    role: 'Full-Stack Development',
    technologies: [
      {
        category: 'Frontend',
        items: ['React', 'Redux Toolkit', 'Styled Components'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
      },
      {
        category: 'Payment',
        items: ['Stripe API', 'Webhooks'],
      },
    ],
    challenges: [
      'Implémenter un système de panier temps réel synchronisé entre devices',
      'Gérer les webhooks Stripe pour valider les paiements de manière sécurisée',
      'Optimiser les requêtes MongoDB pour des performances optimales',
    ],
    outcomes: [
      '+150% conversion rate vs ancien système',
      '99.9% uptime sur 6 mois',
      'Traitement de 10k+ transactions mensuelles',
    ],
  },
  // PLACEHOLDER PROJECT 3 - Task Management App
  {
    id: 'task-manager',
    title: 'Gestionnaire de Tâches',
    description: 'Application de gestion de tâches collaborative avec drag-and-drop, notifications en temps réel et synchronisation multi-appareils.',
    longDescription: 'Un outil de gestion de tâches conçu pour les équipes modernes. Combine une interface intuitive avec des fonctionnalités puissantes comme le drag-and-drop, les notifications push, et la synchronisation temps réel. Architecture basée sur WebSockets pour une collaboration fluide.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    thumbnail: '/images/projects/task-manager-thumb.jpg',
    media: [
      {
        type: 'gif',
        url: '/images/projects/task-manager-demo.gif',
        caption: 'Démo du système drag-and-drop en action',
      },
      {
        type: 'image',
        url: '/images/projects/task-manager-1.jpg',
        caption: 'Vue d\'ensemble du dashboard',
      },
    ],
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: false,
    year: '2025',
    role: 'Lead Developer',
    technologies: [
      {
        category: 'Frontend',
        items: ['Next.js 14', 'TypeScript', 'React DnD', 'TailwindCSS'],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'WebSockets'],
      },
      {
        category: 'Infrastructure',
        items: ['Docker', 'AWS', 'Redis Cache'],
      },
    ],
    challenges: [
      'Synchroniser l\'état des tâches en temps réel entre plusieurs utilisateurs',
      'Optimiser les performances du drag-and-drop pour des listes de 1000+ items',
      'Implémenter un système de conflit resolution pour les éditions simultanées',
    ],
    outcomes: [
      'Adopté par 500+ utilisateurs en 3 mois',
      'Réduction de 40% du temps de gestion de projet',
      'Rating 4.8/5 sur Product Hunt',
    ],
  },
];
