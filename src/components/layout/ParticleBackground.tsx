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
// PARAMETRES — Constellation / Plexus
// ============================================================

// Nombre de particules (moins mais plus grosses)
const PARTICLE_COUNT = 80;

// Taille des particules
const MIN_RADIUS = 1;
const MAX_RADIUS = 3;

// Opacite des particules
const MIN_OPACITY = 0.15;
const MAX_OPACITY = 0.5;

// Vitesse de derive (0.4 = lent, 0.8 = moyen, 1.2 = rapide)
const DRIFT_SPEED = 0.9;

// Distance max pour tracer une ligne entre 2 particules
const LINK_DISTANCE = 150;

// Opacite max des lignes de connexion
const LINK_OPACITY = 0.15;

// Souris — rayon d'attraction et force
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.02;

// Friction
const FRICTION = 0.98;

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

      // Update particles
      for (const p of particles) {
        // Mouse attraction (gentle pull towards cursor)
        const dmx = mx - p.x;
        const dmy = my - p.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);

        if (mouseDist < MOUSE_RADIUS && mouseDist > 0) {
          const force = (1 - mouseDist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dmx / mouseDist) * force;
          p.vy += (dmy / mouseDist) * force;
        }

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Gentle drift — keep particles always moving
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < DRIFT_SPEED * 0.5) {
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.08;
        }
        // Random micro-turbulence for organic feel
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Pulse opacity
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        p.opacity = p.baseOpacity + pulse * 0.12;
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * LINK_OPACITY;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw lines from mouse to nearby particles
      if (mx > 0 && my > 0) {
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.2;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles (on top of lines)
      for (const p of particles) {
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.1})`;
        ctx.fill();

        // Core
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
