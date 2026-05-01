'use client';
import { useProgressStore } from '@/lib/store/progressStore';

const PREF_KEYS = [
  'qcpath:blochSphere:ratio',
  'qcpath:multiBloch:ratio',
];

export default function ResetButton() {
  function handleReset() {
    const ok = window.confirm(
      'Reset all data?\n\nThis will clear:\n• All lesson progress and XP\n• Panel size preferences\n• Circuit state\n\nThis cannot be undone.'
    );
    if (!ok) return;

    // 1. Reset lesson progress (Zustand persist store)
    useProgressStore.getState().resetProgress();

    // 2. Clear localStorage UI preferences
    try {
      PREF_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }

    // 3. Reload to reset all in-memory store state (circuit, amplitudes, etc.)
    window.location.href = '/';
  }

  return (
    <button
      onClick={handleReset}
      className="text-sm text-muted hover:text-rose-400 transition-colors font-mono"
      title="Reset all lesson progress and panel preferences"
    >
      reset
    </button>
  );
}
