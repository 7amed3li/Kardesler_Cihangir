"use client";

import React, { useState } from "react";
import { Coins } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function CurrencySwitcher() {
  const { currency, changeCurrency } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: "TRY", label: "TRY (₺)" },
    { code: "USD", label: "USD ($)" },
    { code: "EUR", label: "EUR (€)" },
    { code: "GBP", label: "GBP (£)" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-white text-sm font-bold transition-all shadow-md"
      >
        <Coins size={16} className="text-[#D4AF37]" />
        <span>{currency}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                changeCurrency(c.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${
                currency === c.code
                  ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
