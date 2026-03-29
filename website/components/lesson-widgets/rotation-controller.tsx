"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type RotationAxis = "x" | "y" | "z";

function getRotationMatrix(
  axis: RotationAxis,
  angle: number
): number[][] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  if (axis === "x") {
    return [
      [1, 0, 0],
      [0, c, -s],
      [0, s, c],
    ];
  } else if (axis === "y") {
    return [
      [c, 0, s],
      [0, 1, 0],
      [-s, 0, c],
    ];
  } else {
    return [
      [c, -s, 0],
      [s, c, 0],
      [0, 0, 1],
    ];
  }
}

function rotateBlochVector(
  vector: [number, number, number],
  axis: RotationAxis,
  angle: number
): [number, number, number] {
  const matrix = getRotationMatrix(axis, angle);
  const x =
    matrix[0][0] * vector[0] +
    matrix[0][1] * vector[1] +
    matrix[0][2] * vector[2];
  const y =
    matrix[1][0] * vector[0] +
    matrix[1][1] * vector[1] +
    matrix[1][2] * vector[2];
  const z =
    matrix[2][0] * vector[0] +
    matrix[2][1] * vector[1] +
    matrix[2][2] * vector[2];
  return [x, y, z];
}

export function Lesson7RotationController() {
  const [axis, setAxis] = useState<RotationAxis>("z");
  const [angle, setAngle] = useState(0);

  const angleRad = (angle * Math.PI) / 180;
  const blochVector = rotateBlochVector([0, 0, 1], axis, angleRad);
  const sphereX = (50 + blochVector[0] * 35).toFixed(1);
  const sphereY = (50 - blochVector[2] * 35).toFixed(1);

  const getGateEquation = () => {
    const angleDisplay =
      angle === 0 || angle === 360 ? "0" : angle.toFixed(0);
    const axisUpper = axis.toUpperCase();
    return `R_${axis}(${angleDisplay}°)`;
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🔄 Single-Qubit Rotations</h4>
        <p className="widget-description">
          Rotate quantum states using Rx, Ry, and Rz gates.
        </p>
      </div>

      <div className="widget-content">
        <div className="rotation-controls">
          <div className="axis-selector">
            <p className="metric-label">Rotation Axis:</p>
            <div className="axis-buttons">
              {(["x", "y", "z"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAxis(a)}
                  className={`axis-btn ${axis === a ? "active" : ""}`}
                >
                  R<sub>{a}</sub>
                </button>
              ))}
            </div>
          </div>

          <div className="angle-slider-group">
            <p className="metric-label">Angle: {angle.toFixed(0)}°</p>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="rotation-slider"
            />
            <div className="slider-marks">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
          </div>
        </div>

        <div className="rotation-visualization">
          <svg viewBox="0 0 100 100" className="rotation-bloch">
            {/* Sphere outline */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Axes */}
            <line
              x1="50"
              y1="12"
              x2="50"
              y2="88"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <line
              x1="12"
              y1="50"
              x2="88"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
            />

            {/* Basis points */}
            <circle cx="50" cy="12" r="2" fill="#2d8ca8" opacity="0.5" />
            <circle cx="50" cy="88" r="2" fill="#e11d48" opacity="0.5" />

            {/* Rotation vector */}
            <line
              x1="50"
              y1="50"
              x2={parseFloat(sphereX)}
              y2={parseFloat(sphereY)}
              stroke={
                axis === "x" ? "#3b82f6" : axis === "y" ? "#8b5cf6" : "#d97706"
              }
              strokeWidth="2"
            />

            {/* Point on sphere */}
            <motion.circle
              cx={parseFloat(sphereX)}
              cy={parseFloat(sphereY)}
              r="3"
              fill={
                axis === "x" ? "#3b82f6" : axis === "y" ? "#8b5cf6" : "#d97706"
              }
              animate={{
                cx: parseFloat(sphereX),
                cy: parseFloat(sphereY),
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>

          <div className="rotation-equation">
            <p className="metric-label">Gate:</p>
            <div className="equation-display">{getGateEquation()}</div>
          </div>
        </div>

        <div className="rotation-info">
          <p className="body-copy">
            <strong>Axis:</strong> R<sub>{axis}</sub> rotation
          </p>
          <p className="body-copy">
            <strong>Angle:</strong> {angle.toFixed(0)}° (
            {angleRad.toFixed(3)} rad)
          </p>
          <p className="body-copy">
            <strong>Starting State:</strong> |0⟩ (north pole per Bloch convention)
          </p>
        </div>
      </div>

      <p className="widget-note">
        Adjust the slider to rotate the state vector. The colored point shows the
        current state position on the Bloch sphere.
      </p>
    </section>
  );
}
