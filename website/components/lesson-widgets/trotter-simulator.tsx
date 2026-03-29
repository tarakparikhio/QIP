"use client";

import React, { useState } from "react";

/**
 * TrotterSimulator (Lesson 29)
 * Hamiltonian Simulation via Trotter Decomposition
 * - Break Hamiltonian into commuting/non-commuting terms
 * - Apply Trotter steps sequentially
 * - Show Trotter error vs. exact evolution
 * - Display multi-qubit Hamiltonian terms
 */
export function TrotterSimulator() {
  const [numQubits, setNumQubits] = useState(2);
  const [timestep, setTimestep] = useState(0.1);
  const [trotterSteps, setTrotterSteps] = useState(10);
  const [hamiltonianType, setHamiltonianType] = useState<"ising" | "heisenberg">("ising");
  
  // Current step visualization
  const [currentStep, setCurrentStep] = useState(0);
  
  // Hamiltonian term descriptions
  const hamiltonianTerms: Record<string, { label: string; terms: string[] }> = {
    ising: {
      label: "Ising Model: H = ∑ Zᵢ + ∑ ZᵢZᵢ₊₁",
      terms: [
        "Single-qubit Z terms: exp(-i·Zⱼ·Δt)",
        "Two-qubit ZZ coupling: exp(-i·ZⱼZₖ·Δt)",
      ],
    },
    heisenberg: {
      label: "Heisenberg Model: H = ∑ (XᵢXᵢ₊₁ + YᵢYᵢ₊₁ + ZᵢZᵢ₊₁)",
      terms: [
        "XX coupling: exp(-i·XⱼXₖ·Δt)",
        "YY coupling: exp(-i·YⱼYₖ·Δt)",
        "ZZ coupling: exp(-i·ZⱼZₖ·Δt)",
      ],
    },
  };

  const currentHamiltonian = hamiltonianTerms[hamiltonianType];
  const totalTerms = currentHamiltonian.terms.length;
  
  // Trotter error estimate: 1st order is O(Δt²), 2nd order is O(Δt³)
  const trotterError = Math.pow(timestep, 2);
  const totalError = trotterSteps * trotterError;

  const handleNextStep = () => {
    if (currentStep < trotterSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚙️ Hamiltonian Simulation: Trotter Decomposition</h4>
        <p className="widget-description">
          Decompose a complex Hamiltonian into simple exponentials and simulate step-by-step.
        </p>
      </div>
      <div className="widget-content">
        {/* Hamiltonian selector */}
        <div className="hamiltonian-selector">
          <label className="metric-label">Hamiltonian Type:</label>
          <div className="ham-buttons">
            <button
              className={`ham-btn ${hamiltonianType === "ising" ? "active" : ""}`}
              onClick={() => setHamiltonianType("ising")}
            >
              Ising
            </button>
            <button
              className={`ham-btn ${hamiltonianType === "heisenberg" ? "active" : ""}`}
              onClick={() => setHamiltonianType("heisenberg")}
            >
              Heisenberg
            </button>
          </div>
          <div className="hamiltonian-display">{currentHamiltonian.label}</div>
        </div>

        {/* Parameters */}
        <div className="parameter-controls">
          <div className="param-group">
            <label>Number of Qubits: {numQubits}</label>
            <input
              type="range"
              min="2"
              max="4"
              value={numQubits}
              onChange={(e) => setNumQubits(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="param-group">
            <label>Timestep Δt: {timestep.toFixed(3)}</label>
            <input
              type="range"
              min="0.01"
              max="1"
              step="0.01"
              value={timestep}
              onChange={(e) => setTimestep(parseFloat(e.target.value))}
              className="slider"
            />
          </div>

          <div className="param-group">
            <label>Trotter Steps: {trotterSteps}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={trotterSteps}
              onChange={(e) => setTrotterSteps(parseInt(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        {/* Hamiltonian terms breakdown */}
        <div className="hamiltonian-terms">
          <div className="terms-label">Hamiltonian Decomposition:</div>
          <div className="terms-list">
            {currentHamiltonian.terms.map((term, idx) => (
              <div
                key={idx}
                className={`term-item ${
                  currentStep > idx * Math.ceil(trotterSteps / totalTerms)
                    ? "completed"
                    : ""
                }`}
              >
                <span className="term-num">Step {idx + 1}:</span>
                <span className="term-expr">{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trotter step progress */}
        <div className="trotter-progress">
          <div className="progress-label">Trotter Evolution Progress:</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(currentStep / trotterSteps) * 100}%`,
              }}
            />
          </div>
          <div className="progress-text">
            Step {currentStep} / {trotterSteps}
          </div>
        </div>

        {/* Error estimation */}
        <div className="error-metrics">
          <div className="error-card">
            <div className="error-label">Trotter Error (1st order)</div>
            <div className="error-value">O(Δt²) = {trotterError.toFixed(4)}</div>
            <div className="error-note">Per Trotter step</div>
          </div>

          <div className="error-card">
            <div className="error-label">Cumulative Error</div>
            <div className="error-value">~{totalError.toFixed(4)}</div>
            <div className="error-note">{trotterSteps} steps × per-step error</div>
          </div>

          <div className="error-card">
            <div className="error-label">Scaling</div>
            <div className="error-value">{totalError < 0.01 ? "✓ Good" : "⚠ Large"}</div>
            <div className="error-note">
              Reduce Δt or increase steps to improve
            </div>
          </div>
        </div>

        {/* Simulation controls */}
        <div className="widget-controls">
          <button onClick={handleNextStep} disabled={currentStep >= trotterSteps} className="action-btn">
            Next Step
          </button>
          <button onClick={handleReset} className="action-btn secondary">
            Reset
          </button>
        </div>

        {/* Current term display */}
        <div className="current-term-display">
          <div className="term-header">Current Trotter Step:</div>
          <div className="term-content">
            {currentStep <= trotterSteps ? (
              <>
                <span className="step-num">Step {Math.min(currentStep, trotterSteps)}</span>
                <span className="step-desc">
                  Apply exp(-i H_k Δt) for term {(currentStep % totalTerms) + 1}
                </span>
              </>
            ) : (
              <span className="step-done">✓ Evolution complete</span>
            )}
          </div>
        </div>
      </div>
      <p className="widget-note">
        <strong>Trotter Formula:</strong> For non-commuting terms H = ∑ Hₖ, the evolution operator is approximated as:
        U(T) ≈ [∏ₖ exp(-i Hₖ Δt)]^N, where N = T/Δt. Error decreases as Δt → 0.
      </p>
    </section>
  );
}
