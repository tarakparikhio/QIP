"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type OperatorType = "x" | "y" | "z" | "hadamard";

const operators: Record<OperatorType, { name: string; eigenvalues: number[]; eigenstates: string[] }> = {
  x: {
    name: "Pauli X",
    eigenvalues: [1, -1],
    eigenstates: ["|+⟩", "|-⟩"],
  },
  y: {
    name: "Pauli Y",
    eigenvalues: [1, -1],
    eigenstates: ["|i⟩", "|-i⟩"],
  },
  z: {
    name: "Pauli Z",
    eigenvalues: [1, -1],
    eigenstates: ["|0⟩", "|1⟩"],
  },
  hadamard: {
    name: "Hadamard",
    eigenvalues: [1, -1],
    eigenstates: ["|+⟩ + |0⟩", "|+⟩ - |0⟩"],
  },
};

export function Lesson15EigenstateAnalyzer() {
  const [operator, setOperator] = useState<OperatorType>("z");
  const [measureState, setMeasureState] = useState(false);
  const [measuredEigenvalue, setMeasuredEigenvalue] = useState<number | null>(null);

  const op = operators[operator];

  const handleMeasure = () => {
    const randomIdx = Math.random() < 0.5 ? 0 : 1;
    setMeasuredEigenvalue(op.eigenvalues[randomIdx]);
    setMeasureState(true);
  };

  const handleReset = () => {
    setMeasureState(false);
    setMeasuredEigenvalue(null);
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔍 Eigenstates & Eigenvalues</h4>
        <p className="widget-description">
          Explore eigendecomposition of quantum operators.
        </p>
      </div>

      <div className="widget-content">
        <div className="operator-selector">
          <p className="metric-label">Operator:</p>
          <div className="op-buttons">
            {(["x", "y", "z", "hadamard"] as const).map((op) => (
              <motion.div key={op} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => {
                    setOperator(op);
                    handleReset();
                  }}
                  className={`op-btn ${operator === op ? "active" : ""}`}
                >
                  {operators[op].name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="eigenstate-display">
          <div className="spectral-data">
            <p className="metric-label">Spectral Decomposition:</p>
            {op.eigenvalues.map((eig, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
              >
                <div className="eigenstate-card">
                  <div className="eigen-equation">
                    λ<sub>{idx + 1}</sub> = {eig} &nbsp; |ψ<sub>{idx + 1}</sub>⟩ = {op.eigenstates[idx]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="measurement-section">
            <p className="metric-label">Measure in {"" + op.name} Basis:</p>
            <motion.div
              whileHover={!measureState ? { scale: 1.05 } : {}}
              whileTap={!measureState ? { scale: 0.95 } : {}}
            >
              <button
                onClick={handleMeasure}
                className={`action-btn ${measureState ? "disabled" : ""}`}
                disabled={measureState}
              >
                {measureState ? "Measured" : "Click to Measure"}
              </button>
            </motion.div>

            {measureState && (
              <div className="measurement-result">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <p className="result-title">Measurement Result:</p>
                  <div className="result-value">λ = {measuredEigenvalue}</div>
                  <p className="result-note">
                    Post-measurement collapses to the corresponding eigenstate.
                  </p>
                  <button onClick={handleReset} className="reset-btn">
                    Reset
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        <div className="eigenstate-info">
          <p className="body-copy">
            <strong>Key Concept:</strong> Every quantum operator has eigenstates with corresponding eigenvalues.
            Measuring in the eigenbasis always yields one of the eigenvalues.
          </p>
        </div>
      </div>

      <p className="widget-note">
        Select an operator and click "Measure" to see its eigenvalues and eigenstates.
      </p>
    </section>
  );
}
