/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: { 950: '#0a0a1a', 900: '#0d0d1a', 800: '#1a1a2e', 700: '#16213e', 600: '#0f3460' },
        accent: {
          purple: { DEFAULT: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
          cyan: { DEFAULT: '#06b6d4', light: '#22d3ee', dark: '#0891b2' }
        },
        phase1: '#4361ee',
        phase2: '#f59e0b',
        phase3: '#ef4444',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(67, 97, 238, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(67, 97, 238, 0)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(239, 68, 68, 0.5)' },
          '50%': { borderColor: 'rgba(239, 68, 68, 1)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-border': 'pulse-border 1.5s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out forwards',
      },
    }
  },
  plugins: []
}
