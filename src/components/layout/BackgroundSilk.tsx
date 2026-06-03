"use client";

import SilkShader from "@/components/ui/silk-shader";

/**
 * Fond global du site — shader WebGL « silk » (un seul canvas, animation GPU).
 * Léger sur mobile (pas de DOM lourd). Rendu en `fixed inset-0 z-0` ;
 * le contenu du site reste au-dessus (z-1, défini dans layout.tsx).
 */
export default function BackgroundSilk() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <SilkShader className="h-full w-full" />
    </div>
  );
}
