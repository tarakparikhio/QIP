'use client';
import { Html } from '@react-three/drei';

type Props = {
  position: [number, number, number];
  children: string;
  /** 'state' for basis-state labels like |0⟩, 'axis' for small axis names like +Z. */
  variant?: 'state' | 'axis';
};

/**
 * A text label pinned to a 3D position, rendered as ordinary HTML.
 *
 * drei's <Text> downloads font data from a CDN for glyphs such as ⟩, and while that
 * download is pending it suspends, which hides the whole surrounding circuit builder
 * (and hides it permanently if the CDN is blocked). HTML labels use the page's fonts,
 * need no network, and stay crisp at any zoom.
 */
export default function AxisLabel({ position, children, variant = 'state' }: Props) {
  return (
    <Html position={position} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <span
        className={variant === 'state' ? 'font-mono text-[13px] text-slate-50' : 'font-mono text-[10px] text-slate-400'}
        style={{ whiteSpace: 'nowrap' }}
      >
        {children}
      </span>
    </Html>
  );
}
