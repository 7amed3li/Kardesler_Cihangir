"use client";

import React, { useState } from "react";
import { ShoppingBag, X, Plus, Minus, CreditCard, Banknote } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SmartReview from "./SmartReview";

export default function Cart() {
  const { cart, removeFromCart, updateQty, t, isRtl, lang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    // Simulated checkout process
    setIsOpen(false);
    setTimeout(() => {
      setShowReview(true);
    }, 500); // Show review modal after a short delay
  };

  if (totalItems === 0 && !showReview) return null;

  return (
    <>
      {showReview && <SmartReview onClose={() => setShowReview(false)} />}
      
      {/* Floating Cart Button */}
      {totalItems > 0 && !showReview && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#D4AF37] to-[#8a6b1c] rounded-full shadow-2xl shadow-[#D4AF37]/30 hover:scale-105 transition-transform"
          >
            <ShoppingBag size={24} className="text-black" />
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full border-2 border-[#0a0a0a]">
              {totalItems}
            </span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className={`relative w-full max-w-md bg-[#111] h-full shadow-2xl border-l border-white/10 flex flex-col transform transition-transform ${isRtl ? 'border-r border-l-0' : ''}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <ShoppingBag size={24} className="text-[#D4AF37]" />
                {t.cart}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-xl"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">{item.name[lang] || item.name.en}</h4>
                    <span className="text-[#D4AF37] text-sm font-medium">
                      {(item.price * item.qty).toFixed(2)} ₺
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-black/50 rounded-lg p-1 border border-white/5">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Checkout */}
            <div className="p-5 border-t border-white/10 bg-[#0a0a0a]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">{t.total}</span>
                <span className="text-2xl font-bold text-[#D4AF37]">{totalPrice.toFixed(2)} ₺</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleCheckout} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-colors">
                  <Banknote size={24} className="text-gray-300" />
                  <span className="text-sm font-medium text-gray-300">{t.payAtTable}</span>
                </button>
                <button onClick={handleCheckout} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8a6b1c] text-black shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] transition-transform">
                  <CreditCard size={24} />
                  <span className="text-sm font-bold">{t.payOnline}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
