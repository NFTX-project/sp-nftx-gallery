import * as nextImage from 'next/image';
import '../styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

// Stub out nextjs `Image` component
// https://stackoverflow.com/a/64765638
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});
