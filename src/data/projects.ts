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
  linkedinUrl?: string; // Lien vers le post LinkedIn associé au projet
  coverFit?: 'cover' | 'contain'; // Comportement du visuel de couverture (default: cover)
  coverBackground?: string; // Background CSS appliqué quand coverFit='contain'
  coverPadding?: { card?: number; hero?: number }; // Padding custom (défaut card=40 / hero=60)
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
  // P1 (tall) — LaBonneNote
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
  // P2 — Hackathon Mirakl x Eugenia
  {
    id: 'hackathon-mirakl',
    title: 'Hackathon Mirakl x Eugenia',
    description:
      'Agent Led Merchant Company — assistant invisible "Leia" pour vendeur multi-marketplaces. Rôle CTO sur 5 jours de hackathon Mirakl x OpenAI, pitch chez Mirakl.',
    longDescription:
      'Hackathon de 5 jours organisé par Mirakl x OpenAI x Eugenia (avril 2026). 70 étudiants, 3 défis montés par les équipes Data & AI de Mirakl. Notre équipe a pris UC1 — Agent Led Merchant Company : construire une "entreprise pilotée par des agents" pour un petit vendeur multi-marketplaces. Persona imposé : Jean-Charles, 47 ans, ébéniste en Savoie, 200 SKUs sur 6 marketplaces (Amazon FR/IT/DE + Google Shopping FR/IT/DE).\n\nLe parti pris produit : "Invisible AI". L\'outil ressemble à un back-office marketplace familier, des agents tournent en arrière-plan, mais le seller ne voit jamais l\'IA. Vocabulaire 100 % métier (proposition, alerte, à valider) — jamais agent, copilot, IA. Feature killer : Calendar-Aware Restock Advisor — quand Jean-Charles déclare un congé, l\'outil projette automatiquement un plan de restock avant fermeture.\n\nMascotte Leia (orbe flottant + overlay Spotlight macOS, backdrop-blur), input vocal Whisper, workflow n8n exportable, modèle gpt-4.1 partout. Pitch présenté le 24 avril 2026 chez Mirakl, 12 rue de Lubeck.',
    tags: ['Next.js', 'OpenAI gpt-4.1', 'Whisper', 'n8n', 'Hackathon'],
    thumbnail: '/projects/mirakl-logo.png',
    media: [
      {
        type: 'image',
        url: '/projects/mirakl-logo.png',
        caption: 'Logo Mirakl',
      },
      {
        type: 'image',
        url: '/projects/mirakl-event-1.JPG',
        caption: 'Hackathon Mirakl — salle / équipe / ambiance',
      },
      {
        type: 'image',
        url: '/projects/mirakl-event-2.JPG',
        caption: 'Pitch en direct chez Mirakl (12 rue de Lubeck)',
      },
      {
        type: 'image',
        url: '/projects/mirakl-event-3.JPG',
        caption: 'Équipe sur place — Mirakl HQ',
      },
      {
        type: 'image',
        url: '/projects/mirakl-1.png',
        caption: 'Leia — mascotte orbe (assistant invisible)',
      },
      {
        type: 'image',
        url: '/projects/mirakl-2.png',
        caption: 'Persona Jean-Charles — ébéniste Savoie, 47 ans, 6 marketplaces',
      },
      {
        type: 'image',
        url: '/projects/mirakl-3.png',
        caption: 'Dashboard back-office — feed de cartes bento, IA en arrière-plan',
      },
      {
        type: 'image',
        url: '/projects/mirakl-4.png',
        caption: 'Pitch deck complet (HTML) — Jean-Charles Pro Max + scale story',
        linkUrl: '/projects/mirakl-pitch.html',
      },
    ],
    githubUrl: 'https://github.com/Ianlaur/Hackathon_mirakl/pull/9',
    featured: true,
    year: '2026',
    role: 'CTO — Hackathon team',
    technologies: [
      {
        category: 'Frontend',
        items: ['Next.js', 'TypeScript', 'React'],
      },
      {
        category: 'IA & Voice',
        items: ['OpenAI gpt-4.1', 'OpenAI Whisper', 'Dust orchestrator'],
      },
      {
        category: 'Automation',
        items: ['n8n workflows', 'Webhooks'],
      },
      {
        category: 'Méthodo',
        items: ['Invisible AI principles', 'Persona-first UX'],
      },
    ],
    challenges: [
      'Imaginer une UX où l\'IA est invisible — vocabulaire 100 % métier, zéro mot "agent" ou "IA" exposé au seller',
      'Construire un Calendar-Aware Restock Advisor : projection de stock multi-marketplaces déclenchée par un congé',
      'Migrer le modèle gpt-4o → gpt-4.1 sans casser temperature: 0.2 (gpt-5 incompatible reasoning)',
      'Designer un pitch deck éditorial autoportant (HTML standalone, images base64, 11 slides EN+FR)',
    ],
    outcomes: [
      'Pitch présenté le 24 avril 2026 chez Mirakl (12 rue de Lubeck)',
      'PR #9 ouverte sur le repo équipe (rebrand Mira → Leia, EN partout, gpt-4.1)',
      '7 tools chat (stock + calendar + restock + emails) avec clarification stricte des dates ambiguës',
      'Workflow n8n exportable et input vocal Whisper opérationnels en démo',
    ],
  },
  // P3 — Tube
  {
    id: 'tube',
    title: 'Tube',
    description:
      'Application mobile communautaire de signalement en temps réel pour le métro parisien. Carte interactive, gamification XP et intégration données officielles RATP.',
    longDescription:
      'Tube permet aux usagers du métro parisien de signaler et consulter en temps réel les incidents, contrôles, travaux et pannes sur le réseau. Chaque signalement est validé par vote communautaire. L\'app intègre les données officielles RATP/IDFM via l\'API PRIM, un système de gamification complet (XP, niveaux, badges, classement), le partage de trajet en direct, et la gestion d\'amis. 302 stations avec coordonnées GPS, carte Google Maps avec clustering de marqueurs.',
    tags: ['React Native', 'Expo', 'Supabase', 'PostGIS'],
    thumbnail: '/projects/tube.png',
    coverFit: 'contain',
    coverBackground: '#ffffff',
    coverPadding: { card: 70, hero: 100 },
    media: [
      {
        type: 'image',
        url: '/projects/tube.png',
        caption: 'Logo Tube',
      },
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
  // P4 — Hackathon Replit — SwapJob
  {
    id: 'hackathon-replit-swapjob',
    title: 'SwapJob — Hackathon Replit',
    description:
      '"Tinder des postes" pour rapprocher domicile et travail. App mobile construite en 1 h via Replit Agent, en binôme avec Hanine. 4 M Français concernés, 2,9 Mt CO₂ évitées.',
    longDescription:
      'Hackathon bonus Replit chez Eugenia (avril 2026). En binôme avec Hanine, on a construit le MVP en 1 h via Replit Agent. Concept : une app mobile de swipe (Tinder-like) qui permet à deux salariés du même métier d\'échanger leurs postes pour réduire leurs trajets domicile-travail. Inspiré du concept "Mercato des Postes" porté par le Forum Vies Mobiles + CNRS.\n\nLes chiffres qui justifient le projet : 4 millions de salariés français concernés (13,2 % des actifs), 15 km de réduction moyenne par trajet, 120 h libérées par an et par personne, 2,9 Mt CO₂ évitées chaque année (9 % des objectifs France 2030). 80 % des Français y sont favorables, 61 % des actifs intéressés.\n\nL\'app est en React Native + Expo, déployée live sur Replit (Expo Go preview). Algorithme de matching custom basé sur Haversine + score composite (40 % gain total + 30 % équilibre + 20 % métier + 10 % horaires). Onboarding, swipe, modal de match avec impact chiffré (km, €, CO₂), 50 profils seedés sur l\'Île-de-France (restauration / café).',
    tags: ['React Native', 'Expo', 'Replit Agent', 'Hackathon'],
    thumbnail: '/projects/replit-color.png',
    coverFit: 'contain',
    coverBackground: 'radial-gradient(circle at 30% 30%, #1a1a2e 0%, #0E1525 60%, #050810 100%)',
    media: [
      {
        type: 'image',
        url: '/projects/replit-color.png',
        caption: 'Logo Replit',
      },
      {
        type: 'image',
        url: '/projects/swapjob-1.png',
        caption: 'Écran de swipe — profils compatibles + score de gain mutuel',
      },
      {
        type: 'image',
        url: '/projects/swapjob-2.png',
        caption: 'Carte — visualisation des trajets domicile-travail',
      },
      {
        type: 'image',
        url: '/projects/swapjob-3.png',
        caption: 'Modal de match + impact détaillé (km, €, CO₂)',
      },
    ],
    demoUrl: 'https://swap-job-finder.replit.app',
    featured: true,
    year: '2026',
    role: 'Full-Stack Mobile — Binôme avec Hanine',
    technologies: [
      {
        category: 'Mobile',
        items: ['React Native', 'Expo', 'TypeScript'],
      },
      {
        category: 'Build',
        items: ['Replit Agent', 'Replit Deploy', 'Expo Go preview'],
      },
      {
        category: 'Logique métier',
        items: ['Haversine matching', 'Score composite 4 axes', '50 profils seedés IDF'],
      },
    ],
    challenges: [
      'Designer un algorithme de matching bilatéral équitable : Haversine + score composite (gain, équilibre, métier, horaires)',
      'Concevoir le scope MVP réalisable en 1 h via Replit Agent (binôme + temps contraint)',
      'Construire un swipe Tinder-like fluide avec match modal animé + impact chiffré',
      'Pitcher un projet à fort impact sociétal en 3-4 minutes — 4 M Français, 2,9 Mt CO₂, 1 500 €/an',
    ],
    outcomes: [
      'MVP mobile fonctionnel construit en 1 h en binôme avec Hanine via Replit Agent',
      'App déployée live sur Replit (preview Expo Go)',
      '50 profils seedés sur l\'Île-de-France (métier restauration / café)',
      'Algorithme de matching avec seuil 3 km + top 10 (Haversine + composite)',
    ],
  },
  // P5 — Oppy (Hackathon Gemini)
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
  // P6 (wide) — Hackathon Payfit SEO
  {
    id: 'hackathon-payfit-seo',
    title: 'Hackathon PayFit — SEO',
    description:
      'Infrastructure IA de génération de contenu pour PayFit. Veille concurrentielle automatisée, audit GEO multi-IA, agent rédactionnel 4 étapes et newsletter Slack — 35 h économisées.',
    longDescription:
      'Projet réalisé lors d\'un hackathon interne chez PayFit avec l\'équipe Content & SEO. Le constat de départ : la production de contenu prenait trop de temps et manquait de réactivité face à la concurrence.\n\nOn a construit une chaîne complète qui automatise la veille concurrentielle, génère des articles optimisés SEO et les fait valider automatiquement sur le plan légal et éditorial avant publication. Le tout orchestré par des agents IA sur N8N et Dust, avec une synthèse quotidienne envoyée dans Slack pour que l\'équipe garde la main sur la stratégie sans perdre de temps sur l\'exécution.',
    tags: ['N8N', 'Dust', 'SEO', 'IA', 'Slack', 'Prompt Engineering'],
    thumbnail: '/projects/payfit-logo.png',
    coverFit: 'contain',
    coverBackground: '#ffffff',
    coverPadding: { card: 40, hero: 80 },
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
      '35 h de temps économisées par mois sur la production de contenu',
      'Pipeline rédactionnel 4 étapes : rédaction → légal → BDD → conformité SEO',
      'Veille concurrentielle automatique sur Factorial, Lucca, Cegid, Sage',
      'Coût opérationnel de 0,30 €/mois en appels API',
    ],
  },
  // P7 — B2B IT Catalog Scraper
  {
    id: 'b2b-it-catalog-scraper',
    title: 'B2B IT Catalog Scraper',
    description:
      'Scraper Python automatisé pour extraire +8 800 produits IT depuis le catalogue B2B TD Synnex. 11 catégories, 440+ spécifications techniques, export CSV.',
    longDescription:
      'Ce scraper Python extrait automatiquement l\'intégralité du catalogue IT de TD Synnex France (plateforme InTouch) : plus de 8 800 produits répartis en 11 catégories hardware. Le script interroge les endpoints REST de l\'API InTouch, gère la pagination intelligente (100 produits par page), récupère les prix par batch via un endpoint dédié, et extrait dynamiquement plus de 440 spécifications techniques par produit. Le tout est exporté en CSV (~11 Mo) prêt à alimenter un configurateur B2B IT. Exécution complète en ~5 minutes avec rate limiting respectueux (1 req/s).',
    tags: ['Python', 'Web Scraping', 'REST API', 'CSV'],
    thumbnail: '/projects/scraper-miniature.png',
    coverFit: 'contain',
    coverBackground: '#0B182D',
    media: [
      {
        type: 'image',
        url: '/projects/scraper-miniature.png',
        caption: 'Logo B2B IT Catalog Scraper',
      },
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
  // P8 (tall) — DataGouv Prospection B2B
  {
    id: 'datagouv',
    title: 'DataGouv — Prospection B2B',
    description:
      'Outil de prospection B2B pour commerciaux non-techniques. 6 M entreprises françaises, recherche en langage naturel via Gemini, MCP DataGouv, MVP open source.',
    longDescription:
      'Outil de prospection B2B exploitant les données ouvertes françaises via le MCP DataGouv et l\'API Recherche Entreprises. 6 millions d\'entreprises accessibles : dirigeants, adresses, SIRET, chiffre d\'affaires, codes NAF — toutes en open data depuis des années, mais inaccessibles aux commerciaux non-techniques (API, JSON, codes NAF).\n\nLa solution : un chatbot Gemini qui comprend le français et traduit les requêtes en filtres API. "Restaurants à Lyon avec plus de 20 salariés", "Boulangeries à Marseille créées depuis 2023" → liste exportable en CSV/Excel en 3 secondes. 4 pages : recherche (chat + filtres avancés + carte Leaflet), assistant conversationnel, gestion de listes (CRUD + export), dashboard KPIs.\n\nApproche hybride progressive : API en temps réel + cache SQLite 7 jours. Mono-utilisateur, pas d\'auth. Stack : Next.js 15 + TypeScript + Tailwind + shadcn/ui + Drizzle + Gemini 2.0 Flash + Leaflet + Recharts. Score Rodin 7/10. Open source.',
    tags: ['Next.js 15', 'Gemini', 'MCP', 'SQLite', 'Open Data'],
    thumbnail: '/projects/datagouv-marianne.png',
    coverFit: 'contain',
    coverBackground: '#ffffff',
    coverPadding: { card: 50, hero: 90 },
    media: [
      {
        type: 'image',
        url: '/projects/datagouv-marianne.png',
        caption: 'République Française — source des données ouvertes (data.gouv.fr)',
      },
      {
        type: 'image',
        url: '/projects/datagouv-1.png',
        caption: 'Recherche en langage naturel + synthèse IA Gemini + résultats',
      },
      {
        type: 'image',
        url: '/projects/datagouv-2.png',
        caption: 'Vue carte Leaflet — résultats géolocalisés',
      },
      {
        type: 'image',
        url: '/projects/datagouv-3.png',
        caption: 'Dashboard — KPIs, secteurs, départements, historique',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/mcp-gouv',
    featured: false,
    year: '2026',
    role: 'Full-Stack Development',
    technologies: [
      {
        category: 'Frontend',
        items: ['Next.js 15', 'TypeScript', 'Tailwind', 'shadcn/ui', 'Recharts'],
      },
      {
        category: 'Backend & DB',
        items: ['Drizzle ORM', 'SQLite', 'API Routes'],
      },
      {
        category: 'IA & Data',
        items: ['Gemini 2.0 Flash', 'MCP DataGouv', 'API Recherche Entreprises'],
      },
      {
        category: 'Carte',
        items: ['Leaflet', 'OpenStreetMap'],
      },
    ],
    challenges: [
      'Traduire des requêtes en langage naturel français vers des filtres API (codes NAF, SIRET, géo)',
      'Implémenter une approche hybride API temps réel + cache SQLite 7 jours pour économiser les quotas',
      'Intégrer le MCP DataGouv pour enrichir avec datasets publics (subventions, marchés publics)',
      'Designer une UX pour commerciaux non-techniques — masquer toute la complexité API/JSON',
    ],
    outcomes: [
      '6 millions d\'entreprises françaises accessibles depuis une UI grand public',
      '4 pages métier (recherche, chatbot, listes prospects, dashboard KPIs)',
      '34 tests passent, build clean, score Rodin 7/10',
      'Export CSV/Excel + carte Leaflet + historique persistant SQLite',
    ],
  },
  // P9 — SEO-hanine — Audit SEO & GEO Eugenia
  {
    id: 'seo-hanine',
    title: 'Audit SEO & GEO — Eugenia School',
    description:
      'Audit complet de visibilité (Google + IA) pour Eugenia School. 4 IA benchmarkées, 5 sections, score 2/10. Crawl4AI, Lighthouse, Remotion, livrable 1199 lignes.',
    longDescription:
      'Module M1 "Search Visibility Strategy 2026" — analyser et améliorer la visibilité d\'Eugenia School (école IA & Business, Paris 10e). Audit en 5 sections : Présence Google (13 requêtes vérifiées manuellement avec captures), Présence IA / GEO (4 IA × 6 requêtes), Contenus existants (16 pages, llms.txt, security headers, OG tags), Analyse concurrentielle (5 concurrents + benchmark technique 6 homepages SSR/CSR), Plan d\'action en 3 phases.\n\nScore global Eugenia : 2/10. Score Rodin du projet : 7,5/10. Livrable final fusionné : 1199 lignes (Partie 1 livrable + Partie 2 annexes A-E). Présentation HTML 26 slides concises (+ branche détaillée 31 slides) avec animation countdown 10→2 (CSS/JS pur + version Remotion + React Three Fiber 3D globe). Article SEO pilier "alternatives Parcoursup" (~3 000 mots). 8 schémas JSON-LD prêts pour Webflow.',
    tags: ['Crawl4AI', 'Lighthouse', 'Remotion', 'GEO', 'Multi-IA Benchmark'],
    thumbnail: '/projects/eugenia-logo.png',
    coverFit: 'contain',
    coverBackground: '#7f050d',
    media: [
      {
        type: 'image',
        url: '/projects/eugenia-logo.png',
        caption: 'Logo Eugenia School',
      },
      {
        type: 'image',
        url: '/projects/seo-hanine-1.png',
        caption: 'Cover éditoriale — Dossier d\'enquête, style papier crème',
      },
      {
        type: 'image',
        url: '/projects/seo-hanine-2.png',
        caption: 'Verdict 2/10 — méthodologie multi-IA + tampon "Invisible"',
      },
      {
        type: 'image',
        url: '/projects/seo-hanine-3.png',
        caption: 'Présentation complète — Invisible sur Google, invisible sur les IA',
        linkUrl: '/projects/seo-hanine-presentation.html',
      },
    ],
    githubUrl: 'https://github.com/solanathouu/seo-hanine',
    featured: false,
    year: '2026',
    role: 'SEO Audit & Strategy',
    technologies: [
      {
        category: 'Crawl & Audit',
        items: ['Crawl4AI', 'Lighthouse 13', 'WebFetch live'],
      },
      {
        category: 'Benchmark IA',
        items: ['OpenAI gpt-4o-mini', 'Gemini 2.5-flash-lite', 'Claude Opus 4.6', 'Perplexity'],
      },
      {
        category: 'Présentation',
        items: ['HTML/CSS/JS pur', 'Remotion', 'React Three Fiber'],
      },
      {
        category: 'Livrables',
        items: ['JSON-LD schemas', 'Article pilier', 'Wikipedia draft'],
      },
    ],
    challenges: [
      'Benchmarker la visibilité d\'Eugenia sur 4 IA (ChatGPT, Gemini, Claude, Perplexity) avec critique méthodologique',
      'Crawler + auditer techniquement 6 homepages concurrentes (SSR vs CSR, Core Web Vitals, security headers)',
      'Construire une animation countdown 3D du score (Remotion + React Three Fiber globe)',
      'Vérifier manuellement chaque constat critique (SERPs, annuaires, Trustpilot, YouTube) pour zéro hallucination',
    ],
    outcomes: [
      'Livrable final fusionné de 1199 lignes (Partie 1 + Annexes A-E)',
      'Présentation HTML 26 slides + version détaillée 31 slides (mode édition + persistance localStorage)',
      'Article SEO pilier "alternatives Parcoursup" (~3 000 mots) + 8 schémas JSON-LD prêts pour Webflow',
      'Score Rodin 7,5/10 — projet clos côté livrables',
    ],
  },
  // P10 (wide) — Hackathon Dust × Eugenia (organisation + DA)
  {
    id: 'hackathon-dust-eugenia',
    title: 'Hackathon Dust × Eugenia',
    description:
      'Organisation et direction artistique du hackathon Dust × Eugenia (29 mai 2026). Pilotage opérationnel, DA pixel art « Claude Boy », supports physiques et logistique des soirées.',
    longDescription:
      'Hackathon Dust × Eugenia du 29 mai 2026, co-brandé avec Dust comme partenaire principal. Je n\'y ai pas participé en tant que candidat : je l\'ai organisé, aux côtés d\'Ali et de Stéphane (directeur). Pilotage opérationnel partagé, de la définition du matériel jusqu\'à la logistique des trois soirées de la semaine.\n\nVolet direction artistique : création de la DA pixel art « Claude Boy » (chibi SD, palette temporelle matin → nuit) et de sa série de 5 affiches A2 portrait storytelling mettant en scène le trio orga et la mascotte Clio. Convergence chromatique pensée avec l\'identité Eugenia (bordeaux #7C1C1C, ocre #E8B441) et la DA dev navy. Premier déploiement IRL de cette direction artistique personal brand.\n\nVolet production & logistique : design des cravates custom bordeaux × logos tech AI monochrome ocre (Eugenia, Anthropic, OpenAI, Gemini, Dust, Mistral, Meta, Hugging Face, GitHub), sourcing des impressions (affiches, stickers, t-shirts dream team), et chiffrage des devis sécurité + nettoyage pour les soirées de la semaine.',
    tags: ['Organisation', 'Direction Artistique', 'Pixel Art', 'Event', 'Dust'],
    thumbnail: '/projects/dust-cover.png',
    coverFit: 'contain',
    coverBackground: '#F2F1EC',
    media: [
      {
        type: 'image',
        url: '/projects/dust-cover.png',
        caption: 'Hackathon Dust × Eugenia — 29 mai 2026',
      },
      {
        type: 'image',
        url: '/projects/dust-affiche.png',
        caption: 'DA « Claude Boy » — affiche storytelling (trio orga + mascotte Clio devant la façade Eugenia)',
      },
      {
        type: 'image',
        url: '/projects/dust-photo-1.jpg',
        caption: 'Ambiance hackathon — amphi central sous la verrière',
      },
      {
        type: 'image',
        url: '/projects/dust-photo-2.jpg',
        caption: 'Pitch des participants — t-shirts Eugenia',
      },
    ],
    featured: false,
    year: '2026',
    client: 'Eugenia School × Dust',
    role: 'Organisation & Direction Artistique',
    technologies: [
      {
        category: 'Direction Artistique',
        items: ['DA pixel art « Claude Boy »', 'Série 5 affiches A2', 'Figma post-prod'],
      },
      {
        category: 'Génération visuelle',
        items: ['ChatGPT image', 'Gemini / nano-banana', 'Pixel art chibi SD'],
      },
      {
        category: 'Production physique',
        items: ['Affiches A2', 'Cravates custom', 'Stickers', 'T-shirts dream team'],
      },
      {
        category: 'Pilotage',
        items: ['Coordination trio orga', 'Sourcing impression', 'Logistique soirées'],
      },
    ],
    challenges: [
      'Co-piloter l\'organisation d\'un hackathon co-brandé Dust à trois (Nathan, Ali, Stéphane) sur une semaine d\'événements',
      'Créer une DA pixel art « Claude Boy » cohérente (chibi SD strict, composition unifiée anti-collage) et la décliner en 5 affiches storytelling',
      'Faire converger la DA Claude Boy avec l\'identité Eugenia (bordeaux / ocre) et la DA dev navy',
      'Sourcer et caler la production physique (affiches, cravates, stickers, t-shirts) dans un timing serré',
    ],
    outcomes: [
      'Hackathon Dust × Eugenia tenu le 29 mai 2026 — événement bien déroulé',
      'Premier déploiement IRL de la direction artistique « Claude Boy »',
      'Série de 5 affiches A2 storytelling finalisée + cravates trio validées',
      'Devis sécurité + nettoyage chiffrés et engagés pour les soirées de la semaine',
    ],
  },
];
