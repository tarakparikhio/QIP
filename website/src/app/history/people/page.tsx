import type { Metadata } from 'next';
import Link from 'next/link';
import { PEOPLE, type PersonWithLink } from '../people';

export const metadata: Metadata = {
  title: 'The People Behind Quantum Computing',
  description: 'Short profiles of the mathematicians, physicists, and engineers whose work led from binary arithmetic to quantum computers, with Wikipedia links and timeline years.',
};

type Tone = PersonWithLink['tone'];

const GROUPS: { tone: Tone; title: string; intro: string; ring: string; text: string; chip: string; bg: string }[] = [
  { tone: 'classical', title: 'Computing with 0s and 1s', intro: 'They taught machines to count and reason with two symbols.', ring: 'ring-sky-400/60', text: 'text-sky-300', chip: 'border-sky-400/40 bg-sky-400/10 text-sky-300', bg: 'from-sky-400/25 to-sky-400/5' },
  { tone: 'physics', title: 'The quantum physicists', intro: 'They discovered the strange rules that qubits are built on.', ring: 'ring-amber-400/60', text: 'text-amber-300', chip: 'border-amber-400/40 bg-amber-400/10 text-amber-300', bg: 'from-amber-400/25 to-amber-400/5' },
  { tone: 'bridge', title: 'The bridge builders', intro: 'They asked what happens when information itself follows quantum rules.', ring: 'ring-emerald-400/60', text: 'text-emerald-300', chip: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300', bg: 'from-emerald-400/25 to-emerald-400/5' },
  { tone: 'quantum', title: 'Quantum computing pioneers', intro: 'They wrote the first quantum algorithms and built the first machines.', ring: 'ring-primary/60', text: 'text-primary', chip: 'border-primary/40 bg-primary/10 text-primary', bg: 'from-primary/30 to-primary/5' },
];

function initials(name: string) {
  const parts = name.split(' ');
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function PersonCard({ person, group }: { person: PersonWithLink; group: (typeof GROUPS)[number] }) {
  return (
    <article id={person.id} className="history-reveal group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-5 transition hover:border-border hover:bg-card/60">
      <span className={`pointer-events-none absolute -right-1 -top-2 select-none font-mono text-5xl font-bold opacity-[0.06] ${group.text}`} aria-hidden="true">
        {person.year.slice(0, 4)}
      </span>
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ring-2 ${group.bg} ${group.ring}`} aria-hidden="true">
          <span className={`font-mono text-lg font-semibold ${group.text}`}>{initials(person.name)}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-foreground">{person.name}</h3>
          <p className="mt-0.5 text-xs text-muted">
            {person.role}
            {person.lived && <> · {person.lived}</>}
          </p>
        </div>
      </div>
      <p className={`mt-4 inline-flex w-fit rounded-full border px-2.5 py-0.5 font-mono text-xs ${group.chip}`}>{person.year}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">{person.contribution}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/40 pt-3 text-xs">
        <Link href={`/history#${person.milestoneAnchor}`} className="inline-flex min-h-8 items-center text-primary hover:underline">
          On the timeline: {person.milestoneRef.title} <span aria-hidden="true">→</span>
        </Link>
        <a href={`https://en.wikipedia.org/wiki/${person.wiki}`} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center text-muted hover:text-foreground">
          Wikipedia <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export default function PeoplePage() {
  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,hsl(var(--primary)/0.12),transparent_45%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <Link href="/history" className="inline-flex min-h-8 items-center text-xs font-mono uppercase tracking-[0.2em] text-primary hover:underline">← From bits to qubits</Link>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">The people behind the leap.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Meet {PEOPLE.length} of the mathematicians, physicists, and engineers whose work made quantum computing possible. Each profile shows what they contributed, when, where it sits on the timeline, and a Wikipedia link to read more.
          </p>
        </header>

        <nav aria-label="Groups" className="mt-8 flex flex-wrap gap-2">
          {GROUPS.map((group) => (
            <a key={group.tone} href={`#group-${group.tone}`} className={`rounded-full border px-3 py-1 text-xs transition hover:text-foreground ${group.chip}`}>
              {group.title} · {PEOPLE.filter((person) => person.tone === group.tone).length}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {GROUPS.map((group) => {
            const people = PEOPLE.filter((person) => person.tone === group.tone).sort((a, b) => Number(a.year.slice(0, 4)) - Number(b.year.slice(0, 4)));
            return (
              <section key={group.tone} id={`group-${group.tone}`} aria-labelledby={`group-${group.tone}-heading`} className="scroll-mt-20">
                <h2 id={`group-${group.tone}-heading`} className={`text-2xl font-semibold tracking-tight sm:text-3xl ${group.text}`}>{group.title}</h2>
                <p className="mt-2 text-muted">{group.intro}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {people.map((person) => (
                    <PersonCard key={person.id} person={person} group={group} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-16 max-w-3xl text-xs leading-relaxed text-muted">
          Many discoveries were shared with students, collaborators, and lab teams who are not listed here. Lifespans are given only where we have checked them. Wikipedia is a good starting point, and the <Link href="/sources" className="text-primary hover:underline">sources page</Link> lists primary papers.
        </p>
      </div>
    </div>
  );
}
