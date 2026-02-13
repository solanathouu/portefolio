'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulseOffset: number;
}

// ============================================================
// PARAMETRES — Modifie ces valeurs pour ajuster l'effet
// ============================================================

// Nombre total de particules a l'ecran
// 30-50 = subtil, 70-100 = normal, 150-300 = dense
const PARTICLE_COUNT = 200;

// Taille des particules (en pixels)
// MIN = plus petite possible, MAX = plus grosse possible
// Chaque particule a une taille aleatoire entre les deux
const MIN_RADIUS = 0.5;
const MAX_RADIUS = 2;

// Opacite des particules (0 = invisible, 1 = blanc pur)
// MIN = opacite minimum, MAX = opacite maximum
// Garder < 0.5 pour un effet subtil "poussiere lumineuse"
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 0.4;

// Vitesse de derive naturelle (mouvement lent aleatoire)
// 0.1 = quasi immobile, 0.3 = lent, 0.8 = rapide
const DRIFT_SPEED = 0.8;

// Rayon de repulsion autour du curseur (en pixels)
// 80 = petit cercle, 120 = moyen, 200 = grande zone d'effet
const REPEL_RADIUS = 80;

// Force de repulsion quand la souris s'approche
// 1 = douce, 3 = nette, 6 = violente
const REPEL_FORCE = 1;

// Friction / ralentissement apres repulsion (0 a 1)
// 0.90 = freine vite (retour rapide), 0.95 = glisse, 0.99 = flotte longtemps
const FRICTION = 0.95;

function createParticle(width: number, height: number): Particle {
  const baseOpacity = MIN_OPACITY + Math.random() * (MAX_OPACITY - MIN_OPACITY);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
    opacity: baseOpacity,
    baseOpacity,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    pulseSpeed: 0.005 + Math.random() * 0.015,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas!.width, canvas!.height)
      );
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply friction so particles slow down after repulsion
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Base drift — gently nudge back to natural speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < DRIFT_SPEED * 0.5) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Pulse opacity
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        p.opacity = p.baseOpacity + pulse * 0.1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
