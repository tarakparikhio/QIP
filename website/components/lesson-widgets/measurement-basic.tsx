"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * MeasurementBasic (Lesson 3)
 * Demonstrates fundamental measurement collapse using the Born rule
 * - Fixed superposition state |ψ⟩ = 1/√2(|0⟩ + |1⟩) (equal superposition)
 * - Shows collapse to |0⟩ or |1⟩ upon measurement
 * - Displays Born rule probabilities (50/50 for this state)
 * - Simple statistics: running count of outcomes
 */
export function MeasurementBasic() {
  const [state, setState] = useState<"ready" | "measured">("ready");
  const [result, setResult] = useState<"0" | "1" | null>(null);
  const [stats, setStats] = useState({ zero: 0, one: 0 });
  
  // Fixed equal superposition: |ψ⟩ = 1/√2(|0⟩ + |1⟩)
  const alpha = 1 / Math.sqrt(2);  // |0⟩ coefficient
  const beta = 1 / Math.sqrt(2);   // |1⟩ coefficient
  
  // Born rule probabilities
  const p0 = alpha * alpha;  // |α|²
  const p1 = beta * beta;    // |β|²

  const measure = () => {
    // Use Born rule probabilities
    const outcome = Math.random() < p0 ? "0" : "1";
    setResult(outcome);
    setState("measured");
    const key = outcome === "0" ? "zero" : "one";
    setStats((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  const reset = () => {
    setState("ready");
    setResult(null);
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>📊 Measurement: Born Rule (Basic)</h4>
        <p className="widget-description">
          Measure a superposition and observe collapse. Outcomes are governed by the Born rule.
        </p>
      </div>
      <div className="widget-content">
        {/* Display the superposition state */}
        <div className="state-display-box">
          <div className="state-equation">
            |ψ⟩ = <span className="fraction">1</span>/<span className="denominator">√2</span> (|0⟩ + |1⟩)
          </div>
          <div className="state-description">Equal superposition of computational basis states</div>
        </div>

        {/* Born rule probabilities */}
        <div className="probabilities-section">
          <div className="prob-card">
            <div className="prob-label">P(0) = |α|²</div>
            <div className="prob-value">{(p0 * 100).toFixed(1)}%</div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${p0 * 100}%`, backgroundColor: "#2d8ca8" }} />
            </div>
          </div>
          <div className="prob-card">
            <div className="prob-label">P(1) = |β|²</div>
            <div className="prob-value">{(p1 * 100).toFixed(1)}%</div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${p1 * 100}%`, backgroundColor: "#e11d48" }} />
            </div>
          </div>
        </div>

        {/* Measurement diagram */}
        <svg viewBox="0 0 120 80" className="measurement-diagram">
          {/* Pre-measurement superposition state */}
          <motion.g
            key={`pre-${state}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: state === "ready" ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <circle cx="30" cy="40" r="15" fill="#9c27b0" opacity="0.7" />
            <text x="30" y="43" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">
              |ψ⟩
            </text>
          </motion.g>

          {/* Arrow: measurement process */}
          <line x1="50" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <text x="60" y="35" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
            Measure
          </text>

          {/* Post-measurement collapsed state */}
          {result && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <circle
                cx="95"
                cy="40"
                r="15"
                fill={result === "0" ? "#2d8ca8" : "#e11d48"}
                opacity="0.8"
              />
              <text x="95" y="43" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">
                |{result}⟩
              </text>
            </motion.g>
          )}
        </svg>

        {/* Controls */}
        <div className="widget-controls">
          <button onClick={measure} disabled={state === "measured"} className="action-btn">
            Measure
          </button>
          <button onClick={reset} className="action-btn secondary">
            Reset
          </button>
        </div>

        {/* Statistics */}
        {stats.zero + stats.one > 0 && (
          <div className="stats-display">
            <div className="stat-row">
              <span>Measured |0⟩: {stats.zero}</span>
              <span>Measured |1⟩: {stats.one}</span>
            </div>
            <div className="stat-bar">
              <div
                className="stat-segment zero"
                style={{ width: `${(stats.zero / (stats.zero + stats.one)) * 100}%` }}
              />
              <div
                className="stat-segment one"
                style={{ width: `${(stats.one / (stats.zero + stats.one)) * 100}%` }}
              />
            </div>
            <div className="stat-note">
              Expected: 50% |0⟩, 50% |1⟩ | Trial count: {stats.zero + stats.one}
            </div>
          </div>
        )}
      </div>
      <p className="widget-note">
        <strong>Born Rule:</strong> For state |ψ⟩ = α|0⟩ + β|1⟩, the probability of measuring |k⟩ is P(k) = |⟨k|ψ⟩|² = |coeff|².
      </p>
    </section>
  );
}
