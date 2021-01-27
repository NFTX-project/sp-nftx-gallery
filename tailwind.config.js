module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    fontFamily: {
      // Add here once branding done
      // sans: '',
      // serif: '',
      // body: '',
      // display: '',
    },
    extend: {
      colors: {
        'light-gray': '#242526',
        gray: '#00000030',
        'dark-gray': '#0C0C0C',
        'lightest-gray': 'rgba(152, 150, 163, 0.35)',
        'off-white': '#FAFAFA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
