# Avatar 3D System

## Purpose
Système de gestion et affichage de la séquence d'images avatar (200 JPG).

## Components

### AvatarSequence.tsx
- Canvas HTML5 pour affichage optimisé
- Gère le rendu des frames
- RequestAnimationFrame pour fluidité
- Responsive sizing

### useImageSequence.ts
- Hook custom pour preload et gestion images
- Retourne tableau d'images chargées
- Gère le progress de chargement
- Cache des images

### AvatarController.tsx
- Contrôle le scroll avec GSAP ScrollTrigger
- Pin la section pendant rotation
- Calcul: scrollProgress * 200 = frameIndex
- Déblocage après 360°

## Technical Details
- 200 frames JPG (frame_001.jpg à frame_200.jpg)
- GSAP ScrollTrigger avec pin: true, scrub: true
- Canvas 2D context pour performance
- Optimisation: preload prioritaire premières frames

## Guidelines
- Performance critique: 60fps requis
- Mobile: adapter taille canvas
- Fallback si images ne chargent pas
- Will-change CSS pour GPU acceleration
