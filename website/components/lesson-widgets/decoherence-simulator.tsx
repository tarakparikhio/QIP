"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Lesson11DecoherenceSimulator() {
  const [time, setTime] = useState(0);
  const maxTime = 100;
  const T2 = 80;
  const decayFactor = Math.exp(-(time / T2));

  const getOpacity = () => Math.max(0, decayFactor);
  const animationRadius = 20 + (1 - decayFactor) * 15;

  return (
    <section className="lesson-widget interactive-demo">
      <div className="widget-header">
        <h4>⏱️ Decoherence Decay</h4>
        <p className="widget-description">
          Watch quantum coherence decay over time (T₂ relaxation).
        </p>
      </div>

      <div className="widget-content">
        <div className="decoherence-main">
          <div className="decoherence-controls">
            <p className="metric-label">Time: {time.toFixed(1)} (T₂ = {T2})</p>
            <input
              type="range"
              min="0"
              max={maxTime}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="decoherence-slider"
            />
            <div className="time-markers">
              <span>0</span>
              <span>{T2 / 2}</span>
              <span>{T2}</span>
              <span>{maxTime}</span>
            </div>
          </div>

          <div className="decoherence-visualization">
            <svg viewBox="0 0 200 200" className="decoherence-plot">
              {/* Coordinate axes */}
              <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.2" />

              {/* Reference circle (full coherence) */}
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />

              {/* Decaying superposition state circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={30 * decayFactor}
                fill="#10b981"
                opacity={0.3}
                animate={{ r: animationRadius * decayFactor, opacity: getOpacity() }}
                transition={{ duration: 0.2 }}
              />

              {/* Pulsing circle to show decay */}
              <circle
                cx="100"
                cy="100"
                r="30"
                fill="none"
                stroke="#10b981"
                strokeWidth="1"
                opacity={decayFactor * 0.5}
              />

              {/* Labels */}
              <text x="100" y="25" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.6">
                |+⟩ → |0⟩ or |1⟩
              </text>
            </svg>

            <div className="decay-info">
              <p className="body-copy">
                <strong>Coherence:</strong> {(decayFactor * 100).toFixed(1)}%
              </p>
              <p className="body-copy">
                <strong>Decay Constant:</strong> e^(-t/T₂)
              </p>
              <div className="decay-bar">
                <div
                  className="decay-fill"
                  style={{ width: `${decayFactor * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="decoherence-description">
          <p className="body-copy">
            As time increases, the superposition state loses quantum coherence. The system transitions
            from a pure superposition |+⟩ to a mixed state, indistinguishable from randomly being |0⟩ or |1⟩.
          </p>
        </div>
      </div>

      <p className="widget-note">
        T₂ is the coherence time. At t = T₂, coherence decays to 37% of its original value.
      </p>
    </section>
  );
}
