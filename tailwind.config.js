/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'spacegrotesk-bold': ['SpaceGrotesk-Bold'],
        'spacegrotesk-light': ['SpaceGrotesk-Light'],
        'spacegrotesk-medium': ['SpaceGrotesk-Medium'],
        'spacegrotesk-regular': ['SpaceGrotesk-Regular'],
        'spacegrotesk-semibold': ['SpaceGrotesk-SemiBold'],
      },
    },
  },
  plugins: [],
};
