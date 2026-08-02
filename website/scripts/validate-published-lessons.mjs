import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const root = process.cwd();
const lessonDir = path.join(root, 'src/content/lessons');
const pagePath = path.join(root, 'src/app/lessons/[slug]/page.tsx');
const lessonsPath = path.join(root, 'src/lib/lessons.ts');
const snippetsPath = path.join(root, 'src/lib/lessonQiskitSnippets.ts');
const breakdownsPath = path.join(root, 'src/lib/equationBreakdowns.ts');
const failures = [];

const lessonFiles = fs.readdirSync(lessonDir)
  .filter((file) => /^\d\d-.*\.tsx$/.test(file))
  .sort();

if (lessonFiles.length !== 35) {
  failures.push(`Expected 35 published lesson content files; found ${lessonFiles.length}.`);
}

const routeSource = fs.readFileSync(pagePath, 'utf8');
const metadataSource = fs.readFileSync(lessonsPath, 'utf8');
const snippetsSource = fs.readFileSync(snippetsPath, 'utf8');
const breakdownsSource = fs.readFileSync(breakdownsPath, 'utf8');

function declaredIds(source) {
  return new Set([...source.matchAll(/^\s+(\d+):\s*\{/gm)].map((match) => Number(match[1])));
}

function assertCompleteMap(source, label, firstLesson = 1) {
  const ids = declaredIds(source);
  for (let lessonId = firstLesson; lessonId <= 35; lessonId += 1) {
    if (!ids.has(lessonId)) failures.push(`${label}: missing entry for lesson ${lessonId}.`);
  }
}

assertCompleteMap(snippetsSource, 'Qiskit snippets');
assertCompleteMap(breakdownsSource, 'Equation breakdowns', 6);

const quizSource = metadataSource.slice(
  metadataSource.indexOf('const QUIZZES:'),
  metadataSource.indexOf('export const LESSONS:')
);
assertCompleteMap(quizSource, 'Quizzes');

const metadataBlocks = [...metadataSource.matchAll(/\n  \{\n([\s\S]*?)\n  \},/g)].map((match) => match[1]);
for (const block of metadataBlocks) {
  const idMatch = block.match(/id:\s*(\d+)/);
  if (!idMatch) continue;
  const lessonId = Number(idMatch[1]);
  if (!block.includes(`quiz: getLessonQuiz(${lessonId})`)) {
    failures.push(`Lesson ${lessonId}: missing quiz metadata reference.`);
  }
}

for (const file of lessonFiles) {
  const lessonNumber = file.slice(0, 2);
  const slug = file.slice(3, -4);
  const componentName = `Lesson${lessonNumber}`;
  const content = fs.readFileSync(path.join(lessonDir, file), 'utf8');

  if (!routeSource.includes(`import ${componentName} from '@/content/lessons/${file.slice(0, -4)}';`)) {
    failures.push(`${file}: missing page import for ${componentName}.`);
  }
  if (!routeSource.includes(`'${slug}': ${componentName}`)) {
    failures.push(`${file}: missing LESSON_CONTENT route mapping.`);
  }
  if (!metadataSource.includes(`slug: '${slug}'`)) {
    failures.push(`${file}: missing lesson metadata.`);
  }

  for (const match of content.matchAll(/math="([^"]*)"/g)) {
    try {
      katex.renderToString(match[1], { throwOnError: true });
    } catch (error) {
      failures.push(`${file}: invalid KaTeX expression \`${match[1]}\` (${error.message}).`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated ${lessonFiles.length} published lessons, route mappings, metadata entries, and KaTeX expressions.`);
