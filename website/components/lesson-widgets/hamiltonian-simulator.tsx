"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type HamiltonianType = "single" | "pauli_z" | "ising";

export function Lesson14HamiltonianSimulator() {
  const [hamType, setHamType] = useState<HamiltonianType>("pauli_z");
  const [time, setTime] = useState(0);
  const maxTime = 10;

  const angleRotation = (time * Math.PI) / maxTime;

  const hamDescriptions: Record<HamiltonianType, string> = {
    single: "H = ω Z (Larmor precession)",
    pauli_z: "H = Z-field (|0⟩ favored)",
    ising: "H = Z₁⊗Z₂ (entanglement evolution)",
  };

  const getEigenvalues = (): number[] => {
    if (hamType === "pauli_z") return [1, -1];
    if (hamType === "ising") return [2, 0, 0, -2];
    return [1, -1];
  };

  const eigenvalues = getEigenvalues();

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⚡ Hamiltonian Evolution</h4>
        <p className="widget-description">
          Simulate time evolution under a Hamiltonian operator.
        </p>
      </div>

      <div className="widget-content">
        <div className="ham-config">
          <div className="ham-selector">
            <p className="metric-label">Hamiltonian:</p>
            <div className="ham-buttons">
              {(["single", "pauli_z", "ising"] as const).map((h) => (
                <motion.div key={h} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setHamType(h)}
                    className={`ham-btn ${hamType === h ? "active" : ""}`}
                  >
                    {h === "pauli_z" ? "Z-Field" : h === "single" ? "Single" : "Ising"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="metric-label">{hamDescriptions[hamType]}</p>
        </div>

        <div className="ham-evolution">
          <div className="time-slider">
            <p className="metric-label">Time: t = {time.toFixed(2)} (in units of 1/ω)</p>
            <input
              type="range"
              min="0"
              max={maxTime}
              step="0.1"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="evolution-slider"
            />
          </div>

          <svg viewBox="0 0 200 200" className="ham-diagram">
            {/* Bloch sphere outline */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />

            {/* Initial state |0⟩ */}
            <circle cx="100" cy="50" r="3" fill="#3b82f6" opacity="0.5" />

            {/* Rotating state */}
            <motion.line
              x1="100"
              y1="100"
              x2={100 + 40 * Math.cos(angleRotation)}
              y2={100 - 40 * Math.sin(angleRotation)}
              stroke="#ef4444"
              strokeWidth="2"
              animate={{
                x2: 100 + 40 * Math.cos(angleRotation),
                y2: 100 - 40 * Math.sin(angleRotation),
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Point */}
            <motion.circle
              cx={100 + 40 * Math.cos(angleRotation)}
              cy={100 - 40 * Math.sin(angleRotation)}
              r="4"
              fill="#ef4444"
              animate={{
                cx: 100 + 40 * Math.cos(angleRotation),
                cy: 100 - 40 * Math.sin(angleRotation),
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Angle arc */}
            <path
              d={`M 100 50 A 20 20 0 0 0 ${100 + 20 * Math.cos(angleRotation - Math.PI / 2)} 
                 ${100 - 20 * Math.sin(angleRotation - Math.PI / 2)}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>

          <div className="eigenvalue-display">
            <p className="metric-label">Eigenvalues:</p>
            <div className="eigenvalues-grid">
              {eigenvalues.map((eig, idx) => (
                <div key={idx} className="eigenvalue-item">
                  λ<sub>{idx + 1}</sub> = {eig}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ham-note">
          <p className="body-copy">
            Time evolution under Hamiltonian H produces rotation with angle proportional to time and eigenvalues.
          </p>
        </div>
      </div>

      <p className="widget-note">
        Adjust the time slider to see how the state evolves according to e^(-iHt).
      </p>
    </section>
  );
}
