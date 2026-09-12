"use client";

import { useEffect, useRef } from "react";

// The model under test: a neural lattice with hot accent nodes and a
// wireframe core, wrapped in a geodesic shield, probed by four orbiting
// agent emblems firing beams while inbound attack particles flash on impact.
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

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xff5540, 60);
      rim.position.set(-7, -4, 5);
      scene.add(rim);
      const cool = new THREE.DirectionalLight(0x6a9fff, 0.5);
      cool.position.set(-5, 3, -7);
      scene.add(cool);

      const group = new THREE.Group();
      scene.add(group);

      // Neural lattice: nodes on a jittered Fibonacci sphere, synapses between neighbours.
      const NODES = 110;
      const R = 2.9;
      const nodePos = [];
      for (let i = 0; i < NODES; i += 1) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / NODES);
        const th = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = R * (0.75 + Math.random() * 0.35);
        nodePos.push(
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(th),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(th)
          )
        );
      }
      const linePts = [];
      for (let i = 0; i < NODES; i += 1) {
        for (let j = i + 1; j < NODES; j += 1) {
          if (nodePos[i].distanceTo(nodePos[j]) < 1.35) {
            linePts.push(nodePos[i].clone(), nodePos[j].clone());
          }
        }
      }
      group.add(
        new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints(linePts),
          new THREE.LineBasicMaterial({
            color: 0x3a4552,
            transparent: true,
            opacity: 0.55,
          })
        )
      );
      group.add(
        new THREE.Points(
          new THREE.BufferGeometry().setFromPoints(nodePos),
          new THREE.PointsMaterial({
            color: 0x9fb0c2,
            size: 0.055,
            transparent: true,
            opacity: 0.95,
          })
        )
      );

      // Hot nodes in the accent colour: found weaknesses.
      const hotIdx = [3, 17, 31, 52, 68, 84, 97];
      const hot = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(hotIdx.map((i) => nodePos[i])),
        new THREE.PointsMaterial({
          color: accentColor,
          size: 0.14,
          transparent: true,
          opacity: 1,
        })
      );
      group.add(hot);

      // Inner core: the model's protected centre.
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.1, 1),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        })
      );
      group.add(core);

      // Impact flashes.
      const flashes = [];
      for (let i = 0; i < 7; i += 1) {
        const flash = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 10, 10),
          new THREE.MeshBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: 0,
          })
        );
        flash.userData.life = 0;
        scene.add(flash);
        flashes.push(flash);
      }
      let flashCursor = 0;

      // Geodesic security shield around the model.
      const shield = new THREE.Group();
      const shieldWire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.9, 1),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        })
      );
      const shieldSkin = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.88, 1),
        new THREE.MeshBasicMaterial({
          color: 0x1a2a3a,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide,
        })
      );
      shield.add(shieldWire, shieldSkin);
      scene.add(shield);

      // Agent probes: small emblems orbiting the shield.
      const agentColors = [0xffb454, 0xff5540, 0xc9238a, 0x55e08c];
      const dark = 0x07090c;
      const solid = (geo, color) =>
        new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color }));
      const mkAgent = (color, kind) => {
        const g = new THREE.Group();
        if (kind === 0) {
          // Robot head.
          const head = solid(new THREE.BoxGeometry(0.34, 0.28, 0.16), color);
          const eyeL = solid(new THREE.SphereGeometry(0.045, 8, 8), dark);
          eyeL.position.set(-0.08, 0.03, 0.09);
          const eyeR = eyeL.clone();
          eyeR.position.x = 0.08;
          const antenna = solid(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 6), color);
          antenna.position.y = 0.2;
          const tip = solid(new THREE.SphereGeometry(0.035, 8, 8), color);
          tip.position.y = 0.27;
          const mouth = solid(new THREE.BoxGeometry(0.14, 0.03, 0.02), dark);
          mouth.position.set(0, -0.08, 0.09);
          g.add(head, eyeL, eyeR, antenna, tip, mouth);
        } else if (kind === 1) {
          // Chat bubble.
          const bubble = solid(new THREE.SphereGeometry(0.2, 16, 16), color);
          bubble.scale.set(1.1, 0.85, 0.45);
          const tail = solid(new THREE.ConeGeometry(0.06, 0.14, 8), color);
          tail.position.set(-0.1, -0.2, 0);
          tail.rotation.z = 0.7;
          for (let d = 0; d < 3; d += 1) {
            const dot = solid(new THREE.SphereGeometry(0.028, 8, 8), dark);
            dot.position.set(-0.08 + d * 0.08, 0, 0.1);
            g.add(dot);
          }
          g.add(bubble, tail);
        } else if (kind === 2) {
          // Terminal chip.
          const chip = solid(new THREE.BoxGeometry(0.4, 0.3, 0.08), color);
          const s1 = solid(new THREE.BoxGeometry(0.1, 0.03, 0.02), dark);
          s1.position.set(-0.1, 0.04, 0.05);
          s1.rotation.z = 0.6;
          const s2 = solid(new THREE.BoxGeometry(0.1, 0.03, 0.02), dark);
          s2.position.set(-0.1, -0.04, 0.05);
          s2.rotation.z = -0.6;
          const bar = solid(new THREE.BoxGeometry(0.12, 0.03, 0.02), dark);
          bar.position.set(0.08, -0.07, 0.05);
          g.add(chip, s1, s2, bar);
        } else {
          // Gear: tool use.
          const ring = solid(new THREE.TorusGeometry(0.15, 0.055, 8, 20), color);
          for (let d = 0; d < 6; d += 1) {
            const tooth = solid(new THREE.BoxGeometry(0.07, 0.07, 0.07), color);
            const angle = (d / 6) * Math.PI * 2;
            tooth.position.set(Math.cos(angle) * 0.21, Math.sin(angle) * 0.21, 0);
            g.add(tooth);
          }
          const hub = solid(new THREE.SphereGeometry(0.05, 8, 8), dark);
          hub.position.z = 0.02;
          g.add(ring, hub);
        }
        return g;
      };
      const agents = agentColors.map((color, i) => {
        const g = mkAgent(color, i);
        scene.add(g);
        const beamGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]);
        const beam = new THREE.Line(
          beamGeo,
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
        );
        scene.add(beam);
        return {
          g,
          beam,
          beamGeo,
          r: 4.6 + i * 0.35,
          speed: 0.35 + i * 0.09,
          incl: (i * Math.PI) / 4.2,
          phase: i * 1.7,
        };
      });

      // Orbit rings.
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

      // Attack particle streams flying inward.
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
      const target = new THREE.Vector3();

      const loop = () => {
        if (!alive) return;
        const t = clock.getElapsedTime();

        group.rotation.y = t * 0.08 + mx * 0.35;
        group.rotation.x = Math.sin(t * 0.2) * 0.12 + my * 0.25;
        group.position.y = Math.sin(t * 0.9) * 0.12;
        core.rotation.y = -t * 0.25;
        core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.04);
        hot.material.size = 0.12 + Math.sin(t * 3) * 0.045;
        shield.rotation.y = -t * 0.05;
        shield.rotation.z = Math.sin(t * 0.3) * 0.06;
        shieldWire.material.opacity = 0.13 + Math.sin(t * 2.2) * 0.05;

        for (const agent of agents) {
          const a2 = t * agent.speed + agent.phase;
          const px = Math.cos(a2) * agent.r;
          const pz = Math.sin(a2) * agent.r;
          const py = Math.sin(a2 * 1.3) * Math.sin(agent.incl) * 2.2;
          agent.g.position.set(px, py, pz);
          agent.g.lookAt(camera.position);
          agent.g.rotation.z = Math.sin(t * 1.2 + agent.phase) * 0.15;

          // Probe beam fires at the lattice in bursts.
          const firing = Math.sin(t * 1.1 + agent.phase * 3) > 0.55;
          agent.beam.material.opacity = firing ? 0.3 + Math.random() * 0.3 : 0;
          if (firing) {
            target
              .copy(agent.g.position)
              .normalize()
              .multiplyScalar(2.9 + Math.random() * 0.2);
            const pts = agent.beamGeo.attributes.position.array;
            pts[0] = agent.g.position.x;
            pts[1] = agent.g.position.y;
            pts[2] = agent.g.position.z;
            pts[3] = target.x;
            pts[4] = target.y;
            pts[5] = target.z;
            agent.beamGeo.attributes.position.needsUpdate = true;
          }
        }

        for (const flash of flashes) {
          if (flash.userData.life > 0) {
            flash.userData.life -= 0.03;
            flash.material.opacity = Math.max(0, flash.userData.life);
            flash.scale.setScalar(1 + (1 - flash.userData.life) * 4);
          } else {
            flash.material.opacity = 0;
          }
        }

        const a = particleGeo.attributes.position.array;
        for (let i = 0; i < N; i += 1) {
          const x = a[i * 3];
          const y = a[i * 3 + 1];
          const z = a[i * 3 + 2];
          const len = Math.hypot(x, y, z);
          if (len < 2.9) {
            if (Math.random() < 0.25) {
              const flash = flashes[flashCursor % flashes.length];
              flashCursor += 1;
              flash.position
                .set(x, y, z)
                .applyEuler(group.rotation)
                .add(group.position);
              flash.userData.life = 1;
              flash.scale.setScalar(1);
            }
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
