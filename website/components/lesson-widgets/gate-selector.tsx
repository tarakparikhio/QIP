"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type GateType = "X" | "Y" | "Z" | "H" | "S" | "T";
type InputState = "|0⟩" | "|1⟩" | "|+⟩";

const gateMatrices: Record<GateType, string[][]> = {
  X: [
    ["0", "1"],
    ["1", "0"],
  ],
  Y: [
    ["0", "-i"],
    ["i", "0"],
  ],
  Z: [
    ["1", "0"],
    ["0", "-1"],
  ],
  H: [
    ["1/√2", "1/√2"],
    ["1/√2", "-1/√2"],
  ],
  S: [
    ["1", "0"],
    ["0", "i"],
  ],
  T: [
    ["1", "0"],
    ["0", "e^(iπ/4)"],
  ],
};

const gateDescriptions: Record<GateType, string> = {
  X: "Pauli X: Bit flip",
  Y: "Pauli Y: Bit and phase flip",
  Z: "Pauli Z: Phase flip",
  H: "Hadamard: Creates superposition",
  S: "Phase gate",
  T: "π/8 gate",
};

function applyGate(
  gate: GateType,
  state: InputState
): { output: string; description: string } {
  const transformations: Record<GateType, Record<InputState, string>> = {
    X: { "|0⟩": "|1⟩", "|1⟩": "|0⟩", "|+⟩": "|+⟩" },
    Y: { "|0⟩": "i|1⟩", "|1⟩": "-i|0⟩", "|+⟩": "i|-⟩" },
    Z: { "|0⟩": "|0⟩", "|1⟩": "-|1⟩", "|+⟩": "|-⟩" },
    H: { "|0⟩": "|+⟩", "|1⟩": "|-⟩", "|+⟩": "|0⟩" },
    S: { "|0⟩": "|0⟩", "|1⟩": "i|1⟩", "|+⟩": "|i⟩" },
    T: { "|0⟩": "|0⟩", "|1⟩": "e^(iπ/4)|1⟩", "|+⟩": "e^(iπ/8)|+⟩" },
  };

  return {
    output: transformations[gate][state],
    description: gateDescriptions[gate],
  };
}

export function Lesson6GateSelector() {
  const [selectedGate, setSelectedGate] = useState<GateType>("H");
  const [inputState, setInputState] = useState<InputState>("|0⟩");
  const [showMatrix, setShowMatrix] = useState(false);

  const result = applyGate(selectedGate, inputState);
  const matrix = gateMatrices[selectedGate];

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🎯 Quantum Gates</h4>
        <p className="widget-description">
          Apply quantum gates and see how they transform quantum states.
        </p>
      </div>

      <div className="widget-content">
        <div className="gate-grid">
          <div className="gate-controls">
            <p className="metric-label">Select Gate:</p>
            <div className="gate-buttons">
              {(["X", "Y", "Z", "H", "S", "T"] as GateType[]).map((gate) => (
                <motion.div
                  key={gate}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setSelectedGate(gate)}
                    className={`gate-btn ${selectedGate === gate ? "active" : ""}`}
                  >
                    {gate}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="gate-info">
            <p className="body-copy">
              <strong>{selectedGate} Gate:</strong> {result.description}
            </p>
            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className="action-btn"
            >
              {showMatrix ? "Hide Matrix" : "Show Matrix"}
            </button>
            {showMatrix && (
              <div className="matrix-display">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="matrix">
                    {matrix.map((row, i) => (
                      <div key={i} className="matrix-row">
                        {row.map((cell, j) => (
                          <span key={j} className="matrix-cell">
                            {cell}
                          </span>
                      ))}
                    </div>
                  ))}
                </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        <div className="gate-transformation">
          <div className="state-pair">
            <div className="state-column">
              <p className="metric-label">Input State:</p>
              <div className="state-selector">
                {(["0", "1", "+"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setInputState(
                        s === "+" ? "|+⟩" : (`|${s}⟩` as InputState)
                      )
                    }
                    className={`state-btn ${
                      inputState === (s === "+" ? "|+⟩" : `|${s}⟩`) ? "active" : ""
                    }`}
                  >
                    |{s}⟩
                  </button>
                ))}
              </div>
            </div>

            <div className="transform-arrow">→</div>

            <div className="state-column">
              <p className="metric-label">Output State:</p>
              <div className="output-display">
                <motion.div
                  key={`${selectedGate}-${inputState}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="output-state">{result.output}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="widget-note">
        Click on a gate name to select it, then choose an input state to see the
        transformation. The matrix shows the mathematical representation of the
        gate.
      </p>
    </section>
  );
}
