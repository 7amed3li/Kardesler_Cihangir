import MenuPage from "@/app/menu/page";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    tr: "Menü | Kardeşler Kebap Cihangir",
    en: "Menu | Kardeşler Kebap Cihangir",
    ar: "قائمة الطعام (المنيو) | مطعم كارديشلر كباب جيهانكير",
    fa: "منوی غذا | رستوران کاردشلر کباب جهانگیر",
    ru: "Меню | Ресторан Kardeşler Kebap Джихангир",
    fr: "Menu | Restaurant Kardeşler Kebap Cihangir",
    de: "Speisekarte | Kardeşler Kebap Cihangir",
    it: "Menu | Ristorante Kardeşler Kebap Cihangir",
    es: "Menú | Restaurante Kardeşler Kebap Cihangir",
    zh: "菜单 | Kardeşler 烤肉餐厅 吉汉吉尔",
  };
  const descriptions = {
    tr: "Kardeşler Kebap Cihangir geleneksel odun ateşi ve zırh kıyması lezzetleri. Kebap, pide, lahmacun ve zengin Türk kahvaltısı menüsü.",
    en: "Kardeşler Kebap Cihangir authentic wood-fired kebabs, pides, lahmacun, and rich traditional Turkish breakfast.",
    ar: "قائمة طعام مطعم كارديشلر كباب جيهانكير: كباب أصيل على الفحم، فطائر بيدة، لحم بعجين، وإفطار تركي تقليدي فاخر.",
    fa: "منوی رستوران کاردشلر کباب جهانگیر: کباب‌های اصیل، پیده، لاهماجون و صبحانه سنتی ترکی در جهانگیر استانبول.",
    ru: "Меню ресторана Kardeşler Kebap в Джихангире: традиционные кебабы на углях, пиде, лахмаджун и турецкий завтрак.",
    fr: "Menu du restaurant Kardeşler Kebap à Cihangir : kebabs traditionnels au feu de bois, pides, lahmacun et petit-déjeuner turc.",
    de: "Speisekarte des Kardeşler Kebap Cihangir: traditionelle Holzfeuer-Kebabs, Pide, Lahmacun und reichhaltiges türkisches Frühstück.",
    it: "Menu del ristorante Kardeşler Kebap a Cihangir: autentici kebab alla brace, pide, lahmacun e colazione tradizionale turca.",
    es: "Menú del restaurante Kardeşler Kebap en Cihangir: auténticos kebabs a la leña, pides, lahmacun y desayuno tradicional turco.",
    zh: "Kardeşler 烤肉餐厅吉汉吉尔菜单：正宗木炭烤肉、土耳其披萨（Pide）、薄饼（Lahmacun）及丰盛土耳其传统早餐。",
  };

  const currentTitle = titles[lang] || titles.en;
  const currentDesc = descriptions[lang] || descriptions.en;

  return {
    title: currentTitle,
    description: currentDesc,
    alternates: {
      canonical: `${siteUrl}/${lang}/menu`,
      languages: {
        "x-default": `${siteUrl}/menu`,
        en: `${siteUrl}/en/menu`,
        ar: `${siteUrl}/ar/menu`,
        tr: `${siteUrl}/tr/menu`,
        ru: `${siteUrl}/ru/menu`,
        fa: `${siteUrl}/fa/menu`,
        fr: `${siteUrl}/fr/menu`,
        de: `${siteUrl}/de/menu`,
        it: `${siteUrl}/it/menu`,
        es: `${siteUrl}/es/menu`,
        zh: `${siteUrl}/zh/menu`
      }
    },
    openGraph: {
      title: currentTitle,
      description: currentDesc,
      url: `${siteUrl}/${lang}/menu`,
      type: "website"
    }
  };
}

export default async function LocalizedMenuPage({ params }) {
  const { lang } = await params;
  return (
    <>
            <div data-locale={lang} className="localized-menu-wrapper">
        <MenuPage />
      </div>
    </>
  );
}
