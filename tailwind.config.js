module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './containers/**/*.tsx'],
  theme: {
    fontFamily: {
      sans:
        '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        'gray-900': '#0c0c0c',
        'gray-800': '#191A1B',
        'gray-700': '#242526',
        'gray-500': '#9a96a3',
        'gray-50': '#FAFAFA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
