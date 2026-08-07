"use client";

import React, { useState, useRef, useEffect } from "react";
import { Coins } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const SaudiRiyalIcon = ({ className = "h-3.5 w-auto inline-block" }) => (
  <svg viewBox="0 0 1124.14 1256.39" className={`${className} fill-current`} aria-label="SAR" style={{ display: "inline-block" }}>
    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
  </svg>
);

export default function CurrencySwitcher() {
  const { currency, changeCurrency, ratesSource } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", symbol: "₺" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "SAR", symbol: <SaudiRiyalIcon className="h-3.5 w-auto" /> },
    { code: "RUB", symbol: "₽" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const isLive = ratesSource && ratesSource !== "fallback";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Currency"
        className="flex items-center gap-1.5 bg-teal-dim/20 hover:bg-teal-dim/40 border border-teal-dim/40 px-3 py-1.5 rounded-full text-cream text-xs sm:text-sm font-medium transition-all h-11 min-w-[44px] justify-center"
      >
        <Coins size={14} className="text-gold" />
        <span className="flex items-center gap-1">
          {currency === "SAR" ? <SaudiRiyalIcon className="h-3 w-auto text-gold" /> : null}
          <span>{currency}</span>
        </span>
        {/* Live indicator dot */}
        {isLive && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live rates" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-32 bg-ink-2 border border-gold/20 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50 end-0">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                changeCurrency(c.code);
                setIsOpen(false);
              }}
              className={`w-full text-start px-3.5 py-2.5 text-sm font-medium transition-colors flex items-center justify-between gap-2 ${
                currency === c.code
                  ? "bg-ink text-gold font-bold"
                  : "text-cream-dim hover:bg-ink"
              }`}
            >
              <span className="w-5 flex items-center justify-center text-center font-bold text-sm">
                {c.symbol}
              </span>
              <span className="font-semibold">{c.code}</span>
            </button>
          ))}
          {/* Source indicator */}
          <div className="px-3 py-1.5 text-[9px] text-cream-dim/40 border-t border-gold/10 text-center">
            {isLive ? "🟢 Live ECB rates" : "⏳ Loading..."}
          </div>
        </div>
      )}
    </div>
  );
}
