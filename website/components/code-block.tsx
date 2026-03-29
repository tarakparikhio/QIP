"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="code-shell">
      <div className="code-toolbar">
        <span className="code-label">{title}</span>
        <button
          className={`copy-button ${copied ? "copied" : ""}`}
          type="button"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy Code"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
