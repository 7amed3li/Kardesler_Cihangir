import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, Phone, Utensils, Award, CheckCircle2, 
  Navigation, MessageCircle, Flame, ShieldCheck, 
  Heart, Compass, ChevronRight, ArrowUpRight, Check, ExternalLink
} from "lucide-react";
import LandingDishesSection from "../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../components/SeoStorytelling";
import HeroImageWithModal from "./HeroImageWithModal";

export const metadata = {
  title: "Authentic Wood-Fired Kebab Near Taksim Square (Since 1998) | Kardeşler Cihangir",
  description:
    "Experience Istanbul's authentic oak-charcoal kebabs and stone-oven pides in historical Cihangir since 1998. Hand-minced meats, genuine local prices, 5-minute walk from Taksim.",
  keywords: [
    "best kebab taksim",
    "kebab near taksim square",
    "kardesler cihangir 1998",
    "authentic turkish kebab istanbul",
    "adana kebab taksim",
    "halal restaurant beyoglu",
    "stone oven pide cihangir",
    "best kebab in taksim",
    "halal restaurant near taksim square",
    "authentic turkish food beyoglu",
    "best doner and kebab istanbul",
    "top rated grills in cihangir",
    "late night food taksim",
    "best adana kebab istanbul",
    "stone oven lahmacun taksim",
    "turkish pide near istiklal",
    "family friendly restaurant taksim",
    "where to eat in taksim",
    "best local restaurants in istanbul",
    "kardesler cihangir 1998",
    "charcoal grilled meat istanbul",
    "best iskender kebab beyoglu",
    "galataport nearby restaurants",
    "best cheap eats in taksim",
    "authentic anatolian cuisine",
    "traditional turkish bbq",
    "halal meat taksim",
    "istanbul food guide taksim",
    "best turkish pizza taksim",
    "turkish breakfast taksim",
    "traditional turkish breakfast",
    "best breakfast in istanbul",
    "menemen istanbul",
    "eggs with sucuk",
    "affordable breakfast taksim",
    "family breakfast cihangir",
    "cheese borek",
    "adana kebab",
    "urfa kebab",
    "mardin kebab",
    "beyti kebab",
    "turkish lentil soup",
    "serpme kahvalti taksim",
    "turkish lahmacun taksim",
    "best lahmacun in istanbul",
    "icli kofte taksim",
    "stuffed meatballs istanbul",
    "turkish pide cheese",
    "minced meat pide",
    "mixed grill istanbul",
    "kunefe taksim",
    "turkish baklava",
    "doner kebab taksim",
    "authentic lahmacun beyoglu",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/best-kebab-taksim",
    languages: {
      "x-default": "https://kardeslercihangir.com/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Authentic Wood-Fired Kebab Near Taksim Square (Est. 1998) — Kardeşler Cihangir",
    description: "28+ years of authentic oak-charcoal grills and stone-oven pides in historical Cihangir.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I find the best authentic kebab near Taksim Square?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kardeşler Kebap & Cafe in historical Cihangir, established in 1998, is located just a 5-minute walk (450m) from Taksim Square. Renowned for authentic oak-charcoal Adana kebab, hand-minced meats, and stone-oven pides.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Kardeşler Cihangir unique compared to tourist restaurants in Taksim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike commercial tourist spots on Istiklal, Kardeşler has been a beloved local institution since 1998. We hand-mince our meats using traditional Zırh knives, grill strictly over natural oak embers, bake pides to order in our 450°C stone oven, and maintain honest local prices with 100% Halal certified meats.",
      },
    },
    {
      "@type": "Question",
      name: "What are the opening hours and reservation options?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are open 7 days a week from 09:00 AM until 02:00 AM. Table reservations can be confirmed instantly via WhatsApp (+90 506 045 39 06) or phone (+90 212 251 36 96).",
      },
    },
  ],
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kardeşler Kebap & Breakfast",
  description: "Authentic Wood-Fired Kebab Near Taksim Square (Since 1998) | Kardeşler Cihangir",
  url: "https://kardeslercihangir.com/best-kebab-taksim",
  telephone: "+902122513696",
  image: "https://kardeslercihangir.com/images/hero-bg.webp",
  servesCuisine: ["Turkish", "Kebab", "Mediterranean", "Pide", "Lahmacun"],
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Defterdar Yokuşu No:1/A, Firuzağa Mah.",
    addressLocality: "Cihangir, Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34425",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0310944,
    longitude: 28.9824818,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "02:00",
    },
  ],
};

export default function BestKebabTaksimPage() {
  const distanceGuide = [
    { from: "Taksim Square (Meydan)", dist: "450 meters", walk: "5 min walk", route: "Down Sıraselviler Avenue beside The Marmara Hotel" },
    { from: "İstiklal Avenue (Galatasaray)", dist: "350 meters", walk: "4 min walk", route: "Via Yeni Çarşı Street heading towards Firuzağa Mosque" },
    { from: "Galata Tower", dist: "1.2 km", walk: "12 min walk", route: "A scenic stroll through bohemian Cihangir antique alleys" },
  ];

  const pillars = [
    {
      title: "100% Fresh Daily Halal Meat",
      desc: "We exclusively source premium daily butchered meats from trusted local Anatolian farms. Zero frozen meats used.",
      icon: ShieldCheck,
    },
    {
      title: "Natural Oak Charcoal Fire",
      desc: "Our signature smoky depth and juicy texture come from pure slow-burning oak lump charcoal with no gas or electric griddles.",
      icon: Flame,
    },
    {
      title: "450°C Stone Hearth Oven",
      desc: "Every pide, lahmacun, and lavash is rolled fresh and baked on blistering volcanic stone tiles upon order.",
      icon: Clock,
    },
    {
      title: "Genuine Hospitality & Fair Prices",
      desc: "Proudly family-owned since 1998, welcoming travelers with transparent local pricing and heartfelt hospitality.",
      icon: Heart,
    },
  ];

  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("Hello Kardeşler Kebap Cihangir, I would like to reserve a table or ask about the menu.");

  return (
    <div className="min-h-screen bg-[#EDE3CE] text-[#2B2620] font-sans">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#EDE3CE]">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Award size={14} className="text-[#9C7A3F] shrink-0" />
            <span>ESTABLISHED 1998 • HISTORICAL CIHANGIR</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2B2620] leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Authentic Wood-Fired Kebab <br className="hidden sm:inline" />
            on <span className="text-[#9C7A3F]">Natural Oak Embers</span> Near Taksim
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#7A7364] font-medium leading-relaxed">
            For over 28 years in the bohemian heart of Cihangir, preserving authentic Ottoman culinary heritage: hand-minced meats, natural charcoal fire, and fresh 450°C stone-oven pides.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-[#7A7364]">
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <Star size={14} className="text-[#9C7A3F] fill-[#9C7A3F]" />
              <span className="font-bold text-[#2B2620]">4.6 of 5</span>
              <span className="text-[#7A7364]">(1,280+ Google Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <MapPin size={14} className="text-[#4E5F4C]" />
              <span className="font-medium text-[#2B2620]">5 min walk from Taksim Square (450m)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F2E7] px-3.5 py-1.5 rounded-md border border-[#9C7A3F]/30">
              <ShieldCheck size={14} className="text-[#4E5F4C]" />
              <span className="font-medium text-[#2B2620]">100% Daily Fresh Halal Meat</span>
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
              <span>Reserve Table / Order on WhatsApp</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#2B2620] hover:bg-[#EDE3CE] font-semibold text-xs transition-colors"
            >
              <Navigation size={16} className="text-[#9C7A3F]" />
              <span>Get Google Maps Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-[#9C7A3F]/20 bg-[#F7F2E7] py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#9C7A3F]">1998</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">ESTABLISHED IN CIHANGIR</div>
          </div>
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#2B2620]">100%</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">HAND-MINCED FRESH MEAT</div>
          </div>
          <div className="p-3 border-r border-[#9C7A3F]/20">
            <div className="text-2xl sm:text-3xl font-black text-[#9C7A3F]">4.6★</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">1,280+ VERIFIED REVIEWS</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-[#2B2620]">450°C</div>
            <div className="text-[11px] sm:text-xs text-[#7A7364] mt-1 font-semibold uppercase tracking-wider">WOOD-FIRED STONE OVEN</div>
          </div>
        </div>
      </section>

      {/* ── SEO STORYTELLING (MAGAZINE LAYOUT) ── */}
      <SeoStorytelling locale="en" />

      {/* ── 3. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="en" />

      {/* ── 5. THE FOUR PILLARS OF OUR KITCHEN ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-cream"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            The Four Pillars of Kardeşler
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl glass-card border border-teal-dim/30 flex items-start gap-4 hover:border-copper/40 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-copper/15 border border-copper/30 text-copper flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-cream">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-cream-dim/80 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. WALKING DISTANCE & LOCATION GUIDE ── */}
      <section className="py-14 sm:py-20 bg-[#140D07]/80 border-y border-teal-dim/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/30 text-teal text-xs font-semibold uppercase tracking-wider">
              <Compass size={13} />
              <span>Easy Walking Guide</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-cream"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Just Steps Away From Taksim Landmarks
            </h2>
            <p className="text-cream-dim/80 text-xs sm:text-sm">
              Skip overpriced taxis. Enjoy a pleasant 5-minute stroll through Istanbul's most charming artistic alleys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {distanceGuide.map((d, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl glass-card border border-teal-dim/30 flex flex-col justify-between space-y-4 hover:border-gold/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-copper uppercase tracking-wider">{d.dist}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold text-xs font-semibold">{d.walk}</span>
                  </div>
                  <h4 className="font-bold text-cream text-base mb-1.5">{d.from}</h4>
                  <p className="text-xs text-cream-dim/70 leading-relaxed">{d.route}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Address & Direct Map CTA */}
          <div className="text-center space-y-4 pt-2">
            <p className="text-cream font-medium text-xs sm:text-sm flex items-center justify-center gap-2">
              <MapPin size={16} className="text-copper shrink-0" />
              <span>Defterdar Yokuşu No: 1/A, Firuzağa Mah., Cihangir, Beyoğlu, Istanbul</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-teal text-[#0E0804] font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal/90 transition-all"
              >
                <Navigation size={16} />
                <span>Open in Google Maps Navigation</span>
              </a>
              <a
                href="tel:+902122513696"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl glass-card border border-teal-dim/40 text-cream hover:text-gold text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone size={15} className="text-gold" />
                <span>Call Restaurant: +90 212 251 36 96</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VERIFIED GOOGLE MAPS REVIEWS (DIRECT LINKS & AUTHENTIC SOURCE) ── */}
      <LandingVerifiedReviews currentLocale="en" />

      {/* ── 8. FINAL VIP CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140D07] to-[#0E0804] border-t border-teal-dim/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-gold text-xs font-bold uppercase tracking-wider">
            <span>VIP Table Reservations & Delivery</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Taste 28 Years of Authentic Charcoal Tradition
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            Whether it’s an intimate family dinner, a gathering with friends, or late-night kebabs after exploring Taksim — you are warmly welcomed with authentic Turkish hospitality.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="https://wa.me/905060453906?text=*Table%20Reservation%20-%20Karde%C5%9Fler%20Kebap%20Cihangir*%0AHello%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Karde%C5%9Fler.%20Please%20confirm%20availability.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>Confirm Instant Booking via WhatsApp</span>
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
