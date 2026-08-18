import React from "react";
import DeveloperProfile from "@/components/DeveloperProfile";
import { devProfileContent } from "@/data/developerProfile";

export async function generateMetadata({ params }) {
  const { lang } = params;
  const content = devProfileContent[lang] || devProfileContent.en;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kardeslercihangir.com";

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/design-development`,
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

export default function DesignDevelopmentDynamicPage({ params }) {
  const { lang } = params;
  const content = devProfileContent[lang] || devProfileContent.en;
  const isRTL = lang === "ar" || lang === "fa";

  return (
    <>
      {/* Schema.org ProfilePage */}
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
              "name": "Hamed Mohamed",
              "jobTitle": "Web Designer & Developer",
              "url": "https://hamedmohamed.dev/"
            }
          })
        }}
      />
      <DeveloperProfile content={content} isRTL={isRTL} lang={lang} />
    </>
  );
}
