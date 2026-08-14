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
  title: "Лучший кебаб на углях у площади Таксим (с 1998 года) | Ресторан Kardeşler Джихангир Стамбул",
  description:
    "Настоящий турецкий кебаб на углях из дуба и пиде из каменной печи в историческом районе Джихангир с 1998 года. 100% свежее халяльное мясо ручной рубки. 5 минут пешком от площади Таксим.",
  keywords: [\n    "best kebab in taksim",\n    "halal restaurant near taksim square",\n    "authentic turkish food beyoglu",\n    "best doner and kebab istanbul",\n    "top rated grills in cihangir",\n    "late night food taksim",\n    "best adana kebab istanbul",\n    "stone oven lahmacun taksim",\n    "turkish pide near istiklal",\n    "family friendly restaurant taksim",\n    "where to eat in taksim",\n    "best local restaurants in istanbul",\n    "kardesler cihangir 1998",\n    "charcoal grilled meat istanbul",\n    "best iskender kebab beyoglu",\n    "galataport nearby restaurants",\n    "best cheap eats in taksim",\n    "authentic anatolian cuisine",\n    "traditional turkish bbq",\n    "halal meat taksim",\n    "istanbul food guide taksim",\n    "best turkish pizza taksim",\n  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/ru/best-kebab-taksim",
    languages: {
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Лучший кебаб на углях у площади Таксим (с 1998 года) — Kardeşler Джихангир",
    description: "Более 28 лет традиций приготовления сочного кебаба на натуральных углях и свежей выпечки.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchemaRu = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Где найти лучший традиционный кебаб рядом с площадью Таксим?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ресторан Kardeşler Kebap (основан в 1998 году) расположен в историческом районе Джихангир, всего в 5 минутах ходьбы (450 м) от площади Таксим. Знаменит своим Адана кебабом на углях из дуба и пиде из каменной печи.",
      },
    },
    {
      "@type": "Question",
      name: "В чем отличие ресторана Kardeşler от туристических заведений на улице Истикляль?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kardeşler — это аутентичное заведение для местных жителей с 1998 года. Мясо рубится вручную османскими ножами Zırh, жарится исключительно на натуральных углях без газа, а пиде выпекаются при 450°C в каменной печи по честным ценам.",
      },
    },
    {
      "@type": "Question",
      name: "Как забронировать столик и какие часы работы?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ресторан открыт ежедневно с 09:00 до 02:00 ночи. Бронь столика подтверждается мгновенно через WhatsApp (+90 506 045 39 06) или по телефону (+90 212 251 36 96).",
      },
    },
  ],
};

export default function RussianLandingPage() {
  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("Здравствуйте, ресторан Kardeşler Cihangir! Хочу забронировать столик или узнать меню.");

  return (
    <div className="min-h-screen bg-[#0E0804] text-cream selection:bg-copper selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaRu) }}
      />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.webp"
            alt="Ресторан Kardeşler Джихангир Таксим Стамбул с 1998 года"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/90 via-[#0E0804]/60 to-[#0E0804]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/10 to-copper/10 border border-gold/30 text-gold text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(217,119,6,0.15)] relative overflow-hidden group">
            <Award size={14} className="text-copper shrink-0" />

            <span className="relative z-10">ОСНОВАН В 1998 ГОДУ • ИСТОРИЧЕСКИЙ ДЖИХАНГИР</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight luxury-title"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Настоящий кебаб <br className="hidden sm:inline" />
            на <span className="luxury-gold-serif">натуральных углях</span> у Таксима
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            Более 28 лет храним традиции османской кухни: мясо ручной рубки, мангал на углях из дуба и горячие пиде из каменной печи 450°C.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-bold text-cream">4.6 из 5</span>
              <span className="text-cream-dim/70">(1 280+ отзывов в Google)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" />
              <span>5 минут пешком от площади Таксим (450м)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" />
              <span>100% свежее халяльное мясо</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>VIP Бронь столика в WhatsApp</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <Navigation size={16} className="text-copper" />
              <span>Маршрут в Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-teal-dim/30 bg-[#140D07]/90 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">1998</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Год основания в Джихангире</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-cream">100%</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Свежее мясо халяль</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1 280+ отзывов гостей</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cream">450°C</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Каменная печь на дровах</div>
          </div>
        </div>
      </section>

      {/* ── SEO STORYTELLING (MAGAZINE LAYOUT) ── */}
      <SeoStorytelling locale="ru" />

      {/* ── 3. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="ru" />

      {/* ── 4. VERIFIED GOOGLE MAPS REVIEWS (DIRECT LINKS & AUTHENTIC SOURCE) ── */}
      <LandingVerifiedReviews currentLocale="ru" />

      {/* ── 5. FINAL VIP CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140D07] to-[#0E0804] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-gold text-xs font-bold uppercase tracking-wider">
            <span>VIP Бронирование столиков</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Попробуйте 28 лет традиций кебаба сегодня
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            Ждем вас в Джихангире для уютного семейного ужина или дружеского застолья с настоящим турецким гостеприимством.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>Забронировать через WhatsApp</span>
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
