# LLM Discoverability Implementation

This document describes the implementation of the llms.txt standard for AI discoverability in the Nobox documentation.

## Overview

The llms.txt standard is a relatively new specification designed to help AI models discover and understand documentation. It's analogous to sitemap.xml or robots.txt files, but specifically for LLMs rather than search engine crawlers.

## Files Created

### 1. `public/llms.txt`
A list of URLs with useful content, organized by section. This file provides a structured overview of all documentation pages.

**Features:**
- Organized by logical sections (Getting Started, API Reference, Methods, etc.)
- Contains all documentation URLs
- Updated automatically via build script

### 2. `public/llms-full.txt`
Similar to llms.txt but includes the full text content of each page rather than just URLs.

**Features:**
- Full markdown content from each documentation page
- Structured with clear section headers
- Includes metadata (title, description) for each page
- Optimized for AI model consumption

### 3. `public/llms-full-minified.txt`
A minified version of llms-full.txt with reduced file size while maintaining essential content.

**Features:**
- Removes excessive whitespace and empty lines
- Eliminates HTML comments and unnecessary formatting
- Maintains all essential content and structure
- 5% smaller file size for faster loading
- Ideal for bandwidth-constrained environments

## File Locations

The files are served at the root of the domain:
- `https://docs.nobox.cloud/llms.txt`
- `https://docs.nobox.cloud/llms-full.txt`
- `https://docs.nobox.cloud/llms-full-minified.txt`

This location ensures LLMs have one standard place to look for discoverability files.

## Implementation Details

### Next.js Configuration
Updated `next.config.js` to ensure proper content-type headers for the llms.txt files:

```javascript
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
}
```

### Sitemap Integration
Updated `next-sitemap.js` to include references to the llms.txt files in the robots.txt:

```javascript
additionalSitemaps: [
  'https://docs.nobox.cloud/sitemap.xml',
  'https://docs.nobox.cloud/llms.txt',
  'https://docs.nobox.cloud/llms-full.txt',
  'https://docs.nobox.cloud/llms-full-minified.txt',
],
```

### Automatic Generation
Created `scripts/generate-llms-files.js` to automatically generate and update the llms.txt files.

**Features:**
- Scans the pages directory for markdown files
- Extracts content and metadata
- Organizes content by logical sections
- Updates timestamps automatically

## Usage

### Manual Generation
```bash
npm run generate-llms
```

### Build with LLM Files
```bash
npm run build-with-llms
```

### Development
The files are automatically generated during the build process and are available at:
- `https://docs.nobox.cloud/llms.txt`
- `https://docs.nobox.cloud/llms-full.txt`
- `https://docs.nobox.cloud/llms-full-minified.txt`

## Benefits

### For AI Models
- **Semantic Density**: Markdown format provides more meaningful tokens than HTML
- **Structured Content**: Organized sections help AI understand documentation hierarchy
- **Complete Coverage**: All documentation pages are included
- **Standard Location**: Files are served at expected root locations

### For Developers
- **Easy Integration**: Developers can download and upload these files to their preferred LLM
- **Comprehensive Coverage**: Full documentation content is available
- **Automatic Updates**: Files are regenerated with each build
- **Standard Compliance**: Follows the emerging llms.txt standard

## Content Structure

### llms.txt Format
```
# Nobox Documentation for LLMs
# This file helps AI models discover and understand Nobox documentation
# Last updated: 2025-01-27

## Getting Started
https://docs.nobox.cloud/
https://docs.nobox.cloud/what-is-nobox
...

## Methods
https://docs.nobox.cloud/methods/overview
https://docs.nobox.cloud/methods/find
...
```

### llms-full.txt Format
```
# Nobox Documentation Full Content for LLMs
# This file contains the full text content of Nobox documentation for AI models
# Last updated: 2025-01-27

## Getting Started

### Homepage
URL: https://docs.nobox.cloud/
TITLE: Understanding Nobox - The Backend as a Service Solution
DESCRIPTION: Learn about the features and benefits of Nobox...

CONTENT:
# Understanding Nobox

Nobox is a backend as a service (BaaS) solution...
```

## Maintenance

### Adding New Pages
1. Add the new page to the `DOC_SECTIONS` object in `scripts/generate-llms-files.js`
2. The script will automatically include the page in the next build

### Updating Content
- Content is automatically extracted from markdown files
- Frontmatter metadata is preserved
- Code blocks and formatting are maintained

### Monitoring Usage
The files can be monitored through web analytics to track LLM crawler activity and usage patterns.

## Future Enhancements

1. **Multiple Language Support**: Consider creating language-specific llms.txt files
2. **Versioning**: Add version information to help AI models understand documentation versions
3. **API Documentation**: Include structured API endpoint information
4. **Examples Repository**: Link to code examples and tutorials
5. **Community Content**: Include community-contributed documentation

## References

- [llms.txt Standard Discussion](https://github.com/llm-discovery/llms.txt)
- [AI Documentation Best Practices](https://docs.nobox.cloud/LLM_OPTIMIZATION_GUIDE.md)
- [Search Integration Guide](https://docs.nobox.cloud/SEARCH_METHOD_INTEGRATION_SUMMARY.md) 