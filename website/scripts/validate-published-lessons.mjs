import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const root = process.cwd();
const lessonDir = path.join(root, 'src/content/lessons');
const pagePath = path.join(root, 'src/app/lessons/[slug]/page.tsx');
const lessonsPath = path.join(root, 'src/lib/lessons.ts');
const failures = [];

const lessonFiles = fs.readdirSync(lessonDir)
  .filter((file) => /^\d\d-.*\.tsx$/.test(file))
  .sort();

if (lessonFiles.length !== 15) {
  failures.push(`Expected 15 published lesson content files; found ${lessonFiles.length}.`);
}

const routeSource = fs.readFileSync(pagePath, 'utf8');
const metadataSource = fs.readFileSync(lessonsPath, 'utf8');

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
