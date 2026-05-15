# Portfolio Moderne avec Avatar 3D

Portfolio web interactif avec avatar 3D animé contrôlé par le scroll, galerie de projets, compétences animées, et section contact avec effets premium inspirés de igloo.inc.

## 🚀 Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # Type check
```

## 📁 Architecture Rules

### File Organization
- **1 file = 1 responsibility** - Max 200-300 lines par fichier
- **No god files** - Séparer en composants plus petits si nécessaire
- **Clear naming** - Le nom du fichier doit refléter exactement son contenu

### Import Rules
```typescript
// ✅ GOOD - Use @ aliases
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils/cn';

// ❌ BAD - No deep relative imports
import Button from '../../../components/ui/Button';
```

**Import order:**
1. External packages (react, next, etc.)
2. @/ aliases (organized)
3. Relative imports (if absolutely necessary)

### Separation of Concerns

```
┌─────────────────────────────────────────┐
│  UI Layer (components/)                 │  ← Presentation only
├─────────────────────────────────────────┤
│  Logic Layer (hooks/, lib/)             │  ← Business logic
├─────────────────────────────────────────┤
│  Data Layer (data/)                     │  ← Data structures
└─────────────────────────────────────────┘
```

**Rules:**
- **components/** = UI ONLY (no fetch, no business logic)
  - Receive data via props
  - Use hooks for state/effects
  - Delegate logic to hooks/services

- **hooks/** = State + Effects (use utils for logic)
  - Custom React hooks (useXxx)
  - Can use other hooks
  - Keep logic in utils when possible

- **lib/utils/** = Pure functions (no side effects)
  - No React, no DOM
  - Testable independently
  - Reusable everywhere

- **data/** = Static data and types
  - TypeScript interfaces
  - Content arrays
  - Easy to edit without code changes

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Hooks | camelCase + `use` | `useImageSequence.ts` |
| Utils | camelCase | `cn.ts`, `formatDate.ts` |
| Types | PascalCase | `Project`, `Skill`, `ContactLink` |
| Constants | UPPER_SNAKE_CASE | `FRAME_COUNT`, `API_URL` |
| Files/folders | kebab-case or PascalCase | `project-card/` or `ProjectCard/` |

### Component Structure

```typescript
// ✅ GOOD - Clean component
'use client'; // Only if needed (hooks, events)

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('base-styles', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Anti-Spaghetti Checklist

Before committing, check:

- [ ] No file > 300 lines
- [ ] No circular imports
- [ ] All imports use @ aliases (no ../../../)
- [ ] Components don't contain business logic
- [ ] Hooks don't contain UI
- [ ] Utils are pure functions
- [ ] Types are exported and reused
- [ ] No duplicate code (DRY)
- [ ] No unused code (YAGNI)

## 🎨 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **Icons:** React Icons
- **Deployment:** Vercel

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main page (home)
│   │   ├── layout.tsx         # Root layout (Header, Particles, LoadingProvider)
│   │   ├── globals.css        # Global styles
│   │   ├── not-found.tsx      # Custom 404 page
│   │   └── projects/[id]/     # Project detail pages
│   │       ├── page.tsx       # Server component (SSG + metadata)
│   │       ├── loading.tsx    # Loading state
│   │       └── not-found.tsx  # Project 404
│   │
│   ├── components/
│   │   ├── layout/            # Header, ParticleBackground
│   │   ├── sections/          # Preloader, Hero, Projects, Skills, Contact
│   │   ├── avatar/            # Avatar 3D system (Avatar3DLocked)
│   │   ├── projects/          # ProjectCard, ProjectDetail
│   │   ├── skills/            # SkillCard
│   │   └── ui/                # Reusable UI (Button, Badge, RevealOnScroll)
│   │
│   ├── lib/
│   │   ├── hooks/             # useScrollLockAnimation, useImageSequence
│   │   ├── contexts/          # LoadingContext
│   │   └── utils/             # cn, skillIcons, contactIcons
│   │
│   ├── data/                  # Content data
│   │   ├── projects.ts        # Placeholder projects (à remplacer)
│   │   ├── skills.ts
│   │   └── contact.ts
│   │
│   └── assets/                # Local assets
│       └── avatar/            # 173 PNG frames (fond transparent)
│
├── public/                    # Static files
│   ├── assets/avatar/         # Avatar frames served here
│   ├── projects/              # Project images (à ajouter)
│   └── icons/                 # Tech logos
│
├── docs/                      # Documentation
│   └── plans/                 # Design & implementation plans
│
└── CLAUDE.md                  # This file

```

## 🎯 Implementation Status

### Phase 0: Fondations ✅ COMPLETE
- [x] Project initialization
- [x] Folder structure with CLAUDE.md
- [x] TypeScript + Tailwind configuration
- [x] Animation libraries installed (Framer Motion, GSAP, react-icons)
- [x] Utility function cn() créée
- [x] Data structures (projects, skills, contact)
- [x] UI components de base (Button, Badge, RevealOnScroll)
- [x] Layout components (Header, Footer)

### Phase 1: Hero + Avatar ✅ COMPLETE
- [x] Avatar 3D system avec 173 frames PNG (fond transparent)
- [x] Hero section avec animations Framer Motion
- [x] Système de scroll bloqué pour rotation 360°
- [x] Hook useScrollLockAnimation pour contrôle précis
- [x] Preload intelligent des images
- [x] Background gradient slate-900 moderne
- [x] Responsive design (mobile + desktop)

### Phase 2: Projects Gallery ✅ COMPLETE
- [x] Projects section créée avec design Editorial Neo-Brutalist
- [x] ProjectCard component avec hover effects premium
- [x] Grid responsive avec espacement amélioré
- [x] Typographie Space Mono (mono technique)
- [x] Couleurs électriques (Cyan, Magenta, Lime)
- [x] Chiffres géants alignés en arrière-plan
- [x] Animations stagger on scroll
- [x] Preloader minimaliste avec animation ASCII
- [x] LoadingContext pour gérer transitions
- [x] Pages détaillées de projets (/projects/[id])
- [x] Navigation prev/next entre projets
- [x] Data structure enrichie (longDescription, technologies, challenges, outcomes)

### Phase 3: Skills + Contact ✅ COMPLETE
- [x] Skills section avec 3 catégories (Langages/Data & Analyse/Outils) et SkillCard animées
- [x] Contact section avec liens (Email, LinkedIn, GitHub)
- [x] Icon mapping utilities (skillIcons.tsx, contactIcons.tsx)
- [x] Scrollbars cachées (X + Y)
- [x] Hamburger menu placeholder supprimé
- [x] Preloader lié au vrai chargement (window.load) au lieu d'un timer fixe
- [x] Avatar scroll lock : ne bloque que devant le hero, 1 seule fois par session (sessionStorage)
- [x] Espacement réduit entre project cards

### Phase 3.5: Particle Background ✅ COMPLETE
- [x] Canvas HTML5 custom (zero dependance) — `ParticleBackground.tsx`
- [x] 200 micro-particules blanches avec opacite subtile (0.1-0.4)
- [x] Mouvement de derive naturel + scintillement (pulse opacity)
- [x] Repulsion souris : particules fuient le curseur (rayon 80px, force douce)
- [x] Friction pour ralentissement fluide apres repulsion
- [x] Fixed canvas z-0, contenu z-1 — sections transparentes (pas de backgroundColor)
- [x] Parametres documentes inline pour tweaking facile
- [x] Responsive (resize), cleanup propre, pointer-events: none

### Phase 4: Polish + Personalisation 🔄 EN COURS
- [x] Metadata SEO : "Nathan Skwarek | Portfolio" + OpenGraph
- [x] GitHub links corrigés → solanathouu
- [x] Header : nav desktop + **mobile hamburger menu** (overlay fullscreen, animated X, stagger) — logo NS. supprimé
- [x] Footer global supprimé (layout.tsx) — pas de footer, design minimaliste
- [x] Footer "More experiments on GitHub" supprimé de Projects section
- [x] Project detail page : **server component** avec generateStaticParams (SSG) + generateMetadata
- [x] ProjectDetail.tsx : client component extrait, bg transparent (particules visibles)
- [x] Pages 404 custom : globale + par projet (neo-brutalist)
- [x] loading.tsx pour transitions projet
- [x] Scroll indicator dans Hero : visible des le debut, disparait apres rotation avatar (bottom: 40px)
- [x] HeroSimple.tsx supprimé (unused)
- [x] Skills mis a jour avec vrais skills Nathan (Python, SQL, JS, Excel, Scraping, Dataiku, Git, GitHub, VS Code, Anglais)
- [x] Categories skills renommees : Langages / Data & Analyse / Outils (etait Frontend/Backend/Tools)
- [x] Icones skills corriges (SiPython, FaDatabase, SiDataiku, FaFileExcel, FaSpider, FaGlobe, etc.)
- [x] Vrais projets ajoutés dans `src/data/projects.ts` (LaBonneNote, Tube, B2B IT Catalog Scraper)
- [x] Typographie changée : Space Mono → **Sora** (géométrique, lisible) — Space Mono gardé uniquement pour Preloader ASCII
- [x] Layout sections : containers `w-11/12 max-w-6xl` (Projects, Skills, Contact) pour marge visible des bords écran
- [x] Section headers unifiés : titres centrés (// Portfolio, // Compétences, // Contact), descriptions en français, espacements inline (40px/30px/60px)
- [x] Footer Marquee Signature : 3 rangées de mots défilant (vitesses/directions différentes), signature "© 2026 — Paris", CSS keyframes seamless loop, pointer-events-none (pas de pause hover)
- [x] Skills cliquables : Dataiku ouvre certificat PDF (`/certificates/dataiku-core-designer.pdf`), Anglais ouvre certificat PDF (`/certificates/anglais.pdf`), GitHub ouvre profil — champ `url?` dans Skill interface, label "Certifié" sur certificats
- [x] Contact description orientée alternance : "En quête d'une alternance où je peux monter en compétences et livrer du concret."
- [x] Marquee fix : inline-flex + pointer-events-none (plus de saut, plus de pause hover), vitesses ralenties (40s/30s/36s)
- [x] Navigation projets prev/next redesignée : editorial strip, grid 2 colonnes, accent line slide-in, titres centrés cyan, labels + fleches plus gros, numéro de projet en watermark
- [x] Skills grid bordures lissées : technique border-collapse (container border-top/left, cards border-right/bottom 1px), taille uniforme (h-full + justify-center), hover outline au lieu de border pour ne pas casser le layout
- [x] Images projets ajoutées dans `public/projects/` (3 screenshots par projet LaBonneNote/Tube/Scraper)
- [x] ProjectDetail : grille de vignettes cliquables (2 cols mobile, 3 cols desktop) + lightbox plein écran (navigation flèches, Escape, compteur)
- [x] Scraper : 4e vignette = première slide PDF, clic ouvre le PDF complet (`scraper-presentation.pdf`)
- [x] Interface media enrichie : champ `linkUrl?` pour ouvrir un lien externe au lieu du lightbox
- [x] ProjectCard : vraies images projets (media[0]) au lieu du placeholder emoji 📁, next/image fill + object-cover
- [x] ProjectDetail refonte images : miniatures 300x300 en bas de page, lightbox CSS pur (position fixed + z-99999, pas de portal/Framer Motion), animation fade+scale 0.3s, fleches navigation, Escape/clic ferme
- [x] Lightbox : bouton "Ouvrir le PDF" cyan quand l'image a un linkUrl (scraper presentation)
- [x] Images manquantes nettoyées : supprimé labonnenote-4.png et tube-4.png des données (fichiers inexistants)
- [x] Ordre screenshots projets réorganisé : screenshot 3 en premier, 1 en deuxième, 2 en troisième (3 projets)
- [x] **Section Contact à la fin du portfolio** (`src/components/sections/Contact.tsx` + branchée dans `page.tsx`) — 4 cartes glass (GitHub `solanathouu`, LinkedIn `nathan-skwarek`, Email, CV avec download), grid `auto-fit minmax(240px, 1fr)`, `id="contact"` aligné avec le lien header
- [x] **3 photos événement Mirakl** ajoutées dans `media[]` du projet (`/projects/mirakl-event-{1,2,3}.JPG`, photos réelles uploadées par le user)
- [x] **GitHub Pages export statique** : `next.config.ts` (`output:'export'`, `basePath:'/portefolio'` conditionnel, `images.unoptimized`, `trailingSlash`), helper `src/lib/utils/basePath.ts` (`withBase()`), wrappers manuels sur Hero CV / Contact / Skills certificats / ProjectDetail (raw `<img>` + lightbox + linkUrl) / ProjectCard `next/image` / Avatar3DLocked / Avatar3D / useImageSequence
- [x] **Workflow CI** : `.github/workflows/deploy.yml` avec `NEXT_PUBLIC_BASE_PATH=/portefolio` au step build, `actions/configure-pages@v5` + `deploy-pages@v4`, autoredeploy à chaque push sur `main`
- [x] **Repo `solanathouu/portefolio`** passé en PUBLIC, GitHub Pages activé via `gh api repos/.../pages -X POST -f build_type=workflow`
- [x] **Tests responsive mobile/tablet/desktop** (375/768/1440) — `bento-grid` + `bento-cell` + `screenshots-grid` classes + `@media (max-width: 767px)` dans `@layer utilities` de `globals.css` (Tailwind 4 + Turbopack ignore les rules hors layer)
- [x] **Site live** : https://solanathouu.github.io/portefolio/
- [ ] Lighthouse performance audit
- [ ] Compresser `payfit-presentation.pdf` (28 Mo)

## 📊 Current Project State

| Aspect | Status | Details |
|--------|--------|---------|
| Code | ✅ Phase 4 livrée pour rendu | 9 projets + Contact section + responsive |
| Config | ✅ GitHub Pages export | `output:'export'`, basePath `/portefolio`, `withBase()` helper |
| Tests responsive | ✅ Validés | 375 / 768 / 1440 px (Playwright live) |
| Git | ✅ Pushé sur main | `cc5c63a` dernier commit (Phase B responsive) |
| Build | ✅ Passing CI | 12 pages SSG, 0 erreur TypeScript |
| Deploy | ✅ LIVE | https://solanathouu.github.io/portefolio/ — workflow CI ~1 min |
| Repo | ✅ PUBLIC | `solanathouu/portefolio` (passé de PRIVATE → PUBLIC pour Pages free tier) |

**Dernière action (session 2026-05-15):** Audit complet du portfolio vs consignes formateur (CV en fin, photos événement Mirakl, GitHub Pages, responsive). Section Contact créée à la fin (GitHub/LinkedIn/Email/CV). 3 photos événement Mirakl uploadées par le user. Migration de Vercel-ready vers **GitHub Pages export statique** (basePath `/portefolio`, helper `withBase()`, workflow CI). Responsive mobile validé (bento → 1 col sous 768px). 3 deploys CI réussis. Site live et conforme aux consignes.

**Projets (9 projets, ordre bento) :**
- P1 (tall) **LaBonneNote** : Assistant éducatif IA, RAG chatbot, 43k chunks, quiz auto, Python/FastAPI/ChromaDB/GPT-4o-mini
- P2 **Hackathon Mirakl x Eugenia** : UC1 Agent Led Merchant, mascotte Leia (Spotlight UX), Calendar-Aware Restock Advisor, Next.js + gpt-4.1 + Whisper + n8n. Rôle CTO. Pitch 24/04/2026 chez Mirakl.
- P3 **Tube** : App mobile métro parisien, signalements temps réel, gamification, React Native/Expo/Supabase/PostGIS
- P4 **Hackathon Replit — SwapJob** : "Tinder des postes" (Mercato Forum Vies Mobiles). Algo matching Haversine + score composite. Solo. Next.js 14 + Prisma + Leaflet + Framer Motion.
- P5 **Oppy — AI Copilot** : Agent IA proactif (Hackathon Gemini), scan Gmail/Calendar/web, scoring urgence HuggingFace, brief d'action. GitHub: solanathouu/hack-google
- P6 (wide) **Hackathon PayFit — SEO** : Infrastructure IA de contenu, N8N veille concurrentielle, Agent GEO Audit multi-IA, Agent Maestro Dust 4 étapes, 35h économisées, 0.30€/mois API
- P7 **B2B IT Catalog Scraper** : Scraper Python, +8800 produits IT TD Synnex, 11 catégories, 440+ specs, CSV, zéro dépendance
- P8 (tall) **DataGouv — Prospection B2B** : 6M entreprises FR, recherche langage naturel via Gemini, MCP DataGouv. Next.js 15 + SQLite + shadcn/ui. Score Rodin 7/10. GitHub: solanathouu/mcp-gouv
- P9 **Audit SEO & GEO — Eugenia School** : 4 IA benchmarkées, 5 sections, score 2/10. Crawl4AI + Lighthouse + Remotion + R3F. Livrable 1199 lignes, score Rodin 7,5/10.

**Champ `linkedinUrl?` ajouté à l'interface `Project`** — bouton LinkedIn rendu conditionnellement sur ProjectDetail (à côté de GitHub/Demo). Posts à publier puis lier : Mirakl (`vault/linkedin/post-hackathon-mirakl.md`), SwapJob, DataGouv. SEO-hanine : pas de post.

**Skills (mis à jour session 2026-03-15):**
- Langages : Python, SQL, JavaScript, Anglais (certifié)
- Data & Analyse : Excel, Web Scraping, Dataiku (certifié), Power BI, Tableau
- Outils : Git, GitHub, VS Code, N8N, Make, Notion, Dust, Claude

**Contact data (réel):**
- Email: skwarek.nathan@gmail.com
- LinkedIn: https://www.linkedin.com/in/nathan-skwarek-8a3723252/
- GitHub: https://github.com/solanathouu

**Design — Glacé / Apple / Premium (refonte session 2026-03-15):**
- Background anthracite (#303030)
- **System font stack** : -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue (identique au hero NATHAN)
- Space Mono uniquement pour Preloader ASCII
- Direction artistique : glacé, luxe, Apple — plus de neo-brutalist
- Cartes : glass morphism (backdrop-blur, rgba backgrounds, rounded-2xl, no borders)
- Hover : scale subtil + ombre douce + reflet lumineux glissant (shimmer)
- Projects : Bento grid asymétrique (2col×2row + 2×1col + full width)
- ProjectDetail : layout centré îlot (900px max), tech stack avec logos react-icons, hero image bannière
- Skills & Contact : chips glass arrondis avec logos en couleur, layout flex-wrap centré
- Section headers unifiés : clamp(2.5rem, 5vw, 3.5rem), letterSpacing -0.02em, description rgba(255,255,255,0.4)
- Contact : bulles organiques (GitHub, LinkedIn, Email, CV) expulsées de l'avatar pendant le scroll rotation (Framer Motion useAnimation, 3 phases : birth → expulsion → float infini)
- Bulles : icônes Si/Hi (couleurs marque), 68px, backdrop-blur, border-radius morphing organique, radial gradient bulle de savon
- Background constellation/plexus : 80 particules connectées par lignes, attraction souris, glow, micro-turbulence
- Scrollbars cachées, scroll fonctionnel
- Preloader lié au vrai window.load (min 800ms)
- Avatar rotation 360° une seule fois par page load
- Avatar expose `progress` via `onProgressChange` callback pour synchroniser les bulles

**Scroll indicator (Hero):**
- Position ajustable dans `src/components/sections/Hero.tsx` ligne ~63
- Utilise `style={{ bottom: '40px' }}` — modifier la valeur pour ajuster
- Visible au chargement, disparait apres rotation avatar

## 🎯 Next Immediate Action

**Site live et conforme au cahier des charges formateur** (`https://solanathouu.github.io/portefolio/`). Plus d'urgence sur le rendu. Prochaines étapes par ordre de priorité :

1. **Lighthouse audit** sur l'URL live (perf + a11y + best practices + SEO) — chercher quick wins (préchargement avatar frames, alt manquants, contrast ratio)
2. **Compresser** `public/projects/payfit-presentation.pdf` (28 Mo → cible <2 Mo via ghostscript ou Adobe). Le repo est public, ça ralentit le clone.
3. **Logos manquants à finaliser** : LaBonneNote (mascotte OK mais pas de logo carré), Oppy (idem mascotte), DataGouv (utilise actuellement la Marianne Marianne République Française comme placeholder)
4. **URLs LinkedIn** à remplir dans `linkedinUrl?` quand drafts publiés (Mirakl UC1, SwapJob, DataGouv)
5. **(Optionnel) Custom domain** : acheter un `nathanskwarek.com` (~10 €/an) puis `public/CNAME` + DNS CNAME → `solanathouu.github.io`
6. **(Optionnel) README.md public** sur le repo pour expliquer le portfolio (le repo est public maintenant)

**Pour reprendre une session :**
```bash
cd C:\Users\skwar\Desktop\portfolio-new
npm run dev          # http://localhost:3000 (sans basePath en dev)
# Push sur main → auto-deploy via .github/workflows/deploy.yml
```

## 🆕 Visual Identity Helpers (V1)

Ajouts dans `Project` interface pour personnaliser le rendu cover par projet :
- `coverFit?: 'cover' | 'contain'` — `contain` pour les logos (centré + padding)
- `coverBackground?: string` — couleur/gradient de fond derrière le logo (matche les bords du logo pour seam invisible)
- `coverPadding?: { card?: number; hero?: number }` — override du padding (default 40 / 60 px)

Patterns appliqués :
- **Logos en cover** : Mirakl (`mirakl-logo.png`), SwapJob (`replit-color.png` sur dark navy), Eugenia (`eugenia-logo.png` sur `#7f050d`), Tube (`tube.png` sur blanc, padding 70/100), DataGouv (`datagouv-marianne.png` sur blanc), B2B Scraper (`scraper-miniature.png` sur `#0B182D`), PayFit (`payfit-logo.png` sur blanc)
- **Captures de l'app** descendues en `media[1+]` (images supplémentaires sur la page détail)
- **Placeholders** créés via Python+Pillow quand pas de logo (Tube, DataGouv, Scraper) — remplacés au fur et à mesure

## 🔧 Performance Guidelines

- Use `next/image` for all images
- Lazy load below-the-fold content
- Use `will-change` for animated elements
- IntersectionObserver for scroll animations
- Debounce/throttle scroll events
- Code splitting per route
- Preload critical resources

## ♿ Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels where needed
- Keyboard navigation support
- Focus visible on interactive elements
- Reduced motion for users who prefer it
- Sufficient color contrast (WCAG AA)

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

Or connect GitHub repo to Vercel for automatic deployments.

## 💡 Tips

- **Start small:** Implement features incrementally
- **Test often:** Check responsiveness and performance regularly
- **Keep it DRY:** Reuse components and utilities
- **YAGNI:** Don't add features you don't need yet
- **Performance first:** Smooth animations > Complex animations
- **Mobile matters:** Test on real devices

## 🔧 Avatar Configuration

Pour ajuster la vitesse de rotation:
```typescript
// Dans src/lib/hooks/useScrollLockAnimation.ts
const scrollSensitivity = 20; // Plus grand = plus lent
```

Valeurs recommandées:
- **10-15**: Rotation rapide (5-10 coups de molette)
- **20-30**: Rotation normale (20-25 coups de molette) ← Actuel
- **40-50**: Rotation lente (immersive)

## 📊 Technical Decisions

| Decision | Reason |
|----------|--------|
| PNG transparent au lieu JPG | Flexibility du background |
| Scroll bloqué | Expérience immersive forcée |
| 173 frames | Équilibre qualité/performance |
| Slate-900 gradient | Moderne, contraste avec avatar |
| System font stack au lieu Sora | Feeling Apple/glacé, cohérent avec hero NATHAN, zero font loading |
| Framer Motion | Animations fluides, DX excellent |
| Canvas custom vs tsparticles | Zero dependance, plus leger, constellation/plexus effect |
| Sections sans backgroundColor | Transparent pour laisser voir le canvas particules fixe |

---

**Last updated:** 2026-05-15
**Status:** ✅ Livré pour rendu formateur — site live sur GitHub Pages, responsive validé 375/768/1440, conforme aux consignes (CV en fin, photos événement Mirakl, GitHub Pages, miniatures, avatar, GitHub+LinkedIn)
**URL live:** https://solanathouu.github.io/portefolio/
**Next:** Lighthouse audit + compresser payfit-presentation.pdf + finaliser logos LaBonneNote/Oppy/DataGouv
