const fs = require('fs');

const path = 'c:/Users/Hp/kardeshler/src/i18n/breakfastTranslations.js';
let content = fs.readFileSync(path, 'utf8');

// Replace "Reserve via WhatsApp." or similar in meta descriptions
const replacements = [
  { lang: "en", replaceText: " Reserve via WhatsApp." },
  { lang: "tr", replaceText: " WhatsApp ile rezervasyon." },
  { lang: "ar", replaceText: " احجز عبر واتساب." },
  { lang: "ru", replaceText: " Бронь через WhatsApp." },
  { lang: "fa", replaceText: " رزرو از طریق واتساپ." },
  { lang: "fr", replaceText: " Réservez via WhatsApp." },
  { lang: "de", replaceText: " Reservierung per WhatsApp." },
  { lang: "it", replaceText: " Prenota via WhatsApp." },
  { lang: "es", replaceText: " Reserva por WhatsApp." },
  { lang: "zh", replaceText: " 通过 WhatsApp 预订。" }
];

for (const { lang, replaceText } of replacements) {
  const regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?metaDescription:\\s*".*?)(${replaceText})(")`, 'g');
  content = content.replace(regex, `$1$3`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Meta descriptions updated successfully");
