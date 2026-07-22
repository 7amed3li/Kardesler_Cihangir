"use client";

import React, { useState, useRef, useEffect } from "react";
import { Coins } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function CurrencySwitcher() {
  const { currency, changeCurrency, ratesSource } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", symbol: "₺" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
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
        className="flex items-center gap-1 bg-teal-dim/20 hover:bg-teal-dim/40 border border-teal-dim/40 px-2.5 py-1.5 rounded-full text-cream text-xs sm:text-sm font-medium transition-all h-8 sm:h-9"
      >
        <Coins size={14} className="text-gold" />
        <span>{currency}</span>
        {/* Live indicator dot */}
        {isLive && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live rates" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-28 bg-ink-2 border border-gold/20 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50 end-0">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                changeCurrency(c.code);
                setIsOpen(false);
              }}
              className={`w-full text-start px-4 py-2.5 text-sm font-medium transition-colors ${
                currency === c.code
                  ? "bg-ink text-gold font-bold"
                  : "text-cream-dim hover:bg-ink"
              }`}
            >
              {c.symbol} {c.code}
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
