'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function BuyMeCoffee() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-400 transition-colors font-medium"
        aria-label="Buy me a coffee"
      >
        <span>☕</span>
        <span>Buy me a coffee</span>
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

            <p className="text-sm font-medium text-amber-400">☕ Buy me a coffee</p>
            <p className="text-xs text-muted text-center">
              Scan to support or open the link below
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
