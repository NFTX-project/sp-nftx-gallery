import React from 'react';
import * as nextImage from 'next/image';
import '../styles/globals.css';
import { IntlProvider } from 'react-intl';
import colors from 'tailwindcss/colors';
import messages from '../lang/en.json';

export const decorators = [
  (Story) => (
    <IntlProvider locale="en" messages={messages}>
      <Story />
    </IntlProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: colors.gray['800'],
      },
      {
        name: 'light',
        value: colors.gray['50'],
      },
    ],
  },
};

// Stub out nextjs `Image` component
// https://stackoverflow.com/a/64765638
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});
