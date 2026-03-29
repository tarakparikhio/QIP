"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type BellState = "Phi+" | "Phi-" | "Psi+" | "Psi-";

const bellStates: Record<BellState, { formula: string; description: string; entangled: boolean }> = {
  "Phi+": {
    formula: "(|00⟩ + |11⟩) / √2",
    description: "Bell state Φ⁺: maximally entangled",
    entangled: true,
  },
  "Phi-": {
    formula: "(|00⟩ - |11⟩) / √2",
    description: "Bell state Φ⁻: maximally entangled",
    entangled: true,
  },
  "Psi+": {
    formula: "(|01⟩ + |10⟩) / √2",
    description: "Bell state Ψ⁺: maximally entangled",
    entangled: true,
  },
  "Psi-": {
    formula: "(|01⟩ - |10⟩) / √2",
    description: "Bell state Ψ⁻: maximally entangled",
    entangled: true,
  },
};

export function BellStateGenerator() {
  const [bellState, setBellState] = useState<BellState>("Phi+");
  const [measure1, setMeasure1] = useState(false);
  const [measure2, setMeasure2] = useState(false);
  const [result1, setResult1] = useState<0 | 1 | null>(null);
  const [result2, setResult2] = useState<0 | 1 | null>(null);

  const handleMeasureQubit1 = () => {
    const outcome = Math.random() < 0.5 ? (0 as const) : (1 as const);
    setResult1(outcome);
    setMeasure1(true);
  };

  const handleMeasureQubit2 = () => {
    let outcome: 0 | 1;

    if (!measure1) {
      outcome = Math.random() < 0.5 ? 0 : 1;
    } else {
      if (bellState === "Phi+" || bellState === "Phi-") {
        outcome = result1!;
      } else {
        outcome = result1! === 0 ? 1 : 0;
      }
    }

    setResult2(outcome);
    setMeasure2(true);
  };

  const resetMeasurement = () => {
    setMeasure1(false);
    setMeasure2(false);
    setResult1(null);
    setResult2(null);
  };

  const state = bellStates[bellState];

  return (
    <div className="bell-state-main">
      <div className="bell-controls">
        <label className="metric-label">Select Bell State:</label>
        <div className="bell-buttons">
          {Object.entries(bellStates).map(([key, val]) => (
            <button
              key={key}
              className={`bell-btn ${bellState === key ? "active" : ""}`}
              onClick={() => setBellState(key as BellState)}
            >
              <div className="bell-label">{key}</div>
              <div className="bell-formula">{val.formula}</div>
            </button>
          ))}
        </div>

        <div className="bell-description">
          <p className="metric-label">{bellState}:</p>
          <p className="description-text">{state.description}</p>
        </div>
      </div>

      <div className="entanglement-visualization">
        <div className="state-formula">
          <p className="metric-label">Quantum State:</p>
          <div className="formula-box">{state.formula}</div>
        </div>

        <div className="correlation-info">
          <p className="metric-label">Entanglement Properties:</p>
          <div className="property-list">
            <div className="property">
              <span className="prop-name">Entangled:</span>
              <span className="prop-value">✓ Yes</span>
            </div>
            <div className="property">
              <span className="prop-name">Correlation:</span>
              <span className="prop-value">
                {bellState === "Phi+" || bellState === "Phi-"
                  ? "Perfect Correlation"
                  : "Perfect Anti-Correlation"}
              </span>
            </div>
            <div className="property">
              <span className="prop-name">Entanglement Entropy:</span>
              <span className="prop-value">1 ebit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="measurement-simulation">
        <p className="metric-label">Measurement Experiment:</p>

        <div className="qubit-measurements">
          <div className="qubit-measure">
            <div className="qubit-header">Qubit 1</div>
            {!measure1 ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="measure-btn" onClick={handleMeasureQubit1}>
                  Measure Q1
                </button>
              </motion.div>
            ) : (
              <div className="measurement-result">
                <div className="result-box">Result: |{result1}⟩</div>
              </div>
            )}
          </div>

          <div className="arrow">→</div>

          <div className="qubit-measure">
            <div className="qubit-header">Qubit 2</div>
            {!measure1 ? (
              <div className="disabled-btn">Measure after Q1</div>
            ) : !measure2 ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="measure-btn" onClick={handleMeasureQubit2}>
                  Measure Q2
                </button>
              </motion.div>
            ) : (
              <div className="measurement-result">
                <div className={`result-box` + (result1 === result2 ? " correlated" : " anticorrelated")}>
                  Result: |{result2}⟩
                </div>
              </div>
            )}
          </div>
        </div>

        {measure1 && measure2 && (
          <div className="outcome-analysis">
            <div className="correlation-verdict">
              <p className="verdict-label">Measurement Correlation:</p>
              <p className="verdict-text">
                {result1 === result2
                  ? `Q1 = Q2 (${result1 === 0 ? "both 0" : "both 1"})`
                  : `Q1 ≠ Q2 (opposite values)`}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="reset-btn" onClick={resetMeasurement}>
                Reset
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
