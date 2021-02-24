const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './containers/**/*.tsx'],
  theme: {
    fontFamily: {
      sans:
        '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          500: '#9a96a3',
          700: '#242526',
          800: '#191A1B',
          900: '#0c0c0c',
        },
        green: {
          500: '#69e35e',
        },
        orange: {
          ...colors.orange,
          500: '#FF6D41',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
