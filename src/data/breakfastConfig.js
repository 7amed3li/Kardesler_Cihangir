/**
 * Breakfast Landing Page Configuration
 * Single source of truth for breakfast-specific settings.
 * Edit breakfast hours, contact info, and dish selection here ONLY.
 */

// ─── Breakfast Serving Hours (editable from this one place) ───
export const BREAKFAST_HOURS = {
  opens: "09:00",
  closes: "13:00",
  // Human-readable per language
  display: {
    en: "Daily 09:00 AM – 01:00 PM",
    tr: "Her gün 09:00 – 13:00",
    ar: "يومياً من 09:00 صباحاً حتى 01:00 ظهراً",
    ru: "Ежедневно 09:00 – 13:00",
    fa: "هر روز ساعت ۰۹:۰۰ تا ۱۳:۰۰",
    fr: "Tous les jours 09h00 – 13h00",
    de: "Täglich 09:00 – 13:00 Uhr",
    it: "Tutti i giorni 09:00 – 13:00",
    es: "Todos los días 09:00 – 13:00",
    zh: "每天 09:00 – 13:00",
  },
};

// ─── Restaurant Contact & Location (single source) ───
export const RESTAURANT_INFO = {
  name: "Kardeşler Kebap & Breakfast Cihangir - Istanbul",
  phone: "+902122513696",
  phoneDisplay: "+90 212 251 36 96",
  whatsapp: "905386630692",
  whatsappDisplay: "+90 538 663 06 92",
  address: {
    street: "Defterdar Yokuşu No:1/A, Firuzağa Mah.",
    locality: "Cihangir, Beyoğlu",
    region: "İstanbul",
    postalCode: "34425",
    country: "TR",
  },
  coordinates: {
    latitude: 41.0310944,
    longitude: 28.9824818,
  },
  googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g",
  googleMapsPlaceId: "ChIJMz3TWu23yhQRZJD_LzDM82g",
  siteUrl: "https://kardeslercihangir.com",
  instagram: "https://www.instagram.com/kardeslerkebapcihangir/",
  generalHours: { opens: "09:00", closes: "02:00" },
};

// ─── Breakfast Dish IDs (references to menuData.js items) ───
// These must match the `id` field in menuData.js
export const BREAKFAST_DISH_IDS = {
  featured: "serpme_kahvalti",     // Serpme Kahvaltı (2 Kişilik)
  dishes: [
    "menemen",
    "omlet",
    "sahanda_yumurta",
    "sucuklu_yumurta",
    "kavurmali_yumurta",
  ],
};

// ─── UTM Campaign Names per Language ───
export const UTM_CAMPAIGNS = {
  en: "breakfast_en",
  tr: "breakfast_tr",
  ar: "breakfast_ar",
  ru: "breakfast_ru",
  fa: "breakfast_fa",
  fr: "breakfast_fr",
  de: "breakfast_de",
  it: "breakfast_it",
  es: "breakfast_es",
  zh: "breakfast_zh",
};

// ─── WhatsApp Message Templates per Language ───
export const WHATSAPP_MESSAGES = {
  en: "Hello Kardeşler Kebap Cihangir, we are coming for the Turkish breakfast.",
  tr: "Merhaba Kardeşler Kebap Cihangir, Türk kahvaltısı için gelmek istiyoruz.",
  ar: "مرحباً مطعم كارديشلر جيهانكير، نحن قادمون لتناول الإفطار التركي.",
  ru: "Здравствуйте, Kardeşler Kebap Cihangir, мы хотели бы прийти на турецкий завтрак.",
  fa: "سلام کاردشلر کباب جیهانگیر، ما برای صرف صبحانه ترکی می‌آییم.",
  fr: "Bonjour Kardeşler Kebap Cihangir, nous souhaitons venir pour le petit-déjeuner turc.",
  de: "Hallo Kardeşler Kebap Cihangir, wir möchten für das türkische Frühstück vorbeikommen.",
  it: "Ciao Kardeşler Kebap Cihangir, vorremmo venire per la colazione turca.",
  es: "Hola Kardeşler Kebap Cihangir, nos gustaría ir a disfrutar del desayuno turco.",
  zh: "你好 Kardeşler Kebap Cihangir，我们想来品尝土耳其早餐。",
};

// ─── URL Helpers ───
export function getBreakfastUrl(locale) {
  const slug = "turkish-breakfast-cihangir";
  if (locale === "en") return `/${slug}`;
  return `/${locale}/${slug}`;
}

export function getBreakfastFullUrl(locale) {
  return `${RESTAURANT_INFO.siteUrl}${getBreakfastUrl(locale)}`;
}

export function getWhatsAppUrl(locale) {
  const msg = WHATSAPP_MESSAGES[locale] || WHATSAPP_MESSAGES.en;
  return `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
}
