"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Lesson5InterferenceVisualizer() {
  const [mode, setMode] = useState<"constructive" | "destructive">("constructive");

  const offset = mode === "constructive" ? 0 : Math.PI;

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>〰️ Amplitude Interference</h4>
        <p className="widget-description">Constructive and destructive interference of probability amplitudes.</p>
      </div>
      <div className="widget-content">
        <svg viewBox="0 0 300 120" className="interference-diagram">
          {/* Path 1 */}
          <path
            d="M 20 60 Q 50 20 80 60"
            fill="none"
            stroke="#2d8ca8"
            strokeWidth="2"
            opacity="0.7"
          />
          <text x="20" y="40" fontSize="11" fill="currentColor">
            Path 1
          </text>

          {/* Path 2 */}
          <path
            d="M 20 60 Q 50 100 80 60"
            fill="none"
            stroke="#e11d48"
            strokeWidth="2"
            opacity="0.7"
          />
          <text x="20" y="100" fontSize="11" fill="currentColor">
            Path 2
          </text>

          {/* Result waves */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={`wave-${mode}`}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const x = 100 + i * 40;
              const amp1 = Math.sin((x / 100) * Math.PI) * 15;
              const amp2 = Math.sin((x / 100) * Math.PI + offset) * 15;
              const totalAmp = amp1 + amp2;

              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={60 - totalAmp}
                  r={4 + Math.abs(totalAmp) * 0.1}
                  fill={mode === "constructive" ? "#d97706" : "#7c3aed"}
                  opacity={0.8}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              );
            })}
          </motion.g>

          {/* Labels */}
          <text x="10" y="15" fontSize="12" fontWeight="600" fill="currentColor">
            {mode === "constructive" ? "✓ Constructive" : "✗ Destructive"}
          </text>
        </svg>

        <div className="widget-controls">
          <button
            onClick={() => setMode("constructive")}
            className={`state-btn ${mode === "constructive" ? "active" : ""}`}
          >
            Constructive
          </button>
          <button
            onClick={() => setMode("destructive")}
            className={`state-btn ${mode === "destructive" ? "active" : ""}`}
          >
            Destructive
          </button>
        </div>
      </div>
      <p className="widget-note">
        {mode === "constructive"
          ? "In constructive interference, amplitudes add up, increasing the probability of the outcome."
          : "In destructive interference, amplitudes cancel out, decreasing the probability of the outcome."}
      </p>
    </section>
  );
}
