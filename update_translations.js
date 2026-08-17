const fs = require('fs');

const path = 'c:/Users/Hp/kardeshler/src/i18n/breakfastTranslations.js';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  en: {
    ctaWhatsApp: "Contact via WhatsApp",
    ctaCall: "Call Us",
    ctaBookNow: "Get Directions",
    faq0: "No reservation is needed! We have plenty of space in our quiet restaurant, so you can walk in anytime.",
    faq5: "Our Serpme Kahvaltı for two is reasonably priced and all our individual egg dishes match our main menu prices. You can view the full menu for exact pricing."
  },
  tr: {
    ctaWhatsApp: "WhatsApp'tan İletişime Geç",
    ctaCall: "Bizi Arayın",
    ctaBookNow: "Yol Tarifi Al",
    faq0: "Hayır, rezervasyona gerek yoktur. Geniş ve sakin restoranımıza dilediğiniz zaman çat kapı gelebilirsiniz.",
    faq5: "2 kişilik Serpme Kahvaltımız ve bireysel yumurta tabaklarımız ana menümüzle aynı fiyattadır. Tam fiyatlar için menümüzü inceleyebilirsiniz."
  },
  ar: {
    ctaWhatsApp: "تواصل معنا عبر واتساب",
    ctaCall: "اتصل بنا",
    ctaBookNow: "احصل على الاتجاهات",
    faq0: "لا، الحجز المسبق غير ضروري! المطعم هادئ ولدينا مساحة كافية، نرحب بزيارتكم في أي وقت.",
    faq5: "إفطار سربمه كهفالتي لشخصين وأطباق البيض الفردية بأسعار معقولة ومطابقة للقائمة الرئيسية. يمكنك عرض القائمة الكاملة لمعرفة الأسعار الدقيقة."
  },
  ru: {
    ctaWhatsApp: "Свяжитесь по WhatsApp",
    ctaCall: "Позвонить нам",
    ctaBookNow: "Проложить маршрут",
    faq0: "Нет, бронировать столик не обязательно. В нашем спокойном ресторане всегда найдется место, вы можете прийти в любое время.",
    faq5: "Serpme Kahvaltı на двоих и блюда из яиц стоят так же, как в нашем основном меню. Вы можете посмотреть полное меню для точных цен."
  },
  fa: {
    ctaWhatsApp: "تماس از طریق واتساپ",
    ctaCall: "تماس با ما",
    ctaBookNow: "مسیریابی",
    faq0: "خیر، نیازی به رزرو نیست. رستوران ما آرام و دارای فضای کافی است، هر زمان که مایل بودید تشریف بیاورید.",
    faq5: "سرپمه کهوالتی برای دو نفر و غذاهای تخم‌مرغ تکی مطابق منوی اصلی قیمت‌گذاری شده‌اند. برای قیمت‌های دقیق می‌توانید منوی کامل را مشاهده کنید."
  },
  fr: {
    ctaWhatsApp: "Contactez-nous via WhatsApp",
    ctaCall: "Appelez-nous",
    ctaBookNow: "Obtenir l'itinéraire",
    faq0: "Non, aucune réservation n'est nécessaire. Notre restaurant est calme et spacieux, vous pouvez venir quand vous le souhaitez.",
    faq5: "Notre Serpme Kahvaltı pour deux et nos plats d'œufs individuels correspondent aux prix de notre menu principal. Vous pouvez consulter le menu complet pour les prix exacts."
  },
  de: {
    ctaWhatsApp: "Kontakt per WhatsApp",
    ctaCall: "Rufen Sie uns an",
    ctaBookNow: "Route anzeigen",
    faq0: "Nein, eine Reservierung ist nicht erforderlich. In unserem ruhigen Restaurant haben wir viel Platz, kommen Sie einfach vorbei.",
    faq5: "Unser Serpme Kahvaltı für zwei und unsere Eiergerichte entsprechen den Preisen unserer Hauptkarte. Die genauen Preise finden Sie in unserer vollständigen Speisekarte."
  },
  it: {
    ctaWhatsApp: "Contattaci su WhatsApp",
    ctaCall: "Chiamaci",
    ctaBookNow: "Indicazioni stradali",
    faq0: "No, la prenotazione non è necessaria. Il nostro ristorante è tranquillo e spazioso, siete i benvenuti in qualsiasi momento.",
    faq5: "Il nostro Serpme Kahvaltı per due e i piatti singoli a base di uova hanno gli stessi prezzi del menu principale. Puoi consultare il menu completo per i prezzi esatti."
  },
  es: {
    ctaWhatsApp: "Contáctanos por WhatsApp",
    ctaCall: "Llámanos",
    ctaBookNow: "Cómo llegar",
    faq0: "No, no es necesario reservar. Tenemos mucho espacio en nuestro tranquilo restaurante, así que puedes venir cuando quieras.",
    faq5: "Nuestro Serpme Kahvaltı para dos y nuestros platos de huevo individuales coinciden con los precios de nuestro menú principal. Puede ver el menú completo para conocer los precios exactos."
  },
  zh: {
    ctaWhatsApp: "通过 WhatsApp 联系我们",
    ctaCall: "致电我们",
    ctaBookNow: "获取路线",
    faq0: "不需要预订！我们的餐厅宽敞安静，随时欢迎您直接光临。",
    faq5: "我们的双人 Serpme Kahvaltı 和单份鸡蛋菜肴与主菜单价格一致。您可以查看完整菜单获取准确价格。"
  }
};

for (const [lang, data] of Object.entries(replacements)) {
  // Regex builder helper
  const replaceField = (field, newValue) => {
    // Looks for: ctaWhatsApp: "old value",
    const regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?${field}:\\s*")[^"]*(")`, 'g');
    content = content.replace(regex, `$1${newValue}$2`);
  };

  replaceField('ctaWhatsApp', data.ctaWhatsApp);
  replaceField('ctaCall', data.ctaCall);
  replaceField('ctaBookNow', data.ctaBookNow);

  // For faq[0].a (question 1)
  const faq0Regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?faq:\\s*\\[\\s*{\\s*q:\\s*"[^"]*",\\s*a:\\s*")[^"]*(")`);
  content = content.replace(faq0Regex, `$1${data.faq0}$2`);

  // For faq[5].a (question 6 about prices)
  // Let's just find the 6th question in the faq array for this language
  const langRegex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?faq:\\s*\\[)([\\s\\S]*?)(\\]\\s*,)`);
  const match = content.match(langRegex);
  if (match) {
    let faqBlock = match[2];
    let faqItems = faqBlock.split('},');
    if (faqItems.length >= 6) {
      // update the 6th item (index 5)
      faqItems[5] = faqItems[5].replace(/(a:\s*")[^"]*(")/, `$1${data.faq5}$2`);
      let newFaqBlock = faqItems.join('},');
      content = content.replace(match[0], `${match[1]}${newFaqBlock}${match[3]}`);
    }
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log("Updated successfully");
