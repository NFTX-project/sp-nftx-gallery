module.exports = {
  // Enable this when we're actually using the nextjs server and not static
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  env: {
    appVersion: process.env.npm_package_version,
  },
  // for @netlify/plugin-next-js
  target: 'serverless',
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: 'https://app.nftx.org',
  //       permanent: false,
  //     },
  //     {
  //       source: '/funds/waifusion/',
  //       destination: 'https://app.nftx.org/waifus',
  //       permanent: true,
  //     },
  //   ];
  // },
};
