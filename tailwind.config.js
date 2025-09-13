/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shadcn-components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
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
          extralight: "#f0f7ff",
          light: "#dfebff",
          semilight: "#9baaff",
          primary: "#4a67fe",
          semidark: "#3f5ad8",
          dark: "#2a408c",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "&>*");
      addVariant("child-odd", "&>*:nth-child(odd)");
    },
    require("tailwindcss-animate"),
  ],
};
