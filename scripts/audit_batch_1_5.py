#!/usr/bin/env python3
"""Create a first-pass gap audit for lessons 1-5."""

from __future__ import annotations

import json
from pathlib import Path


RAW_BATCH = Path("artifacts/raw_lessons/lessons_1_5.json")
AUDIT_FILE = Path("artifacts/audits/lessons_1_5_gap_audit.md")


def issue_flags(text: str, title: str) -> tuple[str, list[str]]:
    issues = []
    lower = text.lower()

    if "why it works" not in lower:
        issues.append("Analogy lacks explicit `why_it_works` reasoning.")
    if "where it fails" not in lower and "limitation" not in lower:
        issues.append("Analogy lacks explicit failure mode or limitation.")
    if "\\alpha" not in text and "\\beta" not in text and "=" not in text:
        issues.append("Math is too shallow for the target schema and needs explicit LaTeX.")
    if "real_world_mapping" not in lower and "physics" not in lower:
        issues.append("Physics grounding is missing or only implied.")
    if "operator" not in lower and title not in {"Measurement", "Entanglement", "Interference"}:
        issues.append("Formal operator discussion is missing.")
    if "QuantumCircuit" not in text and "qiskit" not in lower:
        issues.append("Circuit section and runnable Qiskit code are missing.")
    if "visualization" not in lower and "bloch" not in lower and "chart" not in lower:
        issues.append("Visualization guidance is missing.")
    if "interview" not in lower and "question" not in lower:
        issues.append("Interview-ready explanation and questions are missing.")

    if len(issues) >= 6:
        severity = "high"
    elif len(issues) >= 4:
        severity = "medium"
    else:
        severity = "low"
    return severity, issues


def main() -> None:
    lessons = json.loads(RAW_BATCH.read_text(encoding="utf-8"))
    AUDIT_FILE.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        "# Lessons 1-5 Gap Audit",
        "",
        "This audit compares the extracted source text against the target schema in `file.txt`.",
        "",
        "| Lesson | Title | Severity | Key Gaps |",
        "| --- | --- | --- | --- |",
    ]

    detail_lines = ["", "## Detailed Findings", ""]

    for lesson in lessons:
        severity, issues = issue_flags(lesson["raw_text"], lesson["title"])
        summary = "; ".join(issues[:3])
        lines.append(
            f"| {lesson['lesson_id']} | {lesson['title']} | {severity} | {summary} |"
        )

        detail_lines.append(f"### Lesson {lesson['lesson_id']}: {lesson['title']}")
        detail_lines.append(f"- Source: `{lesson['pdf_file']}` page `{lesson['pdf_page']}`")
        detail_lines.append(f"- Severity: `{severity}`")
        for issue in issues:
            detail_lines.append(f"- {issue}")
        detail_lines.append("")

    AUDIT_FILE.write_text("\n".join(lines + detail_lines), encoding="utf-8")


if __name__ == "__main__":
    main()
