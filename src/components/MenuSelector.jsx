"use client";

import React, { useRef, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MenuSelector({ categories, activeCategory, setActiveCategory }) {
  const { lang } = useAppContext();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-ink">
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll(-1)} 
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-ink via-ink/80 to-transparent"
        >
          <ChevronLeft size={18} className="text-cream-dim" />
        </button>
      )}

      {/* Right fade + arrow */}
      {canScrollRight && (
        <button 
          onClick={() => scroll(1)} 
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-ink via-ink/80 to-transparent"
        >
          <ChevronRight size={18} className="text-cream-dim" />
        </button>
      )}

      <div 
        ref={scrollRef}
        className="flex items-center gap-1 px-4 overflow-x-auto no-scrollbar"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative shrink-0 px-4 py-3"
            >
              <span className={`relative z-10 block text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                isActive ? "text-cream" : "text-cream-dim/60 hover:text-cream-dim"
              }`}>
                {cat.category[lang] || cat.category.en}
              </span>

              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-lg bg-teal-dim/30 border border-teal/30"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
