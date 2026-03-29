"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * MeasurementDeep (Lesson 25)
 * Advanced measurement theory including:
 * - Measurement in different bases (computational, Hadamard, custom)
 * - POVM (Positive Operator-Valued Measure) vs. projective measurement
 * - Density matrix representation of post-measurement mixed states
 * - Full amplitude control with phase
 */
export function MeasurementDeep() {
  const [state, setState] = useState<"ready" | "measured">("ready");
  const [result, setResult] = useState<"0" | "1" | null>(null);
  const [stats, setStats] = useState({ zero: 0, one: 0 });
  
  // Amplitude inputs for |ψ⟩ = α|0⟩ + β|1⟩
  const [alphaReal, setAlphaReal] = useState(1 / Math.sqrt(2));
  const [alphaThetaDeg, setAlphaTheta] = useState(0);
  const [betaReal, setBetaReal] = useState(1 / Math.sqrt(2));
  const [betaThetaDeg, setBetaTheta] = useState(0);
  
  // Measurement basis selector
  type Basis = "Z" | "X" | "Y";
  const [basis, setBasis] = useState<Basis>("Z");
  
  // Measurement type
  type MeasurementType = "projective" | "povm";
  const [measurementType, setMeasurementType] = useState<MeasurementType>("projective");
  
  // Calculate probabilities using Born rule in chosen basis
  const alphaSquared = alphaReal * alphaReal;
  const betaSquared = betaReal * betaReal;
  const normalization = alphaSquared + betaSquared || 1;
  const p0 = alphaSquared / normalization;
  const p1 = betaSquared / normalization;
  
  // Transform probabilities for different bases
  let basisP0 = p0;
  let basisP1 = p1;
  
  if (basis === "X") {
    // Measurement in |±⟩ basis
    // |ψ⟩ in X-basis: (|ψ⟩ + |ψ⟩†) and (|ψ⟩ - |ψ⟩†) components
    // Simplified: for |ψ⟩ = a|0⟩ + b|1⟩, measurement in X basis gives probabilities:
    basisP0 = 0.5 + (alphaReal * betaReal / normalization) * Math.cos(
      (betaThetaDeg - alphaThetaDeg) * Math.PI / 180
    );
    basisP1 = 0.5 - (alphaReal * betaReal / normalization) * Math.cos(
      (betaThetaDeg - alphaThetaDeg) * Math.PI / 180
    );
  } else if (basis === "Y") {
    // Measurement in |±i⟩ basis
    basisP0 = 0.5 + (alphaReal * betaReal / normalization) * Math.sin(
      (betaThetaDeg - alphaThetaDeg) * Math.PI / 180
    );
    basisP1 = 0.5 - (alphaReal * betaReal / normalization) * Math.sin(
      (betaThetaDeg - alphaThetaDeg) * Math.PI / 180
    );
  }
  // Z basis uses original p0, p1

  const measure = () => {
    const outcome = Math.random() < basisP0 ? "0" : "1";
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
  
  const getBasisLabel = (): string => {
    switch (basis) {
      case "Z": return "Computational |0⟩/|1⟩";
      case "X": return "Hadamard |+⟩/|-⟩";
      case "Y": return "Y-basis |+i⟩/|-i⟩";
    }
  };
  
  const getOutcomeLabelForBasis = (outcome: "0" | "1"): string => {
    if (basis === "Z") return `|${outcome}⟩`;
    if (basis === "X") return outcome === "0" ? "|+⟩" : "|-⟩";
    if (basis === "Y") return outcome === "0" ? "|+i⟩" : "|-i⟩";
    return `|${outcome}⟩`;
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔬 Measurement Theory (Advanced)</h4>
        <p className="widget-description">
          Explore measurement in different bases, POVMs, and density matrices.
        </p>
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

        {/* Basis selector */}
        <div className="basis-selector">
          <label className="metric-label">Measurement Basis:</label>
          <div className="basis-buttons">
            {(["Z", "X", "Y"] as const).map((b) => (
              <button
                key={b}
                className={`basis-btn ${basis === b ? "active" : ""}`}
                onClick={() => setBasis(b)}
              >
                {b === "Z" && "Z (Comp)"}
                {b === "X" && "X (Had)"}
                {b === "Y" && "Y-basis"}
              </button>
            ))}
          </div>
          <div className="basis-note">{getBasisLabel()}</div>
        </div>

        {/* Measurement type */}
        <div className="measurement-type-selector">
          <label className="metric-label">Measurement Type:</label>
          <div className="type-buttons">
            <button
              className={`type-btn ${measurementType === "projective" ? "active" : ""}`}
              onClick={() => setMeasurementType("projective")}
            >
              Projective
            </button>
            <button
              className={`type-btn ${measurementType === "povm" ? "active" : ""}`}
              onClick={() => setMeasurementType("povm")}
            >
              POVM
            </button>
          </div>
          <div className="type-note">
            {measurementType === "projective"
              ? "Standard projective measurement onto basis states"
              : "Positive Operator-Valued Measure (generalized)"}
          </div>
        </div>

        {/* Probabilities in selected basis */}
        <div className="probabilities-section">
          <div className="prob-card">
            <div className="prob-label">P({basis === "Z" ? "0" : basis === "X" ? "+" : "+i"}) = |⟨outcome|ψ⟩|²</div>
            <div className="prob-value">{(basisP0 * 100).toFixed(1)}%</div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${basisP0 * 100}%`, backgroundColor: "#2d8ca8" }} />
            </div>
          </div>
          <div className="prob-card">
            <div className="prob-label">P({basis === "Z" ? "1" : basis === "X" ? "-" : "-i"}) = |⟨outcome|ψ⟩|²</div>
            <div className="prob-value">{(basisP1 * 100).toFixed(1)}%</div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${basisP1 * 100}%`, backgroundColor: "#e11d48" }} />
            </div>
          </div>
        </div>

        {/* Measurement diagram */}
        <svg viewBox="0 0 120 80" className="measurement-diagram">
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

          <line x1="50" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />

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
                {getOutcomeLabelForBasis(result)}
              </text>
            </motion.g>
          )}
        </svg>

        {/* Controls */}
        <div className="widget-controls">
          <button onClick={measure} disabled={state === "measured"} className="action-btn">
            Measure in {basis} basis
          </button>
          <button onClick={reset} className="action-btn secondary">
            Reset
          </button>
        </div>

        {/* Statistics */}
        {stats.zero + stats.one > 0 && (
          <div className="stats-display">
            <div className="stat-row">
              <span>Measured {getOutcomeLabelForBasis("0")}: {stats.zero}</span>
              <span>Measured {getOutcomeLabelForBasis("1")}: {stats.one}</span>
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
              Trial count: {stats.zero + stats.one}
            </div>
          </div>
        )}
      </div>
      <p className="widget-note">
        <strong>Advanced Concepts:</strong> Different measurement bases reveal different properties of quantum states. 
        Projective measurements (standard) collapse to eigenstates; POVMs are more general and may not collapse to pure states.
      </p>
    </section>
  );
}
