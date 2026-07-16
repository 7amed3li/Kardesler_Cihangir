"use client";

import React, { useState } from "react";
import { menuData } from "@/data/menuData";
import MenuSelector from "@/components/MenuSelector";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const { t, table } = useAppContext();

  // Extract trending items
  const trendingItems = menuData.flatMap(cat => cat.items).filter(item => item.trending);

  return (
    <div className="pb-8 bg-transparent min-h-screen text-cream font-sans selection:bg-copper selection:text-cream">
      {/* Premium Minimal Hero Section */}
      <section className="w-full pt-16 pb-12 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Cihangir
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-cream mb-6 tracking-wide leading-tight">
            {t.welcome || "Welcome to Kardeşler"}
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6"></div>
          <p className="text-cream-dim text-sm sm:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed">
            {t.subtitle || "Experience authentic flavors crafted with passion and heritage."}
          </p>
          
          {table && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-none border border-teal-dim/30 bg-teal-dim/10"
            >
              <span className="text-xs font-light text-cream-dim tracking-widest uppercase">{t.table}</span>
              <span className="w-px h-3 bg-teal-dim/40 mx-1"></span>
              <span className="text-sm font-medium text-cream">{table}</span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Popular / Chef's Picks Section */}
      <section className="py-8 px-4 border-t border-teal-dim/30 bg-ink-2">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-lg sm:text-xl font-medium text-cream tracking-widest uppercase">
            {t.trending || "Chef's Recommendations"}
          </h3>
          <div className="w-8 h-px bg-gold/40 mt-3"></div>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-6 px-2 no-scrollbar snap-x">
          {trendingItems.map((item, idx) => (
            <div key={`trending-${item.id}`} className="min-w-[85vw] sm:min-w-[400px] md:min-w-[320px] snap-center">
              <FoodCard item={item} index={idx} isVertical={true} />
            </div>
          ))}
        </div>
      </section>

      {/* Category Selector */}
      <div className="bg-ink pt-4 border-b border-teal-dim/30">
        <MenuSelector 
          categories={menuData} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </div>

      {/* Smart Filters */}
      <div className="sticky top-[56px] z-20 bg-ink/90 backdrop-blur-md border-b border-teal-dim/30 shadow-sm">
        <SmartFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      {/* Menu Items List */}
      <section className="px-4 py-8 min-h-[50vh]">
        <AnimatePresence mode="wait">
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
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
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


    </div>
  );
}
