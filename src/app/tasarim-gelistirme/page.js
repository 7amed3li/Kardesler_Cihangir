import React from "react";
import DeveloperProfile from "@/components/DeveloperProfile";
import { devProfileContent } from "@/data/developerProfile";

export const metadata = {
  title: devProfileContent.tr.meta.title,
  description: devProfileContent.tr.meta.description,
  alternates: {
    canonical: "https://kardeslercihangir.com/tasarim-gelistirme",
    languages: {
      tr: "https://kardeslercihangir.com/tasarim-gelistirme",
      en: "https://kardeslercihangir.com/en/design-development",
    },
  },
  openGraph: {
    title: devProfileContent.tr.meta.title,
    description: devProfileContent.tr.meta.description,
    url: "https://kardeslercihangir.com/tasarim-gelistirme",
    siteName: "Kardeşler Cihangir",
    locale: "tr_TR",
    type: "profile",
  },
};

export default function TasarimGelistirmePage() {
  const content = devProfileContent.tr;

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
              "name": "Hamed Mohamed",
              "jobTitle": "Web Designer & Developer",
              "url": "https://hamedmohamed.dev/"
            }
          })
        }}
      />
      <DeveloperProfile content={content} isRTL={false} lang="tr" />
    </>
  );
}
