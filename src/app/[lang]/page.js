"use client";

import React, { useState, useRef, useEffect } from "react";
import { menuData } from "@/data/menuData";
import FoodCard from "@/components/FoodCard";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { MapPin, CaretDown, ArrowRight, Medal } from "@phosphor-icons/react";
import { OttomanStar, OttomanSeal, KebabSkewer, StoneOven } from "@/components/BrandIcons";
import RestaurantMap from "@/components/RestaurantMap";

// Hook: Intersection Observer for scroll-reveal animations
function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function Home() {
  const [googleRating, setGoogleRating] = useState("4.6");
  const { t, lang } = useAppContext();
  const menuRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // Scroll-reveal refs for each section
  const [trendingRef, isTrendingVisible] = useReveal();
  const [storyRef, isStoryVisible] = useReveal();
  const [infoRef, isInfoVisible] = useReveal();

  const handleTrendingRef = (el) => {
    menuRef.current = el;
    if (trendingRef) trendingRef.current = el;
  };

  useEffect(() => {
    requestAnimationFrame(() => setHeroVisible(true));

    // Fetch live Google rating score dynamically from /api/reviews
    async function fetchLiveRating() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          const googleData = data.platforms?.find(p => p.id === "google");
          if (googleData?.rating) {
            setGoogleRating(googleData.rating);
          }
        }
      } catch (e) {
        console.warn("Failed to load live reviews rating", e);
      }
    }
    fetchLiveRating();
  }, []);

  // Extract trending items
  // Select explicit Chef's selections
  const chefSelectionIds = ["serpme_kahvalti", "menemen", "adana_urfa"];
  const allItems = menuData.flatMap(cat => cat.items || []);
  const chefItems = chefSelectionIds.map(id => allItems.find(item => item && item.id === id)).filter(Boolean);

  const scrollToTrending = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pb-8 bg-[#EDE3CE] min-h-screen text-[#2B2620] font-sans">
      
      {/* ═══════════════════════════════════════════
          HERO SECTION — Mobile-First Turkish Heritage Lockup
          ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden bg-[#EDE3CE]">
        
        {/* Background Image */}
        <div className="hero-bg">
          <Image
            src="/images/hero-bg.webp"
            alt="Kardeşler Kebap — Authentic Turkish Restaurant in Cihangir, Istanbul"
            aria-hidden="true"
            priority={true}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            sizes="100vw"
            quality={80}
          />
        </div>

        <div className={`relative z-10 w-full max-w-xl mx-auto space-y-4 transition-opacity duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
          
          {/* 1. Address Bar Pill (44px min height, olive icon, crisp text) */}
          <div className="flex items-center justify-center mb-1">
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-[#9C7A3F]/30 bg-[#F7F2E7] text-xs font-semibold tracking-wide transition-colors cursor-pointer group shadow-xs hover:border-[#9C7A3F] max-w-full text-center"
            >
              <MapPin size={14} className="text-[#4E5F4C] shrink-0" />
              <span className="text-[#2B2620] truncate sm:whitespace-normal">
                {t.heroLocation || "Firuzağa Mah. Firuzağa Camii Sok. No:1A, Cihangir, Beyoğlu"}
              </span>
            </a>
          </div>

          {/* 2. Top Heritage Divider (Thin line — OttomanSeal — Thin line) */}
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="w-12 sm:w-16 h-px bg-[#9C7A3F]/40"></div>
            <OttomanSeal size={18} className="text-[#9C7A3F]" />
            <div className="w-12 sm:w-16 h-px bg-[#9C7A3F]/40"></div>
          </div>

          {/* 3. Restaurant Brand Lockup */}
          <div className="space-y-1">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black text-[#2B2620] tracking-tight leading-none"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.welcome || "Kardeşler"}
            </h1>
            <p 
              className="text-[#9C7A3F] text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t.heroTagline || "KEBAP & PİDE"}
            </p>
          </div>

          {/* 4. Ottoman Ornament Divider (────── ◈ ──────) */}
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="w-14 sm:w-20 h-px bg-[#4E5F4C]/30"></div>
            <OttomanStar size={16} className="text-[#9C7A3F]" />
            <div className="w-14 sm:w-20 h-px bg-[#4E5F4C]/30"></div>
          </div>

          {/* 5. Short Brand Tagline */}
          <p
            className="text-[#7A7364] text-sm sm:text-base font-medium leading-relaxed max-w-sm sm:max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t.subtitle || "Cihangir'in kalbinde, geleneksel lezzetlerin buluşma noktası"}
          </p>

          {/* 6. Premium Restaurant Statistics Block */}
          <div className="bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-xl p-3 sm:p-4 my-4 max-w-xs sm:max-w-sm mx-auto shadow-xs">
            <div className="flex items-center justify-around divide-x divide-[#9C7A3F]/30">
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center gap-1.5 text-[#4E5F4C]">
                  <KebabSkewer size={16} className="text-[#4E5F4C]" />
                  <span className="text-2xl sm:text-3xl font-black text-[#2B2620]">106</span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#7A7364] uppercase tracking-wider mt-0.5">ÇEŞİT</span>
              </div>
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center gap-1.5 text-[#9C7A3F]">
                  <Medal size={16} className="text-[#9C7A3F]" />
                  <span className="text-2xl sm:text-3xl font-black text-[#2B2620]">25+</span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#7A7364] uppercase tracking-wider mt-0.5">YIL GELENEK</span>
              </div>
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center gap-1.5 text-[#9C7A3F]">
                  <StoneOven size={16} className="text-[#9C7A3F]" />
                  <span className="text-2xl sm:text-3xl font-black text-[#2B2620]">11</span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#7A7364] uppercase tracking-wider mt-0.5">KATEGORİ</span>
              </div>
            </div>
          </div>

          {/* 7. CTAs — MENÜYÜ KEŞFET & CALL TO ORDER */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/menu"
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-8 bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-3 group"
            >
              <span>{t.exploreMenu || (lang === "ar" ? "استكشف القائمة" : lang === "en" ? "EXPLORE MENU" : "MENÜYÜ KEŞFET")}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-8 bg-[#F7F2E7] hover:bg-[#EDE3CE] text-[#4E5F4C] border border-[#4E5F4C] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-3 group"
            >
              <span>{t.callToOrder || (lang === "ar" ? "اطلب عبر الهاتف" : lang === "en" ? "CALL TO ORDER" : "TELEFONLA SİPARİŞ")}</span>
            </a>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-3 start-1/2 -translate-x-1/2 z-10">
          <CaretDown size={18} className="text-[#7A7364] animate-bounce" weight="bold" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING / CHEF'S PICKS
          ═══════════════════════════════════════════ */}
      <section
        ref={handleTrendingRef}
        className={`relative py-14 px-4 bg-[#EDE3CE] overflow-hidden transition-all duration-500 ${isTrendingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="ottoman-divider max-w-xl mx-auto mb-10"></div>

        <div className="relative z-10 flex flex-col items-center mb-8 text-center">
          <span className="text-[#9C7A3F] text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <KebabSkewer size={15} className="text-[#9C7A3F]" />
            <span>{t.signatureDishes || "Özel Seçimlerimiz"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2B2620] tracking-wide uppercase" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.trending || "En Çok Tercih Edilenler"}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {chefItems.map((item, index) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              index={index} 
              isVertical={true} 
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#F7F2E7] hover:bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs group"
          >
            <span>Tüm Menüyü İnceleyin</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#9C7A3F]" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT & HERITAGE TEASER
          ═══════════════════════════════════════════ */}
      <section
        ref={storyRef}
        className={`py-14 px-4 max-w-5xl mx-auto transition-all duration-700 ${isStoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="bg-[#F7F2E7] rounded-xl p-6 sm:p-10 border border-[#9C7A3F]/30 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <div className="md:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#9C7A3F]/15 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider">
                <Medal size={16} weight="duotone" />
                <span>{t.storyBadge || "Geleneksel Türk Mutfağı • Cihangir"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.ourStoryTitle || "Our Kardeşler Kebap Cihangir Story"}
              </h3>
              <p className="text-[#7A7364] text-xs sm:text-sm leading-relaxed font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                {t.ourStoryDesc || (lang === "ar" 
                  ? "في قلب جيهانغير منذ أكثر من 25 عامًا، نقدم لكم النكهات التركية الأصيلة، بدءًا من كباب أضنة المفروم يدويًا وحتى الفطائر المخبوزة في الفرن الحطبي."
                  : lang === "tr" 
                  ? "Cihangir'de 25 yılı aşkın süredir, zırh kıyması Adana kebaptan odun ateşinde pide çeşitlerine kadar geleneksel lezzetleri misafirlerimize sunuyoruz."
                  : "For over 25 years in the heart of Cihangir, we have been serving authentic Turkish flavors—from hand-minced Adana kebab to wood-fired baked pide.")}
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#4E5F4C] hover:text-[#3D4B3B] uppercase tracking-wider underline underline-offset-4 decoration-[#4E5F4C]/40"
                >
                  <span>{t.learnMoreAboutUs || "Hakkımızda Detaylı Bilgi"}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#EDE3CE] p-4 rounded-lg border border-[#9C7A3F]/20">
                <span className="block text-2xl sm:text-3xl font-black text-[#2B2620]">100+</span>
                <span className="text-[10px] text-[#7A7364] uppercase font-bold tracking-wider">{t.dishesCountText || "Çeşit Yemek"}</span>
              </div>
              <div className="bg-[#EDE3CE] p-4 rounded-lg border border-[#9C7A3F]/20">
                <span className="block text-2xl sm:text-3xl font-black text-[#2B2620]">{googleRating}★</span>
                <span className="text-[10px] text-[#7A7364] uppercase font-bold tracking-wider">{t.googleScore || "Google Puanı"}</span>
              </div>
              <div className="bg-[#EDE3CE] p-4 rounded-lg border border-[#9C7A3F]/20">
                <span className="block text-2xl sm:text-3xl font-black text-[#2B2620]">09-02</span>
                <span className="text-[10px] text-[#7A7364] uppercase font-bold tracking-wider">{t.openingHours || "Açık Saatler"}</span>
              </div>
              <div className="bg-[#EDE3CE] p-4 rounded-lg border border-[#9C7A3F]/20">
                <span className="block text-2xl sm:text-3xl font-black text-[#2B2620]">10</span>
                <span className="text-[10px] text-[#7A7364] uppercase font-bold tracking-wider">{t.languagesCountText || "Dilde Hizmet"}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      {/* ═══════════════════════════════════════════
          GALLERY SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="relative z-10 flex flex-col items-center mb-10 text-center">
          <span className="text-[#9C7A3F] text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3F]"></span>
            <span>{t.gallerySubtitle || (lang === "ar" ? "أجواء وأطباق" : lang === "tr" ? "Atmosfer & Lezzet" : "Atmosphere & Flavors")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2B2620] tracking-wide uppercase" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.galleryTitle || (lang === "ar" ? "معرض الصور" : lang === "tr" ? "Galeri" : "Our Gallery")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-[auto] gap-4">
          <div className="md:col-span-8 md:row-span-2 h-64 md:h-full relative rounded-xl overflow-hidden group shadow-sm">
            <Image src="/images/kahvalti.webp" alt="Serpme Kahvaltı" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 66vw" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="md:col-span-4 h-48 sm:h-64 relative rounded-xl overflow-hidden group shadow-sm">
            <Image src="/images/lahmacun.webp" alt="Wood-fired Lahmacun" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="md:col-span-4 h-48 sm:h-64 relative rounded-xl overflow-hidden group shadow-sm">
            <Image src="/images/beyti-1024x677.webp" alt="Beyti Kebap" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="md:col-span-4 h-48 sm:h-64 relative rounded-xl overflow-hidden group shadow-sm">
            <Image src="/images/menemen.webp" alt="Menemen" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="md:col-span-8 h-64 relative rounded-xl overflow-hidden group shadow-sm">
            <Image src="/images/karisik_meze.webp" alt="Turkish Meze" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 66vw" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCATION & CONTACT CARD
          ═══════════════════════════════════════════ */}
      <section
        ref={infoRef}
        className={`py-10 px-4 max-w-5xl mx-auto transition-all duration-700 ${isInfoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="bg-[#F7F2E7] rounded-xl p-6 sm:p-8 border border-[#9C7A3F]/30 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="border-b border-[#9C7A3F]/20 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                  {t.locationTitle || (lang === "ar" ? "الموقع والتواصل" : lang === "tr" ? "Konum ve İletişim" : "Location & Contact")}
                </h3>
                <p className="text-sm text-[#7A7364] font-medium mt-1">
                  {t.locationSubtitle || "Taksim Meydanı'na 5 Dakika Mesafede"}
                </p>
              </div>
              <div className="space-y-4">
                <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <MapPin size={20} className="text-[#4E5F4C] shrink-0 mt-0.5" />
                  <p className="text-[#2B2620] text-sm font-medium leading-relaxed max-w-sm group-hover:text-[#9C7A3F] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                    Firuzağa Mah. Firuzağa Camii Sok. No:1A, Cihangir, Beyoğlu, İstanbul
                  </p>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4E5F4C] w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <a href="tel:+902122513696" className="text-[#2B2620] text-sm font-semibold hover:text-[#9C7A3F] transition-colors">
                    +90 212 251 36 96
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4E5F4C] w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <p className="text-[#7A7364] text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    {lang === "ar" ? "يومياً: 09:00 ص – 02:00 ص" : lang === "tr" ? "Her Gün: 09:00 – 02:00" : "Everyday: 09:00 AM – 02:00 AM"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <RestaurantMap heightClass="h-52 sm:h-full min-h-[250px]" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
