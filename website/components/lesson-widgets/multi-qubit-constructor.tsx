"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type QubitCount = 2 | 3;
type QubitState = "|0⟩" | "|1⟩" | "|+⟩" | "|-⟩";

const basisStates: Record<QubitCount, string[]> = {
  2: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
  3: [
    "|000⟩",
    "|001⟩",
    "|010⟩",
    "|011⟩",
    "|100⟩",
    "|101⟩",
    "|110⟩",
    "|111⟩",
  ],
};

export function Lesson9MultiQubitConstructor() {
  const [qubitCount, setQubitCount] = useState<QubitCount>(2);
  const [states, setStates] = useState<QubitState[]>(
    Array(qubitCount).fill("|0⟩")
  );
  const [showGrid, setShowGrid] = useState(true);

  const handleStateChange = (index: number, newState: QubitState) => {
    const newStates = [...states];
    newStates[index] = newState;
    setStates(newStates);
  };

  const handleQubitCountChange = (count: QubitCount) => {
    setQubitCount(count);
    setStates(Array(count).fill("|0⟩"));
  };

  const productStateDisplay = states.join(" ⊗ ");
  const dimension = Math.pow(2, qubitCount);

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🧮 Multi-Qubit Systems</h4>
        <p className="widget-description">
          Construct product states from multiple qubits.
        </p>
      </div>

      <div className="widget-content">
        <div className="multi-qubit-config">
          <div className="qubit-count-selector">
            <p className="metric-label">Number of Qubits:</p>
            <div className="qubit-buttons">
              {([2, 3] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => handleQubitCountChange(count)}
                  className={`qubit-btn ${qubitCount === count ? "active" : ""}`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="individual-states">
            <p className="metric-label">Individual Qubit States:</p>
            {states.map((state, idx) => (
              <div key={idx} className="qubit-state-selector">
                <label className="qubit-label">Qubit {idx + 1}:</label>
                <div className="state-radio-group">
                  {(["0", "1", "+", "-"] as const).map((s) => {
                    const stateValue: QubitState =
                      s === "+" ? "|+⟩" : s === "-" ? "|-⟩" : `|${s}⟩`;
                    return (
                      <label key={s} className="radio-label">
                        <input
                          type="radio"
                          name={`qubit-${idx}`}
                          value={s}
                          checked={state === stateValue}
                          onChange={() => handleStateChange(idx, stateValue)}
                        />
                        |{s}⟩
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product-state-display">
          <p className="metric-label">Product State:</p>
          <div className="product-result">
            <motion.div
              key={productStateDisplay}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {productStateDisplay}
            </motion.div>
          </div>
        </div>

        <div className="basis-info">
          <p className="body-copy">
            <strong>Hilbert Space Dimension:</strong> 2^{qubitCount} = {dimension}
          </p>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="action-btn"
          >
            {showGrid ? "Hide Basis Grid" : "Show Basis Grid"}
          </button>

          {showGrid && (
            <div className="basis-grid">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="metric-label">All {dimension} Basis States:</p>
                <div className={`grid grid-${qubitCount}`}>
                  {basisStates[qubitCount].map((state, idx) => (
                    <div
                      key={idx}
                      className={`basis-state ${
                        idx % 2 === 0 ? "even" : "odd"
                      }`}
                  >
                    {state}
                  </div>
                ))}
              </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <p className="widget-note">
        Select individual states for each qubit, and combine them into a
        multi-qubit product state. The total dimension grows exponentially: 2^n
        for n qubits.
      </p>
    </section>
  );
}
