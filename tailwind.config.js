/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      colors: {
        "primary-menu": "var(--primary-menu)",
        "secondary-menu": "var(--secondary-menu)",
        "primary-button": "var(--primary-button)",
        "secondary-button": "var(--secondary-button)",
        "terciary-button": "var(--terciary-button)",
        "primary-table": "var(--primary-table)",
        "secondary-table": "var(--secondary-table)",
        "secondary-font": "var(--secondary-font)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
