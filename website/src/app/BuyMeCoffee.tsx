'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function BuyMeCoffee() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-xs font-medium text-amber-300/90 transition-colors hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-200"
        aria-label="Support this learning project"
      >
        <span>☕</span>
        <span>Support the project</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[#0f172a] border border-amber-400/30 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl max-w-xs w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-muted hover:text-foreground text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>

            <p className="text-sm font-medium text-amber-400">☕ Support the project</p>
            <p className="text-xs text-muted text-center">
              Help cover hosting, tooling, and time spent building open quantum lessons.
            </p>

            <Image
              src="/bmc-qr.png"
              alt="Buy Me a Coffee QR code"
              width={200}
              height={200}
              className="rounded-xl"
            />

            <a
              href="https://buymeacoffee.com/tarakparikhin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:underline break-all"
            >
              buymeacoffee.com/tarakparikhin
            </a>
          </div>
        </div>
      )}
    </>
  );
}
