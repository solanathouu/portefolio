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
    linkUrl?: string; // If set, clicking opens this URL instead of lightbox
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
    thumbnail: '/projects/labonnenote-thumb.png',
    media: [
      {
        type: 'image',
        url: '/projects/labonnenote-3.png',
        caption: 'Quiz auto-générés avec scoring et feedback détaillé',
      },
      {
        type: 'image',
        url: '/projects/labonnenote-1.png',
        caption: 'Interface de chat avec détection automatique du niveau',
      },
      {
        type: 'image',
        url: '/projects/labonnenote-2.png',
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
    thumbnail: '/projects/tube-thumb.png',
    media: [
      {
        type: 'image',
        url: '/projects/tube-3.png',
        caption: 'Signalement en temps réel et validation communautaire',
      },
      {
        type: 'image',
        url: '/projects/tube-1.png',
        caption: 'Carte interactive avec signalements géolocalisés',
      },
      {
        type: 'image',
        url: '/projects/tube-2.png',
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
  // PROJECT 3 - B2B IT Catalog Scraper
  {
    id: 'b2b-it-catalog-scraper',
    title: 'B2B IT Catalog Scraper',
    description:
      'Scraper Python automatisé pour extraire +8 800 produits IT depuis le catalogue B2B TD Synnex. 11 catégories, 440+ spécifications techniques, export CSV.',
    longDescription:
      'Ce scraper Python extrait automatiquement l\'intégralité du catalogue IT de TD Synnex France (plateforme InTouch) : plus de 8 800 produits répartis en 11 catégories hardware. Le script interroge les endpoints REST de l\'API InTouch, gère la pagination intelligente (100 produits par page), récupère les prix par batch via un endpoint dédié, et extrait dynamiquement plus de 440 spécifications techniques par produit. Le tout est exporté en CSV (~11 Mo) prêt à alimenter un configurateur B2B IT. Exécution complète en ~5 minutes avec rate limiting respectueux (1 req/s).',
    tags: ['Python', 'Web Scraping', 'REST API', 'CSV'],
    thumbnail: '/projects/scraper-thumb.png',
    media: [
      {
        type: 'image',
        url: '/projects/scraper-3.png',
        caption: 'Architecture du pipeline et rate limiting',
      },
      {
        type: 'image',
        url: '/projects/scraper-1.png',
        caption: 'Extraction automatisée de +8 800 produits IT',
      },
      {
        type: 'image',
        url: '/projects/scraper-2.png',
        caption: 'Export CSV avec 440+ spécifications techniques',
      },
      {
        type: 'image',
        url: '/projects/scraper-4.png',
        caption: 'Présentation complète du projet (PDF)',
        linkUrl: '/projects/scraper-presentation.pdf',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/b2b-it-catalog-scraper',
    featured: false,
    year: '2025',
    role: 'Data Engineering',
    technologies: [
      {
        category: 'Backend',
        items: ['Python 3', 'urllib.request', 'json', 're'],
      },
      {
        category: 'Data',
        items: ['CSV export', 'Batch processing', 'REST API parsing'],
      },
      {
        category: 'API',
        items: ['TD Synnex InTouch REST', 'Session authentication'],
      },
    ],
    challenges: [
      'Extraire +8 800 produits avec pagination automatique sur 11 catégories',
      'Parser dynamiquement 440+ spécifications techniques sans librairie externe',
      'Implémenter un rate limiting respectueux (1 req/s) pour éviter le blocage',
      'Gérer l\'authentification par session cookie sur la plateforme InTouch',
    ],
    outcomes: [
      '8 800+ produits IT extraits avec métadonnées complètes',
      '11 catégories hardware couvertes (PC, serveurs, réseau, stockage...)',
      'Export CSV de ~11 Mo prêt pour intégration configurateur B2B',
      'Zéro dépendance externe — Python standard library uniquement',
    ],
  },
  // PROJECT 4 - Hackathon Payfit SEO
  {
    id: 'hackathon-payfit-seo',
    title: 'Hackathon Payfit — SEO',
    description:
      'Hackathon d\'entreprise chez Payfit autour de l\'optimisation SEO. Conception et implémentation de solutions pour améliorer la visibilité et le référencement.',
    tags: ['SEO', 'Hackathon', 'Payfit'],
    thumbnail: '',
    media: [],
    featured: false,
    year: '2025',
    role: 'Participant',
  },
];
