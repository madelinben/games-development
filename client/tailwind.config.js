/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      white: "#fff",
      black: "#000"
    },
    screens: {
      sm: { max: "768px", min: "350px" },
      md: "768px" ,
      lg: "1080px" ,
      xl: {min: "1440px"},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
