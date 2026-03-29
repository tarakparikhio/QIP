import Link from "next/link";
import { LearningModeSummary } from "@/components/learning-mode";
import { LessonBrowser } from "@/components/lesson-browser";
import {
  CurriculumPathProgress,
  LessonProgressBadge,
} from "@/components/progress-ui";
import { translatorExamples } from "@/config/translator";
import { curriculumPaths } from "@/lib/curriculum-paths";
import { getLessonMetrics, getLessons, getLessonsByIds } from "@/lib/lessons";

export default function HomePage() {
  const lessons = getLessons();
  const lessonMap = new Map(lessons.map((lesson) => [lesson.lesson_id, lesson]));
  const metrics = getLessonMetrics(lessons);

  const startLesson = lessonMap.get(1);
  const sampleLesson = lessonMap.get(6);

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

  const featuredLessons = getLessonsByIds([1, 14, 28]);
  const quickPathCards = curriculumPaths
    .map((path) => ({
      ...path,
      firstLesson: lessonMap.get(path.lessonIds[0]),
    }))
    .filter((path) => path.firstLesson);

  const guidedPaths = [
    {
      label: "Start Learning",
      title: "Begin from zero",
      description:
        "Follow the lessons in order if you want the cleanest path from intuition to advanced algorithms.",
      href: startLesson ? `/lessons/${startLesson.slug}` : "#curriculum-atlas",
    },
    {
      label: "Engineer Bridge",
      title: "Think from software first",
      description:
        "Use the homepage translator layer and analogy-heavy lessons to bridge classical programming intuition into quantum structure.",
      href: "#translator-layer",
    },
    {
      label: "Preview Mode",
      title: "Sample the teaching style",
      description:
        "Open a representative lesson first if you want a quick sense of how the platform explains concepts before committing to the full arc.",
      href: sampleLesson ? `/lessons/${sampleLesson.slug}` : "#curriculum-atlas",
    },
    {
      label: "Advanced Route",
      title: "Jump to algorithmic depth",
      description:
        "If you already know the basics, move directly into the advanced sequence and use prerequisites as your backtrack map.",
      href: "#curriculum-atlas",
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
              href={startLesson ? `/lessons/${startLesson.slug}` : "#curriculum-atlas"}
            >
              Start Learning
            </Link>
            <Link className="primary-link ghost-link" href="#curriculum-atlas">
              Explore Atlas
            </Link>
          </div>
          <div className="hero-links">
            <Link className="lesson-link" href="#why-qcml">
              How It Works
            </Link>
            <Link
              className="lesson-link"
              href={sampleLesson ? `/lessons/${sampleLesson.slug}` : "#curriculum-atlas"}
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
              <span className="hero-summary-value">4</span>
              <span className="hero-summary-text">Teaching layers</span>
            </article>
            <article className="hero-summary-item">
              <span className="hero-summary-value">1</span>
              <span className="hero-summary-text">Continuous curriculum</span>
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
              <Link className="lesson-link" href="#curriculum-atlas">
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
            <Link className="lesson-link" href="#curriculum-atlas">
              Continue to the atlas
            </Link>
          </div>
        </div>
        <div className="translator-grid">
          {translatorExamples.map((card) => (
            <article className="translator-card" key={card.id}>
              <div className="translator-card-meta">
                <span className="tag">{card.lens}</span>
                <span className="tag">
                  Best in{" "}
                  {card.bestFor === "both"
                    ? "both modes"
                    : `${card.bestFor} mode`}
                </span>
              </div>
              <p className="metric-label">Classical</p>
              <h4>{card.classical}</h4>
              <p className="translator-arrow">maps to</p>
              <p className="metric-label">Quantum</p>
              <h4>{card.quantum}</h4>
              <p className="body-copy">{card.explanation}</p>
            </article>
          ))}
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

        <div className="featured-strip">
          {featuredLessons.map((lesson) => (
            <article className="featured-card" key={lesson.lesson_id}>
              <div className="card-topline">
                <p className="eyebrow">
                  Lesson {lesson.lesson_id} • {lesson.learning_order.stage}
                </p>
                <LessonProgressBadge lessonId={lesson.lesson_id} />
              </div>
              <h4>{lesson.title}</h4>
              <p className="body-copy">{lesson.learning_objective}</p>
              <div className="card-tags">
                <span className="tag">Difficulty: {lesson.difficulty}</span>
                <span className="tag">
                  Visualization: {lesson.visualization.type}
                </span>
              </div>
              <Link className="lesson-link" href={`/lessons/${lesson.slug}`}>
                Open featured lesson
              </Link>
            </article>
          ))}
        </div>

        <div className="quick-path-strip">
          {quickPathCards.map((path) => (
            <article className="path-card" key={path.key}>
              <p className="metric-label">{path.label}</p>
              <h4>{path.firstLesson?.title}</h4>
              <p className="body-copy">{path.description}</p>
              <CurriculumPathProgress lessonIds={path.lessonIds} />
              <div className="card-tags">
                <span className="tag">
                  Starts at lesson {path.firstLesson?.lesson_id}
                </span>
                <span className="tag">{path.lessonIds.length} lessons highlighted</span>
              </div>
              <div className="section-links compact-links">
                <Link className="lesson-link" href={`/#curriculum-atlas`}>
                  Open in atlas
                </Link>
                {path.firstLesson ? (
                  <Link
                    className="lesson-link"
                    href={`/lessons/${path.firstLesson.slug}`}
                  >
                    Jump to first lesson
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="atlas-preview-shell" id="curriculum-atlas">
          <div className="panel-heading compact-heading">
            <p className="eyebrow">Lesson Atlas</p>
            <h3>Search, filter, and enter any lesson</h3>
          </div>
          <div className="section-links compact-links">
            <Link className="lesson-link" href="#guided-entry">
              View guided entry points
            </Link>
            <Link
              className="lesson-link"
              href={startLesson ? `/lessons/${startLesson.slug}` : "/#curriculum-atlas"}
            >
              Open the first lesson
            </Link>
          </div>
          <LessonBrowser lessons={lessons} />
        </div>
      </section>

      <section className="guided-panel" id="guided-entry">
        <div className="panel-heading">
          <p className="eyebrow">Guided Entry Points</p>
          <h3>Choose a way into the platform that matches your goal</h3>
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
            href={sampleLesson ? `/lessons/${sampleLesson.slug}` : "#curriculum-atlas"}
          >
            Open sample lesson
          </Link>
        </div>
      </section>
    </main>
  );
}
