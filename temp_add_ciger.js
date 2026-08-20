const fs = require('fs');
const path = require('path');

async function addKuzuCiger() {
  const newItem = {
    id: "kuzu_ciger",
    price: 825,
    tags: []
  };

  const translations = {
    tr: { name: "Kuzu Ciğer", desc: "Özel soslu kuzu ciğer şiş" },
    en: { name: "Lamb Liver", desc: "Special marinated lamb liver skewer" },
    ar: { name: "كبدة غنم", desc: "سيخ كبدة غنم متبلة بصلصة خاصة" },
    fa: { name: "جگر گوسفندی", desc: "سیخ جگر گوسفند با سس مخصوص" },
    fr: { name: "Foie d'agneau", desc: "Brochette de foie d'agneau marinée" },
    ru: { name: "Печень Ягненка", desc: "Маринованный шашлык из бараньей печени" },
    de: { name: "Lammleber", desc: "Marinierter Lammleber-Spieß" },
    it: { name: "Fegato di Agnello", desc: "Spiedino di fegato di agnello marinato" },
    es: { name: "Hígado de Cordero", desc: "Brocheta de hígado de cordero marinado" },
    zh: { name: "羊肝", desc: "特制腌制羊肝烤串" }
  };

  try {
    // 1. Update menuData.js
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Insert into kebap category
    // find 'kebap' category items array
    const kebapRegex = /(id:\s*['"]kebap['"],[\s\S]*?items:\s*\[)/;
    if (kebapRegex.test(menuData) && !menuData.includes('"kuzu_ciger"')) {
      menuData = menuData.replace(kebapRegex, `$1\n      { id: "kuzu_ciger", price: 825, image: "/images/menu/kuzu_ciger.webp", tags: [] },`);
      fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
      console.log('Added to menuData.js');
    }

    // 2. Update menu.json
    const menuJsonPath = 'src/lib/menu.json';
    if (fs.existsSync(menuJsonPath)) {
      let menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
      if (!menuJson.find(i => i.id === 'kuzu_ciger')) {
        menuJson.push({
          id: "kuzu_ciger",
          name: {
            tr: translations.tr.name,
            en: translations.en.name,
            ar: translations.ar.name
          },
          description: {
            tr: translations.tr.desc,
            en: translations.en.desc,
            ar: translations.ar.desc
          },
          price: 825,
          category: {
            tr: "Kebap",
            en: "Kebab",
            ar: "كباب"
          },
          image: "/images/menu/kuzu_ciger.webp",
          tags: []
        });
        fs.writeFileSync(menuJsonPath, JSON.stringify(menuJson, null, 2), 'utf8');
        console.log('Added to menu.json');
      }
    }

    // 3. Update translations
    const i18nDir = 'src/i18n/menu';
    const langs = Object.keys(translations);
    langs.forEach(lang => {
      const p = path.join(i18nDir, `${lang}.json`);
      if (fs.existsSync(p)) {
        let json = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (!json.items.kuzu_ciger) {
          json.items.kuzu_ciger = translations[lang];
          fs.writeFileSync(p, JSON.stringify(json, null, 2), 'utf8');
          console.log(`Updated translation for ${lang}`);
        }
      }
    });

    // 4. Update Supabase
    const env = fs.readFileSync('.env.local', 'utf8');
    const supabaseUrlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
    const supabaseKeyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);
    
    if (supabaseUrlMatch && supabaseKeyMatch) {
      const url = supabaseUrlMatch[1].trim().replace(/['"]/g, '') + '/rest/v1/items';
      const key = supabaseKeyMatch[1].trim().replace(/['"]/g, '');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify([{ id: "kuzu_ciger", price: 825 }])
      });
      
      if (!response.ok) {
        console.error('Error inserting to Supabase:', await response.text());
      } else {
        console.log('Successfully inserted to Supabase');
      }
    }
  } catch(e) {
    console.error(e);
  }
}

addKuzuCiger();
