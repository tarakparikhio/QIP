"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { MathText } from "@/components/math-text";
import {
  LessonProgressBadge,
  QuickLookButton,
} from "@/components/progress-ui";
import {
  curriculumPaths,
  type CurriculumPathKey,
} from "@/lib/curriculum-paths";
import type { Lesson } from "@/lib/lessons";

type ActivePathKey = "all" | CurriculumPathKey;

export function LessonBrowser({ lessons }: { lessons: Lesson[] }) {
  const [stage, setStage] = useState<"all" | Lesson["learning_order"]["stage"]>(
    "all",
  );
  const [activePath, setActivePath] = useState<ActivePathKey>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const lessonById = useMemo(
    () => new Map(lessons.map((lesson) => [lesson.lesson_id, lesson])),
    [lessons],
  );
  const activePathConfig = useMemo(
    () =>
      activePath === "all"
        ? undefined
        : curriculumPaths.find((path) => path.key === activePath),
    [activePath],
  );
  const activePathLessonIds = useMemo(
    () => new Set<number>(activePathConfig?.lessonIds ?? []),
    [activePathConfig],
  );

  const filteredLessons = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const stageMatch = stage === "all" || lesson.learning_order.stage === stage;
      const pathMatch =
        !activePathConfig || activePathLessonIds.has(lesson.lesson_id);
      const haystack = [
        lesson.title,
        lesson.learning_objective,
        lesson.slug,
        lesson.intuition.analogy,
        lesson.physics.concept,
        lesson.applications.join(" "),
        lesson.learning_order.stage,
      ]
        .join(" ")
        .toLowerCase();

      const queryMatch = !normalizedQuery || haystack.includes(normalizedQuery);
      return stageMatch && pathMatch && queryMatch;
    });
  }, [activePathConfig, activePathLessonIds, deferredQuery, lessons, stage]);

  const stageLabel =
    stage === "all" ? "All stages" : stage.charAt(0).toUpperCase() + stage.slice(1);

  return (
    <section className="lesson-browser-shell">
      <section className="browser-controls">
        <div className="browser-heading">
          <div>
            <p className="eyebrow">Lesson Finder</p>
            <h4 className="browser-title">Find the right entry point quickly</h4>
          </div>
          <div className="filter-summary">
            <span className="summary-pill">
              {filteredLessons.length} / {lessons.length} visible
            </span>
            <span className="summary-pill">{stageLabel}</span>
            <span className="summary-pill">
              {activePathConfig ? activePathConfig.label : "All paths"}
            </span>
          </div>
        </div>

        <div className="quick-paths-panel">
          <div className="quick-paths-copy">
            <span className="field-label">Quick curriculum paths</span>
            <p className="body-copy">
              Use these curated tracks when you want a focused route instead of
              browsing the whole atlas at once.
            </p>
          </div>
          <div className="quick-paths-row">
            <button
              className={`path-pill${activePath === "all" ? " is-active" : ""}`}
              type="button"
              onClick={() => setActivePath("all")}
              aria-pressed={activePath === "all"}
            >
              All lessons
            </button>
            {curriculumPaths.map((path) => (
              <button
                key={path.key}
                className={`path-pill${activePath === path.key ? " is-active" : ""}`}
                type="button"
                onClick={() => {
                  setActivePath(path.key);
                  setStage("all");
                }}
                aria-pressed={activePath === path.key}
              >
                {path.label}
              </button>
            ))}
          </div>
          {activePathConfig ? (
            <div className="path-preview-card">
              <div>
                <p className="metric-label">Selected path</p>
                <h5>{activePathConfig.label}</h5>
                <p className="body-copy">{activePathConfig.description}</p>
              </div>
              <div className="path-preview-links">
                {activePathConfig.lessonIds.map((lessonId) => {
                  const lesson = lessonById.get(lessonId);
                  if (!lesson) return null;

                  return (
                    <Link
                      className="mini-link-pill"
                      href={`/lessons/${lesson.slug}`}
                      key={lesson.lesson_id}
                    >
                      {lesson.lesson_id}. {lesson.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="filter-toolbar">
          <label className="search-field">
            <span className="field-label">Search</span>
            <input
              className="search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lessons, topics, or analogies"
              aria-label="Search lessons"
            />
          </label>

          <label className="select-field">
            <span className="field-label">Stage</span>
            <select
              className="filter-select"
              value={stage}
              onChange={(event) =>
                setStage(
                  event.target.value as "all" | Lesson["learning_order"]["stage"],
                )
              }
              aria-label="Filter lessons by stage"
            >
              <option value="all">All stages</option>
              <option value="foundation">Foundation</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <div className="toolbar-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setQuery("");
                setStage("all");
                setActivePath("all");
              }}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="filter-note">
          <p className="body-copy">
            Search matches titles, objectives, preserved analogies, physics
            concepts, and application terms.
          </p>
        </div>
      </section>

      {filteredLessons.length ? (
        <section className="cards-grid">
          {filteredLessons.map((lesson) => (
            <article className="lesson-card" key={lesson.lesson_id}>
              <div className="lesson-card-topline">
                <span className="stage-badge">
                  Lesson {lesson.lesson_id} • {lesson.learning_order.stage}
                </span>
                <div className="card-tags compact-tags">
                  <LessonProgressBadge lessonId={lesson.lesson_id} />
                  <span className="tag">Difficulty: {lesson.difficulty}</span>
                </div>
              </div>
              <h3>{lesson.title}</h3>
              <p className="body-copy">
                <MathText text={lesson.learning_objective} />
              </p>
              <p className="concept-copy">
                <strong>Concept framing:</strong>{" "}
                <MathText text={lesson.physics.concept} />
              </p>
              <div className="card-tags">
                <span className="tag">
                  Visualization: {lesson.visualization.type}
                </span>
                <span className="tag">
                  Applications: {lesson.applications.slice(0, 2).join(" • ")}
                </span>
              </div>
              <div className="prereq-stack">
                <p className="metric-label">Builds on</p>
                <div className="prereq-chip-row">
                  {lesson.learning_order.prerequisites.length ? (
                    lesson.learning_order.prerequisites.map((prerequisiteId) => {
                      const prerequisite = lessonById.get(prerequisiteId);
                      return prerequisite ? (
                        <Link
                          className="mini-link-pill"
                          href={`/lessons/${prerequisite.slug}`}
                          key={prerequisite.lesson_id}
                        >
                          {prerequisite.lesson_id}. {prerequisite.title}
                        </Link>
                      ) : (
                        <span className="mini-link-pill muted-pill" key={prerequisiteId}>
                          Lesson {prerequisiteId}
                        </span>
                      );
                    })
                  ) : (
                    <span className="mini-link-pill muted-pill">
                      No prerequisites
                    </span>
                  )}
                </div>
              </div>
              <div className="lesson-card-footer">
                <span className="body-copy">
                  Stage-ready for learners who want a{" "}
                  {lesson.learning_order.stage} entry point.
                </span>
                <div className="card-action-row">
                  <QuickLookButton lesson={lesson} />
                  <Link
                    className="lesson-link lesson-open-link"
                    href={`/lessons/${lesson.slug}`}
                  >
                    Open lesson
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="empty-panel">
          <p className="body-copy">
            No lessons match the current search, stage, and path combination.
          </p>
          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              setQuery("");
              setStage("all");
              setActivePath("all");
            }}
          >
            Reset atlas filters
          </button>
        </div>
      )}
    </section>
  );
}
