'use client';

import { useCallback, useEffect, useState } from 'react';

type Options = {
  min?: number;
  max?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function usePersistentRatio(
  storageKey: string,
  defaultRatio: number,
  options: Options = {}
) {
  const min = options.min ?? 0.75;
  const max = options.max ?? 2;
  const [ratio, setRatioState] = useState(defaultRatio);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = Number.parseFloat(raw);
      if (!Number.isFinite(parsed)) return;
      setRatioState(clamp(parsed, min, max));
    } catch {
      // Ignore storage access issues.
    }
  }, [storageKey, min, max]);

  const setRatio = useCallback((next: number) => {
    const clamped = clamp(next, min, max);
    setRatioState(clamped);
    try {
      window.localStorage.setItem(storageKey, clamped.toFixed(3));
    } catch {
      // Ignore storage access issues.
    }
  }, [storageKey, min, max]);

  return { ratio, setRatio, min, max };
}
