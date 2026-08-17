"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { useAppContext } from "../context/AppContext";
import { Menu, Home, Info, Phone, UtensilsCrossed, Calendar } from "lucide-react";

export default function Header() {
  const { t, lang } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const guideHref = {
    tr: "/tr/best-kebab-taksim",
    ar: "/ar/best-kebab-taksim",
    ru: "/ru/best-kebab-taksim",
    fa: "/fa/best-kebab-taksim",
    fr: "/fr/best-kebab-taksim",
    en: "/best-kebab-taksim",
  }[lang] || "/best-kebab-taksim";

  const getNavLabel = (key) => {
    if (key === "home") {
      if (lang === "ar") return "الرئيسية";
      if (lang === "zh") return "首页";
      if (lang === "de") return "Startseite";
      if (lang === "it") return "Home";
      if (lang === "es") return "Inicio";
      if (lang === "tr") return "Ana Sayfa";
      if (lang === "fa") return "صفحه اصلی";
      if (lang === "fr") return "Accueil";
      if (lang === "ru") return "Главная";
      return t.home || "Home";
    }
    if (key === "menu") {
      if (lang === "ar") return "القائمة الكاملة";
      if (lang === "zh") return "完整菜单";
      if (lang === "de") return "Speisekarte";
      if (lang === "it") return "Menu";
      if (lang === "es") return "Menú";
      if (lang === "tr") return "Menü";
      if (lang === "fa") return "منو";
      if (lang === "fr") return "Menu";
      if (lang === "ru") return "Меню";
      return t.menu || "Menu";
    }
    if (key === "about") {
      if (lang === "ar") return "من نحن";
      if (lang === "zh") return "关于我们";
      if (lang === "de") return "Über uns";
      if (lang === "it") return "Chi Siamo";
      if (lang === "es") return "Nosotros";
      if (lang === "tr") return "Hakkımızda";
      if (lang === "fa") return "درباره ما";
      if (lang === "fr") return "À Propos";
      if (lang === "ru") return "О нас";
      return t.about || "About Us";
    }
    if (key === "contact") {
      if (lang === "ar") return "التواصل والحجز";
      if (lang === "zh") return "联系我们";
      if (lang === "de") return "Kontakt";
      if (lang === "it") return "Contatti";
      if (lang === "es") return "Contacto";
      if (lang === "tr") return "İletişim";
      if (lang === "fa") return "تماس با ما";
      if (lang === "fr") return "Contact";
      if (lang === "ru") return "Контакты";
      return t.contact || "Contact";
    }
    if (key === "taksimGuide") {
      if (lang === "ar") return "دليل أفضل كباب في تقسيم";
      if (lang === "zh") return "塔克西姆最佳烤肉指南";
      if (lang === "de") return "Bester Kebab Taksim Guide";
      if (lang === "it") return "Guida Miglior Kebab Taksim";
      if (lang === "es") return "Guía Mejor Kebab en Taksim";
      if (lang === "tr") return "Taksim En İyi Kebap Rehberi";
      if (lang === "fa") return "راهنمای بهترین کباب تقسیم";
      if (lang === "fr") return "Guide Meilleur Kebab Taksim";
      if (lang === "ru") return "Гид по лучшему кебабу";
      return "Best Kebab Taksim Guide";
    }
    return "";
  };

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
      <header className="sticky top-0 z-40 w-full bg-[#F7F2E7] border-b-2 border-[#9C7A3F]/35 shadow-xs overflow-visible animate-fadeIn">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-15 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#FAF7F0] p-1 border-2 border-[#9C7A3F]/40 shadow-xs flex items-center justify-center overflow-hidden">
              <Image 
                src="/logo.webp" 
                alt="Kardeşler Cihangir Logo" 
                fill 
                priority 
                sizes="96px" 
                style={{ objectFit: 'contain' }} 
                className="transition-transform group-hover:scale-105 p-0.5 filter contrast-110 brightness-105" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-[#2B2620] leading-none" style={{ fontFamily: "var(--font-cairo)" }}>
                Kardeşler
              </span>
              <span className="text-[10px] font-bold text-[#9C7A3F] uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                Kebap & Pide
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">            <CurrencySwitcher />
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
                <div className="absolute end-0 mt-2 w-56 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-lg overflow-hidden z-50 animate-fadeIn">
                  <div className="py-2 flex flex-col">                    <Link 
                      href="/" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Home size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("home")}</span>
                    </Link>
                    <Link 
                      href="/menu" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <UtensilsCrossed size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("menu")}</span>
                    </Link>
                    <Link 
                      href="/about" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Info size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("about")}</span>
                    </Link>
                    <Link 
                      href="/contact" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs font-semibold text-[#2B2620] hover:bg-[#EDE3CE] transition-colors"
                    >
                      <Phone size={15} className="text-[#4E5F4C]" />
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("contact")}</span>
                    </Link>
                    <div className="h-px bg-[#9C7A3F]/20 my-1"></div>
                    <Link 
                      href={guideHref} 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2.5 flex items-center gap-3 text-xs text-[#9C7A3F] hover:bg-[#EDE3CE] transition-colors font-bold"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#9C7A3F]"></span>
                      <span style={{ fontFamily: "var(--font-cairo)" }}>{getNavLabel("taksimGuide")}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
