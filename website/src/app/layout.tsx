import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QC Path — Quantum Computing Path',
  description: 'Interactive, sequential quantum computing education for engineers and the curious.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-mono text-primary group-hover:glow-primary transition-all">
                  ▶
                </div>
                <span className="font-semibold text-sm tracking-wide">QC Path</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-muted">
                <a href="/lessons" className="hover:text-foreground transition-colors">Lessons</a>
                <a href="/playground" className="hover:text-foreground transition-colors">Playground</a>
              </div>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border/30 py-6 text-center text-xs text-muted/60">
            QC Path — Interactive quantum computing education
          </footer>
        </div>
      </body>
    </html>
  );
}
