import React from "react";
import Image from "next/image";
import { Star, MapPin, ShieldCheck, Navigation, Phone } from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "塔克西姆广场附近最好的烤肉 (1998年以来) | Kardeşler Cihangir",
  description: "体验伊斯坦布尔历史悠久的吉汉吉尔区自1998年以来的正宗土耳其烤肉。手工切碎的肉、石炉烤饼和传统烤肉 — 距塔克西姆广场仅5分钟步行路程。",
  keywords: ["塔克西姆烤肉", "伊斯坦布尔土耳其餐厅", "adana烤肉", "清真餐厅istanbul", "kardesler cihangir 1998"],
  alternates: {
    canonical: "https://kardeslercihangir.com/zh/best-kebab-taksim",
    languages: {
      zh: "https://kardeslercihangir.com/zh/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      de: "https://kardeslercihangir.com/de/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
      it: "https://kardeslercihangir.com/it/best-kebab-taksim",
      es: "https://kardeslercihangir.com/es/best-kebab-taksim",
      "x-default": "https://kardeslercihangir.com/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "塔克西姆广场附近最正宗烤肉 — Kardeşler Cihangir (1998)",
    description: "28年以上的烹饪传统 — 伊斯坦布尔吉汉吉尔的橡木炭火烤肉和石炉烤饼。",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "塔克西姆广场附近哪里有最好的烤肉？", acceptedAnswer: { "@type": "Answer", text: "Kardeşler Cihangir位于历史悠久的吉汉吉尔区，距塔克西姆广场仅5分钟步行路程，自1998年以来提供正宗土耳其美食。" } },
    { "@type": "Question", name: "Kardeşler Cihangir是清真餐厅吗？", acceptedAnswer: { "@type": "Answer", text: "是的，我们每天使用100%新鲜清真肉类，每日新鲜制作。" } },
  ],
};

const phoneCallUrl = "tel:+902122513696";

export default function BestKebabTaksimZh() {
  return (
    <div className="min-h-screen bg-[#0E0804]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.webp" alt="塔克西姆附近的正宗烤肉 — Kardeşler Cihangir" fill style={{ objectFit: "cover" }} className="opacity-35" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/60 via-[#0E0804]/40 to-[#0E0804]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C7A3F]/20 border border-[#9C7A3F]/40 text-[#D4AF6A] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <span>创立于1998年 • 历史悠久的吉汉吉尔</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            橡木炭火<span className="text-[#D4AF6A]">正宗烤肉</span><br className="hidden sm:inline" />近塔克西姆广场
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            28年以上传承：用Zırh刀手工切碎的新鲜肉类、橡木炭火慢烤，以及在450°C石炉中烤制的金黄饼皮。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" /><span className="font-bold text-cream">4.6分</span><span className="text-cream-dim/70">(1280+条谷歌评价)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" /><span>距塔克西姆广场步行5分钟</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" /><span>每日100%新鲜清真肉类</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-white font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]">
              <Phone size={18} /><span>致电预订/订购</span>
            </a>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all">
              <Navigation size={16} className="text-copper" /><span>谷歌地图导航</span>
            </a>
          </div>
        </div>
      </section>
      <section className="border-y border-teal-dim/30 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">1998</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">始建于吉汉吉尔</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-cream">100%</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">新鲜清真肉类</div></div>
          <div className="p-3 border-r border-teal-dim/20"><div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1280+条评价</div></div>
          <div className="p-3"><div className="text-2xl sm:text-3xl font-black text-cream">450°C</div><div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">木火石炉</div></div>
        </div>
      </section>
      <SeoStorytelling locale="zh" />
      <LandingDishesSection currentLocale="zh" />
      <LandingVerifiedReviews currentLocale="zh" />
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F2E7] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>今晚体验28年的烹饪传承</h2>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a href={phoneCallUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all">
              <Phone size={18} /><span>致电预订/订购</span>
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
