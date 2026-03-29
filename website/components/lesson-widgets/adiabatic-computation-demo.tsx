"use client";

import { useMemo, useState } from "react";

export function AdiabaticComputationDemo() {
  const [runtimeT, setRuntimeT] = useState(8);
  const [gapMin, setGapMin] = useState(0.3);

  const requiredScale = useMemo(() => 1 / (gapMin * gapMin), [gapMin]);
  const adiabaticRatio = runtimeT / requiredScale;
  const status = adiabaticRatio >= 1 ? "Likely adiabatic" : "Too fast (excitation risk)";

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>Adiabatic Condition Checker</h4>
        <p className="widget-description">
          Explore the gap-dependent runtime rule T \u226B const / g_min^2 for adiabatic evolution.
        </p>
      </div>

      <div className="widget-content">
        <p className="metric-label">Runtime T: {runtimeT.toFixed(1)}</p>
        <input
          type="range"
          min="1"
          max="25"
          step="0.1"
          value={runtimeT}
          onChange={(e) => setRuntimeT(Number(e.target.value))}
          className="evolution-slider"
        />

        <p className="metric-label">Minimum gap g_min: {gapMin.toFixed(2)}</p>
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
            <p className="metric-label">1 / g_min^2</p>
            <p className="ham-value">{requiredScale.toFixed(2)}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">T / (1/g_min^2)</p>
            <p className="ham-value">{adiabaticRatio.toFixed(2)}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">Regime</p>
            <p className="ham-value">{status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
