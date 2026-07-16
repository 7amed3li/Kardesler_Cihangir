"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { useAppContext } from "../context/AppContext";
import { Info } from "lucide-react";

export default function Header() {
  const { t } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-[#0a0a0a]/90 border-b border-white/5 overflow-visible">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8a6b1c] flex items-center justify-center">
            <span className="font-bold text-black text-base sm:text-xl">K</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-white leading-tight">
              Kardeşler
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest hidden sm:block">
              Kebap & Pide
            </span>
          </div>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/about"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            title={t.about}
          >
            <Info size={16} />
          </Link>
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
