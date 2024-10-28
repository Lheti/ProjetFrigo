/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ajoute cette ligne pour scanner tous les fichiers React
  ],
  // content: ["./src/**/*.{html,js, jsx}"],

  theme: {
    extend: {},
  },
  plugins: [],
}