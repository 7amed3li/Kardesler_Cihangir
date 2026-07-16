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
        className="flex items-center gap-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
      >
        <Globe size={20} className="text-[#D4AF37]" />
        <span className="text-sm font-medium hidden sm:block uppercase">
          {lang}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-36 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl overflow-hidden z-50 start-0 sm:start-auto sm:end-0">
          {Object.keys(translations).map((code) => (
            <button
              key={code}
              onClick={() => selectLang(code)}
              className={`w-full px-4 py-3 text-sm hover:bg-[#333] transition-colors text-start ${
                lang === code ? "text-[#D4AF37] font-bold bg-[#2a2a2a]" : "text-gray-300"
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
