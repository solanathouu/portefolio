'use client';

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
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`;

interface OrbConfig {
  color: THREE.Color;
  position: THREE.Vector3;
  radius: number;
  colors: THREE.Color[];
}

export interface OrbInstance {
  wireframe: THREE.Mesh;
  atmosphere: THREE.Mesh;
  colors: THREE.Color[];
  colorIndex: number;
  nextColorIndex: number;
  colorT: number;
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  const color = new THREE.Color();
  color.r = a.r + (b.r - a.r) * t;
  color.g = a.g + (b.g - a.g) * t;
  color.b = a.b + (b.b - a.b) * t;
  return color;
}

export function createOrb(
  scene: THREE.Scene,
  config: OrbConfig
): OrbInstance {
  // Wireframe globe — like the Globe inspiration
  const wireframeGeometry = new THREE.SphereGeometry(config.radius, 32, 32);
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: config.color,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  wireframe.position.copy(config.position);
  scene.add(wireframe);

  // Atmospheric glow (fresnel) — exact same shader as Globe inspiration
  const atmosphereGeometry = new THREE.SphereGeometry(config.radius * 1.3, 32, 32);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    uniforms: {
      glowColor: { value: config.color.clone() },
    },
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  atmosphere.position.copy(config.position);
  scene.add(atmosphere);

  return {
    wireframe,
    atmosphere,
    colors: config.colors,
    colorIndex: 0,
    nextColorIndex: 1,
    colorT: 0,
  };
}

export function updateOrbColor(orb: OrbInstance, colorTransitionSpeed: number) {
  orb.colorT += colorTransitionSpeed;
  if (orb.colorT >= 1) {
    orb.colorT = 0;
    orb.colorIndex = orb.nextColorIndex;
    orb.nextColorIndex = (orb.nextColorIndex + 1) % orb.colors.length;
  }

  const currentColor = lerpColor(
    orb.colors[orb.colorIndex],
    orb.colors[orb.nextColorIndex],
    orb.colorT
  );

  // Update wireframe color
  if (orb.wireframe.material instanceof THREE.MeshBasicMaterial) {
    orb.wireframe.material.color.copy(currentColor);
  }

  // Update atmosphere glow color
  if (orb.atmosphere.material instanceof THREE.ShaderMaterial) {
    orb.atmosphere.material.uniforms.glowColor.value.copy(currentColor);
  }
}
