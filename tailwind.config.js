/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#f8fafc',
          card: '#ffffff',
          hover: '#f1f5f9',
          border: '#e2e8f0',
          text: '#0f172a',
          muted: '#64748b'
        },
        surface: {
          bg: '#f8fafc',
          card: '#ffffff',
          hover: '#f1f5f9',
          border: '#e2e8f0',
          text: '#0f172a',
          muted: '#64748b',
          subtle: '#94a3b8'
        },
        brand: {
          primary: '#2563eb',
          accent: '#0284c7',
          emerald: '#059669',
          rose: '#e11d48',
          amber: '#d97706',
          purple: '#7c3aed'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 35s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
