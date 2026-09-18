import { devProfileContent } from "@/data/developerProfile";

export const metadata = {
  title: devProfileContent.tr.meta.title,
  description: devProfileContent.tr.meta.description,
  alternates: {
    canonical: "https://kardeslercihangir.com/tasarim-gelistirme",
    languages: {
      tr: "https://kardeslercihangir.com/tasarim-gelistirme",
      en: "https://kardeslercihangir.com/en/design-development",
      ar: "https://kardeslercihangir.com/ar/design-development",
      ru: "https://kardeslercihangir.com/ru/design-development",
      fa: "https://kardeslercihangir.com/fa/design-development",
      fr: "https://kardeslercihangir.com/fr/design-development",
      de: "https://kardeslercihangir.com/de/design-development",
      it: "https://kardeslercihangir.com/it/design-development",
      es: "https://kardeslercihangir.com/es/design-development",
      zh: "https://kardeslercihangir.com/zh/design-development",
      "x-default": "https://kardeslercihangir.com/tasarim-gelistirme",
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

export default function TasarimGelistirmeLayout({ children }) {
  return children;
}
