/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'misc-blue': '#0EA5E9',
        'misc-dark': '#1E293B',
      },
    },
  },
  plugins: [],
}
