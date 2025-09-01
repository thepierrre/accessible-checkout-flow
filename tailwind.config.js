/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: "#24cf92",
        },
        gray: {
          extralight: "#fcfcfd",
          light: "#f9fafb",
          primary: "#9ca3af",
          dark: "#4b5563",
        },
        black: {
          primary: "#333",
        },
        red: {
          primary: "#ff174d",
          dark: "#e01444",
        },
        blue: {
          extralight: "#f0f7ff",
          light: "#dfebff",
          semilight: "#9baaff",
          primary: "#4a67fe",
          semidark: "#3f5ad8",
          dark: "#2a408c",
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
        160: "40rem",
        176: "44rem",
        192: "48rem",
        200: "50rem",
        "35/50": "70%",
        "15/50": "30%",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "&>*");
      addVariant("child-odd", "&>*:nth-child(odd)");
    },
  ],
};
