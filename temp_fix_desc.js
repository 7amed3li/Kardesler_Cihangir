const fs = require('fs');
const path = require('path');

const newDesc = {
  tr: "Geleneksel kuzu ciğer şiş",
  en: "Traditional lamb liver skewer",
  ar: "سيخ كبدة غنم تقليدية",
  fa: "سیخ جگر گوسفند سنتی",
  fr: "Brochette de foie d'agneau traditionnelle",
  ru: "Традиционный шашлык из бараньей печени",
  de: "Traditioneller Lammleber-Spieß",
  it: "Spiedino di fegato di agnello tradizionale",
  es: "Brocheta de hígado de cordero tradicional",
  zh: "传统羊肝烤串"
};

// 1. Update i18n JSON files
const i18nDir = 'src/i18n/menu';
const langs = Object.keys(newDesc);
langs.forEach(lang => {
  const p = path.join(i18nDir, `${lang}.json`);
  if (fs.existsSync(p)) {
    let json = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (json.items && json.items.kuzu_ciger) {
      json.items.kuzu_ciger.desc = newDesc[lang];
      fs.writeFileSync(p, JSON.stringify(json, null, 2), 'utf8');
      console.log(`Updated translation for ${lang}`);
    }
  }
});

// 2. Update menu.json
const menuJsonPath = 'src/lib/menu.json';
if (fs.existsSync(menuJsonPath)) {
  let menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
  const ciger = menuJson.find(i => i.id === 'kuzu_ciger');
  if (ciger) {
    ciger.description = {
      tr: newDesc.tr,
      en: newDesc.en,
      ar: newDesc.ar
    };
    fs.writeFileSync(menuJsonPath, JSON.stringify(menuJson, null, 2), 'utf8');
    console.log('Updated menu.json');
  }
}
