"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function FoodCard({ item, index, isVertical = false }) {
  const { lang, t, convertPrice, getCurrencySymbol } = useAppContext();

  const name = item?.name?.[lang] || item?.name?.en || item?.name?.tr || "Yeni Ürün";
  const description = item?.description?.[lang] || item?.description?.en || item?.description?.tr || "";

  const displayPrice = convertPrice(item.price);
  const symbol = getCurrencySymbol();

  return (
    <Tilt
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      perspective={1500}
      scale={1.01}
      transitionSpeed={1500}
      className={`h-full ${isVertical ? "w-full" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
        className={`group relative rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-500 flex ${isVertical ? "flex-col" : "flex-row md:flex-col"} items-stretch ${isVertical ? "h-auto" : "h-36 md:h-full"} shadow-sm hover:shadow-xl`}
      >
        {/* Image Section */}
        <div className={`${isVertical ? "w-full h-48" : "w-32 md:w-full h-full md:h-48"} shrink-0 relative overflow-hidden bg-[#0d0d0d] z-10`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
          
          {/* Subtle image scaling on hover */}
          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-1000"></div>

          {/* Price Tag */}
          <div className="absolute top-3 left-3 z-20 flex items-center justify-center px-3 py-1 rounded bg-black/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
            <span className="font-medium text-sm tracking-wide">{displayPrice} {symbol}</span>
          </div>

          {/* Text Badges */}
          <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
            {item.tags?.includes("signature") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md rounded-sm">
                {t.signature || "Signature"}
              </span>
            )}
            {item.tags?.includes("spicy") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-white border border-white/20 bg-white/10 backdrop-blur-md rounded-sm">
                {t.spicy || "Spicy"}
              </span>
            )}
            {item.tags?.includes("vegetarian") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-gray-300 border border-gray-500/30 bg-gray-500/10 backdrop-blur-md rounded-sm">
                {t.vegetarian || "Veg"}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className={`flex flex-col flex-grow ${isVertical ? "p-5" : "p-3 md:p-5"} justify-center relative z-10 w-full min-w-0 bg-[#111111]`}>
          <h3 className="font-normal text-lg md:text-xl text-white leading-tight mb-1 truncate md:whitespace-normal group-hover:text-[#D4AF37] transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-xs md:text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
}
