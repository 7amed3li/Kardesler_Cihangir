const fs = require('fs');

const path = 'c:/Users/Hp/kardeshler/src/i18n/breakfastTranslations.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/08:00/g, '09:00');
content = content.replace(/08h00/g, '09h00');
content = content.replace(/۰۸:۰۰/g, '۰۹:۰۰');

fs.writeFileSync(path, content, 'utf8');
console.log("Times updated to 09:00 successfully");
