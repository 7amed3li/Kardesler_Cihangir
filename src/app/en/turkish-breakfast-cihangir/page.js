import BreakfastLandingPage from "@/components/BreakfastLandingPage";
import { RESTAURANT_INFO, BREAKFAST_HOURS } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;
const slug = "turkish-breakfast-cihangir";

// ─── All 10 language alternates + x-default ───
const allAlternates = {
  "x-default": `${siteUrl}/${slug}`,
  en: `${siteUrl}/${slug}`,
  ar: `${siteUrl}/ar/${slug}`,
  tr: `${siteUrl}/tr/${slug}`,
  ru: `${siteUrl}/ru/${slug}`,
  fa: `${siteUrl}/fa/${slug}`,
  fr: `${siteUrl}/fr/${slug}`,
  de: `${siteUrl}/de/${slug}`,
  it: `${siteUrl}/it/${slug}`,
  es: `${siteUrl}/es/${slug}`,
  zh: `${siteUrl}/zh/${slug}`,
};

export const metadata = {
  title: "Authentic Turkish Breakfast in Cihangir Near Taksim | Kardeşler Kebap & Breakfast",
  description:
    "Traditional Turkish breakfast and Serpme Kahvaltı served daily in Cihangir, a short walk from Taksim. Walk-ins welcome, no reservation needed. Breakfast 09:00–13:00.",
  keywords: [
    "turkish breakfast cihangir",
    "serpme kahvalti istanbul",
    "breakfast near taksim",
    "turkish breakfast istanbul",
    "cihangir kahvalti",
    "best breakfast beyoglu",
    "menemen istanbul",
    "traditional turkish breakfast",
    "kahvalti taksim",
    "breakfast cihangir istanbul",
      "best turkish breakfast in taksim",
    "serpme kahvalti istanbul",
    "traditional turkish breakfast",
    "cihangir breakfast places",
    "best brunch in istanbul",
    "authentic kahvalti",
    "turkish tea and simit",
    "menemen taksim",
    "sucuklu yumurta",
    "kaymak and honey",
    "family breakfast istanbul",
    "top rated breakfast taksim",
    "local breakfast spot cihangir",
    "unlimited turkish tea",
    "organic breakfast istanbul",
    "halal breakfast taksim",
    "cheap turkish breakfast",
    "best view breakfast",
    "historical breakfast place",
    "taksim en iyi kahvaltı",
    "istanbul serpme kahvaltı",
    "geleneksel türk kahvaltısı",
    "cihangir kahvaltıcılar",
    "istanbul'da en iyi brunch",
    "otantik kahvaltı",
    "çay ve simit",
    "taksim menemen",
    "sucuklu yumurta nerede yenir",
    "bal kaymak",
    "aile kahvaltısı istanbul",
    "en çok oy alan kahvaltı",
    "yerel kahvaltıcı cihazgir",
    "sınırsız çay",
    "organik kahvaltı istanbul",
    "helal kahvaltı taksim",
    "uygun fiyatlı serpme kahvaltı",
    "أفضل فطور تركي في تقسيم",
    "فطور تركي تقليدي",
    "أماكن فطور في جيهانكير",
    "أفضل برانش في إسطنبول",
    "فطور أصيل",
    "شاي تركي وسميت",
    "منمن تقسيم",
    "بيض بالسجق",
    "قشطة وعسل",
    "فطور عائلي إسطنبول",
    "أفضل فطور مقيم",
    "مكان فطور محلي",
    "شاي تركي غير محدود",
    "فطور عضوي إسطنبول",
    "فطور حلال تقسيم",
    "فطور تركي رخيص",
],
  alternates: {
    canonical: `${siteUrl}/en/${slug}`,
    languages: allAlternates,
  },
  openGraph: {
    title: "Authentic Turkish Breakfast in Cihangir Near Taksim — Kardeşler Kebap & Breakfast Cihangir - Istanbul",
    description:
      "Traditional Serpme Kahvaltı with artisan cheeses, olives, honey, eggs & simit. Served daily in Cihangir, near Taksim. Walk-ins welcome.",
    url: `${siteUrl}/en/${slug}`,
    siteName: "Kardeşler Kebap & Breakfast Cihangir - Istanbul",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`,
        width: 1024,
        height: 677,
        alt: "Traditional Turkish breakfast spread at Kardeşler Cihangir Istanbul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentic Turkish Breakfast in Cihangir — Kardeşler",
    description:
      "Traditional Serpme Kahvaltı with cheese, olives, honey, eggs. Near Taksim Square.",
    images: [`${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`],
  },
};

// ─── FAQ Schema ───
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a reservation for breakfast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No reservation is needed. Walk-ins are welcome anytime. We have plenty of space in our quiet restaurant.",
      },
    },
    {
      "@type": "Question",
      name: "What is Serpme Kahvaltı and how many people is it for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Serpme Kahvaltı is a traditional Turkish breakfast spread with over 15 items including cheeses, olives, honey, clotted cream, eggs, jam varieties, simit, and more. Our Serpme is served for 2 people.",
      },
    },
    {
      "@type": "Question",
      name: "What time is breakfast served?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Breakfast is served daily from ${BREAKFAST_HOURS.opens} to ${BREAKFAST_HOURS.closes}. The full menu is available from 09:00 to 02:00.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there vegetarian breakfast options?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Menemen, Omlet, and Sahanda Yumurta are vegetarian. Our Serpme Kahvaltı also includes many vegetarian items.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get to the restaurant from Taksim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are in Cihangir, Beyoğlu. Head down Sıraselviler Avenue from Taksim Square and find us on Defterdar Yokuşu, approximately a 10-minute walk. Use the Get Directions button for Google Maps navigation.",
      },
    },
  ],
};

// ─── Restaurant JSON-LD (real data only) ───


export default function TurkishBreakfastCihangirPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <BreakfastLandingPage locale="en" />
    </>
  );
}
