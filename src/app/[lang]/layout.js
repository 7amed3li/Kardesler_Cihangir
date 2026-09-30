export async function generateMetadata({ params }) {
  const { lang } = await params;
  const baseUrl = "https://www.kardeslercihangir.com";
  
  // Set accurate locales based on URL param
  const localeMap = {
    tr: 'tr_TR',
    en: 'en_US',
    ar: 'ar_SA',
    ru: 'ru_RU',
    fa: 'fa_IR',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    es: 'es_ES',
    zh: 'zh_CN'
  };

  // Localized titles per language
  const titles = {
    tr: "Kardeşler Kebap & Pide Cihangir | 1998'den Beri Geleneksel Lezzetler",
    en: "Kardeşler Kebap & Pide Cihangir | Authentic Turkish Cuisine Since 1998",
    ar: "مطعم كاردشلر كباب و بيدة جيهانكير | مأكولات تركية أصيلة منذ 1998",
    ru: "Kardeşler Kebap & Pide Cihangir | Турецкая кухня с 1998 года",
    fa: "رستوران کاردشلر کباب و پیده جهانگیر | غذای اصیل ترکی از سال ۱۹۹۸",
    fr: "Kardeşler Kebap & Pide Cihangir | Cuisine turque authentique depuis 1998",
    de: "Kardeşler Kebap & Pide Cihangir | Authentische türkische Küche seit 1998",
    it: "Kardeşler Kebap & Pide Cihangir | Cucina turca autentica dal 1998",
    es: "Kardeşler Kebap & Pide Cihangir | Cocina turca auténtica desde 1998",
    zh: "Kardeşler 烤肉 & 土耳其披萨 吉汉吉尔 | 1998年至今的正宗土耳其美食",
  };

  // Localized descriptions per language
  const descriptions = {
    tr: "Cihangir'in kalbinde 1998'den beri hizmet veren Kardeşler Kebap — Adana kebap, taş fırın pide, lahmacun, serpme kahvaltı ve 100+ geleneksel lezzet. Taksim'e 5 dk.",
    en: "Authentic Turkish cuisine in the heart of Cihangir, 5 min from Taksim Square. 100+ dishes — Adana kebab, stone-oven pide, lahmacun, Turkish breakfast & more. Open daily 09:00–02:00.",
    ar: "مطعم كاردشلر كباب في قلب جيهانكير — كباب أضنة، بيدة حجرية، لحم بعجين، فطور تركي تقليدي و100+ طبق أصيل. 5 دقائق من ميدان تقسيم.",
    ru: "Аутентичная турецкая кухня в сердце Джихангира, 5 мин от площади Таксим. 100+ блюд — Адана-кебаб, пиде, лахмаджун, турецкий завтрак. Ежедневно 09:00–02:00.",
    fa: "غذای اصیل ترکی در قلب جهانگیر، ۵ دقیقه از میدان تکسیم. +۱۰۰ غذا — کباب آدانا، پیده سنگی، لاهماجون، صبحانه ترکی. هر روز ۰۹:۰۰–۰۲:۰۰.",
    fr: "Cuisine turque authentique au cœur de Cihangir, à 5 min de Taksim. 100+ plats — kebab Adana, pide au four à pierre, lahmacun, petit-déjeuner turc. Ouvert 09h–02h.",
    de: "Authentische türkische Küche im Herzen von Cihangir, 5 Min. vom Taksim-Platz. 100+ Gerichte — Adana-Kebab, Steinofen-Pide, Lahmacun, türkisches Frühstück. Täglich 09:00–02:00.",
    it: "Cucina turca autentica nel cuore di Cihangir, 5 min da Piazza Taksim. 100+ piatti — Adana kebab, pide al forno a legna, lahmacun, colazione turca. Aperto 09:00–02:00.",
    es: "Cocina turca auténtica en el corazón de Cihangir, 5 min de la Plaza Taksim. 100+ platos — kebab Adana, pide al horno de piedra, lahmacun, desayuno turco. Abierto 09:00–02:00.",
    zh: "位于吉汉吉尔中心地带的正宗土耳其美食，距塔克西姆广场5分钟。100+道菜——阿达纳烤肉、石窑披萨、薄饼、土耳其早餐。每天09:00–02:00。",
  };
  
  const currentLocale = localeMap[lang] || 'tr_TR';
  const url = `${baseUrl}/${lang}`;

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: url,
      languages: {
        "x-default": baseUrl,
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        ru: `${baseUrl}/ru`,
        fa: `${baseUrl}/fa`,
        fr: `${baseUrl}/fr`,
        de: `${baseUrl}/de`,
        it: `${baseUrl}/it`,
        es: `${baseUrl}/es`,
        zh: `${baseUrl}/zh`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: url,
      locale: currentLocale,
    },
  };
}

export default function LangLayout({ children }) {
  return children;
}

