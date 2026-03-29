"use client";

import React, { useState } from "react";

interface Complex {
  real: number;
  imag: number;
}

type MatrixValue = number | Complex;

interface OperatorData {
  name: string;
  matrix: MatrixValue[][];
  eigenvalues: number[];
  trace: number | Complex;
  determinant: number | Complex;
  hermitian: boolean;
}

const operatorLibrary: Record<string, OperatorData> = {
  X: {
    name: "Pauli X (NOT gate)",
    matrix: [
      [0, 1],
      [1, 0],
    ],
    eigenvalues: [1, -1],
    trace: 0,
    determinant: -1,
    hermitian: true,
  },
  Y: {
    name: "Pauli Y",
    matrix: [
      [{ real: 0, imag: 0 }, { real: 0, imag: -1 }],
      [{ real: 0, imag: 1 }, { real: 0, imag: 0 }],
    ],
    eigenvalues: [1, -1],
    trace: { real: 0, imag: 0 },
    determinant: { real: -1, imag: 0 },
    hermitian: true,
  },
  Z: {
    name: "Pauli Z",
    matrix: [
      [1, 0],
      [0, -1],
    ],
    eigenvalues: [1, -1],
    trace: 0,
    determinant: -1,
    hermitian: true,
  },
  H: {
    name: "Hadamard",
    matrix: [
      [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
      [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
    ],
    eigenvalues: [1, -1],
    trace: 0,
    determinant: -1,
    hermitian: true,
  },
};

function isComplex(val: MatrixValue): val is Complex {
  return typeof val === "object" && val !== null && "real" in val;
}

function formatNum(val: number): string {
  if (Math.abs(val) < 1e-10) return "0";
  const rounded = parseFloat(val.toFixed(3));
  if (rounded === 0) return "0";
  return rounded.toString();
}

function formatComplex(val: MatrixValue): string {
  if (isComplex(val)) {
    const { real, imag } = val;
    const realStr = formatNum(real);
    const imagStr = formatNum(Math.abs(imag));
    
    if (Math.abs(real) < 1e-10 && Math.abs(imag) < 1e-10) return "0";
    if (Math.abs(real) < 1e-10) return `${imag > 0 ? "" : "-"}${imagStr}i`;
    if (Math.abs(imag) < 1e-10) return realStr;
    
    return `${realStr} ${imag > 0 ? "+" : "-"} ${imagStr}i`;
  }
  return formatNum(val);
}

export function OperatorMatrixExplorer() {
  const [operator, setOperator] = useState<string>("X");

  const op = operatorLibrary[operator];

  return (
    <div className="operator-explorer-main">
      <div className="operator-selector-group">
        <label className="metric-label">Select Operator:</label>
        <div className="operator-grid">
          {Object.keys(operatorLibrary).map((key) => (
            <button
              key={key}
              className={`operator-card-btn ${operator === key ? "active" : ""}`}
              onClick={() => setOperator(key)}
            >
              <div className="op-label">{key}</div>
              <div className="op-name">{operatorLibrary[key].name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="operator-details">
        <div className="detail-section">
          <p className="metric-label">Matrix Representation:</p>
          <div className="matrix-display-large">
            {op.matrix.map((row, i) => (
              <div key={i} className="matrix-row-result">
                {row.map((val, j) => (
                  <div key={j} className="matrix-cell-result matrix-cell-large">
                    {formatComplex(val)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="properties-grid">
          <div className="property-card">
            <div className="property-label">Trace</div>
            <div className="property-value">{formatComplex(op.trace)}</div>
            <div className="property-note">Sum of diagonal elements</div>
          </div>

          <div className="property-card">
            <div className="property-label">Determinant</div>
            <div className="property-value">{formatComplex(op.determinant)}</div>
            <div className="property-note">Product of eigenvalues</div>
          </div>

          <div className="property-card">
            <div className="property-label">Hermitian</div>
            <div className="property-value">{op.hermitian ? "✓ Yes" : "✗ No"}</div>
            <div className="property-note">Equal to its conjugate transpose</div>
          </div>

          <div className="property-card">
            <div className="property-label">Observable</div>
            <div className="property-value">{op.hermitian ? "✓ Yes" : "✗ No"}</div>
            <div className="property-note">Can be measured in quantum mechanics</div>
          </div>
        </div>

        <div className="spectral-section">
          <p className="metric-label">Eigenvalue Spectrum:</p>
          <div className="eigenvalue-display">
            {op.eigenvalues.map((eig, idx) => (
              <div key={idx} className="eigenvalue-badge">
                <div className="eigen-label">λ{idx + 1}</div>
                <div className="eigen-value">{formatNum(eig)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-panel">
          <p className="info-title">{op.name}</p>
          <p className="info-description">
            {operator === "X" && "Flips qubit between |0⟩ and |1⟩ states"}
            {operator === "Y" && "Rotation around Y-axis with phase change"}
            {operator === "Z" && "Adds phase to |1⟩ state without changing amplitudes"}
            {operator === "H" && "Creates uniform superposition of basis states"}
          </p>
        </div>
      </div>
    </div>
  );
}
