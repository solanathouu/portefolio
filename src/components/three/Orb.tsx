'use client';

import * as THREE from 'three';

interface OrbConfig {
  color: THREE.Color;
  position: THREE.Vector3;
  radius: number;
}

export function createOrb(
  scene: THREE.Scene,
  config: OrbConfig
): { mesh: THREE.Mesh; glow: THREE.Mesh } {
  // Solid sphere
  const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: config.color,
    transparent: true,
    opacity: 0.6,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(config.position);
  scene.add(mesh);

  // Atmospheric glow (fresnel)
  const glowGeometry = new THREE.SphereGeometry(config.radius * 1.3, 32, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `,
    uniforms: {
      glowColor: { value: config.color },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.copy(config.position);
  scene.add(glow);

  return { mesh, glow };
}
