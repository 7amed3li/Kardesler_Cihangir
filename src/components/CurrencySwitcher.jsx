"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SaudiRiyalIcon from "./SaudiRiyalIcon";
export { SaudiRiyalIcon };

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", label: "Türk Lirası", symbol: "₺" },
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "GBP", label: "British Pound", symbol: "£" },
    { code: "SAR", label: "ريال سعودي", symbol: <SaudiRiyalIcon className="h-3.5 w-auto" /> },
    { code: "RUB", label: "Российский рубль", symbol: "₽" },
  ];

  const currentCurrencyObj = currencies.find((c) => c.code === currency) || currencies[0];

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current Currency: ${currency}`}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all h-10 min-w-[40px] text-xs font-semibold ${
          isOpen
            ? "bg-gold/15 border-gold text-gold shadow-sm"
            : "bg-teal-dim/15 border-teal-dim/35 text-cream hover:text-gold hover:border-gold/60 hover:bg-gold/10"
        }`}
      >
        <span className="text-gold font-bold">{currentCurrencyObj.symbol}</span>
        <span className="tracking-wider">{currency}</span>
        <ChevronDown
          size={12}
          className={`text-cream-dim transition-transform duration-200 ${
            isOpen ? "rotate-180 text-gold" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 bg-[#140E0A] border border-gold/30 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] z-50 end-0 p-1 animate-fadeInUp">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-gold/80 font-bold border-b border-gold/10">
            Döviz / Currency
          </div>
          <div className="py-1 space-y-0.5">
            {currencies.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    changeCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-start px-3 py-2 text-xs rounded-xl font-medium transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-copper/20 to-gold/20 text-gold font-bold border border-gold/30"
                      : "text-cream-dim hover:bg-ink-2 hover:text-cream"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-ink flex items-center justify-center text-gold font-bold text-xs border border-teal-dim/30">
                      {c.symbol}
                    </span>
                    <span className="font-semibold">{c.code}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-gold shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
