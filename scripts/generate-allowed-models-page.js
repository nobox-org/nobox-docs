#!/usr/bin/env node

/**
 * Generate a docs page that lists all allowed AI models from nobox-core
 */

const fs = require('fs');
const path = require('path');

const CORE_MODELS_DIR = path.resolve(__dirname, '../../nobox-core/src/utils/models');
const DOCS_PAGES_DIR = path.resolve(__dirname, '../pages');
const OUTPUT_PAGE = path.join(DOCS_PAGES_DIR, 'allowed-models.md');
const POPULAR_PROVIDERS = [
    'openai',
    'anthropic',
    'google',
    'mistralai',
    'meta-llama',
    'qwen',
    'nvidia',
];
const POPULAR_MODEL_PILLS = [
    { label: 'GPT-4o', query: 'gpt-4o' },
    { label: 'GPT-4.1', query: 'gpt-4.1' },
    { label: 'Claude 3.5', query: 'claude 3.5' },
    { label: 'Gemini 1.5', query: 'gemini 1.5' },
    { label: 'Mixtral 8x22B', query: 'mixtral 8x22b' },
    { label: 'Llama 3.3', query: 'llama 3.3' },
];

/**
 * Recursively collect all files under dir
 */
function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

/**
 * Extract a simple string value from TS object literal via regex
 */
function extractString(content, key) {
    const re = new RegExp(`\"${key}\"\\s*:\\s*\"([^\"]*)\"`);
    const m = content.match(re);
    return m ? m[1] : '';
}

function extractNumber(content, key) {
    const re = new RegExp(`\"${key}\"\\s*:\\s*([0-9]+)`);
    const m = content.match(re);
    return m ? Number(m[1]) : undefined;
}

function extractArrayStrings(content, key) {
    const re = new RegExp(`\"${key}\"\\s*:\\s*\\[([^\\]]*)\\]`);
    const m = content.match(re);
    if (!m) return [];
    const inner = m[1];
    const values = [];
    const itemRe = /\"([^\"]*)\"/g;
    let it;
    while ((it = itemRe.exec(inner)) !== null) {
        values.push(it[1]);
    }
    return values;
}

function parseModelFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Only consider files in an `allowed` folder and ending with .model.ts
    if (!/\ballowed\b/.test(filePath) || !filePath.endsWith('.model.ts')) return null;

    const id = extractString(content, 'id');
    if (!id) return null;
    const name = extractString(content, 'name') || id;
    const subtitle = extractString(content, 'subtitle');
    const contextLength = extractNumber(content, 'context_length');
    // Try nested fields using local search windows
    let modality = '';
    const archBlockMatch = content.match(/\"architecture\"\s*:\s*{[\s\S]*?}/);
    if (archBlockMatch) {
        modality = extractString(archBlockMatch[0], 'modality');
    }
    const inputModalities = extractArrayStrings(content, 'input_modalities');
    const outputModalities = extractArrayStrings(content, 'output_modalities');

    const pricingBlockMatch = content.match(/\"pricing\"\s*:\s*{[\s\S]*?}/);
    const pricing = {};
    if (pricingBlockMatch) {
        pricing.prompt = extractString(pricingBlockMatch[0], 'prompt');
        pricing.completion = extractString(pricingBlockMatch[0], 'completion');
        pricing.request = extractString(pricingBlockMatch[0], 'request');
    }

    const provider = id.includes('/') ? id.split('/')[0] : 'other';

    return {
        id,
        name,
        subtitle,
        provider,
        modality,
        inputModalities,
        outputModalities,
        contextLength,
        pricing
    };
}

function generateMarkdown(models) {
    const dateStr = new Date().toISOString().split('T')[0];
    const total = models.length;
    // Group by provider
    const byProvider = models.reduce((acc, m) => {
        (acc[m.provider] = acc[m.provider] || []).push(m);
        return acc;
    }, {});

    // Sort providers alphabetically and models by name
    const providers = Object.keys(byProvider).sort((a, b) => a.localeCompare(b));
    providers.forEach(p => byProvider[p].sort((a, b) => a.name.localeCompare(b.name)));

    let md = `---\n` +
        `title: Allowed AI Models\n` +
        `description: Full list of all allowed AI models available in Nobox with provider, modality and basic cost info.\n` +
        `---\n\n`;

    // Search toolbar and pills via Markdoc component (avoids raw HTML in MD)
    const providerSlug = (p) => p.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const popularProviders = providers.filter((p) => POPULAR_PROVIDERS.includes(p.toLowerCase()));
    const modelLabels = POPULAR_MODEL_PILLS.map((m) => m.label);
    const modelQueries = POPULAR_MODEL_PILLS.map((m) => m.query);
    md += `{% ai-models-tools popularProviders=[${popularProviders.map(p => `"${p}"`).join(', ')}] popularModelLabels=[${modelLabels.map(l => `"${l}"`).join(', ')}] popularModelQueries=[${modelQueries.map(q => `"${q}"`).join(', ')}] /%}\n\n`;

    // Meta block below search area
    md += `Updated: ${dateStr}\n\n`;
    md += `Total models: ${total}\n\n`;
    md += `Tip: Use the search to filter models by name, id, modality or provider.\n\n`;

    // (Removed provider quick links from the page; sidebar already lists providers)

    for (const provider of providers) {
        const modelsForProvider = byProvider[provider];
        md += `\n### ${provider} (${modelsForProvider.length}) {% #${providerSlug(provider)} %}\n\n`;

        // Markdown table
        md += `| Model | Subtitle | ID | Modality | Context | Prompt $/1k | Completion $/1k |\n`;
        md += `| --- | --- | --- | --- | --- | --- | --- |\n`;

        for (const m of modelsForProvider) {
            const modality = m.modality || (m.inputModalities.length || m.outputModalities.length
                ? `${m.inputModalities.join(', ') || 'text'} → ${m.outputModalities.join(', ') || 'text'}`
                : '');
            const subtitle = m.subtitle || '';
            const modelCell = m.name;
            const idCell = `\`${m.id}\``;
            const ctxCell = m.contextLength ? m.contextLength.toLocaleString() : '';
            const promptCost = (m.pricing && m.pricing.prompt) ? m.pricing.prompt : '-';
            const completionCost = (m.pricing && m.pricing.completion) ? m.pricing.completion : '-';
            md += `| ${modelCell} | ${subtitle} | ${idCell} | ${modality} | ${ctxCell} | ${promptCost} | ${completionCost} |\n`;
        }
        md += `\n`;
    }

    return md;
}

function main() {
    // Ensure pages dir exists
    if (!fs.existsSync(DOCS_PAGES_DIR)) {
        fs.mkdirSync(DOCS_PAGES_DIR, { recursive: true });
    }

    // Collect and parse model files
    const allFiles = walk(CORE_MODELS_DIR);
    const modelFiles = allFiles.filter(p => /\ballowed\b/.test(p) && p.endsWith('.model.ts'));

    const models = [];
    for (const file of modelFiles) {
        try {
            const m = parseModelFile(file);
            if (m) models.push(m);
        } catch (err) {
            console.warn(`Warning: Failed to parse ${file}:`, err.message);
        }
    }

    // De-duplicate by id just in case
    const unique = Array.from(new Map(models.map(m => [m.id, m])).values());

    const markdown = generateMarkdown(unique);
    fs.writeFileSync(OUTPUT_PAGE, markdown);
    console.log(`✓ Wrote ${OUTPUT_PAGE} with ${unique.length} models.`);
}

if (require.main === module) {
    main();
}

module.exports = { main };


