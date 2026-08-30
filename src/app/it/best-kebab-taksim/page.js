import React from "react";
import Image from "next/image";
import { Star, MapPin, ShieldCheck, Navigation, Phone } from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "Miglior Kebab vicino a Piazza Taksim (Dal 1998) | Kardeşler Cihangir",
  description: "Scopri la cucina turca autentica nel storico quartiere di Cihangir dal 1998. Carne macinata a mano, pide al forno di pietra e kebab tradizionali — a soli 5 minuti a piedi da Taksim.",
  keywords: ["miglior kebab taksim", "ristorante turco istanbul", "adana kebab istanbul", "halal ristorante beyoglu", "kardesler cihangir 1998"],
  alternates: {
    canonical: "https://kardeslercihangir.com/it/best-kebab-taksim",
    languages: {
      it: "https://kardeslercihangir.com/it/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      de: "https://kardeslercihangir.com/de/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
      es: "https://kardeslercihangir.com/es/best-kebab-taksim",
      zh: "https://kardeslercihangir.com/zh/best-kebab-taksim",
      "x-default": "https://kardeslercihangir.com/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Miglior Kebab Autentico vicino Piazza Taksim — Kardeşler Cihangir (1998)",
    description: "28+ anni di tradizione culinaria — griglia a carbone e forno di pietra a Cihangir, Istanbul.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Dove trovare il miglior kebab vicino a Piazza Taksim?", acceptedAnswer: { "@type": "Answer", text: "Kardeşler Cihangir nel quartiere storico di Cihangir, a soli 5 minuti a piedi da Taksim, offre cucina turca autentica dal 1998." } },
    { "@type": "Question", name: "Kardeşler Cihangir è Halal?", acceptedAnswer: { "@type": "Answer", text: "Sì, utilizziamo esclusivamente carne Halal fresca al 100%, preparata ogni giorno." } },
  ],
};

const phoneCallUrl = "tel:+902122513696";

export default function BestKebabTaksimIt() {
  return (
    <div className="min-h-screen bg-[#0E0804]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.webp" alt="Kebab autentico vicino Taksim — Kardeşler Cihangir" fill style={{ objectFit: "cover" }} className="opacity-35" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/60 via-[#0E0804]/40 to-[#0E0804]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C7A3F]/20 border border-[#9C7A3F]/40 text-[#D4AF6A] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <span>FONDATO NEL 1998 • STORICO CIHANGIR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            Kebab Autentico su <span className="text-[#D4AF6A]">Brace di Quercia</span> vicino a Taksim
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            Da oltre 28 anni: carne macinata a mano con il coltello Zırh, cottura su carbonella di quercia e pide dorate nel forno di pietra a 450°C.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" /><span className="font-bold text-cream">4.6 su 5</span><span className="text-cream-dim/70">(1.280+ recensioni Google)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" /><span>5 min a piedi da Piazza Taksim</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" /><span>Carne Halal Fresca 100% ogni giorno</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-white font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]">
              <Phone size={18} /><span>Chiama il ristorante</span>
            </a>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all">
              <Navigation size={16} className="text-copper" /><span>Indicazioni Google Maps</span>
            </a>
          </div>
        </div>
      </section>
      <section className="border-y border-teal-dim/30 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">1998</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Fondato a Cihangir</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-cream">100%</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Carne Halal Fresca</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1.280+ Recensioni</div></div>
          <div className="p-3"><div className="text-2xl sm:text-3xl font-black text-cream">450°C</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Forno di Pietra</div></div>
        </div>
      </section>
      <SeoStorytelling locale="it" />
      <LandingDishesSection currentLocale="it" />
      <LandingVerifiedReviews currentLocale="it" />
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F2E7] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>Scopri 28 anni di tradizione questa sera</h2>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all">
              <Phone size={18} /><span>Chiama il ristorante</span>
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
