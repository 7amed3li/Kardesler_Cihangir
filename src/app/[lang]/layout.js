export async function generateMetadata({ params }) {
  const { lang } = await params;
  const baseUrl = "https://www.kardeslercihangir.com";
  
  // Set accurate locales based on URL param
  const localeMap = {
    tr: 'tr_TR',
    en: 'en_US',
    ar: 'ar_SA',
    ru: 'ru_RU',
    fa: 'fa_IR',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    es: 'es_ES',
    zh: 'zh_CN'
  };
  
  const currentLocale = localeMap[lang] || 'tr_TR';
  const url = `${baseUrl}/${lang}`;

  return {
    alternates: {
      canonical: url,
      languages: {
        "x-default": baseUrl,
        tr: `${baseUrl}/tr`,
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        ru: `${baseUrl}/ru`,
        fa: `${baseUrl}/fa`,
        fr: `${baseUrl}/fr`,
        de: `${baseUrl}/de`,
        it: `${baseUrl}/it`,
        es: `${baseUrl}/es`,
        zh: `${baseUrl}/zh`,
      },
    },
    openGraph: {
      url: url,
      locale: currentLocale,
    },
  };
}

export default function LangLayout({ children }) {
  return children;
}
