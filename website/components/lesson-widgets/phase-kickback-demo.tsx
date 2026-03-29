"use client";

import { useMemo, useState } from "react";

/**
 * PhaseKickbackDemo (Lesson 34)
 * Audit Fix: Enforce eigenstate precondition with failure case
 * - Selector: choose target eigenstate of U (eigenvalue ±1 or random superposition)
 * - Kickback only works on eigenstates: phase ±1 clearly visible
 * - Non-eigenstate: shows degraded contrast (mixed phases interfere)
 * - Visual circuit and measurement histograms for each case
 */

type EigenstateType = "plus-eigenstate" | "minus-eigenstate" | "superposition";

// Compute control qubit state after C-U and measure after Hadamard
const computeControlMeasurement = (
  eigenstateType: EigenstateType,
  nShots: number
): { measurements: { [key: string]: number }; contrast: number } => {
  const measurements: { [key: string]: number } = { "0": 0, "1": 0 };
  
  switch (eigenstateType) {
    case "plus-eigenstate": {
      // +1 eigenstate: C-U creates (|0⟩ + e^(i·0)|1⟩)/√2 = (|0⟩ + |1⟩)/√2
      // After H: |0⟩ with probability 1 (perfect constructive interference)
      measurements["0"] = nShots;
      measurements["1"] = 0;
      break;
    }
    case "minus-eigenstate": {
      // -1 eigenstate: C-U creates (|0⟩ + e^(i·π)|1⟩)/√2 = (|0⟩ - |1⟩)/√2
      // After H: |1⟩ with probability 1 (perfect destructive interference)
      measurements["0"] = 0;
      measurements["1"] = nShots;
      break;
    }
    case "superposition": {
      // Non-eigenstate: Coherent superposition of ±1 eigenstates
      // C-U creates (|0⟩ + e^(i·0)|1⟩)/2 + (|0⟩ - e^(iπ)|1⟩)/2 phase mixture
      // After H: Partial destructive interference → 50/50 (degraded contrast)
      measurements["0"] = Math.round(nShots * 0.5);
      measurements["1"] = nShots - measurements["0"];
      break;
    }
  }

  // Calculate contrast: (P(0) - P(1)) / max(P(0), P(1))
  const p0 = measurements["0"] / nShots;
  const p1 = measurements["1"] / nShots;
  const contrast = Math.abs(p0 - p1);

  return { measurements, contrast };
};

export function PhaseKickbackDemo() {
  const [eigenstateType, setEigenstateType] = useState<EigenstateType>("plus-eigenstate");
  const [nShots, setNShots] = useState(1000);
  const [showCircuit, setShowCircuit] = useState(true);

  // Run simulation
  const { measurements, contrast } = useMemo(
    () => computeControlMeasurement(eigenstateType, nShots),
    [eigenstateType, nShots]
  );

  const p0 = measurements["0"] / nShots;
  const p1 = measurements["1"] / nShots;

  const getEigenstateDescription = () => {
    switch (eigenstateType) {
      case "plus-eigenstate":
        return { 
          eigenvalue: "+1", 
          phase: "0", 
          description: "U|u₊⟩ = |u₊⟩ (no phase kick)",
          status: "✓ Eigenstate - CLEAR SIGNAL"
        };
      case "minus-eigenstate":
        return { 
          eigenvalue: "-1", 
          phase: "π", 
          description: "U|u₋⟩ = -|u₋⟩ (π phase kick)",
          status: "✓ Eigenstate - CLEAR SIGNAL"
        };
      case "superposition":
        return { 
          eigenvalue: "mixed", 
          phase: "ambiguous", 
          description: "|ψ⟩ = (|u₊⟩ + |u₋⟩)/√2 (mixed phases)",
          status: "✗ Non-eigenstate - DEGRADED"
        };
    }
  };

  const eigenstateInfo = getEigenstateDescription();

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔄 Phase Kickback: Eigenstate Requirement</h4>
        <p className="widget-description">
          Controlled-U only writes phase reliably to the control qubit when the target is an eigenstate.
        </p>
      </div>

      <div className="widget-content">
        {/* Eigenstate selector */}
        <div className="eigenstate-selector">
          <label className="metric-label">Target State:</label>
          <div className="eigenstate-buttons">
            {(
              [
                { id: "plus-eigenstate", label: "|u₊⟩: +1 Eigenstate", color: "#667eea" },
                { id: "minus-eigenstate", label: "|u₋⟩: -1 Eigenstate", color: "#764ba2" },
                { id: "superposition", label: "|ψ⟩: Superposition (failure)", color: "#f5576c" },
              ] as const
            ).map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => setEigenstateType(id)}
                style={{
                  padding: "0.75rem 1.25rem",
                  border: eigenstateType === id ? "3px solid" : "1px solid #ddd",
                  borderColor: eigenstateType === id ? color : "#ddd",
                  borderRadius: "6px",
                  background: eigenstateType === id ? `${color}20` : "white",
                  color: eigenstateType === id ? color : "#333",
                  cursor: "pointer",
                  fontWeight: eigenstateType === id ? "bold" : "normal",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Circuit diagram toggle */}
        <div className="toggle-group">
          <label>
            <input
              type="checkbox"
              checked={showCircuit}
              onChange={(e) => setShowCircuit(e.target.checked)}
            />
            Show Quantum Circuit Diagram
          </label>
        </div>

        {/* Circuit visualization */}
        {showCircuit && (
          <div className="circuit-box">
            <div className="circuit-title">Quantum Circuit: Phase Kickback</div>
            <div className="circuit-diagram">
              <div className="circuit-line">
                <div className="qubit-label">Control:</div>
                <div className="circuit-step">|0⟩</div>
                <div className="gate">H</div>
                <div className="circuit-step">
                  <div>(|0⟩+|1⟩)/√2</div>
                </div>
                <div className="gate c-u">C-U</div>
                <div className="circuit-step">
                  <div>(|0⟩+e^(iφ)|1⟩)/√2</div>
                  <div style={{ fontSize: "0.8em" }}>φ depends on eigenvalue</div>
                </div>
                <div className="gate">H</div>
                <div className="circuit-step">Measure</div>
              </div>
            </div>
          </div>
        )}

        {/* Eigenstate information */}
        <div className={`info-box ${eigenstateType === "superposition" ? "failure" : "success"}`}>
          <div className="info-status">{eigenstateInfo.status}</div>
          <div className="info-details">
            <div><strong>State:</strong> {eigenstateInfo.description}</div>
            <div><strong>Eigenvalue:</strong> {eigenstateInfo.eigenvalue}</div>
            <div><strong>Kickback Phase:</strong> e^(iπ·λ) = e^(i·{eigenstateInfo.phase})</div>
          </div>
        </div>

        {/* Shot count */}
        <div className="control-section">
          <label className="metric-label">Measurement Shots: {nShots}</label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={nShots}
            onChange={(e) => setNShots(Number(e.target.value))}
            className="slider"
          />
        </div>

        {/* Measurement results */}
        <div className="measurements-section">
          <div className="measurements-title">Control Qubit Measurement Results</div>
          <div className="measurements-grid">
            <div className="measurement-item">
              <div className="measurement-label">|0⟩</div>
              <div
                className="measurement-bar"
                style={{
                  height: `${p0 * 200}px`,
                  backgroundColor: "#667eea",
                }}
              />
              <div className="measurement-value">
                {measurements["0"]} ({(p0 * 100).toFixed(1)}%)
              </div>
            </div>
            <div className="measurement-item">
              <div className="measurement-label">|1⟩</div>
              <div
                className="measurement-bar"
                style={{
                  height: `${p1 * 200}px`,
                  backgroundColor: "#764ba2",
                }}
              />
              <div className="measurement-value">
                {measurements["1"]} ({(p1 * 100).toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Contrast metric */}
        <div className="contrast-box">
          <div className="contrast-label">Measurement Contrast (Signal Strength)</div>
          <div
            className="contrast-bar"
            style={{
              height: "30px",
              width: `${contrast * 100}%`,
              backgroundColor: contrast > 0.9 ? "#48bb78" : contrast > 0.5 ? "#f6ad55" : "#f56565",
              borderRadius: "4px",
              lineHeight: "30px",
              color: "white",
              fontWeight: "bold",
              marginTop: "0.5rem",
            }}
          >
            {(contrast * 100).toFixed(1)}%
          </div>
          <div className="contrast-interpretation">
            {contrast > 0.9
              ? "✓ Clear eigenstate signal - perfect phase encoding"
              : contrast > 0.5
              ? "⚠ Degraded signal - partial eigenstate overlap"
              : "✗ No signal - non-eigenstate result"}
          </div>
        </div>

        {/* Key insights */}
        <div className="insight-grid">
          <div className="insight-card">
            <div className="insight-title">✓ Eigenstate Case</div>
            <div className="insight-content">
              <strong>+1 eigenstate:</strong> Kickback writes phase 0<br/>
              Control → (|0⟩+|1⟩)/√2 → After H: |0⟩ always<br/>
              <br/>
              <strong>-1 eigenstate:</strong> Kickback writes phase π<br/>
              Control → (|0⟩-|1⟩)/√2 → After H: |1⟩ always<br/>
              <br/>
              <strong>Result:</strong> 100% contrast, perfect phase extraction
            </div>
          </div>
          <div className="insight-card" style={{ backgroundColor: "#fff5f5" }}>
            <div className="insight-title">✗ Non-Eigenstate Case</div>
            <div className="insight-content">
              <strong>Superposition |ψ⟩ = (|u₊⟩ + |u₋⟩)/√2</strong><br/>
              Kickback applies both phases: 0 AND π<br/>
              Control → mixed state<br/>
              → After H: partial interference<br/>
              <br/>
              <strong>Result:</strong> ~50% contrast, information is lost
            </div>
          </div>
        </div>

        {/* Precondition note */}
        <div className="precondition-note">
          <strong>Critical Precondition: Eigenstate Requirement</strong>
          <p>
            Phase kickback (and phase estimation) requires that the target state |ψ⟩ is an eigenstate of the unitary U.
            If |ψ⟩ is a superposition of multiple eigenstates, the phases interfere and the protocol fails. This is why
            QPE requires specialized state preparation or oracle access to eigenstates.
          </p>
        </div>
      </div>
    </section>
  );
}
