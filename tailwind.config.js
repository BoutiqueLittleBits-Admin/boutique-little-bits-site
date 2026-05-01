/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: '#5F7D68',
          mint: '#DCE9DE',
          coral: '#D97972',
          blush: '#F7DDE6',
          cream: '#FFF9F2',
          gold: '#E9C36A',
          slate: '#5C7F9B',
          plum: '#5B3A6D',
          lavender: '#E9DDF1',
          ink: '#2E2433',
          taupe: '#7B6D75',
        }
      }
    },
  },
  plugins: [],
}
