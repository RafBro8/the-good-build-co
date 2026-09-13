/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#f3eee4',
        plaster: '#fffaf1',
        limestone: '#e7ddcc',
        ink: '#1f2922',
        graphite: '#3d433c',
        pine: '#2f6047',
        moss: '#7f8b73',
        clay: '#a95638',
        copper: '#d08a53',
        brass: '#c6a15b',
        steel: '#536b70',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(31, 41, 34, 0.14)',
      },
    },
  },
  plugins: [],
};
