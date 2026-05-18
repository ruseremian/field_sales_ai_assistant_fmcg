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
        ink: "#111827",
        field: "#0f766e",
        signal: "#2563eb",
        warning: "#b45309",
        surface: "#f6f7fb"
      },
      boxShadow: {
        soft: "0 16px 45px rgba(15, 23, 42, 0.10)",
        glow: "0 20px 60px rgba(15, 118, 110, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
