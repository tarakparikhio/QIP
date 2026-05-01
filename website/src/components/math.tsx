import katex from 'katex';

export function InlineMath({ math }: { math: string }) {
  const html = katex.renderToString(math, { throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ math }: { math: string }) {
  const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
  return (
    <div className="overflow-x-auto my-4" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
