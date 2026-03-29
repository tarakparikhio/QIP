"use client";

import React, { useState } from "react";

type Function = "balanced" | "constant";

export function QuantumParallelismDemo() {
  const [func, setFunc] = useState<Function>("balanced");
  const [nQubits, setNQubits] = useState<number>(2);

  const computeClassical = () => {
    if (func === "constant") return 2;
    return Math.pow(2, nQubits);
  };

  const computeQuantum = 1;

  const classicalEvals = computeClassical();
  const quantumEvals = computeQuantum;
  const speedup = classicalEvals / quantumEvals;

  const basisStates = Array.from({ length: Math.pow(2, nQubits) }, (_, i) =>
    i.toString(2).padStart(nQubits, "0")
  );

  const functionOutput = (input: string): string => {
    const bits = input.split("").map(Number);
    if (func === "constant") {
      return "0";
    }
    const parity = bits.reduce((a, b) => a + b, 0) % 2;
    return parity.toString();
  };

  return (
    <div className="quantum-parallelism-main">
      <div className="parallelism-config">
        <div className="function-selector">
          <label className="metric-label">Select Function:</label>
          <div className="function-buttons">
            <button
              className={`func-btn ${func === "constant" ? "active" : ""}`}
              onClick={() => setFunc("constant")}
            >
              <div className="func-name">Constant</div>
              <div className="func-desc">Always returns 0</div>
            </button>
            <button
              className={`func-btn ${func === "balanced" ? "active" : ""}`}
              onClick={() => setFunc("balanced")}
            >
              <div className="func-name">Balanced</div>
              <div className="func-desc">Parity function</div>
            </button>
          </div>
        </div>

        <div className="qubit-count">
          <label className="metric-label">Number of Input Qubits ({nQubits}):</label>
          <input
            type="range"
            min="2"
            max="4"
            value={nQubits}
            onChange={(e) => setNQubits(parseInt(e.target.value))}
            className="qubit-slider"
          />
          <div className="qubit-values">
            {[2, 3, 4].map((n) => (
              <span key={n} className={n === nQubits ? "active" : ""}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="parallelism-comparison">
        <div className="classical-execution">
          <p className="metric-label">Classical Computation:</p>
          <div className="execution-box">
            <p className="execution-label">Algorithm requires:</p>
            <div className="query-list">
              {Array.from({ length: classicalEvals }, (_, i) => (
                <div key={i} className="query-item">
                  Query {i + 1}: f({i.toString(2).padStart(nQubits, "0")})
                </div>
              ))}
            </div>
            <div className="summary">
              <strong>Total Queries:</strong> {classicalEvals}
            </div>
          </div>
        </div>

        <div className="quantum-execution">
          <p className="metric-label">Quantum Computation:</p>
          <div className="execution-box quantum">
            <p className="execution-label">Algorithm requires:</p>
            <div className="superposition-state">
              <p className="superposition-formula">
                1/√{Math.pow(2, nQubits)} Σ|x⟩ for all x
              </p>
              <p className="superposition-desc">Evaluates f(x) for ALL values simultaneously!</p>
            </div>
            <div className="summary">
              <strong>Total Queries:</strong> {quantumEvals} (Parallel Evaluation)
            </div>
          </div>
        </div>
      </div>

      <div className="speedup-analysis">
        <p className="metric-label">Computational Advantage:</p>
        <div className="speedup-grid">
          <div className="advantage-card">
            <div className="card-label">Classical Evaluations</div>
            <div className="card-value">{classicalEvals}</div>
          </div>
          <div className="advantage-card">
            <div className="card-label">Quantum Evaluations</div>
            <div className="card-value quantum">{quantumEvals}</div>
          </div>
          <div className="advantage-card speedup">
            <div className="card-label">Speedup × {speedup}</div>
            <div className="card-value">{speedup}x faster</div>
          </div>
        </div>

        <div className="parallelism-note">
          <p className="metric-label">Key Insight:</p>
          <p className="note-text">
            Quantum superposition allows evaluation of f(x) for all possible inputs
            simultaneously in a single quantum query, achieving exponential speedup
            compared to classical algorithms.
          </p>
        </div>
      </div>

      <div className="truth-table">
        <p className="metric-label">Function Truth Table:</p>
        <div className="truth-table-grid">
          <div className="tt-header">Input</div>
          <div className="tt-header">Output</div>
          {basisStates.map((input) => (
            <React.Fragment key={input}>
              <div className="tt-cell input">{input}</div>
              <div className="tt-cell output">{functionOutput(input)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
