"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#coverage", label: "COVERAGE" },
  { href: "#platform", label: "SODHAK-RT" },
  { href: "#method", label: "METHOD" },
  { href: "#proof", label: "PROOF" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        <Logo size={32} id="nav-rb" />
        <span className="brand-name">SODHAK</span>
        <span className="brand-badge">RT/26</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <div id="site-menu" className={`nav-links${open ? " open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-accent btn-sm"
          onClick={() => setOpen(false)}
        >
          BOOK A RED TEAM
        </a>
      </div>
    </nav>
  );
}
