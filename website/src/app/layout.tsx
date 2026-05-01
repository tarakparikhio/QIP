import type { Metadata } from 'next';
import './globals.css';
import ResetButton from './ResetButton';
import BuyMeCoffee from './BuyMeCoffee';

export const metadata: Metadata = {
  title: 'Quantum Playground — A Beginner\'s Tool',
  description: 'An interactive quantum circuit playground for beginners — live simulations, Bloch spheres, and step-by-step lessons.',
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
                <div>
                  <span className="font-semibold text-sm tracking-wide">Quantum Playground</span>
                  <span className="hidden sm:inline text-xs text-muted font-normal ml-2">A Beginner&apos;s Tool</span>
                </div>
              </a>
              <div className="flex items-center gap-4 text-sm text-muted">
                <a href="/lessons" className="hover:text-foreground transition-colors">Lessons</a>
                <a href="/playground" className="hover:text-foreground transition-colors">Playground</a>
                <ResetButton />
              </div>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border/30 py-6 text-center text-xs text-muted/60">
            <div className="flex flex-col items-center gap-2">
              <span>Quantum Playground — A Beginner&apos;s Tool for Interactive Quantum Computing</span>
              <BuyMeCoffee />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
