import { menuData } from "@/data/menuData";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";
import Image from "next/image";
import Link from "next/link";
import DeepMenuSchema from "@/components/DeepMenuSchema";
import { ChevronLeft } from "lucide-react";

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

const translations = { tr, en, ar, ru, fa, fr, de, it, es, zh };

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
  const { lang, id } = params;
  
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

  return {
    title: `${itemName} | Kardeşler Cihangir`,
    description: itemDesc || `Delicious ${itemName} at Kardeşler Cihangir Restaurant.`,
    alternates,
    openGraph: {
      title: `${itemName} | Kardeşler Cihangir`,
      description: itemDesc,
      url: `${siteUrl}/${lang}/dish/${id}`,
      images: itemData.image ? [{ url: `${siteUrl}${itemData.image}` }] : [],
    }
  };
}

export default function DishPage({ params }) {
  const { lang, id } = params;
  
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
  const itemName = t.items?.[id]?.name || itemData.id;
  const itemDesc = t.items?.[id]?.desc || "";
  
  const isRTL = lang === "ar" || lang === "fa";
  const displayPrice = itemData.price?.TRY ? itemData.price.TRY : itemData.price;

  return (
    <main className="min-h-screen bg-[#EDE3CE]" dir={isRTL ? "rtl" : "ltr"}>
      <DeepMenuSchema locale={lang} />
      
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 pt-24">
        <Link 
          href={lang === "en" ? `/menu#${id}` : `/${lang}/menu#${id}`}
          className="inline-flex items-center gap-2 text-[#9C7A3F] font-bold mb-6 hover:text-[#2B2620] transition-colors"
        >
          <ChevronLeft size={20} className={isRTL ? "rotate-180" : ""} />
          <span>{lang === "tr" ? "Menüye Dön" : lang === "ar" ? "العودة للمنيو" : "Back to Menu"}</span>
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
                <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  Signature
                </span>
              )}
              {itemData.tags?.includes("spicy") && (
                <span className="px-3 py-1 bg-brick/10 text-brick border border-brick/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  Spicy
                </span>
              )}
              {itemData.tags?.includes("vegetarian") && (
                <span className="px-3 py-1 bg-teal/10 text-teal border border-teal/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  Veg
                </span>
              )}
            </div>

            {itemDesc && (
              <p className="text-[#7A7364] text-lg leading-relaxed mb-8" style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}>
                {itemDesc}
              </p>
            )}

            <div className="mt-auto">
              <a 
                href={RESTAURANT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-md"
              >
                {lang === "tr" ? "Sipariş Ver" : lang === "ar" ? "اطلب الآن" : "Order Now"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
