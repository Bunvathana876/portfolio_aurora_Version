import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(var(--background-light))",
          active: "hsl(var(--background-light))",
        },
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
          hover: "#38bdf8",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "#60a5fa",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-foreground))",
          foreground: "hsl(var(--muted-foreground))",
          bg: "hsl(var(--muted))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          strong: "hsl(var(--accent-strong))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "accent-muted": "var(--accent-muted)",
        "accent-hover": "var(--accent-hover)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-hover": "var(--surface-hover)",
        "border-subtle": "var(--border-subtle)",
        "border-glow": "var(--border-glow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        bento: "20px",
        card: "16px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
        // Backward-compatible mappings so existing components render clean modern typography
        anton: ["var(--font-inter)", "system-ui", "sans-serif"],
        "roboto-flex": ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      padding: {
        section: "250px",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1148px",
          "2xl": "1148px",
        },
      },
      transitionDuration: {
        "7000": "7s",
      },
      screens: {
        xs: "420px",
      },
      boxShadow: {
        bento: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px var(--border-subtle)",
        "bento-hover":
          "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px var(--border-glow)",
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.3)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
