"use client";

import React, { useState } from "react";

type ErrorType = "bit-flip" | "phase-flip" | "none";
type CodeType = "3-qubit-bit" | "3-qubit-phase" | "9-qubit-surface";

export function QuantumErrorCorrectionDemo() {
  const [errorType, setErrorType] = useState<ErrorType>("bit-flip");
  const [codeType, setCodeType] = useState<CodeType>("3-qubit-bit");
  const [errorLocation, setErrorLocation] = useState(0);
  const [errorRate, setErrorRate] = useState(0.1);

  const getLogicalState = (codeType: CodeType): { name: string; desc: string } => {
    switch (codeType) {
      case "3-qubit-bit":
        return { name: "3-Qubit Bit-Flip Code", desc: "Protects against bit-flip errors" };
      case "3-qubit-phase":
        return { name: "3-Qubit Phase-Flip Code", desc: "Protects against phase-flip errors" };
      case "9-qubit-surface":
        return { name: "9-Qubit Surface Code", desc: "Protects against both errors" };
    }
  };

  const getCodeLogic = (codeType: CodeType) => {
    switch (codeType) {
      case "3-qubit-bit":
        return {
          encoding: "|0⟩ → |000⟩, |1⟩ → |111⟩",
          syndrome: "Measure parity of qubit pairs",
          correction: "Correct bit-flip on majority qubit",
        };
      case "3-qubit-phase":
        return {
          encoding: "|+⟩ → |+++⟩, |-⟩ → |---⟩",
          syndrome: "Measure relative phases",
          correction: "Apply phase correction",
        };
      case "9-qubit-surface":
        return {
          encoding: "9-qubit lattice arrangement",
          syndrome: "4 stabilizer measurements per plaquette",
          correction: "Decode syndromes using lookup table",
        };
    }
  };

  const getQubits = (codeType: CodeType): number => {
    switch (codeType) {
      case "3-qubit-bit":
      case "3-qubit-phase":
        return 3;
      case "9-qubit-surface":
        return 9;
    }
  };

  const nQubits = getQubits(codeType);

  const simulateError = () => {
    const qubits = Array(nQubits).fill(0);

    if (errorType !== "none") {
      if (errorType === "bit-flip") {
        qubits[errorLocation] = qubits[errorLocation] === 1 ? 0 : 1;
      } else {
        qubits[errorLocation] = qubits[errorLocation] === 0 ? 1 : 0; // phase-flip visualization
      }
    }

    return qubits;
  };

  const calculateSyndrome = (qubits: number[]) => {
    if (codeType === "3-qubit-bit") {
      const s1 = (qubits[0] + qubits[1]) % 2;
      const s2 = (qubits[1] + qubits[2]) % 2;
      return [s1, s2];
    } else if (codeType === "3-qubit-phase") {
      const s1 = Math.random() > 0.5 ? 0 : 1;
      const s2 = Math.random() > 0.5 ? 0 : 1;
      return [s1, s2];
    } else {
      return Array(4).fill(Math.random() > 0.5 ? 0 : 1);
    }
  };

  const decodeSyndrome = (syndrome: number[]) => {
    if (codeType === "3-qubit-bit") {
      const [s1, s2] = syndrome;
      if (s1 === 0 && s2 === 0) return "No error";
      if (s1 === 1 && s2 === 0) return "Error on qubit 1";
      if (s1 === 1 && s2 === 1) return "Error on qubit 2";
      if (s1 === 0 && s2 === 1) return "Error on qubit 3";
    }
    return "Syndrome detected";
  };

  const errorQubits = simulateError();
  const syndrome = calculateSyndrome(errorQubits);
  const diagnosis = decodeSyndrome(syndrome);
  const codeInfo = getLogicalState(codeType);
  const codeLogic = getCodeLogic(codeType);

  const logicalErrorRate = Math.pow(errorRate, 2);

  return (
    <div className="quantum-error-correction-main">
      <div className="error-config">
        <div className="config-group">
          <label className="metric-label">Error Correction Code:</label>
          <div className="code-buttons">
            {(["3-qubit-bit", "3-qubit-phase", "9-qubit-surface"] as CodeType[]).map((code) => (
              <button
                key={code}
                className={`code-btn ${codeType === code ? "active" : ""}`}
                onClick={() => setCodeType(code)}
              >
                {code === "3-qubit-bit"
                  ? "3-Qubit Bit-Flip"
                  : code === "3-qubit-phase"
                    ? "3-Qubit Phase-Flip"
                    : "9-Qubit Surface"}
              </button>
            ))}
          </div>
        </div>

        <div className="config-group">
          <label className="metric-label">Error Type:</label>
          <div className="error-buttons">
            {(["none", "bit-flip", "phase-flip"] as ErrorType[]).map((type) => (
              <button
                key={type}
                className={`error-btn ${errorType === type ? "active" : ""}`}
                onClick={() => setErrorType(type)}
              >
                {type === "none" ? "No Error" : type === "bit-flip" ? "Bit-Flip" : "Phase-Flip"}
              </button>
            ))}
          </div>
        </div>

        {errorType !== "none" && (
          <div className="config-group">
            <label className="metric-label">Error Location: Qubit {errorLocation}</label>
            <input
              type="range"
              min="0"
              max={nQubits - 1}
              value={errorLocation}
              onChange={(e) => setErrorLocation(parseInt(e.target.value))}
              className="error-slider"
            />
          </div>
        )}

        <div className="config-group">
          <label className="metric-label">Physical Error Rate: {(errorRate * 100).toFixed(1)}%</label>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={errorRate}
            onChange={(e) => setErrorRate(parseFloat(e.target.value))}
            className="rate-slider"
          />
        </div>
      </div>

      <div className="code-overview">
        <div className="code-card">
          <h3 className="code-title">{codeInfo.name}</h3>
          <p className="code-description">{codeInfo.desc}</p>
        </div>
      </div>

      <div className="encoding-section">
        <p className="metric-label">Code Structure:</p>
        <div className="encoding-box">
          <div className="encoding-item">
            <span className="encoding-label">Encoding:</span>
            <span className="encoding-value">{codeLogic.encoding}</span>
          </div>
          <div className="encoding-item">
            <span className="encoding-label">Syndrome Extraction:</span>
            <span className="encoding-value">{codeLogic.syndrome}</span>
          </div>
          <div className="encoding-item">
            <span className="encoding-label">Error Correction:</span>
            <span className="encoding-value">{codeLogic.correction}</span>
          </div>
        </div>
      </div>

      <div className="error-simulation">
        <div className="simulation-step">
          <p className="step-label">Step 1: Quantum State with Physical Errors</p>
          <div className="qubit-array">
            {errorQubits.map((bit, i) => (
              <div
                key={i}
                className={`qubit-display ${i === errorLocation && errorType !== "none" ? "error" : ""}`}
              >
                <div className="qubit-label">q{i}</div>
                <div className="qubit-value">{bit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="simulation-step">
          <p className="step-label">Step 2: Syndrome Measurement</p>
          <div className="syndrome-display">
            <p className="syndrome-label">Syndrome Bits:</p>
            <div className="syndrome-values">
              {syndrome.map((bit, i) => (
                <div key={i} className="syndrome-bit">
                  s{i}: {bit}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="simulation-step">
          <p className="step-label">Step 3: Error Diagnosis</p>
          <div className={`diagnosis-box ${diagnosis === "No error" ? "success" : "detected"}`}>
            <p className="diagnosis-label">{diagnosis}</p>
          </div>
        </div>
      </div>

      <div className="error-rates">
        <p className="metric-label">Error Rate Analysis:</p>
        <div className="rate-grid">
          <div className="rate-card">
            <div className="rate-label">Physical Error Rate</div>
            <div className="rate-value">{(errorRate * 100).toFixed(1)}%</div>
          </div>
          <div className="rate-card">
            <div className="rate-label">Logical Error Rate (estimated)</div>
            <div className="rate-value">{(logicalErrorRate * 100).toFixed(3)}%</div>
          </div>
          <div className="rate-card improvement">
            <div className="rate-label">Error Suppression</div>
            <div className="rate-value">~{(errorRate / (logicalErrorRate + 0.001)).toFixed(1)}x</div>
          </div>
        </div>

        <div className="threshold-note">
          <p className="metric-label">Key to Scalability:</p>
          <p className="note-text">
            Error correction codes can suppress errors below the threshold (typical: 0.1%), enabling
            arbitrarily long quantum computations through repeated error correction cycles.
          </p>
        </div>
      </div>

      <div className="code-properties">
        <p className="metric-label">Code Properties:</p>
        <ul className="properties-list">
          <li>
            <strong>Logical Qubits:</strong> 1 logical qubit per code
          </li>
          <li>
            <strong>Physical Qubits:</strong> {nQubits} qubits
          </li>
          <li>
            <strong>Syndrome Measurement:</strong> Non-destructive parity checks
          </li>
          <li>
            <strong>Overhead:</strong> ~{nQubits}x physical qubits required
          </li>
        </ul>
      </div>
    </div>
  );
}
