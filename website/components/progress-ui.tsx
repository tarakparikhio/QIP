"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MathText } from "@/components/math-text";
import { useLessonProgress, useProgress } from "@/components/progress-provider";
import { progressMeta } from "@/lib/progress";
import type { Lesson } from "@/lib/lessons";

export function LessonProgressBadge({
  lessonId,
}: {
  lessonId: number;
}) {
  const { status } = useLessonProgress(lessonId);

  if (!status) {
    return <span className="progress-pill progress-pill--empty">Not started</span>;
  }

  return (
    <span className={`progress-pill progress-pill--${status}`}>
      {progressMeta[status].label}
    </span>
  );
}

export function CurriculumPathProgress({
  lessonIds,
}: {
  lessonIds: readonly number[];
}) {
  const { progress } = useProgress();
  const completed = lessonIds.filter((lessonId) => progress[lessonId] === "completed")
    .length;
  const started = lessonIds.filter((lessonId) => {
    const status = progress[lessonId];
    return status === "started" || status === "completed";
  }).length;

  return (
    <div className="path-progress">
      <span className="progress-pill progress-pill--empty">
        {completed}/{lessonIds.length} completed
      </span>
      <span className="progress-pill progress-pill--started">
        {started}/{lessonIds.length} active
      </span>
    </div>
  );
}

export function LessonProgressPanel({
  lessonId,
}: {
  lessonId: number;
}) {
  const { status, markStarted, markCompleted } = useLessonProgress(lessonId);

  return (
    <section className="section-card progress-panel">
      <div className="progress-panel-head">
        <div>
          <p className="metric-label">Your progress</p>
          <h3>Track this lesson locally</h3>
        </div>
        <LessonProgressBadge lessonId={lessonId} />
      </div>
      <p className="body-copy">
        Progress is stored only in your browser. Use it as a lightweight way to
        mark what you have explored, actively studied, or finished.
      </p>
      <div className="progress-actions">
        <button className="secondary-button" type="button" onClick={markStarted}>
          Mark as started
        </button>
        <button className="primary-link accent-link" type="button" onClick={markCompleted}>
          Mark as completed
        </button>
      </div>
      <p className="mode-summary-note">
        Current state: {status ? progressMeta[status].label : "Not started"}.
      </p>
    </section>
  );
}

export function TrackLessonView({
  lessonId,
}: {
  lessonId: number;
}) {
  const { markViewed } = useLessonProgress(lessonId);

  useEffect(() => {
    markViewed();
  }, [markViewed]);

  return null;
}

export function QuickLookButton({
  lesson,
}: {
  lesson: Lesson;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="secondary-button"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Quick look
      </button>
      {isOpen ? (
        <div
          className="quick-look-backdrop"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <section
            className="quick-look-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick look for ${lesson.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quick-look-header">
              <div>
                <p className="eyebrow">
                  Lesson {lesson.lesson_id} • {lesson.learning_order.stage}
                </p>
                <h3>{lesson.title}</h3>
              </div>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="quick-look-meta">
              <LessonProgressBadge lessonId={lesson.lesson_id} />
              <span className="tag">Difficulty: {lesson.difficulty}</span>
              <span className="tag">
                Visualization: {lesson.visualization.type}
              </span>
            </div>
            <p className="body-copy">
              <MathText text={lesson.learning_objective} />
            </p>
            <p className="concept-copy">
              <strong>Concept framing:</strong>{" "}
              <MathText text={lesson.physics.concept} />
            </p>
            <div className="prereq-stack">
              <p className="metric-label">Applications</p>
              <div className="prereq-chip-row">
                {lesson.applications.slice(0, 3).map((application) => (
                  <span className="mini-link-pill muted-pill" key={application}>
                    <MathText text={application} />
                  </span>
                ))}
              </div>
            </div>
            <div className="quick-look-actions">
              <LessonProgressPanelInline lessonId={lesson.lesson_id} />
              <Link
                className="primary-link accent-link"
                href={`/lessons/${lesson.slug}`}
                onClick={() => setIsOpen(false)}
              >
                Open full lesson
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

function LessonProgressPanelInline({
  lessonId,
}: {
  lessonId: number;
}) {
  const { markStarted, markCompleted } = useLessonProgress(lessonId);

  return (
    <div className="progress-actions">
      <button className="secondary-button" type="button" onClick={markStarted}>
        Start
      </button>
      <button className="secondary-button" type="button" onClick={markCompleted}>
        Complete
      </button>
    </div>
  );
}
