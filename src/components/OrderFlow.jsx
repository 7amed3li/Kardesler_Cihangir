"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, CheckCircle } from "lucide-react";
import PaymentMethods from "./PaymentMethods";

export default function OrderFlow() {
  const {
    t,
    menuT,
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

  return (
    <>
      {/* ═══════════════════════════════════════════
          FLOATING CART BUTTON (FAB)
          ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          STICKY BOTTOM BAR (Order Bar)
          ═══════════════════════════════════════════ */}
      {!isCartOpen && cartCount > 0 && (
        <div className="fixed bottom-0 start-0 end-0 z-50 bg-[#F7F2E7] border-t border-[#9C7A3F]/30 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-md bg-[#4E5F4C] text-white flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -top-1.5 -end-1.5 w-5 h-5 bg-[#9C7A3F] text-white text-xs font-bold flex items-center justify-center rounded-full border border-[#F7F2E7]"
                >
                  {cartCount}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-[#7A7364] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                {labels.yourOrder || "Siparişiniz"}
              </p>
              <p className="text-sm font-bold text-[#2B2620]">
                {convertPrice(cartTotal)} {symbol}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={labels.yourOrder || "Your Order"}
            id="cart-fab"
            className="px-5 py-2.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            {labels.viewCart || "Sepeti Gör"}
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          CART DRAWER
          ═══════════════════════════════════════════ */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[99998] flex items-end sm:items-stretch sm:justify-end bg-black/80 backdrop-blur-md modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="glass-card-strong w-full sm:max-w-md sm:h-full max-h-[85vh] sm:max-h-full rounded-t-3xl sm:rounded-none overflow-hidden flex flex-col cart-drawer-panel border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-teal-dim/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-copper/15 flex items-center justify-center">
                  <ShoppingBag size={16} className="text-copper" />
                </div>
                <h2 className="text-lg font-bold text-cream" style={{ fontFamily: "var(--font-cairo)" }}>
                  {labels.yourOrder || "Your Order"}
                </h2>
                {cartCount > 0 && (
                  <span className="text-xs text-cream-dim/60 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    ({cartCount})
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-cream-dim hover:text-cream transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-cream-dim/5 flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-cream-dim/20" />
                  </div>
                  <p className="text-cream-dim/60 font-medium mb-1">{labels.empty || "Your cart is empty"}</p>
                  <p className="text-cream-dim/30 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {labels.emptyHint || "Start adding items from the menu"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => {
                    const name = menuT.items[item.id]?.name || item.id;
                    const itemSubtotal = item.price * item.qty;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-ink/50 border border-teal-dim/15 group animate-cartItemIn"
                        style={{ animationDelay: `${idx * 40}ms` }}
                      >
                        {/* Thumbnail */}
                        {item.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-ink-2">
                            <Image
                              src={item.image}
                              alt={name}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="48px"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#EDE3CE] flex items-center justify-center shrink-0">
                            <ShoppingBag size={18} className="text-[#9C7A3F]" />
                          </div>
                        )}

                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cream truncate">{name}</p>
                          <p className="text-xs text-cream-dim/50 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {item.qty} × {convertPrice(item.price)} = <span className="text-copper font-bold">{convertPrice(itemSubtotal)} {symbol}</span>
                          </p>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-full border border-teal-dim/30 flex items-center justify-center text-cream-dim hover:text-brick hover:border-brick/50 transition-colors"
                          >
                            {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                          </button>
                          <span
                            key={item.qty}
                            className="w-6 text-center text-sm font-bold text-cream animate-counterPop"
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-full border border-teal-dim/30 flex items-center justify-center text-cream-dim hover:text-teal hover:border-teal/50 transition-colors"
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

            {/* Footer — Total & Actions */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-teal-dim/20 space-y-4 shrink-0">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-cream-dim text-sm font-medium">{labels.total || "Total"}</span>
                  <span className="text-xl font-black text-cream" style={{ fontFamily: "var(--font-inter)" }}>
                    {convertPrice(cartTotal)} {symbol}
                  </span>
                </div>

                {/* WhatsApp submit / Success state */}
                {orderStatus === "sent" ? (
                  <div className="flex items-center justify-center gap-3 py-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366]">
                    <CheckCircle size={20} />
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-sm">{labels.sent || "Order Sent!"}</span>
                      <span className="text-xs opacity-70">{labels.whatsappRedirect || "Redirecting to WhatsApp..."}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="px-4 py-3.5 rounded-xl border border-teal-dim/30 text-cream-dim text-sm font-medium hover:border-brick/50 hover:text-brick transition-colors"
                    >
                      {labels.clear || "Clear"}
                    </button>
                    <button
                      onClick={submitOrder}
                      id="submit-whatsapp-order"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl whatsapp-btn text-white font-bold text-sm tracking-wider"
                    >
                      <MessageCircle size={18} />
                      <span>{labels.sendWhatsApp || "Order via WhatsApp"}</span>
                    </button>
                  </div>
                )}

                {/* Accepted Payments Strip */}
                <div className="pt-3 border-t border-teal-dim/15">
                  <PaymentMethods variant="compact" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
