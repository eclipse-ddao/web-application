/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#CBECFC",
          200: "#7CE0FF",
          300: "#00BAE3",
          400: "#00ACFF",
          500: "#2196F3",
          600: "#2E89B0",
          700: "#0074AC",
          800: "#143FAD",
          900: "#061232",
          // 448FFF
        },
        accent: {
          ...colors.indigo,
        },
        grey: {
          ...colors.gray,
        },
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
        raleway: "Raleway, sans-serif",
      },
      backgroundImage: {
        card: "url('/assets/images/greenplicity.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
        paper: "url('/images/paper.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
      },
    },
  },
  plugins: [],
};
