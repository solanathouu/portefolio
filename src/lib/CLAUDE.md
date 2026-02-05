# Library & Utilities

## Purpose
Hooks, utilitaires, et constantes partagés.

## Structure

### hooks/
- Custom React hooks
- useWindowSize, useScrollProgress, useMediaQuery, etc.
- Bien typés avec TypeScript

### utils/
- Fonctions utilitaires (cn, formatDate, etc.)
- Helpers pour animations
- Validation

### constants.ts
- Constantes globales
- Configuration (nombre de frames, breakpoints, etc.)
- URLs, textes réutilisés

## Guidelines
- Pure functions dans utils
- Hooks suivent conventions React
- Types exportés avec fonctions
- Tests unitaires si logique complexe
