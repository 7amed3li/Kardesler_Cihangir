"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { t } = useAppContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-2 border-t border-teal-dim/20 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-left">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-black text-cream mb-2 tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h2>
            <p className="text-copper text-xs font-medium tracking-[0.4em] uppercase mb-4">
              {t.heroTagline || "Kebap & Pide"}
            </p>
            <p className="text-cream-dim/60 text-sm font-light leading-relaxed max-w-xs">
              {t.subtitle || "Where tradition meets taste in the heart of Cihangir."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-bold text-cream tracking-widest uppercase mb-6">
              İletişim
            </h3>
            <a href="https://maps.google.com/?q=Karde%C5%9Fler+Kebap+Pide+Cihangir+Beyo%C4%9Flu+%C4%B0stanbul" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 mb-4 text-left group hover:opacity-100 transition-all duration-300">
              <MapPin size={16} className="text-teal mt-0.5 shrink-0 group-hover:animate-bounce" />
              <p className="text-cream-dim/80 text-sm font-light leading-relaxed max-w-xs group-hover:text-cream transition-colors underline-offset-2 group-hover:underline decoration-teal/40">
                Firuzağa Mah. Firuzağa Camii Sok.<br/> No:1A, Cihangir, Beyoğlu, İstanbul
              </p>
            </a>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-teal shrink-0" />
              <a href="tel:+902122432822" className="text-cream-dim/80 text-sm font-light hover:text-copper transition-colors">
                +90 212 243 28 22
              </a>
            </div>
          </div>

          {/* Socials & Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-bold text-cream tracking-widest uppercase mb-6">
              Sosyal Medya
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-ink border border-teal-dim/20 flex items-center justify-center text-cream-dim hover:text-copper hover:border-copper transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ink border border-teal-dim/20 flex items-center justify-center text-cream-dim hover:text-copper hover:border-copper transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
            <p className="text-cream-dim/50 text-xs font-light uppercase tracking-wider">
              {t.visits || "Her gün açık"} • 09:00 - 02:00
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-teal-dim/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-dim/40 text-xs tracking-wider">
            &copy; {currentYear} Kardeşler Kebap Cihangir. All rights reserved.
          </p>
          <p className="text-cream-dim/30 text-[10px] tracking-widest uppercase flex items-center gap-1">
            Designed & Developed by 
            <a 
              href="https://github.com/7amed3li" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-copper transition-colors font-bold ml-1"
            >
              HAMED MOHAMED
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
