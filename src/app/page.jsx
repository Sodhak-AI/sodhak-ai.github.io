"use client";

import { useEffect, useState } from "react";

const services = [
  {
    title: "Prompt Injection & Jailbreaks",
    description:
      "Attack prompts, system overrides, and policy bypass paths to expose unsafe model behavior before launch.",
    tag: "Core",
  },
  {
    title: "RAG Data Exfiltration",
    description:
      "Probe retrieval pipelines for leakage, source poisoning, and unauthorized data extraction.",
    tag: "RAG",
  },
  {
    title: "Tool Abuse Scenarios",
    description:
      "Simulate agent tool misuse, privilege escalation, and unsafe automation chains.",
    tag: "Agents",
  },
  {
    title: "Policy Evasion",
    description:
      "Stress safety layers with adaptive, multi-turn adversarial strategies.",
    tag: "Safety",
  },
  {
    title: "Multilingual Attacks",
    description:
      "Run cross-lingual jailbreak suites and region-specific threat patterns.",
    tag: "Global",
  },
  {
    title: "Custom Attack Design",
    description:
      "Build bespoke exploits matched to your domain, data, and product surface.",
    tag: "Bespoke",
  },
];

const productFeatures = [
  {
    title: "Attack Suite Library",
    description:
      "600+ curated jailbreaks, injections, and data exfiltration tests refreshed weekly.",
  },
  {
    title: "Scenario Orchestrator",
    description:
      "Run multi-turn, tool-aware attacks with guardrail variations and role-based prompts.",
  },
  {
    title: "Findings Console",
    description:
      "Severity scoring, evidence capture, and remediation guidance in one workspace.",
  },
  {
    title: "Retest Automation",
    description:
      "Trigger targeted retests, compare deltas, and verify fixes across releases.",
  },
];

const approach = [
  {
    step: "01",
    title: "Scope the model surface",
    detail:
      "Catalog prompts, tools, data sources, and user journeys to define realistic attack paths.",
  },
  {
    step: "02",
    title: "Design adversarial suites",
    detail:
      "Curate tests from our jailbreak library and craft bespoke attack prompts.",
  },
  {
    step: "03",
    title: "Execute red team sprints",
    detail:
      "Combine automated fuzzing with human adversaries to find critical failures fast.",
  },
  {
    step: "04",
    title: "Deliver fixes and retest",
    detail:
      "Provide prioritized findings, mitigation guidance, and retest validation.",
  },
];

const caseStudies = [
  {
    title: "Fintech copilots",
    result: "Found 47 critical jailbreak paths in 5 days.",
    detail:
      "Mapped tool abuse routes across payments and CRM workflows and delivered a retest-ready fix list.",
  },
  {
    title: "Healthcare summarization",
    result: "Uncovered PHI leakage in 72 hours.",
    detail:
      "Simulated data extraction attacks against RAG summaries and mapped mitigation steps.",
  },
];

const intel = [
  {
    label: "Attack suites",
    value: "620+",
    detail: "Curated jailbreak, injection, and data exfiltration tests.",
  },
  {
    label: "Median retest",
    value: "6 days",
    detail: "From initial findings to verified fixes.",
  },
  {
    label: "Coverage uplift",
    value: "88%",
    detail: "New failures mapped to mitigations.",
  },
];

const testimonials = [
  {
    quote:
      "Sodhak ran a red team that revealed blind spots our internal tests missed. The report was actionable within days.",
    name: "Head of AI, Logistics Tech",
  },
  {
    quote:
      "They validated fixes and re-tested fast, so we could ship without guessing.",
    name: "Security Lead, Enterprise SaaS",
  },
];

const riskSignals = [
  { label: "Injection vectors", score: "92", tone: "critical" },
  { label: "Policy bypass", score: "78", tone: "high" },
  { label: "Tool abuse", score: "64", tone: "medium" },
];

const navLinks = [
  { id: "services", label: "Coverage" },
  { id: "product", label: "Product" },
  { id: "approach", label: "Method" },
  { id: "intel", label: "Intel" },
  { id: "contact", label: "Contact" },
];

const attackTypes = [
  "Prompt Injection",
  "Jailbreak",
  "RAG Exfiltration",
  "Tool Abuse",
  "Policy Evasion",
  "Data Poisoning",
  "Privilege Escalation",
  "Multilingual Bypass",
  "Role Confusion",
  "Indirect Injection",
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const totalFeatures = productFeatures.length;
  const showNextFeature = () =>
    setActiveFeature((c) => (c + 1) % totalFeatures);
  const showPrevFeature = () =>
    setActiveFeature((c) => (c === 0 ? totalFeatures - 1 : c - 1));

  const getStackOffset = (index) => {
    const rawOffset = index - activeFeature;
    const half = Math.floor(totalFeatures / 2);
    if (rawOffset > half) return rawOffset - totalFeatures;
    if (rawOffset < -half) return rawOffset + totalFeatures;
    return rawOffset;
  };

  const getStackStyle = (offset) => {
    const abs = Math.abs(offset);
    if (abs > 2) {
      return {
        opacity: 0,
        pointerEvents: "none",
        transform: "translateX(0px) translateZ(-360px) scale(0.6)",
      };
    }
    return {
      transform: `translateX(${offset * 180}px) translateZ(${-abs * 120}px) rotateY(${offset * -12}deg) scale(${1 - abs * 0.08})`,
      opacity: abs === 2 ? 0.4 : abs === 1 ? 0.85 : 1,
      zIndex: 10 - abs,
      filter: abs === 2 ? "blur(1.5px)" : "none",
      pointerEvents: abs === 0 ? "auto" : "none",
    };
  };

  return (
    <div className="page">
      {/* Ambient glow blobs */}
      <div className="glow glow-1" aria-hidden="true" />
      <div className="glow glow-2" aria-hidden="true" />

      {/* ── NAV ── */}
      <header className={`nav${isScrolled ? " nav--scrolled" : ""}`}>
        <div className="container nav-inner">
          <div className="logo">Sodhak AI</div>

          <nav
            className={`nav-links${isMenuOpen ? " open" : ""}`}
            aria-label="Site sections"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={activeSection === link.id ? "active" : ""}
                type="button"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="nav-cta"
            type="button"
            onClick={() => scrollTo("contact")}
          >
            Schedule Red Team
          </button>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true">{isMenuOpen ? "✕" : "≡"}</span>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <button
          className="nav-scrim"
          type="button"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-content">
              <span className="pill">LLM Red Teaming</span>
              <h1>
                Red teaming for LLM products that cannot afford surprises.
              </h1>
              <p className="lead">
                Sodhak AI runs adversarial LLM red teams powered by Sodhak-RT,
                our testing platform, to uncover jailbreaks, data leakage, and
                unsafe tool behavior before you ship.
              </p>
              <div className="hero-actions">
                <button
                  className="primary"
                  type="button"
                  onClick={() => scrollTo("contact")}
                >
                  Book a red team
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => scrollTo("services")}
                >
                  See sample report
                </button>
              </div>
              <div className="metrics">
                <div>
                  <h3>120+</h3>
                  <p>LLMs tested</p>
                </div>
                <div>
                  <h3>3-10 days</h3>
                  <p>Typical engagement</p>
                </div>
                <div>
                  <h3>4x</h3>
                  <p>Retest loops per cycle</p>
                </div>
              </div>
            </div>

            <div className="hero-panel">
              <div className="panel-card">
                <div className="panel-header">
                  <div>
                    <p className="panel-title">Red team findings</p>
                    <span className="panel-subtitle">
                      Last 7 days of attack runs
                    </span>
                  </div>
                  <span className="live-dot">
                    <span className="live-ring" />
                    Live
                  </span>
                </div>
                <ul className="risk-list">
                  {riskSignals.map((item) => (
                    <li key={item.label} className="risk-row">
                      <span className={`risk-pill ${item.tone}`}>
                        {item.label}
                      </span>
                      <div className="risk-bar-wrap">
                        <div
                          className={`risk-bar risk-bar--${item.tone}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="risk-score">{item.score}</span>
                    </li>
                  ))}
                </ul>
                <div className="panel-footer">
                  <span className="signal">&#8679; 18 new findings</span>
                  <span className="signal muted">Updated 12 mins ago</span>
                </div>
              </div>

              <div className="panel-card alt">
                <div className="alt-header">
                  <h4>Adversarial pulse</h4>
                  <span className="alt-badge">Active</span>
                </div>
                <p>
                  Human red teams + automated attack suites pressure-testing
                  your LLM product surface around the clock.
                </p>
                <div className="mini-grid">
                  {intel.map((item, i) => (
                    <div key={item.label} className={`mini-card mini-card--${i}`}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker-track">
            {[...attackTypes, ...attackTypes].map((type, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-dot" />
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section id="services" className="section section--alt">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>Red team coverage that mirrors your product surface.</h2>
                <p>
                  We attack prompts, tools, and retrieval systems to uncover
                  failures before launch.
                </p>
              </div>
              <button className="ghost" type="button">
                Download sample report
              </button>
            </div>
            <div className="cards">
              {services.map((service) => (
                <div key={service.title} className="card">
                  <span className="tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>

            <div className="cases">
              <div className="section-heading subsection-heading">
                <div>
                  <h2>Case studies from red team engagements.</h2>
                  <p>
                    We turn exposure into action across sensitive AI use cases.
                  </p>
                </div>
              </div>
              <div className="cases-grid">
                {caseStudies.map((item) => (
                  <div key={item.title} className="case-card">
                    <h3>{item.title}</h3>
                    <p className="result">{item.result}</p>
                    <p>{item.detail}</p>
                    <button className="ghost" type="button">
                      View report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT ── */}
        <section id="product" className="section">
          <div className="container split">
            <div>
              <h2>Sodhak-RT, the red teaming engine.</h2>
              <p>
                Our product orchestrates attack suites, captures evidence, and
                tracks retests so engagements move faster and ship with
                confidence.
              </p>
              <div className="cta-card">
                <h3>Live demo in 30 minutes.</h3>
                <p>
                  See how Sodhak-RT runs multi-turn attacks and exports findings
                  to your workflow.
                </p>
                <button className="primary" type="button">
                  Request demo
                </button>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-stack-wrap">
                <div className="product-stack" aria-live="polite">
                  {productFeatures.map((feature, index) => {
                    const offset = getStackOffset(index);
                    return (
                      <div
                        key={feature.title}
                        className="card stack-card"
                        style={getStackStyle(offset)}
                        aria-hidden={offset !== 0}
                      >
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="stack-controls">
                  <button
                    className="stack-arrow"
                    type="button"
                    onClick={showPrevFeature}
                    aria-label="Previous feature"
                  >
                    ‹
                  </button>
                  <span className="stack-count">
                    {activeFeature + 1}/{totalFeatures}
                  </span>
                  <button
                    className="stack-arrow"
                    type="button"
                    onClick={showNextFeature}
                    aria-label="Next feature"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPROACH ── */}
        <section id="approach" className="section section--alt">
          <div className="container split">
            <div>
              <h2>Our red team loop is built for AI velocity.</h2>
              <p>
                Sodhak AI blends human adversaries and automation to deliver
                fast, repeatable testing cycles.
              </p>
              <div className="cta-card">
                <h3>Red team sprint in 5 days.</h3>
                <p>
                  We deploy an embedded team, deliver a prioritized fix list,
                  and validate remediation with retesting.
                </p>
                <button className="primary" type="button">
                  Start a sprint
                </button>
              </div>
            </div>
            <div className="timeline">
              {approach.map((item) => (
                <div key={item.step} className="timeline-item">
                  <span className="step">{item.step}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEL ── */}
        <section id="intel" className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>Adversarial intel that stays ahead of jailbreaks.</h2>
                <p>
                  We track emerging attack patterns and refresh our suites every
                  week.
                </p>
              </div>
            </div>
            <div className="intel-grid">
              {intel.map((item) => (
                <div key={item.label} className="intel-card">
                  <span>{item.label}</span>
                  <h3>{item.value}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="testimonials">
              <div className="section-heading subsection-heading">
                <div>
                  <h2>Teams trust Sodhak for LLM red teaming.</h2>
                  <p>
                    Embedded collaboration, measurable risk reduction, and
                    faster AI launches.
                  </p>
                </div>
              </div>
              <div className="testimonial-grid">
                {testimonials.map((item) => (
                  <div key={item.name} className="testimonial-card">
                    <p className="quote">"{item.quote}"</p>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section section--alt">
          <div className="container contact">
            <div className="contact-info">
              <span className="pill">Start red teaming</span>
              <h2>Talk to the LLM red team.</h2>
              <p>
                We respond within 24 hours with a scoped red team plan and
                timeline. Prefer email? Reach us at{" "}
                <strong>hello@sodhakai.com</strong>.
              </p>
              <div className="contact-list">
                <div>
                  <h4>HQ</h4>
                  <p>San Francisco, CA</p>
                </div>
                <div>
                  <h4>Coverage</h4>
                  <p>North America, Europe, APAC</p>
                </div>
                <div>
                  <h4>Focus</h4>
                  <p>
                    LLM red teaming, adversarial testing, Sodhak-RT platform
                  </p>
                </div>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-row">
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Carter"
                    required
                  />
                </label>
                <label>
                  Work email
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                  />
                </label>
              </div>
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                />
              </label>
              <label>
                What should we red-team?
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your LLM product, tools, and timeline."
                  required
                />
              </label>
              <div className="form-footer">
                <span>We will share an NDA before any deep-dive.</span>
                <button className="primary" type="submit">
                  Send request
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="logo">Sodhak AI</div>
            <p>LLM red teaming for AI systems that ship with confidence.</p>
          </div>
          <nav aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
