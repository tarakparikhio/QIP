"use client";

import { useMemo, useState } from "react";

/**
 * PhaseEstimationDemo (Lesson 28)
 * Audit Fix: Implement real phase estimation pipeline
 * - Eigenstate |u⟩ + controlled-U^(2^k) powers
 * - Phase kickback: C-U^(2^k)|u⟩ creates phase on control
 * - Inverse QFT extracts phase as bitstring
 * - Show measurement distribution with probabilities
 */

function fracToBits(phi: number, bits: number): string {
  let x = phi;
  let out = "";
  for (let i = 0; i < bits; i++) {
    x *= 2;
    if (x >= 1) {
      out += "1";
      x -= 1;
    } else {
      out += "0";
    }
  }
  return out;
}

// Apply inverse QFT and return measurement probabilities
const computeInverseQFTMeasurement = (phase: number, nQubits: number): { bitstring: string; prob: number }[] => {
  const N = Math.pow(2, nQubits);
  const probabilities: number[] = new Array(N).fill(0);

  // Phase kickback: control register acquires phase e^(2πi·k·φ) for each control state k
  // Inverse QFT transforms this phase information into a computational basis bitstring
  for (let k = 0; k < N; k++) {
    // Inverse QFT: state |k⟩ → (1/√N) Σ_j e^(-2πikj/N)|j⟩
    // After measurement of eigenstate with phase φ, the kickback adds e^(2πiφ·2^k) term
    // Inverse QFT redistributes these phases into the measurement basis
    
    let realPart = 0;
    let imagPart = 0;

    for (let j = 0; j < N; j++) {
      // Phase from kickback: 2π·j·φ (j is control state index post QFT)
      // Inverse QFT contribution: e^(-2πikj/N)
      const angle = 2 * Math.PI * (j * phase - (k * j) / N);
      realPart += Math.cos(angle) / N;
      imagPart += Math.sin(angle) / N;
    }

    probabilities[k] = realPart * realPart + imagPart * imagPart;
  }

  // Convert to bitstring format with probabilities
  const measurements: { bitstring: string; prob: number }[] = probabilities
    .map((prob, idx) => ({
      bitstring: idx.toString(2).padStart(nQubits, "0"),
      prob: Math.max(0, prob), // Ensure non-negative due to floating point
    }))
    .sort((a, b) => b.prob - a.prob);

  return measurements;
};

export function PhaseEstimationDemo() {
  const [phi, setPhi] = useState(0.625);
  const [nQubits, setNQubits] = useState(3);
  const [selectedBitstring, setSelectedBitstring] = useState<string | null>(null);

  const measurements = useMemo(() => computeInverseQFTMeasurement(phi, nQubits), [phi, nQubits]);

  const maxProb = Math.max(...measurements.map((m) => m.prob), 0.01);
  
  // Find measurement most likely to yield correct phase
  const mostLikelyIdx = measurements.findIndex((m) => m.prob === maxProb);
  const mostLikelyPhase = mostLikelyIdx / Math.pow(2, nQubits);

  const trueBits = fracToBits(phi, Math.max(nQubits, 8));

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔍 Phase Estimation with Inverse QFT</h4>
        <p className="widget-description">
          Observe how phase kickback + inverse QFT extracts eigenphase φ from U|u⟩ = e^(2πiφ)|u⟩.
        </p>
      </div>

      <div className="widget-content">
        {/* Phase selector */}
        <div className="control-section">
          <label className="metric-label">Eigenphase φ: {phi.toFixed(4)}</label>
          <input
            type="range"
            min="0"
            max="0.999"
            step="0.001"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="slider"
          />
          <div className="phase-note">Binary: 0.{trueBits}</div>
        </div>

        {/* Precision (control register size) */}
        <div className="control-section">
          <label className="metric-label">Control Register Bits: {nQubits}</label>
          <input
            type="range"
            min="2"
            max="5"
            value={nQubits}
            onChange={(e) => setNQubits(Number(e.target.value))}
            className="slider"
          />
          <div className="precision-note">Measurement space: 2^{nQubits} = {Math.pow(2, nQubits)} basis states</div>
        </div>

        {/* Phase kickback explanation */}
        <div className="insight-box">
          <div className="insight-title">⚡ Phase Kickback Mechanism</div>
          <div className="insight-text">
            <strong>Pipeline:</strong><br/>
            1. Initialize control register in superposition: (1/√N) Σ_k |k⟩<br/>
            2. Apply C-U^(2^k) sequentially to eigenstate |u⟩<br/>
            3. Kickback: |k⟩ acquires phase e^(2πiφ·2^k), creating entangled state<br/>
            4. Inverse QFT transforms phase information → bitstring in computational basis<br/>
            5. Measurement collapses to bitstring ≈ φ × 2^nQubits
          </div>
        </div>

        {/* Expected outcome */}
        <div className="prediction-box">
          <div className="prediction-label">Expected Most-Likely Outcome</div>
          <div className="prediction-grid">
            <div className="prediction-card">
              <div className="prediction-name">Bitstring</div>
              <div className="prediction-value">{measurements[0]?.bitstring || "—"}</div>
            </div>
            <div className="prediction-card">
              <div className="prediction-name">Extracted Phase</div>
              <div className="prediction-value">
                {(measurements[0]?.bitstring ? parseInt(measurements[0].bitstring, 2) / Math.pow(2, nQubits) : 0).toFixed(4)}
              </div>
            </div>
            <div className="prediction-card">
              <div className="prediction-name">Error vs True φ</div>
              <div className="prediction-value">
                {(measurements[0]?.bitstring ? Math.abs(phi - parseInt(measurements[0].bitstring, 2) / Math.pow(2, nQubits)) : 0).toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Measurement histogram */}
        <div className="histogram-section">
          <div className="histogram-label">Measurement Probability Distribution (Post Inverse QFT)</div>
          <div className="histogram-bars">
            {measurements.slice(0, Math.min(12, measurements.length)).map((m) => (
              <div
                key={m.bitstring}
                className="histogram-bar-container"
                onClick={() => setSelectedBitstring(m.bitstring)}
                style={{ cursor: "pointer" }}
              >
                <div className="histogram-bar-label">{m.bitstring}</div>
                <div
                  className="histogram-bar"
                  style={{
                    height: `${(m.prob / maxProb) * 200}px`,
                    backgroundColor: selectedBitstring === m.bitstring ? "#f5576c" : "#667eea",
                    opacity: selectedBitstring === m.bitstring ? 1 : 0.7,
                  }}
                />
                <div className="histogram-prob">{(m.prob * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected measurement detail */}
        {selectedBitstring && (
          <div className="detail-box">
            <div className="detail-label">Measurement Detail: {selectedBitstring}</div>
            <div className="detail-content">
              <div>
                <strong>Decimal value:</strong> {parseInt(selectedBitstring, 2)}
              </div>
              <div>
                <strong>Extracted phase:</strong> {(parseInt(selectedBitstring, 2) / Math.pow(2, nQubits)).toFixed(4)}
              </div>
              <div>
                <strong>Error magnitude:</strong> {Math.abs(phi - parseInt(selectedBitstring, 2) / Math.pow(2, nQubits)).toFixed(4)}
              </div>
              <div>
                <strong>Probability:</strong>{" "}
                {(
                  (measurements.find((m) => m.bitstring === selectedBitstring)?.prob || 0) * 100
                ).toFixed(2)}
                %
              </div>
            </div>
          </div>
        )}

        {/* Key insight */}
        <div className="qpe-note">
          <strong>Why Inverse QFT Matters:</strong>
          <ul>
            <li>
              <strong>Without QFT:</strong> Phase information scattered across all basis states (flat distribution)
            </li>
            <li>
              <strong>With Inverse QFT:</strong> Phase concentrated into ~1 bitstring with high probability
            </li>
            <li>
              <strong>Precision trade-off:</strong> More control qubits → finer phase resolution → exponential state space
            </li>
            <li>
              <strong>Repetition:</strong> Run multiple times to estimate phase reliably (quantum speedup vs classical phase extraction)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
