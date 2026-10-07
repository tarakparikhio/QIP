'use client';

import { useEffect, useState } from 'react';

type Active = { year: string; title: string; tone: string; index: number };

const TONE_DOT: Record<string, string> = {
  classical: 'bg-sky-400',
  physics: 'bg-amber-400',
  bridge: 'bg-emerald-400',
  quantum: 'bg-primary',
};

/** Floating "you are here" pill that follows the milestone in the middle of the screen. */
export default function YearTracker({ total }: { total: number }) {
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-milestone]'));
    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const el = visible.target as HTMLElement;
        setActive({
          year: el.dataset.year ?? '',
          title: el.dataset.title ?? '',
          tone: el.dataset.tone ?? 'quantum',
          index: nodes.indexOf(el),
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));

    const timeline = document.getElementById('timeline');
    const outside = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(null);
    });
    if (timeline) outside.observe(timeline);

    return () => {
      observer.disconnect();
      outside.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-4 right-4 z-40 w-36 rounded-2xl border border-border/70 bg-background/90 p-3 shadow-2xl backdrop-blur-md transition-all duration-300 sm:bottom-6 sm:right-6 sm:w-52 ${active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      {active && (
        <>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${TONE_DOT[active.tone] ?? 'bg-primary'}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">You are in</span>
          </div>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums sm:text-2xl text-foreground">{active.year}</p>
          <p className="hidden truncate text-xs text-muted sm:block">{active.title}</p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/50">
            <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-primary transition-all duration-300" style={{ width: `${((active.index + 1) / total) * 100}%` }} />
          </div>
        </>
      )}
    </div>
  );
}
