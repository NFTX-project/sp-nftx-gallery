module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['"DM Sans"', 'system-ui'],
      //  'serif': ['ui-serif', 'Georgia'],
      mono: ['"IBM Plex Mono"', 'Menlo', 'ui-monospace', 'SFMono-Regular'],
      //  'display': ['Oswald'],
      //  'body': ['Open Sans'],
    },
    extend: {
      colors: {
        'light-gray': '#242526',
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
