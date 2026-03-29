import type { Metadata } from "next";
import Link from "next/link";
import { LessonBrowser } from "@/components/lesson-browser";
import { getLessonMetrics, getLessons } from "@/lib/lessons";

export const metadata: Metadata = {
  title: "Lesson Atlas",
  description:
    "Search, filter, and browse the full QCML curriculum from a dedicated lesson atlas page.",
};

export default function LessonsAtlasPage() {
  const lessons = getLessons();
  const metrics = getLessonMetrics(lessons);
  const firstLesson = lessons[0];

  return (
    <main className="page-shell atlas-section">
      <section className="hero-panel entry-panel">
        <div className="entry-copy">
          <p className="eyebrow">Lesson Atlas</p>
          <h2>Search, filter, and jump into any lesson</h2>
          <p>
            This page owns discovery. Use it when you want to search by title,
            narrow by stage, or browse through one of the curated learning
            paths without crowding the homepage.
          </p>
          <div className="section-links compact-links">
            <Link className="lesson-link" href="/">
              Back to home
            </Link>
            <Link className="lesson-link" href="/#featured-paths">
              View learning paths
            </Link>
            {firstLesson ? (
              <Link className="lesson-link" href={`/lessons/${firstLesson.slug}`}>
                Open lesson 1
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="hero-summary" aria-label="Atlas summary">
          <p className="hero-summary-label">Curriculum overview</p>
          <div className="hero-summary-grid">
            <article className="hero-summary-item">
              <span className="hero-summary-value">{metrics.total}</span>
              <span className="hero-summary-text">Total lessons</span>
            </article>
            <article className="hero-summary-item">
              <span className="hero-summary-value">{metrics.foundation}</span>
              <span className="hero-summary-text">Foundation</span>
            </article>
            <article className="hero-summary-item">
              <span className="hero-summary-value">{metrics.advanced}</span>
              <span className="hero-summary-text">Advanced</span>
            </article>
          </div>
          <div className="hero-bridge-card">
            <p className="metric-label">Why this page exists</p>
            <p className="body-copy">
              The homepage explains the product. The atlas is where you browse
              the curriculum with search and filters turned on.
            </p>
          </div>
        </aside>
      </section>

      <section className="atlas-preview-shell">
        <div className="browser-heading">
          <div>
            <p className="eyebrow">Lesson Finder</p>
            <h3 className="browser-title">Browse the full QCML curriculum</h3>
          </div>
          <div className="filter-summary">
            <span className="summary-pill">{metrics.foundation} foundation</span>
            <span className="summary-pill">{metrics.intermediate} intermediate</span>
            <span className="summary-pill">{metrics.advanced} advanced</span>
          </div>
        </div>

        <LessonBrowser lessons={lessons} />
      </section>
    </main>
  );
}