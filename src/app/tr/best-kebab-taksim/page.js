import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, Phone, Utensils, Award, CheckCircle2, 
  Navigation, MessageCircle, Flame, ShieldCheck, 
  Heart, Compass, ChevronRight, ArrowUpRight, Check, ExternalLink
} from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "Taksim'e En Yakın Meşe Kömüründe Hakiki Kebap & Taş Fırın Pide (1998'den Beri) | Kardeşler Cihangir",
  description:
    "Cihangir'in 28 yıllık lezzet durağı. Zırhta çekilmiş taze etler, meşe kömürü ateşi ve 450 derecelik taş fırından sıcacık pideler. Taksim Meydanı'na sadece 5 dakika yürüme mesafesinde.",
  keywords: [
    "taksim en iyi kebapçı",
    "cihangir kebap salonu",
    "beyoğlu en iyi lahmacun",
    "istiklal caddesi restoranları",
    "taksim helal kesim et",
    "gece açık kebapçı taksim",
    "odun ateşi pide",
    "gerçek adana kebap istanbul",
    "kardeşler kebap cihangir",
    "taksim ucuz ve kaliteli yemek",
    "istanbul en iyi kebapçılar",
    "galataport yakın restoranlar",
    "tarihi türk mutfağı",
    "közde kebap keyfi",
    "taksim kebap tavsiye",
    "istanbul lezzet durakları",
    "taksim serpme kahvaltı",
    "istanbul en iyi kahvaltı",
    "menemen nerede yenir",
    "sucuklu yumurta",
    "uygun fiyatlı kahvaltı taksim",
    "cihangir kahvaltı mekanları",
    "paçanga böreği",
    "adana urfa kebap",
    "mardin kebabı",
    "beyti kebap",
    "mercimek çorbası",
    "kavurmalı yumurta",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/tr/best-kebab-taksim",
    languages: {
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Taksim'e En Yakın Hakiki Meşe Kömüründe Kebap — Kardeşler Cihangir (1998)",
    description: "28 yıllık esnaf terbiyesi ve değişmeyen meşe kömürü lezzetiyle Cihangir'de hizmetinizdeyiz.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchemaTr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Taksim Meydanı'na en yakın hakiki kebap nerede yenir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1998 yılında kurulan Kardeşler Kebap, Taksim Meydanı'na yalnızca 5 dakika (450 metre) yürüme mesafesinde tarihi Cihangir Firuzağa Camii karşısında yer almaktadır. Zırh kıyması Adana kebabı ve taş fırın pideleriyle ünlüdür.",
      },
    },
    {
      "@type": "Question",
      name: "Kardeşler Kebap'ın et ve pişirme farkı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Etlerimiz dondurulmamış, günlük taze ve %100 yerli kesimdir. Geleneksel zırh bıçağı ile elde kıyılır, sadece doğal meşe kömürü közünde pişirilir. Pidelerimiz ise 450 derecelik taş fırında sipariş üzerine sıcak olarak fırından çıkar.",
      },
    },
    {
      "@type": "Question",
      name: "Çalışma saatleri ve rezervasyon nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Haftanın 7 günü sabah 09:00'dan gece 02:00'ye kadar aralıksız hizmet vermekteyiz. WhatsApp (+90 506 045 39 06) veya telefon (+90 212 251 36 96) ile kolayca masa ayırtabilirsiniz.",
      },
    },
  ],
};

export default function TurkishLandingPage() {
  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("Merhaba Kardeşler Kebap Cihangir, masa rezervasyonu yaptırmak veya sipariş vermek istiyorum.");

  return (
    <div className="min-h-screen bg-[#EDE3CE] text-[#2B2620] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaTr) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#EDE3CE]">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Award size={14} className="text-[#9C7A3F] shrink-0" />
            <span>1998'DEN BERİ • TARİHİ CİHANGİR</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2B2620] leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Meşe Kömüründe <br className="hidden sm:inline" />
            <span className="text-[#9C7A3F]">
              Hakiki Zırh Kebabı
            </span>{" "}
            Taksim'in Yanında
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#7A7364] font-medium leading-relaxed">
            28 yıldır Cihangir'de geleneksel ocakbaşı kültürünü yaşatıyoruz: zırhla çekilen günlük etler, meşe kömürü ateşi ve 450 derecelik taş fırından sıcacık çıkan pideler.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-[#7A7364]">
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <Star size={14} className="text-[#9C7A3F] fill-[#9C7A3F]" />
              <span className="font-bold text-[#2B2620]">4.6 / 5</span>
              <span className="text-[#7A7364]">(1.280+ Google Yorumu)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <MapPin size={14} className="text-[#4E5F4C]" />
              <span className="font-medium text-[#2B2620]">Taksim Meydanı'na 5 Dk Yürüme (450m)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <ShieldCheck size={14} className="text-[#4E5F4C]" />
              <span className="font-medium text-[#2B2620]">%100 Günlük Taze Yerli Et</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
            >
              <MessageCircle size={18} />
              <span>WhatsApp ile Masa Ayırt / Sipariş Ver</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#2B2620] hover:bg-[#EDE3CE] font-semibold text-xs transition-colors"
            >
              <Navigation size={16} className="text-[#9C7A3F]" />
              <span>Google Haritalar Yol Tarifi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-[#9C7A3F]/20 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#9C7A3F]">1998</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">Cihangir'de Kuruluş</div>
          </div>
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#2B2620]">%100</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">Zırh Kıyımı Taze Et</div>
          </div>
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#9C7A3F]">4.6★</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">1.280+ Gerçek Yorum</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-[#2B2620]">450°C</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">Odun Ateşli Taş Fırın</div>
          </div>
        </div>
      </section>

      {/* ── SEO STORYTELLING (MAGAZINE LAYOUT) ── */}
      <SeoStorytelling locale="tr" />

      {/* ── 3. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="tr" />

      {/* ── 5. VERIFIED GOOGLE MAPS REVIEWS ── */}
      <LandingVerifiedReviews currentLocale="tr" />

      {/* ── 6. FINAL VIP CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EDE3CE] border-t border-[#9C7A3F]/20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider">
            <span>Rezervasyon ve Paket Servis</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            28 Yıllık Ocakbaşı Geleneğini Bu Akşam Yaşayın
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            Aile yemekleriniz, arkadaş buluşmalarınız veya Taksim turu sonrası lezzetli bir ocakbaşı ziyafeti için sizleri Cihangir'de bekliyoruz.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>WhatsApp ile Hemen İletişime Geç</span>
            </a>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream hover:border-gold/50 font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone size={16} className="text-teal" />
              <span>+90 212 251 36 96</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
