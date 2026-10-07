'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_GROUPS, isActiveLink } from './navLinks';

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className="md:hidden">
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
        <>
          <div className="fixed inset-0 top-14 z-40 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            id="mobile-navigation"
            className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-border/70 bg-card px-4 pb-5 pt-3 shadow-2xl"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex max-w-md flex-col gap-4">
              {NAV_GROUPS.map((group) => (
                <section key={group.label}>
                  <p className="px-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-muted/70">{group.label}</p>
                  <ul className="flex flex-col">
                    {group.links.map((link) => {
                      const current = isActiveLink(pathname, link.href);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            aria-current={current ? 'page' : undefined}
                            className={`block rounded-lg px-3 py-2.5 text-sm transition hover:bg-primary/10 ${
                              current ? 'bg-primary/10 font-medium text-primary' : 'text-foreground'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
