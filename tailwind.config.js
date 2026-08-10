/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090F",
          900: "#0A0E17",
          800: "#10162B",
          700: "#141B31",
          600: "#1B2440",
          500: "#232B47",
        },
        cream: "#F3F1EA",
        muted: "#8A93AC",
        gold: {
          DEFAULT: "#E7A93D",
          soft: "#F0C579",
        },
        mint: {
          DEFAULT: "#35D28A",
          soft: "#7FE6B6",
        },
        violet: {
          DEFAULT: "#8C7CF6",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(243,241,234,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cell": "44px 44px",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: 0.35 },
          "50%": { opacity: 1 },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
