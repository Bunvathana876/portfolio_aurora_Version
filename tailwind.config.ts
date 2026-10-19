import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      animation: {
        "aurora-slow": "aurora 18s ease-in-out infinite alternate",
        "marquee": "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "border-spin": "border-spin 6s linear infinite",
        "border-spin-fast": "border-spin 3.2s linear infinite",
        "eq-bar-1": "eq-bar 1.1s ease-in-out infinite",
        "eq-bar-2": "eq-bar 0.85s ease-in-out 0.2s infinite",
        "eq-bar-3": "eq-bar 1.25s ease-in-out 0.4s infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate(0%, 0%) scale(1) rotate(0deg)" },
          "50%": { transform: "translate(4%, -4%) scale(1.08) rotate(4deg)" },
          "100%": { transform: "translate(-3%, 5%) scale(0.96) rotate(-3deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "eq-bar": {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
