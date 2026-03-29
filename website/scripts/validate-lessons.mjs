import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lessonsPath = path.resolve(__dirname, "../data/lessons.json");
const lessons = JSON.parse(fs.readFileSync(lessonsPath, "utf8"));
const inlineMathPattern = /\\\((.+?)\\\)|\\\[(.+?)\\\]/gs;

const errors = [];

function validateLatex(latex, label, displayMode = false) {
  try {
    katex.renderToString(latex, {
      displayMode,
      throwOnError: true,
      strict: "warn",
      trust: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`${label}: ${message}`);
  }
}

function walkStrings(value, label) {
  if (typeof value === "string") {
    for (const match of value.matchAll(inlineMathPattern)) {
      validateLatex(match[1] ?? match[2] ?? "", label, Boolean(match[2]));
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, `${label}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, nested]) => {
      walkStrings(nested, `${label}.${key}`);
    });
  }
}

for (const lesson of lessons) {
  lesson.math.equations.forEach((equation, index) => {
    validateLatex(
      equation.latex,
      `lesson ${lesson.lesson_id} equation ${index + 1}`,
      true,
    );

    Object.keys(equation.variables).forEach((name) => {
      if (name.includes("\\")) {
        validateLatex(
          name,
          `lesson ${lesson.lesson_id} equation ${index + 1} variable ${name}`,
        );
      }
    });
  });

  walkStrings(lesson, `lesson ${lesson.lesson_id}`);
}

if (errors.length) {
  console.error("Lesson math validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated lesson math for ${lessons.length} lessons.`);
