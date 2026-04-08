'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 glowColor;
  uniform float opacity;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(glowColor, opacity) * intensity;
  }
`;

interface InnerOrbProps {
  color?: string;
  className?: string;
}

export default function InnerOrb({ color = '#7850ff', className = '' }: InnerOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    // Camera at center of the sphere — we're INSIDE
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const threeColor = new THREE.Color(color);

    // Large wireframe sphere around the camera — viewed from inside
    const wireframeGeometry = new THREE.SphereGeometry(12, 48, 48);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: threeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Second wireframe shell, slightly smaller, different rotation for depth
    const wireframe2Geometry = new THREE.SphereGeometry(10, 32, 32);
    const wireframe2Material = new THREE.MeshBasicMaterial({
      color: threeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const wireframe2 = new THREE.Mesh(wireframe2Geometry, wireframe2Material);
    scene.add(wireframe2);

    // Atmospheric glow from inside
    const glowGeometry = new THREE.SphereGeometry(13, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        glowColor: { value: threeColor },
        opacity: { value: 0.3 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Slow rotation — you're inside, the wireframe drifts around you
      wireframe.rotation.y += 0.0003;
      wireframe.rotation.x += 0.0001;
      wireframe2.rotation.y -= 0.0002;
      wireframe2.rotation.z += 0.00015;
      glow.rotation.y += 0.00015;

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      wireframe2Geometry.dispose();
      wireframe2Material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  );
}
