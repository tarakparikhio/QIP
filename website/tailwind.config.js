/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        primary: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
        'gate-h': '#818cf8',
        'gate-x': '#f87171',
        'gate-y': '#34d399',
        'gate-z': '#fbbf24',
        'gate-cnot': '#a78bfa',
        'gate-s': '#22d3ee',
        'gate-t': '#fb923c',
        'amp-0': '#38bdf8',
        'amp-1': '#f472b6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px hsl(var(--primary) / 0.4)',
        'glow-gate': '0 0 12px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
