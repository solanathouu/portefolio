# Design du Portfolio Étudiant Moderne

**Date:** 2026-02-05
**Type:** Portfolio personnel
**Tech Stack:** Next.js 14+, React, Tailwind CSS, Framer Motion, GSAP

---

## 🎯 Vue d'ensemble

Portfolio web moderne et immersif avec focus sur l'impact visuel et les animations fluides, inspiré de sites premium comme igloo.inc. La fonctionnalité phare est une intro interactive avec un avatar 3D animé contrôlé par le scroll.

### Objectifs
- Présenter projets et compétences de manière visuellement impressionnante
- Créer une expérience mémorable et unique avec l'avatar interactif
- Démontrer la maîtrise des technologies web modernes
- Se démarquer des portfolios standards

---

## 🛠 Stack Technique

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **UI:** React 18+
- **Styling:** Tailwind CSS
- **Animations:**
  - Framer Motion (animations React déclaratives)
  - GSAP (ScrollTrigger, ScrollSmoother pour animations avancées)
- **Canvas:** HTML5 Canvas pour séquence d'images avatar
- **Icônes:** React Icons + logos SVG personnalisés

### Outils & Déploiement
- **TypeScript** pour type safety
- **ESLint + Prettier** pour code quality
- **Git** pour versioning
- **Vercel** pour déploiement

---

## 📁 Architecture du Projet

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Page principale (toutes sections)
│   │   ├── layout.tsx         # Layout racine
│   │   └── globals.css        # Styles globaux
│   │
│   ├── components/
│   │   ├── layout/            # Composants de structure
│   │   │   ├── Header.tsx     # Navigation (apparaît après intro)
│   │   │   ├── Footer.tsx     # Footer minimal
│   │   │   └── CustomCursor.tsx
│   │   │
│   │   ├── sections/          # Sections principales
│   │   │   ├── Preloader.tsx  # Barre de chargement
│   │   │   ├── Hero.tsx       # Intro avec avatar
│   │   │   ├── Projects.tsx   # Galerie de projets
│   │   │   ├── Skills.tsx     # Compétences par catégories
│   │   │   └── Contact.tsx    # Liens sociaux animés
│   │   │
│   │   ├── avatar/            # Système avatar 3D
│   │   │   ├── AvatarSequence.tsx      # Canvas player
│   │   │   ├── useImageSequence.ts     # Hook de gestion
│   │   │   └── AvatarController.tsx    # Contrôle scroll
│   │   │
│   │   ├── projects/          # Composants projets
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   └── ProjectGallery.tsx
│   │   │
│   │   └── ui/                # Composants UI réutilisables
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── RevealOnScroll.tsx
│   │
│   ├── lib/                   # Utilitaires
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Fonctions utilitaires
│   │   └── constants.ts      # Constantes
│   │
│   ├── data/                  # Contenu structuré
│   │   ├── projects.ts       # Données des projets
│   │   ├── skills.ts         # Compétences par catégories
│   │   └── contact.ts        # Liens sociaux
│   │
│   └── assets/               # Assets statiques
│       └── avatar/           # 200 JPG de l'avatar
│           ├── frame_001.jpg
│           ├── frame_002.jpg
│           └── ...
│
├── public/                    # Fichiers publics
│   ├── projects/             # Images/vidéos des projets
│   └── icons/                # Logos technologies
│
└── docs/                      # Documentation
    ├── plans/                # Plans et designs
    └── CLAUDE.md             # Instructions pour Claude
```

---

## 🎨 Sections Détaillées

### 1. Preloader (Barre de chargement)

**Objectif:** Charger les 200 images de l'avatar et créer de l'anticipation

**Design:**
- Écran plein avec fond élégant (dégradé ou couleur unie)
- Nom ou logo en filigrane (faible opacité)
- Barre de progression horizontale animée
- Pourcentage de chargement affiché (0% → 100%)
- Animation de transition fluide vers le Hero une fois terminé

**Comportement:**
- Preload intelligent avec priorité aux premières frames
- Utilisation de Promise.all() pour gérer le chargement
- Cache des images pour performance
- Transition de sortie animée (fade out + scale)

**Considérations:**
- Optimisation des images (compression JPEG, taille appropriée)
- Fallback si chargement échoue
- Skip button optionnel (mais masqué pour forcer l'expérience)

---

### 2. Hero Section - Intro Interactive

**Objectif:** Créer une première impression mémorable avec l'avatar interactif

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Avatar Canvas]             │
│                                     │
│      VOTRE NOM EN GRAND             │
│      (Typographie bold moderne)     │
│                                     │
│     ↓ Scroll to explore             │
└─────────────────────────────────────┘
```

**Fonctionnement de l'avatar:**
1. Au chargement : affiche frame 1 de la séquence
2. L'utilisateur commence à scroller
3. Le scroll est "capturé" (pin) - la page ne bouge pas
4. Chaque pixel de scroll fait avancer/reculer dans les frames
5. Les 200 frames = rotation 360° de l'avatar
6. Indicateur de progression optionnel (cercle 0-360°)
7. Une fois 360° complété :
   - Animation de "déblocage" (flash, particles, etc.)
   - Le scroll devient normal
   - Navigation vers la suite du site

**Technologies:**
- Canvas HTML5 pour affichage optimisé des images
- GSAP ScrollTrigger avec `pin: true` et `scrub: true`
- Calcul : scrollProgress * 200 = frame index
- RequestAnimationFrame pour fluidité

**Détails visuels:**
- Typographie imposante et moderne pour le nom
- Avatar en superposition avec effet de profondeur
- Indicateur de scroll subtil et animé
- Background avec gradient ou effet subtil
- Responsive : adapter taille avatar et typo

---

### 3. Projets - Galerie Interactive Showcase

**Objectif:** Présenter les projets de manière visuellement impactante

**Layout principal:**
- Grille Masonry ou Bento grid avec tailles variables
- 2-3 colonnes selon viewport (responsive)
- Espacement généreux entre les cartes
- Ordre des projets : les plus impressionnants en premier

**Carte de projet:**
- Image/vidéo/GIF en pleine largeur (ratio 16:9 ou variable)
- État normal : image claire, titre et tags masqués
- Au hover :
  - Overlay sombre (opacity: 0.8)
  - Titre qui glisse vers le haut
  - Tags de technologies qui apparaissent
  - Effet de "lift" (translateY: -10px)
  - Légère inclinaison 3D (rotateX/Y)
  - Ombre portée augmentée
  - Curseur devient "View Project"

**Modal/Page de détail:**
- Ouverture : animation scale + fade, blur du background
- Structure :
  ```
  ┌─────────────────────────────────┐
  │  [X]                            │
  │  ← Prev          Next →         │
  │                                 │
  │  [Hero : Vidéo/GIF autoplay]   │
  │                                 │
  │  Titre du Projet                │
  │  Description impactante         │
  │                                 │
  │  [Technologies: logos]          │
  │                                 │
  │  [View Demo] [GitHub]           │
  │                                 │
  │  [Galerie d'images si dispo]   │
  │                                 │
  └─────────────────────────────────┘
  ```
- Navigation prev/next entre projets avec préchargement
- Fermeture : X, clic outside, touche Escape
- URL avec routing pour partage direct

**Animations:**
- Reveal on scroll : projets apparaissent progressivement
- Stagger animation : délai entre chaque carte (0.1s)
- Images lazy load avec blur → sharp transition
- Modal transitions ultra-fluides
- Hover effects avec Framer Motion

**Gestion du contenu:**
```typescript
// src/data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  media: {
    type: 'image' | 'video' | 'gif'
    url: string
  }[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  // Projets réels + placeholders
]
```

---

### 4. Compétences - Catégories avec Icônes

**Objectif:** Présenter les compétences techniques de manière visuellement attrayante

**Structure:**
- 3 catégories principales (adaptable) :
  - Frontend (React, Next.js, TypeScript, Tailwind, etc.)
  - Backend (Node.js, bases de données, APIs, etc.)
  - Outils & Autres (Git, Figma, etc.)

**Layout:**
```
┌─────────────────────────────────────┐
│         FRONTEND                    │
│  [React] [Next] [TS] [Tailwind]    │
│  [Framer] [GSAP] ...               │
│                                     │
│         BACKEND                     │
│  [Node] [Express] [MongoDB]        │
│  [PostgreSQL] ...                  │
│                                     │
│         OUTILS                      │
│  [Git] [Figma] [VS Code]          │
└─────────────────────────────────────┘
```

**Design des icônes:**
- Logos SVG officiels des technologies
- Taille uniforme (64x64px ou similaire)
- Conteneur : cercle ou carré arrondi avec fond subtil
- État normal : légèrement désaturé (grayscale: 20%)
- Grid responsive : 4-6 icônes par ligne

**Animations au hover:**
- Scale up (1.2x) + rotation légère (5deg)
- Couleur pleine vibrante (grayscale: 0%)
- Glow effect avec couleur de la techno
- Ombre portée colorée
- Tooltip avec nom (animation slide up)
- Transition fluide (0.3s ease-out)

**Animations d'entrée (scroll):**
- Catégories en reveal progressif
- Icônes qui "pop" avec stagger (effet domino)
- Délai entre chaque icône : 0.05s
- Animation de "breathing" subtile en boucle

**Effet de voisinage:**
- Au hover d'une icône, les voisines réagissent légèrement
- Effet de "wave" ou "ripple"
- Utiliser GSAP pour coordonner les animations

**Gestion du contenu:**
```typescript
// src/data/skills.ts
export interface Skill {
  name: string
  icon: string // Path vers SVG ou component
  category: 'frontend' | 'backend' | 'tools'
  color: string // Couleur principale pour glow
}

export const skills: Skill[] = [
  // Liste des compétences
]
```

---

### 5. Contact - Liens Sociaux Animés

**Objectif:** Permettre le contact avec animations premium style igloo.inc

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│      Let's work together            │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  📧 Email                   │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  💼 LinkedIn                │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  💻 GitHub                  │  │
│   └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Design des liens:**
- Grands blocs interactifs (pas de petites icônes)
- Layout : icône + label + indicateur (→)
- Fond avec effet de glass ou gradient subtil
- Border élégant

**Animations complexes (style igloo.inc):**
1. **Hover effects:**
   - Morphing du background (shape change)
   - Gradient animé qui se déplace
   - Icône qui s'anime (rotation, scale, translation)
   - Texte qui glisse ou change de graisse
   - Border qui pulse ou change de couleur
   - Effet de distorsion légère

2. **Magnetic effect:**
   - L'élément "attire" le curseur quand on s'approche
   - Utiliser GSAP pour suivre la position de la souris
   - Déplacement subtil du bloc vers le curseur

3. **Curseur personnalisé:**
   - Change au hover (devient plus grand, change de forme)
   - Animation de transition du curseur

4. **Click effect:**
   - Ripple/wave effect depuis le point de clic
   - Animation avant redirection
   - Feedback visuel clair

**Note importante:**
- **Étape dédiée dans le plan d'implémentation** pour analyser igloo.inc
- L'utilisateur fournira captures d'écran / vidéos des animations
- Reproduction fidèle des effets avec Framer Motion + GSAP

**Technologies:**
- Framer Motion pour animations complexes
- GSAP pour effets magnétiques et coordonnés
- Custom cursor avec context React

**Gestion du contenu:**
```typescript
// src/data/contact.ts
export interface ContactLink {
  label: string
  icon: string
  url: string
  type: 'email' | 'linkedin' | 'github' | 'twitter' | 'instagram'
}

export const contactLinks: ContactLink[] = [
  // Liens sociaux
]
```

---

### 6. Navigation & Footer

**Header/Navigation:**
- Apparaît après l'intro avatar (sticky top)
- Logo/Nom à gauche
- Menu à droite : Projets | Compétences | Contact
- Animation d'apparition (slide down)
- Indicateur de section active
- Mobile : burger menu avec overlay animé

**Footer:**
- Minimal et élégant
- Copyright + année dynamique
- Signature : "Made with ❤️ and Next.js" ou personnalisé
- Liens légaux si nécessaire
- Retour en haut animé (optionnel)

---

## 🎭 Animations Globales

### Scroll Animations
- Smooth scroll natif ou custom (ScrollSmoother GSAP)
- Reveal on scroll pour tous les éléments
- Parallax subtil sur certains éléments
- Progress indicator optionnel (barre en haut)

### Hover Effects
- Curseur personnalisé qui change selon contexte
- Magnetic effects sur boutons/liens importants
- Hover states riches et fluides
- Feedback immédiat et satisfaisant

### Page Transitions
- Animations de chargement entre sections
- Transitions fluides et naturelles
- Pas de transitions trop longues (< 0.5s)

### Performance
- Utiliser will-change pour optimisation GPU
- IntersectionObserver pour lazy animations
- RequestAnimationFrame pour fluidité
- Throttle/debounce sur scroll events

---

## 📊 Gestion du Contenu

### Structure des données
- Fichiers TypeScript dans `src/data/`
- Interfaces typées pour chaque type de contenu
- Facile à éditer sans toucher aux composants
- Possibilité future de passer à un CMS headless

### Placeholders
- Images génériques pour projets à venir
- Textes "lorem ipsum" stylés
- Clairement identifiables pour remplacement

### Assets
- Images optimisées (WebP + fallback)
- Lazy loading systématique
- Sprites pour animations si possible
- SVG pour logos et icônes

---

## 🔧 Considérations Techniques

### Performance
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Optimisation des images critiques
- Code splitting par route
- Preload des ressources critiques

### Accessibilité
- Navigation au clavier
- ARIA labels appropriés
- Contrast ratios respectés
- Focus visible sur éléments interactifs
- Skip links si nécessaire
- Reduced motion pour utilisateurs sensibles

### Responsive
- Mobile-first approach
- Breakpoints : 640px, 768px, 1024px, 1280px
- Touch-friendly sur mobile
- Adaptation des animations pour mobile
- Avatar sequence optimisée mobile

### SEO
- Meta tags dynamiques
- Open Graph pour partage social
- Sitemap.xml
- robots.txt
- Performance optimale

### Browser Support
- Chrome, Firefox, Safari, Edge (dernières versions)
- Fallbacks pour anciens navigateurs si nécessaire
- Progressive enhancement

---

## 📝 Prochaines Étapes

1. **Analyse de igloo.inc** (étape dédiée)
   - Captures d'écran des animations de contact
   - Vidéos des interactions si possible
   - Notes sur les timings et comportements
   - Identification des effets à reproduire

2. **Préparation du contenu**
   - Projets existants à intégrer
   - Images/vidéos des projets
   - Liste finale des compétences
   - Liens sociaux et coordonnées
   - Préparation des 200 JPG de l'avatar

3. **Setup du projet**
   - Initialisation Next.js + TypeScript
   - Installation des dépendances
   - Configuration Tailwind + plugins
   - Setup GSAP + Framer Motion
   - Structure de dossiers
   - CLAUDE.md dans chaque section

4. **Développement par phases**
   - Phase 1 : Preloader + Avatar sequence
   - Phase 2 : Hero section avec scroll control
   - Phase 3 : Projets (galerie + modal)
   - Phase 4 : Compétences avec animations
   - Phase 5 : Contact avec effets igloo.inc
   - Phase 6 : Navigation + Footer
   - Phase 7 : Polish + optimisations

5. **Testing & Optimisation**
   - Tests cross-browser
   - Tests mobile/tablet
   - Performance audit
   - Accessibility audit
   - Corrections et ajustements

6. **Déploiement**
   - Setup Vercel
   - Configuration domaine (si applicable)
   - Analytics (optionnel)
   - Monitoring

---

## 💡 Notes Importantes

- **YAGNI** : On commence par l'essentiel, on peut toujours ajouter features plus tard
- **Performance first** : Animations fluides > Animations complexes
- **Content is king** : La structure doit supporter du vrai contenu, pas juste des démos
- **Mobile matters** : 50%+ du trafic sera mobile
- **Itératif** : On peut ajuster le design pendant le développement

---

**Validé par l'utilisateur le 2026-02-05**
