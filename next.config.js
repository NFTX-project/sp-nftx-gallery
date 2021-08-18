module.exports = {
  async redirects() {
    return [
      {
        source: '/funds/waifusion/',
        destination:
          'https://app.nftx.org/redeem/0xe7f4c89032a2488d327323548ab0459676269331/',
        permanent: true,
      },
      {
        source: '/funds/',
        destination: 'https://app.nftx.org',
        permanent: true,
      },
      {
        source: '/funds/punk/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/punk/punk-basic/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/punk/punk-attr-4/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/punk/punk-attr-5/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/punk/punk-zombie/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/punk/punk-female/',
        destination:
          'https://app.nftx.org/redeem/0x269616d549d7e8eaa82dfb17028d0b212d11232a/',
        permanent: true,
      },
      {
        source: '/funds/bored-ape-yacht-club-nftx/',
        destination:
          'https://app.nftx.org/redeem/0xea47b64e1bfccb773a0420247c0aa0a3c1d2e5c5/',
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
