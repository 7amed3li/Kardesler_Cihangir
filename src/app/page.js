"use client";

import React, { useState, useRef } from "react";
import { menuData } from "@/data/menuData";
import MenuSelector from "@/components/MenuSelector";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Flame, UtensilsCrossed } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const { t, table } = useAppContext();
  const menuRef = useRef(null);

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

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center justify-center gap-2 mb-8"
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
          </motion.div>

          {/* Main Logo Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-cream mb-2 tracking-tight leading-none" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h1>
            <p className="text-copper text-lg sm:text-xl md:text-2xl font-medium tracking-[0.4em] uppercase mb-6">
              {t.heroTagline || "Kebap & Pide"}
            </p>
          </motion.div>

          {/* Ornamental Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/60"></div>
            <Flame size={16} className="text-gold" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/60"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-cream-dim/80 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-10"
          >
            {t.subtitle || "Where tradition meets taste in the heart of Cihangir"}
          </motion.p>

          {/* Stats Row — Only real data */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex items-center justify-center gap-8 sm:gap-12 mb-10"
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
          </motion.div>

          {/* Table Badge */}
          {table && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-teal/30 bg-teal/10 backdrop-blur-md"
            >
              <span className="text-xs font-light text-cream-dim tracking-widest uppercase">{t.table}</span>
              <span className="w-px h-4 bg-teal/40"></span>
              <span className="text-lg font-bold text-teal">{table}</span>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            onClick={scrollToMenu}
            className="group relative px-8 py-4 bg-gradient-to-r from-copper to-copper/80 text-cream font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(198,98,43,0.3)] transition-all duration-500 hover:scale-105"
          >
            <span>{t.heroCta || "Explore Menu"}</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown size={20} className="text-cream-dim/30 animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING / CHEF'S PICKS
          ═══════════════════════════════════════════ */}
      <section ref={menuRef} className="relative py-12 px-4 bg-gradient-to-b from-ink-2 via-ink to-ink overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-copper/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
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
          </motion.div>
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
        <AnimatePresence mode="popLayout">
          {menuData.map((category) => {
            if (activeCategory !== category.id) return null;

            // Apply smart filters
            const filteredItems = category.items.filter(item => {
              if (!activeFilter) return true;
              return item.tags?.includes(activeFilter);
            });

            return (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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
              </motion.div>
            )
          })}
        </AnimatePresence>
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
