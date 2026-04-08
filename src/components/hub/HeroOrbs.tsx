'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createOrb, updateOrbColor, type OrbInstance } from '@/components/three/Orb';

const LINK_ORBS = [
  {
    label: 'CV',
    href: '/certificates/cv.pdf',
    download: true,
    baseColor: new THREE.Color(0x7850ff),
    colors: [
      new THREE.Color(0x7850ff),
      new THREE.Color(0x8338ec),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x7850ff),
    ],
    angle: -Math.PI * 0.7,
    distance: 5.0,
  },
  {
    label: 'Email',
    href: 'mailto:skwarek.nathan@gmail.com',
    baseColor: new THREE.Color(0xff3c78),
    colors: [
      new THREE.Color(0xff3c78),
      new THREE.Color(0xff006e),
      new THREE.Color(0xfb5607),
      new THREE.Color(0xffbe0b),
      new THREE.Color(0xff3c78),
    ],
    angle: -Math.PI * 0.25,
    distance: 4.5,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/solanathouu',
    baseColor: new THREE.Color(0x00c8ff),
    colors: [
      new THREE.Color(0x00c8ff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x00c8ff),
    ],
    angle: Math.PI * 0.25,
    distance: 4.5,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    baseColor: new THREE.Color(0x3a86ff),
    colors: [
      new THREE.Color(0x3a86ff),
      new THREE.Color(0x0077b5),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x3a86ff),
    ],
    angle: Math.PI * 0.7,
    distance: 5.0,
  },
];

interface LabelPos {
  x: number;
  y: number;
}

export default function HeroOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [labelPositions, setLabelPositions] = useState<LabelPos[]>(
    LINK_ORBS.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create 4 link orbs
    const orbs = LINK_ORBS.map((cfg) => {
      const x = Math.cos(cfg.angle) * cfg.distance;
      const y = Math.sin(cfg.angle) * cfg.distance * 0.5;
      return createOrb(scene, {
        color: cfg.baseColor,
        position: new THREE.Vector3(x, y, 0),
        radius: 0.45,
        colors: cfg.colors,
      });
    });

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const wireframeMeshes = orbs.map((o) => o.wireframe);

    const onClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(wireframeMeshes);
      if (intersects.length > 0) {
        const idx = wireframeMeshes.indexOf(intersects[0].object as THREE.Mesh);
        if (idx !== -1) {
          const cfg = LINK_ORBS[idx];
          if (cfg.download) {
            const a = document.createElement('a');
            a.href = cfg.href;
            a.download = '';
            a.click();
          } else if (cfg.href.startsWith('mailto:')) {
            window.location.href = cfg.href;
          } else {
            window.open(cfg.href, '_blank', 'noopener,noreferrer');
          }
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(wireframeMeshes);
      container.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    container.addEventListener('click', onClick);
    container.addEventListener('mousemove', onMove);

    // Project 3D position to 2D screen coordinates
    const tempVec = new THREE.Vector3();
    function projectToScreen(position: THREE.Vector3): { x: number; y: number } {
      tempVec.copy(position);
      tempVec.project(camera);
      return {
        x: (tempVec.x * 0.5 + 0.5) * window.innerWidth,
        y: (-tempVec.y * 0.5 + 0.5) * window.innerHeight,
      };
    }

    // Animate
    let animationId: number;
    let frameCount = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      orbs.forEach((orb, i) => {
        updateOrbColor(orb, 0.003);
        const cfg = LINK_ORBS[i];
        const baseX = Math.cos(cfg.angle) * cfg.distance;
        const baseY = Math.sin(cfg.angle) * cfg.distance * 0.5;
        const floatX = Math.sin(time * 0.4 + i * 1.8) * 0.12;
        const floatY = Math.cos(time * 0.6 + i * 1.3) * 0.08;
        orb.wireframe.position.set(baseX + floatX, baseY + floatY, 0);
        orb.atmosphere.position.copy(orb.wireframe.position);
        orb.wireframe.rotation.y += 0.001;
        orb.atmosphere.rotation.y += 0.0005;
      });

      renderer.render(scene, camera);

      // Update label positions every 3 frames for perf
      frameCount++;
      if (frameCount % 3 === 0) {
        const newPositions = orbs.map((orb) => {
          const pos = projectToScreen(orb.wireframe.position);
          // Offset label below the orb
          pos.y += 45;
          return pos;
        });
        setLabelPositions(newPositions);
      }
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', onClick);
      container.removeEventListener('mousemove', onMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      orbs.forEach((o) => {
        o.wireframe.geometry.dispose();
        (o.wireframe.material as THREE.Material).dispose();
        o.atmosphere.geometry.dispose();
        (o.atmosphere.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 z-10" />
      {/* Labels positioned over each orb */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {LINK_ORBS.map((cfg, i) => (
          <span
            key={cfg.label}
            className="absolute text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] -translate-x-1/2 transition-opacity duration-500"
            style={{
              left: labelPositions[i].x,
              top: labelPositions[i].y,
              opacity: labelPositions[i].x === 0 ? 0 : 1,
            }}
          >
            {cfg.label}
          </span>
        ))}
      </div>
    </>
  );
}
