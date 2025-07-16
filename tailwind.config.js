/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/components/**/*.{js,jsx,ts,tsx}" , "./app/**/*.{js,jsx,ts,tsx}" , "./utilities/**/*.{js,jsx,ts,tsx}" , "./app/(auth)/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors :{
        "fade-green" : '#DDEB9D',
        "light-green" : '#A0C878',
        "navy-blue" : '#143D60',
        "vintage-orange" : '#EB5B00'
      },
      fontFamily: {
        'doodle': ['doodle'],
        'flap-stick': ['flapstick'],
      },
    },
  },
  plugins: [],
}