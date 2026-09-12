import Bot3D from "../components/Bot3D";
import ContactForm from "../components/ContactForm";
import Hero3D from "../components/Hero3D";
import Logo from "../components/Logo";
import Nav from "../components/Nav";

const ACCENT = "#ff5540";

const tickerItems = [
  "PROMPT INJECTION",
  "JAILBREAK",
  "RAG EXFILTRATION",
  "TOOL ABUSE",
  "POLICY EVASION",
  "DATA POISONING",
  "PRIVILEGE ESCALATION",
  "MULTILINGUAL BYPASS",
  "ROLE CONFUSION",
  "INDIRECT INJECTION",
];

const stats = [
  { value: "120+", label: "MODELS TESTED" },
  { value: "5 DAYS", label: "MEDIAN SPRINT" },
  { value: "620+", label: "ATTACK SUITES" },
  { value: "88%", label: "COVERAGE UPLIFT", accent: true },
];

const coverage = [
  {
    idx: "001",
    tag: "CORE",
    title: "Prompt injection & jailbreaks",
    body: "System-prompt overrides, policy bypass paths, and adaptive multi-turn attacks against your guardrails.",
  },
  {
    idx: "002",
    tag: "RAG",
    title: "Retrieval exfiltration",
    body: "Leakage probes, source poisoning, and unauthorized extraction across your retrieval pipeline.",
  },
  {
    idx: "003",
    tag: "AGENTS",
    title: "Tool abuse & escalation",
    body: "Agent tool misuse, privilege escalation, and unsafe automation chains simulated end to end.",
  },
  {
    idx: "004",
    tag: "GLOBAL",
    title: "Multilingual attacks",
    body: "Cross-lingual jailbreak suites and region-specific threat patterns your English-only evals miss.",
  },
  {
    idx: "005",
    tag: "SAFETY",
    title: "Policy evasion",
    body: "Stress safety layers with adversarial strategies that adapt turn by turn.",
  },
  {
    idx: "006",
    tag: "BESPOKE",
    title: "Custom attack design",
    body: "Exploits built for your domain, data, and product surface — not a generic benchmark.",
  },
];

const platform = [
  {
    idx: "LIB",
    title: "Attack suite library",
    body: "620+ curated jailbreaks, injections, and exfiltration tests, refreshed weekly.",
  },
  {
    idx: "ORC",
    title: "Scenario orchestrator",
    body: "Multi-turn, tool-aware attacks with guardrail variations and role-based prompts.",
  },
  {
    idx: "CON",
    title: "Findings console",
    body: "Severity scoring, evidence capture, and remediation guidance in one workspace.",
  },
  {
    idx: "RTS",
    title: "Retest automation",
    body: "Targeted retests, delta comparison, and fix verification across releases.",
  },
];

const steps = [
  {
    num: "01",
    title: "Scope the surface",
    body: "Catalog prompts, tools, data sources, and user journeys to define realistic attack paths.",
  },
  {
    num: "02",
    title: "Design the suites",
    body: "Curate from our library and craft bespoke attack prompts for your product.",
  },
  {
    num: "03",
    title: "Run the sprint",
    body: "Automated fuzzing plus human adversaries to find critical failures fast.",
  },
  {
    num: "04",
    title: "Fix and retest",
    body: "Prioritized findings, mitigation guidance, and retest validation before you ship.",
  },
];

const proof = [
  {
    label: "FINTECH COPILOT",
    headline: "47 critical paths",
    body: "Jailbreak and tool-abuse routes across payments and CRM workflows, mapped and retest-verified in 5 days.",
  },
  {
    label: "HEALTHCARE RAG",
    headline: "PHI leak in 72h",
    body: "Simulated extraction attacks surfaced PHI leakage in RAG summaries, with mitigations delivered the same week.",
  },
];

function SectionHeading({ index, children, className = "" }) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <span className="section-index">/{index}</span>
      <h2>{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page" id="top">
      <div className="scanlines" aria-hidden="true" />
      <div className="scanbeam" aria-hidden="true" />

      <Nav />

      <header className="hero">
        <div className="hero-scene">
          <Hero3D accent={ACCENT} />
        </div>
        <div className="hero-vignette" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-kicker">[ ADVERSARIAL TESTING FOR LLM PRODUCTS ]</div>
          <h1 className="hero-title">
            Break your AI
            <br />
            before someone
            <br />
            <span className="accent">else does.</span>
          </h1>
          <p className="hero-lead">
            Human adversaries + automated attack suites against your prompts,
            tools, and retrieval stack. A prioritized, retested fix list in days
            — not quarters.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-accent btn-lg btn-glow">
              Scope an engagement
            </a>
            <a href="#proof" className="btn btn-outline btn-lg">
              Read a sample report
            </a>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className={`stat-value${stat.accent ? " accent" : ""}`}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) =>
            tickerItems.map((item) => (
              <span key={`${copy}-${item}`} className="ticker-item">
                {item}
                <span className="ticker-sep">▸</span>
              </span>
            ))
          )}
        </div>
      </div>

      <main>
        <section id="coverage" className="section section-coverage">
          <SectionHeading index="01">
            Coverage that mirrors
            <br />
            your product surface.
          </SectionHeading>
          <p className="section-lead indent">
            Not a generic benchmark. We attack the exact prompts, tools, and
            retrieval paths your users touch.
          </p>
          <div className="coverage-list">
            {coverage.map((item) => (
              <div key={item.idx} className="coverage-row">
                <span className="coverage-idx">{item.idx}</span>
                <h3 className="coverage-title">{item.title}</h3>
                <p className="coverage-body">{item.body}</p>
                <span className="coverage-tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="platform" className="section">
          <div className="platform-panel">
            <div className="platform-watermark" aria-hidden="true">
              RT
            </div>
            <SectionHeading index="02" className="section-heading-sm">
              Sodhak-RT. The engine behind every engagement.
            </SectionHeading>
            <p className="platform-lead indent">
              Orchestrates multi-turn attacks, captures evidence, scores
              severity, and drives automated retests — so fixes get verified,
              not assumed.
            </p>
            <div className="platform-grid indent">
              {platform.map((item) => (
                <div key={item.idx} className="platform-cell">
                  <div className="platform-idx">{item.idx}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn btn-accent-outline platform-cta">
              See a 30-min live demo →
            </a>
          </div>
        </section>

        <section id="method" className="section">
          <SectionHeading index="03">Five days. Four moves.</SectionHeading>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.num} className="step">
                <div className="step-num">{step.num}</div>
                <div className="step-rule" />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="proof" className="section">
          <SectionHeading index="04">
            Findings that changed launch decisions.
          </SectionHeading>
          <div className="proof-grid">
            {proof.map((item) => (
              <div key={item.label} className="proof-card">
                <div className="proof-bar" aria-hidden="true" />
                <div className="proof-label">{item.label}</div>
                <div className="proof-headline">{item.headline}</div>
                <p>{item.body}</p>
              </div>
            ))}
            <figure className="proof-card proof-quote">
              <blockquote>
                “Sodhak's red team revealed blind spots our internal tests
                missed. The report was actionable within days.”
              </blockquote>
              <figcaption>HEAD OF AI · LOGISTICS TECH</figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <h2>Get a scoped red-team plan in 24 hours.</h2>
              <p>
                Tell us what ships next. We reply with scope, timeline, and
                pricing — NDA first. Or email{" "}
                <a href="mailto:hello@sodhakai.com">hello@sodhakai.com</a>.
              </p>
              <div className="contact-meta">
                <span>HQ · SAN FRANCISCO</span>
                <span>NA · EU · APAC</span>
              </div>
              <div className="contact-bot">
                <Bot3D />
                <div className="contact-bot-status">
                  SDK-BOT · SEEKER UNIT
                  <br />
                  <span className="online">● ONLINE</span> — probing since 2024
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-row">
          <div className="footer-brand">
            <Logo size={20} id="footer-rb" />
            <span>SODHAK · © 2026</span>
          </div>
          <div className="footer-links">
            <a href="#coverage">COVERAGE</a>
            <a href="#platform">SODHAK-RT</a>
            <a href="#method">METHOD</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
