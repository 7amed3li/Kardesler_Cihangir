"use client";

import React, { useState, useRef, useEffect } from "react";
import { menuData } from "@/data/menuData";
import MenuSelector from "@/components/MenuSelector";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/AppContext";
import { MapPin, ChevronDown, Flame, UtensilsCrossed } from "lucide-react";

// Lazy load heavy below-fold components
const ReviewSection = dynamic(() => import("@/components/ReviewSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const { t, table } = useAppContext();
  const menuRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

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
          HERO SECTION — The Grand First Impression
          ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px]"></div>
          
          {/* Decorative lines */}
          <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-dim/20 to-transparent"></div>
          <div className="absolute bottom-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
        </div>

        <div className={`relative z-10 max-w-3xl mx-auto transition-opacity duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Location Badge */}
          <div
            className={`flex items-center justify-center gap-2 mb-8 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <a 
              href="https://maps.google.com/?q=Kardeşler+Kebap+Pide+Cihangir+Beyoğlu+İstanbul" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-teal-dim/40 bg-teal-dim/10 backdrop-blur-md text-xs tracking-widest hover:border-teal hover:bg-teal-dim/20 transition-all duration-300 cursor-pointer group"
            >
              <MapPin size={12} className="text-teal group-hover:animate-bounce" />
              <span className="text-cream-dim group-hover:text-cream transition-colors">{t.heroLocation || "Firuzağa Mah. Cihangir, Beyoğlu, İstanbul"}</span>
            </a>
          </div>

          {/* Main Logo Name */}
          <div
            className={`transition-all duration-600 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-cream mb-2 tracking-tight leading-none" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h1>
            <p className="text-copper text-lg sm:text-xl md:text-2xl font-medium tracking-[0.4em] uppercase mb-6">
              {t.heroTagline || "Kebap & Pide"}
            </p>
          </div>

          {/* Ornamental Divider */}
          <div
            className={`flex items-center justify-center gap-3 mb-8 transition-all duration-500 ${heroVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
            style={{ transitionDelay: "250ms" }}
          >
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/60"></div>
            <Flame size={16} className="text-gold" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/60"></div>
          </div>

          {/* Subtitle */}
          <p
            className={`text-cream-dim/80 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-10 transition-all duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "300ms" }}
          >
            {t.subtitle || "Where tradition meets taste in the heart of Cihangir"}
          </p>

          {/* Stats Row — Only real data */}
          <div
            className={`flex items-center justify-center gap-8 sm:gap-12 mb-10 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "350ms" }}
          >
            {/* Items Count */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1">
                <UtensilsCrossed size={16} className="text-teal" />
                <span className="text-3xl sm:text-4xl font-black text-cream">{totalItems}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-cream-dim/60 uppercase tracking-widest">{t.heroItemsText || "dishes"}</span>
            </div>

            <div className="w-px h-12 bg-gold/20"></div>

            {/* Categories */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-cream mb-1">{menuData.length}</span>
              <span className="text-[10px] sm:text-xs text-cream-dim/60 uppercase tracking-widest">{t.categories || "categories"}</span>
            </div>
          </div>

          {/* Table Badge */}
          {table && (
            <div 
              className={`mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-teal/30 bg-teal/10 backdrop-blur-md transition-all duration-500 ${heroVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="text-xs font-light text-cream-dim tracking-widest uppercase">{t.table}</span>
              <span className="w-px h-4 bg-teal/40"></span>
              <span className="text-lg font-bold text-teal">{table}</span>
            </div>
          )}

          {/* CTA Button */}
          <div
            className={`transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "450ms" }}
          >
            <button
              onClick={scrollToMenu}
              className="group relative px-8 py-4 bg-gradient-to-r from-copper to-copper/80 text-cream font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(198,98,43,0.3)] transition-all duration-500 hover:scale-105"
            >
              <span>{t.heroCta || "Explore Menu"}</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700 ${heroVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <ChevronDown size={20} className="text-cream-dim/30 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING / CHEF'S PICKS
          ═══════════════════════════════════════════ */}
      <section ref={menuRef} className="relative py-12 px-4 bg-gradient-to-b from-ink-2 via-ink to-ink overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-copper/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col items-center mb-10">
          <div className="flex flex-col items-center">
            {/* Decorative fire icon */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-copper/60"></div>
              <Flame size={22} className="text-copper" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-copper/60"></div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-cream tracking-wide uppercase mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.trending || "Most Loved by Our Guests"}
            </h3>
            <p className="text-cream-dim/50 text-xs tracking-[0.3em] uppercase">
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
