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
  // PROJECT 1 - LaBonneNote
  {
    id: 'labonnenote',
    title: 'LaBonneNote',
    description:
      'Assistant éducatif intelligent pour collégiens (6e-3e) avec chatbot RAG, bibliothèque de 24 000+ articles et quiz auto-générés. Zéro hallucination garanti.',
    longDescription:
      'LaBonneNote est un assistant pédagogique basé sur le RAG (Retrieval-Augmented Generation) qui répond aux questions des collégiens en s\'appuyant exclusivement sur sa base de connaissances de 43 857 chunks issus de Vikidia. Le système détecte automatiquement le niveau (6e-3e) et la matière, adapte ses réponses pédagogiquement, et cite ses sources. La bibliothèque intégrée couvre 8 matières avec recherche full-text en temps réel. Les quiz sont générés automatiquement à partir de n\'importe quelle leçon avec scoring détaillé et feedback par question.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'GPT-4o-mini'],
    thumbnail: '/projects/labonnenote-thumb.jpg',
    media: [
      {
        type: 'image',
        url: '/projects/labonnenote-1.jpg',
        caption: 'Interface de chat avec détection automatique du niveau',
      },
      {
        type: 'image',
        url: '/projects/labonnenote-2.jpg',
        caption: 'Bibliothèque de 24 321 articles organisés par matière',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/LaBonneNote',
    featured: true,
    year: '2026',
    role: 'Full-Stack Development',
    technologies: [
      {
        category: 'Backend',
        items: ['Python 3.11', 'FastAPI', 'Uvicorn', 'LangChain'],
      },
      {
        category: 'IA & Data',
        items: [
          'OpenAI GPT-4o-mini',
          'ChromaDB',
          'text-embedding-3-small',
          'RAG Pipeline',
        ],
      },
      {
        category: 'Scraping',
        items: ['cloudscraper', 'BeautifulSoup', 'MediaWiki API'],
      },
      {
        category: 'Frontend',
        items: ['HTML', 'CSS', 'JavaScript (vanilla)'],
      },
    ],
    challenges: [
      'Scraper 24 321 articles Vikidia en contournant Cloudflare via MediaWiki API',
      'Construire un pipeline RAG avec chunking ~500 tokens et overlap 50 pour garantir zéro hallucination',
      'Détecter automatiquement le niveau scolaire et la matière pour adapter les réponses pédagogiquement',
      'Générer des quiz pertinents de manière asynchrone avec traitement parallèle',
    ],
    outcomes: [
      '43 857 chunks indexés couvrant 8 matières du collège',
      '11 endpoints API (chat, bibliothèque, quiz, upload PDF)',
      'Recherche full-text instantanée sur 24 321 articles',
      'Import de cours personnels par drag-and-drop PDF',
    ],
  },
  // PROJECT 2 - Tube
  {
    id: 'tube',
    title: 'Tube',
    description:
      'Application mobile communautaire de signalement en temps réel pour le métro parisien. Carte interactive, gamification XP et intégration données officielles RATP.',
    longDescription:
      'Tube permet aux usagers du métro parisien de signaler et consulter en temps réel les incidents, contrôles, travaux et pannes sur le réseau. Chaque signalement est validé par vote communautaire. L\'app intègre les données officielles RATP/IDFM via l\'API PRIM, un système de gamification complet (XP, niveaux, badges, classement), le partage de trajet en direct, et la gestion d\'amis. 302 stations avec coordonnées GPS, carte Google Maps avec clustering de marqueurs.',
    tags: ['React Native', 'Expo', 'Supabase', 'PostGIS'],
    thumbnail: '/projects/tube-thumb.jpg',
    media: [
      {
        type: 'image',
        url: '/projects/tube-1.jpg',
        caption: 'Carte interactive avec signalements géolocalisés',
      },
      {
        type: 'image',
        url: '/projects/tube-2.jpg',
        caption: 'Système de gamification et profil utilisateur',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/Tube',
    featured: true,
    year: '2026',
    role: 'Full-Stack Mobile Development',
    technologies: [
      {
        category: 'Mobile',
        items: ['React Native 0.81', 'Expo SDK 54', 'React Navigation 6'],
      },
      {
        category: 'Backend',
        items: ['Supabase', 'PostgreSQL', 'PostGIS', 'Row Level Security'],
      },
      {
        category: 'APIs & Services',
        items: [
          'PRIM Île-de-France Mobilités',
          'Google Maps',
          'Firebase Cloud Messaging',
        ],
      },
      {
        category: 'UI',
        items: [
          'React Native Paper',
          'Reanimated',
          'Vector Icons',
          'AsyncStorage',
        ],
      },
    ],
    challenges: [
      'Géolocaliser et afficher des signalements sur 302 stations avec clustering performant',
      'Implémenter un système de gamification complet (5 niveaux, XP, streaks, classement)',
      'Intégrer les données officielles RATP/IDFM en temps réel via l\'API PRIM',
      'Sécuriser les données avec Row Level Security sur toutes les tables Supabase',
    ],
    outcomes: [
      '302 stations du métro parisien avec coordonnées GPS',
      '4 types de signalement avec validation communautaire par votes',
      'Système social complet (amis, partage de trajet en direct)',
      '12 migrations SQL avec schéma PostGIS, fonctions et triggers',
    ],
  },
  // PROJECT 3 - Portfolio
  {
    id: 'portfolio-website',
    title: 'Portfolio Personnel',
    description:
      'Portfolio web interactif avec avatar 3D animé par le scroll, particules canvas et design Neo-Brutalist. Construit avec Next.js 15, TypeScript et Tailwind CSS.',
    longDescription:
      'Ce portfolio repousse les limites du web design moderne en combinant un avatar 3D composé de 173 frames PNG synchronisées au scroll, un système de particules canvas avec répulsion souris, et une esthétique Neo-Brutalist audacieuse. Chaque interaction est pensée pour créer une expérience mémorable, de la rotation immersive de l\'avatar aux transitions fluides entre les sections.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: '/projects/portfolio-thumb.jpg',
    media: [
      {
        type: 'image',
        url: '/projects/portfolio-1.jpg',
        caption: "Page d'accueil avec avatar 3D interactif",
      },
      {
        type: 'image',
        url: '/projects/portfolio-2.jpg',
        caption: 'Section projets avec design Neo-Brutalist',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/portefolio',
    featured: false,
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
        category: 'Outils',
        items: ['Git', 'Vercel'],
      },
    ],
    challenges: [
      'Synchroniser 173 frames PNG avec le scroll pour une rotation fluide à 60fps',
      'Créer un système de particules canvas avec répulsion souris sans librairie externe',
      'Implémenter un design Neo-Brutalist cohérent tout en gardant une excellente UX',
    ],
    outcomes: [
      'Rotation avatar 360° contrôlée par le scroll avec preload intelligent',
      '200 particules animées avec scintillement et physique de répulsion',
      'SSG avec pages projets statiques, metadata SEO et custom 404',
    ],
  },
];
