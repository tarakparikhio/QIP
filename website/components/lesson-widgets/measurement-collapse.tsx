"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Lesson3MeasurementCollapse() {
  const [state, setState] = useState<"ready" | "measured">("ready");
  const [result, setResult] = useState<"0" | "1" | null>(null);
  const [stats, setStats] = useState({ zero: 0, one: 0 });
  
  // Amplitude inputs: |ψ⟩ = α|0⟩ + β|1⟩
  const [alphaReal, setAlphaReal] = useState(1 / Math.sqrt(2));
  const [alphaThetaDeg, setAlphaTheta] = useState(0); // phase of α (simplified)
  const [betaReal, setBetaReal] = useState(1 / Math.sqrt(2));
  const [betaThetaDeg, setBetaTheta] = useState(0); // phase of β
  
  // Calculate probabilities using Born rule: P(k) = |⟨k|ψ⟩|²
  const alphaSquared = alphaReal * alphaReal; // |α|² (ignoring phase for measurement probability)
  const betaSquared = betaReal * betaReal;    // |β|²
  const normalization = alphaSquared + betaSquared;
  const p0 = normalization > 1e-10 ? alphaSquared / normalization : 0.5;
  const p1 = normalization > 1e-10 ? betaSquared / normalization : 0.5;

  const measure = () => {
    // Use Born rule probabilities for outcome
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
  
  // Format complex number display
  const formatAmp = (real: number, theta: number) => {
    const rad = (theta * Math.PI) / 180;
    const imag = real * Math.sin(rad);
    const realPart = real * Math.cos(rad);
    
    const realStr = Math.abs(realPart) < 1e-10 ? "0" : realPart.toFixed(2);
    const imagStr = Math.abs(imag) < 1e-10 ? "0" : Math.abs(imag).toFixed(2);
    
    if (Math.abs(imag) < 1e-10) return realStr;
    if (Math.abs(realPart) < 1e-10) return `${imag > 0 ? "" : "-"}${imagStr}i`;
    return `${realStr} ${imag > 0 ? "+" : "-"} ${imagStr}i`;
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>📊 Measurement Collapse</h4>
        <p className="widget-description">Prepare a superposition state |ψ⟩ = α|0⟩ + β|1⟩ and measure it.</p>
      </div>
      <div className="widget-content">
        {/* Amplitude controls */}
        <div className="amplitude-controls">
          <div className="amplitude-group">
            <label>α (coefficient of |0⟩): |α| = {alphaReal.toFixed(2)}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={alphaReal}
              onChange={(e) => setAlphaReal(parseFloat(e.target.value))}
              className="slider"
            />
            <label className="phase-label">Phase: {alphaThetaDeg}°</label>
            <input
              type="range"
              min="0"
              max="360"
              step="10"
              value={alphaThetaDeg}
              onChange={(e) => setAlphaTheta(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="amplitude-display">α = {formatAmp(alphaReal, alphaThetaDeg)}</div>
          </div>
          
          <div className="amplitude-group">
            <label>β (coefficient of |1⟩): |β| = {betaReal.toFixed(2)}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={betaReal}
              onChange={(e) => setBetaReal(parseFloat(e.target.value))}
              className="slider"
            />
            <label className="phase-label">Phase: {betaThetaDeg}°</label>
            <input
              type="range"
              min="0"
              max="360"
              step="10"
              value={betaThetaDeg}
              onChange={(e) => setBetaTheta(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="amplitude-display">β = {formatAmp(betaReal, betaThetaDeg)}</div>
          </div>
        </div>
        
        {/* Born rule probabilities display */}
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
        
        <svg viewBox="0 0 120 80" className="measurement-diagram">
          {/* Pre-measurement state */}
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

          {/* Arrow */}
          <line x1="50" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />

          {/* Post-measurement state */}
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

        <div className="widget-controls">
          <button onClick={measure} disabled={state === "measured"} className="action-btn">
            Measure
          </button>
          <button onClick={reset} className="action-btn secondary">
            Reset
          </button>
        </div>

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
          </div>
        )}
      </div>
      <p className="widget-note">
        The Born rule dictates measurement outcome probabilities: P(0) = |α|² and P(1) = |β|². Adjust the amplitudes above to see how measurement probabilities change.
      </p>
    </section>
  );
}
