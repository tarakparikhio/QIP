"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type SuperpositionState = "|0⟩" | "|1⟩" | "|+⟩" | "|-⟩";

export function Lesson2SuperpositionExplorer() {
  const [state, setState] = useState<SuperpositionState>("|+⟩");

  const getColor = (s: SuperpositionState) => {
    switch (s) {
      case "|0⟩":
        return "#2d8ca8";
      case "|1⟩":
        return "#e11d48";
      case "|+⟩":
        return "#d97706";
      case "|-⟩":
        return "#7c3aed";
    }
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>✨ Superposition States</h4>
        <p className="widget-description">Equal superposition and opposite superposition states.</p>
      </div>
      <div className="widget-content">
        <div className="state-display">
          <div key={state} className="state-label">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {state}
            </motion.div>
          </div>
          <svg viewBox="0 0 100 100" className="state-circle">
            {/* Bloch sphere representation */}
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" opacity="0.2" strokeWidth="2" />
            <motion.circle
              cx="50"
              cy="50"
              r="25"
              fill={getColor(state)}
              opacity="0.7"
              animate={state === "|+⟩" || state === "|-⟩" ? { r: [24, 26, 24] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="50" y="55" textAnchor="middle" fontSize="16" fill="white" fontWeight="600">
              {state}
            </text>
          </svg>
        </div>
        <div className="widget-controls">
          <button
            onClick={() => setState("|0⟩")}
            className={`state-btn ${state === "|0⟩" ? "active" : ""}`}
          >
            |0⟩
          </button>
          <button
            onClick={() => setState("|1⟩")}
            className={`state-btn ${state === "|1⟩" ? "active" : ""}`}
          >
            |1⟩
          </button>
          <button
            onClick={() => setState("|+⟩")}
            className={`state-btn ${state === "|+⟩" ? "active" : ""}`}
          >
            |+⟩
          </button>
          <button
            onClick={() => setState("|-⟩")}
            className={`state-btn ${state === "|-⟩" ? "active" : ""}`}
          >
            |-⟩
          </button>
        </div>
      </div>
      <p className="widget-note">
        |+⟩ and |-⟩ are equal superpositions of |0⟩ and |1⟩, but with different phases.
      </p>
    </section>
  );
}
