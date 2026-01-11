import { useEffect, useRef, useState } from "react";
import productImage1 from "../img/image1.png";
import productImage2 from "../img/image2.png";
import productImage3 from "../img/image3.png";
import productImage4 from "../img/image4.png";

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

const productImages = [
  {
    src: productImage1,
    alt: "Sodhak-RT interface screen 1",
  },
  {
    src: productImage2,
    alt: "Sodhak-RT interface screen 2",
  },
  {
    src: productImage3,
    alt: "Sodhak-RT interface screen 3",
  },
  {
    src: productImage4,
    alt: "Sodhak-RT interface screen 4",
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

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "product", label: "Product" },
  { id: "services", label: "Coverage" },
  { id: "approach", label: "Method" },
  { id: "intel", label: "Intel" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const cardsRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const getHashTab = () => {
      const hash = window.location.hash.replace("#", "");
      return tabs.some((tab) => tab.id === hash) ? hash : null;
    };

    const hashTab = getHashTab();
    if (hashTab) {
      setActiveTab(hashTab);
    }

    const onHashChange = () => {
      const nextTab = getHashTab();
      if (nextTab) {
        setActiveTab(nextTab);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const updateHeights = () => {
      const root = document.documentElement;
      if (navRef.current) {
        root.style.setProperty(
          "--nav-height",
          `${navRef.current.offsetHeight}px`
        );
      }
      if (footerRef.current) {
        root.style.setProperty(
          "--footer-height",
          `${footerRef.current.offsetHeight}px`
        );
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const activateTab = (tabId) => {
    setActiveTab(tabId);
    if (window.location.hash !== `#${tabId}`) {
      window.location.hash = tabId;
    }
  };

  const scrollShelves = () => {
    const targets = [cardsRef.current, galleryRef.current].filter(Boolean);
    targets.forEach((target) => {
      const distance = Math.max(target.clientWidth * 0.8, 240);
      target.scrollBy({ left: distance, behavior: "smooth" });
    });
  };

  return (
    <div className="page">
      <header className="nav" ref={navRef}>
        <div className="logo">Sodhak AI</div>
        <nav className="nav-links" role="tablist" aria-label="Site sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={activeTab === tab.id ? "active" : ""}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              onClick={() => activateTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          className="nav-cta"
          type="button"
          onClick={() => activateTab("contact")}
        >
          Schedule Red Team
        </button>
      </header>

      <main className="main">
        <section
          className="hero tab-panel"
          id="tab-panel-overview"
          role="tabpanel"
          aria-labelledby="tab-overview"
          hidden={activeTab !== "overview"}
        >
          <div className="hero-content">
            <span className="pill">LLM Red Teaming</span>
            <h1>Red teaming for LLM products that cannot afford surprises.</h1>
            <p className="lead">
              Sodhak AI runs adversarial LLM red teams powered by Sodhak-RT, our
              testing platform, to uncover jailbreaks, data leakage, and unsafe
              tool behavior before you ship.
            </p>
            <div className="hero-actions">
              <button
                className="primary"
                type="button"
                onClick={() => activateTab("contact")}
              >
                Book a red team
              </button>
              <button
                className="ghost"
                type="button"
                onClick={() => activateTab("services")}
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
                  <span className="panel-subtitle">Last 7 days of attack runs</span>
                </div>
                <span className="live-dot">Live</span>
              </div>
              <ul className="risk-list">
                {riskSignals.map((item) => (
                  <li key={item.label} className="risk-row">
                    <span className={`risk-pill ${item.tone}`}>{item.label}</span>
                    <span className="risk-score">{item.score}</span>
                  </li>
                ))}
              </ul>
              <div className="panel-footer">
                <span className="signal">+18 new findings</span>
                <span className="signal muted">Updated 12 mins ago</span>
              </div>
            </div>

            <div className="panel-card alt">
              <h4>Adversarial pulse</h4>
              <p>
                We combine human red teams with automated attack suites to
                pressure-test your LLM product surface.
              </p>
              <div className="mini-grid">
                {intel.map((item) => (
                  <div key={item.label} className="mini-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="tab-panel-product"
          className="section split tab-panel"
          role="tabpanel"
          aria-labelledby="tab-product"
          hidden={activeTab !== "product"}
        >
          <div>
            <h2>Sodhak-RT, the red teaming engine.</h2>
            <p>
              Our product orchestrates attack suites, captures evidence, and
              tracks retests so engagements move faster and ship with confidence.
            </p>
            <div className="cta-card">
              <h3>Live demo in 30 minutes.</h3>
              <p>
                See how Sodhak-RT runs multi-turn attacks and exports findings to
                your workflow.
              </p>
              <button className="primary" type="button">
                Request demo
              </button>
            </div>
          </div>
          <div className="product-showcase">
            <button
              className="shelf-arrow"
              type="button"
              onClick={scrollShelves}
              aria-label="Scroll product shelves"
            >
              &gt;
            </button>
            <div className="cards" ref={cardsRef}>
              {productFeatures.map((feature) => (
                <div key={feature.title} className="card">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="product-gallery" ref={galleryRef}>
              {productImages.map((image) => (
                <div key={image.src} className="product-image">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tab-panel-services"
          className="tab-panel tab-stack"
          role="tabpanel"
          aria-labelledby="tab-services"
          hidden={activeTab !== "services"}
        >
          <div className="section">
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
          </div>

          <div className="section cases">
            <div className="section-heading">
              <div>
                <h2>Case studies from red team engagements.</h2>
                <p>We turn exposure into action across sensitive AI use cases.</p>
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
        </section>

        <section
          id="tab-panel-approach"
          className="section split tab-panel"
          role="tabpanel"
          aria-labelledby="tab-approach"
          hidden={activeTab !== "approach"}
        >
          <div>
            <h2>Our red team loop is built for AI velocity.</h2>
            <p>
              Sodhak AI blends human adversaries and automation to deliver fast,
              repeatable testing cycles.
            </p>
            <div className="cta-card">
              <h3>Red team sprint in 5 days.</h3>
              <p>
                We deploy an embedded team, deliver a prioritized fix list, and
                validate remediation with retesting.
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
        </section>

        <section
          id="tab-panel-intel"
          className="tab-panel tab-stack"
          role="tabpanel"
          aria-labelledby="tab-intel"
          hidden={activeTab !== "intel"}
        >
          <div className="section">
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
          </div>

          <div className="section testimonials">
            <div className="section-heading">
              <div>
                <h2>Teams trust Sodhak for LLM red teaming.</h2>
                <p>
                  Embedded collaboration, measurable risk reduction, and faster
                  AI launches.
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
        </section>

        <section
          id="tab-panel-contact"
          className="section contact tab-panel"
          role="tabpanel"
          aria-labelledby="tab-contact"
          hidden={activeTab !== "contact"}
        >
          <div className="contact-info">
            <span className="pill">Start red teaming</span>
            <h2>Talk to the LLM red team.</h2>
            <p>
              We respond within 24 hours with a scoped red team plan and
              timeline. Prefer email? Reach us at <strong>hello@sodhakai.com</strong>.
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
                <p>LLM red teaming, adversarial testing, Sodhak-RT platform</p>
              </div>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="form-row">
              <label>
                Full name
                <input type="text" name="name" placeholder="Jane Carter" required />
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
              <input type="text" name="company" placeholder="Company name" />
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
        </section>
      </main>

      <footer className="footer" ref={footerRef}>
        <div>
          <h3>Sodhak AI</h3>
          <p>LLM red teaming for AI systems that ship with confidence.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Company</span>
            <button type="button" onClick={() => activateTab("services")}>
              Coverage
            </button>
            <button type="button" onClick={() => activateTab("approach")}>
              Method
            </button>
            <button type="button" onClick={() => activateTab("contact")}>
              Contact
            </button>
          </div>
          <div>
            <span>Resources</span>
            <button type="button" onClick={() => activateTab("intel")}>
              Adversarial intel
            </button>
            <button type="button" onClick={() => activateTab("product")}>
              Sodhak-RT
            </button>
            <button type="button">Careers</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
