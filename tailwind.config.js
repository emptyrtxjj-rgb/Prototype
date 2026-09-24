/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030712',
          900: '#090D16',
          850: '#0D1527',
          800: '#111A2E',
          700: '#1E293B',
          600: '#334155',
        },
        light: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        brand: {
          blue: '#2563EB',
          cyan: '#06B6D4',
          sapphire: '#3B82F6',
          sky: '#38BDF8',
          navy: '#0B132B',
        },
        eco: {
          emerald: '#10B981',
          mint: '#34D399',
          darkEmerald: '#059669',
        },
        accent: {
          amber: '#F59E0B',
          rose: '#F43F5E',
          violet: '#8B5CF6',
        },
        academic: {
          crimson: '#7A1526',
          crimsonHover: '#901B30',
          crimsonDark: '#5C0C1A',
          gold: '#C5A059',
          goldLight: '#E6CA85',
          ivory: '#FAF8F5',
          charcoal: '#121417',
          surface: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        space: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
