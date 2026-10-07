import type { Metadata } from 'next';
import { repositoryUrl } from '@/lib/site';
import { PROJECT_UPDATES } from '@/lib/updates';

export const metadata: Metadata = {
  title: 'Project Updates',
  description: 'A transparent record of meaningful Quantum Playground project milestones from the repository history.',
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="border-b border-border/60 pb-8">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">Project history</p>
        <h1 className="text-4xl font-semibold text-foreground">Updates</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Meaningful milestones from the QCML repository, summarized for people who want to understand how the learning platform evolved.
        </p>
      </header>

      <section className="mt-10" aria-label="Project updates">
        {PROJECT_UPDATES.map((update) => (
          <article key={`${update.date}-${update.title}`} className="border-b border-border/40 py-6 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-lg font-semibold text-foreground">{update.title}</h2>
              <time className="text-xs font-mono text-muted" dateTime={update.date}>{update.date}</time>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{update.summary}</p>
            {update.commit && (
              <a href={`${repositoryUrl}/commit/${update.commit}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-8 items-center text-xs font-mono text-primary/80 hover:text-primary hover:underline">
                commit {update.commit} <span aria-hidden="true">&nbsp;↗</span>
              </a>
            )}
          </article>
        ))}
      </section>

      <p className="mt-8 text-xs leading-relaxed text-muted/70">
        This is a static history snapshot checked into the site for Firebase Hosting. The repository changelog remains the authoritative release record.
      </p>
    </div>
  );
}
