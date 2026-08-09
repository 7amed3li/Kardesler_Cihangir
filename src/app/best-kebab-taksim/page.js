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
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/best-kebab-taksim",
    languages: {
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
    <div className="min-h-screen bg-[#0E0804] text-cream selection:bg-copper selection:text-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.webp"
            alt="Kardeşler Kebap Cihangir Taksim Istanbul Since 1998"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/90 via-[#0E0804]/60 to-[#0E0804]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
            <span>ESTABLISHED 1998 • HISTORICAL CIHANGIR, BEYOĞLU</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Authentic Wood-Fired Kebab <br className="hidden sm:inline" />
            on <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-copper">Natural Oak Embers</span> Near Taksim
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            For over 28 years in the bohemian heart of Cihangir, preserving authentic Ottoman culinary heritage: hand-minced meats, natural charcoal fire, and fresh 450°C stone-oven pides.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-bold text-cream">4.6 of 5</span>
              <span className="text-cream-dim/70">(1,280+ Google Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" />
              <span>5 min walk from Taksim Square (450m)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" />
              <span>100% Daily Fresh Halal Meat</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>Instant VIP WhatsApp Booking</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <Navigation size={16} className="text-copper" />
              <span>Google Maps Walking Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-teal-dim/30 bg-[#140D07]/90 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">1998</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Founded in Cihangir</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-cream">100%</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Fresh Daily Halal Meat</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1,280+ Verified Reviews</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cream">450°C</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Wood-Fired Stone Oven</div>
          </div>
        </div>
      </section>

      {/* ── NEW SEO CONTENT SECTION ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0804]">
        <article className="max-w-4xl mx-auto space-y-16">
          
          {/* Section A: The Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass size={14} />
              <span>Our Heritage</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              The Kardeşler Cihangir Story — Since 1998
            </h2>
            <div className="space-y-4 text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Just a short 5-minute walk from the bustling center of Taksim Square lies Cihangir, Beyoğlu’s most historic and bohemian neighborhood. It is here, among the winding streets favored by artists, writers, and culinary enthusiasts, that Kardeşler Kebap was established in 1998.
              </p>
              <p>
                For over two decades, we have remained true to the foundational principles of authentic Turkish cuisine. While the surrounding areas of Taksim and Istiklal Avenue have seen countless tourist-focused restaurants come and go, Kardeşler Cihangir has stood as a bastion of genuine local flavor. We are not just a restaurant; we are a family tradition dedicated to preserving the rich heritage of Anatolian grilling and stone-oven baking in the heart of Istanbul.
              </p>
              <p>
                When you search for the best kebab in Taksim, you are likely looking for more than just a meal—you are seeking an experience rooted in authenticity. Our commitment to quality ingredients, traditional preparation methods, and warm Turkish hospitality has made us a beloved institution for both Cihangir locals and discerning travelers from around the world.
              </p>
            </div>
          </div>

          {/* Section B: The Craft */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider mb-2">
              <Flame size={14} />
              <span>Artisanal Preparation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              Our Craft: Oak Charcoal & The 450°C Stone Oven
            </h2>
            <div className="space-y-4 text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              <p>
                The secret to an unforgettable Turkish kebab lies entirely in the preparation. At Kardeşler Cihangir, we compromise on nothing. We source only 100% fresh, daily halal meat, completely rejecting the use of frozen products. 
              </p>
              <p>
                Our master chefs (ustas) continue to use the traditional heavy crescent knife, known as a 'Zırh', to hand-mince our meat. This labor-intensive Anatolian technique preserves the texture and juices of the meat in a way that modern commercial grinders simply cannot match. Once prepared, the kebabs are slow-roasted over real oak charcoal embers, infusing them with that signature, irresistible smoky aroma.
              </p>
              <p>
                Equally important is our mastery of dough. Our traditional stone oven, kept blazing at 450°C, is the heart of our bakery section. Whether it is the thin, crispy base of our Lahmacun or the pillowy, blistered crust of our wood-fired Pide, every item is baked fresh to order. The intense heat of the stone oven creates the perfect balance of a crunchy exterior and a soft, flavorful interior.
              </p>
            </div>
          </div>

          {/* Section C: What to Try */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider mb-2">
              <Utensils size={14} />
              <span>Signature Dishes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              What to Try: Our Most Loved Anatolian Classics
            </h2>
            <div className="space-y-4 text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              <p>
                With a menu featuring over 100 meticulously crafted dishes, Kardeşler Cihangir offers a comprehensive journey through Turkish cuisine. However, a few of our signature items have achieved legendary status among our guests:
              </p>
              <ul className="space-y-3 pl-2 mt-4">
                <li className="flex gap-3">
                  <Star size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block">The Classic Adana Kebab</strong>
                    <span>Our absolute icon. Hand-minced lamb and beef, perfectly spiced with red pepper flakes and grilled on a wide skewer over oak charcoal. Served with wood-fired lavash.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Star size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block">Stone-Oven Pide (Turkish Pizza)</strong>
                    <span>Available in over 15 varieties, from classic minced meat (Kıymalı) to melting local cheeses (Kaşarlı) and traditional cured beef (Pastırmalı), all baked on hot stone tiles.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Star size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block">Ali Nazik Kebab</strong>
                    <span>A royal Ottoman delicacy featuring tender, marinated lamb pieces served over a velvety bed of smoky, charcoal-roasted eggplant purée mixed with garlic yogurt.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Star size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block">Crispy Lahmacun</strong>
                    <span>A thin, crispy dough topped with a finely chopped mixture of minced meat, fresh tomatoes, onions, and parsley, baked in seconds in our high-heat oven.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section D: Visit Us */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin size={14} />
              <span>Location & Hours</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              Visit Us: Getting Here from Taksim Square
            </h2>
            <div className="space-y-4 text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Finding authentic, non-touristy food near Taksim can be challenging, but Kardeşler Cihangir is exceptionally accessible. We are located just 450 meters from Taksim Square. A short, pleasant 5-minute walk down Defterdar Yokuşu (towards the historical Firuzağa Mosque) will lead you right to our doors.
              </p>
              <div className="bg-[#140D07] p-5 rounded-xl border border-teal-dim/20 mt-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <MapPin size={18} className="text-copper shrink-0" />
                    <span><strong>Address:</strong> Firuzağa Mah. Defterdar Yokuşu No:1/A, Cihangir, Beyoğlu, İstanbul</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={18} className="text-teal shrink-0" />
                    <span><strong>Opening Hours:</strong> Open daily from 09:00 AM to 02:00 AM</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-gold shrink-0" />
                    <span><strong>Reservations & Delivery:</strong> +90 212 251 36 96</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle size={18} className="text-[#25D366] shrink-0" />
                    <span><strong>WhatsApp:</strong> +90 506 045 39 06</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </article>
      </section>


      {/* ── 3. STORY OF CRAFTSMANSHIP & HERITAGE ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text & History */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider">
              <Flame size={13} />
              <span>Authentic Charcoal Craftsmanship</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-cream leading-tight"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Why Culinary Travelers Choose <span className="text-copper">Cihangir</span>
            </h2>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              Just 450 meters away from the commercial hustle of Taksim Square lies <strong className="text-cream font-medium">Cihangir</strong> — Beyoğlu’s most charming historic neighborhood, home to artists, poets, and discerning food lovers.
            </p>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              Since 1998, <strong className="text-cream font-medium">Kardeşler Kebap</strong> has upheld the true artisan tradition: meats hand-minced with heavy crescent Zırh knives, slow-roasted over real oak embers, and dough freshly baked upon order in a 450°C stone oven.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">Daily fresh butchery (never frozen)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">Artisanal sourdough baked to order</span>
              </div>
            </div>
          </div>

          {/* Sizzling Photo Showcase — clickable with fullscreen zoom */}
          <HeroImageWithModal />
        </div>
      </section>


      {/* ── 4. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
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
