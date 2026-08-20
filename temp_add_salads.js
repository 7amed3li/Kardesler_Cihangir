const fs = require('fs');
const path = require('path');

async function addSalads() {
  const newItems = [
    { id: "elma_dilim_patates", price: 300, tags: ["vegetarian", "vegan"] },
    { id: "kizartmasi_patates", price: 250, tags: ["vegetarian", "vegan"] },
    { id: "ton_balikli_salata", price: 700, tags: [] },
    { id: "tavuklu_salata", price: 700, tags: [] },
    { id: "karides_guvec", price: 700, tags: [] }
  ];

  const translations = {
    tr: {
      elma_dilim_patates: { name: "Elma Dilim Patates", desc: "Patato Wedges" },
      kizartmasi_patates: { name: "Kızartması Patates", desc: "French Fries" },
      ton_balikli_salata: { name: "Ton Balıklı Salata", desc: "Tuna Salad" },
      tavuklu_salata: { name: "Tavuklu Salata", desc: "Chicken with salad" },
      karides_guvec: { name: "Karides Güveç", desc: "Shrimp in Clay Pot" }
    },
    en: {
      elma_dilim_patates: { name: "Potato Wedges", desc: "Baked potato wedges" },
      kizartmasi_patates: { name: "French Fries", desc: "Crispy french fries" },
      ton_balikli_salata: { name: "Tuna Salad", desc: "Fresh salad with tuna" },
      tavuklu_salata: { name: "Chicken Salad", desc: "Chicken with salad" },
      karides_guvec: { name: "Shrimp in Clay Pot", desc: "Shrimp cooked in a traditional clay pot" }
    },
    ar: {
      elma_dilim_patates: { name: "بطاطس ودجز", desc: "بطاطس ودجز محمصة" },
      kizartmasi_patates: { name: "بطاطا مقلية", desc: "بطاطا مقلية مقرمشة" },
      ton_balikli_salata: { name: "سلطة تونة", desc: "سلطة طازجة مع التونة" },
      tavuklu_salata: { name: "سلطة دجاج", desc: "سلطة مع قطع الدجاج" },
      karides_guvec: { name: "روبيان بالفخار", desc: "روبيان مطبوخ في الفخار التقليدي" }
    },
    fa: {
      elma_dilim_patates: { name: "سیب زمینی تنوری", desc: "سیب زمینی تنوری خوشمزه" },
      kizartmasi_patates: { name: "سیب زمینی سرخ کرده", desc: "سیب زمینی سرخ کرده ترد" },
      ton_balikli_salata: { name: "سالاد تن ماهی", desc: "سالاد تازه با تن ماهی" },
      tavuklu_salata: { name: "سالاد مرغ", desc: "سالاد تازه با تکه های مرغ" },
      karides_guvec: { name: "میگو در ظرف سفالی", desc: "میگو پخته شده در ظرف سفالی" }
    },
    fr: {
      elma_dilim_patates: { name: "Quartiers de pommes de terre", desc: "Quartiers de pommes de terre rôtis" },
      kizartmasi_patates: { name: "Frites", desc: "Frites croustillantes" },
      ton_balikli_salata: { name: "Salade de Thon", desc: "Salade fraîche au thon" },
      tavuklu_salata: { name: "Salade de Poulet", desc: "Salade avec morceaux de poulet" },
      karides_guvec: { name: "Crevettes en pot d'argile", desc: "Crevettes cuites dans un pot en argile" }
    },
    ru: {
      elma_dilim_patates: { name: "Картофельные дольки", desc: "Запеченные картофельные дольки" },
      kizartmasi_patates: { name: "Картофель фри", desc: "Хрустящий картофель фри" },
      ton_balikli_salata: { name: "Салат с тунцом", desc: "Свежий салат с тунцом" },
      tavuklu_salata: { name: "Куриный салат", desc: "Салат с кусочками курицы" },
      karides_guvec: { name: "Креветки в глиняном горшке", desc: "Креветки, запеченные в глиняном горшке" }
    },
    de: {
      elma_dilim_patates: { name: "Kartoffelspalten", desc: "Gebackene Kartoffelspalten" },
      kizartmasi_patates: { name: "Pommes Frites", desc: "Knusprige Pommes Frites" },
      ton_balikli_salata: { name: "Thunfischsalat", desc: "Frischer Salat mit Thunfisch" },
      tavuklu_salata: { name: "Hähnchensalat", desc: "Salat mit Hähnchenstücken" },
      karides_guvec: { name: "Garnelen im Tontopf", desc: "Garnelen im Tontopf gebacken" }
    },
    it: {
      elma_dilim_patates: { name: "Spicchi di Patate", desc: "Spicchi di patate al forno" },
      kizartmasi_patates: { name: "Patatine Fritte", desc: "Patatine fritte croccanti" },
      ton_balikli_salata: { name: "Insalata di Tonno", desc: "Insalata fresca con tonno" },
      tavuklu_salata: { name: "Insalata di Pollo", desc: "Insalata con pollo" },
      karides_guvec: { name: "Gamberi in tegame di terracotta", desc: "Gamberi cotti in terracotta" }
    },
    es: {
      elma_dilim_patates: { name: "Gajos de Patata", desc: "Gajos de patata asados" },
      kizartmasi_patates: { name: "Patatas Fritas", desc: "Patatas fritas crujientes" },
      ton_balikli_salata: { name: "Ensalada de Atún", desc: "Ensalada fresca con atún" },
      tavuklu_salata: { name: "Ensalada de Pollo", desc: "Ensalada con pollo" },
      karides_guvec: { name: "Camarones en cazuela de barro", desc: "Camarones cocinados en cazuela de barro" }
    },
    zh: {
      elma_dilim_patates: { name: "烤土豆角", desc: "烤制土豆角" },
      kizartmasi_patates: { name: "炸薯条", desc: "香脆炸薯条" },
      ton_balikli_salata: { name: "金枪鱼沙拉", desc: "新鲜金枪鱼沙拉" },
      tavuklu_salata: { name: "鸡肉沙拉", desc: "鸡肉沙拉" },
      karides_guvec: { name: "砂锅虾", desc: "传统砂锅烹制虾" }
    }
  };

  try {
    // 1. Update menuData.js
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Find salata category
    // Matches: id: "salata", ... items: [ ... ]
    const salataRegex = /(id:\s*['"]salata['"],[\s\S]*?items:\s*\[)([\s\S]*?)(\n\s*\])/;
    
    if (salataRegex.test(menuData)) {
      const match = menuData.match(salataRegex);
      const before = match[1];
      const itemsList = match[2];
      const after = match[3];
      
      let itemsToAdd = '';
      newItems.forEach(item => {
        if (!menuData.includes(`"${item.id}"`)) {
          itemsToAdd += `\n    { id: "${item.id}", price: ${item.price}, tags: ${JSON.stringify(item.tags)} },`;
        }
      });
      
      if (itemsToAdd) {
        menuData = menuData.replace(salataRegex, before + itemsList + (itemsList.trim().endsWith(',') ? '' : ',') + itemsToAdd + after);
        fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
        console.log('Added to menuData.js');
      } else {
        console.log('Items already exist in menuData.js');
      }
    }

    // 2. Update menu.json
    const menuJsonPath = 'src/lib/menu.json';
    if (fs.existsSync(menuJsonPath)) {
      let menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
      newItems.forEach(item => {
        if (!menuJson.find(i => i.id === item.id)) {
          menuJson.push({
            id: item.id,
            name: {
              tr: translations.tr[item.id].name,
              en: translations.en[item.id].name,
              ar: translations.ar[item.id].name
            },
            description: {
              tr: translations.tr[item.id].desc,
              en: translations.en[item.id].desc,
              ar: translations.ar[item.id].desc
            },
            price: item.price,
            category: {
              tr: "Salata",
              en: "Salad",
              ar: "سلطة"
            },
            tags: item.tags
          });
        }
      });
      fs.writeFileSync(menuJsonPath, JSON.stringify(menuJson, null, 2), 'utf8');
      console.log('Added to menu.json');
    }

    // 3. Update translations
    const i18nDir = 'src/i18n/menu';
    const langs = Object.keys(translations);
    langs.forEach(lang => {
      const p = path.join(i18nDir, `${lang}.json`);
      if (fs.existsSync(p)) {
        let json = JSON.parse(fs.readFileSync(p, 'utf8'));
        let updated = false;
        Object.keys(translations[lang]).forEach(itemId => {
          if (!json.items[itemId]) {
            json.items[itemId] = translations[lang][itemId];
            updated = true;
          }
        });
        if (updated) {
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
      
      const sbItems = newItems.map(i => ({ id: i.id, price: i.price }));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(sbItems)
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

addSalads();
