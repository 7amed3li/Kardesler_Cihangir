import BreakfastLandingPage from "@/components/BreakfastLandingPage";
import breakfastTranslations from "@/i18n/breakfastTranslations";
import { RESTAURANT_INFO } from "@/data/breakfastConfig";

const siteUrl = RESTAURANT_INFO.siteUrl;
const slug = "turkish-breakfast-cihangir";
const locale = "ru";
const bt = breakfastTranslations[locale];

const allAlternates = { "x-default": `${siteUrl}/${slug}`, en: `${siteUrl}/${slug}`, ar: `${siteUrl}/ar/${slug}`, tr: `${siteUrl}/tr/${slug}`, ru: `${siteUrl}/ru/${slug}`, fa: `${siteUrl}/fa/${slug}`, fr: `${siteUrl}/fr/${slug}`, de: `${siteUrl}/de/${slug}`, it: `${siteUrl}/it/${slug}`, es: `${siteUrl}/es/${slug}`, zh: `${siteUrl}/zh/${slug}` };

export const metadata = {
  title: bt.metaTitle, description: bt.metaDescription,
  alternates: { canonical: `${siteUrl}/${locale}/${slug}`, languages: allAlternates },
  openGraph: { title: bt.metaTitle, description: bt.metaDescription, url: `${siteUrl}/${locale}/${slug}`, siteName: RESTAURANT_INFO.name, locale: "ru_RU", type: "website", images: [{ url: `${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`, width: 1024, height: 677, alt: bt.heroImageAlt }] },
  twitter: { card: "summary_large_image", title: bt.metaTitle, description: bt.metaDescription, images: [`${siteUrl}/images/Serpme-Kahvalti-2-Kisilik.webp`] },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: bt.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };


export default function RussianBreakfastPage() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><BreakfastLandingPage locale={locale} /></>);
}
