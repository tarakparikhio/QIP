import "./globals.css";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import Link from "next/link";
import { LearningModeToggleIcon } from "@/components/learning-mode-toggle";
import { ProgressProvider } from "@/components/progress-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DEFAULT_LEARNING_MODE,
  LEARNING_MODE_STORAGE_KEY,
} from "@/lib/learning-mode";

export const metadata: Metadata = {
  title: "QCML Quantum Intuition Platform",
  description:
    "A structured quantum computing learning system with intuition, mathematics, physics, formal quantum mechanics, circuits, and interview-ready explanations.",
};

const preferenceScript = `
(() => {
  try {
    const saved = localStorage.getItem('qcml-theme');
    const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const savedMode = localStorage.getItem('${LEARNING_MODE_STORAGE_KEY}');
    const learningMode = savedMode === 'rigor' || savedMode === 'intuition'
      ? savedMode
      : '${DEFAULT_LEARNING_MODE}';
    document.documentElement.dataset.learningMode = learningMode;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
    document.documentElement.dataset.learningMode = '${DEFAULT_LEARNING_MODE}';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
        <ProgressProvider>
          <div className="frame-grid">
            <header className="site-header">
              <div className="site-header-main">
                <Link className="brand-block brand-link" href="/">
                  <p className="eyebrow">QCML</p>
                  <div>
                    <h1>Quantum Intuition Platform</h1>
                    <p>
                      Quantum computing lessons built around intuition, compact
                      math, and formal clarity.
                    </p>
                  </div>
                </Link>
                <nav className="site-nav" aria-label="Primary">
                  <Link href="/">Home</Link>
                  <Link href="/#learning-arc">Learning Arc</Link>
                  <Link href="/#curriculum-atlas">Lesson Atlas</Link>
                  <Link href="/#guided-entry">Guided Paths</Link>
                </nav>
              </div>
              <div className="header-controls">
                <LearningModeToggleIcon />
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
