'use client';
import React from 'react';
import { InlineMath, BlockMath } from '@/components/math';

// Each sub-component is a **named export** so Next.js App Router can register
// it individually in the React Client Manifest. They are then assembled into
// the compound pattern via Object.assign so callers can use <NotationBox.Item>.

interface NotationBoxRootProps {
  children: React.ReactNode;
}

export function NotationBoxRoot({ children }: NotationBoxRootProps) {
  return (
    <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
      <h2 className="text-base font-semibold mb-5 text-primary font-mono uppercase tracking-widest">
        Background &amp; Notation
      </h2>
      <div className="space-y-6 text-sm">{children}</div>
    </section>
  );
}

interface ItemProps {
  heading: string;
  children: React.ReactNode;
}

export function NotationBoxItem({ heading, children }: ItemProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-foreground">{heading}</h3>
      {children}
    </div>
  );
}

interface TextProps {
  children: React.ReactNode;
}

export function NotationBoxText({ children }: TextProps) {
  return <p className="text-foreground/75 mb-3 leading-relaxed">{children}</p>;
}

interface RowProps {
  math: string;
  label: string;
}

export function NotationBoxRow({ math, label }: RowProps) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      <InlineMath math={math} />
      <span className="text-muted">— {label}</span>
    </div>
  );
}

interface CodeProps {
  children: React.ReactNode;
}

export function NotationBoxCode({ children }: CodeProps) {
  return (
    <div className="bg-background/60 rounded p-3 space-y-2 border border-border/30">
      {children}
    </div>
  );
}

interface ListItem {
  term: string;
  description: React.ReactNode;
}

interface ListProps {
  items: ListItem[];
}

export function NotationBoxList({ items }: ListProps) {
  return (
    <ul className="space-y-1.5 text-foreground/70 text-xs">
      {items.map((item) => (
        <li key={item.term}>
          <strong className="text-foreground">{item.term}:</strong>{' '}
          {item.description}
        </li>
      ))}
    </ul>
  );
}

interface FormulaProps {
  math: string;
  note?: string;
}

export function NotationBoxFormula({ math, note }: FormulaProps) {
  return (
    <div className="my-2">
      <BlockMath math={math} />
      {note && <p className="text-foreground/60 text-xs mt-1">{note}</p>}
    </div>
  );
}

// Compound component — dot notation works because each property is the same
// reference as a named export, which IS in the client manifest.
export const NotationBox = Object.assign(NotationBoxRoot, {
  Item: NotationBoxItem,
  Text: NotationBoxText,
  Row: NotationBoxRow,
  Code: NotationBoxCode,
  List: NotationBoxList,
  Formula: NotationBoxFormula,
});

export default NotationBox;
