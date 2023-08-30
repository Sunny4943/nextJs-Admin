/** @type {import('tailwindcss').Config} */
/*module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}*/
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,javascript,tsx}',
    './components/**/*.{js,ts,javascript,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})

