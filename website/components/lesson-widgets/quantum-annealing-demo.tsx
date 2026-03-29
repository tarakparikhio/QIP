"use client";

import { useMemo, useState } from "react";

export function QuantumAnnealingDemo() {
  const [s, setS] = useState(0.3);
  const [gapMin, setGapMin] = useState(0.25);

  const weights = useMemo(() => {
    return {
      h0: 1 - s,
      hp: s,
    };
  }, [s]);

  const successHeuristic = useMemo(() => {
    // Intuition-only heuristic: larger gap and smoother schedule improve success.
    const val = Math.max(0, Math.min(1, 0.2 + 0.7 * gapMin + 0.1 * (1 - Math.abs(0.5 - s) * 2)));
    return val;
  }, [gapMin, s]);

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>Quantum Annealing Schedule</h4>
        <p className="widget-description">
          Interpolate H(s) = (1-s)H0 + sHp and inspect how schedule and gap impact solution quality.
        </p>
      </div>

      <div className="widget-content">
        <p className="metric-label">Schedule progress s: {s.toFixed(2)}</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={s}
          onChange={(e) => setS(Number(e.target.value))}
          className="evolution-slider"
        />

        <p className="metric-label">Minimum spectral gap (normalized): {gapMin.toFixed(2)}</p>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.01"
          value={gapMin}
          onChange={(e) => setGapMin(Number(e.target.value))}
          className="evolution-slider"
        />

        <div className="ham-grid" style={{ marginTop: "1rem" }}>
          <div className="ham-card">
            <p className="metric-label">Weight on H0</p>
            <p className="ham-value">{weights.h0.toFixed(2)}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">Weight on Hp</p>
            <p className="ham-value">{weights.hp.toFixed(2)}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">Success heuristic</p>
            <p className="ham-value">{(successHeuristic * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
