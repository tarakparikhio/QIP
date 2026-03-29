import Link from "next/link";
import { LearningModeSummary } from "@/components/learning-mode";
import { QuantumCoinFlip } from "@/components/quantum-coin-flip";
import { FeaturedPaths } from "@/components/featured-paths";
import { getLessonById, getLessonMetrics, getLessons } from "@/lib/lessons";

export default function HomePage() {
  const lessons = getLessons();
  const metrics = getLessonMetrics(lessons);

  const startLesson = getLessonById(1);
  const sampleLesson = getLessonById(6);
  const advancedLesson = getLessonById(26);
  const atlasHref = "/lessons";

  const stageCards = [
    {
      title: "Foundation",
      count: metrics.foundation,
      description:
        "Build intuition first, then anchor it in qubits, superposition, measurement, and core control ideas.",
    },
    {
      title: "Intermediate",
      count: metrics.intermediate,
      description:
        "Move into operators, Hamiltonians, channels, multi-qubit structure, and the mechanics behind circuits.",
    },
    {
      title: "Advanced",
      count: metrics.advanced,
      description:
        "Climb into QFT, phase estimation, optimization algorithms, annealing, and spectral viewpoints.",
    },
  ];

  const guidedPaths = [
    {
      label: "Start Learning",
      title: "Begin from zero",
      description:
        "Follow the lessons in order if you want the cleanest path from intuition to advanced algorithms.",
      href: startLesson ? `/lessons/${startLesson.slug}` : atlasHref,
    },
    {
      label: "Preview Mode",
      title: "Sample the teaching style",
      description:
        "Open a representative lesson first if you want a quick sense of how the platform explains concepts before committing to the full arc.",
      href: sampleLesson ? `/lessons/${sampleLesson.slug}` : atlasHref,
    },
    {
      label: "Advanced Route",
      title: "Jump to algorithmic depth",
      description:
        "If you already know the basics, move directly into the advanced sequence and use prerequisites as your backtrack map.",
      href: advancedLesson ? `/lessons/${advancedLesson.slug}` : atlasHref,
    },
    {
      label: "Engineer Bridge",
      title: "Start from software intuition",
      description:
        "Use the translator section to connect control flow, state, and debugging instincts to quantum mechanics before diving into the full atlas.",
      href: "#translator-layer",
    },
  ];

  return (
    <main className="page-shell" id="top">
      <section className="hero-panel homepage-hero">
        <div className="hero-copy">
          <p className="eyebrow">Quantum computing for software minds</p>
          <h2>Understand the ideas before the notation overwhelms them.</h2>
          <p>
            QCML teaches quantum computing as a structured progression: start
            with intuition, then tighten each concept through mathematics,
            physics, and formal quantum mechanics.
          </p>
          <div className="hero-actions">
            <Link
              className="primary-link accent-link"
              href={startLesson ? `/lessons/${startLesson.slug}` : atlasHref}
            >
              Start Learning
            </Link>
            <Link className="primary-link ghost-link" href={atlasHref}>
              Explore Atlas
            </Link>
          </div>
          <div className="hero-links">
            <Link className="lesson-link" href="#why-qcml">
              How It Works
            </Link>
            <Link
              className="lesson-link"
              href={sampleLesson ? `/lessons/${sampleLesson.slug}` : atlasHref}
            >
              View Sample Lesson
            </Link>
          </div>
        </div>

        <aside className="hero-summary" aria-label="Value summary">
          <p className="hero-summary-label">What makes the platform different</p>
          <div className="hero-summary-grid">
            <article className="hero-summary-item">
              <span className="hero-summary-value">{metrics.total}</span>
              <span className="hero-summary-text">Linked lessons</span>
            </article>
            <article className="hero-summary-item">
              <span className="hero-summary-value">4 layers</span>
              <span className="hero-summary-text">Intuition to rigor</span>
            </article>
            <article className="hero-summary-item">
              <span className="hero-summary-value">0</span>
              <span className="hero-summary-text">Need for prior QM</span>
            </article>
          </div>
          <div className="hero-bridge-card">
            <p className="metric-label">Bridge Example</p>
            <p className="hero-bridge-code">if (x === 1) {"{"} y = !y; {"}"}</p>
            <p className="body-copy">
              In QCML, classical branching becomes controlled operations,
              helping software engineers map known logic patterns into quantum
              circuit thinking.
            </p>
          </div>
          <LearningModeSummary scope="home" />
        </aside>
      </section>

      {/* Interactive H-Gate Widget Section */}
      <section className="quantum-demo-panel">
        <div className="panel-heading">
          <p className="eyebrow">Try It First</p>
          <h3>Hadamard Gate: Intuition in Action</h3>
        </div>
        <div className="quantum-demo-intro">
          <p className="body-copy">
            This interactive widget demonstrates one of the core ideas in quantum computing:
            a Hadamard gate creates superposition, and measurement collapses it randomly to |0⟩ or |1⟩.
          </p>
        </div>
        <div className="quantum-demo-widget">
          <QuantumCoinFlip />
        </div>
        <div className="section-links compact-links">
          <Link className="lesson-link" href="#translator-layer">
            Continue to translator
          </Link>
          <Link className="lesson-link" href="#featured-paths">
            View learning paths
          </Link>
        </div>
      </section>

      <section className="why-panel mode-surface mode-surface--intuition" id="why-qcml">
        <div className="panel-heading">
          <p className="eyebrow">Why QCML</p>
          <h3>Bridge the gap between scary physics and familiar engineering</h3>
        </div>
        <div className="why-grid">
          <div className="why-copy">
            <p className="body-copy">
              Most quantum material asks learners to accept new notation before
              they have a stable mental model. QCML reverses that sequence. It
              starts with the analogy, then sharpens the concept through math,
              then grounds it in real physics, then makes the formal quantum
              structure explicit.
            </p>
            <p className="body-copy">
              That means a software engineer does not need to choose between
              intuition and rigor. The product is designed so the intuition
              becomes the footing for the rigor.
            </p>
          </div>
          <div className="why-copy">
            <p className="body-copy">
              The new learning modes do not split the product into two different
              sites. They simply change what comes forward first: the translator
              layer and stories in Intuition Mode, or the mathematical and
              physical scaffolding in Rigor Mode.
            </p>
            <div className="section-links compact-links">
              <Link className="lesson-link" href="#translator-layer">
                Open translator section
              </Link>
              <Link className="lesson-link" href={atlasHref}>
                Browse lesson atlas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="translator-panel mode-surface mode-surface--intuition"
        id="translator-layer"
      >
        <div className="panel-heading">
          <p className="eyebrow">Classical-to-Quantum Translator</p>
          <h3>Use familiar systems thinking as the bridge into quantum formality</h3>
        </div>
        <div className="translator-intro">
          <p className="body-copy">
            These curated mappings are website-level teaching aids, not lesson
            data fields. They help the homepage explain how QCML translates
            software, control, and mathematical intuition into quantum ideas.
          </p>
          <div className="section-links compact-links">
            <Link className="lesson-link" href="#why-qcml">
              Back to why QCML
            </Link>
            <Link className="lesson-link" href={atlasHref}>
              Continue to the atlas
            </Link>
          </div>
        </div>
        <div className="translator-grid">
          <FeaturedTranslatorGrid />
        </div>
      </section>

      <section
        className="curriculum-panel mode-surface mode-surface--rigor"
        id="learning-arc"
      >
        <div className="panel-heading">
          <p className="eyebrow">Curriculum Preview</p>
          <h3>See the shape of the journey before you dive in</h3>
        </div>
        <div className="arc-grid">
          {stageCards.map((card) => (
            <article key={card.title} className="arc-card">
              <p className="metric-label">{card.title}</p>
              <p className="arc-count">{card.count}</p>
              <p className="body-copy">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="atlas-preview-shell">
          <div className="panel-heading compact-heading">
            <p className="eyebrow">Lesson Atlas</p>
            <h3>Keep discovery in its own focused workspace</h3>
          </div>
          <p className="body-copy atlas-preview-copy">
            The dedicated atlas page holds search, stage filters, and curated
            path filters so the homepage can stay focused on orientation rather
            than behaving like a dashboard.
          </p>
          <div className="atlas-preview-grid">
            <article className="atlas-preview-card">
              <p className="metric-label">Search</p>
              <h4>Find by lesson title or concept</h4>
              <p className="body-copy">
                Jump straight to the lesson you already have in mind instead of
                scanning the whole curriculum from the landing page.
              </p>
            </article>
            <article className="atlas-preview-card">
              <p className="metric-label">Filter</p>
              <h4>Slice by stage and curated path</h4>
              <p className="body-copy">
                Narrow the lesson list by foundation, intermediate, advanced,
                or by the teaching routes surfaced across the site.
              </p>
            </article>
            <article className="atlas-preview-card">
              <p className="metric-label">Navigate</p>
              <h4>Open any lesson from one place</h4>
              <p className="body-copy">
                Use the atlas as the central browse screen, then move into the
                left-rail lesson experience once you pick a topic.
              </p>
            </article>
          </div>
          <div className="section-links compact-links">
            <Link className="lesson-link" href={atlasHref}>
              Open lesson atlas
            </Link>
            <Link
              className="lesson-link"
              href={startLesson ? `/lessons/${startLesson.slug}` : atlasHref}
            >
              Open the first lesson
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Learning Paths */}
      <section className="featured-paths-panel" id="featured-paths">
        <FeaturedPaths />
      </section>

      <section className="guided-panel" id="guided-entry">
        <div className="panel-heading">
          <p className="eyebrow">Quick Ways In</p>
          <h3>Choose an entry point that matches your immediate goal</h3>
        </div>
        <div className="path-grid">
          {guidedPaths.map((path) => (
            <article className="path-card" key={path.title}>
              <p className="metric-label">{path.label}</p>
              <h4>{path.title}</h4>
              <p className="body-copy">{path.description}</p>
              <Link className="lesson-link" href={path.href}>
                Open path
              </Link>
            </article>
          ))}
        </div>
        <div className="section-links">
          <Link className="lesson-link" href="#top">
            Back to top
          </Link>
          <Link
            className="lesson-link"
            href={sampleLesson ? `/lessons/${sampleLesson.slug}` : atlasHref}
          >
            Open sample lesson
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeaturedTranslatorGrid() {
  const cards = [
    {
      lens: "Control flow",
      classical: "if / branch / dependency",
      quantum: "controlled operation",
      explanation:
        "QCML uses familiar control-flow intuition to explain why one qubit can conditionally change another without measuring it.",
      bestFor: "both modes",
    },
    {
      lens: "Debugging intuition",
      classical: "inspect state directly",
      quantum: "infer from repeated measurement",
      explanation:
        "This shift is one of the core bridges for engineers: in quantum systems, observation changes the state, so evidence comes from statistics.",
      bestFor: "intuition",
    },
    {
      lens: "State representation",
      classical: "bit or vector value",
      quantum: "state vector in Hilbert space",
      explanation:
        "QCML keeps the formal state-space story close to the intuition so amplitudes and phase feel motivated rather than dropped in from nowhere.",
      bestFor: "rigor",
    },
  ];

  return cards.map((card) => (
    <article className="translator-card" key={card.lens}>
      <div className="translator-card-meta">
        <span className="tag">{card.lens}</span>
        <span className="tag">
          Best in {card.bestFor === "both" ? "both modes" : `${card.bestFor} mode`}
        </span>
      </div>
      <p className="metric-label">Classical</p>
      <h4>{card.classical}</h4>
      <p className="translator-arrow">maps to</p>
      <p className="metric-label">Quantum</p>
      <h4>{card.quantum}</h4>
      <p className="body-copy">{card.explanation}</p>
    </article>
  ));
}
