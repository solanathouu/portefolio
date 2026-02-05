# Project Components

## Purpose
Composants pour affichage et interaction avec les projets.

## Components

### ProjectCard.tsx
- Carte individuelle de projet
- Hover: overlay + lift + tilt 3D
- Framer Motion animations
- Lazy load image/video

### ProjectModal.tsx
- Modal plein écran pour détails
- Navigation prev/next
- Fermeture: X, outside click, Escape
- Animations scale + fade

### ProjectGallery.tsx
- Grid Masonry responsive
- Stagger animations
- IntersectionObserver pour reveal

## Data Structure
```typescript
interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  media: { type: 'image' | 'video' | 'gif', url: string }[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}
```

## Guidelines
- Images WebP + fallback
- Lazy loading systématique
- Keyboard navigation
- URL routing pour partage
