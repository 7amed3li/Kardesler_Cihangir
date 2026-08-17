import MenuPage from "@/app/menu/page";
import DeepMenuSchema from "@/components/DeepMenuSchema";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;
const locale = "zh";

export const metadata = {
  title: "完整菜单 | Kardeşler Cihangir",
  description: "undefined",
  alternates: {
    canonical: `${siteUrl}/${locale}/menu`,
    languages: {
      "x-default": `${siteUrl}/menu`,
      en: `${siteUrl}/menu`,
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
    title: "完整菜单 | Kardeşler Cihangir",
    description: "undefined",
    url: `${siteUrl}/${locale}/menu`,
    type: "website"
  }
};

export default function LocalizedMenuPage() {
  return (
    <>
      <DeepMenuSchema locale={locale} />
      <div data-locale={locale} className="localized-menu-wrapper">
        <MenuPage />
      </div>
    </>
  );
}
