"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export default function HeroOrbCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Group to hold core orb + orbital rings
    const group = new THREE.Group();
    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 4.5, 12);
    cyanLight.position.set(3.5, 3.5, 3.5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4.5, 12);
    purpleLight.position.set(-3.5, -2.5, 2.5);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3.2, 10);
    blueLight.position.set(0, -3.5, -2);
    scene.add(blueLight);

    // Core Icosahedron with organic vertex displacement
    const coreGeometry = new THREE.IcosahedronGeometry(1.22, 12);
    const positionAttr = coreGeometry.attributes.position;
    const basePositions = new Float32Array(positionAttr.array.length);
    basePositions.set(positionAttr.array);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e1b4b"),
      emissive: new THREE.Color("#581c87"),
      emissiveIntensity: 0.5,
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Subtle glowing wireframe shell around the core
    const wireGeometry = new THREE.IcosahedronGeometry(1.26, 3);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wireMesh);

    // Outer Cyan Orbital Ring
    const ring1Geometry = new THREE.TorusGeometry(1.78, 0.015, 16, 120);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 2.4;
    group.add(ring1);

    // Outer Purple Orbital Ring
    const ring2Geometry = new THREE.TorusGeometry(2.02, 0.012, 16, 120);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    group.add(ring2);

    // Interactive Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 420;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Organic vertex wave distortion on the core sphere
        for (let i = 0; i < positionAttr.count; i++) {
          const ix = i * 3;
          const ox = basePositions[ix];
          const oy = basePositions[ix + 1];
          const oz = basePositions[ix + 2];

          const wave =
            Math.sin(ox * 2.4 + t * 1.8) *
            Math.cos(oy * 2.4 + t * 1.5) *
            Math.sin(oz * 2.4 + t * 1.6) *
            0.12;

          const scale = 1 + wave;
          positionAttr.setXYZ(i, ox * scale, oy * scale, oz * scale);
        }
        positionAttr.needsUpdate = true;
        coreGeometry.computeVertexNormals();

        // Smooth rotation & floating motion
        coreMesh.rotation.y = t * 0.25;
        coreMesh.rotation.x = t * 0.18;
        wireMesh.rotation.y = -t * 0.15;
        wireMesh.rotation.z = t * 0.12;

        ring1.rotation.z = t * 0.35;
        ring1.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.25;

        ring2.rotation.z = -t * 0.25;
        ring2.rotation.y = Math.PI / 3 + Math.cos(t * 0.4) * 0.25;

        group.position.y = Math.sin(t * 1.4) * 0.12;
        group.rotation.y += (targetX - group.rotation.y) * 0.05;
        group.rotation.x += (targetY - group.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative flex h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px] items-center justify-center">
      {/* Multi-layered aurora glow behind the 3D orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full bg-gradient-to-tr from-purple-600/35 via-cyan-400/30 to-blue-600/35 blur-3xl animate-pulse-glow"
      />
      <div
        ref={containerRef}
        aria-label="Interactive 3D futuristic orb"
        className="relative z-10 h-full w-full"
      />
    </div>
  );
}
