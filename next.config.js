module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'none'; script-src 'self' www.googletagmanager.com www.google-analytics.com; connect-src 'self' nftx.ethereumdb.com; img-src 'self' cms.nftx.xyz res.cloudinary.com; style-src 'self';base-uri 'self';form-action 'self'",
          },
        ],
      },
    ];
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
  // for @netlify/plugin-next-js
  target: 'serverless',
};
