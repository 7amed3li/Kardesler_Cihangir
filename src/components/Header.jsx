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

  const guideHref = lang === "ar" 
    ? "/ar/best-kebab-taksim" 
    : lang === "ru" 
    ? "/ru/best-kebab-taksim" 
    : "/best-kebab-taksim";

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
      <header className="sticky top-0 z-40 w-full glass-card-strong border-b border-teal-dim/20 overflow-visible animate-fadeInDown">
        {/* Subtle glow line under header */}
        <div className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent"></div>

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
              <span className="text-[9px] text-cream-dim uppercase tracking-widest opacity-80" style={{ fontFamily: "var(--font-inter)" }}>
                Kebap & Pide
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Table Reservation Button (Desktop/Tablet) */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-copper/90 to-gold/90 hover:from-copper hover:to-gold text-cream font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm shadow-copper/20"
            >
              <Calendar size={13} className="text-cream" />
              <span>{reserveText}</span>
            </button>

            <CurrencySwitcher />
            <LanguageSwitcher />

            {/* Navigation Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isMenuOpen 
                    ? "bg-gold/20 border-gold text-gold" 
                    : "bg-teal-dim/20 border-teal-dim/40 text-cream-dim hover:text-gold hover:border-gold hover:bg-gold/10"
                }`}
                aria-label="Menu"
              >
                <Menu size={16} />
              </button>

              {/* Dropdown */}
              {isMenuOpen && (
                <div className="absolute end-0 mt-2 w-48 rounded-xl bg-ink border border-teal-dim/30 shadow-xl overflow-hidden animate-fadeInUp z-50">
                  <div className="py-2 flex flex-col">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsReservationOpen(true);
                      }}
                      className="px-4 py-2.5 flex items-center gap-3 text-sm text-copper font-medium hover:bg-teal-dim/20 transition-colors text-start w-full"
                    >
                      <Calendar size={16} className="text-copper" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{reserveText}</span>
                    </button>

                    <div className="h-px bg-teal-dim/20 my-1"></div>

                    <Link 
                      href="/" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-sm text-cream hover:bg-teal-dim/20 transition-colors"
                    >
                      <Home size={16} className="text-teal" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.home || "Ana Sayfa"}</span>
                    </Link>
                    <Link 
                      href="/menu" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-sm text-cream hover:bg-teal-dim/20 transition-colors"
                    >
                      <UtensilsCrossed size={16} className="text-copper" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.menuLink || "Menü"}</span>
                    </Link>
                    <Link 
                      href="/about" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-sm text-cream hover:bg-teal-dim/20 transition-colors"
                    >
                      <Info size={16} className="text-teal" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{t.about || "Hakkımızda"}</span>
                    </Link>
                    <Link 
                      href="/contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-sm text-cream hover:bg-teal-dim/20 transition-colors"
                    >
                      <Phone size={16} className="text-teal" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{(t.footer && t.footer.contact) ? t.footer.contact : "İletişim"}</span>
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
