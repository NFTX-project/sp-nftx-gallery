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
