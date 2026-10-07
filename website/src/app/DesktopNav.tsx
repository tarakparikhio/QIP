'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_GROUPS, isActiveGroup, isActiveLink } from './navLinks';

export default function DesktopNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!openGroup) return;
    function handlePointer(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenGroup(null);
    }
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [openGroup]);

  return (
    <nav ref={navRef} aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {NAV_GROUPS.map((group) => {
        const open = openGroup === group.label;
        const active = isActiveGroup(pathname, group);
        const panelId = `nav-${group.label.toLowerCase()}`;
        return (
          <div key={group.label} className="relative">
            <button
              type="button"
              onClick={() => setOpenGroup(open ? null : group.label)}
              aria-expanded={open}
              aria-controls={panelId}
              className={`flex h-9 items-center gap-1 rounded-lg px-3 text-sm transition-colors ${
                active ? 'text-foreground' : 'text-muted hover:text-foreground'
              } ${open ? 'bg-primary/10 text-foreground' : 'hover:bg-card/60'}`}
            >
              {group.label}
              <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-3 w-3 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}>
                <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-[11px] h-0.5 rounded-full bg-primary" />}
            </button>

            {open && (
              <div
                id={panelId}
                className="absolute left-0 top-11 z-50 w-72 rounded-xl border border-border/70 bg-card p-2 shadow-2xl"
              >
                <ul className="flex flex-col">
                  {group.links.map((link) => {
                    const current = isActiveLink(pathname, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={current ? 'page' : undefined}
                          className={`block rounded-lg px-3 py-2 transition hover:bg-primary/10 ${current ? 'bg-primary/10' : ''}`}
                        >
                          <span className={`block text-sm font-medium ${current ? 'text-primary' : 'text-foreground'}`}>{link.label}</span>
                          <span className="block text-xs text-muted">{link.description}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
