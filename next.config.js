const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  async rewrites() {
    return [
      { source: '/spec', destination: '/spec.html' },
      // AI section pretty URLs
      { source: '/ai/allowed-models', destination: '/allowed-models' },
      // Legacy redirect - functions/access-model now at ai/access-model
      { source: '/functions/access-model', destination: '/ai/access-model' },
    ];
  },
  // Ensure llms.txt files are served at root
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
      {
        source: '/llms-full-minified.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
    ];
  },
});
