'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { createOrb, updateOrbColor, type OrbInstance } from '@/components/three/Orb';

// Each orb gets its own color palette that cycles — inspired by the Globe component
const ORB_CONFIG = [
  {
    label: 'Projets',
    route: '/projects',
    baseColor: new THREE.Color(0x7850ff),
    colors: [
      new THREE.Color(0x7850ff), // violet
      new THREE.Color(0x8338ec), // purple
      new THREE.Color(0xa78bfa), // light violet
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0x7850ff), // back to violet
    ],
    angle: -Math.PI / 3,
    distance: 3.5,
  },
  {
    label: 'Skills',
    route: '/skills',
    baseColor: new THREE.Color(0x00c8ff),
    colors: [
      new THREE.Color(0x00c8ff), // cyan
      new THREE.Color(0x38bdf8), // light blue
      new THREE.Color(0x06b6d4), // teal
      new THREE.Color(0x22d3ee), // cyan light
      new THREE.Color(0x00c8ff), // back
    ],
    angle: Math.PI / 3,
    distance: 3.2,
  },
  {
    label: 'Contact',
    route: '/contact',
    baseColor: new THREE.Color(0xff3c78),
    colors: [
      new THREE.Color(0xff3c78), // rose
      new THREE.Color(0xff006e), // pink
      new THREE.Color(0xfb5607), // orange
      new THREE.Color(0xffbe0b), // yellow
      new THREE.Color(0xff3c78), // back
    ],
    angle: Math.PI,
    distance: 3.0,
  },
];

export default function HubScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const orbsRef = useRef<OrbInstance[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
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

    // Create starfield — exact same approach as Globe inspiration
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create 3 orbs with wireframe + atmospheric glow + color cycling
    const orbs = ORB_CONFIG.map((cfg) => {
      const x = Math.cos(cfg.angle) * cfg.distance;
      const y = Math.sin(cfg.angle) * cfg.distance * 0.6;
      return createOrb(scene, {
        color: cfg.baseColor,
        position: new THREE.Vector3(x, y, 0),
        radius: 0.6,
        colors: cfg.colors,
      });
    });
    orbsRef.current = orbs;

    // Raycaster for click detection — uses wireframe meshes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const wireframeMeshes = orbs.map((o) => o.wireframe);

    const onClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(wireframeMeshes);
      if (intersects.length > 0) {
        const idx = wireframeMeshes.indexOf(
          intersects[0].object as THREE.Mesh
        );
        if (idx !== -1) {
          router.push(ORB_CONFIG[idx].route);
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

    // Animation loop — color cycling + float + star rotation like Globe
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Color cycling on each orb — same logic as Globe inspiration
      orbs.forEach((orb) => {
        updateOrbColor(orb, 0.003);
      });

      // Float animation
      const time = Date.now() * 0.001;
      orbs.forEach((orb, i) => {
        const cfg = ORB_CONFIG[i];
        const baseX = Math.cos(cfg.angle) * cfg.distance;
        const baseY = Math.sin(cfg.angle) * cfg.distance * 0.6;
        const floatX = Math.sin(time * 0.5 + i * 2) * 0.15;
        const floatY = Math.cos(time * 0.7 + i * 1.5) * 0.1;
        orb.wireframe.position.set(baseX + floatX, baseY + floatY, 0);
        orb.atmosphere.position.copy(orb.wireframe.position);

        // Slow rotation like Globe
        orb.wireframe.rotation.y += 0.001;
        orb.atmosphere.rotation.y += 0.0005;
      });

      // Slow star rotation — same as Globe
      stars.rotation.y += 0.0001;

      renderer.render(scene, camera);
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
      starsGeometry.dispose();
      starsMaterial.dispose();
      orbs.forEach((o) => {
        o.wireframe.geometry.dispose();
        (o.wireframe.material as THREE.Material).dispose();
        o.atmosphere.geometry.dispose();
        (o.atmosphere.material as THREE.Material).dispose();
      });
    };
  }, [router]);

  return <div ref={containerRef} className="fixed inset-0 z-10" />;
}
