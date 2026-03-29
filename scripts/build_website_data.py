#!/usr/bin/env python3
"""Build a frontend-friendly lesson bundle for the QCML Next.js website."""

from __future__ import annotations

import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
JSON_DIR = REPO_ROOT / "artifacts" / "content" / "json"
OUT_FILE = REPO_ROOT / "website" / "data" / "lessons.json"


def parse_batch_key(path: Path) -> tuple[int, str]:
    match = re.match(r"lessons_(\d+)_(\d+)\.json$", path.name)
    if not match:
        return (9999, path.name)
    return (int(match.group(1)), path.name)


def main() -> None:
    lessons: list[dict] = []
    for path in sorted(JSON_DIR.glob("lessons_*.json"), key=parse_batch_key):
        batch_lessons = json.loads(path.read_text(encoding="utf-8"))
        lessons.extend(
            {
                key: value
                for key, value in lesson.items()
                if key != "source_trace"
            }
            for lesson in batch_lessons
        )

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(json.dumps(lessons, indent=2, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    main()
