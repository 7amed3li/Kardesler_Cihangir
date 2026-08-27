import React from "react";
import Image from "next/image";
import { Star, MapPin, ShieldCheck, Navigation, Phone } from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "El Mejor Kebab cerca de la Plaza Taksim (Desde 1998) | Kardeşler Cihangir",
  description: "Descubra la auténtica cocina turca en el histórico Cihangir desde 1998. Carne picada a mano, pides al horno de piedra y kebabs tradicionales — a solo 5 minutos caminando de Taksim.",
  keywords: ["mejor kebab taksim", "restaurante turco istanbul", "adana kebab istanbul", "restaurante halal beyoglu", "kardesler cihangir 1998"],
  alternates: {
    canonical: "https://kardeslercihangir.com/es/best-kebab-taksim",
    languages: {
      es: "https://kardeslercihangir.com/es/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      de: "https://kardeslercihangir.com/de/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
      it: "https://kardeslercihangir.com/it/best-kebab-taksim",
      zh: "https://kardeslercihangir.com/zh/best-kebab-taksim",
      "x-default": "https://kardeslercihangir.com/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "El Mejor Kebab Auténtico cerca de Taksim — Kardeşler Cihangir (1998)",
    description: "Más de 28 años de tradición culinaria — parrilla de carbón y horno de piedra en Cihangir, Estambul.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Dónde encontrar el mejor kebab cerca de la Plaza Taksim?", acceptedAnswer: { "@type": "Answer", text: "Kardeşler Cihangir en el histórico barrio de Cihangir, a solo 5 minutos a pie de Taksim, ofrece cocina turca auténtica desde 1998." } },
    { "@type": "Question", name: "¿Es Kardeşler Cihangir Halal?", acceptedAnswer: { "@type": "Answer", text: "Sí, utilizamos exclusivamente carne Halal fresca al 100%, preparada cada día." } },
  ],
};

const phoneCallUrl = "tel:+902122513696";

export default function BestKebabTaksimEs() {
  return (
    <div className="min-h-screen bg-[#0E0804]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.webp" alt="Kebab auténtico cerca de Taksim — Kardeşler Cihangir" fill style={{ objectFit: "cover" }} className="opacity-35" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/60 via-[#0E0804]/40 to-[#0E0804]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C7A3F]/20 border border-[#9C7A3F]/40 text-[#D4AF6A] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <span>FUNDADO EN 1998 • HISTÓRICO CIHANGIR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            Kebab Auténtico en <span className="text-[#D4AF6A]">Brasa de Roble</span> cerca de Taksim
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            Más de 28 años: carne fresca picada a mano con el cuchillo Zırh, parrilla de carbón de roble y pides doradas en el horno de piedra a 450°C.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" /><span className="font-bold text-cream">4.6 sobre 5</span><span className="text-cream-dim/70">(1.280+ reseñas Google)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" /><span>5 min a pie de la Plaza Taksim</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" /><span>Carne Halal Fresca 100% diaria</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-white font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]">
              <Phone size={18} /><span>Llamar para Reservar / Pedir</span>
            </a>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all">
              <Navigation size={16} className="text-copper" /><span>Indicaciones Google Maps</span>
            </a>
          </div>
        </div>
      </section>
      <section className="border-y border-teal-dim/30 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">1998</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Fundado en Cihangir</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-cream">100%</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Carne Halal Fresca</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1.280+ Reseñas</div></div>
          <div className="p-3"><div className="text-2xl sm:text-3xl font-black text-cream">450°C</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Horno de Piedra</div></div>
        </div>
      </section>
      <SeoStorytelling locale="es" />
      <LandingDishesSection currentLocale="es" />
      <LandingVerifiedReviews currentLocale="es" />
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F2E7] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>Experimente 28 años de tradición esta noche</h2>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all">
              <Phone size={18} /><span>Llamar para Reservar / Pedir</span>
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
