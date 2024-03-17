/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    light: {
      layout: {},
      colors: {}
    },
    dark: {
      layout: {},
      colors: {}
    },
    extend: {
      animation: {
        orbit: 'spin 10s linear forwards infinite',
        orbit2: 'spin 15s linear reverse infinite',
        orbit3: 'spin 20s linear forwards infinite',
        orbit4: 'spin 15s linear reverse infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

