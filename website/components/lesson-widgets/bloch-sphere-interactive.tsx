"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Lesson8BlochSphereInteractive() {
  const [theta, setTheta] = useState(90);
  const [phi, setPhi] = useState(0);

  const thetaRad = (theta * Math.PI) / 180;
  const phiRad = (phi * Math.PI) / 180;

  const x = Math.sin(thetaRad) * Math.cos(phiRad);
  const y = Math.sin(thetaRad) * Math.sin(phiRad);
  const z = Math.cos(thetaRad);

  const sphereX = (50 + x * 35).toFixed(1);
  const sphereY = (50 - z * 35).toFixed(1);

  const getQuantumState = () => {
    if (theta === 0) return "|0⟩";
    if (theta === 180) return "|1⟩";
    if (phi === 0 && theta === 90) return "|+⟩";
    if (phi === 180 && theta === 90) return "|-⟩";
    if (phi === 90 && theta === 90) return "|i⟩";
    if (phi === 270 && theta === 90) return "|-i⟩";

    const c = Math.cos(thetaRad / 2);
    const s = Math.sin(thetaRad / 2);
    const eiPhi =
      phiRad === 0 ? 1 : phiRad === Math.PI / 2 ? "i" : "e^(iφ)";

    return (
      c.toFixed(2) +
      "|0⟩ + " +
      (eiPhi === 1 ? s.toFixed(2) : s.toFixed(2) + eiPhi) +
      "|1⟩"
    );
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🌐 Bloch Sphere</h4>
        <p className="widget-description">
          Interactive Bloch sphere representation of single-qubit states.
        </p>
      </div>

      <div className="widget-content">
        <div className="bloch-main">
          <svg viewBox="0 0 100 100" className="bloch-sphere-svg">
            {/* Main sphere outline */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Equator (XY plane) */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.2"
            />

            {/* Z axis */}
            <line
              x1="50"
              y1="12"
              x2="50"
              y2="88"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Basis point |0⟩ (north pole) */}
            <circle cx="50" cy="12" r="2.5" fill="#2d8ca8" opacity="0.8" />
            <text
              x="50"
              y="8"
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
            >
              |0⟩
            </text>

            {/* Basis point |1⟩ (south pole) */}
            <circle cx="50" cy="88" r="2.5" fill="#e11d48" opacity="0.8" />
            <text
              x="50"
              y="95"
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
            >
              |1⟩
            </text>

            {/* Point on equator |+⟩ */}
            <circle cx="85" cy="50" r="1.5" fill="#d97706" opacity="0.6" />
            <text
              x="90"
              y="52"
              fontSize="7"
              fill="currentColor"
              opacity="0.7"
            >
              |+⟩
            </text>

            {/* Point on equator |-⟩ */}
            <circle cx="15" cy="50" r="1.5" fill="#7c3aed" opacity="0.6" />
            <text
              x="8"
              y="52"
              fontSize="7"
              fill="currentColor"
              opacity="0.7"
            >
              |-⟩
            </text>

            {/* Vector from center to point */}
            <line
              x1="50"
              y1="50"
              x2={parseFloat(sphereX)}
              y2={parseFloat(sphereY)}
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* Current state point */}
            <motion.circle
              cx={parseFloat(sphereX)}
              cy={parseFloat(sphereY)}
              r="3"
              fill="#10b981"
              animate={{
                cx: parseFloat(sphereX),
                cy: parseFloat(sphereY),
              }}
              transition={{ duration: 0.2 }}
            />
          </svg>

          <div className="bloch-angles">
            <div className="angle-group">
              <p className="metric-label">θ (Polar): {theta.toFixed(0)}°</p>
              <input
                type="range"
                min="0"
                max="180"
                value={theta}
                onChange={(e) => setTheta(Number(e.target.value))}
                className="angle-slider"
              />
            </div>

            <div className="angle-group">
              <p className="metric-label">φ (Azimuthal): {phi.toFixed(0)}°</p>
              <input
                type="range"
                min="0"
                max="360"
                value={phi}
                onChange={(e) => setPhi(Number(e.target.value))}
                className="angle-slider"
              />
            </div>
          </div>
        </div>

        <div className="bloch-state-info">
          <div className="state-display">
            <p className="metric-label">Quantum State |ψ⟩:</p>
            <div key={`${theta}-${phi}`} className="state-equation-box">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {getQuantumState()}
              </motion.div>
            </div>
          </div>

          <div className="state-details">
            <p className="body-copy">
              <strong>X:</strong> {x.toFixed(3)}
            </p>
            <p className="body-copy">
              <strong>Y:</strong> {y.toFixed(3)}
            </p>
            <p className="body-copy">
              <strong>Z:</strong> {z.toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      <p className="widget-note">
        Drag the sliders to move the point around the Bloch sphere. Each
        position corresponds to a unique quantum state.
      </p>
    </section>
  );
}
