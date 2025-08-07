/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://docs.nobox.cloud',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://docs.nobox.cloud/sitemap.xml',
    ],
    // Add llms.txt files for AI discoverability
    additionalSitemaps: [
      'https://docs.nobox.cloud/sitemap.xml',
      'https://docs.nobox.cloud/llms.txt',
      'https://docs.nobox.cloud/llms-full.txt',
      'https://docs.nobox.cloud/llms-full-minified.txt',
    ],
  },
  // Enhanced sitemap options for better LLM crawling
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  // Custom transform for better LLM understanding
  transform: async (config, path) => {
    // Add custom metadata for LLM understanding
    const customFields = {
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    };

    // Higher priority for important pages
    if (path === '/') {
      customFields.priority = 1.0;
      customFields.changefreq = 'daily';
    } else if (path.includes('/methods/')) {
      customFields.priority = 0.9;
      customFields.changefreq = 'weekly';
    } else if (path.includes('/schema/')) {
      customFields.priority = 0.8;
      customFields.changefreq = 'weekly';
    }

    return {
      loc: path,
      ...customFields,
    };
  },
};
