"use client";

import React, { useState } from "react";

interface Operator {
  name: string;
  matrix: number[][];
}

const operators: Record<string, Operator> = {
  X: {
    name: "X (Pauli X)",
    matrix: [
      [0, 1],
      [1, 0],
    ],
  },
  Y: {
    name: "Y (Pauli Y)",
    matrix: [
      [0, -1],
      [1, 0],
    ],
  },
  Z: {
    name: "Z (Pauli Z)",
    matrix: [
      [1, 0],
      [0, -1],
    ],
  },
  H: {
    name: "H (Hadamard)",
    matrix: [
      [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
      [1 / Math.sqrt(2), -1 / Math.sqrt(2)],
    ],
  },
};

function multiplyMatrices(
  a: number[][],
  b: number[][]
): number[][] {
  const result: number[][] = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function subtractMatrices(
  a: number[][],
  b: number[][]
): number[][] {
  return [
    [a[0][0] - b[0][0], a[0][1] - b[0][1]],
    [a[1][0] - b[1][0], a[1][1] - b[1][1]],
  ];
}

function formatComplex(real: number, imag: number): string {
  const r = Math.abs(real) < 1e-10 ? 0 : parseFloat(real.toFixed(3));
  const i = Math.abs(imag) < 1e-10 ? 0 : parseFloat(imag.toFixed(3));

  if (r === 0 && i === 0) return "0";
  if (i === 0) return r.toString();
  if (r === 0) return `${i}i`;
  const sign = i > 0 ? "+" : "";
  return `${r} ${sign} ${i}i`;
}

export function CommutatorCalculator() {
  const [opA, setOpA] = useState<string>("X");
  const [opB, setOpB] = useState<string>("Y");

  const matrixA = operators[opA].matrix;
  const matrixB = operators[opB].matrix;

  const AB = multiplyMatrices(matrixA, matrixB);
  const BA = multiplyMatrices(matrixB, matrixA);
  const commutator = subtractMatrices(AB, BA);

  const isZero =
    Math.abs(commutator[0][0]) < 1e-10 &&
    Math.abs(commutator[0][1]) < 1e-10 &&
    Math.abs(commutator[1][0]) < 1e-10 &&
    Math.abs(commutator[1][1]) < 1e-10;

  return (
    <div className="commutator-main">
      <div className="commutator-controls">
        <div className="operator-selector">
          <label className="metric-label">Select Operator A:</label>
          <div className="operator-buttons">
            {Object.keys(operators).map((op) => (
              <button
                key={op}
                className={`operator-btn ${opA === op ? "active" : ""}`}
                onClick={() => setOpA(op)}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="operator-selector">
          <label className="metric-label">Select Operator B:</label>
          <div className="operator-buttons">
            {Object.keys(operators).map((op) => (
              <button
                key={op}
                className={`operator-btn ${opB === op ? "active" : ""}`}
                onClick={() => setOpB(op)}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="commutator-result">
        <div className="result-section">
          <p className="metric-label">[A,B] = AB - BA</p>
          <div className="matrix-result">
            {commutator.map((row, i) => (
              <div key={i} className="matrix-row-result">
                {row.map((val, j) => (
                  <div key={j} className="matrix-cell-result">
                    {formatComplex(val, 0)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`commutation-status ${isZero ? "commutes" : "anticommutes"}`}>
          <p className="metric-label">Commutation Status:</p>
          <p className="status-text">
            {isZero
              ? "✓ Operators COMMUTE [A,B] = 0"
              : "✗ Operators DO NOT COMMUTE [A,B] ≠ 0"}
          </p>
          {isZero && (
            <p className="status-note">
              Observable properties can be simultaneously measured
            </p>
          )}
          {!isZero && (
            <p className="status-note">
              Observable properties cannot be simultaneously determined
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
