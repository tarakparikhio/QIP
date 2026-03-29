"use client";

import React, { useState } from "react";

interface BraKetState {
  label: string;
  ket: [number, number];
  bra: [number, number];
  description: string;
}

const states: Record<string, BraKetState> = {
  zero: {
    label: "|0⟩",
    ket: [1, 0],
    bra: [1, 0],
    description: "Ground state, spin down",
  },
  one: {
    label: "|1⟩",
    ket: [0, 1],
    bra: [0, 1],
    description: "Excited state, spin up",
  },
  plus: {
    label: "|+⟩",
    ket: [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    bra: [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    description: "Superposition (equal)",
  },
  minus: {
    label: "|-⟩",
    ket: [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
    bra: [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
    description: "Superposition (opposite phase)",
  },
};

export function BraKetNotationVisualizer() {
  const [state1, setState1] = useState<string>("zero");
  const [state2, setstate2] = useState<string>("one");

  const s1 = states[state1];
  const s2 = states[state2];

  // Inner product: ⟨ψ|φ⟩
  const innerProd =
    s1.bra[0] * s2.ket[0] + s1.bra[1] * s2.ket[1];
  const innerProdMag = Math.abs(innerProd);

  // Outer product: |ψ⟩⟨φ|
  const outerProd = [
    [s1.ket[0] * s2.bra[0], s1.ket[0] * s2.bra[1]],
    [s1.ket[1] * s2.bra[0], s1.ket[1] * s2.bra[1]],
  ];

  const formatComplex = (val: number): string => {
    const rounded = Math.abs(val) < 1e-10 ? 0 : parseFloat(val.toFixed(3));
    return rounded.toString();
  };

  const orthogonal = innerProdMag < 0.01;

  return (
    <div className="braket-main">
      <div className="braket-controls">
        <div className="state-selector">
          <label className="metric-label">Select First State |ψ⟩:</label>
          <div className="state-buttons">
            {Object.keys(states).map((s) => (
              <button
                key={s}
                className={`state-btn ${state1 === s ? "active" : ""}`}
                onClick={() => setState1(s)}
              >
                {states[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="state-selector">
          <label className="metric-label">Select Second State |φ⟩:</label>
          <div className="state-buttons">
            {Object.keys(states).map((s) => (
              <button
                key={s}
                className={`state-btn ${state2 === s ? "active" : ""}`}
                onClick={() => setstate2(s)}
              >
                {states[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="braket-displays">
        <div className="braket-section">
          <p className="metric-label">Vector Representation:</p>
          <div className="braket-vectors">
            <div className="ket-display">
              <div className="vector-header">{s1.label} (Ket)</div>
              <div className="column-vector">
                <div className="vector-component">{formatComplex(s1.ket[0])}</div>
                <div className="vector-component">{formatComplex(s1.ket[1])}</div>
              </div>
            </div>
            <div className="bra-display">
              <div className="vector-header">⟨ψ| (Bra)</div>
              <div className="row-vector">
                <div className="vector-component">{formatComplex(s1.bra[0])}</div>
                <div className="vector-component">{formatComplex(s1.bra[1])}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="braket-section">
          <p className="metric-label">Inner Product ⟨ψ|φ⟩:</p>
          <div className="inner-product">
            <div className="product-value">{formatComplex(innerProd)}</div>
            <div className={`orthogonality-status ${orthogonal ? "orthogonal" : ""}`}>
              {orthogonal ? "✓ Orthogonal" : "✗ Not Orthogonal"}
            </div>
          </div>
        </div>

        <div className="braket-section">
          <p className="metric-label">Outer Product |ψ⟩⟨φ|:</p>
          <div className="matrix-result">
            {outerProd.map((row, i) => (
              <div key={i} className="matrix-row-result">
                {row.map((val, j) => (
                  <div key={j} className="matrix-cell-result">
                    {formatComplex(val)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="state-info">
          <div className="info-box">
            <p className="info-label">{s1.label} Information:</p>
            <p className="info-text">{s1.description}</p>
          </div>
          <div className="info-box">
            <p className="info-label">{s2.label} Information:</p>
            <p className="info-text">{s2.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
