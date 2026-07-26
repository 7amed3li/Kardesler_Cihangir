/**
 * Build a rich, multilingual menu.json for the AI chatbot
 * from menuData.js + i18n translation files.
 * 
 * Run: node buildMenuJson.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load translation files
const tr = JSON.parse(readFileSync(join(__dirname, 'src/i18n/menu/tr.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(__dirname, 'src/i18n/menu/en.json'), 'utf8'));
const ar = JSON.parse(readFileSync(join(__dirname, 'src/i18n/menu/ar.json'), 'utf8'));

// Load menuData (we'll parse it manually since it's ESM export)
const menuDataRaw = readFileSync(join(__dirname, 'src/data/menuData.js'), 'utf8');

// Parse categories and items from menuData
function parseMenuData(raw) {
  // Use a simple eval-like approach: extract the array
  const match = raw.match(/export const menuData = (\[[\s\S]*\]);/);
  if (!match) throw new Error('Could not parse menuData.js');
  // Replace the export and eval safely
  const fn = new Function(`return ${match[1]}`);
  return fn();
}

const menuData = parseMenuData(menuDataRaw);

// Build enriched menu items
const items = [];

for (const category of menuData) {
  const catId = category.id;
  const catNameTr = tr.categories?.[catId] || category.category?.en || catId;
  const catNameEn = en.categories?.[catId] || category.category?.en || catId;
  const catNameAr = ar.categories?.[catId] || catId;

  for (const item of category.items) {
    const id = item.id;
    const trItem = tr.items?.[id] || {};
    const enItem = en.items?.[id] || {};
    const arItem = ar.items?.[id] || {};

    const tags = item.tags || [];

    const entry = {
      id,
      name: {
        tr: trItem.name || id.replace(/_/g, ' '),
        en: enItem.name || id.replace(/_/g, ' '),
        ar: arItem.name || id.replace(/_/g, ' '),
      },
      description: {
        tr: trItem.desc || '',
        en: enItem.desc || '',
        ar: arItem.desc || '',
      },
      price: item.price,
      currency: 'TRY',
      category: catId,
      categoryName: {
        tr: catNameTr,
        en: catNameEn,
        ar: catNameAr,
      },
      vegetarian: tags.includes('vegetarian'),
      vegan: false,
      spicy: tags.includes('spicy'),
      signature: tags.includes('signature'),
      trending: item.trending || false,
      allergens: [],
    };

    items.push(entry);
  }
}

const outputPath = join(__dirname, 'src/lib/menu.json');
writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf8');

console.log(`✅ menu.json rebuilt with ${items.length} items (TR/EN/AR names & descriptions)`);
console.log(`   Output: ${outputPath}`);
