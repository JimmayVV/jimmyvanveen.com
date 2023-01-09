/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(0deg,rgba(51,51,51,.8),rgba(51,51,51,.8)),url('/images/talladega_glory.jpg')",
      },
      colors: {
        primary: "#21d",
        secondary: "#333",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "helvetica", "sans-serif"],
        raleway: ["Raleway", "helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
}
