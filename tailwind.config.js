/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {gridTemplateColumns: {
      // 24 column grid
      '25': 'repeat(25, minmax(0, 1fr))',
    }},
    
  },
  plugins: [],
}

