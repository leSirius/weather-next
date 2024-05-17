/** @type {import('tailwindcss').Config} */
const {rotate} = require("next/dist/server/lib/squoosh/impl");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "card": "#fcf9e8",
        "ground": "#015697",
        "side": "#f37021",
      },
      keyframes: {
        clockwise: {
          '0%, 100%': { transform: 'rotate(0deg)'},
          '50%': { transform: 'rotate(32deg)'},
        },
        counterclockwise: {
          '0%, 100%': { transform: 'rotate(0deg)'},
          '50%': { transform: 'rotate(-32deg)'},
        },
        rotation: {
          'from': { transform: 'rotate(0deg)'},
          'to': { transform: 'rotate(360deg)'},
        },
        shake: {
          '0%, 50%, 100%': {transform: 'rotate(0deg)'},
          '25%': { transform: 'rotate(4deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        }
      },
      animation: {
        'rotate-clockwise': 'clockwise 200ms ease-in-out 2',
        'rotate-counterclockwise': 'counterclockwise 200ms ease-in-out 2',
        'compass': 'shake 1800ms .1s ease-in infinite',
      },
    },
  },
  plugins: [],
};
