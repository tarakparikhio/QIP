#!/usr/bin/env python3
"""Build human-readable review views from the unified lesson JSON workspace."""

from __future__ import annotations

import json
import re
from pathlib import Path


JSON_DIR = Path("artifacts/content/json")
OUT_MD_DIR = Path("artifacts/content/review_markdown")
OUT_WEB_DIR = Path("artifacts/web_preview")


def md_section(title: str, body: str) -> list[str]:
    return [f"## {title}", "", body.strip(), ""]


def parse_batch_key(path: Path) -> tuple[int, str]:
    match = re.match(r"lessons_(\d+)_(\d+)\.json$", path.name)
    if not match:
        return (9999, path.name)
    return (int(match.group(1)), path.name)


def lesson_to_markdown(lesson: dict) -> str:
    lines: list[str] = [
        f"# Lesson {lesson['lesson_id']}: {lesson['title']}",
        "",
        f"- Slug: `{lesson['slug']}`",
        f"- Difficulty: `{lesson['difficulty']}`",
        f"- Stage: `{lesson['learning_order']['stage']}`",
        f"- Prerequisites: `{lesson['learning_order']['prerequisites']}`",
        "",
    ]

    lines += md_section("Learning Objective", lesson["learning_objective"])

    if "source_trace" in lesson:
        trace = lesson["source_trace"]
        lines += [
            "## Source Snapshot",
            "",
            f"**Source PDF**  \n`{trace['pdf_file']}` page `{trace['pdf_page']}`",
            "",
            f"**Quantum Concept**  \n{trace['quantum_concept']}",
            "",
            f"**Original Analogy**  \n{trace['analogy']}",
            "",
            f"**Combined Insight**  \n{trace['combined_insight']}",
            "",
        ]

    intuition = lesson["intuition"]
    lines += [
        "## Intuition",
        "",
        f"**Analogy**  \n{intuition['analogy']}",
        "",
        f"**Story**  \n{intuition['story']}",
        "",
        f"**Why It Works**  \n{intuition['why_it_works']}",
        "",
        f"**Limitations**  \n{intuition['limitations']}",
        "",
    ]

    math = lesson["math"]
    lines += ["## Math", ""]
    for eq in math["equations"]:
        lines.append(f"- LaTeX: `{eq['latex']}`")
        lines.append(f"  Meaning: {eq['meaning']}")
        if eq["variables"]:
            variables = ", ".join(f"`{k}` = {v}" for k, v in eq["variables"].items())
            lines.append(f"  Variables: {variables}")
    lines += ["", f"**Derivation**  \n{math['derivation']}", "", f"**Notes**  \n{math['notes']}", ""]

    physics = lesson["physics"]
    lines += [
        "## Physics",
        "",
        f"**Concept**  \n{physics['concept']}",
        "",
        f"**Real-World Mapping**  \n{physics['real_world_mapping']}",
        "",
        f"**Importance**  \n{physics['importance']}",
        "",
    ]

    qm = lesson["quantum_mechanics"]
    lines += [
        "## Quantum Mechanics",
        "",
        f"**Formal Definition**  \n{qm['formal_definition']}",
        "",
        f"**State Space**  \n{qm['state_space']}",
        "",
        "**Operators Involved**",
        "",
    ]
    for op in qm["operators_involved"]:
        lines.append(f"- {op}")
    lines.append("")

    circuit = lesson["circuit"]
    lines += [
        "## Circuit",
        "",
        f"**Description**  \n{circuit['description']}",
        "",
        f"**Gates**  \n`{circuit['gates']}`",
        "",
        "```python",
        circuit["qiskit_code"],
        "```",
        "",
        f"**Expected Output**  \n{circuit['expected_output']}",
        "",
    ]

    viz = lesson["visualization"]
    lines += [
        "## Visualization",
        "",
        f"- Type: `{viz['type']}`",
        f"- Interactive: `{viz['interactive']}`",
        f"- Description: {viz['description']}",
        "",
        "## Applications",
        "",
    ]
    for item in lesson["applications"]:
        lines.append(f"- {item}")
    lines += ["", "## Interview Ready", "", lesson["interview_ready"]["explanation"], "", "**Common Questions**", ""]
    for question in lesson["interview_ready"]["common_questions"]:
        lines.append(f"- {question}")
    lines.append("")
    return "\n".join(lines)


def lesson_card_html(lesson: dict) -> str:
    apps = "".join(f"<li>{item}</li>" for item in lesson["applications"])
    questions = "".join(
        f"<li>{item}</li>" for item in lesson["interview_ready"]["common_questions"]
    )
    operators = "".join(f"<li>{item}</li>" for item in lesson["quantum_mechanics"]["operators_involved"])
    equations = "".join(
        "<div class='equation'>"
        f"<div class='latex'>{eq['latex']}</div>"
        f"<div class='meaning'>{eq['meaning']}</div>"
        "</div>"
        for eq in lesson["math"]["equations"]
    )

    return f"""
    <article class="lesson-card" id="{lesson['slug']}">
      <header>
        <p class="eyebrow">Lesson {lesson['lesson_id']} • {lesson['learning_order']['stage']} • {lesson['difficulty']}</p>
        <h2>{lesson['title']}</h2>
        <p>{lesson['learning_objective']}</p>
      </header>
      <section>
        <h3>Intuition</h3>
        <p><strong>Analogy:</strong> {lesson['intuition']['analogy']}</p>
        <p><strong>Story:</strong> {lesson['intuition']['story']}</p>
        <p><strong>Why it works:</strong> {lesson['intuition']['why_it_works']}</p>
        <p><strong>Limits:</strong> {lesson['intuition']['limitations']}</p>
      </section>
      <section>
        <h3>Math</h3>
        {equations}
        <p><strong>Derivation:</strong> {lesson['math']['derivation']}</p>
        <p><strong>Notes:</strong> {lesson['math']['notes']}</p>
      </section>
      <section>
        <h3>Physics</h3>
        <p><strong>Concept:</strong> {lesson['physics']['concept']}</p>
        <p><strong>Real world:</strong> {lesson['physics']['real_world_mapping']}</p>
        <p><strong>Importance:</strong> {lesson['physics']['importance']}</p>
      </section>
      <section>
        <h3>Quantum Mechanics</h3>
        <p><strong>Formal definition:</strong> {lesson['quantum_mechanics']['formal_definition']}</p>
        <p><strong>State space:</strong> {lesson['quantum_mechanics']['state_space']}</p>
        <ul>{operators}</ul>
      </section>
      <section>
        <h3>Circuit</h3>
        <p>{lesson['circuit']['description']}</p>
        <pre><code>{lesson['circuit']['qiskit_code']}</code></pre>
        <p><strong>Expected output:</strong> {lesson['circuit']['expected_output']}</p>
      </section>
      <section>
        <h3>Visualization</h3>
        <p><strong>Type:</strong> {lesson['visualization']['type']}</p>
        <p>{lesson['visualization']['description']}</p>
      </section>
      <section>
        <h3>Applications</h3>
        <ul>{apps}</ul>
      </section>
      <section>
        <h3>Interview Ready</h3>
        <p>{lesson['interview_ready']['explanation']}</p>
        <ul>{questions}</ul>
      </section>
    </article>
    """


def build_html(lessons: list[dict]) -> str:
    nav = "".join(
        f"<a href='#{lesson['slug']}'>Lesson {lesson['lesson_id']}: {lesson['title']}</a>"
        for lesson in lessons
    )
    cards = "\n".join(lesson_card_html(lesson) for lesson in lessons)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QCML Preview</title>
  <style>
    :root {{
      --bg: #f5f1e8;
      --ink: #1f2933;
      --panel: #fffdf8;
      --line: #d8cdb6;
      --accent: #0f766e;
      --accent-soft: #d9f3ef;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      color: var(--ink);
      background:
        radial-gradient(circle at top left, #fff7e6 0, transparent 35%),
        linear-gradient(180deg, #f9f6ef 0%, var(--bg) 100%);
    }}
    .shell {{
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 64px;
    }}
    .hero {{
      padding: 24px;
      border: 1px solid var(--line);
      background: rgba(255, 253, 248, 0.85);
      backdrop-filter: blur(6px);
    }}
    .hero h1 {{ margin: 0 0 12px; font-size: clamp(2rem, 5vw, 3.5rem); }}
    .hero p {{ margin: 0; max-width: 70ch; line-height: 1.6; }}
    .nav {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0 28px;
    }}
    .nav a {{
      text-decoration: none;
      color: var(--accent);
      border: 1px solid var(--line);
      padding: 10px 14px;
      background: var(--panel);
    }}
    .lesson-card {{
      margin-bottom: 24px;
      padding: 24px;
      border: 1px solid var(--line);
      background: var(--panel);
      box-shadow: 0 20px 40px rgba(31, 41, 51, 0.06);
    }}
    .eyebrow {{
      margin: 0 0 8px;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.8rem;
    }}
    h2, h3 {{ margin-top: 0; }}
    section {{ margin-top: 20px; }}
    pre {{
      overflow-x: auto;
      padding: 16px;
      background: #172026;
      color: #f8fafc;
    }}
    .equation {{
      padding: 12px 14px;
      margin: 12px 0;
      background: var(--accent-soft);
      border-left: 4px solid var(--accent);
    }}
    .latex {{
      font-family: "Courier New", monospace;
      font-size: 0.95rem;
      margin-bottom: 6px;
    }}
    @media (max-width: 720px) {{
      .shell {{ width: min(100% - 20px, 100%); }}
      .lesson-card, .hero {{ padding: 18px; }}
    }}
  </style>
</head>
<body>
  <main class="shell">
    <section class="hero">
      <h1>QCML Lesson Preview</h1>
      <p>This is a readable website-style preview for lessons 1-5 so we can design the experience before finishing the remaining lesson batches.</p>
    </section>
    <nav class="nav">{nav}</nav>
    {cards}
  </main>
</body>
</html>
"""


def main() -> None:
    OUT_MD_DIR.mkdir(parents=True, exist_ok=True)
    OUT_WEB_DIR.mkdir(parents=True, exist_ok=True)
    lessons: list[dict] = []
    for path in sorted(JSON_DIR.glob("lessons_*.json"), key=parse_batch_key):
        lessons.extend(json.loads(path.read_text(encoding="utf-8")))

    for lesson in lessons:
        lesson_path = OUT_MD_DIR / f"{lesson['lesson_id']:02d}-{lesson['slug']}.md"
        lesson_path.write_text(lesson_to_markdown(lesson), encoding="utf-8")

    index_lines = [
        "# QCML Review Markdown",
        "",
        "This folder contains readable Markdown generated from the unified lesson JSON workspace in `artifacts/content/json/`.",
        "",
    ]
    for lesson in lessons:
        filename = f"{lesson['lesson_id']:02d}-{lesson['slug']}.md"
        index_lines.append(f"- [{lesson['title']}](./{filename})")
    (OUT_MD_DIR / "README.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")

    preview_lessons = [lesson for lesson in lessons if "source_trace" not in lesson]
    if preview_lessons:
        (OUT_WEB_DIR / "index.html").write_text(build_html(preview_lessons), encoding="utf-8")


if __name__ == "__main__":
    main()
