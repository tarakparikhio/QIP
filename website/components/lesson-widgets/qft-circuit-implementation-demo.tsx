"use client";

import { useMemo, useState } from "react";

export function QFTCircuitImplementationDemo() {
  const [qubits, setQubits] = useState(3);
  const [approximate, setApproximate] = useState(false);

  const layers = useMemo(() => {
    let hadamards = qubits;
    let controlledPhases = (qubits * (qubits - 1)) / 2;
    if (approximate) {
      controlledPhases = Math.floor(controlledPhases * 0.5);
    }
    const swaps = Math.floor(qubits / 2);
    return { hadamards, controlledPhases, swaps, total: hadamards + controlledPhases + swaps };
  }, [qubits, approximate]);

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>QFT Circuit Builder</h4>
        <p className="widget-description">
          Decompose QFT into Hadamards, controlled phase rotations, and final bit-reversal swaps.
        </p>
      </div>

      <div className="widget-content">
        <p className="metric-label">Qubit count n: {qubits}</p>
        <input
          type="range"
          min="2"
          max="6"
          step="1"
          value={qubits}
          onChange={(e) => setQubits(Number(e.target.value))}
          className="evolution-slider"
        />

        <div style={{ marginTop: "0.75rem" }}>
          <label>
            <input
              type="checkbox"
              checked={approximate}
              onChange={(e) => setApproximate(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            Use approximate QFT (drop small-angle controlled phases)
          </label>
        </div>

        <div className="ham-grid" style={{ marginTop: "1rem" }}>
          <div className="ham-card">
            <p className="metric-label">H gates</p>
            <p className="ham-value">{layers.hadamards}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">CP gates</p>
            <p className="ham-value">{layers.controlledPhases}</p>
          </div>
          <div className="ham-card">
            <p className="metric-label">SWAP gates</p>
            <p className="ham-value">{layers.swaps}</p>
          </div>
        </div>

        <div className="math-block" style={{ marginTop: "1rem" }}>
          <p>
            Exact two-qubit decomposition: <strong>SWAP (H ⊗ I) CP(pi/2) (I ⊗ H)</strong>
          </p>
          <p>
            For n qubits, controlled phase count scales as <strong>n(n-1)/2</strong>.
          </p>
          <p>
            Total gate count (rough): <strong>{layers.total}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
