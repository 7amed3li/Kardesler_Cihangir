"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { MapPin, CaretDown, ArrowRight, Medal, Phone, Clock, Star } from "@phosphor-icons/react";
import { OttomanStar, OttomanSeal, KebabSkewer, StoneOven } from "@/components/BrandIcons";
import RestaurantMap from "@/components/RestaurantMap";
import LandingVerifiedReviews from "@/components/LandingVerifiedReviews";

// Hook: Intersection Observer for cinematic scroll-reveal animations
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export default function Home() {
  const { t, lang } = useAppContext();
  const [heroVisible, setHeroVisible] = useState(false);

  // Scroll-reveal refs for cinematic sections
  const [storyRef, isStoryVisible] = useReveal();
  const [item1Ref, isItem1Visible] = useReveal(0.2);
  const [item2Ref, isItem2Visible] = useReveal(0.2);
  const [item3Ref, isItem3Visible] = useReveal(0.2);
  const [galleryRef, isGalleryVisible] = useReveal(0.1);
  const [timelineRef, isTimelineVisible] = useReveal(0.1);
  const [reviewsRef, isReviewsVisible] = useReveal(0.1);
  const [contactRef, isContactVisible] = useReveal(0.1);

  useEffect(() => {
    requestAnimationFrame(() => setHeroVisible(true));
  }, []);

  return (
    <div className="bg-[#EDE3CE] min-h-screen text-[#2B2620] font-sans selection:bg-[#4E5F4C] selection:text-[#EDE3CE]">
      
      {/* ═══════════════════════════════════════════
          1. CINEMATIC HERO SECTION 
          ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 overflow-hidden">
        
        {/* Cinematic Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-bg.webp"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-promo-v2.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#2B2620]/55 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#EDE3CE] z-[1]"></div>

        <div className={`relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center space-y-7 transition-all duration-1000 ease-out transform ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          {/* Location Pill */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-[#9C7A3F]/30 bg-[#F7F2E7]/80 backdrop-blur-sm text-xs font-semibold tracking-wider text-[#4E5F4C] shadow-sm mb-4">
            <MapPin size={16} weight="fill" />
            <span className="uppercase">{t.heroLocation || "Cihangir, Istanbul"}</span>
          </div>

          {/* Main Brand Lockup */}
          <div className="flex flex-col items-center space-y-3">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-lg"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.welcome || "Kardeşler"}
            </h1>
            
            <div className="flex items-center gap-4 w-full max-w-xs mx-auto opacity-80">
              <div className="h-px bg-[#EDE3CE]/40 flex-1"></div>
              <p 
                className="text-[#9C7A3F] text-sm sm:text-base md:text-lg font-bold tracking-[0.4em] uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t.heroTagline || "KEBAP & PİDE"}
              </p>
              <div className="h-px bg-[#EDE3CE]/40 flex-1"></div>
            </div>
          </div>

          {/* Minimalist Tagline */}
          <p
            className="text-[#EDE3CE]/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-md mx-auto pt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t.subtitle || (lang === "ar" 
              ? "حيث تلتقي التقاليد بالمذاق الأصيل في قلب جيهانغير" 
              : lang === "tr" 
              ? "Cihangir'in kalbinde gelenek ve lezzetin buluştuğu yer" 
              : "Where tradition meets taste in the heart of Cihangir")}
          </p>

          {/* Refined Stats Block */}
          <div className="bg-[#F7F2E7]/60 backdrop-blur-md border border-[#9C7A3F]/20 rounded-2xl py-5 px-8 mt-6 shadow-sm w-full max-w-md">
            <div className="flex items-center justify-between divide-x divide-[#9C7A3F]/20">
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">106</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{lang === "ar" ? "صنف" : lang === "en" ? "DISHES" : lang === "ru" ? "БЛЮД" : lang === "fa" ? "غذا" : lang === "fr" ? "PLATS" : lang === "de" ? "GERICHTE" : lang === "it" ? "PIATTI" : lang === "es" ? "PLATOS" : lang === "zh" ? "道菜" : "ÇEŞİT"}</span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">11</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{lang === "ar" ? "فئة" : lang === "en" ? "CATEGORIES" : lang === "ru" ? "КАТЕГОРИЙ" : lang === "fa" ? "دسته" : lang === "fr" ? "CATÉGORIES" : lang === "de" ? "KATEGORIEN" : lang === "it" ? "CATEGORIE" : lang === "es" ? "CATEGORÍAS" : lang === "zh" ? "类别" : "KATEGORİ"}</span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">28</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{lang === "ar" ? "سنة تراث" : lang === "en" ? "YEARS LEGACY" : lang === "ru" ? "ЛЕТ ТРАДИЦИЙ" : lang === "fa" ? "سال سنت" : lang === "fr" ? "ANS TRADITION" : lang === "de" ? "JAHRE TRADITION" : lang === "it" ? "ANNI TRADIZIONE" : lang === "es" ? "AÑOS TRADICIÓN" : lang === "zh" ? "年传承" : "YIL GELENEK"}</span>
              </div>
            </div>
          </div>

          {/* Elegant CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <Link
              href="/menu"
              className="w-full sm:w-auto min-h-[56px] px-10 bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 group"
            >
              <span>{t.exploreMenu || (lang === "ar" ? "استكشف القائمة" : lang === "en" ? "EXPLORE MENU" : "MENÜYÜ KEŞFET")}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[56px] px-10 bg-transparent hover:bg-[#F7F2E7] text-[#4E5F4C] border border-[#4E5F4C] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <span>{t.callToOrder || (lang === "ar" ? "اطلب عبر الهاتف" : lang === "en" ? "CALL TO ORDER" : "TELEFONLA SİPARİŞ")}</span>
            </a>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 start-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 delay-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col items-center gap-2 text-[#9C7A3F]/70 animate-bounce">
            <CaretDown size={24} weight="thin" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. ALTERNATING CINEMATIC SECTIONS
          ═══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-32 sm:space-y-48">
        
        {/* Story Block (Text Left, Image Right) */}
        <section ref={storyRef} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 transition-all duration-1000 ease-out ${isStoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#9C7A3F] text-xs font-bold uppercase tracking-widest">
              <Medal size={18} weight="duotone" />
              <span>{t.storyBadge || "Our Heritage"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.ourStoryTitle || "Our Kardeşler Kebap Cihangir Story"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {t.ourStoryDesc || (lang === "ar" 
                ? "في قلب جيهانغير منذ أكثر من 28 عامًا، نقدم لكم النكهات التركية الأصيلة، بدءًا من كباب أضنة المفروم يدويًا وحتى الفطائر المخبوزة في الفرن الحطبي."
                : lang === "tr" 
                ? "Cihangir'de 28 yıldır, zırh kıyması Adana kebaptan odun ateşinde pide çeşitlerine kadar geleneksel lezzetleri misafirlerimize sunuyoruz."
                : "For 28 years in the heart of Cihangir, we have been serving authentic Turkish flavors—from hand-minced Adana kebab to wood-fired baked pide.")}
            </p>
          </div>
          <div className="flex-1 w-full aspect-square md:aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/adana.webp" alt="Authentic Charcoal Kebab — Kardeşler Cihangir Since 1998" fill priority={true} style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-[#2B2620]/10 mix-blend-multiply"></div>
          </div>
        </section>

        {/* Item 1: Adana Kebap (Image Left, Text Right) */}
        <section ref={item1Ref} className={`flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 transition-all duration-1000 ease-out ${isItem1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex-1 w-full aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/adana.webp" alt="Adana Kebap" fill style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#4E5F4C] text-xs font-bold uppercase tracking-widest">
              <KebabSkewer size={18} />
              <span>{lang === "ar" ? "شواية الفحم المميزة" : lang === "tr" ? "İmza Mangal Lezzetleri" : lang === "ru" ? "Фирменный мангал" : lang === "fa" ? "کباب زغال اخته" : lang === "fr" ? "Grillade au charbon" : lang === "de" ? "Holzkohlegrill" : lang === "it" ? "Griglia a carbone" : lang === "es" ? "Parrilla de carbón" : lang === "zh" ? "炭火烤肉" : "Signature Charcoal Grill"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {lang === "ar" ? "أضنة كباب الأصلي" : lang === "tr" ? "Gerçek Adana Kebap" : "Authentic Adana Kebap"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {lang === "ar" ? "محضر يدوياً باستخدام سكاكين الزره التقليدية ومحمر ببطء على الفحم النقي لضمان قوام عصاري ونكهة مدخنة عميقة." : lang === "tr" ? "Geleneksel zırh kıymasıyla hazırlanan ve saf meşe kömüründe yavaş yavaş pişirilen, sulu dokusu ve derin isli aromasıyla eşsiz bir lezzet." : "Hand-minced using traditional zırh knives and slow-roasted over pure oak charcoal, ensuring a juicy texture and deep smoky flavor."}
            </p>
          </div>
        </section>

        {/* Item 2: Wood-fired Pide (Text Left, Image Right) */}
        <section ref={item2Ref} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 transition-all duration-1000 ease-out ${isItem2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#9C7A3F] text-xs font-bold uppercase tracking-widest">
              <StoneOven size={18} />
              <span>{lang === "ar" ? "فرن الحطب" : lang === "tr" ? "Odun Ateşi Fırını" : lang === "ru" ? "Дровяная печь" : lang === "fa" ? "تنور هیزمی" : lang === "fr" ? "Four à bois" : lang === "de" ? "Holzofen" : lang === "it" ? "Forno a legna" : lang === "es" ? "Horno de leña" : lang === "zh" ? "柴火烤炉" : "Wood-Fired Oven"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {lang === "ar" ? "فطائر لحم بعجين (بيدة)" : lang === "tr" ? "Odun Ateşinde Pide" : "Wood-Fired Pide"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {lang === "ar" ? "تخبز يومياً في فرن الحطب الحجري، حيث تمتزج العجينة الرقيقة المقرمشة مع اللحوم الطازجة والأجبان المحلية." : lang === "tr" ? "İncecik, çıtır çıtır hamurun taze et ve yöresel peynirlerle buluştuğu, taş fırında günlük olarak pişirilen geleneksel lezzet." : "Baked daily in our stone wood-fired oven. Crispy, thin crust meets fresh meats and regional cheeses for the ultimate Turkish flatbread."}
            </p>
          </div>
          <div className="flex-1 w-full aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/lahmacun.webp" alt="Wood-fired Pide" fill style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-1000" />
          </div>
        </section>

        {/* Item 3: Turkish Breakfast (Image Left, Text Right) */}
        <section ref={item3Ref} className={`flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 transition-all duration-1000 ease-out ${isItem3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex-1 w-full aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/menemen.webp" alt="Turkish Breakfast & Menemen" fill style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#4E5F4C] text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#4E5F4C]"></span>
              <span>{lang === "ar" ? "طقوس الصباح" : lang === "tr" ? "Sabah Ritüeli" : lang === "ru" ? "Утренний ритуал" : lang === "fa" ? "آیین صبحانه" : lang === "fr" ? "Rituel matinal" : lang === "de" ? "Morgenritual" : lang === "it" ? "Rituale mattutino" : lang === "es" ? "Ritual matutino" : lang === "zh" ? "早餐仪式" : "Morning Ritual"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {lang === "ar" ? "الإفطار والمينمن" : lang === "tr" ? "Kahvaltı & Menemen" : "Breakfast & Menemen"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {lang === "ar" ? "ابدأ يومك بتشكيلة الإفطار (Serpme Kahvaltı) الغنية، ومقلاة المينمن الساخنة مع الطماطم الطازجة والبيض." : lang === "tr" ? "Zengin Serpme Kahvaltımız ve taze domates, biber ve yumurtayla hazırlanan sıcacık menemenimizle güne başlayın." : "Start your day with our rich Serpme Kahvaltı spread and sizzling copper pans of Menemen made with fresh tomatoes and eggs."}
            </p>
          </div>
        </section>

      </div>

      {/* ═══════════════════════════════════════════
          3. ASYMMETRIC CINEMATIC GALLERY
          ═══════════════════════════════════════════ */}
      <section ref={galleryRef} className={`py-24 px-4 max-w-7xl mx-auto transition-all duration-1000 ease-out ${isGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#9C7A3F] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
            <span>{lang === "ar" ? "أجواء وأطباق" : lang === "tr" ? "Atmosfer & Lezzet" : "Atmosphere & Flavors"}</span>
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620] uppercase" style={{ fontFamily: "var(--font-cairo)" }}>
            {lang === "ar" ? "معرض الصور" : lang === "tr" ? "Galeri" : "Visual Journey"}
          </h2>
        </div>

        {/* Asymmetric Masonry-style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 auto-rows-[300px]">
          {/* Large Hero Image */}
          <div className="md:col-span-8 md:row-span-2 relative rounded-3xl overflow-hidden shadow-lg group">
            <Image src="/images/Serpme-Kahvalti-2-Kisilik.webp" alt="Serpme Kahvaltı" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" sizes="(max-width: 768px) 100vw, 66vw" />
            <div className="absolute inset-0 bg-[#2B2620]/10 mix-blend-overlay"></div>
          </div>
          {/* Top Right Small */}
          <div className="md:col-span-4 md:row-span-1 relative rounded-3xl overflow-hidden shadow-lg group">
            <Image src="/images/karisik_meze.webp" alt="Turkish Meze" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          {/* Bottom Right Small */}
          <div className="md:col-span-4 md:row-span-1 relative rounded-3xl overflow-hidden shadow-lg group">
            <Image src="/images/durum.webp" alt="Kebab Roll" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3.5. HERITAGE TIMELINE (1998 → 2026)
          ═══════════════════════════════════════════ */}
      <section ref={timelineRef} className={`py-20 sm:py-28 px-4 max-w-4xl mx-auto transition-all duration-1000 ease-out ${isTimelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="text-center mb-14 space-y-4">
          <span className="text-[#9C7A3F] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
            <span>{lang === "ar" ? "رحلة 28 عاماً" : lang === "tr" ? "28 Yıllık Yolculuk" : lang === "ru" ? "28 лет пути" : lang === "fa" ? "سفر ۲۸ ساله" : lang === "fr" ? "28 ans de voyage" : lang === "de" ? "28 Jahre Reise" : "28 Years Journey"}</span>
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
            {lang === "ar" ? "إرث من الأب إلى الابن" : lang === "tr" ? "Babadan Oğula Miras" : lang === "ru" ? "Наследие от отца к сыну" : lang === "fa" ? "میراث پدر به پسر" : lang === "fr" ? "Un héritage de père en fils" : lang === "de" ? "Erbe von Vater zu Sohn" : "A Legacy from Father to Son"}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute start-6 sm:start-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#9C7A3F]/60 via-[#4E5F4C]/40 to-[#9C7A3F]/60 sm:-translate-x-px"></div>

          {/* Timeline Events */}
          <div className="space-y-12 sm:space-y-16">
            {/* 1998 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="hidden sm:block sm:w-1/2 sm:pe-12 text-end">
                <div className="inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {lang === "ar" ? "افتتح الأخوة مطعمهم الصغير في زاوية حي فيروز آغا بجيهانغير، مع فرن حطب واحد وشواية فحم بلوط." : lang === "tr" ? "Kardeşler, Firuzağa köşesinde küçük bir lokanta olarak açıldı. Tek bir odun fırını ve meşe kömürü mangalıyla hizmete başladı." : "Brothers opened their small eatery on the Firuzağa corner of Cihangir, with one wood-fired oven and an oak charcoal grill."}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[#4E5F4C] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                '98
              </div>
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:ms-auto">
                <h3 className="sm:hidden text-xl font-black text-[#4E5F4C]" style={{ fontFamily: "var(--font-cairo)" }}>1998</h3>
                <h3 className="hidden sm:block text-xl font-black text-[#4E5F4C] ps-12" style={{ fontFamily: "var(--font-cairo)" }}>1998</h3>
                <p className="sm:hidden text-[#2B2620] text-sm font-medium leading-relaxed mt-1">
                  {lang === "ar" ? "افتتح الأخوة مطعمهم الصغير في زاوية حي فيروز آغا بجيهانغير." : lang === "tr" ? "Kardeşler, Firuzağa köşesinde küçük bir lokanta olarak açıldı." : "Brothers opened their small eatery in Cihangir."}
                </p>
              </div>
            </div>

            {/* 2005 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:pe-12 sm:text-end">
                <h3 className="text-xl font-black text-[#9C7A3F]" style={{ fontFamily: "var(--font-cairo)" }}>2005</h3>
                <p className="text-[#2B2620] text-sm font-medium leading-relaxed mt-1 sm:hidden">
                  {lang === "ar" ? "توسع المطعم وأصبح وجهة معروفة لعشاق الكباب في بيوغلو." : lang === "tr" ? "Restoran genişledi ve Beyoğlu'nda kebap severler arasında bilinen bir mekan haline geldi." : "The restaurant expanded and became a known destination for kebab lovers in Beyoğlu."}
                </p>
                <div className="hidden sm:inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm mt-2">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {lang === "ar" ? "توسع المطعم وأصبح وجهة معروفة لعشاق الكباب في بيوغلو. المنيو يتوسع ليشمل البيدة واللحم بعجين." : lang === "tr" ? "Restoran genişledi. Menü, pide ve lahmacun çeşitleriyle zenginleşti. Beyoğlu'nda tanınan bir mekan." : "Restaurant expanded. Menu enriched with pide and lahmacun varieties. A known spot in Beyoğlu."}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[#9C7A3F] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                '05
              </div>
              <div className="hidden sm:block sm:w-1/2"></div>
            </div>

            {/* 2015 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="hidden sm:block sm:w-1/2 sm:pe-12 text-end">
                <div className="inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {lang === "ar" ? "الجيل الثاني يتولى الإدارة، مع الحفاظ على نفس الوصفات العائلية الأصلية ونفس نار الفحم." : lang === "tr" ? "İkinci nesil devraldı. Aynı aile tarifleri, aynı ateş, aynı gelenek. Yeni enerji ile eski lezzet." : "Second generation takes over. Same family recipes, same fire, same tradition — fresh energy with timeless taste."}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[#4E5F4C] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                '15
              </div>
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:ms-auto">
                <h3 className="sm:hidden text-xl font-black text-[#4E5F4C]" style={{ fontFamily: "var(--font-cairo)" }}>2015</h3>
                <h3 className="hidden sm:block text-xl font-black text-[#4E5F4C] ps-12" style={{ fontFamily: "var(--font-cairo)" }}>2015</h3>
                <p className="sm:hidden text-[#2B2620] text-sm font-medium leading-relaxed mt-1">
                  {lang === "ar" ? "الجيل الثاني يتولى الإدارة مع نفس الوصفات العائلية." : lang === "tr" ? "İkinci nesil devraldı. Aynı tarifler, aynı ateş." : "Second generation takes over with the same recipes."}
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:pe-12 sm:text-end">
                <h3 className="text-xl font-black text-[#9C7A3F]" style={{ fontFamily: "var(--font-cairo)" }}>2026</h3>
                <p className="text-[#2B2620] text-sm font-medium leading-relaxed mt-1 sm:hidden">
                  {lang === "ar" ? "28 سنة من العراقة. أكثر من 106 طبق. وما زلنا نطهو بنفس الحب." : lang === "tr" ? "28 yıl gelenek. 106+ çeşit. Hâlâ aynı aşkla pişiriyoruz." : "28 years of heritage. 106+ dishes. Still cooking with the same love."}
                </p>
                <div className="hidden sm:inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm mt-2">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {lang === "ar" ? "28 سنة من العراقة. أكثر من 106 طبق و11 فئة. 1280+ تقييم على Google. وما زلنا نطهو بنفس الحب والنار الأولى." : lang === "tr" ? "28 yıl gelenek. 106+ çeşit, 11 kategori. Google'da 1.280+ yorum. Hâlâ ilk günkü aşk ve ateşle pişiriyoruz." : "28 years of heritage. 106+ dishes, 11 categories. 1,280+ Google reviews. Still cooking with the same love and fire."}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#9C7A3F] to-[#4E5F4C] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                <Star size={18} weight="fill" />
              </div>
              <div className="hidden sm:block sm:w-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3.7. VERIFIED GOOGLE REVIEWS
          ═══════════════════════════════════════════ */}
      <section ref={reviewsRef} className={`transition-all duration-1000 ease-out ${isReviewsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <LandingVerifiedReviews currentLocale={lang} />
      </section>

      {/* ═══════════════════════════════════════════
          4. MINIMALIST LOCATION & CONTACT
          ═══════════════════════════════════════════ */}
      <section ref={contactRef} className={`py-20 px-4 max-w-5xl mx-auto transition-all duration-1000 ease-out ${isContactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="bg-[#F7F2E7]/80 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 border border-[#9C7A3F]/10 shadow-sm flex flex-col md:flex-row gap-12">
          
          <div className="flex-1 flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#2B2620] mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.locationTitle || (lang === "ar" ? "الموقع والتواصل" : lang === "tr" ? "Konum ve İletişim" : "Location & Contact")}
              </h3>
              <p className="text-sm text-[#7A7364] font-medium uppercase tracking-widest mt-1">
                {t.locationSubtitle || "Taksim Meydanı'na 5 Dakika Mesafede"}
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#EDE3CE] flex items-center justify-center shrink-0 group-hover:bg-[#4E5F4C] group-hover:text-[#EDE3CE] transition-colors">
                  <MapPin size={20} />
                </div>
                <div className="pt-1">
                  <p className="text-[#2B2620] text-sm sm:text-base font-medium leading-relaxed max-w-sm group-hover:text-[#9C7A3F] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                    Firuzağa Mah. Firuzağa Camii Sok. No:1A, Cihangir, Beyoğlu, İstanbul
                  </p>
                </div>
              </a>
              
              <a href="tel:+902122513696" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#EDE3CE] flex items-center justify-center shrink-0 group-hover:bg-[#4E5F4C] group-hover:text-[#EDE3CE] transition-colors">
                  <Phone size={20} />
                </div>
                <p className="text-[#2B2620] text-sm sm:text-base font-semibold group-hover:text-[#9C7A3F] transition-colors">
                  +90 212 251 36 96
                </p>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDE3CE] flex items-center justify-center shrink-0 text-[#7A7364]">
                  <Clock size={20} />
                </div>
                <p className="text-[#7A7364] text-sm sm:text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                  {lang === "ar" ? "يومياً: 09:00 ص – 02:00 ص" : lang === "tr" ? "Her Gün: 09:00 – 02:00" : "Everyday: 09:00 AM – 02:00 AM"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative min-h-[300px] md:min-h-full rounded-2xl overflow-hidden shadow-lg border border-[#9C7A3F]/10">
            <RestaurantMap heightClass="absolute inset-0 w-full h-full" />
          </div>

        </div>
      </section>

    </div>
  );
}
