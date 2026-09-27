'use client';

import { useEffect, useRef, useState } from 'react';
import { siteUrl } from '@/lib/site';

export type ShareCardData = {
  /** Small label above the title, e.g. "Lesson 21 complete". */
  eyebrow: string;
  title: string;
  /** Up to three headline numbers, e.g. [{ value: '100%', label: 'mastery' }]. */
  stats: { value: string; label: string }[];
  /** Path to share, e.g. "/lessons/grovers-search-algorithm/". */
  path: string;
  /** Text used for social posts. */
  message: string;
  fileName: string;
};

const WIDTH = 1200;
const HEIGHT = 630;

function wrap(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

/** Draws a 1200×630 result card (the standard social preview size). */
function drawCard(canvas: HTMLCanvasElement, data: ShareCardData, host: string) {
  const context = canvas.getContext('2d');
  if (!context) return;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const background = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
  background.addColorStop(0, '#070b14');
  background.addColorStop(1, '#10163a');
  context.fillStyle = background;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // Decorative Bloch sphere on the right.
  const cx = 960;
  const cy = 300;
  const r = 190;
  const glow = context.createRadialGradient(cx, cy, 10, cx, cy, r * 1.4);
  glow.addColorStop(0, 'rgba(129,140,248,0.25)');
  glow.addColorStop(1, 'rgba(129,140,248,0)');
  context.fillStyle = glow;
  context.fillRect(cx - r * 1.5, cy - r * 1.5, r * 3, r * 3);
  context.strokeStyle = 'rgba(148,163,184,0.35)';
  context.lineWidth = 2;
  context.beginPath(); context.arc(cx, cy, r, 0, 2 * Math.PI); context.stroke();
  context.setLineDash([8, 8]);
  context.beginPath(); context.ellipse(cx, cy, r, r * 0.3, 0, 0, 2 * Math.PI); context.stroke();
  context.setLineDash([]);
  context.strokeStyle = '#0ea5e9';
  context.lineWidth = 7;
  context.lineCap = 'round';
  context.beginPath(); context.moveTo(cx, cy); context.lineTo(cx + r * 0.62, cy - r * 0.62); context.stroke();
  context.fillStyle = '#0ea5e9';
  context.beginPath(); context.arc(cx + r * 0.62, cy - r * 0.62, 13, 0, 2 * Math.PI); context.fill();

  // Brand
  context.fillStyle = '#818cf8';
  context.font = '600 30px ui-monospace, SFMono-Regular, Menlo, monospace';
  context.fillText('QUANTUM PLAYGROUND', 72, 100);

  // Eyebrow and title
  context.fillStyle = '#94a3b8';
  context.font = '500 32px system-ui, -apple-system, Segoe UI, sans-serif';
  context.fillText(data.eyebrow, 72, 190);
  context.fillStyle = '#f1f5f9';
  context.font = '700 66px system-ui, -apple-system, Segoe UI, sans-serif';
  wrap(context, data.title, 700).forEach((line, index) => context.fillText(line, 72, 270 + index * 76));

  // Stats
  data.stats.slice(0, 3).forEach((stat, index) => {
    const x = 72 + index * 240;
    context.fillStyle = '#0ea5e9';
    context.font = '700 58px system-ui, -apple-system, Segoe UI, sans-serif';
    context.fillText(stat.value, x, 500);
    context.fillStyle = '#94a3b8';
    context.font = '500 26px system-ui, -apple-system, Segoe UI, sans-serif';
    context.fillText(stat.label, x, 540);
  });

  context.fillStyle = '#64748b';
  context.font = '500 26px ui-monospace, SFMono-Regular, Menlo, monospace';
  context.fillText(host, 72, 595);
}

export default function ShareCard({ data, onClose }: { data: ShareCardData; onClose?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const base = siteUrl ?? (typeof window !== 'undefined' ? window.location.origin : '');
  const url = `${base}${data.path}`;
  const host = base.replace(/^https?:\/\//, '');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCard(canvas, data, host);
    setPreview(canvas.toDataURL('image/png'));
  }, [data, host]);

  function toBlob(): Promise<Blob | null> {
    return new Promise((resolve) => canvasRef.current?.toBlob(resolve, 'image/png') ?? resolve(null));
  }

  async function download() {
    const blob = await toBlob();
    if (!blob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = data.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    setStatus('Image downloaded. Attach it to your post.');
  }

  async function nativeShare() {
    try {
      const blob = await toBlob();
      const file = blob ? new File([blob], data.fileName, { type: 'image/png' }) : null;
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${data.message} ${url}` });
      } else {
        await navigator.share({ text: data.message, url });
      }
      setStatus('Shared.');
    } catch {
      setStatus('Sharing was cancelled.');
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copied.');
    } catch {
      setStatus(`Copy this link: ${url}`);
    }
  }

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.message)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="rounded-2xl border border-accent/30 bg-card/70 p-4" role="region" aria-label="Share your result">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Share your result</p>
        {onClose && <button type="button" onClick={onClose} className="text-xs font-mono text-muted hover:text-foreground">close</button>}
      </div>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={`${data.eyebrow}: ${data.title}. ${data.stats.map((stat) => `${stat.value} ${stat.label}`).join(', ')}.`} className="mt-3 w-full rounded-xl border border-border/50" />
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={download} className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/90">Download image</button>
        {canNativeShare && <button type="button" onClick={nativeShare} className="rounded-lg border border-accent/50 px-3 py-2 text-xs font-semibold text-accent transition hover:bg-accent/10">Share…</button>}
        <button type="button" onClick={copyLink} className="rounded-lg border border-border/60 px-3 py-2 text-xs text-foreground/85 transition hover:border-primary/50">Copy link</button>
        <a href={linkedIn} target="_blank" rel="noreferrer" className="rounded-lg border border-border/60 px-3 py-2 text-xs text-foreground/85 transition hover:border-primary/50">Post on LinkedIn</a>
        <a href={twitter} target="_blank" rel="noreferrer" className="rounded-lg border border-border/60 px-3 py-2 text-xs text-foreground/85 transition hover:border-primary/50">Post on X</a>
      </div>
      <p className="mt-2 text-xs text-muted" aria-live="polite">{status || 'LinkedIn and X share the link; download the image to attach it to your post.'}</p>
    </div>
  );
}
