import { devProfileContent } from "@/data/developerProfile";

export const metadata = {
  title: devProfileContent.tr.meta.title,
  description: devProfileContent.tr.meta.description,
  alternates: {
    canonical: "https://www.kardeslercihangir.com/tasarim-gelistirme",
    languages: {
      tr: "https://www.kardeslercihangir.com/tasarim-gelistirme",
      en: "https://www.kardeslercihangir.com/en/design-development",
      ar: "https://www.kardeslercihangir.com/ar/design-development",
      ru: "https://www.kardeslercihangir.com/ru/design-development",
      fa: "https://www.kardeslercihangir.com/fa/design-development",
      fr: "https://www.kardeslercihangir.com/fr/design-development",
      de: "https://www.kardeslercihangir.com/de/design-development",
      it: "https://www.kardeslercihangir.com/it/design-development",
      es: "https://www.kardeslercihangir.com/es/design-development",
      zh: "https://www.kardeslercihangir.com/zh/design-development",
      "x-default": "https://www.kardeslercihangir.com/tasarim-gelistirme",
    },
  },
  openGraph: {
    title: devProfileContent.tr.meta.title,
    description: devProfileContent.tr.meta.description,
    url: "https://www.kardeslercihangir.com/tasarim-gelistirme",
    siteName: "Kardeşler Cihangir",
    locale: "tr_TR",
    type: "profile",
  },
};

export default function TasarimGelistirmeLayout({ children }) {
  return children;
}
