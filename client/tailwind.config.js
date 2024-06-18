/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#f73859',
        outstanding: '#fff9f3',
        textColor: '#16c784',
        one: '#055699',
        two: '#007BFF',
        three: '#FF6600',
        four: '#ea2e9d',
        five: '#E13427'
      },
      width: {
        '1100': '1100px'
      },
      maxWidth: {
        '600': '600px'
      },
      cursor: {
        pointer: 'pointer'
      }
    },
  },
  plugins: [],
}

