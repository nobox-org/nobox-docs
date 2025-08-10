#!/usr/bin/env node

/**
 * Script to generate llms.txt and llms-full.txt files for AI discoverability
 * This script should be run as part of the build process to keep the files updated
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://docs.nobox.cloud';
const PAGES_DIR = path.join(__dirname, '../pages');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Documentation structure with sections
const DOC_SECTIONS = {
    'Getting Started': [
        '/',
        '/what-is-nobox',
        '/install-nobox',
        '/integrate-nobox'
    ],
    'API Reference': [
        '/api-reference'
    ],
    'Models': [
        '/allowed-models'
    ],
    'Methods': [
        '/methods/overview',
        '/methods/types',
        '/methods/find',
        '/methods/find-one',
        '/methods/search',
        '/methods/insert',
        '/methods/insert-one',
        '/methods/update-one',
        '/methods/update-one-by-id',
        '/methods/delete-one-by-id',
        '/methods/populate',
        '/methods/upload',
        '/methods/get-keys',
        '/methods/set-keys',
        '/methods/get-token-owner'
    ],
    'Schema': [
        '/schema/overview',
        '/schema/concepts',
        '/schema/example-usage',
        '/schema/interface-guidelines',
        '/schema/api-reference',
        '/schema/population-guide'
    ],
    'SDK': [
        '/sdk/index',
        '/sdk/how-to-create-header-structure'
    ],
    'Functions': [
        '/functions/login',
        '/ai/access-model'
    ],
    'Examples': [
        '/nobox-examples'
    ]
};

/**
 * Generate llms.txt file with organized URL sections
 */
function generateLlmsTxt() {
    let content = `# Nobox Documentation for LLMs
# This file helps AI models discover and understand Nobox documentation
# Last updated: ${new Date().toISOString().split('T')[0]}

`;

    for (const [section, urls] of Object.entries(DOC_SECTIONS)) {
        content += `## ${section}\n`;
        urls.forEach(url => {
            content += `${SITE_URL}${url}\n`;
        });
        content += '\n';
    }

    return content;
}

/**
 * Extract content from markdown files
 */
function extractMarkdownContent(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Remove frontmatter
        const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

        // Extract title from frontmatter or first heading
        const titleMatch = content.match(/title:\s*(.+)/);
        const title = titleMatch ? titleMatch[1] : '';

        // Extract description from frontmatter
        const descMatch = content.match(/description:\s*(.+)/);
        const description = descMatch ? descMatch[1] : '';

        return {
            title: title.trim(),
            description: description.trim(),
            content: withoutFrontmatter.trim()
        };
    } catch (error) {
        console.warn(`Warning: Could not read ${filePath}:`, error.message);
        return { title: '', description: '', content: '' };
    }
}

/**
 * Generate llms-full.txt file with full content
 */
function generateLlmsFullTxt() {
    let content = `# Nobox Documentation Full Content for LLMs
# This file contains the full text content of Nobox documentation for AI models
# Last updated: ${new Date().toISOString().split('T')[0]}

`;

    for (const [section, urls] of Object.entries(DOC_SECTIONS)) {
        content += `## ${section}\n\n`;

        for (const url of urls) {
            const filePath = path.join(PAGES_DIR, url === '/' ? 'index.md' : `${url}.md`);

            if (fs.existsSync(filePath)) {
                const { title, description, content: fileContent } = extractMarkdownContent(filePath);

                content += `### ${title || url}\n`;
                content += `URL: ${SITE_URL}${url}\n`;
                if (description) {
                    content += `DESCRIPTION: ${description}\n`;
                }
                content += '\nCONTENT:\n';
                content += fileContent;
                content += '\n\n';
            } else {
                console.warn(`Warning: File not found for ${url}: ${filePath}`);
            }
        }
    }

    return content;
}

/**
 * Generate minified version of llms-full.txt
 */
function generateLlmsFullMinifiedTxt() {
    let content = `# Nobox Documentation Full Content for LLMs - Minified
# Last updated: ${new Date().toISOString().split('T')[0]}

`;

    for (const [section, urls] of Object.entries(DOC_SECTIONS)) {
        content += `## ${section}\n`;

        for (const url of urls) {
            const filePath = path.join(PAGES_DIR, url === '/' ? 'index.md' : `${url}.md`);

            if (fs.existsSync(filePath)) {
                const { title, description, content: fileContent } = extractMarkdownContent(filePath);

                content += `### ${title || url}\n`;
                content += `URL: ${SITE_URL}${url}\n`;
                if (description) {
                    content += `DESCRIPTION: ${description}\n`;
                }
                content += '\n';

                // Minify the content by removing excessive whitespace and comments
                const minifiedContent = fileContent
                    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple consecutive empty lines
                    .replace(/\n\s*#\s*$/gm, '') // Remove empty headings
                    .replace(/\n\s*>\s*$/gm, '') // Remove empty blockquotes
                    .replace(/\n\s*```\s*\n\s*```/g, '') // Remove empty code blocks
                    .replace(/\n\s*<!--.*?-->\s*\n/g, '\n') // Remove HTML comments
                    .replace(/\n\s*\/\/.*$/gm, '') // Remove single-line comments
                    .replace(/\n\s*\/\*[\s\S]*?\*\/\s*\n/g, '\n') // Remove multi-line comments
                    .trim();

                content += minifiedContent;
                content += '\n\n';
            } else {
                console.warn(`Warning: File not found for ${url}: ${filePath}`);
            }
        }
    }

    return content;
}

/**
 * Main function
 */
function main() {
    try {
        console.log('Generating llms.txt files...');

        // Generate llms.txt
        const llmsTxtContent = generateLlmsTxt();
        fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxtContent);
        console.log('✓ Generated llms.txt');

        // Generate llms-full.txt
        const llmsFullTxtContent = generateLlmsFullTxt();
        fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxtContent);
        console.log('✓ Generated llms-full.txt');

        // Generate llms-full-minified.txt
        const llmsFullMinifiedTxtContent = generateLlmsFullMinifiedTxt();
        fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full-minified.txt'), llmsFullMinifiedTxtContent);
        console.log('✓ Generated llms-full-minified.txt');

        console.log('✅ LLM discoverability files generated successfully!');
        console.log(`Files are available at:`);
        console.log(`  - ${SITE_URL}/llms.txt`);
        console.log(`  - ${SITE_URL}/llms-full.txt`);
        console.log(`  - ${SITE_URL}/llms-full-minified.txt`);

    } catch (error) {
        console.error('❌ Error generating llms.txt files:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateLlmsTxt, generateLlmsFullTxt, generateLlmsFullMinifiedTxt }; 