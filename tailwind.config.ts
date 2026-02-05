import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",

        primary: "var(--background-orange)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        surface: "var(--card-bg)",
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
};

export default config;
