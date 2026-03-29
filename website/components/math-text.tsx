import katex from "katex";

function escapeHtml(raw: string) {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderLatex(latex: string, displayMode: boolean) {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: true,
      strict: "warn",
      trust: false,
    });
  } catch {
    return `<span class="math-fallback">${escapeHtml(latex)}</span>`;
  }
}

function splitMathText(text: string) {
  const pattern = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g;
  const segments: Array<
    | { type: "text"; value: string }
    | { type: "math"; value: string; displayMode: boolean }
  > = [];

  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const [fullMatch, inlineLatex, blockLatex] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, matchIndex) });
    }

    segments.push({
      type: "math",
      value: inlineLatex ?? blockLatex ?? "",
      displayMode: Boolean(blockLatex),
    });

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}

export function MathInline({ latex }: { latex: string }) {
  return (
    <span
      className="math-inline"
      dangerouslySetInnerHTML={{ __html: renderLatex(latex, false) }}
    />
  );
}

export function MathDisplay({ latex }: { latex: string }) {
  return (
    <div
      className="math-display"
      dangerouslySetInnerHTML={{ __html: renderLatex(latex, true) }}
    />
  );
}

export function MathText({ text }: { text: string }) {
  const segments = splitMathText(text);

  if (!segments.length) {
    return <>{text}</>;
  }

  return (
    <>
      {segments.map((segment, index) =>
        segment.type === "text" ? (
          <span key={`${segment.type}-${index}`}>{segment.value}</span>
        ) : (
          <span
            key={`${segment.type}-${index}`}
            className={
              segment.displayMode ? "math-embedded-display" : "math-inline"
            }
            dangerouslySetInnerHTML={{
              __html: renderLatex(segment.value, segment.displayMode),
            }}
          />
        ),
      )}
    </>
  );
}
