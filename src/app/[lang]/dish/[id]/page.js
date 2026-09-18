import { menuData } from "@/data/menuData";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLivePricesMap } from "@/lib/services/priceService";

import tr from "@/i18n/menu/tr.json";
import en from "@/i18n/menu/en.json";
import ar from "@/i18n/menu/ar.json";
import ru from "@/i18n/menu/ru.json";
import fa from "@/i18n/menu/fa.json";
import fr from "@/i18n/menu/fr.json";
import de from "@/i18n/menu/de.json";
import it from "@/i18n/menu/it.json";
import es from "@/i18n/menu/es.json";
import zh from "@/i18n/menu/zh.json";

import trLocale from "@/i18n/locales/tr.json";
import enLocale from "@/i18n/locales/en.json";
import arLocale from "@/i18n/locales/ar.json";
import ruLocale from "@/i18n/locales/ru.json";
import faLocale from "@/i18n/locales/fa.json";
import frLocale from "@/i18n/locales/fr.json";
import deLocale from "@/i18n/locales/de.json";
import itLocale from "@/i18n/locales/it.json";
import esLocale from "@/i18n/locales/es.json";
import zhLocale from "@/i18n/locales/zh.json";

const translations = { tr, en, ar, ru, fa, fr, de, it, es, zh };
const uiLocales = {
  tr: trLocale,
  en: enLocale,
  ar: arLocale,
  ru: ruLocale,
  fa: faLocale,
  fr: frLocale,
  de: deLocale,
  it: itLocale,
  es: esLocale,
  zh: zhLocale,
};

export async function generateStaticParams() {
  const locales = ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"];
  const params = [];
  
  menuData.forEach((category) => {
    category.items.forEach((item) => {
      if (item.id) {
        locales.forEach((locale) => {
          params.push({ lang: locale, id: item.id });
        });
      }
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  
  let itemData = null;
  for (const cat of menuData) {
    const found = cat.items.find(i => i.id === id);
    if (found) {
      itemData = found;
      break;
    }
  }

  if (!itemData) return { title: "Not Found" };

  const t = translations[lang] || translations.tr;
  const itemName = t.items?.[id]?.name || itemData.id;
  const itemDesc = t.items?.[id]?.desc || "";

  const siteUrl = RESTAURANT_INFO.siteUrl;

  const alternates = {
    canonical: `${siteUrl}/${lang}/dish/${id}`,
    languages: {
      "x-default": `${siteUrl}/tr/dish/${id}`,
    }
  };
  
  Object.keys(translations).forEach(l => {
    alternates.languages[l] = `${siteUrl}/${l}/dish/${id}`;
  });

  const seoPrefix = {
    en: "Best", tr: "Cihangir'in En İyi", ar: "أفضل", ru: "Лучший", 
    fr: "Meilleur", fa: "بهترین", de: "Beste", it: "Il Miglior", es: "Mejor", zh: "最好的"
  };
  const inCihangir = {
    en: "in Cihangir", tr: "", ar: "في جيهانغير", ru: "в Джихангире", 
    fr: "à Cihangir", fa: "در جیهانگیر", de: "in Cihangir", it: "a Cihangir", es: "en Cihangir", zh: "在吉汉吉尔"
  };

  const prefix = seoPrefix[lang] || seoPrefix.en;
  const suffix = inCihangir[lang] || inCihangir.en;
  const seoTitle = lang === 'tr' ? `${prefix} ${itemName} | Kardeşler Kebap` : `${prefix} ${itemName} ${suffix} | Kardeşler Cihangir`;
  const seoDesc = itemDesc ? `${itemDesc} - ${seoTitle}` : `Enjoy the ${prefix.toLowerCase()} ${itemName} ${suffix} at Kardeşler Kebap Cihangir Restaurant.`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `${siteUrl}/${lang}/dish/${id}`,
      images: itemData.image ? [{ url: `${siteUrl}${itemData.image}` }] : [],
    }
  };
}

export default async function DishPage({ params }) {
  const { lang, id } = await params;
  
  let itemData = null;
  let categoryData = null;
  for (const cat of menuData) {
    const found = cat.items.find(i => i.id === id);
    if (found) {
      itemData = found;
      categoryData = cat;
      break;
    }
  }

  if (!itemData) {
    return <div className="p-20 text-center">Dish not found</div>;
  }

  const t = translations[lang] || translations.tr;
  const uiLocale = uiLocales[lang] || uiLocales.en || uiLocales.tr;
  const itemName = t.items?.[id]?.name || itemData.id;
  const itemDesc = t.items?.[id]?.desc || "";
  
  const isRTL = lang === "ar" || lang === "fa";

  const livePrices = await getLivePricesMap();
  const displayPrice = livePrices[id] || 0;

  return (
    <main className="min-h-screen bg-[#EDE3CE]" dir={isRTL ? "rtl" : "ltr"}>
            
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 pt-24">
        <Link 
          href={lang === "en" ? `/menu#${id}` : `/${lang}/menu#${id}`}
          className="inline-flex items-center gap-2 text-[#9C7A3F] font-bold mb-6 hover:text-[#2B2620] transition-colors"
        >
          <ChevronLeft size={20} className={isRTL ? "rotate-180" : ""} />
          <span>{uiLocale.backToMenu || (lang === "tr" ? "Menüye Dön" : lang === "ar" ? "العودة للمنيو" : "Back to Menu")}</span>
        </Link>
        
        <div className="bg-[#F7F2E7] rounded-2xl shadow-xl overflow-hidden border border-[#9C7A3F]/30 flex flex-col md:flex-row">
          {itemData.image && (
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#EDE3CE]">
              <Image 
                src={itemData.image} 
                alt={itemName} 
                fill 
                style={{ objectFit: "contain", padding: "1rem" }} 
                priority
              />
            </div>
          )}
          
          <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-3xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
                {itemName}
              </h1>
              <span className="shrink-0 text-xl font-bold text-[#9C7A3F] bg-[#EDE3CE] px-3 py-1 rounded-md border border-[#9C7A3F]/30" style={{ fontFamily: "var(--font-inter)" }}>
                {displayPrice} ₺
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {itemData.tags?.includes("signature") && (
                <span className="px-3 py-1 bg-[#9C7A3F]/15 text-[#9C7A3F] border border-[#9C7A3F]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  {uiLocale.signature || "Signature"}
                </span>
              )}
              {itemData.tags?.includes("spicy") && (
                <span className="px-3 py-1 bg-[#A0422E]/15 text-[#A0422E] border border-[#A0422E]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  {uiLocale.spicy || "Spicy"}
                </span>
              )}
              {itemData.tags?.includes("vegetarian") && (
                <span className="px-3 py-1 bg-[#4E5F4C]/15 text-[#4E5F4C] border border-[#4E5F4C]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  {uiLocale.vegetarian || "Veg"}
                </span>
              )}
            </div>

            {itemDesc && (
              <p className="text-[#7A7364] text-lg leading-relaxed mb-8" style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}>
                {itemDesc}
              </p>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
