const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/$/, '') : undefined;

/** Public GitHub repository, used for the per-lesson "report a mistake" links. */
export const repositoryUrl = 'https://github.com/tarakparikhio/QIP';

export function lessonIssueUrl(lessonNumber: number, lessonTitle: string, pageUrl?: string): string {
  const title = `Lesson ${lessonNumber} (${lessonTitle}): `;
  const lines = [`**Lesson:** ${lessonNumber}. ${lessonTitle}`];
  if (pageUrl) lines.push(`**Page:** ${pageUrl}`);
  lines.push('', '**What looks wrong?**', '', '**What should it say instead? (a source helps)**', '');
  const body = lines.join('\n');
  return `${repositoryUrl}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=lesson-feedback`;
}
