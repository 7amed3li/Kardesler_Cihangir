import BreakfastLandingPage from "@/components/BreakfastLandingPage";
import breakfastTranslations from "@/i18n/breakfastTranslations";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;
const slug = "turkish-breakfast-cihangir";
const locale = "zh";
const bt = breakfastTranslations[locale];

const allAlternates = { "x-default": `${siteUrl}/${slug}`, en: `${siteUrl}/${slug}`, ar: `${siteUrl}/ar/${slug}`, tr: `${siteUrl}/tr/${slug}`, ru: `${siteUrl}/ru/${slug}`, fa: `${siteUrl}/fa/${slug}`, fr: `${siteUrl}/fr/${slug}`, de: `${siteUrl}/de/${slug}`, it: `${siteUrl}/it/${slug}`, es: `${siteUrl}/es/${slug}`, zh: `${siteUrl}/zh/${slug}` };

export const metadata = {
  title: bt.metaTitle, description: bt.metaDescription,
  alternates: { canonical: `${siteUrl}/${locale}/${slug}`, languages: allAlternates },
  openGraph: { title: bt.metaTitle, description: bt.metaDescription, url: `${siteUrl}/${locale}/${slug}`, siteName: RESTAURANT_INFO.name, locale: "zh_CN", type: "website", images: [{ url: `${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`, width: 1024, height: 677, alt: bt.heroImageAlt }] },
  twitter: { card: "summary_large_image", title: bt.metaTitle, description: bt.metaDescription, images: [`${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`] },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: bt.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const restaurantSchema = { "@context": "https://schema.org", "@type": "Restaurant", name: RESTAURANT_INFO.name, description: bt.heroDescription, url: siteUrl, telephone: RESTAURANT_INFO.phone, image: `${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`, servesCuisine: ["Turkish", "Breakfast", "Kebab"], priceRange: "₺₺", address: { "@type": "PostalAddress", streetAddress: RESTAURANT_INFO.address.street, addressLocality: RESTAURANT_INFO.address.locality, addressRegion: RESTAURANT_INFO.address.region, postalCode: RESTAURANT_INFO.address.postalCode, addressCountry: RESTAURANT_INFO.address.country }, geo: { "@type": "GeoCoordinates", latitude: RESTAURANT_INFO.coordinates.latitude, longitude: RESTAURANT_INFO.coordinates.longitude }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: RESTAURANT_INFO.generalHours.opens, closes: RESTAURANT_INFO.generalHours.closes }], menu: `${siteUrl}/menu`, acceptsReservations: "True", sameAs: [RESTAURANT_INFO.instagram] };

export default function ChineseBreakfastPage() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} /><BreakfastLandingPage locale={locale} /></>);
}
