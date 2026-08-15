"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import ReservationModal from "./ReservationModal";
import { useAppContext } from "../context/AppContext";
import { Menu, Home, Info, Phone, UtensilsCrossed, Calendar, Flame } from "lucide-react";

export default function Header() {
  const { t, lang } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const menuRef = useRef(null);

  const guideHref = {
    tr: "/tr/best-kebab-taksim",
    ar: "/ar/best-kebab-taksim",
    ru: "/ru/best-kebab-taksim",
    fa: "/fa/best-kebab-taksim",
    fr: "/fr/best-kebab-taksim",
    en: "/best-kebab-taksim",
  }[lang] || "/best-kebab-taksim";

  const reserveText = {
    tr: "Rezervasyon",
    en: "Reserve",
    ar: "حجز طاولة",
    ru: "Столик",
    fa: "رزرو میز",
    fr: "Réserver",
  }[lang] || "Reserve";

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#EDE3CE] border-b border-[#9C7A3F]/20 overflow-visible animate-fadeIn">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
              <Image src="/logo.webp" alt="Kardeşler Cihangir Logo" fill priority sizes="40px" style={{ objectFit: 'contain' }} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-[#2B2620] leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
                Kardeşler
              </span>
              <span className="text-[9px] text-[#7A7364] uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
                Kebap & Pide
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Table Reservation Button (Desktop/Tablet) */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              <Calendar size={13} className="text-white" />
              <span>{reserveText}</span>
            </button>

            <CurrencySwitcher />
            <LanguageSwitcher />

            {/* Navigation Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors ${
                  isMenuOpen 
                    ? "bg-[#9C7A3F]/20 border-[#9C7A3F] text-[#9C7A3F]" 
                    : "bg-[#F7F2E7] border-[#9C7A3F]/30 text-[#2B2620] hover:border-[#9C7A3F]"
                }`}
                aria-label="Menu"
              >
                <Menu size={16} />
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div className="absolute end-0 mt-2 w-52 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-lg overflow-hidden z-50 animate-fadeIn">
                  <div className="py-2 flex flex-col">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsReservationOpen(true);
                      }}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-[#9C7A3F] hover:bg-[#EDE3CE] transition-colors text-start w-full uppercase tracking-wider"
                    >
                      <Calendar size={15} className="text-[#9C7A3F]" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{reserveText}</span>
                    </button>

                    <div className="h-px bg-[#9C7A3F]/20 my-1"></div>

                    <Link 
                      href="/" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Home size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.home || "Ana Sayfa"}</span>
                    </Link>
                    <Link 
                      href="/menu" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <UtensilsCrossed size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.menuLink || "Menü"}</span>
                    </Link>
                    <Link 
                      href="/about" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Info size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.about || "Hakkımızda"}</span>
                    </Link>
                    <Link 
                      href="/contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Phone size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{(t.footer && t.footer.contact) ? t.footer.contact : "İletişim"}</span>
                    </Link>
                    <div className="h-px bg-[#9C7A3F]/20 my-1"></div>
                    <Link 
                      href={guideHref} 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs text-[#9C7A3F] hover:bg-[#EDE3CE] transition-colors font-bold"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#9C7A3F]"></span>
                      <span style={{ fontFamily: "var(--font-inter)" }}>
                        {{
                          ar: "أفضل كباب في تقسيم",
                          en: "Best Kebab Taksim",
                          tr: "Taksim En İyi Kebap",
                          ru: "Лучший кебаб Таксим",
                          fa: "بهترین کباب تقسیم",
                          fr: "Meilleur Kebab Taksim",
                        }[lang] || "Best Kebab Taksim"}
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
