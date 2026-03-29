"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

type QubitState = "zero" | "plus" | "one";

export function QuantumCoinFlip() {
  const [state, setState] = useState<QubitState>("zero");
  const [measurement, setMeasurement] = useState<QubitState | null>(null);
  const [stats, setStats] = useState<{ zero: number; one: number }>({
    zero: 0,
    one: 0,
  });

  const handleApplyH = () => {
    setState("plus");
  };

  const handleMeasure = () => {
    if (state !== "plus") return;

    const result = Math.random() < 0.5 ? "zero" : "one";
    setState(result);
    setMeasurement(result);

    setStats((prev) => ({
      ...prev,
      [result]: prev[result] + 1,
    }));
  };

  const handleReset = () => {
    setState("zero");
    setMeasurement(null);
  };

  const getStateLabel = () => {
    switch (state) {
      case "zero":
        return "|0⟩";
      case "plus":
        return "|+⟩";
      case "one":
        return "|1⟩";
    }
  };

  const getStateColor = () => {
    switch (state) {
      case "zero":
        return "#2d8ca8";
      case "plus":
        return "#d97706";
      case "one":
        return "#e11d48";
    }
  };

  const getStateFill = () => {
    return state === "plus"
      ? "url(#shimmer-gradient)"
      : getStateColor();
  };

  return (
    <div className="quantum-coin-flip" role="region" aria-label="Hadamard gate quantum coin flip widget">
      <svg
        className="qubit-display"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Qubit state: ${getStateLabel()}`}
      >
        <defs>
          <linearGradient
            id="shimmer-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
            <animate
              attributeName="offset"
              from="0%"
              to="100%"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" opacity="0.1" strokeWidth="2" />

        {/* Main qubit circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="40"
          fill={getStateFill()}
          opacity={state === "plus" ? 0.7 : 1}
          animate={
            state === "plus"
              ? {
                  opacity: [0.7, 1, 0.7],
                  r: [40, 42, 40],
                }
              : measurement
                ? { rotateZ: 360 }
                : {}
          }
          transition={
            state === "plus"
              ? { duration: 2, repeat: Infinity }
              : measurement
                ? { duration: 0.6, ease: "easeInOut" }
                : {}
          }
          style={{
            filter:
              state === "plus"
                ? "drop-shadow(0 0 12px currentColor)"
                : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))",
          }}
        />

        {/* State label */}
        <motion.text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="24"
          fontWeight="600"
          fill="white"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.5,
            repeat: state === "plus" ? Infinity : 0,
          }}
        >
          {getStateLabel()}
        </motion.text>
      </svg>

      {/* Controls */}
      <div className="quantum-coin-controls">
        <button
          onClick={handleApplyH}
          disabled={state !== "zero"}
          className="quantum-btn btn-apply"
          aria-label="Apply Hadamard gate to create superposition"
        >
          Apply H Gate
        </button>
        <button
          onClick={handleMeasure}
          disabled={state !== "plus"}
          className="quantum-btn btn-measure"
          aria-label="Measure qubit in computational basis"
        >
          Measure
        </button>
        <button
          onClick={handleReset}
          className="quantum-btn btn-reset"
          aria-label="Reset qubit to |0⟩ state"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Stats */}
      {(stats.zero > 0 || stats.one > 0) && (
        <div className="quantum-stats" aria-live="polite" aria-atomic="true">
          <div className="stat-item">
            <span className="stat-label">Measured |0⟩:</span>
            <span className="stat-value">{stats.zero}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Measured |1⟩:</span>
            <span className="stat-value">{stats.one}</span>
          </div>
          <div className="stat-ratio">
            {stats.zero + stats.one > 0 && (
              <div className="ratio-bar">
                <div
                  className="ratio-segment zero"
                  style={{
                    width: `${(stats.zero / (stats.zero + stats.one)) * 100}%`,
                  }}
                  role="img"
                  aria-label={`Zero: ${((stats.zero / (stats.zero + stats.one)) * 100).toFixed(1)}%`}
                />
                <div
                  className="ratio-segment one"
                  style={{
                    width: `${(stats.one / (stats.zero + stats.one)) * 100}%`,
                  }}
                  role="img"
                  aria-label={`One: ${((stats.one / (stats.zero + stats.one)) * 100).toFixed(1)}%`}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="quantum-description">
        <p>
          <strong>Try it:</strong> Apply the Hadamard (H) gate to create superposition, then measure to see random collapse to |0⟩ or |1⟩.
        </p>
      </div>
    </div>
  );
}
