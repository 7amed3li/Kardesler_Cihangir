import React from "react";
import DeveloperProfile from "@/components/DeveloperProfile";
import { devProfileContent } from "@/data/developerProfile";

export async function generateStaticParams() {
  return ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"].map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = devProfileContent[lang] || devProfileContent.en;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kardeslercihangir.com";

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: lang === "tr" ? `${siteUrl}/tasarim-gelistirme` : `${siteUrl}/${lang}/design-development`,
      languages: {
        tr: `${siteUrl}/tasarim-gelistirme`,
        en: `${siteUrl}/en/design-development`,
        ar: `${siteUrl}/ar/design-development`,
        ru: `${siteUrl}/ru/design-development`,
        fa: `${siteUrl}/fa/design-development`,
        fr: `${siteUrl}/fr/design-development`,
        de: `${siteUrl}/de/design-development`,
        it: `${siteUrl}/it/design-development`,
        es: `${siteUrl}/es/design-development`,
        zh: `${siteUrl}/zh/design-development`,
        "x-default": `${siteUrl}/tasarim-gelistirme`,
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `${siteUrl}/${lang}/design-development`,
      siteName: "Kardeşler Cihangir",
      locale: lang,
      type: "profile",
    },
  };
}

export default async function TasarimGelistirmeLangPage({ params }) {
  const { lang } = await params;
  const content = devProfileContent[lang] || devProfileContent.en;
  const isRTL = lang === "ar" || lang === "fa";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": content.meta.title,
            "description": content.meta.description,
            "mainEntity": {
              "@type": "Person",
              "name": content.hero?.name || "Hamed Mohamed",
              "jobTitle": content.hero?.role || "Web Designer & Developer",
              "url": "https://hamedmohamed.dev/"
            }
          })
        }}
      />
      <DeveloperProfile content={content} isRTL={isRTL} lang={lang} />
    </>
  );
}
