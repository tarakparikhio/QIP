import type { Metadata } from 'next';
import './globals.css';
import BuyMeCoffee from './BuyMeCoffee';
import DesktopNav from './DesktopNav';
import HeaderProgress from './HeaderProgress';
import MobileNav from './MobileNav';
import SettingsMenu from './SettingsMenu';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'Quantum Playground — Learn Quantum Computing Visually',
    template: '%s — Quantum Playground',
  },
  description: 'An interactive quantum circuit playground for beginners — live simulations, Bloch spheres, and step-by-step lessons.',
  keywords: ['quantum computing', 'quantum circuits', 'quantum learning', 'Bloch sphere', 'quantum algorithms'],
  openGraph: {
    type: 'website',
    title: 'Quantum Playground — Learn Quantum Computing Visually',
    description: 'Explore quantum computing through short lessons and interactive circuit simulations.',
    siteName: 'Quantum Playground',
    ...(siteUrl ? { images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Quantum Playground — Learn Quantum Computing Visually' }] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Playground — Learn Quantum Computing Visually',
    description: 'Explore quantum computing through short lessons and interactive circuit simulations.',
    ...(siteUrl ? { images: ['/og-image.png'] } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
              <a href="/" className="flex min-w-0 items-center gap-2 group">
                <div className="w-7 h-7 shrink-0 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-mono text-primary group-hover:glow-primary transition-all">
                  ▶
                </div>
                <span className="whitespace-nowrap font-semibold text-sm tracking-wide">Quantum Playground</span>
              </a>
              <div className="ml-2 hidden md:block lg:ml-6">
                <DesktopNav />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <HeaderProgress />
                <SettingsMenu />
                <MobileNav />
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border/30 px-4 py-6 text-center text-xs text-muted">
            <div className="flex flex-col items-center gap-2">
              <span>Quantum Playground: interactive lessons and a live circuit simulator for learning quantum computing</span>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                <a href="/about" className="hover:text-foreground transition-colors">About, scope &amp; feedback</a>
                <a href="/sources" className="hover:text-foreground transition-colors">Sources &amp; method</a>
              </div>
              <BuyMeCoffee />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
