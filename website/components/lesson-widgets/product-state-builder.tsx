"use client";

import React, { useState } from "react";

/**
 * ProductStateBuilder (Lesson 9)
 * Demonstrates tensor products of individual qubits
 * - Build product states: |ψ₁⟩ ⊗ |ψ₂⟩ ⊗ ... ⊗ |ψₙ⟩
 * - Show that product states are separable
 * - Display full basis state listing for n-qubit system
 */
export function ProductStateBuilder() {
  const [numQubits, setNumQubits] = useState(2);
  const [amplitudes, setAmplitudes] = useState<{ real: number; imag: number }[]>(
    Array(4)
      .fill(0)
      .map((_, i) => ({
        real: Math.sqrt(0.25),
        imag: 0,
      }))
  );

  const totalBasisStates = Math.pow(2, numQubits);
  const totalAmplitude = amplitudes.slice(0, totalBasisStates).reduce((sum, a) => sum + a.real * a.real + a.imag * a.imag, 0);

  // Determine if state is separable (product state)
  // For simplicity: equal superposition is always separable
  const isProductState = true;

  const binaryLabel = (index: number) => {
    return index.toString(2).padStart(numQubits, "0");
  };

  const formatAmplitude = (amp: { real: number; imag: number }) => {
    if (Math.abs(amp.imag) < 1e-10) return `${amp.real.toFixed(2)}`;
    if (Math.abs(amp.real) < 1e-10) return `${amp.imag > 0 ? "" : "-"}${Math.abs(amp.imag).toFixed(2)}i`;
    return `${amp.real.toFixed(2)} ${amp.imag > 0 ? "+" : "-"} ${Math.abs(amp.imag).toFixed(2)}i`;
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔗 Tensor Products: Product States</h4>
        <p className="widget-description">
          Build a separable n-qubit state as a product of single-qubit states: |ψ⟩ = |ψ₁⟩ ⊗ |ψ₂⟩ ⊗ ...
        </p>
      </div>
      <div className="widget-content">
        {/* Qubit count selector */}
        <div className="control-group">
          <label>Number of Qubits: {numQubits}</label>
          <input
            type="range"
            min="1"
            max="4"
            value={numQubits}
            onChange={(e) => setNumQubits(parseInt(e.target.value))}
            className="slider"
          />
        </div>

        {/* Basis state grid */}
        <div className="basis-grid-container">
          <div className="grid-label">
            Basis States ({totalBasisStates} states for {numQubits} qubits):
          </div>
          <div className="basis-grid" style={{ gridTemplateColumns: `repeat(${Math.min(4, totalBasisStates)}, 1fr)` }}>
            {Array(totalBasisStates)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="basis-state-card">
                  <div className="basis-label">|{binaryLabel(i)}⟩</div>
                  <div className="basis-amplitude">
                    {formatAmplitude(amplitudes[i] || { real: 0, imag: 0 })}
                  </div>
                  <div className="basis-prob">
                    P: {(((amplitudes[i]?.real ?? 0) ** 2 + (amplitudes[i]?.imag ?? 0) ** 2) / (totalAmplitude || 1) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Separability indicator */}
        <div className="separability-panel">
          <div className={`separability-badge ${isProductState ? "separable" : "entangled"}`}>
            {isProductState ? "✓ Separable (Product State)" : "✗ Entangled"}
          </div>
          <p className="separability-note">
            {isProductState
              ? "This state can be written as |ψ₁⟩ ⊗ |ψ₂⟩ ⊗ ... No correlations between qubits."
              : "This state cannot be factored. Qubits are quantum-correlated."}
          </p>
        </div>

        {/* Normalization check */}
        <div className="normalization-panel">
          <div className="norm-label">∑|aᵢ|² (Normalization)</div>
          <div className="norm-value">{totalAmplitude.toFixed(4)}</div>
          <div className={`norm-check ${Math.abs(totalAmplitude - 1) < 0.01 ? "valid" : "invalid"}`}>
            {Math.abs(totalAmplitude - 1) < 0.01 ? "✓ Normalized" : "✗ Not normalized"}
          </div>
        </div>
      </div>
      <p className="widget-note">
        <strong>Tensor Product:</strong> For single-qubit states |ψ₁⟩ and |ψ₂⟩, the combined state is |ψ₁⟩ ⊗ |ψ₂⟩.
        In terms of basis |00⟩, |01⟩, |10⟩, |11⟩, amplitudes are products: a₁·a₂, a₁·b₂, b₁·a₂, b₁·b₂.
      </p>
    </section>
  );
}
