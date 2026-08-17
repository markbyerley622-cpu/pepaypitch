import tailwindCssAnimate from 'tailwindcss-animate'

/**
 * Carried over from the Pepay merchant dashboard's marketing surface.
 *
 * The shadcn token block that config also carried is dropped here — this site
 * renders no authenticated dashboard, so the only palette it needs is the
 * marketing one. Everything else is unchanged on purpose: the section and UI
 * kit are written against these exact class names.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Mode-varying tokens resolve from `--pep-*` in globals.css and accept
           Tailwind's /alpha modifier. The `pep` ramp is static in both modes —
           brand blue is brand blue. */
        canvas: {
          DEFAULT: 'rgb(var(--pep-canvas) / <alpha-value>)',
          2: 'rgb(var(--pep-canvas-2) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--pep-surface) / <alpha-value>)',
          2: 'rgb(var(--pep-surface-2) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--pep-ink) / <alpha-value>)',
          2: 'rgb(var(--pep-ink-2) / <alpha-value>)',
          3: 'rgb(var(--pep-ink-3) / <alpha-value>)',
          4: 'rgb(var(--pep-ink-4) / <alpha-value>)',
        },
        accent2: {
          DEFAULT: 'rgb(var(--pep-accent) / <alpha-value>)',
          ink: 'rgb(var(--pep-accent-ink) / <alpha-value>)',
        },
        hairline: {
          DEFAULT: 'var(--pep-line)',
          2: 'var(--pep-line-2)',
        },
        pep: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        /* Shipped-state vocabulary. Three claims, three colours, never
           improvised per section. */
        live: '#10b981',
        soon: '#3b82f6',
        vision: '#8b96a8',
        bnb: '#f0b90b',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        e1: 'var(--pep-shadow-1)',
        e2: 'var(--pep-shadow-2)',
        e3: 'var(--pep-shadow-3)',
        accent: 'var(--pep-shadow-accent)',
        bevel: 'var(--pep-bevel)',
      },
      transitionTimingFunction: {
        /* One curve across the whole surface keeps the site feeling like a
           single object rather than a dozen separate animations. */
        pep: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        shell: '1320px',
      },
      animation: {
        'pep-float': 'pep-float 6s ease-in-out infinite',
        'pep-marquee': 'pep-marquee 30s linear infinite',
        'pep-kenburns': 'pep-kenburns 17s ease-in-out infinite',
        'pep-shimmer': 'pep-shimmer 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindCssAnimate],
}
