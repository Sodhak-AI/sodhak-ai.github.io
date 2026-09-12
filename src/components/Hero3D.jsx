"use client";

import { useEffect, useRef } from "react";

// Wireframe icosahedron under a stream of inbound "attack" particles.
// Ported from the design's <sodhak-hero3d> custom element.
export default function Hero3D({ accent = "#ff5540" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let alive = true;
    let raf = 0;
    let observer;
    let renderer;
    let onMove;

    (async () => {
      const THREE = await import("three");
      if (!alive) return;

      const accentColor = new THREE.Color(accent);
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090c, 0.055);
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
      host.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.6, 1),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        })
      );
      group.add(core);

      group.add(
        new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.55, 0),
          new THREE.MeshBasicMaterial({ color: 0x11161d })
        )
      );
      group.add(
        new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.56, 0),
          new THREE.MeshBasicMaterial({ color: 0x3a4552, wireframe: true })
        )
      );

      const nodeGeo = new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 42 }, () =>
          new THREE.Vector3().randomDirection().multiplyScalar(2.6)
        )
      );
      group.add(
        new THREE.Points(
          nodeGeo,
          new THREE.PointsMaterial({
            color: accentColor,
            size: 0.09,
            transparent: true,
            opacity: 0.9,
          })
        )
      );

      for (const [rx, radius] of [
        [Math.PI / 2.2, 3.6],
        [Math.PI / 1.6, 4.3],
      ]) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.008, 8, 128),
          new THREE.MeshBasicMaterial({
            color: 0x55606e,
            transparent: true,
            opacity: 0.5,
          })
        );
        ring.rotation.x = rx;
        group.add(ring);
      }

      const N = 700;
      const positions = new Float32Array(N * 3);
      const velocity = new Float32Array(N);
      for (let i = 0; i < N; i += 1) {
        const d = new THREE.Vector3().randomDirection();
        const r = 6 + Math.random() * 8;
        positions.set([d.x * r, d.y * r, d.z * r], i * 3);
        velocity[i] = 0.015 + Math.random() * 0.035;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      scene.add(
        new THREE.Points(
          particleGeo,
          new THREE.PointsMaterial({
            color: 0x8b97a5,
            size: 0.035,
            transparent: true,
            opacity: 0.8,
          })
        )
      );

      let mx = 0;
      let my = 0;
      onMove = (event) => {
        mx = (event.clientX / window.innerWidth - 0.5) * 2;
        my = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const clock = new THREE.Clock();
      const scratch = new THREE.Vector3();

      const loop = () => {
        if (!alive) return;
        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.12 + mx * 0.35;
        group.rotation.x = Math.sin(t * 0.2) * 0.15 + my * 0.25;
        core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.015);

        const a = particleGeo.attributes.position.array;
        for (let i = 0; i < N; i += 1) {
          const x = a[i * 3];
          const y = a[i * 3 + 1];
          const z = a[i * 3 + 2];
          const len = Math.hypot(x, y, z);
          if (len < 2.9) {
            const r = 10 + Math.random() * 5;
            scratch.randomDirection();
            a[i * 3] = scratch.x * r;
            a[i * 3 + 1] = scratch.y * r;
            a[i * 3 + 2] = scratch.z * r;
          } else {
            const f = 1 - (velocity[i] / len) * 3.2;
            a[i * 3] = x * f;
            a[i * 3 + 1] = y * f;
            a[i * 3 + 2] = z * f;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
        if (!reduceMotion) raf = requestAnimationFrame(loop);
      };
      loop();
    })().catch(() => {
      // WebGL unavailable: the hero simply renders without the scene.
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [accent]);

  return <div ref={hostRef} className="hero-3d" aria-hidden="true" />;
}
