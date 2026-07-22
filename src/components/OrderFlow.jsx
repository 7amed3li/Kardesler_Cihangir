"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { ShoppingBag, X, Plus, Minus, Trash2, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function OrderFlow() {
  const {
    t,
    menuT,
    lang,
    cart,
    cartCount,
    cartTotal,
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
      {/* Floating Cart Button */}
      {!isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={labels.yourOrder}
          className="fixed bottom-6 end-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-copper to-copper/80 text-cream flex items-center justify-center shadow-[0_4px_24px_rgba(198,98,43,0.4)] hover:scale-110 transition-all duration-300 animate-fadeInUp"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -end-1 w-6 h-6 bg-teal text-cream text-xs font-bold flex items-center justify-center rounded-full border-2 border-ink animate-scaleIn">
              {cartCount}
            </span>
          )}
        </button>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[99998] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="glass-card-strong w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col modal-content border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-teal-dim/20">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-cream" style={{ fontFamily: "var(--font-cairo)" }}>
                  {labels.yourOrder}
                </h2>
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag size={40} className="text-cream-dim/20 mb-4" />
                  <p className="text-cream-dim/60 font-medium mb-1">{labels.empty}</p>
                  <p className="text-cream-dim/30 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {labels.emptyHint}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => {
                    const name = menuT.items[item.id]?.name || item?.name?.en || "";
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-ink/50 border border-teal-dim/15 group"
                      >
                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cream truncate">{name}</p>
                          <p className="text-xs text-copper font-bold mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {convertPrice(item.price)} {symbol}
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
                          <span className="w-6 text-center text-sm font-bold text-cream">{item.qty}</span>
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
              <div className="px-6 py-5 border-t border-teal-dim/20 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-cream-dim text-sm font-medium">{labels.total}</span>
                  <span className="text-xl font-black text-cream" style={{ fontFamily: "var(--font-inter)" }}>
                    {convertPrice(cartTotal)} {symbol}
                  </span>
                </div>

                {/* Status-based action button */}
                {orderStatus === "sent" ? (
                  <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-teal/15 border border-teal/30 text-teal">
                    <CheckCircle size={20} />
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-sm">{labels.sent}</span>
                      <span className="text-xs opacity-70">{labels.sentHint}</span>
                    </div>
                  </div>
                ) : orderStatus === "error" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brick/15 border border-brick/30 text-brick">
                      <AlertCircle size={18} />
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-sm">{labels.error}</span>
                        <span className="text-xs opacity-70">{labels.errorHint}</span>
                      </div>
                    </div>
                    <button
                      onClick={submitOrder}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-copper to-copper/80 text-cream font-bold text-sm tracking-wider hover:shadow-[0_0_24px_rgba(198,98,43,0.3)] transition-all"
                    >
                      {labels.sendOrder}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="px-4 py-3.5 rounded-xl border border-teal-dim/30 text-cream-dim text-sm font-medium hover:border-brick/50 hover:text-brick transition-colors"
                    >
                      {labels.clear}
                    </button>
                    <button
                      onClick={submitOrder}
                      disabled={orderStatus === "sending"}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-copper to-copper/80 text-cream font-bold text-sm tracking-wider hover:shadow-[0_0_24px_rgba(198,98,43,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {orderStatus === "sending" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>{labels.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{labels.sendOrder}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
