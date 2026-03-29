"use client";

import { Brain, Zap } from "lucide-react";
import { useLearningMode } from "@/components/learning-mode";
import type { LearningMode } from "@/lib/learning-mode";

export function LearningModeToggleIcon() {
  const { mode, setMode } = useLearningMode();

  const handleToggle = () => {
    const nextMode: LearningMode = mode === "intuition" ? "rigor" : "intuition";
    setMode(nextMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="learning-mode-toggle-icon"
      title={`Switch to ${mode === "intuition" ? "Rigor" : "Intuition"} Mode`}
      aria-label={`Switch from ${mode} mode to ${mode === "intuition" ? "rigor" : "intuition"} mode`}
      aria-pressed={mode === "rigor"}
    >
      <span className="toggle-icon-container">
        {mode === "intuition" ? (
          <Brain size={18} strokeWidth={1.5} />
        ) : (
          <Zap size={18} strokeWidth={1.5} />
        )}
      </span>
      <span className="toggle-label">{mode === "intuition" ? "Intuition" : "Rigor"}</span>
    </button>
  );
}

export function LearningModeToggleText() {
  const { mode, setMode } = useLearningMode();

  return (
    <div className="learning-mode-toggle-text" role="group" aria-label="Learning mode selector">
      <span className="field-label">Learning mode:</span>
      <div className="learning-mode-switch">
        {(["intuition", "rigor"] as LearningMode[]).map((option) => (
          <button
            key={option}
            type="button"
            className={`learning-mode-button${mode === option ? " is-active" : ""}`}
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
          >
            {option === "intuition" ? "🧠 Intuition" : "⚡ Rigor"}
          </button>
        ))}
      </div>
    </div>
  );
}
