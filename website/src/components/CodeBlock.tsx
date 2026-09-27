'use client';

import { useState } from 'react';

type CodeBlockProps = {
  code: string;
  label?: string;
};

export default function CodeBlock({ code, label = 'Code' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border/60 bg-[#0b1020]">
      <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted">{label}</span>
        <button
          type="button"
          onClick={copyCode}
          className="rounded-md border border-border/60 px-2.5 py-1 text-xs text-muted transition hover:border-primary/50 hover:text-foreground"
          aria-label={`Copy ${label}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-6 text-foreground/90 sm:text-sm"><code>{code}</code></pre>
    </div>
  );
}
