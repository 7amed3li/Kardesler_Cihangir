import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, Phone, Utensils, Award, CheckCircle2, 
  Navigation, MessageCircle, Flame, ShieldCheck, 
  Heart, Compass, ChevronLeft, ArrowUpLeft, Check, ExternalLink
} from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "أفضل كباب تركي حلال قرب ميدان تقسيم (منذ 1998) | مطعم كارديشلر جيهانكير إسطنبول",
  description:
    "اكتشف سر المشاوي التركية الأصيلة على جمر السنديان وفطائر البيدا بالفرن الحجري في حي جيهانكير التاريخي منذ 1998. لحوم حلال طازجة 100% مفرومة بالساطور العثماني. 5 دقائق سيراً من ميدان تقسيم.",
  keywords: [
    "أفضل كباب تقسيم",
    "مطعم كباب حلال تقسيم اسطنبول",
    "مطعم كارديشلر جيهانكير 1998",
    "مشويات عثمانية على الفحم تقسيم",
    "فطائر بيدا فرن حجري بيوغلو",
    "مطاعم قريبة من شارع الاستقلال",
    "أفضل مطعم تركي في جيهانكير",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/ar/best-kebab-taksim",
    languages: {
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "أفضل كباب تركي حلال قرب ميدان تقسيم (تأسس 1998) — مطعم كارديشلر",
    description: "أكثر من 28 عاماً من الأصالة والشواء على جمر السنديان الطبيعي في قلب إسطنبول التاريخية.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchemaAr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "أين أجد أفضل كباب تركي أصيل حلال قريب من ميدان تقسيم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "مطعم كارديشلر كباب (تأسس عام 1998) في حي جيهانكير التاريخي يبعد 5 دقائق فقط سيراً على الأقدام (450 متراً) عن ميدان تقسيم ومحطة المترو، ويشتهر بكباب أضنة المشوي على جمر السنديان وفطائر البيدا واللحم بعجين الطازج من الفرن الحجري.",
      },
    },
    {
      "@type": "Question",
      name: "ما الذي يميز مطعم كارديشلر عن المطاعم التجارية السياحية في شارع الاستقلال؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "كارديشلر ليس مطعماً سياحياً تجارياً عابراً، بل وجهة عريقة لأهالي إسطنبول ومثقفيها منذ 1998. نقوم بفرم اللحوم الطازجة بالساطور العثماني التقليدي (Zırh)، ونشوي اللحوم حصراً على جمر خشب السنديان الطبيعي بدون غاز أو كهرباء، ونخبز الفطائر فور الطلب على حجر بحرارة 450 درجة، مع أسعار محلية عادلة ولحوم حلال 100%.",
      },
    },
    {
      "@type": "Question",
      name: "ما هي أوقات العمل وكيف يمكن حجز طاولة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "المطعم مفتوح يومياً من 09:00 صباحاً وحتى 02:00 بعد منتصف الليل. يمكن حجز الطاولات مباشرة وتأكيدها فوراً عبر واتساب (+90 506 045 39 06) أو بالاتصال على (+90 212 251 36 96).",
      },
    },
  ],
};

const restaurantSchemaAr = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kardeşler Kebap & Cafe Cihangir",
  image: "https://kardeslercihangir.com/images/hero-bg.webp",
  servesCuisine: ["Turkish", "Kebab", "Middle Eastern", "Halal", "Pide"],
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Firuzağa Mah. Defterdar Yokuşu No:1/A, Cihangir",
    addressLocality: "Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34425",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0310944,
    longitude: 28.9824818,
  },
  telephone: "+902122513696",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "02:00",
    },
  ],
};

export default function BestKebabTaksimArabicPage() {
  const distanceGuide = [
    { from: "ميدان تقسيم (Taksim Meydanı)", dist: "450 متر", walk: "5 دقائق", route: "نزولاً عبر شارع Sıraselviler بجوار فندق The Marmara" },
    { from: "شارع الاستقلال (İstiklal Caddesi)", dist: "350 متر", walk: "4 دقائق", route: "عبر أزقة غلطة سراي باتجاه جامع فيروز آغا" },
    { from: "برج غلاطة (Galata Kulesi)", dist: "1.2 كم", walk: "12 دقيقة", route: "مروراً بحي جيهانكير العريق وشوارعه البوتيكية" },
  ];

  const pillars = [
    {
      title: "لحوم محلية حلال 100% طازجة يومياً",
      desc: "نعتمد فقط لحوم المزارع المحلية الطازجة المذبوحة وفق الشريعة الإسلامية. لا نستخدم لحوماً مجمدة إطلاقاً، بل تُفرم وتُتبل صباح كل يوم.",
      icon: ShieldCheck,
    },
    {
      title: "شواء على جمر خشب السنديان الطبيعي",
      desc: "سر النكهة الدخانية العميقة والمذاق العثماني الذي لا يُنسى هو الشواء الهادئ على فحم السنديان الطبيعي بدون غاز أو شوايات كهربائية.",
      icon: Flame,
    },
    {
      title: "فرن حجري بحرارة 450 درجة مئوية",
      desc: "فطائر البيدا واللحم بعجين والخبز تُفرد وتُخبز فور الطلب على بلاط الحجر الطبيعي لتصل إلى طاولتكم ساخنة ومقرمشة.",
      icon: Clock,
    },
    {
      title: "ضيافة عائلية أصيلة وأسعار عادلة",
      desc: "منذ 1998 ونحن نستقبل عائلات إسطنبول وضيوف العالم بكرم حقيقي، وخدمة راقية، وقائمة أسعار واضحة خالية من أي استغلال سياحي.",
      icon: Heart,
    },
  ];

  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("مرحباً مطعم كارديشلر جيهانكير، أود حجز طاولة أو الاستفسار عن المنيو.");

  return (
    <div className="min-h-screen bg-[#0E0804] text-cream selection:bg-copper selection:text-white" dir="rtl">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaAr) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchemaAr) }}
      />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.webp"
            alt="مطعم كارديشلر كباب جيهانكير تقسيم إسطنبول منذ 1998"
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
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/10 to-copper/10 border border-gold/30 text-gold text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(217,119,6,0.15)] relative overflow-hidden group">
            <Award size={14} className="text-copper shrink-0" />

            <span className="relative z-10">تأسس عام 1998 • جيهانكير التاريخية</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.25] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            الكباب العثماني الأصيل <br className="hidden sm:inline" />
            على <span className="text-gold">جمر السنديان الطبيعي</span> قرب تقسيم
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            منذ أكثر من 28 عاماً، نحافظ على أصول الطهي العثماني: لحوم طازجة 100% مفرومة بساطور الزيرح اليدوي، شواء على الفحم الطبيعي، وفطائر بيدا تخبز بالفرن الحجري بحرارة 450 درجة.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-bold text-cream">4.6 من 5</span>
              <span className="text-cream-dim/70">(+1280 تقييم Google)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" />
              <span>5 دقائق سيراً من ميدان تقسيم (450م)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" />
              <span>لحوم حلال 100% طازجة يومياً</span>
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
              <span>حجز طاولة VIP عبر واتساب</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <Navigation size={16} className="text-copper" />
              <span>الاتجاهات على خرائط Google</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-teal-dim/30 bg-[#140D07]/90 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">1998</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">سنة التأسيس في جيهانكير</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-cream">100%</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">لحوم حلال طازجة يومياً</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">+1280 تقييم معتمد</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cream">450°C</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">حرارة الفرن الحجري</div>
          </div>
        </div>
      </section>

      {/* ── SEO STORYTELLING (MAGAZINE LAYOUT) ── */}
      <SeoStorytelling locale="ar" />

      {/* ── 3. STORY OF CRAFTSMANSHIP & HERITAGE ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text & History */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider">
              <Flame size={13} />
              <span>أسرار الشواء العثماني الأصيل</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-cream leading-tight"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              لماذا يفضل زوار إسطنبول القدوم إلى <span className="text-copper">جيهانكير</span>؟
            </h2>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              على بعد 450 متراً فقط نزولاً من صخب وإعلانات ميدان تقسيم المزدحمة، يقع حي <strong className="text-cream font-medium">جيهانكير (Cihangir)</strong> — أرقى وأهدأ أحياء بيوغلو التاريخية، حيث يلتقي الفن والثقافة وأصالة الطهي.
            </p>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              منذ عام 1998، حافظ مطعم <strong className="text-cream font-medium">كارديشلر (Kardeşler)</strong> على أصول الضيافة التركية الحقيقية: فرم اللحوم الطازجة يدوياً بساطور الزيرح، إشعال جمر خشب السنديان الطبيعي كل صباح، وخبز فطائر البيدا واللحم بعجين مباشرة في الفرن الحجري بحرارة 450 درجة.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">لحوم طازجة يومياً غير مجمدة</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">عجين مخمر ومخبوز على الحجر فوراً</span>
              </div>
            </div>
          </div>

          {/* Sizzling Photo Showcase */}
          <div className="relative h-[280px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 shadow-xl group">
            <Image
              src="/images/27-Karisik-Kebap_1.webp"
              alt="وليمة المشاوي الملكية المشكلة مطعم كارديشلر جيهانكير"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 start-4 end-4 p-3.5 sm:p-4 rounded-xl glass-card border border-gold/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-cream font-bold text-sm sm:text-base">وليمة المشاوي الملكية الخاصة</h4>
                  <p className="text-cream-dim/70 text-xs">مشاوي على الفحم ومقبلات بيتية طازجة</p>
                </div>
                <span className="text-gold font-black text-base sm:text-lg">1600 ₺</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SIGNATURE SPECIALTIES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="ar" />

      {/* ── 5. THE FOUR PILLARS OF OUR KITCHEN ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-cream"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            أركان الجودة الأربعة في مطبخ كارديشلر
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
              <span>دليل الوصول سيراً على الأقدام</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-cream"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              سهولة الوصول من معالم تقسيم المجاورة
            </h2>
            <p className="text-cream-dim/80 text-xs sm:text-sm">
              تجنب عناء وزحام التكاسي. استمتع بنزهة قصيرة ساحرة عبر أجمل أزقة إسطنبول التاريخية.
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
              <span>دفتاردار يوكوشو رقم: 1/A، محلة فيروز آغا، جيهانكير، بيوغلو، إسطنبول</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-teal text-[#0E0804] font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal/90 transition-all"
              >
                <Navigation size={16} />
                <span>فتح الملاحة عبر خرائط Google Maps</span>
              </a>
              <a
                href="tel:+902122513696"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl glass-card border border-teal-dim/40 text-cream hover:text-gold text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone size={15} className="text-gold" />
                <span>الاتصال بالمطعم: 96 36 251 212 90+</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VERIFIED GOOGLE MAPS REVIEWS (DIRECT LINKS & AUTHENTIC SOURCE) ── */}
      <LandingVerifiedReviews currentLocale="ar" />

      {/* ── 8. FINAL VIP RESERVATION CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140D07] to-[#0E0804] border-t border-teal-dim/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-gold text-xs font-bold uppercase tracking-wider">
            <span>خدمة حجز الطاولات والضيوف المميزين (VIP)</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            تذوقوا عراقة 28 عاماً من الشواء الأصيل الليلة
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            سواء كان عشاءً عائلياً دافئاً، أو جمعة أصدقاء، أو مشويات متأخرة بعد جولة تقسيم — نستقبلكم بكل حفاوة وكرم تركي أصيل.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="https://wa.me/905060453906?text=*طلب%20حجز%20طاولة%20-%20مطعم%20كارديشلر%20جيهانكير*%0A--------------------------------%0Aمرحباً%D8%8C%20أود%20حجز%20طاولة%20في%20مطعم%20كارديشلر.%20يرجى%20تأكيد%20التوفر.%20شكراً%20لكم!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>تأكيد الحجز الفوري عبر واتساب</span>
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
