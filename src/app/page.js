"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { menuData } from "@/data/menuData";
import MenuSelector from "@/components/MenuSelector";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { MapPin, ChevronDown, Flame, UtensilsCrossed } from "lucide-react";

import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";

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

  return { ref, isVisible };
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const { t } = useAppContext();
  const menuRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // Scroll-reveal refs for each section
  const trendingReveal = useReveal();
  const menuReveal = useReveal();

  useEffect(() => {
    // Trigger hero animations after first paint
    requestAnimationFrame(() => setHeroVisible(true));
  }, []);

  // Extract trending items
  const trendingItems = menuData.flatMap(cat => cat.items).filter(item => item.trending);
  const totalItems = menuData.reduce((acc, cat) => acc + cat.items.length, 0);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pb-8 bg-transparent min-h-screen text-cream font-sans selection:bg-copper selection:text-cream">
      
      {/* ═══════════════════════════════════════════
          HERO SECTION — Cinematic First Impression
          ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Cinematic Background Image */}
        <div className="hero-bg">
          <Image
            src="/images/hero-bg.png"
            alt=""
            aria-hidden="true"
            priority={true}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            sizes="100vw"
          />
        </div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Top Ottoman border line */}
          <div className="absolute top-[12%] left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          {/* Bottom Ottoman border line */}
          <div className="absolute bottom-[15%] left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/15 to-transparent"></div>
          
          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-gold/20 rounded-tl-sm hidden md:block"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-gold/20 rounded-tr-sm hidden md:block"></div>
          <div className="absolute bottom-24 left-8 w-12 h-12 border-b-2 border-l-2 border-gold/20 rounded-bl-sm hidden md:block"></div>
          <div className="absolute bottom-24 right-8 w-12 h-12 border-b-2 border-r-2 border-gold/20 rounded-br-sm hidden md:block"></div>
          
          {/* Radial glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-copper/5 rounded-full blur-[100px]"></div>
        </div>

        <div className={`relative z-10 max-w-3xl mx-auto transition-opacity duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Location Badge */}
          <div
            className={`flex items-center justify-center gap-2 mb-8 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Karde%C5%9Fler+Kebap+Cihangir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-dim/40 glass-card text-xs tracking-widest hover:border-teal hover:bg-teal-dim/20 transition-all duration-300 cursor-pointer group"
            >
              <MapPin size={12} className="text-teal group-hover:animate-bounce" />
              <span className="text-cream-dim group-hover:text-cream transition-colors">{t.heroLocation || "Firuzağa Mah. Cihangir, Beyoğlu, İstanbul"}</span>
            </a>
          </div>

          {/* Main Logo Name */}
          <div
            className={`transition-all duration-700 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-cream mb-2 tracking-tight leading-none"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.welcome || "Kardeşler"}
            </h1>
            <p className="text-copper text-lg sm:text-xl md:text-2xl font-medium tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.heroTagline || "Kebap & Pide"}
            </p>
          </div>

          {/* Ornamental Divider — Ottoman-inspired */}
          <div
            className={`flex items-center justify-center gap-3 mb-8 transition-all duration-600 ${heroVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/60"></div>
            <div className="relative">
              <Flame size={16} className="text-gold" />
              <div className="absolute inset-0 blur-md bg-gold/20 rounded-full"></div>
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/60"></div>
          </div>

          {/* Subtitle */}
          <p
            className={`text-cream-dim/80 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-10 transition-all duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "350ms", fontFamily: "var(--font-inter)" }}
          >
            {t.subtitle || "Where tradition meets taste in the heart of Cihangir"}
          </p>

          {/* Stats Row */}
          <div
            className={`flex items-center justify-center gap-8 sm:gap-12 mb-10 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <UtensilsCrossed size={16} className="text-teal" />
                <span className="text-3xl sm:text-4xl font-black text-cream">{totalItems}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-cream-dim/60 uppercase tracking-widest">{t.heroItemsText || "dishes"}</span>
            </div>

            <div className="w-px h-12 bg-gold/20"></div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-cream mb-1">{menuData.length}</span>
              <span className="text-[10px] sm:text-xs text-cream-dim/60 uppercase tracking-widest">{t.categories || "categories"}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <button
              onClick={scrollToMenu}
              className="group relative px-10 py-4 bg-gradient-to-r from-copper to-copper/80 text-cream font-bold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_40px_rgba(198,98,43,0.35)] transition-all duration-500 hover:scale-105 animate-pulseGlow"
            >
              <span style={{ fontFamily: "var(--font-inter)" }}>{t.heroCta || "Explore Menu"}</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700 ${heroVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        >
          <ChevronDown size={20} className="text-cream-dim/30 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING / CHEF'S PICKS
          ═══════════════════════════════════════════ */}
      <section
        ref={(el) => { menuRef.current = el; if (trendingReveal.ref) trendingReveal.ref.current = el; }}
        className={`relative py-16 px-4 bg-gradient-to-b from-ink-2 via-ink to-ink overflow-hidden transition-all duration-700 ${trendingReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-copper/5 rounded-full blur-[100px]"></div>
        
        {/* Ottoman Divider at top */}
        <div className="ottoman-divider max-w-xl mx-auto mb-12"></div>

        <div className="relative z-10 flex flex-col items-center mb-10">
          <div className="flex flex-col items-center ottoman-bracket">
            {/* Decorative fire icon */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-copper/60"></div>
              <Flame size={22} className="text-copper animate-float" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-copper/60"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-cream tracking-wide uppercase mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.trending || "Most Loved by Our Guests"}
            </h2>
            <p className="text-cream-dim/50 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.heroTagline || "Kebap & Pide"}
            </p>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-5 pb-6 px-2 no-scrollbar snap-x">
          {trendingItems.map((item, idx) => (
            <div key={`trending-${item.id}`} className="min-w-[80vw] sm:min-w-[380px] md:min-w-[300px] snap-center">
              <FoodCard item={item} index={idx} isVertical={true} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORY SELECTOR
          ═══════════════════════════════════════════ */}
      <div className="bg-ink pt-4 border-b border-teal-dim/20">
        <MenuSelector 
          categories={menuData} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </div>

      {/* Smart Filters */}
      <div className="sticky top-[56px] z-20 bg-ink/90 backdrop-blur-md border-b border-teal-dim/20 shadow-sm">
        <SmartFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      {/* ═══════════════════════════════════════════
          MENU ITEMS LIST
          ═══════════════════════════════════════════ */}
      <section className="px-4 py-8 min-h-[50vh]">
        {menuData.map((category) => {
          if (activeCategory !== category.id) return null;

          // Apply smart filters
          const filteredItems = category.items.filter(item => {
            if (!activeFilter) return true;
            return item.tags?.includes(activeFilter);
          });

          return (
            <div 
              key={category.id} 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <FoodCard key={item.id} item={item} index={index} />
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <p className="text-cream-dim font-light tracking-wide">No dishes match the selected filter.</p>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* ═══════════════════════════════════════════
          REAL REVIEWS SECTION
          ═══════════════════════════════════════════ */}
      <ReviewSection />

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <Footer />

    </div>
  );
}
