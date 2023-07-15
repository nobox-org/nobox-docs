/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.nobox.cloud',
  generateRobotsTxt: true,
  async additionalPaths(config) {
    return [await config.transform(config, '/spec')];
  }
};
