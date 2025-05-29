/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        heatRed: "#c8102e",
        heatBlack: "#000000",
        heatYellow: "#f9a01b"
      }
    },
  },
  plugins: [],
}
