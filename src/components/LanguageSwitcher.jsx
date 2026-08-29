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
  { code: "de", name: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "it", name: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "es", name: "Español", short: "ES", flag: "🇪🇸" },
  { code: "zh", name: "中文", short: "ZH", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const { lang, changeLang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentLangObj = languagesConfig.find((l) => l.code === lang) || languagesConfig[0];

  const selectLang = (code) => {
    changeLang(code);
    setIsOpen(false);

    if (!pathname) return;

    // Split pathname into parts
    const parts = pathname.split("/").filter(Boolean);
    const knownLocales = ["ar", "tr", "ru", "fa", "fr", "de", "it", "es", "zh", "en"];
    
    if (parts.length > 0 && knownLocales.includes(parts[0])) {
      parts.shift(); // Remove the locale part from the array
    }

    let baseRoute = `/${parts.join("/")}`;
    
    // Special case for design-development route
    if (baseRoute === "/tasarim-gelistirme" && code === "en") {
      baseRoute = "/en/design-development";
    } else if (baseRoute === "/design-development" || baseRoute === "/en/design-development") {
      if (code === "tr") baseRoute = "/tasarim-gelistirme";
      else if (code !== "en") baseRoute = `/${code}/design-development`; // although other languages might not exist, fallback safely
    }

    // Default locale (en) uses root paths, except for special cases like /en/design-development which are already handled
    let targetUrl = baseRoute;
    if (code !== "en" && baseRoute !== "/tasarim-gelistirme") {
      targetUrl = baseRoute === "/" ? `/${code}` : `/${code}${baseRoute}`;
    }

    if (pathname !== targetUrl) {
      router.push(targetUrl);
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
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors h-9 text-xs font-semibold ${
          isOpen
            ? "bg-[#9C7A3F]/20 border-[#9C7A3F] text-[#9C7A3F]"
            : "bg-[#F7F2E7] border-[#9C7A3F]/30 text-[#2B2620] hover:border-[#9C7A3F]"
        }`}
      >
        <span className="text-sm leading-none" role="img" aria-label={currentLangObj.name}>
          {currentLangObj.flag}
        </span>
        <span className="tracking-wider">{currentLangObj.short}</span>
        <ChevronDown
          size={12}
          className={`text-[#7A7364] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#9C7A3F]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-48 bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-md shadow-lg overflow-hidden z-50 p-1.5 animate-fadeIn">
          <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#9C7A3F] font-bold border-b border-[#9C7A3F]/20">
            <span className="flex items-center gap-1">
              <Globe size={11} className="text-[#9C7A3F]" />
              Dil / Language
            </span>
          </div>

          <div className="py-1 space-y-0.5">
            {languagesConfig.map((item) => {
              const isSelected = lang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => selectLang(item.code)}
                  className={`w-full px-3 py-2 text-xs rounded-md font-medium transition-colors flex items-center justify-between gap-2 text-start ${
                    isSelected
                      ? "bg-[#4E5F4C] text-white font-bold"
                      : "text-[#2B2620] hover:bg-[#EDE3CE]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
