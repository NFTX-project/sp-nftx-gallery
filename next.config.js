module.exports = {
  async redirects() {
    return [
      {
        source: '/funds/waifusion',
        destination: '/',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  env: {
    appVersion: process.env.npm_package_version,
  },
  target: 'serverless',
};
