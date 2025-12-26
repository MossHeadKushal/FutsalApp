/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        small: ['DMSans_400Regular'],
        semibold: ['DMSans_600SemiBold'],
        medium: ['DMSans_500Medium'],
        bold: ['DMSans_700Bold'],
        AbhayaLibre_ExtraBold: ["AbhayaLibre_800ExtraBold"],
      },
      colors: {
        primary: "#00c187",
        secondary: "#f1fcf6",
        light: {
          100: '#ffffff',
          200: '#228F4C',
          300: '#9CA4AB',
        },
        dark: {
          100: '#000000',
          200: '#0f0d23',
        },
        accent: "#9caebc",
      },
    },
  },
};
