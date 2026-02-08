# Project Detail Pages

## Purpose
Pages détaillées pour chaque projet avec layout éditorial Neo-Brutalist.

## Route Structure
```
/projects/[id]
```

Dynamic route Next.js utilisant l'ID du projet depuis `src/data/projects.ts`.

## Features

### Hero Section
- Titre imposant avec accent color
- Meta info (Year, Role, Client)
- Description longue enrichie
- Boutons d'action (Live Demo, Source Code)
- Badge Featured si applicable

### Visual Overview
- Galerie média avec captions
- Support image/video/gif
- Borders Neo-Brutalist
- Lazy loading

### Tech Stack Section
- Grid de catégories (Frontend, Backend, Tools, etc.)
- Liste des technologies par catégorie
- Design cohérent avec accent colors

### Challenges & Outcomes
- Grid 2 colonnes (desktop)
- Numérotation pour challenges
- Highlighting pour outcomes
- Mobile responsive (stack)

### Project Navigation
- Boutons prev/next entre projets
- Preview du titre
- Hover effects avec accent colors
- Conditional rendering (pas de prev sur premier projet)

## Design System

### Colors
Utilise le système rotatif de couleurs électriques:
- Index 0: Cyan (#00f0ff)
- Index 1: Magenta (#ff00ff)
- Index 2: Lime (#ccff00)

### Typography
- **Headings**: Space Mono, uppercase, bold
- **Body**: Space Mono, regular
- **Tracking**: Wide pour uppercase

### Borders & Shadows
- Borders: 3-4px solid
- Box shadows: Hard drop shadows (8-12px offset)
- Hover: Translate (-4px, -4px) + shadow

### Animations
- Framer Motion pour page transitions
- Stagger delays pour sections
- Hover states sur boutons/liens

## Data Requirements

Enrichir `Project` interface dans `src/data/projects.ts`:
```typescript
longDescription?: string;
year?: string;
client?: string;
role?: string;
technologies?: { category: string; items: string[] }[];
challenges?: string[];
outcomes?: string[];
```

## Navigation Flow

1. **Home → Projects section** - Cliquer sur ProjectCard
2. **Route** - `/projects/[id]`
3. **Back button** - Retour à `/#projects`
4. **Prev/Next** - Navigation entre projets

## Accessibility

- Semantic HTML (header, section, nav)
- Focus visible sur boutons
- Alt text pour médias (à ajouter quand vraies images)
- Keyboard navigation support

## Performance

- Client component pour animations
- Lazy media loading
- Optimized Next.js routing
- Static generation possible (generateStaticParams)

## Next Steps

1. Ajouter vraies images de projets
2. Implémenter generateStaticParams pour SSG
3. Ajouter transitions page (View Transitions API ou Framer Motion)
4. SEO metadata par projet
5. Open Graph images par projet
