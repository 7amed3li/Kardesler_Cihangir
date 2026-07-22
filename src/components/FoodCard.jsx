"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../context/AppContext";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

export default function FoodCard({ item, index, isVertical = false }) {
  const { menuT, t, convertPrice, getCurrencySymbol } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const name = menuT.items[item.id]?.name || item?.name?.en || "Yeni Ürün";
  const description = menuT.items[item.id]?.desc || item?.description?.en || "";

  const displayPrice = convertPrice(item.price);
  const symbol = getCurrencySymbol();

  // Stagger animation delay
  const staggerDelay = `${(index % 9) * 60}ms`;

  return (
    <>
      <div
        className={`group relative rounded-xl bg-ink-2 border border-teal-dim/20 hover:border-gold/50 overflow-hidden transition-all duration-300 flex ${isVertical ? "flex-col" : "flex-row"} items-stretch ${isVertical ? "h-auto" : "h-36 sm:h-40"} food-card-hover animate-fadeInUp`}
        style={{ animationDelay: staggerDelay }}
      >
        {/* Image Section */}
        {item.image && (
          <div 
            className={`${isVertical ? "w-full aspect-[4/3] sm:aspect-square" : "w-32 sm:w-40 h-full shrink-0"} relative overflow-hidden bg-ink z-10 cursor-pointer`}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-10 pointer-events-none"></div>
            
            <div className="absolute inset-0 bg-ink-2 group-hover:scale-105 transition-transform duration-700">
              <Image 
                src={item.image} 
                alt={name} 
                fill 
                style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3 && isVertical}
              />
            </div>

            {/* Price Tag — Glassmorphism */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
              <span className="flex items-center px-3 py-1 rounded-lg glass-card-strong text-copper border-copper/20 shadow-lg font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
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
        )}

        {/* Content Section */}
        <div 
          className={`flex flex-col flex-grow ${isVertical ? "p-4 sm:p-5" : "p-3 sm:p-5"} justify-center relative z-10 w-full min-w-0 bg-ink-2 cursor-pointer`}
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="font-normal text-lg md:text-xl text-cream leading-tight mb-1 truncate md:whitespace-normal group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          {description && (
            <p className="text-xs md:text-sm text-cream-dim mt-2 line-clamp-2 leading-relaxed font-light opacity-90" style={{ fontFamily: "var(--font-inter)" }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Modal — Glassmorphism */}
      {mounted && isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="glass-card-strong rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative modal-content border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 end-4 z-50 w-10 h-10 flex items-center justify-center rounded-full glass-card text-cream hover:text-gold transition-colors border-white/10"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            {item.image && (
              <div className="w-full h-56 sm:h-72 shrink-0 relative bg-ink-2 group">
                <Image src={item.image} alt={name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent pointer-events-none"></div>
                
                {/* Zoom Button */}
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  aria-label="View fullscreen image"
                  className="absolute bottom-4 end-4 z-20 w-10 h-10 flex items-center justify-center rounded-full glass-card text-cream hover:text-gold hover:scale-110 transition-all border-white/20 shadow-lg"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            )}

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold text-cream">{name}</h2>
                <span className="shrink-0 text-xl font-bold text-copper glass-card px-3 py-1 rounded-lg border-copper/20" style={{ fontFamily: "var(--font-inter)" }}>
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
                  <p className="text-cream-dim leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{description}</p>
                </div>
              )}
              
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="mt-6 w-full py-4 rounded-xl bg-teal-dim/20 text-cream font-bold hover:bg-teal hover:text-ink transition-colors duration-300 border border-teal-dim/50"
              >
                {t.close || "Close"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fullscreen Image Overlay */}
      {mounted && isFullscreenImage && item.image && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 modal-overlay"
          onClick={() => setIsFullscreenImage(false)}
        >
          {/* Close Fullscreen Button */}
          <button
            onClick={() => setIsFullscreenImage(false)}
            aria-label="Close fullscreen image"
            className="absolute top-6 end-6 z-[9999999] w-12 h-12 flex items-center justify-center rounded-full bg-cream text-ink hover:bg-gold hover:scale-110 transition-all shadow-[0_0_20px_rgba(250,243,231,0.3)]"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] modal-content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={item.image} 
              alt={name} 
              fill 
              style={{ objectFit: "contain" }} 
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
