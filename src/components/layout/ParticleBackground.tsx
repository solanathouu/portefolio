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

const PARTICLE_COUNT = 70;
const MAX_RADIUS = 2;
const MIN_RADIUS = 0.5;
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 0.4;
const DRIFT_SPEED = 0.3;

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

      for (const p of particles) {
        // Drift movement
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

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
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
