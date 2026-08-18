"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Code2, MessageCircle } from "lucide-react";

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, proof, services, whyMe, process: workProcess, cta } = content;

  const trackEvent = (eventName) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: eventName });
    }
  };

  return (
    <div className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16 bg-[#EDE3CE] min-h-screen text-[#2B2620] ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider mx-auto">
          <Code2 size={14} className="text-[#9C7A3F]" />
          <span>{hero.role}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2B2620] tracking-tight leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
          {hero.name}
        </h1>
        <p className="text-lg sm:text-xl text-[#7A7364] font-medium leading-relaxed max-w-3xl mx-auto">
          {hero.headline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={cta.whatsappLink}
            onClick={() => trackEvent("cta_whatsapp_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {hero.ctaQuote}
          </a>
          <a
            href={cta.portfolioLink}
            onClick={() => trackEvent("cta_portfolio_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[#9C7A3F] text-[#9C7A3F] hover:bg-[#9C7A3F] hover:text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>{hero.ctaWork}</span>
          </a>
        </div>
      </section>

      {/* 2. REAL PROOF (Case Study Style) */}
      <section className="bg-[#4E5F4C] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <h2 className="text-[#EDE3CE] text-sm font-bold tracking-widest uppercase">{proof.title}</h2>
            <p className="text-2xl sm:text-3xl font-bold leading-snug" style={{ fontFamily: "var(--font-cairo)" }}>
              {proof.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-white/10">
            {proof.points.map((point, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-[#EDE3CE] font-bold text-lg leading-none pt-0.5">0{index + 1}</span>
                <p className="text-sm font-medium leading-relaxed opacity-90">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2620] text-center" style={{ fontFamily: "var(--font-cairo)" }}>
          {services.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.items.map((item, index) => (
            <div key={index} className="bg-[#F7F2E7] p-6 rounded-2xl border border-[#9C7A3F]/20 shadow-sm hover:border-[#9C7A3F]/50 transition-colors">
              <div className="text-[#9C7A3F] font-bold text-xl mb-3 border-b border-[#9C7A3F]/20 pb-2 inline-block">
                0{index + 1}
              </div>
              <h3 className="text-lg font-bold text-[#2B2620] mb-2">{item.title}</h3>
              <p className="text-[#7A7364] text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY ME */}
      <section className="bg-transparent border-t border-b border-[#9C7A3F]/20 py-10 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2620] text-center" style={{ fontFamily: "var(--font-cairo)" }}>
          {whyMe.title}
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {whyMe.items.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-white/40 p-5 rounded-xl border border-[#9C7A3F]/10">
              <div className="w-2 h-2 bg-[#4E5F4C] rounded-full shrink-0 mt-2" />
              <p className="text-[#2B2620] font-medium leading-relaxed text-base">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE PROCESS */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2620] text-center" style={{ fontFamily: "var(--font-cairo)" }}>
          {workProcess.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Connecting line for desktop */}
          <div className="hidden sm:block absolute top-6 left-10 right-10 h-0.5 bg-[#9C7A3F]/20" />
          
          {workProcess.items.map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-4 bg-[#EDE3CE] p-2">
              <div className="w-12 h-12 rounded-full bg-[#2B2620] text-[#EDE3CE] flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-[#EDE3CE]">
                {index + 1}
              </div>
              <h3 className="text-base font-bold text-[#2B2620]">{item.title}</h3>
              <p className="text-xs text-[#7A7364] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SOCIAL PROOF (Placeholder) */}
      {/* TODO: add real testimonial or SEO result once available */}
      {/* <section className="bg-white/50 p-8 rounded-2xl border border-dashed border-[#9C7A3F]/40 text-center text-[#7A7364]">
        [Social Proof Area]
      </section> */}

      {/* 7. FINAL CTA */}
      <section className="bg-[#2B2620] text-white rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-bold max-w-2xl mx-auto leading-snug" style={{ fontFamily: "var(--font-cairo)" }}>
          {cta.title}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={cta.whatsappLink}
            onClick={() => trackEvent("cta_whatsapp_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle size={20} />
            <span>{cta.whatsapp}</span>
          </a>
          <a
            href={cta.emailLink}
            onClick={() => trackEvent("cta_email_click")}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            <span>{cta.email}</span>
          </a>
        </div>
        <div className="pt-4">
          <a
            href={cta.portfolioLink}
            onClick={() => trackEvent("cta_portfolio_click")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#9C7A3F] hover:text-white transition-colors underline underline-offset-4"
          >
            {cta.portfolio}
          </a>
        </div>
      </section>

      {/* Return to home link */}
      <div className="pt-8 flex justify-center">
        <Link
          href={`/${lang !== "tr" ? lang : ""}`}
          className="text-sm text-[#7A7364] hover:text-[#2B2620] transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowRight size={16} className="rotate-180" />}
          <span style={{ fontFamily: "var(--font-cairo)" }}>
            {lang === "ar" ? "العودة للقائمة" : (lang === "tr" ? "Kardeşler Cihangir Ana Sayfasına Dön" : "Return to Kardeşler Cihangir")}
          </span>
        </Link>
      </div>

    </div>
  );
}
