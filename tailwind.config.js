/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#f7f4ed", 2: "#f1ece1" },
        ink: { DEFAULT: "#1c1c1a", soft: "#3a3a36" },
        muted: "#75716a",
        rule: "#e2ddcf",
        accent: { DEFAULT: "#d23b1a", press: "#b2320f" },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
