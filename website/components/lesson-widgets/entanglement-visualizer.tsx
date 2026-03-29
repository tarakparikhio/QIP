"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Lesson4EntanglementVisualizer() {
  const [state, setState] = useState<"00" | "11" | "superposition">("superposition");
  const [measured, setMeasured] = useState<string | null>(null);

  const measure = () => {
    if (state === "superposition") {
      const result = Math.random() < 0.5 ? "00" : "11";
      setMeasured(result);
    }
  };

  const reset = () => {
    setMeasured(null);
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔗 Bell State Entanglement</h4>
        <p className="widget-description">Two qubits in a correlated superposition.</p>
      </div>
      <div className="widget-content">
        <div className="entanglement-display">
          <div key={state} className="state-equation">
            {state === "superposition"
              ? "(|00⟩ + |11⟩) / √2"
              : measured === "00"
                ? "|00⟩"
                : "|11⟩"}
          </div>

          <svg viewBox="0 0 140 80" className="entanglement-diagram">
            {/* Qubit A */}
            <motion.circle
              cx="30"
              cy="40"
              r="20"
              fill={
                measured === null
                  ? "#d97706"
                  : measured === "00"
                    ? "#2d8ca8"
                    : "#2d8ca8"
              }
              opacity={state === "superposition" ? 0.7 : 0.9}
              animate={state === "superposition" ? { opacity: [0.6, 0.8, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="30" y="45" textAnchor="middle" fontSize="14" fill="white" fontWeight="600">
              A
            </text>

            {/* Connection */}
            <motion.line
              x1="50"
              y1="40"
              x2="90"
              y2="40"
              stroke="currentColor"
              strokeWidth="2"
              opacity={state === "superposition" ? 0.6 : 0.3}
              animate={state === "superposition" ? { opacity: [0.4, 0.7, 0.4] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Qubit B */}
            <motion.circle
              cx="110"
              cy="40"
              r="20"
              fill={
                measured === null
                  ? "#d97706"
                  : measured === "00"
                    ? "#e11d48"
                    : "#e11d48"
              }
              opacity={state === "superposition" ? 0.7 : 0.9}
              animate={state === "superposition" ? { opacity: [0.6, 0.8, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            />
            <text x="110" y="45" textAnchor="middle" fontSize="14" fill="white" fontWeight="600">
              B
            </text>
          </svg>
        </div>

        <div className="widget-controls">
          <button onClick={measure} disabled={measured !== null} className="action-btn">
            Measure Both
          </button>
          <button onClick={reset} className="action-btn secondary">
            Reset
          </button>
        </div>
      </div>
      <p className="widget-note">
        When entangled qubits are measured, they collapse together. Measuring A instantly determines the
        result of B.
      </p>
    </section>
  );
}
