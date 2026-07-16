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
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-ink/90 border-b border-teal-dim/30 overflow-visible">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <img src="/logo.png" alt="Kardeşler Cihangir Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-cream leading-tight">
              Kardeşler
            </span>
            <span className="text-[9px] text-cream-dim uppercase tracking-widest opacity-80">
              Kebap & Pide
            </span>
          </div>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/about"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-teal-dim/20 border border-teal-dim/40 text-cream-dim hover:text-gold hover:border-gold transition-all"
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
