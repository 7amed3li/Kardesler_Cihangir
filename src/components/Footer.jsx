"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { MapPin, Phone, Clock, MessageCircle, ChevronRight, ChevronLeft, Flame } from "lucide-react";
import PaymentMethods from "./PaymentMethods";
import RestaurantMap from "./RestaurantMap";

export default function Footer() {
  const { t, lang } = useAppContext();
  const currentYear = new Date().getFullYear();
  const fc = t.footer || {};

  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before it comes into view
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const guideHref = lang === "ar" 
    ? "/ar/best-kebab-taksim" 
    : lang === "ru" 
    ? "/ru/best-kebab-taksim" 
    : "/best-kebab-taksim";

  const isRTL = lang === "ar" || lang === "fa";
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <footer className="bg-ink-2 border-t border-teal-dim/20 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-md mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 text-center sm:text-start">
          
          {/* 1. Brand & Story */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl sm:text-3xl font-black text-cream mb-2 tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h2>
            <p className="text-copper text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              {t.heroTagline || "Kebap & Pide • Est. 1998"}
            </p>
            <p className="text-cream-dim/70 text-xs sm:text-sm font-light leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {t.subtitle || "Where tradition meets authentic oak charcoal taste in the heart of Cihangir."}
            </p>
          </div>

          {/* 2. Quick Links (الوصول السريع) */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-gold tracking-widest uppercase mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>{fc.quickLinks || "Quick Links"}</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-cream-dim/80 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-copper group-hover:translate-x-0.5 transition-transform" />
                  <span>{fc.home || "Home"}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/menu" 
                  className="text-cream-dim/80 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-copper group-hover:translate-x-0.5 transition-transform" />
                  <span>{fc.menu || "Full Menu"}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={guideHref} 
                  className="text-gold font-medium hover:text-cream transition-colors inline-flex items-center gap-1.5 group"
                >
                  <Flame size={13} className="text-copper animate-pulse shrink-0" />
                  <span className="underline underline-offset-4 decoration-gold/50 group-hover:decoration-cream">
                    {fc.taksimGuide || "Best Kebab Taksim Guide"}
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-cream-dim/80 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-copper group-hover:translate-x-0.5 transition-transform" />
                  <span>{fc.about || "About Us"}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-cream-dim/80 hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-copper group-hover:translate-x-0.5 transition-transform" />
                  <span>{fc.contact || "Contact & Reservation"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-cream tracking-widest uppercase mb-4 sm:mb-6">
              {fc.contact}
            </h3>
            <a href="https://www.google.com/maps/search/?api=1&query=Karde%C5%9Fler+Kebap+Cihangir" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 mb-3 text-start group hover:opacity-100 transition-all duration-300">
              <MapPin size={15} className="text-teal mt-0.5 shrink-0 group-hover:animate-bounce" />
              <p className="text-cream-dim/80 text-xs sm:text-sm font-light leading-relaxed max-w-xs group-hover:text-cream transition-colors underline-offset-2 group-hover:underline decoration-teal/40" style={{ fontFamily: "var(--font-inter)" }}>
                Firuzağa Mah. Firuzağa Camii Sok.<br/> No:1A, Cihangir, Beyoğlu, İstanbul
              </p>
            </a>
            <div className="flex items-center gap-2.5 mb-2.5">
              <Phone size={15} className="text-teal shrink-0" />
              <a href="tel:+902122513696" className="text-cream-dim/80 text-xs sm:text-sm font-light hover:text-copper transition-colors">
                +90 212 251 36 96
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={15} className="text-teal shrink-0" />
              <span className="text-cream-dim/80 text-xs sm:text-sm font-light">{fc.hoursValue}</span>
            </div>
          </div>

          {/* 4. Socials & WhatsApp */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-cream tracking-widest uppercase mb-4 sm:mb-6">
              {fc.social}
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-cream-dim hover:text-copper hover:border-copper/50 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/905060453906"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 group"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              <span className="text-[#25D366] font-medium text-xs sm:text-sm">{fc.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Dark-themed Google Maps Embed with Restaurant Pin Marker */}
        <RestaurantMap heightClass="h-48 sm:h-56" className="mb-8" />

        {/* ── Accepted Payment Methods Section ── */}
        <PaymentMethods />

        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-sm mx-auto mb-6"></div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-dim/40 text-xs tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
            &copy; {currentYear} Kardeşler Kebap Cihangir. {fc.rights}
          </p>
          <p className="text-cream-dim/30 text-[10px] tracking-widest uppercase flex items-center gap-1">
            {fc.madeBy}
            <a 
              href="https://www.hamedmohamed.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-copper hover:text-gold transition-colors underline underline-offset-2"
            >
              Hamed Mohamed
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
