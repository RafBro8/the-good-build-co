/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#f5f1e8',
        plaster: '#fffaf1',
        ink: '#20241f',
        graphite: '#343a34',
        pine: '#274f3b',
        moss: '#71816d',
        clay: '#b45f3c',
        copper: '#c7834e',
        steel: '#6d7c83',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(32, 36, 31, 0.14)',
      },
    },
  },
  plugins: [],
};
