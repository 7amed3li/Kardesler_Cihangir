"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn, Plus, Minus } from "lucide-react";
import { useAppContext } from "../context/AppContext";

/**
 * Inline cart counter — shows (+) when qty is 0, or (- N +) when qty > 0.
 * Extracted from FoodCard for reuse in DishModal.
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
    return (
      <button
        onClick={handleAdd}
        aria-label="Add to cart"
        className={`flex items-center justify-center gap-1.5 rounded-full bg-copper/90 hover:bg-copper text-cream transition-all duration-200 hover:scale-105 active:scale-95 ${
          compact ? "w-8 h-8" : "px-5 py-2.5 w-full max-w-[200px]"
        }`}
      >
        <Plus size={compact ? 16 : 18} strokeWidth={2.5} />
        {!compact && (
          <span className="text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
            Add to Order
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-between rounded-full border border-teal-dim/40 bg-ink/80 backdrop-blur-sm ${
        compact ? "gap-1 px-1 py-0.5" : "gap-4 px-4 py-2 w-full max-w-[200px]"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleRemove}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-full text-cream-dim hover:text-brick hover:bg-brick/10 transition-colors ${
          compact ? "w-6 h-6" : "w-10 h-10"
        }`}
      >
        <Minus size={compact ? 12 : 16} strokeWidth={2.5} />
      </button>
      <span
        key={qty}
        className={`text-center font-bold text-cream animate-counterPop ${
          compact ? "w-5 text-xs" : "w-8 text-lg"
        }`}
      >
        {qty}
      </span>
      <button
        onClick={handleAdd}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-full text-cream-dim hover:text-teal hover:bg-teal/10 transition-colors ${
          compact ? "w-6 h-6" : "w-10 h-10"
        }`}
      >
        <Plus size={compact ? 12 : 16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function DishModal({ 
  isOpen, 
  setIsOpen, 
  item, 
  customName, 
  customDesc, 
  customPrice,
  customImage,
  customTags,
  hideCart = false 
}) {
  const { menuT, t, convertPrice, getCurrencySymbol, lang } = useAppContext();
  const isRTL = lang === "ar" || lang === "fa";
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  // Resolve data either from context (if item is provided) or custom props
  const name = customName || (item ? (menuT.items[item.id]?.name || item?.name?.en) : "Special Dish");
  const description = customDesc || (item ? (menuT.items[item.id]?.desc || item?.description?.en) : "");
  const price = customPrice || (item ? item.price : 0);
  const displayPrice = convertPrice ? convertPrice(price) : price;
  const symbol = getCurrencySymbol ? getCurrencySymbol() : "₺";
  const image = customImage || (item ? item.image : null);
  const tags = customTags || (item ? item.tags : []);

  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="bg-[#F7F2E7] rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-xl relative modal-content border border-[#9C7A3F]/30 text-start"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className={`absolute top-4 ${isRTL ? "start-4" : "end-4"} z-50 w-9 h-9 flex items-center justify-center rounded-md bg-[#EDE3CE] text-[#2B2620] hover:text-[#9C7A3F] transition-colors border border-[#9C7A3F]/20`}
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            {image && (
              <div className="w-full h-56 sm:h-72 shrink-0 relative bg-[#EDE3CE] group">
                <Image src={image} alt={name} fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, 400px" />
                
                {/* Zoom Button */}
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  aria-label="View fullscreen image"
                  className={`absolute bottom-4 ${isRTL ? "start-4" : "end-4"} z-20 w-9 h-9 flex items-center justify-center rounded-md bg-[#EDE3CE] text-[#2B2620] hover:text-[#9C7A3F] transition-all border border-[#9C7A3F]/30 shadow-md`}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            )}

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-4 text-start">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-bold text-[#2B2620] leading-tight text-start">{name}</h2>
                <span className="shrink-0 flex items-center gap-1 text-lg font-bold text-white bg-[#9C7A3F] px-3 py-1 rounded-md" style={{ fontFamily: "var(--font-inter)" }}>
                  {displayPrice} {symbol}
                </span>
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.includes("signature") && (
                    <span className="px-2.5 py-0.5 bg-[#9C7A3F]/15 text-[#9C7A3F] border border-[#9C7A3F]/30 text-xs font-bold rounded-md uppercase tracking-wider">
                      {t?.signature || "Signature"}
                    </span>
                  )}
                  {tags.includes("spicy") && (
                    <span className="px-2.5 py-0.5 bg-[#A0422E]/15 text-[#A0422E] border border-[#A0422E]/30 text-xs font-bold rounded-md uppercase tracking-wider">
                      {t?.spicy || "Spicy"}
                    </span>
                  )}
                  {tags.includes("vegetarian") && (
                    <span className="px-2.5 py-0.5 bg-[#4E5F4C]/15 text-[#4E5F4C] border border-[#4E5F4C]/30 text-xs font-bold rounded-md uppercase tracking-wider">
                      {t?.vegetarian || "Veg"}
                    </span>
                  )}
                  {tags.includes("vegan") && (
                    <span className="px-2.5 py-0.5 bg-[#4E5F4C]/15 text-[#4E5F4C] border border-[#4E5F4C]/30 text-xs font-bold rounded-md uppercase tracking-wider">
                      {t?.vegan || "Vegan"}
                    </span>
                  )}
                </div>
              )}

              {description && (
                <div className="mt-1 text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <h4 className="text-xs font-bold text-[#9C7A3F] mb-1 uppercase tracking-widest text-start" style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}>
                    {t?.description || "Details"}
                  </h4>
                  <p className="text-[#7A7364] leading-relaxed text-sm text-start" style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}>
                    {description}
                  </p>
                </div>
              )}
              
              {/* Modal Cart Action */}
              {!hideCart && item && (
                <div className="mt-2 flex items-center justify-center">
                  <CartCounter item={item} compact={false} />
                </div>
              )}

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="mt-2 w-full py-2.5 rounded-md bg-[#EDE3CE] text-[#2B2620] font-bold hover:bg-[#9C7A3F] hover:text-white transition-colors border border-[#9C7A3F]/30 text-xs uppercase tracking-wider"
              >
                {t?.close || "Close"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fullscreen Image Overlay */}
      {isFullscreenImage && image && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 modal-overlay"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button
            onClick={() => setIsFullscreenImage(false)}
            aria-label="Close fullscreen image"
            className="absolute top-6 end-6 z-[9999999] w-12 h-12 flex items-center justify-center rounded-full bg-cream text-ink hover:bg-gold hover:scale-110 transition-all shadow-[0_0_20px_rgba(250,243,231,0.3)]"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] modal-content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={image} 
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
