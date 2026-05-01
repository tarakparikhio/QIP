import React from 'react';

// ─── TryIt ───────────────────────────────────────────────────────────────────
// The highlighted callout at the end of each lesson that bridges to
// the interactive playground.
//
// Usage:
//   <TryIt heading="4.5 — Try It: Build the Bell State">
//     <p>Apply <strong>H</strong> to qubit 0, then <strong>CNOT</strong>...</p>
//   </TryIt>
// ─────────────────────────────────────────────────────────────────────────────

interface TryItProps {
  heading: string;
  children: React.ReactNode;
}

export default function TryIt({ heading, children }: TryItProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
      <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
        <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-0.5 rounded uppercase tracking-widest">
          Try It
        </span>
        {/* Strip the "X.Y — Try It: " prefix if present, else show as-is */}
        <span>{heading.replace(/^\d+\.\d+\s*—\s*Try It:\s*/i, '')}</span>
      </h2>
      <div className="text-foreground/80 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}
