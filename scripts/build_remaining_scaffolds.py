#!/usr/bin/env python3
"""Create source-preserving scaffolds for lessons 6-35."""

from __future__ import annotations

import json
import re
from pathlib import Path


RAW_DIR = Path("artifacts/raw_lessons")
SCAFFOLD_JSON_DIR = Path("artifacts/content/json")


BATCHES = [
    "lessons_6_10.json",
    "lessons_11_15.json",
    "lessons_16_20.json",
    "lessons_21_25.json",
    "lessons_26_30.json",
    "lessons_31_35.json",
]


def slugify(title: str) -> str:
    slug = title.lower()
    slug = slug.replace("&", " and ")
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")


def stage_for_lesson(lesson_id: int) -> str:
    if lesson_id <= 10:
        return "foundation"
    if lesson_id <= 25:
        return "intermediate"
    return "advanced"


def difficulty_for_lesson(lesson_id: int) -> str:
    if lesson_id <= 10:
        return "beginner"
    if lesson_id <= 25:
        return "intermediate"
    return "advanced"


def prerequisites_for_lesson(lesson_id: int) -> list[int]:
    if lesson_id == 6:
        return [1, 2, 3]
    if lesson_id == 7:
        return [6]
    if lesson_id == 8:
        return [2, 7]
    if lesson_id == 9:
        return [4, 10] if lesson_id > 9 else [4]
    if lesson_id == 10:
        return [1, 9]
    if lesson_id == 11:
        return [3, 9]
    if lesson_id == 12:
        return [11]
    if lesson_id == 13:
        return [11, 12]
    if lesson_id == 14:
        return [6, 10]
    if lesson_id == 15:
        return [14]
    if lesson_id == 16:
        return [14, 15]
    if lesson_id == 17:
        return [14, 16]
    if lesson_id == 18:
        return [1, 10]
    if lesson_id == 19:
        return [18]
    if lesson_id == 20:
        return [6, 18, 19]
    if lesson_id == 21:
        return [7, 8]
    if lesson_id == 22:
        return [6, 9, 10]
    if lesson_id == 23:
        return [4, 9, 22]
    if lesson_id == 24:
        return [6, 20, 22]
    if lesson_id == 25:
        return [3, 13, 18]
    if lesson_id == 26:
        return [17, 18, 20]
    if lesson_id == 27:
        return [21, 22, 26]
    if lesson_id == 28:
        return [15, 17, 26]
    if lesson_id == 29:
        return [14, 17, 20]
    if lesson_id == 30:
        return [14, 15, 29]
    if lesson_id == 31:
        return [22, 29, 30]
    if lesson_id == 32:
        return [14, 29]
    if lesson_id == 33:
        return [17, 29, 32]
    if lesson_id == 34:
        return [21, 26, 28]
    if lesson_id == 35:
        return [5, 21, 26, 34]
    return []


def parse_source_sections(raw_text: str) -> dict[str, str]:
    keys = ["Quantum Concept", "Analogy", "Combined Insight"]
    values: dict[str, str] = {}
    for index, key in enumerate(keys):
        start = raw_text.find(f"{key}:")
        if start == -1:
            values[key] = ""
            continue
        start += len(key) + 1
        end = len(raw_text)
        for later in keys[index + 1:]:
            later_start = raw_text.find(f"{later}:")
            if later_start != -1 and later_start < end:
                end = later_start
        values[key] = " ".join(raw_text[start:end].split())
    return values


def build_scaffold(lesson: dict) -> dict:
    sections = parse_source_sections(lesson["raw_text"])
    lesson_id = lesson["lesson_id"]
    return {
        "lesson_id": lesson_id,
        "title": lesson["title"],
        "slug": slugify(lesson["title"]),
        "difficulty": difficulty_for_lesson(lesson_id),
        "learning_order": {
            "stage": stage_for_lesson(lesson_id),
            "prerequisites": prerequisites_for_lesson(lesson_id),
        },
        "learning_objective": f"TODO: expand a clear learning objective for {lesson['title']}.",
        "intuition": {
            "analogy": sections["Analogy"],
            "story": f"TODO: restore and expand the original context behind the analogy for {lesson['title']}.",
            "why_it_works": "TODO: explain why the original analogy maps to the quantum concept.",
            "limitations": "TODO: explain where the analogy stops matching actual quantum mechanics."
        },
        "math": {
            "equations": [],
            "derivation": "TODO: add compact LaTeX-based derivation.",
            "notes": "TODO: add concise math notes and constraints."
        },
        "physics": {
            "concept": "TODO: connect the lesson to the physical interpretation.",
            "real_world_mapping": "TODO: add a grounded physical system or experiment.",
            "importance": "TODO: explain why this concept matters operationally."
        },
        "quantum_mechanics": {
            "formal_definition": "TODO: add a formal quantum definition.",
            "state_space": "TODO: specify Hilbert space / composite state space.",
            "operators_involved": []
        },
        "circuit": {
            "description": "TODO: describe a minimal circuit that demonstrates the concept.",
            "gates": [],
            "qiskit_code": "TODO: add minimal valid Qiskit code with imports and measurement.",
            "expected_output": "TODO: describe the expected result."
        },
        "visualization": {
            "type": "TODO",
            "interactive": True,
            "description": "TODO: describe the intended interactive visualization."
        },
        "applications": [],
        "interview_ready": {
            "explanation": "TODO: add concise interview-ready explanation.",
            "common_questions": []
        },
        "source_trace": {
            "pdf_file": lesson["pdf_file"],
            "pdf_page": lesson["pdf_page"],
            "quantum_concept": sections["Quantum Concept"],
            "analogy": sections["Analogy"],
            "combined_insight": sections["Combined Insight"]
        }
    }


def main() -> None:
    SCAFFOLD_JSON_DIR.mkdir(parents=True, exist_ok=True)

    for batch_file in BATCHES:
        raw_lessons = json.loads((RAW_DIR / batch_file).read_text(encoding="utf-8"))
        scaffolds = [build_scaffold(lesson) for lesson in raw_lessons]
        start = scaffolds[0]["lesson_id"]
        end = scaffolds[-1]["lesson_id"]
        (SCAFFOLD_JSON_DIR / f"lessons_{start}_{end}.json").write_text(
            json.dumps(scaffolds, indent=2), encoding="utf-8"
        )


if __name__ == "__main__":
    main()
