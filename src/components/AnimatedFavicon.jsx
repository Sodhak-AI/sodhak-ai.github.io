"use client";

import { useEffect } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    const icon = document.querySelector('link[rel="icon"]');
    if (!icon) return;

    const original = ["href", "type", "sizes"].map((name) => [
      name,
      icon.getAttribute(name),
    ]);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const logo = new Image();
    let frames = [];
    let timer;

    const restore = () => {
      window.clearInterval(timer);
      original.forEach(([name, value]) => {
        if (value === null) icon.removeAttribute(name);
        else icon.setAttribute(name, value);
      });
    };

    const sync = () => {
      restore();
      if (motion.matches || document.hidden || !frames.length) return;

      let frame = 0;
      icon.type = "image/png";
      icon.setAttribute("sizes", "64x64");
      icon.href = frames[frame];
      timer = window.setInterval(() => {
        frame = (frame + 1) % frames.length;
        icon.href = frames[frame];
      }, 200);
    };

    logo.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const context = canvas.getContext("2d");
      if (!context) return;

      try {
        // Render once, then reuse the PNG frames instead of redrawing each tick.
        frames = Array.from({ length: 24 }, (_, index) => {
          const pulse = (1 - Math.cos((index / 24) * Math.PI * 2)) / 2;
          const scale = 1 - pulse * 0.12;
          context.clearRect(0, 0, 64, 64);
          context.save();
          context.translate(32, 32);
          context.rotate((-pulse * Math.PI) / 30);
          context.scale(scale, scale);
          context.drawImage(logo, -32, -32, 64, 64);
          context.restore();
          return canvas.toDataURL("image/png");
        });
        sync();
      } catch {
        // Keep the SVG favicon if the browser blocks canvas image export.
        frames = [];
        restore();
      }
    };

    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    logo.src = icon.href;

    return () => {
      logo.onload = null;
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      restore();
    };
  }, []);

  return null;
}
