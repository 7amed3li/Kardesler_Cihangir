"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { Banknote } from "lucide-react";

export const PAYMENT_METHODS = [
  {
    id: "cash",
    name: "Nakit / Cash",
    category: "cash",
    logo: (
      <div className="flex items-center justify-center gap-1.5 w-full h-full">
        <Banknote className="w-5 h-5 text-teal shrink-0" />
        <div className="flex flex-col text-start leading-none">
          <span className="text-[11px] font-black text-cream tracking-tight">NAKİT</span>
          <span className="text-[8px] text-cream-dim/60 font-semibold uppercase">Cash / كاش</span>
        </div>
      </div>
    ),
    isDark: true
  },
  {
    id: "visa",
    name: "Visa",
    category: "card",
    logo: (
      <svg viewBox="0 0 64 22" className="h-5 w-auto" aria-label="Visa">
        <path fill="#1A1F71" d="M25.7 0.8L16.9 21.2H11.2L6.8 4.5C6.5 3.4 6.2 3 5.4 2.6C4.1 1.9 2 1.2 0 0.8L0.1 0.3H9.2C10.4 0.3 11.4 1.1 11.6 2.4L13.9 14.6L19.6 0.8H25.7ZM48.3 14.5C48.3 9 40.8 8.7 40.9 6.2C40.9 5.4 41.6 4.7 43.1 4.4C43.8 4.3 45.9 4.3 48.4 5.5L49.3 1.1C48.1 0.6 46.4 0.1 44.4 0.1C38.9 0.1 35.2 3.1 35.1 7.4C35.1 10.6 37.9 12.4 40 13.5C42.1 14.6 42.9 15.3 42.9 16.3C42.9 17.8 41.2 18.5 39.6 18.5C36.8 18.5 35.2 18.1 34 17.4L33.1 21.9C34.5 22.6 37.1 23.2 39.7 23.2C45.5 23.2 48.3 20.1 48.3 14.5ZM62.5 21.2H67.4L63 0.8H58.5C57.4 0.8 56.6 1.4 56.2 2.3L48 21.2H53.9L55.1 17.8H61.7L62.5 21.2ZM56.7 13.2L59.4 5.7L61 13.2H56.7ZM34.3 0.8L29.8 21.2H24.3L28.8 0.8H34.3Z"/>
      </svg>
    ),
    isDark: false
  },
  {
    id: "mastercard",
    name: "Mastercard",
    category: "card",
    logo: (
      <div className="flex items-center justify-center gap-1.5 w-full h-full">
        <svg viewBox="0 0 34 22" className="h-6 w-auto shrink-0" aria-label="Mastercard">
          <circle cx="11" cy="11" r="10" fill="#EB001B" />
          <circle cx="23" cy="11" r="10" fill="#F79E1B" fillOpacity="0.92" />
          <path d="M17 3.5a9.9 9.9 0 0 1 3.8 7.5 9.9 9.9 0 0 1-3.8 7.5 9.9 9.9 0 0 1-3.8-7.5c0-2.9 1.4-5.6 3.8-7.5z" fill="#FF5F00" />
        </svg>
        <span className="text-[10px] font-black text-black tracking-tighter" style={{ fontFamily: "sans-serif" }}>mastercard</span>
      </div>
    ),
    isDark: false
  },
  {
    id: "troy",
    name: "TROY",
    category: "card",
    logo: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-[#00579F] font-black text-sm tracking-wider" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          TR<span className="text-[#E30613]">O</span>Y
        </span>
      </div>
    ),
    isDark: false
  },
  {
    id: "istanbulkart",
    name: "İstanbulkart",
    category: "transit",
    logo: (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#008375] to-[#00A896] flex items-center justify-center shadow-xs shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        </div>
        <div className="flex flex-col text-start leading-none">
          <span className="font-extrabold text-[11px] text-[#008375] tracking-tight">
            istanbul<span className="text-[#E30613]">kart</span>
          </span>
          <span className="text-[7px] text-slate-400 font-semibold tracking-tighter">TEMASSIZ ÖDEME</span>
        </div>
      </div>
    ),
    isDark: false
  },
  {
    id: "multinet",
    name: "MultiNet",
    category: "mealcard",
    logo: (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] shrink-0 shadow-xs"></span>
        <div className="flex flex-col text-start leading-none">
          <span className="font-extrabold text-[11px] text-[#E30613] tracking-tight">
            multi<span className="text-[#2D3192]">net</span>
          </span>
          <span className="text-[7px] text-slate-400 font-semibold tracking-tighter">YEMEK KARTI & APP</span>
        </div>
      </div>
    ),
    isDark: false
  },
  {
    id: "metropol",
    name: "Metropol Card",
    category: "mealcard",
    logo: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="font-black text-xs text-[#0A2540] tracking-tight">
          metropol<span className="text-[#FF5A00]">card</span>
        </span>
      </div>
    ),
    isDark: false
  },
  {
    id: "setcard",
    name: "Setcard",
    category: "mealcard",
    logo: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="font-black text-xs text-[#E6332A] tracking-wider">
          SET<span className="text-[#1A1A1A]">CARD</span>
        </span>
      </div>
    ),
    isDark: false
  },
  {
    id: "pluxee",
    name: "Pluxee (Sodexo)",
    category: "mealcard",
    logo: (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <span className="w-2 h-2 rounded-full bg-[#00EB5E] animate-pulse shrink-0"></span>
        <div className="flex flex-col text-start leading-none">
          <span className="font-black text-xs text-[#00EB5E] tracking-tight">pluxee</span>
          <span className="text-[7px] text-cream-dim/60 font-semibold">(SODEXO)</span>
        </div>
      </div>
    ),
    isDark: true
  },
  {
    id: "ticket",
    name: "Ticket Restaurant (Edenred)",
    category: "mealcard",
    logo: (
      <div className="flex items-center justify-center gap-1.5 w-full h-full">
        <div className="w-4 h-4 rounded-full bg-[#ED1C24] flex items-center justify-center text-white text-[9px] font-black shrink-0">
          E
        </div>
        <div className="flex flex-col text-start leading-tight">
          <span className="font-black text-[11px] text-[#ED1C24] leading-none">Ticket</span>
          <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tight">Restaurant</span>
        </div>
      </div>
    ),
    isDark: false
  }
];

export default function PaymentMethods({ variant = "default" }) {
  const { t } = useAppContext();
  const fc = t?.footer || {};

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#9C7A3F]">
          <CreditCard size={14} className="text-[#9C7A3F]" />
          <span>{fc.paymentMethods || "Ödeme Seçenekleri"}</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {PAYMENT_METHODS.map((pm) => (
            <div
              key={pm.id}
              className={`h-10 rounded-xl px-2 py-1 flex items-center justify-center border shadow-xs transition-transform hover:scale-102 ${
                pm.isDark
                  ? "bg-ink-2/95 border-teal-dim/30"
                  : "bg-white border-slate-200"
              }`}
            >
              {pm.logo}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 p-5 sm:p-7 rounded-2xl bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-sm text-center">
      {/* Header */}
      <div className="inline-flex items-center justify-center gap-3 mb-1.5">
        <span className="h-px w-8 bg-[#9C7A3F]/40" />
        <p 
          className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] text-[#9C7A3F]" 
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {fc.paymentMethods || "Kabul Edilen Ödeme Yöntemleri"}
        </p>
        <span className="h-px w-8 bg-[#9C7A3F]/40" />
      </div>

      <p className="text-xs text-[#7A7364] mb-5 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
        {fc.paymentSubtitle || "Tüm kredi kartları, temassız İstanbulkart ve kurumsal yemek kartları geçerlidir"}
      </p>

      {/* Uniform Responsive Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
        {PAYMENT_METHODS.map((pm) => (
          <div
            key={pm.id}
            className={`h-12 rounded-lg px-3 py-1 flex items-center justify-center border transition-transform hover:scale-102 cursor-default ${
              pm.isDark
                ? "bg-[#2B2620] border-[#2B2620]"
                : "bg-white border-slate-200"
            }`}
          >
            {pm.logo}
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-5 pt-4 border-t border-[#9C7A3F]/20 max-w-2xl mx-auto">
        <p className="text-xs text-[#7A7364] font-medium leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          {fc.paymentNote || "Masada nakit, kredi kartı, temassız İstanbulkart ve tüm kurumsal yemek kartları ile ödeme yapabilirsiniz."}
        </p>
      </div>
    </div>
  );
}
