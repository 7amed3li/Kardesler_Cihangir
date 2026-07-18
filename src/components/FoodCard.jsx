"use client";

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { X } from "lucide-react";
import Image from "next/image";

export default function FoodCard({ item, index, isVertical = false }) {
  const { lang, t, convertPrice, getCurrencySymbol } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name = item?.name?.[lang] || item?.name?.en || item?.name?.tr || "Yeni Ürün";
  const description = item?.description?.[lang] || item?.description?.en || item?.description?.tr || "";

  const displayPrice = convertPrice(item.price);
  const symbol = getCurrencySymbol();

  return (
    <>
      <div
        className={`group relative rounded-xl bg-ink-2 border border-teal-dim/30 hover:border-gold overflow-hidden transition-all duration-300 flex ${isVertical ? "flex-col" : "flex-row md:flex-col"} items-stretch ${isVertical ? "h-auto" : "h-36 md:h-full"} shadow-sm hover:shadow-[0_4px_20px_rgba(47,158,147,0.15)] hover:-translate-y-0.5`}
      >
        {/* Image Section */}
        <div 
          className={`${isVertical ? "w-full h-48" : "w-32 md:w-full h-full md:h-48"} shrink-0 relative overflow-hidden bg-ink z-10 cursor-pointer`}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-10 pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-ink-2 group-hover:scale-105 transition-transform duration-700">
            {item.image && (
              <Image 
                src={item.image} 
                alt={name} 
                fill 
                style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={index < 3 && isVertical ? "eager" : "lazy"}
              />
            )}
          </div>

          {/* Price Tag */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
            <span className="flex items-center px-3 py-1 rounded bg-ink/90 backdrop-blur-md text-copper border border-copper/30 shadow-lg font-bold text-sm tracking-wide">
              {displayPrice} {symbol}
            </span>
          </div>

          {/* Text Badges */}
          <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
            {item.tags?.includes("signature") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold border border-gold/30 bg-gold/10 backdrop-blur-md rounded-sm font-bold">
                {t.signature || "Signature"}
              </span>
            )}
            {item.tags?.includes("spicy") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-brick border border-brick/30 bg-brick/10 backdrop-blur-md rounded-sm font-bold">
                {t.spicy || "Spicy"}
              </span>
            )}
            {item.tags?.includes("vegetarian") && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-teal border border-teal/30 bg-teal/10 backdrop-blur-md rounded-sm font-bold">
                {t.vegetarian || "Veg"}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div 
          className={`flex flex-col flex-grow ${isVertical ? "p-5" : "p-3 md:p-5"} justify-center relative z-10 w-full min-w-0 bg-ink-2 cursor-pointer`}
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="font-normal text-lg md:text-xl text-cream leading-tight mb-1 truncate md:whitespace-normal group-hover:text-gold transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-xs md:text-sm text-cream-dim mt-2 line-clamp-2 leading-relaxed font-light opacity-90">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Modal — Pure CSS transition */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-ink border border-gold/30 rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 end-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-cream hover:bg-black hover:text-gold transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full h-64 shrink-0 relative bg-ink-2">
              {item.image ? (
                <Image src={item.image} alt={name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 400px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-ink-2">
                  <span className="text-gray-500 font-light">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent pointer-events-none"></div>
            </div>

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold text-cream">{name}</h2>
                <span className="shrink-0 text-xl font-bold text-copper bg-copper/10 px-3 py-1 rounded-lg border border-copper/30">
                  {displayPrice} {symbol}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags?.includes("signature") && (
                  <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.signature || "Signature"}
                  </span>
                )}
                {item.tags?.includes("spicy") && (
                  <span className="px-3 py-1 bg-brick/10 text-brick border border-brick/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.spicy || "Spicy"}
                  </span>
                )}
                {item.tags?.includes("vegetarian") && (
                  <span className="px-3 py-1 bg-teal/10 text-teal border border-teal/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.vegetarian || "Veg"}
                  </span>
                )}
              </div>

              {description && (
                <div className="mt-2">
                  <h4 className="text-sm font-bold text-gold mb-2 uppercase tracking-widest">{t.description || "Details"}</h4>
                  <p className="text-cream-dim leading-relaxed">{description}</p>
                </div>
              )}
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full py-4 rounded-xl bg-teal-dim/20 text-cream font-bold hover:bg-teal hover:text-ink transition-colors border border-teal-dim/50"
              >
                {t.close || "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
