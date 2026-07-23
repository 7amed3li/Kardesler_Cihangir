import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import SmartSplash from "@/components/SmartSplash";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://kardeslercihangir.com"),
  title: "Kardeşler Cihangir | Kebap & Pide — Digital Menu",
  description:
    "Experience authentic Turkish cuisine at Kardeşler Kebap & Pide in Cihangir, Beyoğlu, İstanbul. Explore our digital menu with 100+ dishes — kebabs, pide, lahmacun, mezes and more.",
  keywords: [
    "Kardeşler Cihangir",
    "kebab Istanbul",
    "pide Cihangir",
    "Turkish restaurant",
    "digital menu",
    "Beyoğlu restaurant",
    "Adana kebab",
    "lahmacun",
    "Firuzağa",
  ],
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
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
        url: "/images/hero-bg.png",
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
    images: ["/images/hero-bg.png"],
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

// Restaurant Schema.org JSON-LD
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kardeşler Kebap & Pide",
  alternateName: "Kardeşler Cihangir",
  image: "/images/hero-bg.png",
  url: siteUrl,
  telephone: "+902122432822",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Firuzağa Mah. Firuzağa Camii Sok. No:1A",
    addressLocality: "Cihangir, Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34425",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.03,
    longitude: 28.98,
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
    opens: "10:00",
    closes: "02:00",
  },
  servesCuisine: ["Turkish", "Kebab", "Mediterranean"],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "1200",
    bestRating: "5",
  },
  menu: siteUrl,
  acceptsReservations: "True",
  hasMenu: {
    "@type": "Menu",
    name: "Digital Menu",
    url: siteUrl,
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
      { "@type": "MenuSection", name: "Soğuk İçecek" }
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-cream font-[var(--font-inter)]">
        <AppProvider>
          <SmartSplash />
          <Header />
          <main className="flex-grow w-full max-w-5xl mx-auto flex flex-col relative">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
