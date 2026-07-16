"use client";

import React, { useState, useRef, useEffect } from "react";
import { Coins } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = [
    { code: "TRY", symbol: "₺" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-full text-white text-xs sm:text-sm font-medium transition-all h-8 sm:h-9"
      >
        <Coins size={14} className="text-[#D4AF37]" />
        <span>{currency}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-28 bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden shadow-2xl z-50 end-0">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                changeCurrency(c.code);
                setIsOpen(false);
              }}
              className={`w-full text-start px-4 py-2.5 text-sm font-medium transition-colors ${
                currency === c.code
                  ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                  : "text-gray-300 hover:bg-[#333]"
              }`}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
