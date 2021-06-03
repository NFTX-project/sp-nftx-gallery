const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: [
    './pages/**/*.tsx',
    './app/components/**/*.tsx',
    './app/utils/**/*.ts',
  ],
  theme: {
    fontFamily: {
      sans:
        '"DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          50: '#FAFAFA',
          100: '#E7E7E7',
          500: '#9a96a3',
          700: '#242526',
          800: '#191A1B',
          900: '#0c0c0c',
        },
        pink: {
          50: colors.pink['50'],
          100: '#FED8E2',
          200: '#FDB1C6',
          300: '#FD89A9',
          400: '#FC628D',
          500: '#FB3B70',
          600: '#C92F5A',
          700: '#972343',
          800: '#64182D',
          900: '#320C16',
        },
        green: {
          50: colors.green['50'],
          100: '#E1F9DF',
          200: '#C3F4BF',
          300: '#A5EE9E',
          400: '#87E97E',
          500: '#69e35e',
          600: '#54B64B',
          700: '#3F8838',
          800: '#2A5B26',
          900: '#152D13',
        },
        orange: {
          50: colors.orange['50'],
          100: '#FFE2D9',
          200: '#FFC5B3',
          300: '#FFA78D',
          400: '#FF8A67',
          500: '#FF6D41',
          600: '#CC5734',
          700: '#994127',
          800: '#662C1A',
          900: '#33160D',
        },
      },
      boxShadow: {
        nftx: '0 12px 12px -3px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ['dark'],
      display: ['dark'],
    },
  },
  plugins: [],
};
