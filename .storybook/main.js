const webpack = require('webpack');
const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../app/components/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    // Stub out nextjs `Image` component
    // https://stackoverflow.com/a/64765638
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [],
          path: '/',
          loader: 'default',
        }),
      })
    );

    const aliases = {
      '@/components': path.resolve(__dirname, '../app/components/'),
      '@/hooks': path.resolve(__dirname, '../app/hooks/'),
      '@/contexts': path.resolve(__dirname, '../app/contexts/'),
      '@/utils': path.resolve(__dirname, '../app/utils/'),
      '@/constants': path.resolve(__dirname, '../app/constants/'),
      '@/lang': path.resolve(__dirname, '../lang'),
      '@/styles': path.resolve(__dirname, '../styles/'),
      '@/types': path.resolve(__dirname, '../types/'),
    };

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...aliases,
        },
      },
    };
  },
};
