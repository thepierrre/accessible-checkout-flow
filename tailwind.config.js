/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#f1f7fd",
          100: "#e0eef9",
          200: "#c7e1f6",
          300: "#a1ceef",
          400: "#74b3e6",
          500: "#4c92dc",
          600: "#3f7dd1",
          700: "#3669bf",
          800: "#31559c",
          900: "#2c4a7c",
          950: "#1f2e4c",
        },
      },
      height: {
        112: "28rem",
        128: "32rem",
      },
      width: {
        112: "28rem",
        128: "32rem",
        144: "36rem",
        "35/50": "70%",
        "15/50": "30%",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
