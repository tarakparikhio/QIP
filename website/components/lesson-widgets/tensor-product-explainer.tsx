"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type InputState = "|0⟩" | "|1⟩" | "|+⟩" | "|-⟩";

const stateVectors: Record<InputState, [number, number] | string> = {
  "|0⟩": [1, 0],
  "|1⟩": [0, 1],
  "|+⟩": "1/√2[1, 1]",
  "|-⟩": "1/√2[1, -1]",
};

interface TensorResult {
  state1: InputState;
  state2: InputState;
  terms: string[];
  formula: string;
}

function calculateTensorProduct(
  state1: InputState,
  state2: InputState
): TensorResult {
  const combinations: Record<string, TensorResult> = {
    "|0⟩|0⟩": {
      state1: "|0⟩",
      state2: "|0⟩",
      terms: ["1 · |00⟩"],
      formula: "|0⟩ ⊗ |0⟩ = |00⟩",
    },
    "|0⟩|1⟩": {
      state1: "|0⟩",
      state2: "|1⟩",
      terms: ["1 · |01⟩"],
      formula: "|0⟩ ⊗ |1⟩ = |01⟩",
    },
    "|1⟩|0⟩": {
      state1: "|1⟩",
      state2: "|0⟩",
      terms: ["1 · |10⟩"],
      formula: "|1⟩ ⊗ |0⟩ = |10⟩",
    },
    "|1⟩|1⟩": {
      state1: "|1⟩",
      state2: "|1⟩",
      terms: ["1 · |11⟩"],
      formula: "|1⟩ ⊗ |1⟩ = |11⟩",
    },
    "|+⟩|+⟩": {
      state1: "|+⟩",
      state2: "|+⟩",
      terms: ["1/2 · |00⟩", "1/2 · |01⟩", "1/2 · |10⟩", "1/2 · |11⟩"],
      formula: "(|0⟩ + |1⟩)/√2 ⊗ (|0⟩ + |1⟩)/√2 = (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2",
    },
    "|0⟩|+⟩": {
      state1: "|0⟩",
      state2: "|+⟩",
      terms: ["1/√2 · |00⟩", "1/√2 · |01⟩"],
      formula:
        "|0⟩ ⊗ (|0⟩ + |1⟩)/√2 = (|00⟩ + |01⟩)/√2",
    },
    "|1⟩|+⟩": {
      state1: "|1⟩",
      state2: "|+⟩",
      terms: ["1/√2 · |10⟩", "1/√2 · |11⟩"],
      formula:
        "|1⟩ ⊗ (|0⟩ + |1⟩)/√2 = (|10⟩ + |11⟩)/√2",
    },
  };

  const key = `${state1}${state2}`;
  return combinations[key] || combinations["|0⟩|0⟩"];
}

export function Lesson10TensorProductExplainer() {
  const [state1, setState1] = useState<InputState>("|0⟩");
  const [state2, setState2] = useState<InputState>("|1⟩");
  const [expandedStep, setExpandedStep] = useState(0);

  const result = calculateTensorProduct(state1, state2);

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⊗ Tensor Products</h4>
        <p className="widget-description">
          Visualize tensor product expansion step by step.
        </p>
      </div>

      <div className="widget-content">
        <div className="tensor-inputs">
          <div className="state-input">
            <p className="metric-label">State 1 (|ψ⟩):</p>
            <div className="state-buttons">
              {(["0", "1", "+", "-"] as const).map((s) => {
                const stateVal: InputState =
                  s === "+" ? "|+⟩" : s === "-" ? "|-⟩" : `|${s}⟩`;
                return (
                  <motion.div
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setState1(stateVal)}
                      className={`state-btn ${state1 === stateVal ? "active" : ""}`}
                    >
                      |{s}⟩
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="tensor-operator">
            <p className="metric-label">Operator:</p>
            <div className="operator-display">⊗</div>
          </div>

          <div className="state-input">
            <p className="metric-label">State 2 (|φ⟩):</p>
            <div className="state-buttons">
              {(["0", "1", "+", "-"] as const).map((s) => {
                const stateVal: InputState =
                  s === "+" ? "|+⟩" : s === "-" ? "|-⟩" : `|${s}⟩`;
                return (
                  <motion.div
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setState2(stateVal)}
                      className={`state-btn ${state2 === stateVal ? "active" : ""}`}
                    >
                      |{s}⟩
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="tensor-result">
          <motion.div
            key={`${state1}-${state2}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="metric-label">Result: |ψ⟩ ⊗ |φ⟩ =</p>
            <div className="result-formula">{result.formula}</div>
          </motion.div>
        </div>

        <div className="tensor-expansion">
          <p className="metric-label">Basis State Terms:</p>
          <div className="terms-list">
            {result.terms.map((term, idx) => (
              <div
                key={idx}
                onClick={() => setExpandedStep(idx)}
                className={`term-card ${expandedStep === idx ? "expanded" : ""}`}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <p className="term-display">{term}</p>
                  {expandedStep === idx && (
                    <div className="term-explanation">
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                      >
                        This represents the combined state spanning basis vector
                        component {idx}.
                      </motion.p>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="tensor-info">
          <p className="body-copy">
            <strong>Original Dimension:</strong> 2 × 2 = 4 basis states total
          </p>
          <p className="body-copy">
            <strong>Resulting State:</strong> Linear combination of 2-qubit
            computational basis states
          </p>
        </div>
      </div>

      <p className="widget-note">
        Click on a basis state term to see its explanation. The tensor product
        combines two single-qubit states into a two-qubit product state.
      </p>
    </section>
  );
}
