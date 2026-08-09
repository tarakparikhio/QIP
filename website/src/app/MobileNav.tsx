'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  ['Lessons', '/lessons'],
  ['Playground', '/playground'],
  ['Gates', '/gates'],
  ['About', '/about'],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted transition hover:border-primary/50 hover:text-foreground"
      >
        <span className="text-lg leading-none" aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>

      {open && (
        <div id="mobile-navigation" className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-border/70 bg-[#0b1020] p-2 shadow-2xl">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-primary/10 hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
