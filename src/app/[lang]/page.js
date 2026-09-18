"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { MapPin, CaretDown, ArrowRight, Medal, Phone, Clock, Star } from "@phosphor-icons/react";
import LandingVerifiedReviews from "@/components/LandingVerifiedReviews";
import { OttomanStar, OttomanSeal, KebabSkewer, StoneOven } from "@/components/BrandIcons";
import RestaurantMap from "@/components/RestaurantMap";

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


const timelineContent = {
  badge: {
    tr: "28 Yıllık Yolculuk",
    en: "28 Years Journey",
    ar: "رحلة 28 عاماً من الأصالة",
    fa: "سفر ۲۸ ساله اصالت",
    ru: "28 лет кулинарного пути",
    fr: "28 ans d'histoire culinaire",
    de: "28 Jahre kulinarische Reise",
    it: "Un viaggio lungo 28 anni",
    es: "Un viaje culinario de 28 años",
    zh: "28年传承之旅",
  },
  title: {
    tr: "Babadan Oğula Miras",
    en: "A Legacy from Father to Son",
    ar: "إرث عائلي من الأب إلى الابن",
    fa: "میراثی ماندگار از پدر به پسر",
    ru: "Наследие от отца к сыну",
    fr: "Un héritage transmis de père en fils",
    de: "Ein Erbe von Vater zu Sohn",
    it: "Un'eredità da padre in figlio",
    es: "Un legado de padres a hijos",
    zh: "父子相传的匠心传承",
  },
  e1998: {
    tr: "Kardeşler, Firuzağa köşesinde küçük bir lokanta olarak açıldı. Tek bir odun fırını ve meşe kömürü mangalıyla hizmete başladı.",
    en: "Brothers opened their small eatery on the Firuzağa corner of Cihangir, with one wood-fired oven and an oak charcoal grill.",
    ar: "افتتح الإخوة مطعمهم الصغير في زاوية فيروز آغا بجيهانكير، بفرن حطب حجري وشواية فحم بلوط نقية.",
    fa: "برادران رستوران کوچک خود را در گوشه فیروزآقا جهانگیر با یک تنور هیزمی و منقل زغال بلوط افتتاح کردند.",
    ru: "Братья открыли небольшое заведение на углу Фирузага в Джихангире с одной дровяной печью и мангалом на дубовых углях.",
    fr: "Les frères ouvrent leur petit restaurant au coin de Firuzağa à Cihangir, avec un four à bois et un gril au charbon de chêne.",
    de: "Die Brüder eröffneten ihr kleines Lokal an der Firuzağa-Ecke in Cihangir mit einem Holzofen und einem Eichenholzkohlegrill.",
    it: "I fratelli aprono il loro locale all'angolo di Firuzağa a Cihangir, con un forno a legna e una brace a carbone di quercia.",
    es: "Los hermanos abrieron su pequeño restaurante en la esquina de Firuzağa en Cihangir, con un horno de leña y parrilla de carbón de roble.",
    zh: "兄弟俩在吉汉吉尔的 Firuzağa 街角创办了这家小店，凭着一座木柴烤炉和一个橡木炭火烤炉开启了美食之旅。",
  },
  e2005: {
    tr: "Restoran genişledi. Menü, taş fırında pişen çıtır pide ve zırh kıyması lahmacun çeşitleriyle zenginleşti. Beyoğlu'nda tanınan bir lezzet durağı haline geldi.",
    en: "The restaurant expanded. The menu was enriched with stone-oven baked pides and hand-minced lahmacuns, becoming a landmark in Beyoğlu.",
    ar: "توسع المطعم وأصبح وجهة شهيرة لعشاق الكباب في بيوغلو، وتوسعت القائمة لتشمل الفطائر والبيدة واللحم بعجين المقرمش.",
    fa: "رستوران گسترش یافت و به مقصدی مشهور برای عاشقان کباب در بی اوغلو تبدیل شد و منو با انواع پیده و لاهماجون تنوری غنی‌تر گشت.",
    ru: "Ресторан расширился и стал известным местом для ценителей кебаба в Бейоглу. Меню пополнилось пиде и лахмаджуном из каменной печи.",
    fr: "Le restaurant s'agrandit et devient une adresse réputée de Beyoğlu, enrichissant sa carte de pides croustillantes et de lahmacuns au feu de bois.",
    de: "Das Restaurant vergrößerte sich und wurde zu einer bekannten Adresse in Beyoğlu, erweitert um knusprige Pide und Lahmacun aus dem Steinofen.",
    it: "Il ristorante si espande e diventa un punto di riferimento a Beyoğlu, arricchendo il menu con pide croccanti e lahmacun cotti nel forno a legna.",
    es: "El restaurante se amplió y se convirtió en un destino reconocido en Beyoğlu, incorporando pides crujientes y lahmacun al horno de leña.",
    zh: "餐厅规模扩大，成为贝伊奥卢地区知名的烤肉胜地，菜单新增了石炉烤制的香脆土耳其披萨（Pide）和薄饼（Lahmacun）。",
  },
  e2015: {
    tr: "İkinci nesil devraldı. Aynı aile tarifleri, aynı odun ateşi, aynı esnaf geleneği. Yeni enerji ile zamansız lezzet geleceğe taşındı.",
    en: "Second generation takes over. Same family recipes, same fire, same artisan tradition—fresh energy with timeless taste.",
    ar: "الجيل الثاني يتولى الإدارة، مع التمسك الصارم بنفس الوصفات العائلية الأصيلة ونفس نار الفحم والضيافة الدافئة.",
    fa: "نسل دوم مدیریت را بر عهده گرفت؛ با حفظ دقیق همان دستورپخت‌های خانوادگی، همان آتش زغال و سنت اصیل مهمان‌نوازی.",
    ru: "Второе поколение принимает руководство. Те же семейные рецепты, тот же живой огонь и традиции ремесленного мастерства.",
    fr: "La deuxième génération prend la relève. Mêmes recettes familiales, même feu de braise, même tradition artisanale et passion intemporelle.",
    de: "Die zweite Generation übernimmt. Dieselben Familienrezepte, dasselbe Feuer, dieselbe Handwerkstradition – zeitloser Geschmack mit neuer Energie.",
    it: "La seconda generazione prende le redini. Stesse ricette di famiglia, stesso fuoco e tradizione artigianale che unisce passato e futuro.",
    es: "La segunda generación toma el relevo. Las mismas recetas familiares, el mismo fuego y la misma tradición artesanal con energía renovada.",
    zh: "第二代传承人接棒经营。秉持相同的家族秘方、相同的炭火技艺与工匠传统，为经典美味注入现代活力。",
  },
  e2026: {
    tr: "28 yıllık köklü gelenek. 106+ lezzet çeşidi, 11 kategori. Google'da 1.280+ doğrulanmış misafir yorumu. Hâlâ ilk günkü aşk ve ateşle pişiriyoruz.",
    en: "28 years of culinary heritage. 106+ dishes across 11 categories. Over 1,280+ verified Google reviews. Still cooking with the same love and fire.",
    ar: "28 عاماً من العراقة والريادة. أكثر من 106 أطباق ضمن 11 فئة متنوعة. أكثر من 1,280 تقييم معتمد على Google. وما زلنا نطهو بنفس الشغف والنار الأولى.",
    fa: "۲۸ سال اصالت و افتخار. بیش از ۱۰۶ نوع غذای متنوع در ۱۱ دسته‌بندی. بیش از ۱۲۸۰ نظر تایید شده در گوگل. همچنان با همان عشق و حرارت می‌پزیم.",
    ru: "28 лет гастрономического наследия. Более 106 блюд в 11 категориях. 1 280+ отзывов на Google. Мы готовим с той же любовью и страстью.",
    fr: "28 ans d'héritage culinaire. Plus de 106 plats dans 11 catégories. Plus de 1 280 avis vérifiés sur Google. Cuisiné avec le même amour et la même flamme.",
    de: "28 Jahre kulinarische Tradition. Über 106 Spezialitäten in 11 Kategorien. Mehr als 1.280 verifizierte Google-Bewertungen. Zubereitet mit derselben Liebe und Glut.",
    it: "28 anni di tradizione gastronomica. Oltre 106 piatti in 11 categorie. Più di 1.280 recensioni verificate su Google. Cucinati con lo stesso amore e fuoco.",
    es: "28 años de tradición culinaria. Más de 106 platos en 11 categorías. Más de 1.280 reseñas verificadas en Google. Cocinados con el mismo amor y fuego.",
    zh: "28年深厚美食底蕴。11大品类超过106道佳肴，Google 地图上超过1,280+条真实好评。始终以最初的热情与炭火精心烹制。",
  }
};

export default function Home() {
  const { t, lang } = useAppContext();
  const [heroVisible, setHeroVisible] = useState(false);
  const [timeBasedHero, setTimeBasedHero] = useState("default");

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
    
    // Time-based CRO: Show breakfast if it's between 8 AM and 3 PM local time
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 15) {
      setTimeBasedHero("breakfast");
    }
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
            <span className="uppercase">
              {{
                tr: "Cihangir, İstanbul",
                en: "Cihangir, Istanbul",
                ar: "جيهانغير، إسطنبول",
                fa: "جهانگیر، استانبول",
                ru: "Джихангир, Стамбул",
                fr: "Cihangir, Istanbul",
                de: "Cihangir, Istanbul",
                it: "Cihangir, Istanbul",
                es: "Cihangir, Estambul",
                zh: "伊斯坦布尔 · 吉汉吉尔"
              }[lang] || "Cihangir, Istanbul"}
            </span>
          </div>

          {/* Main Brand Lockup */}
          <div className="flex flex-col items-center space-y-3">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-lg"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {timeBasedHero === "breakfast" 
                ? ({
                    tr: "Türk Kahvaltısı",
                    en: "Turkish Breakfast",
                    ar: "إفطار تركي",
                    ru: "Турецкий завтрак",
                    fa: "صبحانه ترکی",
                    fr: "Petit-Déjeuner Turc",
                    de: "Türkisches Frühstück",
                    it: "Colazione Turca",
                    es: "Desayuno Turco",
                    zh: "土耳其传统早餐"
                  }[lang] || "Turkish Breakfast")
                : (t.welcome || "Kardeşler")}
            </h1>
            
            <div className="flex items-center gap-4 w-full max-w-xs mx-auto opacity-80">
              <div className="h-px bg-[#EDE3CE]/40 flex-1"></div>
              <p 
                className="text-[#9C7A3F] text-sm sm:text-base md:text-lg font-bold tracking-[0.4em] uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {timeBasedHero === "breakfast" 
                  ? ({
                      tr: "GÜNAYDIN",
                      en: "GOOD MORNING",
                      ar: "صباح الخير",
                      ru: "ДОБРОЕ УТРО",
                      fa: "صبح بخیر",
                      fr: "BONJOUR",
                      de: "GUTEN MORGEN",
                      it: "BUONGIORNO",
                      es: "BUENOS DÍAS",
                      zh: "早上好"
                    }[lang] || "GOOD MORNING")
                  : (t.heroTagline || "KEBAP & PİDE")}
              </p>
              <div className="h-px bg-[#EDE3CE]/40 flex-1"></div>
            </div>
          </div>

          {/* Minimalist Tagline */}
          <p
            className="text-[#EDE3CE]/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-md mx-auto pt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {timeBasedHero === "breakfast"
              ? ({
                  tr: "Güne Taksim'in en iyi kahvaltısıyla başlayın",
                  en: "Start your day with the best breakfast spread in Taksim",
                  ar: "ابدأ يومك بأفضل تشكيلة إفطار في تقسيم",
                  ru: "Начните день с лучшего турецкого завтрака в Таксиме",
                  fa: "روز خود را با بهترین صبحانه سنتی ترکی در نزدیکی تقسیم آغاز کنید",
                  fr: "Commencez votre journée avec le meilleur petit-déjeuner de Taksim",
                  de: "Beginnen Sie Ihren Tag mit dem besten Frühstücksangebot in Taksim",
                  it: "Inizia la giornata con la migliore colazione vicino a Taksim",
                  es: "Comienza el día con el mejor desayuno tradicional en Taksim",
                  zh: "在塔克西姆享用最地道的土耳其传统早餐开启新的一天"
                }[lang] || "Start your day with the best breakfast spread in Taksim")
              : (t.subtitle || "Where tradition meets taste in the heart of Cihangir")}
          </p>

          {/* Refined Stats Block */}
          <div className="bg-[#F7F2E7]/60 backdrop-blur-md border border-[#9C7A3F]/20 rounded-2xl py-5 px-8 mt-6 shadow-sm w-full max-w-md">
            <div className="flex items-center justify-between divide-x divide-[#9C7A3F]/20">
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">106</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{t.statsDishes || t.dishesCountText || "ÇEŞİT"}</span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">11</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{t.statsCategories || t.categories || "KATEGORİ"}</span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2">
                <span className="text-3xl font-black text-[#2B2620] mb-1">28</span>
                <span className="text-[10px] font-bold text-[#7A7364] uppercase tracking-widest">{t.statsYears || "YILLIK GELENEK"}</span>
              </div>
            </div>
          </div>

          {/* Elegant CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <Link
              href={timeBasedHero === "breakfast" ? "/menu?category=kahvalti" : "/menu"}
              className="w-full sm:w-auto min-h-[56px] px-10 bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 group"
            >
              <span>
                {timeBasedHero === "breakfast" 
                  ? (t.orderBreakfastCta || "KAHVALTI SİPARİŞİ VER") 
                  : (t.exploreMenu || "MENÜYÜ KEŞFET")}
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[56px] px-10 bg-transparent hover:bg-[#F7F2E7] text-[#4E5F4C] border border-[#4E5F4C] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <span>{t.callToOrder || "TELEFONLA SİPARİŞ"}</span>
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
              {t.ourStoryDesc || "For over 28 years in the heart of Cihangir, we have been serving authentic Turkish flavors—from hand-minced Adana kebab to wood-fired baked pide."}
            </p>
          </div>
          <div className="flex-1 w-full aspect-square md:aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/adana.webp" alt="Authentic Charcoal Kebab — Kardeşler Cihangir Since 1998" fill style={{ objectFit: 'cover' }} className="hover:scale-105 transition-transform duration-1000" />
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
              <span>{t.adanaBadge || "Signature Charcoal Grill"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.adanaTitle || "Authentic Adana Kebap"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {t.adanaDesc || "Hand-minced using traditional zırh knives and slow-roasted over pure oak charcoal, ensuring a juicy texture and deep smoky flavor."}
            </p>
          </div>
        </section>

        {/* Item 2: Wood-fired Pide (Text Left, Image Right) */}
        <section ref={item2Ref} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 transition-all duration-1000 ease-out ${isItem2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#9C7A3F] text-xs font-bold uppercase tracking-widest">
              <StoneOven size={18} />
              <span>{t.pideBadge || "Wood-Fired Stone Oven"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.pideTitle || "Wood-Fired Pide"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {t.pideDesc || "Baked daily in our stone wood-fired oven. Crispy, thin crust meets fresh meats and regional cheeses for the ultimate Turkish flatbread."}
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
              <span>{t.breakfastBadge || "Morning Ritual"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.breakfastTitle || "Breakfast & Menemen"}
            </h2>
            <p className="text-[#7A7364] text-sm sm:text-base leading-loose max-w-lg mx-auto md:mx-0" style={{ fontFamily: "var(--font-inter)" }}>
              {t.breakfastDesc || "Start your day with our rich Serpme Kahvaltı spread and sizzling copper pans of Menemen made with fresh tomatoes and eggs."}
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
            <span>{t.galleryBadge || "Atmosphere & Flavors"}</span>
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620] uppercase" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.galleryTitle || "Visual Journey"}
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
          3.6. HERITAGE TIMELINE (1998 -> 2026)
          ═══════════════════════════════════════════ */}
      <section ref={timelineRef} className={`py-24 px-4 max-w-5xl mx-auto transition-all duration-1000 ease-out ${isTimelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#9C7A3F] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
            <span>{timelineContent.badge[lang] || timelineContent.badge.en}</span>
            <span className="w-12 h-px bg-[#9C7A3F]/50"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
            {timelineContent.title[lang] || timelineContent.title.en}
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
                    {timelineContent.e1998[lang] || timelineContent.e1998.en}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[#4E5F4C] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                '98
              </div>
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:ms-auto">
                <h3 className="text-xl font-black text-[#4E5F4C] sm:ps-12" style={{ fontFamily: "var(--font-cairo)" }}>1998</h3>
                <p className="sm:hidden text-[#2B2620] text-sm font-medium leading-relaxed mt-1">
                  {timelineContent.e1998[lang] || timelineContent.e1998.en}
                </p>
              </div>
            </div>

            {/* 2005 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:pe-12 sm:text-end">
                <h3 className="text-xl font-black text-[#9C7A3F]" style={{ fontFamily: "var(--font-cairo)" }}>2005</h3>
                <p className="text-[#2B2620] text-sm font-medium leading-relaxed mt-1 sm:hidden">
                  {timelineContent.e2005[lang] || timelineContent.e2005.en}
                </p>
                <div className="hidden sm:inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm mt-2">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {timelineContent.e2005[lang] || timelineContent.e2005.en}
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
                    {timelineContent.e2015[lang] || timelineContent.e2015.en}
                  </p>
                </div>
              </div>
              <div className="absolute start-6 sm:start-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-[#4E5F4C] text-[#EDE3CE] flex items-center justify-center font-black text-sm shadow-lg border-4 border-[#EDE3CE] z-10">
                '15
              </div>
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:ms-auto">
                <h3 className="text-xl font-black text-[#4E5F4C] sm:ps-12" style={{ fontFamily: "var(--font-cairo)" }}>2015</h3>
                <p className="sm:hidden text-[#2B2620] text-sm font-medium leading-relaxed mt-1">
                  {timelineContent.e2015[lang] || timelineContent.e2015.en}
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="ps-20 sm:ps-0 sm:w-1/2 sm:pe-12 sm:text-end">
                <h3 className="text-xl font-black text-[#9C7A3F]" style={{ fontFamily: "var(--font-cairo)" }}>2026</h3>
                <p className="text-[#2B2620] text-sm font-medium leading-relaxed mt-1 sm:hidden">
                  {timelineContent.e2026[lang] || timelineContent.e2026.en}
                </p>
                <div className="hidden sm:inline-block bg-[#F7F2E7] border border-[#9C7A3F]/25 rounded-xl p-5 shadow-sm max-w-sm mt-2">
                  <p className="text-[#2B2620] text-sm font-semibold leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {timelineContent.e2026[lang] || timelineContent.e2026.en}
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
                {t.locationTitle || "Location & Contact"}
              </h3>
              <p className="text-sm text-[#7A7364] font-medium uppercase tracking-widest mt-1">
                {t.locationSubtitle || "5 Minutes from Taksim Square"}
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
                  {t.locationHours || "Everyday: 09:00 AM – 02:00 AM"}
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
