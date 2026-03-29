"use client";

import React, { useState } from "react";

type ProblemType = "search" | "factor";

export function GroversAlgorithmDemo() {
  const [problem, setProblem] = useState<ProblemType>("search");
  const [nQubits, setNQubits] = useState(3);
  const [currentIteration, setCurrentIteration] = useState(0);

  const databaseSize = Math.pow(2, nQubits);
  const optimalIterations = Math.ceil(Math.PI / 4 * Math.sqrt(databaseSize));
  const targetIndex = Math.floor(databaseSize / 3);

  const getAmplitude = (index: number, iteration: number): number => {
    const uniformProb = 1 / databaseSize;
    const boost = Math.sin(((2 * iteration + 1) * Math.asin(Math.sqrt(1 / databaseSize))) / 1);

    if (index === targetIndex) {
      return uniformProb + Math.sin(boost) * 2;
    } else {
      return uniformProb - Math.sin(boost) / (databaseSize - 1);
    }
  };

  const getProbabilities = (): number[] => {
    const probs: number[] = [];
    for (let i = 0; i < databaseSize; i++) {
      const amp = getAmplitude(i, currentIteration);
      probs.push(Math.max(0, Math.min(1, amp * amp)));
    }
    return probs;
  };

  const probabilities = getProbabilities();
  const targetProb = probabilities[targetIndex];
  const averageOtherProb =
    probabilities.reduce((sum, p, i) => (i === targetIndex ? sum : sum + p), 0) / (databaseSize - 1);

  const classicalQueries = Math.ceil(databaseSize / 2);
  const quantumQueries = optimalIterations;
  const speedup = classicalQueries / quantumQueries;

  const steps = [
    {
      title: "1. Initialize Superposition",
      description: "Create equal superposition of all database states",
      formula: "|ψ₀⟩ = (1/√N) Σ |i⟩",
      all: true,
    },
    {
      title: "2. Oracle",
      description: "Mark the target state with phase flip",
      formula: "Apply O: marks |target⟩ with phase -1",
      all: false,
    },
    {
      title: "3. Diffusion Operator",
      description: "Amplify amplitude of target state",
      formula: "Apply D: 2|ψ₀⟩⟨ψ₀| - I",
      all: true,
    },
    {
      title: "4. Measurement",
      description: "Measure with high probability for target",
      formula: "P(target) ≈ sin²((2k+1)θ)",
      all: false,
    },
  ];

  const problemDescriptions = {
    search: "Search unsorted database for marked item",
    factor: "Find factors of given number",
  };

  return (
    <div className="grovers-main">
      <div className="grover-setup">
        <div className="problem-selector">
          <label className="metric-label">Problem Type:</label>
          <div className="problem-buttons">
            <button
              className={`problem-btn ${problem === "search" ? "active" : ""}`}
              onClick={() => setProblem("search")}
            >
              Search Problem
            </button>
            <button
              className={`problem-btn ${problem === "factor" ? "active" : ""}`}
              onClick={() => setProblem("factor")}
            >
              Factoring Problem
            </button>
          </div>
        </div>

        <p style={{ marginTop: "1rem", color: "#666" }}>
          {problemDescriptions[problem]}
        </p>

        <div style={{ marginTop: "1rem" }}>
          <label className="metric-label">Number of Qubits: {nQubits}</label>
          <input
            type="range"
            min="2"
            max="5"
            value={nQubits}
            onChange={(e) => setNQubits(parseInt(e.target.value))}
            className="qubit-slider"
          />
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "0.9rem", color: "#999" }}>
            {[2, 3, 4, 5].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grover-execution">
        <p className="metric-label">Algorithm Steps:</p>
        <div className="grover-steps">
          {steps.map((step, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <div className="step-number">{i + 1}</div>
              <div className="step-content">
                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{step.title}</p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                  {step.description}
                </p>
                <p style={{ fontFamily: "monospace", color: "#667eea", fontSize: "0.9rem" }}>
                  {step.formula}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="state-evolution">
        <p className="metric-label">Iteration Control: {currentIteration} / {optimalIterations}</p>
        <input
          type="range"
          min="0"
          max={optimalIterations}
          value={currentIteration}
          onChange={(e) => setCurrentIteration(parseInt(e.target.value))}
          style={{
            width: "100%",
            marginBottom: "1rem",
            background: "linear-gradient(to right, #667eea, #764ba2)",
            height: "8px",
            borderRadius: "5px",
          }}
        />

        <p style={{ marginBottom: "1rem", color: "#666" }}>
          Amplitude Distribution After Iteration {currentIteration}:
        </p>

        <div className="probability-chart">
          {probabilities.map((prob, i) => (
            <div
              key={i}
              className={`probability-bar ${i === targetIndex ? "target" : ""}`}
              style={{ height: `${prob * 100}%` }}
            >
              <span className="probability-label">{i}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <p className="metric-label">Probability Analysis:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ background: "#f0f2f9", padding: "1rem", borderRadius: "6px" }}>
            <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.5rem" }}>Target State Probability</p>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea" }}>
              {(targetProb * 100).toFixed(1)}%
            </p>
          </div>
          <div style={{ background: "#f0f2f9", padding: "1rem", borderRadius: "6px" }}>
            <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.5rem" }}>Other States (Avg)</p>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#764ba2" }}>
              {(averageOtherProb * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop: "2rem" }}>
        <p className="metric-label">Speedup Comparison:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div className="amplitude-card">
            <div className="component-label">Classical Queries</div>
            <div className="component-value">{classicalQueries}</div>
          </div>
          <div className="amplitude-card">
            <div className="component-label">Quantum Queries</div>
            <div className="component-value high">{quantumQueries}</div>
          </div>
          <div className="amplitude-card high">
            <div className="component-label">Speedup Factor</div>
            <div className="component-value">~{speedup.toFixed(1)}x</div>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop: "2rem" }}>
        <p className="metric-label">Key Insights:</p>
        <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: "1.8" }}>
          <li>Reduces search time from O(N) to O(√N)</li>
          <li>Requires oracle function that recognizes target</li>
          <li>Optimal iterations: ≈ π√N / 4</li>
          <li>Amplifies target amplitude while suppressing others</li>
          <li>Foundation for database search and optimization</li>
        </ul>
      </div>
    </div>
  );
}
