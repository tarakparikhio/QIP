"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type NoiseType = "bit-flip" | "phase-flip" | "depolarizing";

export function Lesson12NoiseChannelSimulator() {
  const [noiseType, setNoiseType] = useState<NoiseType>("depolarizing");
  const [errorProb, setErrorProb] = useState(0.1);
  const [applied, setApplied] = useState(false);
  const [outcomes, setOutcomes] = useState({ noError: 0, withError: 0 });

  const applyNoise = () => {
    const trials = 100;
    let noError = 0;
    let withError = 0;

    for (let i = 0; i < trials; i++) {
      if (Math.random() < errorProb) {
        withError++;
      } else {
        noError++;
      }
    }

    setOutcomes({ noError, withError });
    setApplied(true);
  };

  const noiseDescriptions: Record<NoiseType, string> = {
    "bit-flip": "X gate applied with probability p",
    "phase-flip": "Z gate applied with probability p",
    depolarizing: "Random Pauli applied with probability p",
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚙️ Quantum Noise Channels</h4>
        <p className="widget-description">
          Simulate different types of quantum noise (errors).
        </p>
      </div>

      <div className="widget-content">
        <div className="noise-config">
          <div className="noise-selector">
            <p className="metric-label">Noise Type:</p>
            <div className="noise-buttons">
              {(["bit-flip", "phase-flip", "depolarizing"] as const).map((type) => (
                <motion.div key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setNoiseType(type)}
                    className={`noise-btn ${noiseType === type ? "active" : ""}`}
                  >
                    {type === "bit-flip" ? "Bit Flip" : type === "phase-flip" ? "Phase Flip" : "Depolarizing"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="error-prob-slider">
            <p className="metric-label">Error Probability: {(errorProb * 100).toFixed(1)}%</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={errorProb}
              onChange={(e) => setErrorProb(Number(e.target.value))}
              className="noise-slider"
            />
          </div>

          <p className="noise-description">
            <strong>Effect:</strong> {noiseDescriptions[noiseType]}
          </p>
        </div>

        <div className="noise-visualization">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={applyNoise}
              className="action-btn apply-noise-btn"
            >
              Apply Noise (100 trials)
            </button>
          </motion.div>

          {applied && (
            <div className="noise-results">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="stat-display">
                  <div className="stat-item">
                    <span className="stat-label">No Error:</span>
                    <span className="stat-value">{outcomes.noError}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">With Error:</span>
                    <span className="stat-value error">{outcomes.withError}</span>
                  </div>
                </div>

                <div className="error-bar-chart">
                  <div className="error-bar">
                    <div
                      className="bar-segment success"
                      style={{ width: `${(outcomes.noError / 100) * 100}%` }}
                    />
                    <div
                      className="bar-segment error"
                      style={{ width: `${(outcomes.withError / 100) * 100}%` }}
                    />
                  </div>
                  <div className="bar-labels">
                    <span>{(outcomes.noError / 100) * 100}%</span>
                    <span>{(outcomes.withError / 100) * 100}%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <p className="widget-note">
        Click "Apply Noise" to simulate {noiseType === "depolarizing" ? "depolarizing channel" : noiseType}
        with the specified error probability.
      </p>
    </section>
  );
}
