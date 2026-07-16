"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import LoyaltyCard from "./LoyaltyCard";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { t } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-[#0a0a0a]/80 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8a6b1c] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <span className="font-bold text-black text-xl">K</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
              Kardeşler <span className="text-[#D4AF37]">Cihangir</span>
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Kebap & Pide
            </p>
          </div>
        </Link>

        {/* Center Nav (optional for desktop) */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">{t.menu}</Link>
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors">{t.about}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LoyaltyCard />
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
