const webpack = require('webpack');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../components/**/*.story.@(js|jsx|ts|tsx)',
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

    return config;
  },
};
