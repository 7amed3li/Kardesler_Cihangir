export default function robots() {
  const siteUrl = "https://www.kardeslercihangir.com";

  // Paths explicitly blocked from crawling
  const blockedPages = [
    "/wp-admin/",
    "/wp-includes/",
    "/wp-content/",
    "/xmlrpc.php",
    "/feed/",
    "/author/",
    "/tag/",
    "/api/",
    "/*?*add-to-cart*",
    "/*?*wc-ajax*",
    "/admin/",
  ];

  return {
    rules: [
      // ── Default rule for all crawlers ──
      {
        userAgent: "*",
        allow: ["/"],
        disallow: blockedPages,
      },

      // ── Google Search (primary) ──
      {
        userAgent: "Googlebot",
        allow: ["/"],
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
        allow: ["/"],
      },

      // ── Bing Search & Copilot ──
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: blockedPages,
      },

      // ── Yandex (largest Russian search engine — key audience) ──
      {
        userAgent: "Yandex",
        allow: ["/"],
        disallow: blockedPages,
      },

      // ── ChatGPT / OpenAI ──
      {
        userAgent: "ChatGPT-User",
        allow: ["/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
      },

      // ── Perplexity AI ──
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
      },

      // ── Apple Search (Siri / Spotlight) ──
      {
        userAgent: "Applebot",
        allow: ["/"],
        disallow: blockedPages,
      },

      // ── DuckDuckGo ──
      {
        userAgent: "DuckDuckBot",
        allow: ["/"],
        disallow: blockedPages,
      },

      // ── Facebook / Meta ──
      {
        userAgent: "facebookexternalhit",
        allow: ["/"],
      },

      // ── Twitter / X ──
      {
        userAgent: "Twitterbot",
        allow: ["/"],
      },

      // ── LinkedIn ──
      {
        userAgent: "LinkedInBot",
        allow: ["/"],
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
