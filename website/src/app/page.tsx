import Link from 'next/link';
import { LESSONS } from '@/lib/lessons';

export default function HomePage() {
  const firstLesson = LESSONS[0];
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          15 Published Lessons · New lessons every weekend
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
          Quantum Computing,{' '}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            one concept at a time
          </span>
        </h1>

        <p className="text-muted text-lg mb-8 leading-relaxed max-w-lg mx-auto">
          For engineers, architects, and the curious — learn quantum computing through vivid analogies, interactive circuit simulations, and a growing weekend curriculum.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/lessons/${firstLesson.slug}`}
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all glow-primary text-sm"
          >
            Start Learning →
          </Link>
          <Link
            href="/lessons"
            className="px-6 py-3 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground transition-all text-sm"
          >
            View All Lessons
          </Link>
          <Link
            href="/roadmap"
            className="px-6 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all text-sm"
          >
            Follow the 30-Day Plan
          </Link>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: '⚡', label: 'Interactive Simulator', desc: 'Build circuits and see ideal quantum-state probabilities update in real time.' },
            { icon: '🎯', label: 'Sequential Gating', desc: 'Master each concept before the next module unlocks — no skipping ahead.' },
            { icon: '🧠', label: 'Analogy-First', desc: 'Every lesson starts with a concrete real-world analogy before the math.' },
          ].map((f) => (
            <div key={f.label} className="p-4 rounded-xl border border-border/40 bg-card/30 hover:border-primary/30 transition-colors">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="text-sm font-semibold mb-1">{f.label}</div>
              <div className="text-xs text-muted leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
