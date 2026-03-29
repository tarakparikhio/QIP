"use client";

import React, { useState } from "react";

/**
 * QuantumFourierTransformDemo (Lesson 26)
 * Audit Fix: Reframe from classical DFT to quantum basis transform
 * - Input: quantum state |ψ⟩ with specific amplitude pattern
 * - Process: QFT redistributes amplitudes via phase-gradient structure
 * - Output: state where frequency information is encoded in phase
 * - Key: QFT is a change of basis, not signal processing per se
 */
export function QuantumFourierTransformDemo() {
  const [nQubits, setNQubits] = useState(3);
  const [inputPattern, setInputPattern] = useState<"uniform" | "peaked" | "phased">("uniform");
  const [showPhaseGradient, setShowPhaseGradient] = useState(true);

  const N = Math.pow(2, nQubits);

  // Generate input state based on pattern
  const generateInputState = (): { real: number; imag: number }[] => {
    const state: { real: number; imag: number }[] = [];

    switch (inputPattern) {
      case "uniform": // Equal superposition
        for (let i = 0; i < N; i++) {
          state.push({ real: 1 / Math.sqrt(N), imag: 0 });
        }
        break;
      case "peaked": // Single peak (localized state)
        for (let i = 0; i < N; i++) {
          if (i === N / 2) {
            state.push({ real: 1, imag: 0 });
          } else {
            state.push({ real: 0, imag: 0 });
          }
        }
        break;
      case "phased": // Phase-encoded periodic pattern
        for (let i = 0; i < N; i++) {
          const angle = (2 * Math.PI * i * 2) / N; // Period 2
          state.push({
            real: (1 / Math.sqrt(N)) * Math.cos(angle),
            imag: (1 / Math.sqrt(N)) * Math.sin(angle),
          });
        }
        break;
    }
    return state;
  };

  // Apply QFT transformation
  const applyQFT = (input: { real: number; imag: number }[]): { real: number; imag: number }[] => {
    const output: { real: number; imag: number }[] = [];

    for (let k = 0; k < N; k++) {
      let realPart = 0;
      let imagPart = 0;

      for (let j = 0; j < N; j++) {
        // QFT phase: 2π k j / N
        const phase = (2 * Math.PI * k * j) / N;
        const cos_p = Math.cos(phase);
        const sin_p = Math.sin(phase);

        // Multiply input[j] by e^(i·phase)
        realPart += input[j].real * cos_p - input[j].imag * sin_p;
        imagPart += input[j].real * sin_p + input[j].imag * cos_p;
      }

      // Normalize
      output.push({
        real: realPart / N,
        imag: imagPart / N,
      });
    }

    return output;
  };

  const inputState = generateInputState();
  const outputState = applyQFT(inputState);

  const getMagnitude = (amp: { real: number; imag: number }) => {
    return Math.sqrt(amp.real * amp.real + amp.imag * amp.imag);
  };

  const getPhase = (amp: { real: number; imag: number }) => {
    return Math.atan2(amp.imag, amp.real);
  };

  const formatAmplitude = (amp: { real: number; imag: number }) => {
    if (Math.abs(amp.imag) < 1e-10) return amp.real.toFixed(2);
    if (Math.abs(amp.real) < 1e-10) return `${amp.imag > 0 ? "" : "-"}${Math.abs(amp.imag).toFixed(2)}i`;
    return `${amp.real.toFixed(2)} ${amp.imag > 0 ? "+" : "-"} ${Math.abs(amp.imag).toFixed(2)}i`;
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚡ Quantum Fourier Transform (QFT)</h4>
        <p className="widget-description">
          Observe how QFT redistributes amplitudes via phase-gradient basis transformation.
        </p>
      </div>
      <div className="widget-content">
        {/* Input pattern selector */}
        <div className="pattern-selector">
          <label className="metric-label">Input State Pattern:</label>
          <div className="pattern-buttons">
            <button
              className={`pattern-btn ${inputPattern === "uniform" ? "active" : ""}`}
              onClick={() => setInputPattern("uniform")}
            >
              Uniform |+...+⟩
            </button>
            <button
              className={`pattern-btn ${inputPattern === "peaked" ? "active" : ""}`}
              onClick={() => setInputPattern("peaked")}
            >
              Peaked |0...1...0⟩
            </button>
            <button
              className={`pattern-btn ${inputPattern === "phased" ? "active" : ""}`}
              onClick={() => setInputPattern("phased")}
            >
              Phased Pattern
            </button>
          </div>
        </div>

        {/* Qubit count */}
        <div className="qubit-control">
          <label>Number of Qubits: {nQubits}</label>
          <input
            type="range"
            min="2"
            max="4"
            value={nQubits}
            onChange={(e) => setNQubits(parseInt(e.target.value))}
            className="slider"
          />
          <div className="qubit-note">Basis states: 2^{nQubits} = {N}</div>
        </div>

        {/* Show phase gradient toggle */}
        <div className="toggle-group">
          <label>
            <input
              type="checkbox"
              checked={showPhaseGradient}
              onChange={(e) => setShowPhaseGradient(e.target.checked)}
            />
            Show Phase Gradient Structure
          </label>
        </div>

        {/* Input state visualization */}
        <div className="state-section">
          <div className="section-label">INPUT: |ψ_in⟩</div>
          <div className="amplitude-bars">
            {inputState.map((amp, i) => {
              const mag = getMagnitude(amp);
              const phase = getPhase(amp);
              const phaseColor = `hsl(${(phase * 180) / Math.PI + 180}, 70%, 50%)`;

              return (
                <div key={i} className="amplitude-bar-container">
                  <div
                    className="amplitude-bar"
                    style={{
                      height: `${mag * 100}%`,
                      backgroundColor: showPhaseGradient ? phaseColor : "#667eea",
                    }}
                  />
                  <div className="amplitude-label">{i}</div>
                </div>
              );
            })}
          </div>
          <div className="state-description">
            Pattern: {inputPattern} | Amplitudes: {inputState.map((a) => formatAmplitude(a)).join(", ")}
          </div>
        </div>

        {/* QFT transformation arrow */}
        <div className="transformation-arrow">
          <div className="arrow-label">QFT Transformation</div>
          <div className="arrow-visual">→ Phase Gradient ↻ →</div>
          <div className="arrow-formula">|ψ_out⟩ = (1/√N) Σ_j e^(2πikj/N) |ψ_in⟩_j</div>
        </div>

        {/* Output state visualization */}
        <div className="state-section">
          <div className="section-label">OUTPUT: QFT|ψ_in⟩</div>
          <div className="amplitude-bars">
            {outputState.map((amp, k) => {
              const mag = getMagnitude(amp);
              const phase = getPhase(amp);
              const phaseColor = `hsl(${(phase * 180) / Math.PI + 180}, 70%, 50%)`;

              return (
                <div key={k} className="amplitude-bar-container">
                  <div
                    className="amplitude-bar"
                    style={{
                      height: `${mag * 100}%`,
                      backgroundColor: showPhaseGradient ? phaseColor : "#764ba2",
                    }}
                  />
                  <div className="amplitude-label">{k}</div>
                </div>
              );
            })}
          </div>
          <div className="state-description">
            Frequency Pattern | Amplitudes: {outputState.slice(0, Math.min(4, N)).map((a) => formatAmplitude(a)).join(", ")}
            {N > 4 && "..."}
          </div>
        </div>

        {/* Key insight */}
        <div className="insight-box">
          <div className="insight-title">🔍 Key Insight: Phase Gradient Encoding</div>
          <div className="insight-text">
            QFT redistributes amplitudes using a <strong>phase gradient</strong>: each output basis state |k⟩ accumulates
            phase proportional to k × (input index). This encodes frequency information as phases, which can then be extracted
            via phase measurement or phase estimation algorithms (e.g., Shor's algorithm).
          </div>
        </div>

        {/* Complexity note */}
        <div className="complexity-note">
          <strong>Computational Complexity & Speedup Context:</strong>
          <ul>
            <li>
              <strong>Classical FFT:</strong> O(N log N) operations for N samples
            </li>
            <li>
              <strong>Quantum QFT:</strong> O(log²N) quantum gates on N-qubit register
            </li>
            <li>
              <strong>Speedup application:</strong> QFT enables exponential speedup for <em>Abelian hidden subgroup problems</em> 
              (e.g., Shor's factoring, period-finding). Not a general-purpose signal processing speedup for unstructured data.
            </li>
          </ul>
        </div>
      </div>
      <p className="widget-note">
        <strong>QFT Definition:</strong> |ψ_out_k⟩ = (1/√N) Σ_j e^(2πikj/N) |ψ_in_j⟩. The phase e^(2πikj/N) grows linearly
        with k and j, creating a phase gradient that separates different frequencies.
      </p>
    </section>
  );
}
