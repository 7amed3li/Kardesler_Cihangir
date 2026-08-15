"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../context/AppContext";
import { X, ZoomIn, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";

/**
 * Inline cart counter — shows (+) when qty is 0, or (- N +) when qty > 0.
 * Used both on the card and inside the modal.
 * `compact` mode is for the card itself (smaller).
 */
function CartCounter({ item, compact = false }) {
  const { addToCart, removeFromCart, getItemQuantity } = useAppContext();
  const qty = getItemQuantity(item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
  };

  if (qty === 0) {
    return null;
  }

  return (
    <div
      className="flex items-center min-h-[44px] rounded-lg border border-[#9C7A3F]/30 bg-[#EDE3CE] px-1.5 py-1 gap-1 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleRemove}
        aria-label="Decrease quantity"
        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-[#2B2620] hover:text-[#A0422E] transition-colors"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>
      <span
        key={qty}
        className="text-center font-bold text-[#2B2620] w-5 text-xs"
      >
        {qty}
      </span>
      <button
        onClick={handleAdd}
        aria-label="Increase quantity"
        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-[#2B2620] hover:text-[#4E5F4C] transition-colors"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function FoodCard({ item, index, isVertical = false }) {
  const { menuT, t, convertPrice, getCurrencySymbol, getItemQuantity, lang } = useAppContext();
  const isRTL = lang === "ar" || lang === "fa";
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
  const qty = getItemQuantity(item.id);
  const isFeatured = item.tags?.includes("signature") || item.trending;

  return (
    <>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`group relative rounded-xl bg-[#F7F2E7] ${
          isFeatured
            ? "border border-[#9C7A3F]/60 shadow-xs"
            : "border border-[#9C7A3F]/20 hover:border-[#9C7A3F]/50"
        } overflow-hidden transition-all duration-200 flex ${isVertical ? "flex-col" : "flex-row"} items-stretch ${isVertical ? "h-auto" : "h-36 sm:h-40"} text-start`}
      >
        {/* Image Section */}
        {item.image && (
          <div 
            className={`${isVertical ? "w-full aspect-[4/3] sm:aspect-square" : "w-32 sm:w-40 h-full shrink-0"} relative overflow-hidden bg-[#EDE3CE] z-10 cursor-pointer`}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
              <Image 
                src={item.image} 
                alt={name} 
                fill 
                style={{ objectFit: "contain" }} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>

            {/* Price Tag — Compact flat badge */}
            <div className="absolute top-2 start-2 z-20 flex items-center pointer-events-none">
              <span className="flex items-center px-2.5 py-1 rounded-[4px] bg-[#9C7A3F] text-[#EAF0E6] font-bold text-xs tracking-wide shadow-xs" style={{ fontFamily: "var(--font-inter)" }}>
                {displayPrice} {symbol}
              </span>
            </div>

            {/* Text Badges */}
            <div className="absolute bottom-2 start-2 z-20 flex flex-wrap gap-1 pointer-events-none">
              {item.tags?.includes("signature") && (
                <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#EAF0E6] bg-[#9C7A3F] rounded-[3px] font-bold">
                  {t.signature || "Signature"}
                </span>
              )}
              {item.tags?.includes("spicy") && (
                <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#EAF0E6] bg-[#A0422E] rounded-[3px] font-bold">
                  {t.spicy || "Spicy"}
                </span>
              )}
              {item.tags?.includes("vegetarian") && (
                <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#EAF0E6] bg-[#4E5F4C] rounded-[3px] font-bold">
                  {t.vegetarian || "Veg"}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div 
          dir={isRTL ? "rtl" : "ltr"}
          className={`flex flex-col flex-grow ${isVertical ? "p-4 sm:p-5" : "p-3 sm:p-5"} justify-between relative z-10 w-full min-w-0 bg-[#F7F2E7] text-start`}
        >
          {/* Top part — clickable for modal */}
          <div 
            className="cursor-pointer flex-1 text-start"
            onClick={() => setIsModalOpen(true)}
          >
            <h3 className="font-bold text-base md:text-lg text-[#2B2620] leading-tight mb-1 truncate md:whitespace-normal group-hover:text-[#9C7A3F] transition-colors text-start" style={{ fontFamily: "var(--font-cairo)" }}>
              {name}
            </h3>
            {description && (
              <p className="text-xs md:text-sm text-[#7A7364] mt-1 line-clamp-2 leading-relaxed font-medium text-start" style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}>
                {description}
              </p>
            )}
          </div>

          {/* Bottom part — cart controls */}
          <div className={`flex items-center justify-between ${isVertical ? "mt-3" : "mt-2"}`}>
            {!item.image && (
              <span className="text-[#9C7A3F] font-bold text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                {displayPrice} {symbol}
              </span>
            )}
            {item.image && <div />}
            
            <CartCounter item={item} compact={!isVertical} />
          </div>
        </div>

        {/* Quantity badge overlay */}
        {qty > 0 && item.image && (
          <div className="absolute top-3 end-3 z-20 w-6 h-6 rounded-full bg-[#4E5F4C] text-[#EAF0E6] text-xs font-bold flex items-center justify-center border-2 border-[#F7F2E7] pointer-events-none">
            {qty}
          </div>
        )}
      </div>

      {/* MODAL — Item Details + Cart Action */}
      {mounted && isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#2B2620]/75 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#F7F2E7] rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-xl relative border border-[#9C7A3F]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 end-4 z-50 w-9 h-9 flex items-center justify-center rounded-md bg-[#EDE3CE] text-[#2B2620] hover:text-[#9C7A3F] transition-colors border border-[#9C7A3F]/20"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            {item.image && (
              <div className="w-full h-56 sm:h-72 shrink-0 relative bg-[#EDE3CE]">
                <Image src={item.image} alt={name} fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, 400px" />
                
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  aria-label="View fullscreen image"
                  className="absolute bottom-4 end-4 z-20 w-9 h-9 flex items-center justify-center rounded-md bg-[#2B2620] text-white hover:bg-[#9C7A3F] transition-colors shadow-md"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            )}

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold text-[#2B2620]">{name}</h2>
                <span className="shrink-0 text-lg font-bold text-[#9C7A3F] bg-[#EDE3CE] px-3 py-1 rounded-md border border-[#9C7A3F]/30" style={{ fontFamily: "var(--font-inter)" }}>
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
                {item.tags?.includes("vegan") && (
                  <span className="px-3 py-1 bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.vegan || "Vegan"}
                  </span>
                )}
              </div>

              {description && (
                <div className="mt-2">
                  <h4 className="text-sm font-bold text-gold mb-2 uppercase tracking-widest">{t.description || "Details"}</h4>
                  <p className="text-cream-dim leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{description}</p>
                </div>
              )}
              
              {/* Modal Cart Action — large counter or Add button */}
              <div className="mt-4 flex items-center justify-center">
                <CartCounter item={item} compact={false} />
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="mt-2 w-full py-3 rounded-xl bg-teal-dim/20 text-cream font-bold hover:bg-teal hover:text-ink transition-colors duration-300 border border-teal-dim/50 text-sm"
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
