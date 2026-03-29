"use client";

import React, { useState } from "react";

type Gate = "CNOT" | "Toffoli" | "CZ" | "CCPhase";

interface ControlBlock {
  bit: number;
  state: 0 | 1;
}

const gateDefinitions: Record<Gate, { name: string; description: string; controls: number }> = {
  CNOT: {
    name: "CNOT (CX)",
    description: "Controlled-NOT: flips target if control is |1⟩",
    controls: 1,
  },
  Toffoli: {
    name: "Toffoli (CCX)",
    description: "Controlled-Controlled-NOT: flips target if both controls are |1⟩",
    controls: 2,
  },
  CZ: {
    name: "CZ",
    description: "Controlled-Z: applies Z gate to target if control is |1⟩",
    controls: 1,
  },
  CCPhase: {
    name: "CC-Phase",
    description: "Controlled-Controlled-Phase: applies phase if both controls are |1⟩",
    controls: 2,
  },
};

export function ControlledGateVisualizer() {
  const [gate, setGate] = useState<Gate>("CNOT");
  const [controlStates, setControlStates] = useState<[0 | 1, 0 | 1]>([0, 0]);
  const [targetState, setTargetState] = useState<0 | 1>(0);

  const gateDef = gateDefinitions[gate];
  let outputTarget = targetState;
  let isTriggered = false;

  if (gate === "CNOT" && controlStates[0] === 1) {
    outputTarget = targetState === 0 ? 1 : 0;
    isTriggered = true;
  } else if (gate === "Toffoli" && controlStates[0] === 1 && controlStates[1] === 1) {
    outputTarget = targetState === 0 ? 1 : 0;
    isTriggered = true;
  } else if (gate === "CZ" && controlStates[0] === 1) {
    isTriggered = true;
  } else if (gate === "CCPhase" && controlStates[0] === 1 && controlStates[1] === 1) {
    isTriggered = true;
  }

  return (
    <div className="controlled-gate-main">
      <div className="controlled-controls">
        <div className="gate-selector-group">
          <label className="metric-label">Select Controlled Gate:</label>
          <div className="gate-buttons-group">
            {Object.entries(gateDefinitions).map(([key, def]) => (
              <button
                key={key}
                className={`gate-card-btn ${gate === key ? "active" : ""}`}
                onClick={() => setGate(key as Gate)}
              >
                <div className="gate-name">{def.name}</div>
                <div className="gate-desc">{def.controls} control(s)</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bit-states">
          <label className="metric-label">Control Qubit States:</label>
          <div className="control-bits">
            {[0, 1].map((idx) => (
              <div key={idx} className="bit-selector">
                <span className="bit-label">C{idx + 1}:</span>
                <div className="bit-radios">
                  <label className="radio-opt">
                    <input
                      type="radio"
                      checked={controlStates[idx] === 0}
                      onChange={() => {
                        const newStates = [...controlStates] as [0 | 1, 0 | 1];
                        newStates[idx] = 0;
                        setControlStates(newStates);
                      }}
                    />
                    |0⟩
                  </label>
                  <label className="radio-opt">
                    <input
                      type="radio"
                      checked={controlStates[idx] === 1}
                      onChange={() => {
                        const newStates = [...controlStates] as [0 | 1, 0 | 1];
                        newStates[idx] = 1;
                        setControlStates(newStates);
                      }}
                    />
                    |1⟩
                  </label>
                </div>
              </div>
            ))}
          </div>

          <label className="metric-label">Target Qubit State:</label>
          <div className="target-select">
            <label className="radio-opt">
              <input
                type="radio"
                checked={targetState === 0}
                onChange={() => setTargetState(0)}
              />
              |0⟩
            </label>
            <label className="radio-opt">
              <input
                type="radio"
                checked={targetState === 1}
                onChange={() => setTargetState(1)}
              />
              |1⟩
            </label>
          </div>
        </div>
      </div>

      <div className="gate-diagram">
        <div className="circuit-visualization">
          <div className="circuit-row">
            <div className="qubit-label">C1</div>
            <div className="circuit-line">
              <div className="state-display">{controlStates[0]}</div>
            </div>
          </div>
          {gateDef.controls === 2 && (
            <div className="circuit-row">
              <div className="qubit-label">C2</div>
              <div className="circuit-line">
                <div className="state-display">{controlStates[1]}</div>
              </div>
            </div>
          )}
          <div className="circuit-row">
            <div className="qubit-label">T</div>
            <div className="circuit-line">
              <div className="state-display">{targetState}</div>
            </div>
          </div>
        </div>

        <div className="gate-arrow">→</div>

        <div className="output-visualization">
          <div className="circuit-row">
            <div className="qubit-label">C1</div>
            <div className="circuit-line">
              <div className="state-display unchanged">{controlStates[0]}</div>
            </div>
          </div>
          {gateDef.controls === 2 && (
            <div className="circuit-row">
              <div className="qubit-label">C2</div>
              <div className="circuit-line">
                <div className="state-display unchanged">{controlStates[1]}</div>
              </div>
            </div>
          )}
          <div className="circuit-row">
            <div className="qubit-label">T</div>
            <div className="circuit-line">
              <div className={`state-display ${isTriggered ? "triggered" : "unchanged"}`}>
                {outputTarget}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gate-info-box">
        <p className="metric-label">{gateDef.name}</p>
        <p className="gate-description">{gateDef.description}</p>
        <div className="trigger-status">
          <p className="status-label">Gate Condition:</p>
          <p className={`status-result ${isTriggered ? "triggered" : "inactive"}`}>
            {isTriggered ? "✓ Triggered" : "✗ Not Triggered"}
          </p>
        </div>
      </div>
    </div>
  );
}
