import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--foreground)",
        field: "var(--brand-blue)",
        signal: "#2c6fb7",
        warning: "#b7791f",
        surface: "var(--background)",
        app: "var(--background)",
        foreground: "var(--foreground)",
        "brand-blue": "var(--brand-blue)",
        "brand-blue-dark": "var(--brand-blue-dark)",
        "brand-red": "var(--brand-red)",
        "blue-soft": "var(--brand-blue-light)",
        "muted-surface": "var(--muted-surface)",
        border: "var(--border)",
        "muted-foreground": "var(--muted-foreground)"
      },
      boxShadow: {
        soft: "0 14px 38px rgba(22, 32, 51, 0.09)",
        glow: "0 18px 45px rgba(0, 75, 147, 0.16)",
        corporate: "0 22px 70px rgba(22, 32, 51, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
