"use client";

import React, { useState } from "react";

interface MeasurementResult {
  basis: string;
  outcomes: { value: 0 | 1; count: number }[];
}

export function MeasurementStatisticsExplorer() {
  const [initialState, setInitialState] = useState<"zero" | "one" | "plus">("zero");
  const [basis, setBasis] = useState<"computational" | "hadamard">("computational");
  const [trials, setTrials] = useState<number>(100);
  const [measured, setMeasured] = useState(false);
  const [results, setResults] = useState<MeasurementResult | null>(null);

  const stateDescriptions: Record<string, { vector: string; description: string }> = {
    zero: { vector: "|0⟩", description: "Ground state" },
    one: { vector: "|1⟩", description: "Excited state" },
    plus: { vector: "|+⟩", description: "Equal superposition" },
  };

  const handleMeasure = () => {
    let count0 = 0,
      count1 = 0;

    for (let i = 0; i < trials; i++) {
      let prob0 = 0;

      if (basis === "computational") {
        if (initialState === "zero") prob0 = 1;
        else if (initialState === "one") prob0 = 0;
        else prob0 = 0.5;
      } else {
        if (initialState === "zero") prob0 = 0.5;
        else if (initialState === "one") prob0 = 0.5;
        else prob0 = 1;
      }

      if (Math.random() < prob0) count0++;
      else count1++;
    }

    setResults({
      basis: basis === "computational" ? "Computational {|0⟩, |1⟩}" : "Hadamard {|+⟩, |-⟩}",
      outcomes: [
        { value: 0, count: count0 },
        { value: 1, count: count1 },
      ],
    });
    setMeasured(true);
  };

  const resetMeasurement = () => {
    setMeasured(false);
    setResults(null);
  };

  const getExpectation = () => {
    if (!results) return 0;
    const total = results.outcomes.reduce((sum, o) => sum + o.count, 0);
    return (results.outcomes[1].count / total) * 100;
  };

  return (
    <div className="measurement-stats-main">
      <div className="measurement-config">
        <div className="state-prep">
          <label className="metric-label">Initial Quantum State:</label>
          <div className="state-buttons">
            {Object.entries(stateDescriptions).map(([key, val]) => (
              <button
                key={key}
                className={`state-btn ${initialState === key ? "active" : ""}`}
                onClick={() => setInitialState(key as typeof initialState)}
              >
                <div className="state-label">{val.vector}</div>
                <div className="state-desc">{val.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="basis-selection">
          <label className="metric-label">Measurement Basis:</label>
          <div className="basis-buttons">
            <button
              className={`basis-btn ${basis === "computational" ? "active" : ""}`}
              onClick={() => setBasis("computational")}
            >
              Computational
            </button>
            <button
              className={`basis-btn ${basis === "hadamard" ? "active" : ""}`}
              onClick={() => setBasis("hadamard")}
            >
              Hadamard
            </button>
          </div>
        </div>

        <div className="trial-count">
          <label className="metric-label">Number of Trials:</label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={trials}
            onChange={(e) => setTrials(parseInt(e.target.value))}
            className="trial-slider"
          />
          <p className="trial-value">{trials} trials</p>
        </div>

        <div className="measure-buttons">
          <button className="run-btn" onClick={handleMeasure}>
            Run Measurement Experiment
          </button>
          {measured && (
            <button className="reset-btn" onClick={resetMeasurement}>
              Reset
            </button>
          )}
        </div>
      </div>

      {measured && results && (
        <div className="measurement-results">
          <p className="metric-label">Measurement Results - {results.basis}:</p>
          <div className="results-grid">
            {results.outcomes.map((outcome, idx) => {
              const percentage = (outcome.count / trials) * 100;
              return (
                <div key={idx} className="outcome-card">
                  <div className="outcome-label">|{outcome.value}⟩</div>
                  <div className="outcome-bar">
                    <div
                      className="outcome-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="outcome-stats">
                    <div className="stat">{outcome.count} counts</div>
                    <div className="stat">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="statistics-display">
            <div className="stat-item">
              <span className="stat-name">Expected Value:</span>
              <span className="stat-value">{getExpectation().toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Total Measurements:</span>
              <span className="stat-value">{trials}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
