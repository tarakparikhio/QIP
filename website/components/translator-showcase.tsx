"use client";

import { useLearningMode } from "@/components/learning-mode";
import { translatorExamples } from "@/config/translator";

export function TranslatorShowcase() {
  const { mode } = useLearningMode();

  // Filter examples based on learning mode
  const displayedExamples = translatorExamples.filter(
    (example) => example.bestFor === mode || example.bestFor === "both"
  );

  // Show at most 5 examples; prioritize "both" examples
  const prioritized = displayedExamples.sort((a, b) => {
    if (a.bestFor === "both" && b.bestFor !== "both") return -1;
    if (a.bestFor !== "both" && b.bestFor === "both") return 1;
    return 0;
  });
  const shown = prioritized.slice(0, 5);

  return (
    <section className="translator-showcase" aria-live="polite">
      <div className="translator-header">
        <h2>Classical → Quantum Translation</h2>
        <p className="translator-intro">
          Map familiar programming concepts to their quantum equivalents.
        </p>
      </div>
      <div className="translator-grid">
        {shown.map((example) => (
          <article
            key={example.id}
            className="translator-card"
            data-lens={example.lens}
          >
            <div className="translator-lens">
              <h4>{example.lens}</h4>
            </div>
            <div className="translator-mapping">
              <div className="translator-side classical">
                <label>Classical</label>
                <code>{example.classical}</code>
              </div>
              <div className="translator-arrow">→</div>
              <div className="translator-side quantum">
                <label>Quantum</label>
                <code>{example.quantum}</code>
              </div>
            </div>
            <p className="translator-explanation">{example.explanation}</p>
          </article>
        ))}
      </div>
      {translatorExamples.length > shown.length && (
        <div className="translator-more">
          <p>
            {translatorExamples.length - shown.length} more mapping
            {translatorExamples.length - shown.length !== 1 ? "s" : ""} available
          </p>
        </div>
      )}
    </section>
  );
}
