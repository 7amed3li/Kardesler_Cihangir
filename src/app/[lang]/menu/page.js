import MenuPage from "@/app/menu/page";
import DeepMenuSchema from "@/components/DeepMenuSchema";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "Menü | Kardeşler Cihangir", // Will be localized further down ideally, but for now we fallback
    description: "Kardeşler Cihangir Restaurant Menu",
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
      title: "Menü | Kardeşler Cihangir",
      description: "Kardeşler Cihangir Restaurant Menu",
      url: `${siteUrl}/${lang}/menu`,
      type: "website"
    }
  };
}

export default async function LocalizedMenuPage({ params }) {
  const { lang } = await params;
  return (
    <>
      <DeepMenuSchema locale={lang} />
      <div data-locale={lang} className="localized-menu-wrapper">
        <MenuPage />
      </div>
    </>
  );
}
