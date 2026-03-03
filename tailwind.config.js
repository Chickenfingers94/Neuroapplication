/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0d0d1a', 800: '#1a1a2e', 700: '#16213e', 600: '#0f3460' },
        phase1: '#4361ee',
        phase2: '#f59e0b',
        phase3: '#ef4444',
      }
    }
  },
  plugins: []
}
