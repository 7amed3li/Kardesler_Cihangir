import { Cairo, Inter, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import SmartSplash from "@/components/SmartSplash";
import OrderFlowWrapper from "@/components/OrderFlowWrapper";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL("https://kardeslercihangir.com"),
  title: "Kardeşler Cihangir | Kebap & Pide — Geleneksel Türk Mutfağı",
  description:
    "Authentic Turkish cuisine in the heart of Cihangir, 5 min from Taksim Square. 100+ dishes — Adana kebab, pide, lahmacun, mezes & more. Open daily 09:00-02:00.",
  keywords: [
    "Kardeşler Cihangir",
    "kebab Istanbul",
    "pide Cihangir",
    "Turkish restaurant",
    "best kebab taksim",
    "Beyoğlu restaurant",
    "Adana kebab",
    "lahmacun",
    "Firuzağa",
    "halal restaurant istanbul",
    "أفضل كباب تقسيم",
    "лучший кебаб Таксим",
  ],
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  authors: [{ name: "Kardeşler Kebap Cihangir" }],
  creator: "Hamed Mohamed",
  openGraph: {
    title: "Kardeşler Cihangir | Kebap & Pide",
    description:
      "Authentic Turkish cuisine in the heart of Cihangir. 100+ dishes including kebabs, pide, and traditional mezes.",
    url: "https://kardeslercihangir.com",
    siteName: "Kardeşler Cihangir",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "Kardeşler Kebap & Pide — Turkish Restaurant in Cihangir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kardeşler Cihangir | Kebap & Pide",
    description:
      "Authentic Turkish cuisine in the heart of Cihangir. Explore our digital menu.",
    images: ["/images/hero-bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#181009",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

// Dynamic URL for Schema
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kardeslercihangir.com";

// Comprehensive Schema.org JSON-LD Graph (Restaurant + WebSite + Person Creator + ImageGallery)
const globalSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${siteUrl}/#restaurant`,
      name: "Kardeşler Kebap & Cafe Cihangir",
      alternateName: ["Kardeşler Cihangir", "Kardesler Cihangir", "كاردشلر جيهانغير"],
      description: "Authentic Turkish kebab, pide & lahmacun restaurant in Cihangir, 5 minutes from Taksim Square. Serving traditional wood-fired cuisine since 1998.",
      url: siteUrl,
      telephone: "+902122513696",
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/logo.webp`,
        contentUrl: `${siteUrl}/logo.webp`,
        caption: "Kardeşler Kebap & Cafe Cihangir — Restaurant Logo",
        width: 512,
        height: 512,
      },
      image: [
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero-bg.webp`,
          caption: "Kardeşler Cihangir — Traditional Turkish Kebab & Pide Restaurant",
          width: 1200,
          height: 630,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/adana.webp`,
          caption: "Adana Kebab — Charcoal-grilled spiced lamb kebab at Kardeşler Cihangir",
          width: 1024,
          height: 677,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/kahvalti.webp`,
          caption: "Traditional Turkish Breakfast at Kardeşler Cihangir",
          width: 1024,
          height: 677,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/lahmacun.webp`,
          caption: "Wood-fired Lahmacun — Thin crispy Turkish pizza at Kardeşler Cihangir",
          width: 1024,
          height: 691,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/kasarli_pide.webp`,
          caption: "Kaşarlı Pide — Cheese-filled Turkish pide baked in stone oven",
          width: 1024,
          height: 425,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/27-Karisik-Kebap_1.webp`,
          caption: "Karışık Kebap — Mixed grill platter with lamb, chicken & Adana kebab",
          width: 1024,
          height: 677,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/kunefe.webp`,
          caption: "Künefe — Traditional hot cheese dessert with syrup",
          width: 1024,
          height: 677,
        },
        {
          "@type": "ImageObject",
          url: `${siteUrl}/images/21-Ali-Nazik-Kebap.webp`,
          caption: "Ali Nazik Kebab — Smoky eggplant purée topped with tender lamb",
          width: 1024,
          height: 677,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Defterdar Yokuşu No:1/A, Firuzağa Mah.",
        addressLocality: "Cihangir, Beyoğlu",
        addressRegion: "İstanbul",
        postalCode: "34425",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.0310944,
        longitude: 28.9824818,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "02:00",
      },
      servesCuisine: ["Turkish", "Kebab", "Mediterranean", "Pide", "Lahmacun"],
      priceRange: "₺₺",
      menu: `${siteUrl}/menu`,
      acceptsReservations: "True",
      currenciesAccepted: "TRY",
      paymentAccepted: "Cash, Credit Card",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "1200",
        bestRating: "5",
        worstRating: "1",
      },
      hasMenu: {
        "@type": "Menu",
        name: "Kardeşler Cihangir Menu",
        url: `${siteUrl}/menu`,
        hasMenuSection: [
          { "@type": "MenuSection", name: "Kahvaltı" },
          { "@type": "MenuSection", name: "Kebap" },
          { "@type": "MenuSection", name: "Özel Menü" },
          { "@type": "MenuSection", name: "Mezeli Kebaplar" },
          { "@type": "MenuSection", name: "Dürümler" },
          { "@type": "MenuSection", name: "Pide" },
          { "@type": "MenuSection", name: "Lahmacun" },
          { "@type": "MenuSection", name: "Meze" },
          { "@type": "MenuSection", name: "Salata" },
          { "@type": "MenuSection", name: "Tatlı" },
          { "@type": "MenuSection", name: "Soğuk İçecek" },
        ],
      },
      sameAs: [
        "https://www.instagram.com/kardeslerkebapcihangir/",
        "https://www.google.com/maps/place/Karde%C5%9Fler+Kebap+Cihangir/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Kardeşler Cihangir",
      publisher: {
        "@id": `${siteUrl}/#restaurant`,
      },
      creator: {
        "@type": "Person",
        "@id": `${siteUrl}/tasarim-gelistirme#hamed-mohamed`,
        name: "Hamed Mohamed",
        jobTitle: "Web Designer & Developer",
        url: "https://www.hamedmohamed.dev/",
        sameAs: ["https://www.hamedmohamed.dev/"],
      },
    },
    {
      "@type": "ImageGallery",
      "@id": `${siteUrl}/#gallery`,
      name: "Kardeşler Cihangir — Photo Gallery",
      url: `${siteUrl}/menu`,
      about: { "@id": `${siteUrl}/#restaurant` },
      image: [
        `${siteUrl}/images/hero-bg.webp`,
        `${siteUrl}/images/adana.webp`,
        `${siteUrl}/images/kahvalti.webp`,
        `${siteUrl}/images/lahmacun.webp`,
        `${siteUrl}/images/kasarli_pide.webp`,
        `${siteUrl}/images/27-Karisik-Kebap_1.webp`,
        `${siteUrl}/images/kunefe.webp`,
        `${siteUrl}/images/21-Ali-Nazik-Kebap.webp`,
        `${siteUrl}/images/18-Iskender-Kebap.webp`,
        `${siteUrl}/images/beyti-1024x677.webp`,
        `${siteUrl}/images/mezeli_adana.webp`,
        `${siteUrl}/images/24-Kuzu-Pirzola.webp`,
      ],
    },
  ],
};

import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`h-full antialiased ${cairo.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchemaGraph),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-cream font-[var(--font-inter)]" suppressHydrationWarning>
        <AppProvider>
          <SmartSplash />
          <Analytics />
          <Header />
          <main className="flex-grow w-full max-w-5xl mx-auto flex flex-col relative">
            {children}
          </main>
          <Footer />
          <OrderFlowWrapper />
        </AppProvider>
      </body>
    </html>
  );
}
