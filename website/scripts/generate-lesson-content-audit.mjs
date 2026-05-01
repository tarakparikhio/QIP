import fs from 'node:fs';
import path from 'node:path';

const LESSON_DIR = path.resolve('src/content/lessons');
const OUT_FILE = path.resolve('src/content/lessons/lesson-content-audit.json');

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function extractMatches(source, regex) {
  const out = [];
  let match = regex.exec(source);
  while (match) {
    out.push(match[1]);
    match = regex.exec(source);
  }
  return out;
}

function run() {
  const files = fs
    .readdirSync(LESSON_DIR)
    .filter((name) => /^\d{2}-.*\.tsx$/.test(name))
    .sort();

  const tagsByLesson = {};
  const reusableWidgetUsageByLesson = {};

  for (const file of files) {
    const slug = file.replace(/^\d{2}-/, '').replace(/\.tsx$/, '');
    const fullPath = path.join(LESSON_DIR, file);
    const source = fs.readFileSync(fullPath, 'utf8');

    const htmlTags = extractMatches(source, /<([a-z][a-z0-9-]*)\b/g);
    const widgets = extractMatches(source, /<(NotationBox|TryIt|InlineMath|BlockMath)\b/g);

    tagsByLesson[slug] = uniqueSorted(htmlTags);
    reusableWidgetUsageByLesson[slug] = uniqueSorted(widgets);
  }

  const doc = {
    generatedAt: new Date().toISOString(),
    lessonCount: files.length,
    tagsByLesson,
    reusableWidgetUsageByLesson,
    suggestedBlockTypes: [
      'heading',
      'paragraph',
      'ordered-list',
      'unordered-list',
      'math-inline',
      'math-block',
      'callout',
      'notation-box',
      'try-it',
      'code-inline',
      'section'
    ]
  };

  fs.writeFileSync(OUT_FILE, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUT_FILE} for ${files.length} lessons.`);
}

run();
