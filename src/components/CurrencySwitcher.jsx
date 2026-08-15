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
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors h-9 text-xs font-semibold ${
          isOpen
            ? "bg-[#9C7A3F]/20 border-[#9C7A3F] text-[#9C7A3F]"
            : "bg-[#F7F2E7] border-[#9C7A3F]/30 text-[#2B2620] hover:border-[#9C7A3F]"
        }`}
      >
        <span className="text-[#9C7A3F] font-bold">{currentCurrencyObj.symbol}</span>
        <span className="tracking-wider">{currency}</span>
        <ChevronDown
          size={12}
          className={`text-[#7A7364] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#9C7A3F]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-md overflow-hidden shadow-lg z-50 end-0 p-1 animate-fadeIn">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#9C7A3F] font-bold border-b border-[#9C7A3F]/20">
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
                  className={`w-full text-start px-3 py-2 text-xs rounded-md font-medium transition-colors flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-[#4E5F4C] text-white font-bold"
                      : "text-[#2B2620] hover:bg-[#EDE3CE]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-[#EDE3CE] flex items-center justify-center text-[#9C7A3F] font-bold text-xs border border-[#9C7A3F]/20">
                      {c.symbol}
                    </span>
                    <span className="font-semibold">{c.code}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
