"use client";

import React, { useState } from "react";

export function QuantumPhaseDemo() {
  const [phase1, setPhase1] = useState(0);
  const [phase2, setPhase2] = useState(Math.PI / 4);
  const [phase3, setPhase3] = useState(Math.PI);

  const getDisplayPhase = (rad: number): string => {
    const normalized = ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const tolerance = 0.01;

    if (Math.abs(normalized) < tolerance)
      return "0";
    if (Math.abs(normalized - Math.PI / 4) < tolerance)
      return "π/4";
    if (Math.abs(normalized - Math.PI / 2) < tolerance)
      return "π/2";
    if (Math.abs(normalized - (3 * Math.PI) / 4) < tolerance)
      return "3π/4";
    if (Math.abs(normalized - Math.PI) < tolerance)
      return "π";
    if (Math.abs(normalized - (5 * Math.PI) / 4) < tolerance)
      return "5π/4";
    if (Math.abs(normalized - (3 * Math.PI) / 2) < tolerance)
      return "3π/2";
    if (Math.abs(normalized - (7 * Math.PI) / 4) < tolerance)
      return "7π/4";

    return `${(normalized * 180) / Math.PI}°`;
  };

  const getPhaseColor = (rad: number): string => {
    const norm = ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const hue = (norm / (2 * Math.PI)) * 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const realPart = Math.cos(phase1);
  const imagPart = Math.sin(phase1);

  const getAmplitudeString = (rad: number): string => {
    const real = Math.cos(rad);
    const imag = Math.sin(rad);
    const realStr = real.toFixed(2);
    const imagStr = imag.toFixed(2);
    const sign = imag >= 0 ? "+" : "";
    return `${realStr} ${sign} ${imagStr}i`;
  };

  const computePhaseRelation = () => {
    const diff = phase2 - phase1;
    const normDiff = ((diff % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const interference = Math.cos(normDiff);
    return {
      difference: normDiff,
      interferenceType: interference > 0.1 ? "Constructive" : interference < -0.1 ? "Destructive" : "Mixed",
      intensityFactor: (interference + 1) / 2,
    };
  };

  const relation = computePhaseRelation();

  return (
    <div className="quantum-phase-main">
      <div className="phase-controls">
        <div className="phase-slider-group">
          <label className="metric-label">φ₁ (First State Phase):</label>
          <div className="phase-display">{getDisplayPhase(phase1)}</div>
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step="0.01"
            value={phase1}
            onChange={(e) => setPhase1(parseFloat(e.target.value))}
            className="phase-slider"
            style={{
              background: `linear-gradient(to right, ${getPhaseColor(0)}, ${getPhaseColor(2 * Math.PI)})`,
            }}
          />
          <div className="phase-marks">
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI].map((mark) => (
              <span key={mark} style={{ left: `${(mark / (2 * Math.PI)) * 100}%` }}>
                {mark === 0 ? "0" : mark === Math.PI / 2 ? "π/2" : mark === Math.PI ? "π" : "3π/2"}
              </span>
            ))}
          </div>
        </div>

        <div className="phase-slider-group">
          <label className="metric-label">φ₂ (Second State Phase):</label>
          <div className="phase-display">{getDisplayPhase(phase2)}</div>
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step="0.01"
            value={phase2}
            onChange={(e) => setPhase2(parseFloat(e.target.value))}
            className="phase-slider"
            style={{
              background: `linear-gradient(to right, ${getPhaseColor(0)}, ${getPhaseColor(2 * Math.PI)})`,
            }}
          />
          <div className="phase-marks">
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI].map((mark) => (
              <span key={mark} style={{ left: `${(mark / (2 * Math.PI)) * 100}%` }}>
                {mark === 0 ? "0" : mark === Math.PI / 2 ? "π/2" : mark === Math.PI ? "π" : "3π/2"}
              </span>
            ))}
          </div>
        </div>

        <div className="phase-slider-group">
          <label className="metric-label">φ₃ (Third State Phase):</label>
          <div className="phase-display">{getDisplayPhase(phase3)}</div>
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step="0.01"
            value={phase3}
            onChange={(e) => setPhase3(parseFloat(e.target.value))}
            className="phase-slider"
            style={{
              background: `linear-gradient(to right, ${getPhaseColor(0)}, ${getPhaseColor(2 * Math.PI)})`,
            }}
          />
          <div className="phase-marks">
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI].map((mark) => (
              <span key={mark} style={{ left: `${(mark / (2 * Math.PI)) * 100}%` }}>
                {mark === 0 ? "0" : mark === Math.PI / 2 ? "π/2" : mark === Math.PI ? "π" : "3π/2"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="phase-visualization">
        <div className="phasor-diagram">
          <p className="metric-label">Phasor Diagram (φ₁):</p>
          <svg width="200" height="200" viewBox="0 0 200 200" className="phasor-svg">
            {/* Grid */}
            <line x1="100" y1="0" x2="100" y2="200" stroke="#ccc" strokeDasharray="2" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="#ccc" strokeDasharray="2" />

            {/* Circle */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#999" strokeWidth="1" />

            {/* Phasor 1 */}
            <line
              x1="100"
              y1="100"
              x2={100 + realPart * 80}
              y2={100 - imagPart * 80}
              stroke={getPhaseColor(phase1)}
              strokeWidth="2"
            />
            <circle
              cx={100 + realPart * 80}
              cy={100 - imagPart * 80}
              r="4"
              fill={getPhaseColor(phase1)}
            />

            {/* Phasor 2 */}
            <line
              x1="100"
              y1="100"
              x2={100 + Math.cos(phase2) * 80}
              y2={100 - Math.sin(phase2) * 80}
              stroke={getPhaseColor(phase2)}
              strokeWidth="2"
              opacity="0.6"
            />
            <circle
              cx={100 + Math.cos(phase2) * 80}
              cy={100 - Math.sin(phase2) * 80}
              r="4"
              fill={getPhaseColor(phase2)}
              opacity="0.6"
            />

            {/* Phasor 3 */}
            <line
              x1="100"
              y1="100"
              x2={100 + Math.cos(phase3) * 80}
              y2={100 - Math.sin(phase3) * 80}
              stroke={getPhaseColor(phase3)}
              strokeWidth="2"
              opacity="0.4"
            />
            <circle
              cx={100 + Math.cos(phase3) * 80}
              cy={100 - Math.sin(phase3) * 80}
              r="4"
              fill={getPhaseColor(phase3)}
              opacity="0.4"
            />

            {/* Labels */}
            <text x="105" y="110" fontSize="10" fill="#666">
              Re
            </text>
            <text x="85" y="20" fontSize="10" fill="#666">
              Im
            </text>
          </svg>
        </div>

        <div className="complex-representation">
          <p className="metric-label">Complex Representation:</p>
          <div className="complex-box">
            <div className="complex-item">
              <span className="label">e^(iφ₁) =</span>
              <span className="value">{getAmplitudeString(phase1)}</span>
            </div>
            <div className="complex-item">
              <span className="label">e^(iφ₂) =</span>
              <span className="value">{getAmplitudeString(phase2)}</span>
            </div>
            <div className="complex-item">
              <span className="label">e^(iφ₃) =</span>
              <span className="value">{getAmplitudeString(phase3)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="phase-interference">
        <p className="metric-label">Relative Phase Effect (φ₁ vs φ₂):</p>
        <div className="interference-box">
          <div className="interference-item">
            <span className="label">Phase Difference (φ₂ - φ₁):</span>
            <span className="value">{getDisplayPhase(relation.difference)}</span>
          </div>
          <div className="interference-item">
            <span className="label">Interference Type:</span>
            <span className={`value ${relation.interferenceType.toLowerCase()}`}>
              {relation.interferenceType}
            </span>
          </div>
          <div className="interference-item">
            <span className="label">Amplitude Intensity:</span>
            <div className="intensity-bar-container">
              <div
                className="intensity-bar"
                style={{
                  width: `${relation.intensityFactor * 100}%`,
                  backgroundColor: getPhaseColor(phase2 - phase1),
                }}
              />
            </div>
            <span className="value intensity">{(relation.intensityFactor * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="phase-explanation">
        <p className="metric-label">Key Concepts:</p>
        <ul className="explanation-list">
          <li>
            <strong>Phase:</strong> The rotational angle of a complex amplitude on the unit circle
          </li>
          <li>
            <strong>Relative Phase:</strong> The difference between two phases determines interference patterns
          </li>
          <li>
            <strong>Global Phase:</strong> An overall phase shift has no observable effect on probability
          </li>
          <li>
            <strong>Interference:</strong> When φ₂ - φ₁ ≈ 0, amplitudes add (constructive). When φ₂ - φ₁ ≈ π,
            they cancel (destructive)
          </li>
        </ul>
      </div>
    </div>
  );
}
