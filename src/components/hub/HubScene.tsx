'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { createOrb } from '@/components/three/Orb';

const ORB_CONFIG = [
  { label: 'Projets', route: '/projects', color: new THREE.Color(0x7850ff), angle: -Math.PI / 3, distance: 3.5 },
  { label: 'Skills', route: '/skills', color: new THREE.Color(0x00c8ff), angle: Math.PI / 3, distance: 3.2 },
  { label: 'Contact', route: '/contact', color: new THREE.Color(0xff3c78), angle: Math.PI, distance: 3.0 },
] as const;

export default function HubScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const orbMeshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create 3 orbs
    const orbs = ORB_CONFIG.map((cfg) => {
      const x = Math.cos(cfg.angle) * cfg.distance;
      const y = Math.sin(cfg.angle) * cfg.distance * 0.6;
      return createOrb(scene, {
        color: cfg.color,
        position: new THREE.Vector3(x, y, 0),
        radius: 0.6,
      });
    });
    orbMeshesRef.current = orbs.map((o) => o.mesh);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshesRef.current);
      if (intersects.length > 0) {
        const idx = orbMeshesRef.current.indexOf(intersects[0].object as THREE.Mesh);
        if (idx !== -1) {
          router.push(ORB_CONFIG[idx].route);
        }
      }
    };

    // Hover cursor change
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshesRef.current);
      container.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    container.addEventListener('click', onClick);
    container.addEventListener('mousemove', onMove);

    // Animation loop
    let time = 0;
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      orbs.forEach((orb, i) => {
        const cfg = ORB_CONFIG[i];
        const baseX = Math.cos(cfg.angle) * cfg.distance;
        const baseY = Math.sin(cfg.angle) * cfg.distance * 0.6;
        const floatX = Math.sin(time * 0.5 + i * 2) * 0.15;
        const floatY = Math.cos(time * 0.7 + i * 1.5) * 0.1;
        orb.mesh.position.set(baseX + floatX, baseY + floatY, 0);
        orb.glow.position.copy(orb.mesh.position);
      });

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
      orbs.forEach((o) => {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
        o.glow.geometry.dispose();
        (o.glow.material as THREE.Material).dispose();
      });
    };
  }, [router]);

  return <div ref={containerRef} className="fixed inset-0 z-10" />;
}
