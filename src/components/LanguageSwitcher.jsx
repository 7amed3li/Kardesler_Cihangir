"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { translations } from "../i18n/translations";

export default function LanguageSwitcher() {
  const { lang, changeLang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLang = (code) => {
    changeLang(code);
    setIsOpen(false);
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
        onClick={toggleDropdown}
        aria-label="Change Language"
        className="flex items-center gap-1 p-2 rounded-full bg-teal-dim/20 hover:bg-teal-dim/40 transition-all border border-teal-dim/40 h-11 w-11 justify-center"
      >
        <Globe size={16} className="text-gold" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-36 bg-ink-2 border border-gold/20 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden z-50">
          {Object.keys(translations).map((code) => (
            <button
              key={code}
              onClick={() => selectLang(code)}
              className={`w-full px-4 py-3 text-sm hover:bg-ink transition-colors text-start ${
                lang === code ? "text-gold font-bold bg-ink" : "text-cream-dim"
              }`}
            >
              {translations[code].language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
