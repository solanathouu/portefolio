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
    thumbnail: '/projects/labonnenote-mascot.png',
    media: [
      {
        type: 'image',
        url: '/projects/labonnenote-mascot.png',
        caption: 'Mascotte LaBonneNote',
      },
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
    title: 'Hackathon PayFit — SEO',
    description:
      'Infrastructure IA de génération de contenu pour PayFit. Veille concurrentielle automatisée, audit GEO multi-IA, agent rédactionnel 4 étapes et newsletter Slack — 35h économisées.',
    longDescription:
      'Lors du hackathon PayFit, nous avons conçu une infrastructure complète de génération de contenu alliant masse, expertise SEO, conformité légale et agilité décisionnelle. L\'objectif : transformer 2h de rédaction manuelle en 15 minutes de leadership stratégique.\n\nLe système repose sur 4 briques :\n\n1. **Workflow Newsletter (N8N)** — Surveillance quotidienne de 4 concurrents (Factorial, Lucca, Cegid, Sage), filtrage automatique des articles de la veille, analyse IA (résumé + mots-clés SEO), classification par thème (Paie, RH, Droit du travail, Recrutement), synthèse quotidienne envoyée via Slack et email. Coût : 0.30€/mois en API.\n\n2. **Agent d\'Audit GEO** — Interroge 4 IA (ChatGPT, Claude, Gemini, Mistral) pour mesurer la visibilité de PayFit dans les réponses générées. Calcul de scores de visibilité, position moyenne, et recommandations d\'actions basées sur les sources citées.\n\n3. **Agent Maestro (Dust)** — Pipeline rédactionnel en 4 étapes : V1 article (blog_redactor) → vérification légale (legal_analyser) → vérification BDD liens et contenu (verif_bdd) → conformité structure PayFit, SEO et tone of voice (Conformity).\n\n4. **Multi-format** — Génération automatique d\'articles, visuels/infographies, podcasts audio et posts LinkedIn à partir du contenu produit.',
    tags: ['N8N', 'Dust', 'SEO', 'IA', 'Slack', 'Prompt Engineering'],
    thumbnail: '/projects/payfit-logo.png',
    media: [
      {
        type: 'image',
        url: '/projects/payfit-logo.png',
        caption: 'Logo PayFit',
      },
      {
        type: 'image',
        url: '/projects/payfit-workflow.png',
        caption: 'Workflow N8N — Veille concurrentielle et newsletter automatisée',
      },
      {
        type: 'image',
        url: '/projects/payfit-cover.png',
        caption: 'Présentation complète du projet (PDF)',
        linkUrl: '/projects/payfit-presentation.pdf',
      },
    ],
    featured: false,
    year: '2026',
    role: 'Automation & SEO Engineering',
    technologies: [
      {
        category: 'Automation',
        items: ['N8N', 'Dust (AI ecosystem)', 'Google Sheets', 'Slack API'],
      },
      {
        category: 'IA & APIs',
        items: ['ChatGPT', 'Claude', 'Gemini', 'Mistral', 'AI Analyse'],
      },
      {
        category: 'SEO & Contenu',
        items: [
          'Prompt Engineering',
          'GEO Audit',
          'Newsletter automation',
          'Multi-format (article, audio, visuel, LinkedIn)',
        ],
      },
    ],
    challenges: [
      'Industrialiser la création de contenu de 2h manuelles à 15 minutes de pilotage stratégique',
      'Mesurer la visibilité de PayFit dans les réponses de 4 moteurs IA différents (GEO Audit)',
      'Garantir zéro erreur légale via un pipeline de vérification en 4 étapes avec Dust',
      'Automatiser la veille concurrentielle quotidienne sur 4 concurrents RH majeurs',
    ],
    outcomes: [
      '35h de temps économisées par mois sur la production de contenu',
      'Pipeline rédactionnel 4 étapes : rédaction → légal → BDD → conformité SEO',
      'Veille concurrentielle automatique sur Factorial, Lucca, Cegid, Sage',
      'Coût opérationnel de 0.30€/mois en appels API',
    ],
  },
  // PROJECT 5 - Oppy (Hackathon Gemini)
  {
    id: 'oppy',
    title: 'Oppy — Hackathon Gemini 3',
    description:
      'Agent IA proactif qui scanne emails, calendrier et signaux web en continu pour générer un brief d\'action priorisé chaque matin. Zéro prompt, zéro bruit.',
    longDescription:
      'Oppy est un copilote IA proactif développé lors d\'un hackathon Gemini. Il tourne en continu en arrière-plan, scanne Gmail, Google Calendar et des signaux web externes, puis utilise un modèle HuggingFace cross-encoder pour scorer l\'urgence sémantique de chaque signal. Un moteur de règles déterministes décide quand agir, et génère un brief d\'action concis avec les prochaines étapes concrètes — le tout sans aucun prompt de l\'utilisateur. Pipeline en 4 étapes : Scan → Score → Decide → Brief.',
    tags: ['Gemini', 'Python', 'FastAPI', 'HuggingFace', 'Gmail API', 'Google Calendar'],
    thumbnail: '/projects/oppy-mascot.png',
    media: [
      {
        type: 'image',
        url: '/projects/oppy-mascot.png',
        caption: 'Mascotte Oppy',
      },
      {
        type: 'image',
        url: '/projects/oppy-1.png',
        caption: 'Oppy — Your proactive AI that acts before you even ask',
      },
      {
        type: 'image',
        url: '/projects/oppy-2.png',
        caption: 'Présentation complète du projet (PDF)',
        linkUrl: '/projects/oppy-presentation.pdf',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/hack-google',
    demoUrl: undefined,
    featured: false,
    year: '2026',
    role: 'Full-Stack Development',
    technologies: [
      {
        category: 'Backend',
        items: ['Python', 'FastAPI', 'Async Pipeline'],
      },
      {
        category: 'IA & Scoring',
        items: ['Google Gemini', 'HuggingFace cross-encoder', 'Reranker model'],
      },
      {
        category: 'APIs & Data',
        items: ['Gmail API', 'Google Calendar API', 'OAuth 2.0', 'Web Context scraping'],
      },
    ],
    challenges: [
      'Scanner en continu emails, calendrier et signaux web sans saturer les APIs',
      'Implémenter un scoring d\'urgence sémantique via HuggingFace cross-encoder (pas du keyword matching)',
      'Concevoir un moteur de règles déterministes fiable et auditable pour décider quand alerter',
      'Générer des briefs d\'action concis avec prochaines étapes concrètes, zéro bruit',
    ],
    outcomes: [
      'Boucle d\'intelligence en 4 étapes : Scan → Score → Decide → Brief',
      '90 minutes récupérées par jour en triage d\'emails et gestion de calendrier',
      'Scoring d\'urgence sémantique — pas de faux positifs par mots-clés',
      'Comportement prédictible et auditable grâce aux règles déterministes',
    ],
  },
];
