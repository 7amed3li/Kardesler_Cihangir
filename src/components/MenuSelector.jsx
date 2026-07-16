"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function MenuSelector({ categories, activeCategory, setActiveCategory }) {
  const { lang } = useAppContext();

  return (
    <div className="w-full bg-ink overflow-x-auto no-scrollbar pt-2 pb-0">
      <div className="flex items-center gap-8 px-6 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            >
              <span className={`relative z-10 block ${isActive ? "text-gold" : "text-cream-dim hover:text-cream"} transition-colors duration-300`}>
                {cat.category[lang] || cat.category.en}
              </span>

              {/* Minimalist Active Underline */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
