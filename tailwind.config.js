/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        mt: {
          black: '#030303',
          panel: '#000000',
          soft: '#ffffff',
          muted: '#ffffff',
        },
      },
      boxShadow: {
        mtGlow: '0 0 44px rgba(255, 255, 255, 0.22)',
        mtSoft: '0 18px 80px rgba(0, 0, 0, 0.22)',
      },
      backgroundImage: {
        mtRadial: 'radial-gradient(circle at center, rgba(255,255,255,.24), transparent 58%)',
      },
    },
  },
  plugins: [],
}
