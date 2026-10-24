/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500 oficial
          dark: '#ea580c',    // orange-600
          light: '#fff7ed',   // orange-50
        },
        secondary: {
          DEFAULT: '#292524', // stone-800 oficial
          light: '#44403c',   // stone-700
          muted: '#78716c',   // stone-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
