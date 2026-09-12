"use client";

import { useEffect, useRef } from "react";

// The folded-ribbon logo as a small 3D character: extruded facets, eyes that
// follow the cursor, a waving arm, and a hover ring.
// Ported from the design's <sodhak-bot3d> custom element.
export default function Bot3D() {
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

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.2, 13);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
      host.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 2.3);
      key.position.set(4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xff5540, 35);
      rim.position.set(-5, -3, 4);
      scene.add(rim);
      const cool = new THREE.DirectionalLight(0x6a9fff, 0.6);
      cool.position.set(-4, 2, -6);
      scene.add(cool);

      // Same ribbon paths as the SVG logo (128 viewBox, y flipped).
      const Y = (v) => -(v - 58);
      const X = (v) => v - 64;
      const mkShape = (pts) => {
        const shape = new THREE.Shape();
        shape.moveTo(X(pts[0][0]), Y(pts[0][1]));
        for (let i = 1; i < pts.length; i += 1) {
          const p = pts[i];
          if (p.length === 6) {
            shape.bezierCurveTo(X(p[0]), Y(p[1]), X(p[2]), Y(p[3]), X(p[4]), Y(p[5]));
          } else {
            shape.lineTo(X(p[0]), Y(p[1]));
          }
        }
        shape.closePath();
        return shape;
      };
      const A = mkShape([[96, 24], [96, 12, 74, 8, 56, 14], [36, 21, 34, 40, 54, 48], [96, 40]]);
      const B = mkShape([[54, 48], [74, 56, 96, 60, 93, 78], [34, 86], [30, 74, 36, 56, 54, 48]]);
      const C = mkShape([
        [93, 78],
        [90, 98, 58, 104, 40, 92],
        [33, 87, 30, 80, 34, 72],
        [60, 76],
        [70, 78, 82, 78, 93, 78],
      ]);
      const extrude = {
        depth: 9,
        bevelEnabled: true,
        bevelThickness: 1.6,
        bevelSize: 1.4,
        bevelSegments: 4,
        curveSegments: 24,
      };
      const mat = (color) =>
        new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.3 });

      const bot = new THREE.Group();
      const facetA = new THREE.Mesh(new THREE.ExtrudeGeometry(A, extrude), mat(0xff8a3d));
      const facetB = new THREE.Mesh(new THREE.ExtrudeGeometry(B, extrude), mat(0xff4536));
      const facetC = new THREE.Mesh(new THREE.ExtrudeGeometry(C, extrude), mat(0xc9238a));
      facetA.position.z = 5;
      facetB.position.z = 0;
      facetC.position.z = -5;
      bot.add(facetA, facetB, facetC);

      const eyeGeo = new THREE.SphereGeometry(3.4, 24, 24);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15 });
      const pupilMat = new THREE.MeshStandardMaterial({ color: 0x07090c, roughness: 0.2 });
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(X(58), Y(26), 16.2);
      eyeL.scale.z = 0.5;
      const eyeR = eyeL.clone();
      eyeR.position.x = X(76);
      const pupilL = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), pupilMat);
      pupilL.position.set(X(58), Y(26), 19.4);
      const pupilR = pupilL.clone();
      pupilR.position.x = X(76);
      bot.add(eyeL, eyeR, pupilL, pupilR);

      const armGeo = new THREE.CapsuleGeometry(2, 7, 8, 16);
      const armMat = mat(0xff8a3d);
      const armL = new THREE.Mesh(armGeo, armMat);
      armL.position.set(X(28), Y(66), 4.5);
      armL.rotation.z = 0.6;
      const armR = new THREE.Mesh(armGeo, armMat);
      armR.position.set(X(100), Y(66), 4.5);
      armR.rotation.z = -0.6;
      bot.add(armL, armR);

      bot.scale.setScalar(0.062);
      scene.add(bot);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.13, 16, 64),
        new THREE.MeshStandardMaterial({
          color: 0xff5540,
          emissive: 0xff2a1a,
          emissiveIntensity: 0.6,
          metalness: 0.3,
          roughness: 0.3,
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -3.4;
      scene.add(ring);

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

      let mx = 0;
      let my = 0;
      onMove = (event) => {
        mx = (event.clientX / window.innerWidth - 0.5) * 2;
        my = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const clock = new THREE.Clock();

      const loop = () => {
        if (!alive) return;
        const t = clock.getElapsedTime();
        bot.position.y = Math.sin(t * 1.6) * 0.24;
        bot.rotation.y = Math.sin(t * 0.5) * 0.4 + mx * 0.5;
        bot.rotation.x = my * 0.2;
        bot.rotation.z = Math.sin(t * 0.8) * 0.05;

        const b = t % 3.4;
        const blink = b > 3.15 ? 0.08 : 1;
        eyeL.scale.y = blink;
        eyeR.scale.y = blink;
        pupilL.scale.y = blink;
        pupilR.scale.y = blink;

        pupilL.position.x = X(58) + mx * 1.2;
        pupilR.position.x = X(76) + mx * 1.2;
        pupilL.position.y = Y(26) - my * 1.2;
        pupilR.position.y = Y(26) - my * 1.2;

        const w = t % 6;
        armR.rotation.z =
          w < 1.4
            ? -0.6 - Math.abs(Math.sin(w * Math.PI * 2.5)) * 0.9
            : -0.6 + Math.sin(t * 1.6) * 0.08;
        armL.rotation.z = 0.6 - Math.sin(t * 1.6) * 0.08;

        const spread = (Math.sin(t * 0.9) + 1) * 0.5;
        facetA.position.z = 5 + spread * 3;
        facetC.position.z = -5 - spread * 3;

        ring.rotation.z = t * 0.8;
        ring.position.y = -3.4 + Math.sin(t * 1.6 + 1) * 0.12;
        const rs = 1 + Math.sin(t * 1.6) * 0.05;
        ring.scale.set(rs, rs, 1);

        renderer.render(scene, camera);
        if (!reduceMotion) raf = requestAnimationFrame(loop);
      };
      loop();
    })().catch(() => {
      // WebGL unavailable: leave the slot empty.
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
  }, []);

  return <div ref={hostRef} className="bot-3d" aria-hidden="true" />;
}
