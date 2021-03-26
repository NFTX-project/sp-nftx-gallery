// /next.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  async headers() {
    return [{ source: '*', headers: createSecureHeaders() }];
  },

  // Enable this when we're actually using the nextjs server and not static
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  env: {
    appVersion: process.env.npm_package_version,
  },
};
