module.exports = {
  // Enable this when we're actually using the nextjs server and not static
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en"
  // },
  // this means we can route to our "static"
  // pages without appending `.html` as long
  // as we have a trailing slash e.g. /vault/punk-basic/
  trailingSlash: true,
  env: {
    appVersion: process.env.npm_package_version,
  },
};
