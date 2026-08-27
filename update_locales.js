const fs = require('fs');
const path = require('path');

const locales = ['ar', 'en', 'tr', 'ru', 'fa', 'fr', 'de', 'it', 'es', 'zh'];
let count = 0;

function processLocale(lang) {
  let filePath = path.join(__dirname, 'src/i18n/locales', lang + '.json');
  if (!fs.existsSync(filePath)) return;
  
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const translations = {
    'en': {
      'sendWhatsApp': 'Call to Order',
      'whatsappRedirect': 'Initiating Call...',
      'whatsapp': 'Call to Order'
    },
    'ar': {
      'sendWhatsApp': 'اتصل الآن للطلب',
      'whatsappRedirect': 'جاري الاتصال...',
      'whatsapp': 'طلب عبر الهاتف'
    },
    'tr': {
      'sendWhatsApp': 'Sipariş İçin Ara',
      'whatsappRedirect': 'Aranıyor...',
      'whatsapp': 'Telefonla Sipariş'
    },
    'ru': {
      'sendWhatsApp': 'Позвонить для заказа',
      'whatsappRedirect': 'Выполняется звонок...',
      'whatsapp': 'Заказ по телефону'
    },
    'fa': {
      'sendWhatsApp': 'تماس برای سفارش',
      'whatsappRedirect': 'در حال تماس...',
      'whatsapp': 'سفارش تلفنی'
    },
    'fr': {
      'sendWhatsApp': 'Appeler pour commander',
      'whatsappRedirect': 'Appel en cours...',
      'whatsapp': 'Commande par téléphone'
    },
    'de': {
      'sendWhatsApp': 'Anrufen zum Bestellen',
      'whatsappRedirect': 'Anruf wird eingeleitet...',
      'whatsapp': 'Telefonische Bestellung'
    },
    'it': {
      'sendWhatsApp': 'Chiama per ordinare',
      'whatsappRedirect': 'Avvio chiamata...',
      'whatsapp': 'Ordine telefonico'
    },
    'es': {
      'sendWhatsApp': 'Llamar para pedir',
      'whatsappRedirect': 'Iniciando llamada...',
      'whatsapp': 'Pedido telefónico'
    },
    'zh': {
      'sendWhatsApp': '致电订购',
      'whatsappRedirect': '正在呼叫...',
      'whatsapp': '电话订购'
    }
  };

  const currentTranslations = translations[lang] || translations['en'];

  let updated = false;

  for (let key of Object.keys(data)) {
    if (key === 'sendWhatsApp' || key === 'whatsappRedirect' || key === 'whatsapp') {
      data[key] = currentTranslations[key];
      updated = true;
    }
    // Handle nested keys if any (like in arrays/objects)
    if (typeof data[key] === 'object') {
      for (let subKey of Object.keys(data[key])) {
         if (subKey === 'whatsapp') {
            data[key][subKey] = currentTranslations['whatsapp'];
            updated = true;
         }
      }
    }
  }

  // Also replace any standalone "whatsapp" keys
  if (data["menu"]) {
     if (data["menu"]["whatsapp"]) {
         data["menu"]["whatsapp"] = currentTranslations['whatsapp'];
         updated = true;
     }
  }
  
  if (data["common"]) {
     if (data["common"]["whatsapp"]) {
         data["common"]["whatsapp"] = currentTranslations['whatsapp'];
         updated = true;
     }
  }

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    count++;
  }
}

locales.forEach(lang => {
  processLocale(lang);
});

console.log('Updated ' + count + ' locales.');
