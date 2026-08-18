"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { ClipboardList, X, Plus, Minus, Trash2, MessageCircle, CheckCircle } from "lucide-react";

export default function OrderFlow() {
  const {
    t,
    menuT,
    lang,
    cart,
    cartCount,
    cartTotal,
    cartPulse,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    submitOrder,
    orderStatus,
    convertPrice,
    getCurrencySymbol,
  } = useAppContext();

  const symbol = getCurrencySymbol();
  const labels = t.orderFlow || {};
  const isRTL = lang === "ar" || lang === "fa";

  const waiterText = lang === "ar" ? "اعرض هذه القائمة للجرسون لإتمام طلبك" : 
                     lang === "tr" ? "Siparişinizi vermek için bu listeyi garsona gösterin" : 
                     "Show this list to the waiter to order";

  const listTitle = lang === "ar" ? "قائمتي" : 
                    lang === "tr" ? "Listem" : 
                    "My List";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ═══════════════════════════════════════════
          FAB (Floating Action Button) - My List
          ═══════════════════════════════════════════ */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-[99990] flex items-center gap-2 bg-[#9C7A3F] text-white px-5 py-3.5 rounded-full shadow-xl hover:bg-[#7A5F2E] hover:scale-105 transition-all duration-300 ${cartPulse ? 'animate-bounce' : ''}`}
        >
          <ClipboardList size={22} />
          <span className="font-bold text-[15px]" style={{ fontFamily: "var(--font-cairo)" }}>
            {listTitle} ({cartCount})
          </span>
        </button>
      )}

      {/* ═══════════════════════════════════════════
          LIST DRAWER (Bottom Sheet)
          ═══════════════════════════════════════════ */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[99998] flex items-end sm:items-stretch sm:justify-end bg-black/80 backdrop-blur-md modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="bg-[#FAF7F0] w-full sm:max-w-md sm:h-full max-h-[90vh] sm:max-h-full rounded-t-3xl sm:rounded-none overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#9C7A3F]/20 shrink-0 bg-[#F7F2E7]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#9C7A3F]/15 flex items-center justify-center">
                  <ClipboardList size={18} className="text-[#9C7A3F]" />
                </div>
                <h2 className="text-xl font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                  {listTitle}
                </h2>
                {cartCount > 0 && (
                  <span className="text-sm text-[#7A7364] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    ({cartCount})
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close list"
                className="w-8 h-8 rounded-full bg-[#EDE3CE] flex items-center justify-center text-[#2B2620] hover:bg-[#9C7A3F] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Waiter Prominent Instruction */}
            <div className="bg-[#4E5F4C] text-white px-6 py-3 text-center shrink-0 shadow-sm z-10">
              <p className="font-bold text-sm sm:text-base leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
                {waiterText}
              </p>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 bg-[#EDE3CE]/30">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#9C7A3F]/10 flex items-center justify-center mb-5">
                    <ClipboardList size={32} className="text-[#9C7A3F]/40" />
                  </div>
                  <p className="text-[#7A7364] font-medium mb-1">{labels.empty || "Your list is empty"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => {
                    const name = menuT.items[item.id]?.name || item.id;
                    const itemSubtotal = item.price * item.qty;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#9C7A3F]/15 shadow-sm group animate-fadeIn"
                      >
                        {/* Thumbnail */}
                        {item.image ? (
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative bg-[#EDE3CE]">
                            <Image
                              src={item.image}
                              alt={name}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="56px"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#EDE3CE] flex items-center justify-center shrink-0">
                            <ClipboardList size={18} className="text-[#9C7A3F]" />
                          </div>
                        )}

                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#2B2620] truncate" style={{ fontFamily: "var(--font-cairo)" }}>{name}</p>
                          <p className="text-[11px] text-[#7A7364] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {convertPrice(itemSubtotal)} {symbol}
                          </p>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-[#F7F2E7] rounded-lg p-1 border border-[#9C7A3F]/20">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#2B2620] shadow-sm hover:text-[#A0422E] transition-colors"
                          >
                            {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                          </button>
                          <span
                            key={item.qty}
                            className="w-5 text-center text-xs font-bold text-[#2B2620]"
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-md bg-[#9C7A3F] flex items-center justify-center text-white shadow-sm hover:bg-[#7A5F2E] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer — Actions */}
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-[#9C7A3F]/20 bg-[#FAF7F0] space-y-3 shrink-0">
                
                {/* Total (Subtle) */}
                <div className="flex items-center justify-center gap-2 text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                  <span>{labels.total || "Estimated Total:"}</span>
                  <span>{convertPrice(cartTotal)} {symbol}</span>
                </div>

                {/* Clear List */}
                <div className="flex justify-center pt-2 pb-1">
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-[#A0422E] font-medium hover:underline opacity-80"
                  >
                    {labels.clear || "Clear List"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
