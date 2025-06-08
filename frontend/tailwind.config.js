/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: '#0D0D0D',
        surface: '#1A1A1A',
        primary: '#00E1FF',     // Bright cyan from logo
        secondary: '#FF00FF',   // Magenta from logo
        accent: '#8A2BE2',      // Purple accent
        'surface-light': '#262626',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        'gradient-start': '#00E1FF',
        'gradient-end': '#FF00FF'
      }
    },
  },
  plugins: [],
}
