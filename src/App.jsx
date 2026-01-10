const services = [
  {
    title: "Model Firewall",
    description:
      "Shield LLMs and agent workflows from prompt injection, data exfiltration, and tool misuse with policy-enforced gateways.",
    tag: "Pre-deploy",
  },
  {
    title: "Red Team Ops",
    description:
      "Adversarial testing, jailbreak simulations, and multi-lingual attack suites mapped to your product surface.",
    tag: "Quarterly",
  },
  {
    title: "Secure Retrieval",
    description:
      "Harden RAG stacks with vector access control, provenance scoring, and live contamination scans.",
    tag: "Always on",
  },
  {
    title: "Agent Guardrails",
    description:
      "Policy-aware orchestration for tool calls, identity scopes, and high-risk automation triggers.",
    tag: "Runtime",
  },
  {
    title: "Regulatory Readiness",
    description:
      "AI Act and SOC2 evidence packs with continuous control monitoring and board-ready reporting.",
    tag: "Compliance",
  },
  {
    title: "Incident Response",
    description:
      "Live containment playbooks for model drift, exploit spikes, and data leakage events.",
    tag: "On-call",
  },
];

const approach = [
  {
    step: "01",
    title: "Map the attack surface",
    detail:
      "Inventory models, prompts, connectors, and human-in-the-loop flows to quantify risk exposure.",
  },
  {
    step: "02",
    title: "Break it with intent",
    detail:
      "Run curated adversarial suites and custom red teaming to expose the weakest points fast.",
  },
  {
    step: "03",
    title: "Harden and monitor",
    detail:
      "Deploy guardrails, policy engines, and telemetry for continuous defense in production.",
  },
  {
    step: "04",
    title: "Prove compliance",
    detail:
      "Deliver executive reports, audit trails, and response workflows that satisfy regulators.",
  },
];

const caseStudies = [
  {
    title: "Fintech copilots",
    result: "Stopped 93% of injection attempts in week one.",
    detail:
      "Layered prompt firewalls and transaction-level approvals for 18 tool-integrated agents.",
  },
  {
    title: "Healthcare summarization",
    result: "Reduced hallucination risk by 68%.",
    detail:
      "Validated sources with provenance scoring and PHI-safe retrieval filters.",
  },
];

const intel = [
  {
    label: "Active probes",
    value: "2.4M",
    detail: "Monthly automated attempts across customer systems.",
  },
  {
    label: "Median containment",
    value: "27m",
    detail: "From detection to response playbook execution.",
  },
  {
    label: "Risk coverage",
    value: "94%",
    detail: "Threat scenarios mapped to control owners.",
  },
];

const testimonials = [
  {
    quote:
      "Sodhak made our AI launch board-ready in six weeks. The team felt like a full security org overnight.",
    name: "CISO, Global Logistics",
  },
  {
    quote:
      "Their red team exposed risks we did not know existed and shipped fixes without slowing our roadmap.",
    name: "VP Product, Enterprise SaaS",
  },
];

const riskSignals = [
  { label: "Prompt injection", score: "92", tone: "critical" },
  { label: "Data leakage", score: "78", tone: "high" },
  { label: "Tool misuse", score: "64", tone: "medium" },
];

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="logo">Sodhak AI</div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#intel">Intel</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">
          Schedule Audit
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="pill">AI Security Studio</span>
          <h1>
            Security for AI-first teams that refuse to ship blind.
          </h1>
          <p className="lead">
            Sodhak AI protects model-driven products with continuous red teaming,
            hardened RAG systems, and rapid-response playbooks designed for high-risk
            deployments.
          </p>
          <div className="hero-actions">
            <button className="primary" type="button">
              Book a risk review
            </button>
            <button className="ghost" type="button">
              View the playbook
            </button>
          </div>
          <div className="metrics">
            <div>
              <h3>120+</h3>
              <p>Models hardened</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Incident response</p>
            </div>
            <div>
              <h3>48 hrs</h3>
              <p>Average hardening sprint</p>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-card">
            <div className="panel-header">
              <div>
                <p className="panel-title">Live risk map</p>
                <span className="panel-subtitle">Global model telemetry</span>
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
              <span className="signal">+18% anomaly spike</span>
              <span className="signal muted">Updated 12 mins ago</span>
            </div>
          </div>

          <div className="panel-card alt">
            <h4>Threat intel pulse</h4>
            <p>
              We blend adversarial research, human red teams, and real-time
              telemetry to deliver a defense loop tailored to your AI stack.
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

      <section className="trusted">
        <p>Trusted by fast-moving teams in fintech, healthcare, logistics, and defense.</p>
        <div className="trusted-row">
          <span>Arcadia Labs</span>
          <span>Evervault Core</span>
          <span>Northwind AI</span>
          <span>Atlas Signal</span>
          <span>Kepler Trust</span>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <div>
            <h2>Security services that move at product speed.</h2>
            <p>
              From launch readiness to continuous protection, we embed alongside
              your engineering team and secure the full AI lifecycle.
            </p>
          </div>
          <button className="ghost" type="button">
            Download capability deck
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
      </section>

      <section id="approach" className="section split">
        <div>
          <h2>Our security loop is built for AI velocity.</h2>
          <p>
            Sodhak AI combines technical depth with operational rigor, so your
            teams ship safer models without slowing down.
          </p>
          <div className="cta-card">
            <h3>Security sprint in 48 hours.</h3>
            <p>
              We deploy a focused assessment team, deliver a prioritized fix list,
              and ship guardrails alongside your engineers.
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

      <section id="intel" className="section">
        <div className="section-heading">
          <div>
            <h2>Threat intel that keeps pace with modern AI risk.</h2>
            <p>
              Our researchers track jailbreaks, supply-chain compromise, and
              policy evasion to keep your defenses current.
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
      </section>

      <section className="section cases">
        <div className="section-heading">
          <div>
            <h2>Case studies from real deployments.</h2>
            <p>
              We turn security gaps into product momentum across sensitive AI use
              cases.
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
      </section>

      <section className="section testimonials">
        <div className="section-heading">
          <div>
            <h2>Leaders trust Sodhak to secure the frontier.</h2>
            <p>
              Embedded collaboration, measurable risk reduction, and faster AI
              adoption.
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
      </section>

      <section id="contact" className="section contact">
        <div className="contact-info">
          <span className="pill">Start secure</span>
          <h2>Talk to the team that secures AI at scale.</h2>
          <p>
            We respond within 24 hours with an assessment plan and a tailored
            scope. Prefer email? Reach us at <strong>hello@sodhakai.com</strong>.
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
              <p>AI security, compliance, incident response</p>
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
            What are you securing?
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your AI product and timeline."
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

      <footer className="footer">
        <div>
          <h3>Sodhak AI</h3>
          <p>Security for AI systems that power your business.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Company</span>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <span>Resources</span>
            <a href="#intel">Threat intel</a>
            <a href="#">Trust center</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
