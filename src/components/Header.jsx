"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { useAppContext } from "../context/AppContext";
import { Info } from "lucide-react";

export default function Header() {
  const { t } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full glass-card-strong border-b border-teal-dim/20 overflow-visible animate-fadeInDown">
      {/* Subtle glow line under header */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent"></div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 group">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform shrink-0">
            <Image src="/logo.webp" alt="Kardeşler Cihangir Logo" fill priority sizes="40px" style={{ objectFit: 'contain' }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-cream leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
              Kardeşler
            </span>
            <span className="text-[9px] text-cream-dim uppercase tracking-widest opacity-80" style={{ fontFamily: "var(--font-playfair)" }}>
              Kebap & Pide
            </span>
          </div>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/about"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-teal-dim/20 border border-teal-dim/40 text-cream-dim hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
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
