/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
};
