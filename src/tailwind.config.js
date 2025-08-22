/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'bounce-slow': 'bounceGentle 3s ease-in-out infinite',
        'float-up': 'floatUp linear infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'cake-cut': 'cakeCut 2s ease-in-out',
        'slice': 'slice 2s ease-in-out forwards',
        'message-reveal': 'messageReveal 1.5s ease-out forwards',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}