const fs = require('fs');

const file = 'src/data/menuData.js';
let code = fs.readFileSync(file, 'utf8');

const parts = code.split('id: "soguk_icecek",');
if (parts.length === 2) {
  let drinksPart = parts[1].replace(/image:\s*\"[^\"]+\",\s*/g, '');
  fs.writeFileSync(file, parts[0] + 'id: "soguk_icecek",' + drinksPart);
  console.log('Drinks images removed.');
} else {
  console.log('Could not find soguk_icecek');
}
