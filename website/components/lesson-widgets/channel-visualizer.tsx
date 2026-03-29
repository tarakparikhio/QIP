"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ChannelType = "pauli" | "amplitude_damp" | "phase_damp" | "depolarizing";

export function Lesson13ChannelVisualizer() {
  const [channel, setChannel] = useState<ChannelType>("pauli");
  const [parameter, setParameter] = useState(0.1);
  const [purity, setPurity] = useState(1);

  const updatePurity = () => {
    const rawPurity = 1 - parameter * 0.5;
    setPurity(Math.max(0, rawPurity));
  };

  const channelNames: Record<ChannelType, string> = {
    pauli: "Pauli Channel",
    amplitude_damp: "Amplitude Damping",
    phase_damp: "Phase Damping",
    depolarizing: "Depolarizing Channel",
  };

  const channelParams: Record<ChannelType, string> = {
    pauli: "p (error probability)",
    amplitude_damp: "γ (decay rate)",
    phase_damp: "λ (dephasing rate)",
    depolarizing: "p (noise strength)",
  };

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>🌊 Quantum Channels</h4>
        <p className="widget-description">
          Visualize how quantum channels transform and degrade quantum states.
        </p>
      </div>

      <div className="widget-content">
        <div className="channel-selector">
          <p className="metric-label">Channel Type:</p>
          <div className="channel-buttons">
            {(["pauli", "amplitude_damp", "phase_damp", "depolarizing"] as const).map((c) => (
              <motion.div key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => {
                    setChannel(c);
                    updatePurity();
                  }}
                  className={`channel-btn ${channel === c ? "active" : ""}`}
                >
                  {channelNames[c].split(" ")[0]}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="channel-param">
          <p className="metric-label">
            {channelParams[channel]}: {parameter.toFixed(3)}
          </p>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={parameter}
            onChange={(e) => {
              setParameter(Number(e.target.value));
              updatePurity();
            }}
            className="param-slider"
          />
        </div>

        <div className="channel-visualization">
          <div className="purity-display">
            <p className="metric-label">State Purity: {(purity * 100).toFixed(1)}%</p>
            <div className="purity-bar">
              <motion.div
                animate={{ width: `${purity * 100}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '6px',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}
              />
            </div>
          </div>

          <svg viewBox="0 0 200 150" className="channel-diagram">
            {/* Input state */}
            <circle cx="30" cy="75" r="15" fill="#3b82f6" opacity="0.6" />
            <text x="30" y="110" textAnchor="middle" fontSize="10" fill="currentColor">
              Input
            </text>

            {/* Channel box */}
            <rect x="70" y="55" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="100" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
              ε
            </text>

            {/* Output state */}
            <motion.circle
              cx="170"
              cy="75"
              r={15 * purity}
              fill="#ef4444"
              opacity={purity * 0.8}
              animate={{ r: 15 * purity }}
              transition={{ duration: 0.3 }}
            />
            <text x="170" y="110" textAnchor="middle" fontSize="10" fill="currentColor">
              Output
            </text>

            {/* Arrow */}
            <path d="M 50 75 L 70 75" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <path d="M 130 75 L 170 75" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
              </marker>
            </defs>
          </svg>

          <div className="channel-info">
            <p className="body-copy">
              <strong>Channel:</strong> {channelNames[channel]}
            </p>
            <p className="body-copy">
              <strong>Effect:</strong> Purity decreases as noise increases
            </p>
          </div>
        </div>
      </div>

      <p className="widget-note">
        Quantum channels model realistic imperfections. Adjust the parameter to see how output state
        purity decreases with channel noise.
      </p>
    </section>
  );
}
