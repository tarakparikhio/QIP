import { InlineMath } from '@/components/math';

/**
 * Renders plain text with inline math written between single dollar signs,
 * e.g. "The probability is $|\\alpha|^2$." Used for data-driven lesson content
 * (practice problems, lab captions) where JSX would be awkward.
 */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('$') && part.endsWith('$') && part.length > 2
          ? <InlineMath key={index} math={part.slice(1, -1)} />
          : <span key={index}>{part}</span>,
      )}
    </>
  );
}
