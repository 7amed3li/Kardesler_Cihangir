const fs = require('fs');
const path = require('path');

const locales = ['ar', 'en', 'tr', 'ru', 'fa', 'fr', 'de', 'it', 'es', 'zh'];
let count = 0;

function processFile(filePath, lang) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace whatsappUrl definition
  content = content.replace(/const whatsappUrl = [^;]+;/, 'const phoneCallUrl = "tel:+902122513696";');
  
  // Replace hrefs
  content = content.replace(/href=\{whatsappUrl\}/g, 'href={phoneCallUrl}');
  
  // Replace the word WhatsApp in the span following the icon
  let replacements = {
    'en': 'Call to Reserve / Order',
    'ar': 'اتصل الآن للحجز أو الطلب',
    'tr': 'Rezervasyon ve Sipariş İçin Ara',
    'ru': 'Позвонить для заказа / брони',
    'fa': 'تماس برای رزرو / سفارش',
    'fr': 'Appeler pour Réserver / Commander',
    'de': 'Anrufen zum Reservieren / Bestellen',
    'it': 'Chiama per Prenotare / Ordinare',
    'es': 'Llamar para Reservar / Pedir',
    'zh': '致电预订/订购'
  };
  
  let replaceText = replacements[lang] || 'Call to Reserve / Order';
  
  // We need to replace the text inside the span.
  content = content.replace(/(<MessageCircle[^>]*\/>\s*<span>)([^<]+)(<\/span>)/g, `$1${replaceText}$3`);
  
  // Replace icon
  content = content.replace(/MessageCircle/g, 'Phone');
  
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

// Root EN page
processFile(path.join(__dirname, 'src/app/best-kebab-taksim/page.js'), 'en');

locales.forEach(lang => {
  let p = path.join(__dirname, 'src/app', lang, 'best-kebab-taksim', 'page.js');
  processFile(p, lang);
});

console.log('Updated ' + count + ' files.');
