"use client";

import React, { useState } from "react";

export function QuantumTeleportationDemo() {
  const [inputState, setInputState] = useState(0);
  const [showSteps, setShowSteps] = useState(true);
  const [teleportationStep, setTeleportationStep] = useState(0);

  const theta = (inputState / 100) * Math.PI;
  const alpha = Math.cos(theta / 2);
  const beta = Math.sin(theta / 2);

  const getAmplitudeString = (amp: number): string => {
    return amp.toFixed(3);
  };

  const steps = [
    {
      title: "Initial State (Alice's Qubit)",
      description: "Alice has a qubit in an unknown state |ψ⟩",
      stateLabel: "|ψ⟩ = α|0⟩ + β|1⟩",
      formula: `|ψ⟩ = ${getAmplitudeString(alpha)}|0⟩ + ${getAmplitudeString(beta)}|1⟩`,
      details: "Alice wants to send this state to Bob without revealing it.",
    },
    {
      title: "Shared Entanglement",
      description: "Alice and Bob share an entangled Bell pair",
      stateLabel: "Bell State (|Φ⁺⟩)",
      formula: "(|00⟩ + |11⟩) / √2",
      details: "This is an EPR pair - half shared with Alice, half with Bob.",
    },
    {
      title: "Bell Measurement",
      description: "Alice performs Bell measurement on her qubits",
      stateLabel: "Bell Basis Measurement",
      formula: "Measure (Input qubit, Entangled qubit)",
      details: "Two classical bits obtained: 00, 01, 10, or 11",
    },
    {
      title: "Classical Communication",
      description: "Alice sends the 2 classical bits to Bob",
      stateLabel: "2 Classical Bits",
      formula: "c₁c₀ ∈ {00, 01, 10, 11}",
      details: "This is now classical information - cannot be used to send faster-than-light signals.",
    },
    {
      title: "Correction Operation",
      description: "Bob applies correction based on classical bits",
      stateLabel: "Pauli Correction",
      formula: "Apply I, X, Z, or XZ depending on bits",
      details: "Bob's half of the entangled pair becomes the original state.",
    },
    {
      title: "Teleported State",
      description: "Bob's qubit is now in the original state",
      stateLabel: "|ψ⟩ = α|0⟩ + β|1⟩",
      formula: `|ψ⟩ = ${getAmplitudeString(alpha)}|0⟩ + ${getAmplitudeString(beta)}|1⟩`,
      details: "The quantum state has been teleported! Alice's qubit is now in |0⟩.",
    },
  ];

  const currentStep = steps[teleportationStep];

  const teleportationStates = [
    { measurement: "00", correction: "I", description: "No correction" },
    { measurement: "01", correction: "X", description: "Bit-flip" },
    { measurement: "10", correction: "Z", description: "Phase-flip" },
    { measurement: "11", correction: "XZ", description: "Both" },
  ];

  return (
    <div className="quantum-teleportation-main">
      <div className="input-controls">
        <label className="metric-label">Input State Angle (θ):</label>
        <div className="angle-display">{((inputState / 100) * 180).toFixed(1)}°</div>
        <input
          type="range"
          min="0"
          max="100"
          value={inputState}
          onChange={(e) => setInputState(parseInt(e.target.value))}
          className="angle-slider"
        />
        <div className="angle-marks">
          {[0, 25, 50, 75, 100].map((mark) => (
            <span key={mark} style={{ left: `${mark}%` }}>
              {(mark / 100) * 180}°
            </span>
          ))}
        </div>
      </div>

      <div className="state-visualization">
        <div className="bloch-state">
          <p className="metric-label">Input Quantum State on Bloch Sphere:</p>
          <svg width="200" height="200" viewBox="0 0 200 200" className="bloch-svg">
            {/* Sphere wireframe */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="#bbb" strokeWidth="1" />
            <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#bbb" strokeWidth="1" />

            {/* Axes */}
            <line x1="40" y1="100" x2="160" y2="100" stroke="#ddd" strokeWidth="1" />
            <line x1="100" y1="40" x2="100" y2="160" stroke="#ddd" strokeWidth="1" />

            {/* State vector */}
            {theta !== 0 && theta !== Math.PI && (
              <>
                <line
                  x1="100"
                  y1="100"
                  x2={100 + Math.sin(theta) * 60 * Math.cos(0)}
                  y2={100 - Math.cos(theta) * 60}
                  stroke="#ff6b6b"
                  strokeWidth="2"
                />
                <circle
                  cx={100 + Math.sin(theta) * 60 * Math.cos(0)}
                  cy={100 - Math.cos(theta) * 60}
                  r="4"
                  fill="#ff6b6b"
                />
              </>
            )}
            {theta === 0 && (
              <circle
                cx="100"
                cy="40"
                r="4"
                fill="#ff6b6b"
              />
            )}
            {theta === Math.PI && (
              <circle
                cx="100"
                cy="160"
                r="4"
                fill="#ff6b6b"
              />
            )}

            {/* Labels */}
            <text x="155" y="105" fontSize="10" fill="#999">
              X
            </text>
            <text x="95" y="35" fontSize="10" fill="#999">
              Z
            </text>
          </svg>
        </div>

        <div className="state-amplitudes">
          <p className="metric-label">State Amplitudes:</p>
          <div className="amplitude-box">
            <div className="amplitude-item">
              <span className="basis">|0⟩</span>
              <div className="amplitude-bar-container">
                <div className="amplitude-bar" style={{ width: `${alpha * alpha * 100}%` }} />
              </div>
              <span className="amplitude-value">{getAmplitudeString(alpha)}</span>
            </div>
            <div className="amplitude-item">
              <span className="basis">|1⟩</span>
              <div className="amplitude-bar-container">
                <div className="amplitude-bar" style={{ width: `${beta * beta * 100}%` }} />
              </div>
              <span className="amplitude-value">{getAmplitudeString(beta)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="teleportation-steps">
        <div className="step-controls">
          <label className="step-label">Teleportation Protocol:</label>
          <div className="step-buttons">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`step-btn ${teleportationStep === i ? "active" : ""}`}
                onClick={() => setTeleportationStep(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="step-display">
          <h3 className="step-title">{currentStep.title}</h3>
          <p className="step-description">{currentStep.description}</p>

          <div className="step-formula">
            <div className="formula-item">
              <span className="formula-label">{currentStep.stateLabel}:</span>
              <span className="formula-value">{currentStep.formula}</span>
            </div>
          </div>

          <p className="step-details">{currentStep.details}</p>
        </div>
      </div>

      <div className="bell-correction">
        <p className="metric-label">Alice's Bell Measurement → Bob's Correction:</p>
        <div className="correction-table">
          <div className="correction-header">
            <div className="correction-col">Measurement</div>
            <div className="correction-col">Correction</div>
            <div className="correction-col">Description</div>
          </div>
          {teleportationStates.map((row) => (
            <div key={row.measurement} className="correction-row">
              <div className="correction-col">{row.measurement}</div>
              <div className="correction-col operator">{row.correction}</div>
              <div className="correction-col">{row.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="resource-analysis">
        <p className="metric-label">Resource Requirements:</p>
        <div className="resource-grid">
          <div className="resource-card">
            <div className="resource-name">Entanglement</div>
            <div className="resource-value">1 Bell Pair</div>
            <div className="resource-desc">Required beforehand</div>
          </div>
          <div className="resource-card">
            <div className="resource-name">Quantum Gates</div>
            <div className="resource-value">2 Gates on Alice's side</div>
            <div className="resource-desc">CNOT + Hadamard</div>
          </div>
          <div className="resource-card">
            <div className="resource-name">Classical Bits</div>
            <div className="resource-value">2 Classical Bits</div>
            <div className="resource-desc">Sent to Bob</div>
          </div>
          <div className="resource-card">
            <div className="resource-name">Information</div>
            <div className="resource-value">1 Quantum State</div>
            <div className="resource-desc">Teleported successfully</div>
          </div>
        </div>
      </div>

      <div className="key-points">
        <p className="metric-label">Key Insights:</p>
        <ul className="insights-list">
          <li>
            <strong>No Cloning:</strong> The original state is destroyed during measurement, preventing
            duplication
          </li>
          <li>
            <strong>Classical Communication:</strong> 2 classical bits must be sent - quantum information
            cannot be superluminal
          </li>
          <li>
            <strong>Pre-shared Entanglement:</strong> The Bell pair must be set up before teleportation
          </li>
          <li>
            <strong>Universal Protocol:</strong> Works for any quantum state without needing to know it in
            advance
          </li>
          <li>
            <strong>Foundation for Quantum Networks:</strong> Essential for building quantum repeaters and
            long-distance quantum communication
          </li>
        </ul>
      </div>

      <div className="applications">
        <p className="metric-label">Applications:</p>
        <div className="application-list">
          <div className="application-item">Quantum Communication Networks</div>
          <div className="application-item">Quantum Repeaters (extending range)</div>
          <div className="application-item">Distributed Quantum Computing</div>
          <div className="application-item">Quantum Internet Alliance</div>
        </div>
      </div>
    </div>
  );
}
