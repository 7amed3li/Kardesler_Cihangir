"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const languagesConfig = [
  { code: "tr", name: "Türkçe", short: "TR", flag: "🇹🇷" },
  { code: "en", name: "English", short: "EN", flag: "🇬🇧" },
  { code: "ar", name: "العربية", short: "AR", flag: "🇸🇦" },
  { code: "ru", name: "Русский", short: "RU", flag: "🇷🇺" },
  { code: "fa", name: "فارسی", short: "FA", flag: "🇮🇷" },
  { code: "fr", name: "Français", short: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const { lang, changeLang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentLangObj = languagesConfig.find((l) => l.code === lang) || languagesConfig[0];

  const isLandingPage = pathname && (
    pathname === "/best-kebab-taksim" ||
    pathname.endsWith("/best-kebab-taksim")
  );

  const selectLang = (code) => {
    changeLang(code);
    setIsOpen(false);

    if (isLandingPage) {
      const targetRoutes = {
        tr: "/tr/best-kebab-taksim",
        en: "/best-kebab-taksim",
        ar: "/ar/best-kebab-taksim",
        ru: "/ru/best-kebab-taksim",
        fa: "/fa/best-kebab-taksim",
        fr: "/fr/best-kebab-taksim",
      };
      const targetUrl = targetRoutes[code] || "/best-kebab-taksim";
      if (pathname !== targetUrl) {
        router.push(targetUrl);
      }
    }
  };

  // Close dropdown when clicking outside
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
        aria-label={`Selected Language: ${currentLangObj.name}`}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all h-10 min-w-[40px] text-xs font-semibold ${
          isOpen
            ? "bg-gold/15 border-gold text-gold shadow-sm"
            : "bg-teal-dim/15 border-teal-dim/35 text-cream hover:text-gold hover:border-gold/60 hover:bg-gold/10"
        }`}
      >
        <span className="text-sm leading-none" role="img" aria-label={currentLangObj.name}>
          {currentLangObj.flag}
        </span>
        <span className="tracking-wider">{currentLangObj.short}</span>
        <ChevronDown
          size={12}
          className={`text-cream-dim transition-transform duration-200 ${
            isOpen ? "rotate-180 text-gold" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-48 bg-[#140E0A] border border-gold/30 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden z-50 p-1.5 animate-fadeInUp">
          <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-gold/80 font-bold border-b border-gold/10">
            <span className="flex items-center gap-1">
              <Globe size={11} className="text-gold" />
              Dil / Language
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold/15 text-gold font-normal">
              6 Languages
            </span>
          </div>

          <div className="py-1 space-y-0.5">
            {languagesConfig.map((item) => {
              const isSelected = lang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => selectLang(item.code)}
                  className={`w-full px-3 py-2 text-xs rounded-xl font-medium transition-all flex items-center justify-between gap-2 text-start ${
                    isSelected
                      ? "bg-gradient-to-r from-copper/20 to-gold/20 text-gold font-bold border border-gold/30"
                      : "text-cream-dim hover:bg-ink-2 hover:text-cream"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-gold shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
