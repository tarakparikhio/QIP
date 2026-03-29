"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type QubitState = "|0⟩" | "|1⟩";

export function Lesson1QubitVisualizer() {
  const [state, setState] = useState<QubitState>("|0⟩");

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚡ Qubit States</h4>
        <p className="widget-description">Toggle between the two computational basis states.</p>
      </div>
      <div className="widget-content">
        <div className="state-display">
          <div key={state} className="state-label">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {state}
            </motion.div>
          </div>
          <svg viewBox="0 0 80 80" className="state-circle">
            <circle
              cx="40"
              cy="40"
              r="30"
              fill={state === "|0⟩" ? "#2d8ca8" : "#e11d48"}
              opacity="0.8"
            />
            <text x="40" y="45" textAnchor="middle" fontSize="20" fill="white" fontWeight="600">
              {state === "|0⟩" ? "0" : "1"}
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
        </div>
      </div>
      <p className="widget-note">
        A qubit is the quantum version of a classical bit. It can be in state |0⟩ or |1⟩.
      </p>
    </section>
  );
}
