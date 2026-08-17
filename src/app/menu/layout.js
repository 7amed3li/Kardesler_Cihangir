import React from "react";
import { menuData } from "@/data/menuData";
import arMenu from "@/i18n/menu/ar.json";
import trMenu from "@/i18n/menu/tr.json";

export const metadata = {
  title: "Menu | Kardeşler Cihangir — Authentic Kebap, Lahmacun & Stone-Oven Pide",
  description:
    "Explore our complete digital menu: authentic wood-fired kebabs, crispy stone-baked lahmacun (لحم بعجين), pide, rich Turkish breakfast & fresh mezes. 5 min from Taksim Square, Istanbul.",
  keywords: [
    "best kebab taksim",
    "lahmacun taksim",
    "لحم بعجين تقسيم",
    "لحم معجون اسطنبول",
    "en iyi lahmacun beyoğlu",
    "adana kebap taksim",
    "كباب أضنة تقسيم",
    "pide taksim",
    "فطائر بيدا تركية",
    "turkish breakfast taksim",
    "فطور تركي جيهانكير",
    "halal restaurant taksim",
    "مطعم حلال تقسيم",
    "Kardeşler Cihangir menu",
    "Cihangir restaurants",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/menu",
    languages: {
      "x-default": "https://kardeslercihangir.com/menu",
      en: "https://kardeslercihangir.com/menu",
      ar: "https://kardeslercihangir.com/ar/menu",
      tr: "https://kardeslercihangir.com/tr/menu",
      ru: "https://kardeslercihangir.com/ru/menu",
      fa: "https://kardeslercihangir.com/fa/menu",
      fr: "https://kardeslercihangir.com/fr/menu",
      de: "https://kardeslercihangir.com/de/menu",
      it: "https://kardeslercihangir.com/it/menu",
      es: "https://kardeslercihangir.com/es/menu",
      zh: "https://kardeslercihangir.com/zh/menu",
    },
  },
  openGraph: {
    title: "Menu | Kardeşler Cihangir — Kebap, Lahmacun & Pide",
    description:
      "Explore 100+ authentic Turkish dishes: kebabs, stone-baked lahmacun, pide, breakfast and mezes in Cihangir, Taksim.",
    url: "https://kardeslercihangir.com/menu",
    siteName: "Kardeşler Cihangir",
    images: [
      {
        url: "https://kardeslercihangir.com/images/27-Karisik-Kebap_1.webp",
        width: 1200,
        height: 630,
        alt: "Kardeşler Cihangir Menu — Kebap & Lahmacun",
      },
    ],
  },
};

export default function MenuLayout({ children }) {
  const siteUrl = "https://kardeslercihangir.com";

  // Build dynamic Menu Schema with all sections and items
  const menuSections = menuData.map((cat) => {
    const catNameTr = trMenu.categories?.[cat.id] || cat.id;
    const catNameAr = arMenu.categories?.[cat.id] || cat.id;

    return {
      "@type": "MenuSection",
      name: `${catNameTr} / ${catNameAr}`,
      hasMenuItem: (cat.items || []).map((item) => {
        const trItem = trMenu.items?.[item.id] || {};
        const arItem = arMenu.items?.[item.id] || {};
        const itemName = `${trItem.name || item.id} - ${arItem.desc || ""}`;

        return {
          "@type": "MenuItem",
          name: itemName,
          description: `${trItem.name || ""} - ${arItem.desc || ""}. Freshly prepared with traditional Turkish ingredients.`,
          image: [
            item.image ? `${siteUrl}${item.image}` : `${siteUrl}/logo.webp`
          ],
          brand: {
            "@type": "Brand",
            name: "Kardeşler Cihangir"
          },
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/menu#${cat.id}`,
            validFrom: "2024-01-01T00:00:00Z",
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted"
            },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: 0,
                currency: "TRY"
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "d"
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "d"
                }
              }
            }
          },
          suitableForDiet: "https://schema.org/HalalDiet",
        };
      }),
    };
  });

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Kardeşler Cihangir Full Digital Menu",
    url: `${siteUrl}/menu`,
    mainEntityOfPage: `${siteUrl}/menu`,
    inLanguage: ["tr", "ar", "en", "ru", "fa", "fr"],
    hasMenuSection: menuSections,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I eat the best authentic Lahmacun (لحم بعجين) near Taksim Square?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kardeşler Kebap Cihangir serves crispy, stone-oven baked Lahmacun prepared with fresh minced lamb & beef, herbs, and served with sumac onions and fresh lemon. Located at Defterdar Yokuşu No:1/A, Firuzağa Mah., Cihangir, just a 5-minute walk from Taksim Square.",
        },
      },
      {
        "@type": "Question",
        name: "أين أجد أفضل لحم بعجين (لحم معجون) وكباب مشوي في تقسيم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يقدم مطعم كارديشلر جيهانكير (Kardeşler Cihangir) أشهى لحم بعجين مقرمش على الحطب وكباب أضنة ومشاوي تركية أصيلة بلحوم حلال طازجة يومياً منذ عام 1998، على بعد 5 دقائق مشياً من ميدان تقسيم.",
        },
      },
      {
        "@type": "Question",
        name: "What are the signature dishes at Kardeşler Kebap Cihangir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our signature dishes include the Grand Mixed Kebab Feast (Karışık Kebap), Adana Kebab, Wood-Fired Sucuk & Kashar Pide, Crispy Lahmacun, Mardin Kebab, and the traditional 2-person Turkish Breakfast spread.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
