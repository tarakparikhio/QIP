import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningModeSummary } from "@/components/learning-mode";
import {
  MathDisplay,
  MathInline,
  MathText,
} from "@/components/math-text";
import {
  LessonProgressBadge,
  LessonProgressPanel,
  TrackLessonView,
} from "@/components/progress-ui";
import {
  getAdjacentLessons,
  getLessonsByIds,
  getLessonBySlug,
  getLessons,
} from "@/lib/lessons";

export function generateStaticParams() {
  return getLessons().map((lesson) => ({ slug: lesson.slug }));
}

function LabeledCopy({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p className="body-copy">
      <strong>{label}:</strong> <MathText text={value} />
    </p>
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const { previous, next } = getAdjacentLessons(slug);
  const prerequisiteLessons = getLessonsByIds(
    lesson.learning_order.prerequisites,
  );

  return (
    <main className="page-shell lesson-page">
      <TrackLessonView lessonId={lesson.lesson_id} />
      <section className="lesson-shell">
        <nav className="crumbs">
          <Link href="/">All Lessons</Link>
          <span>/</span>
          <span>{lesson.title}</span>
        </nav>

        <div className="section-links">
          <Link className="lesson-link" href="/">
            Home
          </Link>
          <Link className="lesson-link" href="/#curriculum-atlas">
            Lesson Atlas
          </Link>
          <Link className="lesson-link" href="/#learning-arc">
            Learning Arc
          </Link>
        </div>

        <section className="lesson-header">
          <div className="lesson-header-grid">
            <div>
              <p className="eyebrow">
                Lesson {lesson.lesson_id} • {lesson.learning_order.stage} •{" "}
                {lesson.difficulty}
              </p>
              <h2>{lesson.title}</h2>
              <p className="lead-copy">
                <MathText text={lesson.learning_objective} />
              </p>
              <div className="hero-tags">
                <LessonProgressBadge lessonId={lesson.lesson_id} />
                <span className="tag">Slug: {lesson.slug}</span>
                <span className="tag">Stage: {lesson.learning_order.stage}</span>
                <span className="tag">Difficulty: {lesson.difficulty}</span>
                <span className="tag">
                  Visualization: {lesson.visualization.type}
                </span>
              </div>
            </div>
            <aside className="lesson-aside">
              <p className="metric-label">Lesson Focus</p>
              <p className="body-copy">
                This page keeps the flow centered on intuition, math, physics,
                and formal QM, with the visual learning cue preserved. Use the
                atlas to jump sideways and the prerequisite links to backtrack
                when needed.
              </p>
              <div className="lesson-nav-mini">
                {previous ? (
                  <Link className="lesson-link" href={`/lessons/${previous.slug}`}>
                    Previous: {previous.title}
                  </Link>
                ) : (
                  <span className="body-copy">Start of curriculum</span>
                )}
                {next ? (
                  <Link className="lesson-link" href={`/lessons/${next.slug}`}>
                    Next: {next.title}
                  </Link>
                ) : (
                  <span className="body-copy">End of curriculum</span>
                )}
              </div>
              <div className="lesson-nav-mini">
                <Link className="lesson-link" href="/#curriculum-atlas">
                  Browse atlas
                </Link>
                <Link className="lesson-link" href="/#guided-entry">
                  Guided paths
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <div className="lesson-flow">
          <LearningModeSummary scope="lesson" />
          <LessonProgressPanel lessonId={lesson.lesson_id} />

          <div className="split-grid lesson-mode-group lesson-mode-group--neutral">
            <section className="section-card">
              <h3>Curriculum Position</h3>
              <p className="body-copy">
                This lesson belongs to the {lesson.learning_order.stage} stage and
                is best approached as a {lesson.difficulty} checkpoint in the
                broader QCML sequence.
              </p>
              <p className="metric-label">Builds on</p>
              <div className="prereq-chip-row">
                {prerequisiteLessons.length ? (
                  prerequisiteLessons.map((prerequisite) => (
                    <Link
                      className="mini-link-pill"
                      href={`/lessons/${prerequisite.slug}`}
                      key={prerequisite.lesson_id}
                    >
                      {prerequisite.lesson_id}. {prerequisite.title}
                    </Link>
                  ))
                ) : (
                  <span className="mini-link-pill muted-pill">
                    Start here with no prerequisites
                  </span>
                )}
              </div>
            </section>

            <section className="section-card">
              <h3>Navigation</h3>
              <p className="body-copy">
                Move linearly with previous and next, or return to the atlas when
                you want to re-enter by stage, topic, or curated path.
              </p>
              <div className="section-links compact-links">
                <Link className="lesson-link" href="/#curriculum-atlas">
                  Open lesson atlas
                </Link>
                <Link className="lesson-link" href="/#learning-arc">
                  View learning arc
                </Link>
                <Link className="lesson-link" href="/#guided-entry">
                  Open guided paths
                </Link>
              </div>
            </section>
          </div>

          <section className="section-card lesson-mode-card lesson-mode-card--intuition">
            <h3>Intuition</h3>
            <LabeledCopy label="Analogy" value={lesson.intuition.analogy} />
            <LabeledCopy label="Story" value={lesson.intuition.story} />
            <LabeledCopy
              label="Why It Works"
              value={lesson.intuition.why_it_works}
            />
            <LabeledCopy
              label="Limitations"
              value={lesson.intuition.limitations}
            />
          </section>

          <section className="section-card lesson-mode-card lesson-mode-card--rigor">
            <h3>Math</h3>
            <div className="equation-grid">
              {lesson.math.equations.map((equation) => (
                <article key={equation.latex} className="equation-card">
                  <MathDisplay latex={equation.latex} />
                  <p className="body-copy">
                    <MathText text={equation.meaning} />
                  </p>
                  {Object.keys(equation.variables).length > 0 ? (
                    <ul className="list-block">
                      {Object.entries(equation.variables).map(([name, value]) => (
                        <li key={name}>
                          <strong>
                            <MathInline latex={name} />
                          </strong>
                          : <MathText text={value} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
            <LabeledCopy label="Derivation" value={lesson.math.derivation} />
            <LabeledCopy label="Notes" value={lesson.math.notes} />
          </section>

          <div className="split-grid lesson-mode-group lesson-mode-group--rigor">
            <section className="section-card">
              <h3>Physics</h3>
              <LabeledCopy label="Concept" value={lesson.physics.concept} />
              <LabeledCopy
                label="Real-World Mapping"
                value={lesson.physics.real_world_mapping}
              />
              <LabeledCopy label="Importance" value={lesson.physics.importance} />
            </section>

            <section className="section-card">
              <h3>Quantum Mechanics</h3>
              <LabeledCopy
                label="Formal Definition"
                value={lesson.quantum_mechanics.formal_definition}
              />
              <LabeledCopy
                label="State Space"
                value={lesson.quantum_mechanics.state_space}
              />
              <ul className="list-block">
                {lesson.quantum_mechanics.operators_involved.map((operator) => (
                  <li key={operator}>
                    <MathText text={operator} />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="split-grid lesson-mode-group lesson-mode-group--neutral">
            <section className="section-card">
              <h3>Visualization</h3>
              <p className="body-copy">
                <strong>Type:</strong> {lesson.visualization.type}
              </p>
              <p className="body-copy">
                <strong>Interactive:</strong>{" "}
                {lesson.visualization.interactive ? "Yes" : "No"}
              </p>
              <LabeledCopy
                label="Description"
                value={lesson.visualization.description}
              />
            </section>

            <section className="section-card">
              <h3>Applications</h3>
              <ul className="list-block">
                {lesson.applications.map((application) => (
                  <li key={application}>
                    <MathText text={application} />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="section-card lesson-mode-card lesson-mode-card--neutral">
            <h3>Interview Ready</h3>
            <p className="body-copy">
              <MathText text={lesson.interview_ready.explanation} />
            </p>
            <ul className="list-block">
              {lesson.interview_ready.common_questions.map((question) => (
                <li key={question}>
                  <MathText text={question} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="lesson-footer-nav">
          {previous ? (
            <Link className="footer-nav-card" href={`/lessons/${previous.slug}`}>
              <span className="metric-label">Previous Lesson</span>
              <LessonProgressBadge lessonId={previous.lesson_id} />
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <div className="footer-nav-card muted-card">
              <span className="metric-label">Previous Lesson</span>
              <strong>Beginning of the atlas</strong>
            </div>
          )}
          {next ? (
            <Link className="footer-nav-card" href={`/lessons/${next.slug}`}>
              <span className="metric-label">Next Lesson</span>
              <LessonProgressBadge lessonId={next.lesson_id} />
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <div className="footer-nav-card muted-card">
              <span className="metric-label">Next Lesson</span>
              <strong>End of the atlas</strong>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
