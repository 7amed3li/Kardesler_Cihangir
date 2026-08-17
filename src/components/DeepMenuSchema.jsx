"use client";

import React from 'react';
import { menuData } from "@/data/menuData";
import { menuTranslations } from "@/i18n/translations";

export default function DeepMenuSchema({ locale = "en" }) {
  const mt = menuTranslations[locale] || menuTranslations.en;
  
  const baseUrl = "https://kardeslercihangir.com";
  // The locale-specific menu path
  const localePath = locale === "en" ? "/menu" : `/${locale}/menu`;
  const menuUrl = `${baseUrl}${localePath}`;

  // Build the hasMenuSection array
  const hasMenuSection = menuData.map(category => {
    // Translate category name
    const categoryName = mt.categories?.[category.id] || category.category[locale] || category.category.en;

    // Build the hasMenuItem array for this category
    const hasMenuItem = category.items.map(item => {
      const itemName = mt.items?.[item.id]?.name || item.name?.en || item.id;
      const itemDesc = mt.items?.[item.id]?.desc || item.description?.en || "";
      
      const menuItem = {
        "@type": "MenuItem",
        "name": itemName,
        "description": itemDesc,
        "url": `${menuUrl}#${item.id}`,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "TRY",
          "availability": "https://schema.org/InStock"
        }
      };

      if (item.image) {
        // ensure image url is absolute
        const imageUrl = item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`;
        menuItem.image = imageUrl;
      }

      // Add suitableForDiet if applicable
      if (item.tags) {
        const diets = [];
        if (item.tags.includes("vegetarian")) diets.push("https://schema.org/VegetarianDiet");
        if (item.tags.includes("vegan")) diets.push("https://schema.org/VeganDiet");
        if (diets.length > 0) {
          menuItem.suitableForDiet = diets;
        }
      }

      return menuItem;
    });

    return {
      "@type": "MenuSection",
      "name": categoryName,
      "hasMenuItem": hasMenuItem
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Kardeşler Kebap Cihangir",
    "image": `${baseUrl}/logo.webp`,
    "url": baseUrl,
    "telephone": "+902122441998",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Defterdar Yokuşu No:1/A, Firuzağa Mah.",
      "addressLocality": "Cihangir, Beyoğlu",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0317, 
      "longitude": 28.9840
    },
    "servesCuisine": ["Turkish", "Kebabs", "Breakfast", "Lahmacun"],
    "foundingDate": "1998",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "23:59"
      },
      {
        "@type": "OpeningHoursSpecification",
        "description": "Breakfast Hours",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "hasMenu": {
      "@type": "Menu",
      "name": `Kardeşler Kebap & Breakfast - Menu (${locale.toUpperCase()})`,
      "url": menuUrl,
      "mainEntityOfPage": menuUrl,
      "hasMenuSection": hasMenuSection
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
