/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beer-bg': '#1F1F1F',
        'beer-amber': '#FFBF00',
      },
    },
  },
  plugins: [],
}