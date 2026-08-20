const fs = require('fs');

let content = fs.readFileSync('src/data/menuData.js', 'utf8');

const kebabIds = [
  'adana_urfa', 'mardin_kebap', 'beyti_kebap', 'domatesli_kebap', 'patlicanli_kebap', 'kuzu_sis_kebap', 
  'ali_nazik_kebap', 'inegol_kofte', 'vali_kebabi', 'tavuk_sis_izgara', 'tavuk_kanat', 'kuzu_lokum', 
  'kuzu_pirzola', 'kiremit_kebap', 'iskender_kebap', 'yogurtlu_kebap', 'alti_ezmeli_kebap', 'dana_bonfile', 
  'dana_cop_sis', 'karisik_kebap_1', 'mardin_kebap_menu', 'kuzu_sis_menu', 'tavuk_kanat_menu',
  'mezeli_adana_urfa', 'mezeli_dana_cop_sis', 'mezeli_kuzu_pirzola', 'mezeli_kuzu_lokum', 'mezeli_inegol_kofte', 
  'mezeli_kuzu_sis', 'mezeli_dana_bonfile', 'mezeli_durum', 'mezeli_tavuk_kanat', 'mezeli_tavuk_sis', 
  'karisik_meze_tabagi'
];

let updated = 0;

kebabIds.forEach(id => {
  const regex = new RegExp(`(id:\\s*['"]${id}['"],(?:.|\\n|\\r)*?)price:\\s*([0-9.]+)`, 'g');
  content = content.replace(regex, (match, p1, p2) => {
    const oldPrice = parseFloat(p2);
    const newPrice = oldPrice + 200;
    updated++;
    return `${p1}price: ${newPrice}`;
  });
});

const regexKarisik = /(id:\s*['"]karisik_kebap_2['"],(?:.|\n|\r)*?)price:\s*([0-9.]+)/g;
content = content.replace(regexKarisik, (match, p1) => {
  updated++;
  return `${p1}price: 2650`;
});

fs.writeFileSync('src/data/menuData.js', content, 'utf8');
console.log('Updated ' + updated + ' prices in menuData.js');
