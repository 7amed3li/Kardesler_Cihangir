export default function robots() {
  const siteUrl = "https://kardeslercihangir.com";

  // All public pages that should be crawled and indexed
  const publicPages = [
    "/",
    "/menu",
    "/about",
    "/contact",
    "/tasarim-gelistirme",
    "/en/design-development",
    "/best-kebab-taksim",
    "/en/best-kebab-taksim",
    "/ar/best-kebab-taksim",
    "/tr/best-kebab-taksim",
    "/ru/best-kebab-taksim",
    "/fa/best-kebab-taksim",
    "/fr/best-kebab-taksim",
    "/turkish-breakfast-cihangir",
    "/ar/turkish-breakfast-cihangir",
    "/tr/turkish-breakfast-cihangir",
    "/ru/turkish-breakfast-cihangir",
    "/fa/turkish-breakfast-cihangir",
    "/fr/turkish-breakfast-cihangir",
    "/de/turkish-breakfast-cihangir",
    "/it/turkish-breakfast-cihangir",
    "/es/turkish-breakfast-cihangir",
    "/zh/turkish-breakfast-cihangir",
    "/images/",
    "/logo.webp",
    "/sitemap.xml",
    "/manifest.webmanifest",
  ];

  const blockedPages = [
    "/wp-admin/",
    "/wp-includes/",
    "/wp-content/",
    "/xmlrpc.php",
    "/feed/",
    "/author/",
    "/tag/",
    "/api/",
  ];

  return {
    rules: [
      // ── Default rule for all crawlers ──
      {
        userAgent: "*",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── Google Search (primary) ──
      {
        userAgent: "Googlebot",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── Google Images ──
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/logo.webp"],
      },

      // ── Google AI (Gemini / AI Overviews) ──
      {
        userAgent: "Google-Extended",
        allow: publicPages,
      },

      // ── Bing Search & Copilot ──
      {
        userAgent: "Bingbot",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── Yandex (largest Russian search engine — key audience) ──
      {
        userAgent: "Yandex",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── ChatGPT / OpenAI ──
      {
        userAgent: "ChatGPT-User",
        allow: publicPages,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: publicPages,
      },
      {
        userAgent: "GPTBot",
        allow: publicPages,
      },

      // ── Perplexity AI ──
      {
        userAgent: "PerplexityBot",
        allow: publicPages,
      },

      // ── Apple Search (Siri / Spotlight) ──
      {
        userAgent: "Applebot",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── DuckDuckGo ──
      {
        userAgent: "DuckDuckBot",
        allow: publicPages,
        disallow: blockedPages,
      },

      // ── Facebook / Meta ──
      {
        userAgent: "facebookexternalhit",
        allow: publicPages,
      },

      // ── Twitter / X ──
      {
        userAgent: "Twitterbot",
        allow: publicPages,
      },

      // ── LinkedIn ──
      {
        userAgent: "LinkedInBot",
        allow: publicPages,
      },

      // ── Block known malicious / spam bots ──
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
