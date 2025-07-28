import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./styles/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        latex: ["lmroman", "serif"],
      },
    },
  },
  plugins: [typography],
};
