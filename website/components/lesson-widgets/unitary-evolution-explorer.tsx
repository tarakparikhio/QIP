"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface UnitaryOp {
  name: string;
  description: string;
  angle: number;
}

const unitaries: Record<string, UnitaryOp> = {
  RZ: {
    name: "RZ(θ)",
    description: "Phase rotation",
    angle: 0,
  },
  RX: {
    name: "RX(θ)",
    description: "X rotation",
    angle: 0,
  },
  RY: {
    name: "RY(θ)",
    description: "Y rotation",
    angle: 0,
  },
};

function rotateBlochZ(theta: number): [number, number, number] {
  return [0, 0, Math.cos(theta)];
}

function rotateBlochX(theta: number): [number, number, number] {
  return [0, Math.sin(theta), Math.cos(theta)];
}

function rotateBlochY(theta: number): [number, number, number] {
  return [Math.sin(theta), 0, Math.cos(theta)];
}

export function UnitaryEvolutionExplorer() {
  const [unitary, setUnitary] = useState<string>("RZ");
  const [time, setTime] = useState<number>(0.5);

  const theta = time * Math.PI;

  let position: [number, number, number] = [0, 0, 1];
  if (unitary === "RZ") position = rotateBlochZ(theta);
  else if (unitary === "RX") position = rotateBlochX(theta);
  else if (unitary === "RY") position = rotateBlochY(theta);

  const svgX = 50 + position[0] * 40;
  const svgY = 50 - position[2] * 40;

  return (
    <div className="unitary-main">
      <div className="unitary-controls">
        <div className="unitary-selector">
          <label className="metric-label">Select Unitary Evolution:</label>
          <div className="unitary-buttons">
            {Object.keys(unitaries).map((u) => (
              <button
                key={u}
                className={`unitary-btn ${unitary === u ? "active" : ""}`}
                onClick={() => setUnitary(u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="time-control">
          <label className="metric-label">Time Evolution (t ∝ θ):</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={time}
            onChange={(e) => setTime(parseFloat(e.target.value))}
            className="time-slider"
          />
          <p className="time-value">θ = {(theta / Math.PI).toFixed(2)}π rad</p>
        </div>
      </div>

      <div className="unitary-visualization">
        <svg viewBox="0 0 100 100" className="bloch-sphere-svg">
          {/* Sphere outline */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" opacity="0.2" />

          {/* Axes */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" opacity="0.1" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" opacity="0.1" strokeWidth="0.5" />

          {/* Basis states */}
          <circle cx="50" cy="10" r="1.5" fill="currentColor" opacity="0.5" />
          <text x="50" y="5" textAnchor="middle" fontSize="6" fill="currentColor">
            |0⟩
          </text>
          <circle cx="50" cy="90" r="1.5" fill="currentColor" opacity="0.5" />
          <text x="50" y="98" textAnchor="middle" fontSize="6" fill="currentColor">
            |1⟩
          </text>

          {/* Evolution path */}
          <path
            d={`M 50 10 L ${svgX} ${svgY}`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2,2"
            opacity="0.4"
          />

          {/* Current state */}
          <motion.circle
            cx={svgX}
            cy={svgY}
            r="2"
            fill="url(#bloch-gradient)"
            animate={{ cx: svgX, cy: svgY }}
            transition={{ duration: 0.2 }}
          />

          <defs>
            <radialGradient id="bloch-gradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>

        <div className="unitary-equation">
          <p className="metric-label">Evolution Equation:</p>
          <div className="equation">
            <div className="matrix-result">
              {unitary === "RZ" && (
                <>
                  <div className="equation-text">e^(-iθ/2 Z)</div>
                  <div className="equation-matrix">
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">e^(-iθ/2)</div>
                      <div className="matrix-cell-result">0</div>
                    </div>
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">0</div>
                      <div className="matrix-cell-result">e^(iθ/2)</div>
                    </div>
                  </div>
                </>
              )}
              {unitary === "RX" && (
                <>
                  <div className="equation-text">e^(-iθ/2 X)</div>
                  <div className="equation-matrix">
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">cos(θ/2)</div>
                      <div className="matrix-cell-result">-i sin(θ/2)</div>
                    </div>
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">-i sin(θ/2)</div>
                      <div className="matrix-cell-result">cos(θ/2)</div>
                    </div>
                  </div>
                </>
              )}
              {unitary === "RY" && (
                <>
                  <div className="equation-text">e^(-iθ/2 Y)</div>
                  <div className="equation-matrix">
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">cos(θ/2)</div>
                      <div className="matrix-cell-result">-sin(θ/2)</div>
                    </div>
                    <div className="matrix-row-result">
                      <div className="matrix-cell-result">sin(θ/2)</div>
                      <div className="matrix-cell-result">cos(θ/2)</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
