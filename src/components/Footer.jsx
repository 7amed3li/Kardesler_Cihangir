"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const footerContent = {
  tr: {
    contact: "İletişim",
    social: "Sosyal Medya",
    hours: "Çalışma Saatleri",
    hoursValue: "Her gün: 10:00 - 02:00",
    whatsapp: "WhatsApp Sipariş",
    rights: "Tüm hakları saklıdır.",
    madeBy: "Tasarım ve Geliştirme",
  },
  en: {
    contact: "Contact",
    social: "Social Media",
    hours: "Working Hours",
    hoursValue: "Everyday: 10:00 AM - 02:00 AM",
    whatsapp: "WhatsApp Order",
    rights: "All rights reserved.",
    madeBy: "Designed & Developed by",
  },
  ar: {
    contact: "التواصل",
    social: "وسائل التواصل",
    hours: "ساعات العمل",
    hoursValue: "يومياً: 10:00 صباحاً - 02:00 ليلاً",
    whatsapp: "اطلب عبر واتساب",
    rights: "جميع الحقوق محفوظة.",
    madeBy: "تصميم وتطوير",
  },
  fr: {
    contact: "Contact",
    social: "Réseaux Sociaux",
    hours: "Horaires",
    hoursValue: "Tous les jours : 10h00 - 02h00",
    whatsapp: "Commande WhatsApp",
    rights: "Tous droits réservés.",
    madeBy: "Conçu et développé par",
  },
};

export default function Footer() {
  const { t, lang } = useAppContext();
  const currentYear = new Date().getFullYear();
  const fc = footerContent[lang] || footerContent.en;

  return (
    <footer className="bg-ink-2 border-t border-teal-dim/20 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-md mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-left">
          
          {/* Brand & Story */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-black text-cream mb-2 tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.welcome || "Kardeşler"}
            </h2>
            <p className="text-copper text-xs font-medium tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.heroTagline || "Kebap & Pide"}
            </p>
            <p className="text-cream-dim/60 text-sm font-light leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {t.subtitle || "Where tradition meets taste in the heart of Cihangir."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-bold text-cream tracking-widest uppercase mb-6">
              {fc.contact}
            </h3>
            <a href="https://maps.google.com/?q=Karde%C5%9Fler+Kebap+Pide+Cihangir+Beyo%C4%9Flu+%C4%B0stanbul" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 mb-4 text-left group hover:opacity-100 transition-all duration-300">
              <MapPin size={16} className="text-teal mt-0.5 shrink-0 group-hover:animate-bounce" />
              <p className="text-cream-dim/80 text-sm font-light leading-relaxed max-w-xs group-hover:text-cream transition-colors underline-offset-2 group-hover:underline decoration-teal/40" style={{ fontFamily: "var(--font-inter)" }}>
                Firuzağa Mah. Firuzağa Camii Sok.<br/> No:1A, Cihangir, Beyoğlu, İstanbul
              </p>
            </a>
            <div className="flex items-center gap-3 mb-3">
              <Phone size={16} className="text-teal shrink-0" />
              <a href="tel:+902122432822" className="text-cream-dim/80 text-sm font-light hover:text-copper transition-colors">
                +90 212 243 28 22
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-teal shrink-0" />
              <span className="text-cream-dim/80 text-sm font-light">{fc.hoursValue}</span>
            </div>
          </div>

          {/* Socials & WhatsApp */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-bold text-cream tracking-widest uppercase mb-6">
              {fc.social}
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-cream-dim hover:text-copper hover:border-copper/50 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-cream-dim hover:text-copper hover:border-copper/50 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/905348662715"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 group"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              <span className="text-[#25D366] font-medium text-sm">{fc.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Dark-themed Google Maps Embed */}
        <div className="map-dark-container w-full h-48 sm:h-56 mb-8 rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.4186457106093!2d28.981119576483584!3d41.0332822713498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sKarde%C5%9Fler%20Kebap%20Cihangir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kardeşler Cihangir Location"
            allowFullScreen
          ></iframe>
        </div>

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
