'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative two-source interference pattern behind the hero. One source is fixed; the
 * other drifts toward the pointer. Intensity follows cos² of half the phase difference,
 * the same rule as a double-slit pattern. Rendered at low resolution and scaled up,
 * paused when off-screen or when the tab is hidden, and drawn once (static) when the
 * visitor prefers reduced motion.
 */
export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const W = 96;
    const H = 54;
    canvas.width = W;
    canvas.height = H;
    const image = context.createImageData(W, H);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fixed = { x: W * 0.22, y: H * 0.3 };
    const moving = { x: W * 0.75, y: H * 0.65 };
    const goal = { ...moving };
    const k = 0.55; // wave number in grid cells
    let phase = 0;
    let frame = 0;
    let visible = true;

    // Colors from the theme: primary (indigo) and accent (sky).
    const primary = [129, 140, 248];
    const accent = [14, 165, 233];

    function draw() {
      const data = image.data;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const r1 = Math.hypot(x - fixed.x, y - fixed.y);
          const r2 = Math.hypot(x - moving.x, y - moving.y);
          const intensity = Math.cos((k * (r1 - r2)) / 2 + phase) ** 2; // two-source interference
          const fade = Math.exp(-(r1 + r2) / (W * 0.9));
          const alpha = intensity * fade * 150;
          const mix = x / W;
          const i = (y * W + x) * 4;
          data[i] = primary[0] * (1 - mix) + accent[0] * mix;
          data[i + 1] = primary[1] * (1 - mix) + accent[1] * mix;
          data[i + 2] = primary[2] * (1 - mix) + accent[2] * mix;
          data[i + 3] = alpha;
        }
      }
      context!.putImageData(image, 0, 0);
    }

    function tick() {
      moving.x += (goal.x - moving.x) * 0.04;
      moving.y += (goal.y - moving.y) * 0.04;
      phase += 0.02;
      draw();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      goal.x = ((event.clientX - rect.left) / rect.width) * W;
      goal.y = ((event.clientY - rect.top) / rect.height) * H;
    }

    function resume() {
      if (!reduceMotion && visible && !document.hidden && frame === 0) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);

    draw();
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('visibilitychange', resume);
      resume();
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 [image-rendering:auto]"
      style={{ filter: 'blur(6px)' }}
    />
  );
}
