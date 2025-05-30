/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        heatRed:   "#C8102E",
        heatBlack: "#000000",
        heatYellow:"#F9A01B",
      }
    }
  },
  plugins: []
}
