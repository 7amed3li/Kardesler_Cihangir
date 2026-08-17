export default function sitemap() {
  const baseUrl = 'https://kardeslercihangir.com';
  const currentDate = new Date();

  const landingAlternates = {
    en: `${baseUrl}/best-kebab-taksim`,
    ar: `${baseUrl}/ar/best-kebab-taksim`,
    tr: `${baseUrl}/tr/best-kebab-taksim`,
    ru: `${baseUrl}/ru/best-kebab-taksim`,
    fa: `${baseUrl}/fa/best-kebab-taksim`,
    fr: `${baseUrl}/fr/best-kebab-taksim`,
  };

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          tr: `${baseUrl}/`,
          en: `${baseUrl}/`,
          ar: `${baseUrl}/`,
          ru: `${baseUrl}/`,
          fa: `${baseUrl}/`,
          fr: `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/en/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/ar/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/tr/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/ru/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/fa/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    {
      url: `${baseUrl}/fr/best-kebab-taksim`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: landingAlternates },
    },
    // ── Turkish Breakfast Landing Pages ──
    ...(() => {
      const bfSlug = 'turkish-breakfast-cihangir';
      const bfAlternates = {
        en: `${baseUrl}/${bfSlug}`,
        ar: `${baseUrl}/ar/${bfSlug}`,
        tr: `${baseUrl}/tr/${bfSlug}`,
        ru: `${baseUrl}/ru/${bfSlug}`,
        fa: `${baseUrl}/fa/${bfSlug}`,
        fr: `${baseUrl}/fr/${bfSlug}`,
        de: `${baseUrl}/de/${bfSlug}`,
        it: `${baseUrl}/it/${bfSlug}`,
        es: `${baseUrl}/es/${bfSlug}`,
        zh: `${baseUrl}/zh/${bfSlug}`,
      };
      const bfPages = [
        { url: `${baseUrl}/${bfSlug}`, priority: 0.9 },
        { url: `${baseUrl}/ar/${bfSlug}`, priority: 0.9 },
        { url: `${baseUrl}/tr/${bfSlug}`, priority: 0.9 },
        { url: `${baseUrl}/ru/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/fa/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/fr/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/de/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/it/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/es/${bfSlug}`, priority: 0.85 },
        { url: `${baseUrl}/zh/${bfSlug}`, priority: 0.85 },
      ];
      return bfPages.map(p => ({
        url: p.url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: p.priority,
        alternates: { languages: bfAlternates },
      }));
    })(),
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tasarim-gelistirme`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${baseUrl}/tasarim-gelistirme`,
          en: `${baseUrl}/en/design-development`,
        },
      },
    },
    {
      url: `${baseUrl}/en/design-development`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${baseUrl}/tasarim-gelistirme`,
          en: `${baseUrl}/en/design-development`,
        },
      },
    }
  ];
}
