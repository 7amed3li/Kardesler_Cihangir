

import React from "react";
import Link from "next/link";
import { ExternalLink, Code2, Sparkles, Globe, Cpu, CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";

export const metadata = {
  title: "Kardeşler Cihangir Web Sitesi | Tasarım ve Geliştirme",
  description:
    "Kardeşler Cihangir web sitesinin tasarım ve geliştirme çalışmaları Hamed Mohamed tarafından gerçekleştirilmiştir.",
  keywords: [
    "Hamed Mohamed",
    "Kardeşler Cihangir web tasarımı",
    "Kardeşler Cihangir web geliştirme",
    "Web Designer Hamed Mohamed",
    "Web Developer Hamed Mohamed",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/tasarim-gelistirme",
    languages: {
      tr: "https://kardeslercihangir.com/tasarim-gelistirme",
      en: "https://kardeslercihangir.com/en/design-development",
    },
  },
  openGraph: {
    title: "Kardeşler Cihangir Web Sitesi — Tasarım ve Geliştirme",
    description:
      "Kardeşler Cihangir resmi web sitesinin tasarım ve yazılım geliştirme çalışmaları Hamed Mohamed tarafından gerçekleştirilmiştir.",
    url: "https://kardeslercihangir.com/tasarim-gelistirme",
    siteName: "Kardeşler Cihangir",
    locale: "tr_TR",
    type: "profile",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kardeslercihangir.com";

// JSON-LD ProfilePage & Person Structured Data
const profilePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/tasarim-gelistirme#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tasarım ve Geliştirme",
          "item": `${siteUrl}/tasarim-gelistirme`
        }
      ]
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/tasarim-gelistirme#webpage`,
      "url": `${siteUrl}/tasarim-gelistirme`,
      "name": "Kardeşler Cihangir Web Sitesi — Tasarım ve Geliştirme",
      "description": "Kardeşler Cihangir resmi web sitesinin tasarım ve yazılım geliştirme çalışmaları Hamed Mohamed tarafından gerçekleştirilmiştir.",
      "breadcrumb": { "@id": `${siteUrl}/tasarim-gelistirme#breadcrumb` },
      "mainEntity": {
        "@type": "Person",
        "@id": `${siteUrl}/tasarim-gelistirme#hamed-mohamed`,
        "name": "Hamed Mohamed",
        "jobTitle": "Web Designer & Developer",
        "url": "https://www.hamedmohamed.dev/",
        "sameAs": [
          "https://www.hamedmohamed.dev/"
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Kardeşler Cihangir",
      "creator": {
        "@id": `${siteUrl}/tasarim-gelistirme#hamed-mohamed`
      }
    }
  ]
};

export default function TasarimGelistirmePage() {
  return (
    <>
      {/* Structured Data Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 bg-[#EDE3CE] min-h-screen text-[#2B2620]">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#7A7364] flex items-center gap-2">
          <Link href="/" className="hover:text-[#2B2620] transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-[#2B2620] font-bold">Tasarım ve Geliştirme</span>
        </nav>

        {/* Hero Banner */}
        <div className="space-y-4 border-b border-[#9C7A3F]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider">
            <Code2 size={14} className="text-[#9C7A3F]" />
            <span>Resmi Web Attribution &amp; SEO Kaydı</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2B2620] tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Kardeşler Cihangir Web Sitesi
          </h1>
          <p className="text-lg sm:text-xl text-[#9C7A3F] font-bold">
            Tasarım ve Geliştirme: Hamed Mohamed
          </p>
          <p className="text-[#7A7364] text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Bu web sitesi <strong className="text-[#2B2620] font-bold">Hamed Mohamed</strong> tarafından tasarlanmış ve geliştirilmiştir. Tüm dijital altyapı, çok dilli SEO mimarisi, canlı döviz çevirici ve UX/UI deneyimi özel olarak kodlanmıştır.
          </p>
        </div>

        {/* Primary Entity Card */}
        <section className="bg-[#F7F2E7] rounded-xl p-6 sm:p-8 border border-[#9C7A3F]/30 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#9C7A3F]/20 pb-4">
            <UserCheck className="text-[#9C7A3F] shrink-0" size={24} />
            <h2 className="text-xl sm:text-2xl font-bold text-[#2B2620]">
              Geliştirici Künyesi / Developer Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/20">
              <span className="text-xs text-[#7A7364] uppercase font-bold block mb-1">Web Geliştirici &amp; Tasarımcı</span>
              <span className="text-base font-bold text-[#2B2620]">Hamed Mohamed</span>
            </div>
            <div className="p-4 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/20">
              <span className="text-xs text-[#7A7364] uppercase font-bold block mb-1">Müşteri / İşletme</span>
              <span className="text-base font-bold text-[#2B2620]">Kardeşler Kebap Cihangir</span>
            </div>
            <div className="p-4 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/20">
              <span className="text-xs text-[#7A7364] uppercase font-bold block mb-1">Teknoloji Altyapısı</span>
              <span className="text-base font-bold text-[#2B2620]">Next.js 16 (Turbopack) &amp; React 19</span>
            </div>
            <div className="p-4 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/20">
              <span className="text-xs text-[#7A7364] uppercase font-bold block mb-1">Uluslararası SEO</span>
              <span className="text-base font-bold text-[#2B2620]">6 Dilde Hreflang &amp; Schema Graph</span>
            </div>
          </div>
        </section>

        {/* Development Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F7F2E7] rounded-xl p-6 border border-[#9C7A3F]/30 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#4E5F4C]">
              <Sparkles size={20} />
              <h3 className="font-bold text-[#2B2620] text-lg">Özel UX/UI Tasarımı</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#7A7364] font-medium leading-relaxed">
              Otantik Osmanlı ve Türk ocakbaşı estetiğine uygun flat bej ve yüksek kontrastlı tipografi ile hızlı ve akıcı bir kullanıcı deneyimi.
            </p>
          </div>

          <div className="bg-[#F7F2E7] rounded-xl p-6 border border-[#9C7A3F]/30 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#9C7A3F]">
              <Globe size={20} />
              <h3 className="font-bold text-[#2B2620] text-lg">6 Dilli Canlı Mimarisi</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#7A7364] font-medium leading-relaxed">
              Türkçe, İngilizce, Arapça, Rusça, Farsça ve Fransızca dillerinde eksiksiz yerelleştirme ve anlık canlı döviz çevirici altyapısı.
            </p>
          </div>
        </div>

        {/* Verified Technical Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#2B2620] flex items-center gap-2.5">
            <Cpu className="text-[#9C7A3F]" size={22} />
            <span>Doğrulanmış Teknik Özellikler ve Mimari</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F7F2E7] p-4 rounded-xl border border-[#9C7A3F]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#9C7A3F] font-semibold">
                <CheckCircle2 size={16} />
                <span>Next.js App Router Altyapısı</span>
              </div>
              <p className="text-xs text-cream-dim/80 leading-relaxed">
                Yüksek performanslı Hibrit SSG/SSR mimarisi ve arama motorları için optimize edilmiş SEO altyapısı.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <Globe size={16} />
                <span>6 Dilli Yerelleştirme (i18n)</span>
              </div>
              <p className="text-xs text-cream-dim/80 leading-relaxed">
                Türkçe, İngilizce, Arapça, Rusça, Farsça ve Fransızca dillerinde tam SEO uyumlu içerik mimarisi.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <Sparkles size={16} />
                <span>Canlı Çoklu Döviz Çevirici</span>
              </div>
              <p className="text-xs text-cream-dim/80 leading-relaxed">
                TRY, USD, EUR, GBP, RUB ve SAR birimlerinde anlık kur çevrimi ile uluslararası turist dostu fiyatlandırma.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <ShieldCheck size={16} />
                <span>Gelişmiş Schema.org Varlığı</span>
              </div>
              <p className="text-xs text-cream-dim/80 leading-relaxed">
                Restaurant, WebSite, Person ve ProfilePage makinelerce okunabilir JSON-LD yapısı.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Footer Return Link */}
        <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs text-cream-dim hover:text-gold transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight size={14} className="rotate-180" />
            <span>Kardeşler Cihangir Ana Sayfasına Dön</span>
          </Link>

          <a
            href="https://www.hamedmohamed.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-copper hover:text-gold transition-colors underline underline-offset-4"
          >
            Hamed Mohamed Portfolyo Web Sitesini Ziyaret Et &rarr;
          </a>
        </div>
      </div>
    </>
  );
}
