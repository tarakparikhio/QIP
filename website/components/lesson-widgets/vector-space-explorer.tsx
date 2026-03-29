"use client";

import React, { useState } from "react";

interface Vector {
  label: string;
  components: [number, number];
}

const vectors: Record<string, Vector> = {
  v1: {
    label: "|ψ₁⟩",
    components: [1, 0],
  },
  v2: {
    label: "|ψ₂⟩",
    components: [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
  },
  v3: {
    label: "|ψ₃⟩",
    components: [0, 1],
  },
};

function calculateNorm(vec: [number, number]): number {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
}

function calculateInnerProduct(
  v1: [number, number],
  v2: [number, number]
): number {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

function formatNum(val: number): string {
  const rounded = Math.abs(val) < 1e-10 ? 0 : parseFloat(val.toFixed(3));
  return rounded.toString();
}

export function VectorSpaceExplorer() {
  const [selectedVec1, setSelectedVec1] = useState<string>("v1");
  const [selectedVec2, setSelectedVec2] = useState<string>("v2");

  const vec1 = vectors[selectedVec1].components;
  const vec2 = vectors[selectedVec2].components;

  const norm1 = calculateNorm(vec1);
  const norm2 = calculateNorm(vec2);

  const innerProd = calculateInnerProduct(vec1, vec2);
  const orthogonal = Math.abs(innerProd) < 0.01;

  const normalized1: [number, number] = [
    vec1[0] / norm1,
    vec1[1] / norm1,
  ];
  const normalized2: [number, number] = [
    vec2[0] / norm2,
    vec2[1] / norm2,
  ];

  const gramSchmidt: [number, number] = [
    vec2[0] - innerProd * normalized1[0],
    vec2[1] - innerProd * normalized1[1],
  ];
  const gramNorm = calculateNorm(gramSchmidt);
  const orthonormal: [number, number] =
    gramNorm > 0
      ? [gramSchmidt[0] / gramNorm, gramSchmidt[1] / gramNorm]
      : [0, 0];

  return (
    <div className="vector-space-main">
      <div className="vector-controls">
        <div className="vector-selector">
          <label className="metric-label">Select Vector 1:</label>
          <div className="vector-buttons">
            {Object.keys(vectors).map((v) => (
              <button
                key={v}
                className={`vector-btn ${selectedVec1 === v ? "active" : ""}`}
                onClick={() => setSelectedVec1(v)}
              >
                {vectors[v].label}
              </button>
            ))}
          </div>
        </div>

        <div className="vector-selector">
          <label className="metric-label">Select Vector 2:</label>
          <div className="vector-buttons">
            {Object.keys(vectors).map((v) => (
              <button
                key={v}
                className={`vector-btn ${selectedVec2 === v ? "active" : ""}`}
                onClick={() => setSelectedVec2(v)}
              >
                {vectors[v].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="vector-analysis">
        <div className="analysis-section">
          <p className="metric-label">Vector Components:</p>
          <div className="components-grid">
            <div className="component-card">
              <div className="component-title">{vectors[selectedVec1].label}</div>
              <div className="component-vector">
                <div className="comp-item">{formatNum(vec1[0])}</div>
                <div className="comp-item">{formatNum(vec1[1])}</div>
              </div>
              <div className="component-norm">
                Norm: {formatNum(norm1)}
              </div>
            </div>
            <div className="component-card">
              <div className="component-title">{vectors[selectedVec2].label}</div>
              <div className="component-vector">
                <div className="comp-item">{formatNum(vec2[0])}</div>
                <div className="comp-item">{formatNum(vec2[1])}</div>
              </div>
              <div className="component-norm">
                Norm: {formatNum(norm2)}
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <p className="metric-label">Inner Product Analysis:</p>
          <div className="inner-product-box">
            <div className="ip-value">⟨v₁|v₂⟩ = {formatNum(innerProd)}</div>
            <div className={`orthogonality ${orthogonal ? "orthogonal" : ""}`}>
              {orthogonal ? "✓ Orthogonal" : "✗ Not Orthogonal"}
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <p className="metric-label">Normalized Vectors:</p>
          <div className="normalized-box">
            <div className="norm-card">
              <div className="norm-title">|v̂₁⟩</div>
              <div className="norm-components">
                <div className="norm-item">{formatNum(normalized1[0])}</div>
                <div className="norm-item">{formatNum(normalized1[1])}</div>
              </div>
            </div>
            <div className="norm-card">
              <div className="norm-title">|v̂₂⟩</div>
              <div className="norm-components">
                <div className="norm-item">{formatNum(normalized2[0])}</div>
                <div className="norm-item">{formatNum(normalized2[1])}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <p className="metric-label">Gram-Schmidt Orthogonalization:</p>
          <div className="gram-schmidt-box">
            <div className="gs-result">
              <div className="gs-component">{formatNum(orthonormal[0])}</div>
              <div className="gs-component">{formatNum(orthonormal[1])}</div>
            </div>
            <div className="gs-note">Orthogonal to {vectors[selectedVec1].label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
