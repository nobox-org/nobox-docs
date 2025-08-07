const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');

// Connect to Algolia
const client = algoliasearch(
    'SPXODZLI2X',
    '32e1f40b311f087fd66c25421cb244cc'
);

const index = client.initIndex('nobox-docs');

// Enhanced indexing function for LLM compatibility
async function indexContent() {
    const pagesDir = path.join(__dirname, 'pages');
    const records = [];

    // Recursively read all markdown files
    function readMarkdownFiles(dir, basePath = '') {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                readMarkdownFiles(filePath, path.join(basePath, file));
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(filePath, 'utf8');
                const relativePath = path.join(basePath, file);
                const url = `/${relativePath.replace('.md', '')}`;

                // Parse frontmatter and content
                const { frontmatter, content: markdownContent } = parseMarkdown(content);

                // Create DocSearch v4 compatible record structure
                const record = {
                    objectID: url,
                    url: url,
                    title: frontmatter.title || file.replace('.md', ''),
                    description: frontmatter.description || '',
                    content: markdownContent.substring(0, 2000),
                    // DocSearch v4 hierarchy structure - these are required
                    lvl0: 'Nobox Documentation',
                    lvl1: getCategoryFromPath(relativePath) || 'General',
                    lvl2: frontmatter.title || file.replace('.md', '') || 'Documentation',
                    lvl3: '',
                    lvl4: '',
                    lvl5: '',
                    lvl6: '',
                    // Hierarchy object for DocSearch v4
                    hierarchy: {
                        lvl0: 'Nobox Documentation',
                        lvl1: getCategoryFromPath(relativePath) || 'General',
                        lvl2: frontmatter.title || file.replace('.md', '') || 'Documentation',
                        lvl3: '',
                        lvl4: '',
                        lvl5: '',
                        lvl6: ''
                    },
                    // DocSearch display fields
                    type: 'lvl1',
                    // Additional metadata
                    tags: extractTags(frontmatter, markdownContent).slice(0, 5),
                    category: getCategoryFromPath(relativePath),
                    lastModified: new Date().toISOString()
                };

                // Check record size and skip if too large
                const recordSize = JSON.stringify(record).length;
                if (recordSize > 9000) { // Leave some buffer
                    console.log(`Skipping ${url} - record size ${recordSize} bytes exceeds limit`);
                    return;
                }

                records.push(record);
            }
        });
    }

    readMarkdownFiles(pagesDir);

    // Index the records with enhanced settings
    try {
        await index.saveObjects(records);

        // Configure index settings for DocSearch v4
        await index.setSettings({
            searchableAttributes: [
                'unordered(title)',
                'unordered(description)',
                'unordered(content)',
                'unordered(text)',
                'unordered(tags)',
                'lvl0',
                'lvl1',
                'lvl2'
            ],
            attributesForFaceting: [
                'category',
                'tags',
                'lvl0',
                'lvl1',
                'lvl2'
            ],
            attributesToRetrieve: [
                'title',
                'description',
                'content',
                'text',
                'url',
                'lvl0',
                'lvl1',
                'lvl2',
                'hierarchy',
                'type'
            ],
            ranking: [
                'exact',
                'filters',
                'typo',
                'geo',
                'words',
                'proximity',
                'attribute',
                'custom'
            ],
            customRanking: [
                'desc(lastModified)'
            ],
            // Note: Semantic search and synonyms require specific Algolia plans
        });

        console.log(`Successfully indexed ${records.length} documents`);
    } catch (error) {
        console.error('Indexing error:', error);
    }
}

// Helper functions
function parseMarkdown(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    let frontmatter = {};
    let markdownContent = content;

    if (frontmatterMatch) {
        const frontmatterText = frontmatterMatch[1];
        markdownContent = content.replace(frontmatterMatch[0], '');

        // Parse YAML frontmatter
        frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                frontmatter[key.trim()] = valueParts.join(':').trim();
            }
        });
    }

    return { frontmatter, content: markdownContent };
}

function getCategoryFromPath(filePath) {
    if (filePath.includes('methods/')) return 'Methods';
    if (filePath.includes('schema/')) return 'Schema';
    if (filePath.includes('sdk/')) return 'SDK';
    if (filePath.includes('functions/')) return 'Functions';
    if (filePath.includes('install-')) return 'Getting Started';
    if (filePath.includes('integrate-')) return 'Getting Started';
    if (filePath.includes('what-is-')) return 'Getting Started';
    if (filePath.includes('nobox-examples')) return 'Getting Started';
    return 'General';
}

function extractTags(frontmatter, content) {
    const tags = [];

    // Extract from frontmatter
    if (frontmatter.tags) {
        tags.push(...frontmatter.tags.split(',').map(t => t.trim()));
    }

    // Extract from content
    const methodMatches = content.match(/model\.(\w+)/g);
    if (methodMatches) {
        tags.push(...methodMatches.map(m => m.replace('model.', '')));
    }

    return [...new Set(tags)];
}

function extractCodeExamples(content) {
    const codeBlocks = content.match(/```[\s\S]*?```/g);
    return codeBlocks ? codeBlocks.map(block => block.replace(/```/g, '')) : [];
}

function extractAPIMethods(content) {
    const methodMatches = content.match(/model\.(\w+)/g);
    return methodMatches ? [...new Set(methodMatches)] : [];
}

function getSchemaType(filePath) {
    if (filePath.includes('rowed')) return 'rowed';
    if (filePath.includes('key-value')) return 'key-value';
    return 'general';
}

function getDifficultyLevel(content) {
    const wordCount = content.split(' ').length;
    const hasCodeExamples = content.includes('```');
    const hasAPIMethods = content.includes('model.');

    if (wordCount > 1000 && hasCodeExamples && hasAPIMethods) return 'advanced';
    if (wordCount > 500 || hasCodeExamples) return 'intermediate';
    return 'beginner';
}

// Run indexing
indexContent().catch(console.error); 