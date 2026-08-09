'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useProgressStore } from '@/lib/store/progressStore';

const PANEL_RATIO_KEYS = ['qcpath:blochSphere:ratio', 'qcpath:multiBloch:ratio'];

export default function SettingsMenu() {
  const resetProgress = useProgressStore((state) => state.resetProgress);
  const [open, setOpen] = useState(false);

  function handleReset() {
    const confirmed = window.confirm(
      'Reset all progress?\n\nThis clears lesson completion, quiz results, XP, and saved panel sizes.\n\nThis cannot be undone.'
    );
    if (!confirmed) return;

    resetProgress();
    try {
      PANEL_RATIO_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // Local storage may be unavailable in a restricted browser context.
    }
    window.location.href = '/';
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open settings"
        aria-expanded={open}
        aria-controls="site-settings"
        title="Settings"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-base text-muted transition hover:border-primary/50 hover:text-foreground"
      >
        <span aria-hidden="true">⚙</span>
      </button>

      {open && (
        <div id="site-settings" className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border/70 bg-card p-2 text-left shadow-xl">
          <p className="px-3 pb-2 pt-1 text-[10px] font-mono uppercase tracking-widest text-muted/60">Project</p>
          <Link
            href="/updates"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-xs text-foreground transition hover:bg-primary/10"
          >
            project updates
          </Link>
          <Link
            href="/run-on-ibm"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-xs text-foreground transition hover:bg-primary/10"
          >
            run on IBM Quantum
          </Link>
          <div className="my-2 border-t border-border/50" />
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg px-3 py-2 text-left text-xs text-rose-300 transition hover:bg-rose-500/10"
          >
            reset progress
          </button>
        </div>
      )}
    </div>
  );
}
