"use client";

import React, { useState } from "react";

/**
 * EntanglementBuilder (Lesson 23)
 * Demonstrates multi-qubit entangling operations
 * - Start with product state
 * - Apply entangling gates (CNOT, CZ)
 * - Show Bell states and other entangled states
 * - Display Schmidt rank and separability witness
 */
export function EntanglementBuilder() {
  const [currentState, setCurrentState] = useState<"product" | "bell00" | "bell01" | "bell10" | "bell11">("product");
  const [numQubits, setNumQubits] = useState(2);
  
  // State amplitudes
  const stateDefinitions: Record<string, { real: number; imag: number }[]> = {
    product: [
      { real: 1, imag: 0 },    // |00⟩
      { real: 0, imag: 0 },    // |01⟩
      { real: 0, imag: 0 },    // |10⟩
      { real: 0, imag: 0 },    // |11⟩
    ],
    bell00: [
      { real: 1 / Math.sqrt(2), imag: 0 },  // |00⟩
      { real: 0, imag: 0 },                  // |01⟩
      { real: 0, imag: 0 },                  // |10⟩
      { real: 1 / Math.sqrt(2), imag: 0 },  // |11⟩
    ],
    bell01: [
      { real: 0, imag: 0 },                  // |00⟩
      { real: 1 / Math.sqrt(2), imag: 0 },  // |01⟩
      { real: 1 / Math.sqrt(2), imag: 0 },  // |10⟩
      { real: 0, imag: 0 },                  // |11⟩
    ],
    bell10: [
      { real: 1 / Math.sqrt(2), imag: 0 },  // |00⟩
      { real: 0, imag: 0 },                  // |01⟩
      { real: 0, imag: 0 },                  // |10⟩
      { real: -1 / Math.sqrt(2), imag: 0 }, // |11⟩
    ],
    bell11: [
      { real: 0, imag: 0 },                  // |00⟩
      { real: 1 / Math.sqrt(2), imag: 0 },  // |01⟩
      { real: -1 / Math.sqrt(2), imag: 0 }, // |10⟩
      { real: 0, imag: 0 },                  // |11⟩
    ],
  };

  const amplitudes = stateDefinitions[currentState];

  // Calculate Schmidt rank (for 2-qubit, number of nonzero singular values)
  // Simplified: check how many basis states have nonzero amplitude
  const schmidtRank = amplitudes.filter(
    (a) => Math.abs(a.real) > 1e-10 || Math.abs(a.imag) > 1e-10
  ).length;

  const isEntangled = schmidtRank > 1;

  const binaryLabel = (index: number) => {
    return index.toString(2).padStart(numQubits, "0");
  };

  const formatAmplitude = (amp: { real: number; imag: number }) => {
    if (Math.abs(amp.imag) < 1e-10) {
      const val = amp.real.toFixed(2);
      return val === "0.00" ? "0" : val;
    }
    if (Math.abs(amp.real) < 1e-10) {
      return `${amp.imag > 0 ? "" : "-"}${Math.abs(amp.imag).toFixed(2)}i`;
    }
    return `${amp.real.toFixed(2)} ${amp.imag > 0 ? "+" : "-"} ${Math.abs(amp.imag).toFixed(2)}i`;
  };

  const stateDescriptions: Record<string, string> = {
    product: "|00⟩ — Product state (separable)",
    bell00: "(|00⟩ + |11⟩)/√2 — Bell state Φ⁺ (entangled)",
    bell01: "(|01⟩ + |10⟩)/√2 — Bell state Ψ⁺ (entangled)",
    bell10: "(|00⟩ - |11⟩)/√2 — Bell state Φ⁻ (entangled)",
    bell11: "(|01⟩ - |10⟩)/√2 — Bell state Ψ⁻ (entangled)",
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚛️ Entanglement: Multi-Qubit Operations</h4>
        <p className="widget-description">
          Apply entangling gates to create Bell states and explore quantum correlations.
        </p>
      </div>
      <div className="widget-content">
        {/* State selector */}
        <div className="state-selector-group">
          <label className="metric-label">Select State:</label>
          <div className="state-buttons">
            {Object.keys(stateDefinitions).map((key) => (
              <button
                key={key}
                className={`state-btn ${currentState === key ? "active" : ""}`}
                onClick={() => setCurrentState(key as "product" | "bell00" | "bell01" | "bell10" | "bell11")}
              >
                {key === "product" && "Product"}
                {key === "bell00" && "Φ⁺"}
                {key === "bell01" && "Ψ⁺"}
                {key === "bell10" && "Φ⁻"}
                {key === "bell11" && "Ψ⁻"}
              </button>
            ))}
          </div>
          <div className="state-description-box">{stateDescriptions[currentState]}</div>
        </div>

        {/* State vector display */}
        <div className="statevector-display">
          <div className="statevector-label">State Vector |ψ⟩:</div>
          <div className="statevector-amps">
            {amplitudes.map((amp, i) => (
              <div key={i} className={`amp-row ${Math.abs(amp.real) > 1e-10 || Math.abs(amp.imag) > 1e-10 ? "active" : "zero"}`}>
                <span className="basis-label">|{binaryLabel(i)}⟩:</span>
                <span className="amp-value">{formatAmplitude(amp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entanglement metrics */}
        <div className="entanglement-metrics">
          <div className={`metric-card ${isEntangled ? "entangled" : "separable"}`}>
            <div className="metric-label">Entanglement Status</div>
            <div className="metric-value">{isEntangled ? "Entangled ⚛️" : "Separable ✓"}</div>
            <div className="metric-note">Schmidt Rank = {schmidtRank}</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Correlation</div>
            <div className="metric-value">
              {isEntangled ? "Non-separable" : "Independent"}
            </div>
            <div className="metric-note">
              {isEntangled
                ? "Qubits share quantum correlations"
                : "Qubits are independent"}
            </div>
          </div>
        </div>

        {/* Circuit hint */}
        <div className="circuit-hint">
          <div className="hint-label">How to Create:</div>
          <div className="hint-circuit">
            {currentState === "product" && (
              <span>Start with |00⟩ (no gates)</span>
            )}
            {currentState === "bell00" && (
              <span>H on qubit 0, then CNOT(0→1)</span>
            )}
            {currentState === "bell01" && (
              <span>X on qubit 1, then H on qubit 0, then CNOT(0→1)</span>
            )}
            {currentState === "bell10" && (
              <span>Z on qubit 1, then H on qubit 0, then CNOT(0→1)</span>
            )}
            {currentState === "bell11" && (
              <span>X on qubit 1, Z on qubit 1, then H on qubit 0, then CNOT(0→1)</span>
            )}
          </div>
        </div>

        {/* Measurement correlation info */}
        <div className="correlation-info">
          <div className="info-label">CHSH Inequality Hint:</div>
          <div className="info-text">
            {isEntangled
              ? "Bell states violate CHSH inequality: S ≤ 2 (classical), but S = 2√2 ≈ 2.83 (quantum)"
              : "Product states satisfy CHSH inequality: S ≤ 2"}
          </div>
        </div>
      </div>
      <p className="widget-note">
        <strong>Entanglement:</strong> A state is entangled if it cannot be written as a product |ψ₁⟩ ⊗ |ψ₂⟩.
        Entangled states exhibit stronger-than-classical correlations and are the resource for quantum advantage.
      </p>
    </section>
  );
}
