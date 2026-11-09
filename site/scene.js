/* SODHAK AI hero: a stream of data flowing through the SODHAK checkpoint.
   Clean data passes and cools to teal; risky data (red) is caught at the ring and bursts.
   Three.js r160 from jsDelivr (mapped by the import map in index.html). */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const canvas = document.getElementById("scene");
const host = canvas && canvas.parentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function supported() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); }
  catch (e) { return false; }
}

if (canvas && supported()) start();
else if (host) host.classList.add("no-webgl");

function start() {
  const mobile = window.innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070b, 0.035);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  const camBase = new THREE.Vector3(mobile ? 0 : -1.5, 0.8, mobile ? 24 : 18);
  camera.position.copy(camBase);

  /* ── The checkpoint: ribbon-coloured ring with a glassy membrane and a core ── */
  const gate = new THREE.Group();
  gate.position.set(mobile ? 0 : 6.2, mobile ? 4.2 : 0.2, 0);
  gate.rotation.y = mobile ? -0.9 : -1.0;
  scene.add(gate);

  const ringGeo = new THREE.TorusGeometry(3.2, 0.16, 32, 220);
  // Vertex colours sweep amber -> coral -> magenta around the ring (the logo ribbon).
  const stops = [new THREE.Color("#ffb454"), new THREE.Color("#ff5540"), new THREE.Color("#e6303c"), new THREE.Color("#b3186f"), new THREE.Color("#ffb454")];
  const pos = ringGeo.attributes.position;
  const cols = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const a = (Math.atan2(pos.getY(i), pos.getX(i)) / (Math.PI * 2) + 1) % 1;
    const f = a * (stops.length - 1), k = Math.floor(f);
    const c = stops[k].clone().lerp(stops[Math.min(k + 1, stops.length - 1)], f - k);
    cols.set([c.r, c.g, c.b], i * 3);
  }
  ringGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
  const ringMat = new THREE.MeshBasicMaterial({ vertexColors: true });
  ringMat.color.setScalar(1.0);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  gate.add(ring);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.75, 0.025, 12, 220), new THREE.MeshBasicMaterial({ color: 0xff7a5c, transparent: true, opacity: 0.55 }));
  gate.add(ring2);
  const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.018, 12, 220), new THREE.MeshBasicMaterial({ color: 0xffb454, transparent: true, opacity: 0.35 }));
  gate.add(ring3);

  // Membrane: a faint disc with a hex lattice that flashes when something is caught.
  const membraneMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uHit: { value: 0 }, uHitPos: { value: new THREE.Vector2() } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: `
      varying vec2 vUv; uniform float uTime; uniform float uHit; uniform vec2 uHitPos;
      float hex(vec2 p){ p *= vec2(1.0, 1.1547); p.x += mod(floor(p.y), 2.0) * 0.5; vec2 f = abs(fract(p) - 0.5); return max(f.x * 1.5 + f.y, f.y * 2.0); }
      void main(){
        vec2 p = vUv - 0.5; float r = length(p) * 2.0;
        if (r > 1.0) discard;
        float lattice = smoothstep(0.93, 1.0, hex(p * 16.0));
        float edge = smoothstep(0.55, 1.0, r);
        float hitD = length(p - uHitPos);
        float wave = uHit * smoothstep(0.08, 0.0, abs(hitD - (1.0 - uHit) * 0.6)) ;
        float a = lattice * (0.025 + 0.08 * edge + 0.7 * wave) + edge * 0.015 + uHit * 0.03;
        vec3 col = mix(vec3(1.0, 0.45, 0.3), vec3(1.0, 0.25, 0.35), r);
        gl_FragColor = vec4(col, a);
      }`,
  });
  const membrane = new THREE.Mesh(new THREE.CircleGeometry(3.15, 96), membraneMat);
  gate.add(membrane);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: 0xff6a45, wireframe: true, transparent: true, opacity: 0.55 }));
  gate.add(core);

  /* ── Data particles ── */
  const N = mobile ? 1100 : 2600;
  const X0 = -26, X1 = 22;
  const geo = new THREE.BufferGeometry();
  const P = new Float32Array(N * 3), C = new Float32Array(N * 3), S = new Float32Array(N);
  const vel = new Float32Array(N * 3), state = new Uint8Array(N), risky = new Uint8Array(N), life = new Float32Array(N), speed = new Float32Array(N);
  const cIn = new THREE.Color("#b8c8e6"), cOut = new THREE.Color("#2dd4a0"), cBad = new THREE.Color("#ff3b30");
  const gatePos = gate.position, gx = gatePos.x;

  function spawn(i, anywhere) {
    const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * 2.6;
    P[i * 3] = anywhere ? X0 + Math.random() * (X1 - X0) : X0 - Math.random() * 6;
    P[i * 3 + 1] = gatePos.y + Math.cos(a) * rr;
    P[i * 3 + 2] = Math.sin(a) * rr;
    risky[i] = Math.random() < 0.07 ? 1 : 0;
    if (anywhere && P[i * 3] > gx) risky[i] = 0;
    state[i] = P[i * 3] > gx ? 1 : 0;
    speed[i] = 3.2 + Math.random() * 2.4;
    S[i] = risky[i] ? 2.4 : 1.0 + Math.random() * 1.0;
    life[i] = 1;
  }
  for (let i = 0; i < N; i++) spawn(i, true);
  geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(C, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(S, 1));

  const ptsMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
    uniforms: { uScale: { value: renderer.getPixelRatio() * (mobile ? 30 : 38) } },
    vertexShader: `attribute float size; varying vec3 vColor; uniform float uScale;
      void main(){ vColor = color; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = size * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vColor; void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(vColor * 1.4, a); }`,
  });
  const points = new THREE.Points(geo, ptsMat);
  scene.add(points);

  // Faint background dust for depth.
  const dust = new THREE.BufferGeometry();
  const D = new Float32Array(600 * 3);
  for (let i = 0; i < 600; i++) D.set([(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40, -10 - Math.random() * 40], i * 3);
  dust.setAttribute("position", new THREE.BufferAttribute(D, 3));
  scene.add(new THREE.Points(dust, new THREE.PointsMaterial({ color: 0x3b4a66, size: 0.08, transparent: true, opacity: 0.7 })));

  /* ── Post-processing: bloom for the cinematic glow ── */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), mobile ? 0.55 : 0.7, 0.45, 0.28);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const mouse = new THREE.Vector2();
  window.addEventListener("pointermove", (e) => {
    mouse.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  let hit = 0;
  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(host);

  function step(dt, t) {
    for (let i = 0; i < N; i++) {
      const j = i * 3;
      if (state[i] === 2) {                           // caught: bursting
        P[j] += vel[j] * dt; P[j + 1] += vel[j + 1] * dt; P[j + 2] += vel[j + 2] * dt;
        vel[j] *= 0.95; vel[j + 1] *= 0.95; vel[j + 2] *= 0.95;
        life[i] -= dt * 0.9;
        if (life[i] <= 0) spawn(i, false);
      } else {
        const sp = speed[i] * (state[i] === 1 ? 1.15 : 1);
        P[j] += sp * dt;
        P[j + 1] += Math.sin(t * 0.8 + i) * 0.004;
        if (state[i] === 0 && P[j] >= gx - 0.05) {
          if (risky[i]) {                              // caught at the checkpoint
            state[i] = 2;
            const dy = P[j + 1] - gatePos.y, dz = P[j + 2];
            vel[j] = -1.5 - Math.random() * 2.5;
            vel[j + 1] = dy * 1.4 + (Math.random() - 0.5) * 4;
            vel[j + 2] = dz * 1.4 + (Math.random() - 0.5) * 4;
            hit = 1;
            membraneMat.uniforms.uHitPos.value.set(dz / 6.3, dy / 6.3);
          } else state[i] = 1;
        }
        if (P[j] > X1) spawn(i, false);
      }
      // colour by state
      let c;
      if (state[i] === 2) { c = cBad; S[i] = 1.9 * Math.max(life[i], 0) + 0.2; }
      else if (risky[i]) c = cBad;
      else if (state[i] === 1) c = cOut;
      else c = cIn;
      const fade = Math.min(1, (P[j] - X0 + 6) / 8) * Math.min(1, (X1 - P[j]) / 6);
      const k = Math.max(0, fade) * (state[i] === 2 ? Math.max(life[i], 0) : 1);
      C[j] = c.r * k; C[j + 1] = c.g * k; C[j + 2] = c.b * k;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    geo.attributes.size.needsUpdate = true;

    hit = Math.max(0, hit - dt * 1.6);
    membraneMat.uniforms.uHit.value = hit;
    membraneMat.uniforms.uTime.value = t;
    ring.scale.setScalar(1 + hit * 0.04);
    ringMat.color.setScalar(1.0 + hit * 0.9);
    core.rotation.x = t * 0.4; core.rotation.y = t * 0.6;
    core.scale.setScalar(1 + hit * 0.35);
    ring2.rotation.z = t * 0.15; ring3.rotation.z = -t * 0.22;

    camera.position.x += (camBase.x + mouse.x * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (camBase.y - mouse.y * 1.4 - camera.position.y) * 0.04;
    camera.lookAt(mobile ? 0 : 2.8, 0, 0);
  }

  // Warm up so the first frame already shows a full stream.
  for (let k = 0; k < 90; k++) step(1 / 60, k / 60);

  if (reduce) { composer.render(); host.classList.add("is-ready"); return; }

  function loop() {
    requestAnimationFrame(loop);
    if (!visible || document.hidden) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), 1 / 30);
    step(dt, clock.elapsedTime);
    composer.render();
  }
  host.classList.add("is-ready");
  loop();
}
