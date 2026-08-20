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

  const guideHref = {
    tr: "/tr/best-kebab-taksim",
    ar: "/ar/best-kebab-taksim",
    ru: "/ru/best-kebab-taksim",
    fa: "/fa/best-kebab-taksim",
    fr: "/fr/best-kebab-taksim",
    en: "/best-kebab-taksim",
  }[lang] || "/best-kebab-taksim";

  const isRTL = lang === "ar" || lang === "fa";
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <footer className="bg-[#F7F2E7] border-t border-[#9C7A3F]/20 pt-12 pb-36 sm:pb-44 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-md mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 text-center sm:text-start">

          {/* 1. Brand & Story */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl sm:text-3xl font-black text-[#2B2620] mb-2 tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h2>
            <p className="text-[#9C7A3F] text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              {t.heroTagline || "Kebap & Pide • Est. 1998"}
            </p>
            <p className="text-[#7A7364] text-xs sm:text-sm font-light leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {t.subtitle || "Where tradition meets authentic oak charcoal taste in the heart of Cihangir."}
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-[#9C7A3F] tracking-widest uppercase mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3F]"></span>
              <span>
                {fc.quickLinks || (
                  lang === "ar" ? "روابط سريعة" :
                  lang === "zh" ? "快速链接" :
                  lang === "de" ? "Schnellzugriff" :
                  lang === "it" ? "Link Rapidi" :
                  lang === "es" ? "Enlaces Rápidos" :
                  lang === "tr" ? "Hızlı Bağlantılar" :
                  "Quick Links"
                )}
              </span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#7A7364] hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span>
                    {fc.home || (
                      lang === "ar" ? "الرئيسية" :
                      lang === "zh" ? "首页" :
                      lang === "de" ? "Startseite" :
                      lang === "it" ? "Home" :
                      lang === "es" ? "Inicio" :
                      lang === "tr" ? "Ana Sayfa" :
                      "Home"
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-[#7A7364] hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span>
                    {fc.menu || (
                      lang === "ar" ? "القائمة الكاملة" :
                      lang === "zh" ? "完整菜单" :
                      lang === "de" ? "Gesamte Speisekarte" :
                      lang === "it" ? "Menu Completo" :
                      lang === "es" ? "Menú Completo" :
                      lang === "tr" ? "Tüm Menü" :
                      "Full Menu"
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={guideHref}
                  className="text-[#9C7A3F] font-bold hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span className="underline underline-offset-4 decoration-[#9C7A3F]/50 group-hover:decoration-[#2B2620]">
                    {fc.taksimGuide || (
                      lang === "ar" ? "دليل أفضل كباب في تقسيم" :
                      lang === "zh" ? "塔克西姆最佳烤肉指南" :
                      lang === "de" ? "Bester Kebab Taksim Guide" :
                      lang === "it" ? "Guida Miglior Kebab Taksim" :
                      lang === "es" ? "Guía Mejor Kebab en Taksim" :
                      lang === "tr" ? "Taksim En İyi Kebap Rehberi" :
                      "Best Kebab Near Taksim"
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    { tr: "/tr/turkish-breakfast-cihangir", ar: "/ar/turkish-breakfast-cihangir", ru: "/ru/turkish-breakfast-cihangir", fa: "/fa/turkish-breakfast-cihangir", fr: "/fr/turkish-breakfast-cihangir", de: "/de/turkish-breakfast-cihangir", it: "/it/turkish-breakfast-cihangir", es: "/es/turkish-breakfast-cihangir", zh: "/zh/turkish-breakfast-cihangir", en: "/turkish-breakfast-cihangir" }[lang] || "/turkish-breakfast-cihangir"
                  }
                  className="text-[#9C7A3F] font-bold hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span className="underline underline-offset-4 decoration-[#9C7A3F]/50 group-hover:decoration-[#2B2620]">
                    {lang === "ar" ? "استكشف الإفطار التركي" :
                     lang === "tr" ? "Türk Kahvaltısını Keşfet" :
                     lang === "ru" ? "Турецкий завтрак" :
                     lang === "fa" ? "صبحانه ترکی" :
                     lang === "fr" ? "Petit-déjeuner turc" :
                     lang === "de" ? "Türkisches Frühstück" :
                     lang === "it" ? "Colazione turca" :
                     lang === "es" ? "Desayuno turco" :
                     lang === "zh" ? "土耳其早餐" :
                     "Explore Turkish Breakfast"}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#7A7364] hover:text-[#2B2620] font-medium transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span>
                    {fc.about || (
                      lang === "ar" ? "من نحن" :
                      lang === "zh" ? "关于我们" :
                      lang === "de" ? "Über uns" :
                      lang === "it" ? "Chi Siamo" :
                      lang === "es" ? "Nosotros" :
                      lang === "tr" ? "Hakkımızda" :
                      "About Us"
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#7A7364] hover:text-[#2B2620] font-medium transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ArrowIcon size={13} className="text-[#9C7A3F]" />
                  <span>
                    {fc.contact || (
                      lang === "ar" ? "التواصل" :
                      lang === "zh" ? "联系我们" :
                      lang === "de" ? "Kontakt" :
                      lang === "it" ? "Contatti" :
                      lang === "es" ? "Contacto" :
                      lang === "tr" ? "İletişim" :
                      "Contact Us"
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A7364] hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group text-xs"
                >
                  <ArrowIcon size={11} className="text-[#4E5F4C]" />
                  <span>Sitemap.xml</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A7364] hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 group text-xs"
                >
                  <ArrowIcon size={11} className="text-[#4E5F4C]" />
                  <span>Robots.txt</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-[#9C7A3F] tracking-widest uppercase mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3F]"></span>
              <span>
                {fc.contact || (
                  lang === "ar" ? "التواصل" :
                  lang === "zh" ? "联系方式" :
                  lang === "de" ? "Kontakt" :
                  lang === "it" ? "Contatti" :
                  lang === "es" ? "Contacto" :
                  lang === "tr" ? "İletişim" :
                  "Contact"
                )}
              </span>
            </h3>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 mb-3 text-start group">
              <MapPin size={15} className="text-[#4E5F4C] mt-0.5 shrink-0" />
              <p className="text-[#2B2620] text-xs sm:text-sm font-medium leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
                Firuzağa Mah. Firuzağa Camii Sok.<br /> No:1A, Cihangir, Beyoğlu, İstanbul
              </p>
            </a>
            <div className="flex items-center gap-2.5 mb-2.5">
              <Phone size={15} className="text-[#4E5F4C] shrink-0" />
              <a href="tel:+902122513696" className="text-[#2B2620] text-xs sm:text-sm font-semibold hover:text-[#9C7A3F] transition-colors">
                +90 212 251 36 96
              </a>
            </div>
            <div className="flex items-center gap-2.5 mb-4">
              <Clock size={15} className="text-[#4E5F4C] shrink-0" />
              <p className="text-[#7A7364] text-xs sm:text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                {fc.hoursValue || fc.hours || (
                  lang === "ar" ? "يومياً: 09:00 - 02:00" :
                  lang === "zh" ? "每日营业：09:00 - 02:00" :
                  lang === "de" ? "Täglich: 09:00 - 02:00 Uhr" :
                  lang === "it" ? "Tutti i giorni: 09:00 - 02:00" :
                  lang === "es" ? "Todos los días: 09:00 - 02:00" :
                  "Everyday: 09:00 - 02:00"
                )}
              </p>
            </div>
            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/902122513696"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#4E5F4C] text-white hover:bg-[#3D4B3B] transition-colors group"
            >
              <MessageCircle size={16} className="text-white" />
              <span className="font-semibold text-xs sm:text-sm">
                {fc.whatsapp || (
                  lang === "ar" ? "طلب عبر الواتساب" :
                  lang === "zh" ? "WhatsApp 订餐" :
                  lang === "de" ? "WhatsApp Bestellung" :
                  lang === "it" ? "Ordine WhatsApp" :
                  lang === "es" ? "Pedir por WhatsApp" :
                  "WhatsApp Order"
                )}
              </span>
            </a>
          </div>

          {/* 4. Socials */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xs sm:text-sm font-bold text-[#9C7A3F] tracking-widest uppercase mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3F]"></span>
              <span>{fc.social || "Sosyal Medya"}</span>
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 flex items-center justify-center text-[#2B2620] hover:text-[#9C7A3F] hover:border-[#9C7A3F] transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Dark-themed Google Maps Embed */}
        <RestaurantMap heightClass="h-48 sm:h-56" className="mb-8" />

        {/* ── Accepted Payment Methods Section ── */}
        <PaymentMethods />

        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-sm mx-auto mb-6"></div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-start">
            <p className="text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              &copy; {currentYear} Kardeşler Kebap Cihangir. {fc.rights || "Tüm Hakları Saklıdır."}
            </p>
            <div className="flex items-center gap-3 text-xs text-[#7A7364]">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2B2620] transition-colors underline-offset-2 hover:underline"
              >
                Sitemap (XML)
              </a>
              <span>&bull;</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2B2620] transition-colors underline-offset-2 hover:underline"
              >
                Robots.txt
              </a>
            </div>
          </div>
          <p className="text-[#7A7364] text-[10px] tracking-widest uppercase flex items-center gap-1">
            {fc.madeBy || "Tasarım & Geliştirme:"}
            <Link
              href="/tasarim-gelistirme"
              className="text-[#9C7A3F] hover:text-[#2B2620] transition-colors underline underline-offset-2 font-bold"
              title="Tasarım ve Geliştirme: Hamed Mohamed"
            >
              Hamed Mohamed
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
