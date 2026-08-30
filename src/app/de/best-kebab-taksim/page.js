import React from "react";
import Image from "next/image";
import { Star, MapPin, ShieldCheck, Navigation, Phone } from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "Bestes Kebab in der Nähe des Taksim-Platzes (Seit 1998) | Kardeşler Cihangir",
  description: "Erleben Sie authentische türkische Küche im historischen Cihangir seit 1998. Handgehacktes Fleisch, Holzofen-Pides und traditionelle Kebabs — nur 5 Gehminuten vom Taksim-Platz.",
  keywords: ["bestes kebab taksim", "türkisches restaurant istanbul", "adana kebab istanbul", "halal restaurant beyoglu", "kardesler cihangir 1998",
    "best kebab in taksim",
    "authentic turkish kebab istanbul",
    "cihangir kebab restaurant",
    "halal meat istanbul",
    "wood fired kebab",
    "adana kebab taksim",
    "urfa kebab istanbul",
    "best lahmacun in istanbul",
    "historical turkish restaurant",
    "family friendly restaurant taksim",
    "where to eat in taksim",
    "top rated kebab istanbul",
    "kebab places near me",
    "traditional turkish food",
    "hand minced kebab",
    "zirh kebab",
    "charcoal grilled kebab",
    "best pide in taksim",
    "turkish pizza istanbul",
    "halal food near taksim square",
    "cheap and best food in taksim",
    "local turkish restaurant",
    "non touristy restaurant istanbul",
    "best iskender kebab",
    "mardin kebab",
    "ali nazik kebab",
    "beyti kebab",
    "kuzu sis",
    "lamb shish kebab istanbul",
    "turkish tea",
    "ayran",
    "baklava after kebab",
    "best rated restaurant cihangir",
    "hidden gem restaurant istanbul",
    "authentic dining istanbul",
    "taksim en iyi kebap",
    "cihangir kebap salonu",
    "istanbul helal et",
    "odun ateşi kebap",
    "adana urfa kebap taksim",
    "istanbul'un en iyi lahmacunu",
    "tarihi kebapçı",
    "aile restoranı taksim",
    "taksim'de ne yenir",
    "geleneksel türk yemekleri",
    "zırh kıyması kebap",
    "közde kebap",
    "taksim en iyi pide",
    "istanbul türk pizzası",
    "taksim meydanı helal yemek",
    "uygun fiyatlı kebap",
    "yerel halkın gittiği kebapçı",
    "turistik olmayan restoran istanbul",
    "iskender kebap nerede yenir",
    "mardin kebabı",
    "ali nazik",
    "beyti",
    "kuzu şiş",
    "istanbul kuzu şiş",
    "en iyi kebap yorumları",
    "أفضل كباب في تقسيم",
    "كباب تركي أصيل إسطنبول",
    "مطعم كباب جيهانكير",
    "لحم حلال إسطنبول",
    "كباب على الفحم",
    "أضنة كباب تقسيم",
    "أورفا كباب",
    "أفضل لحم بعجين في إسطنبول",
    "مطعم تركي تاريخي",
    "مطعم عائلي تقسيم",
    "أين تأكل في تقسيم",
    "أفضل مطاعم الكباب",
    "طعام تركي تقليدي",
    "كباب مفروم باليد",
    "أفضل بيدا في تقسيم",
    "بيتزا تركية",
    "أكل حلال قرب ساحة تقسيم",
    "مطعم محلي إسطنبول",
    "أفضل إسكندر كباب",
    "ماردين كباب",
    "علي نازك",
    "بيتي كباب",
    "شيش كباب لحم ضأن",
],
  alternates: {
    canonical: "https://kardeslercihangir.com/de/best-kebab-taksim",
    languages: {
      de: "https://kardeslercihangir.com/de/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
      it: "https://kardeslercihangir.com/it/best-kebab-taksim",
      es: "https://kardeslercihangir.com/es/best-kebab-taksim",
      zh: "https://kardeslercihangir.com/zh/best-kebab-taksim",
      "x-default": "https://kardeslercihangir.com/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Bestes Authentisches Kebab am Taksim-Platz — Kardeşler Cihangir (1998)",
    description: "28+ Jahre kulinarische Tradition — Holzkohlegrill und Steinofen in Cihangir, Istanbul.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Wo findet man den besten Kebab nahe dem Taksim-Platz?", acceptedAnswer: { "@type": "Answer", text: "Kardeşler Cihangir im historischen Cihangir-Viertel, nur 5 Gehminuten vom Taksim-Platz, bietet seit 1998 authentische türkische Küche." } },
    { "@type": "Question", name: "Ist Kardeşler Cihangir Halal?", acceptedAnswer: { "@type": "Answer", text: "Ja, wir verwenden ausschließlich 100% frisches Halal-Fleisch, täglich frisch zubereitet." } },
  ],
};

const phoneCallUrl = "tel:+902122513696";

export default function BestKebabTaksimDe() {
  return (
    <div className="min-h-screen bg-[#0E0804]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.webp" alt="Authentischer Kebab nahe Taksim — Kardeşler Cihangir" fill style={{ objectFit: "cover" }} className="opacity-35" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/60 via-[#0E0804]/40 to-[#0E0804]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C7A3F]/20 border border-[#9C7A3F]/40 text-[#D4AF6A] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <span>GEGRÜNDET 1998 • HISTORISCHES CIHANGIR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            Authentischer Kebab auf <span className="text-[#D4AF6A]">Eichenglut</span> nahe Taksim
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            Seit über 28 Jahren: frisches, handgehacktes Fleisch, Holzkohlegrill und goldbraune Pides aus dem 450°C-Steinofen im historischen Cihangir.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" /><span className="font-bold text-cream">4.6 von 5</span><span className="text-cream-dim/70">(1.280+ Google-Bewertungen)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" /><span>5 Min. zu Fuß vom Taksim-Platz</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" /><span>100% Frisches Halal-Fleisch täglich</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-white font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]">
              <Phone size={18} /><span>Restaurant anrufen</span>
            </a>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all">
              <Navigation size={16} className="text-copper" /><span>Google Maps Route</span>
            </a>
          </div>
        </div>
      </section>
      <section className="border-y border-teal-dim/30 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">1998</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Gegründet in Cihangir</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-cream">100%</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Frisches Halal-Fleisch</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1.280+ Bewertungen</div></div>
          <div className="p-3"><div className="text-2xl sm:text-3xl font-black text-cream">450°C</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Holz-Steinofen</div></div>
        </div>
      </section>
      <SeoStorytelling locale="de" />
      <LandingDishesSection currentLocale="de" />
      <LandingVerifiedReviews currentLocale="de" />
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F2E7] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>Erleben Sie 28 Jahre Tradition noch heute Abend</h2>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all">
              <Phone size={18} /><span>Restaurant anrufen</span>
            </a>
            <a href="tel:+902122513696" className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-bold text-sm flex items-center justify-center gap-2 transition-all">
              <Phone size={16} className="text-teal" /><span>+90 212 251 36 96</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
