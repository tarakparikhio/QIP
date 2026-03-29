"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LEARNING_MODE,
  LEARNING_MODE_EVENT,
  LEARNING_MODE_STORAGE_KEY,
  learningModeMeta,
  type LearningMode,
} from "@/lib/learning-mode";

function normalizeLearningMode(value: string | null | undefined): LearningMode {
  return value === "rigor" || value === "intuition"
    ? value
    : DEFAULT_LEARNING_MODE;
}

function applyLearningMode(mode: LearningMode) {
  document.documentElement.dataset.learningMode = mode;
  localStorage.setItem(LEARNING_MODE_STORAGE_KEY, mode);
  window.dispatchEvent(new CustomEvent(LEARNING_MODE_EVENT, { detail: mode }));
}

export function useLearningMode() {
  const [mode, setMode] = useState<LearningMode>(DEFAULT_LEARNING_MODE);

  useEffect(() => {
    const syncMode = () => {
      const current = normalizeLearningMode(
        localStorage.getItem(LEARNING_MODE_STORAGE_KEY) ??
          document.documentElement.dataset.learningMode,
      );

      setMode(current);
      document.documentElement.dataset.learningMode = current;
    };

    syncMode();

    const handleModeChange = (event: Event) => {
      const detail = (event as CustomEvent<LearningMode>).detail;
      const nextMode = normalizeLearningMode(detail);
      setMode(nextMode);
      document.documentElement.dataset.learningMode = nextMode;
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === LEARNING_MODE_STORAGE_KEY) {
        syncMode();
      }
    };

    window.addEventListener(LEARNING_MODE_EVENT, handleModeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(LEARNING_MODE_EVENT, handleModeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return {
    mode,
    setMode: (nextMode: LearningMode) => {
      setMode(nextMode);
      applyLearningMode(nextMode);
    },
    meta: learningModeMeta[mode],
  };
}

export function LearningModeToggle() {
  const { mode, setMode } = useLearningMode();

  return (
    <div className="learning-mode-toggle" aria-label="Learning mode selector">
      <span className="field-label">Learning mode</span>
      <div className="learning-mode-switch">
        {(["intuition", "rigor"] as LearningMode[]).map((option) => (
          <button
            key={option}
            type="button"
            className={`learning-mode-button${
              mode === option ? " is-active" : ""
            }`}
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
          >
            {learningModeMeta[option].shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LearningModeSummary({
  scope,
}: {
  scope: "home" | "lesson";
}) {
  const { meta, mode } = useLearningMode();
  const title = scope === "home" ? meta.homeTitle : meta.lessonTitle;
  const description =
    scope === "home" ? meta.homeDescription : meta.lessonDescription;

  return (
    <section className="mode-summary-card" aria-live="polite">
      <p className="metric-label">Current learning mode</p>
      <h4>
        {meta.label}
        <span className="mode-summary-dot" aria-hidden="true" />
      </h4>
      <p className="body-copy">
        <strong>{title}.</strong> {description}
      </p>
      <p className="mode-summary-note">
        The site keeps all major content visible in both modes. What changes is
        the order, emphasis, and visual weight of the sections.
      </p>
      <span className="summary-pill">{mode === "intuition" ? "Analogy-first" : "Formal-first"}</span>
    </section>
  );
}
