/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F1E8",
        card: "#FDFBF7",
        line: "#E5DACA",
        wine: { 900: "#3E1522", 700: "#4B1F2E", 500: "#6E3445", 100: "#EFE0E2" },
        ink: "#2B1D21",
        muted: "#97878A",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
      },
      borderRadius: { sm: "4px", md: "10px", lg: "18px" },
    },
  },
  plugins: [],
};
