

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

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-cream-dim/60 flex items-center gap-2">
          <Link href="/" className="hover:text-gold transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-cream font-medium">Tasarım ve Geliştirme</span>
        </nav>

        {/* Hero Banner */}
        <div className="space-y-4 border-b border-gold/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
            <Code2 size={14} className="text-gold" />
            <span>Resmi Web Attribution &amp; SEO Kaydı</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-cream tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Kardeşler Cihangir Web Sitesi
          </h1>
          <p className="text-lg sm:text-xl text-gold font-medium">
            Tasarım ve Geliştirme: Hamed Mohamed
          </p>
          <p className="text-cream-dim/80 text-sm sm:text-base leading-relaxed max-w-2xl">
            Bu web sitesi <strong className="text-cream font-semibold">Hamed Mohamed</strong> tarafından tasarlanmış ve geliştirilmiştir. Tüm dijital altyapı, çok dilli SEO mimarisi, canlı döviz çevirici ve UX/UI deneyimi özel olarak kodlanmıştır.
          </p>
        </div>

        {/* Primary Entity Card */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-gold/30 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -end-12 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <UserCheck className="text-gold shrink-0" size={24} />
            <h2 className="text-xl sm:text-2xl font-bold text-cream">
              Proje ve Geliştirici Kimlik Bilgileri
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Proje Adı
                </span>
                <span className="text-cream font-bold text-base">Kardeşler Cihangir</span>
              </div>

              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Resmi Web Sitesi
                </span>
                <a
                  href="https://kardeslercihangir.com/"
                  className="text-copper hover:text-gold transition-colors font-medium inline-flex items-center gap-1.5 underline"
                >
                  https://kardeslercihangir.com/
                  <ExternalLink size={14} />
                </a>
              </div>

              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Konum &amp; Mutfak
                </span>
                <span className="text-cream font-medium">
                  Cihangir / Taksim, İstanbul — Geleneksel Kebap &amp; Pide Salonu (Est. 1998)
                </span>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-s border-white/10 pt-4 md:pt-0 md:ps-6">
              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Tasarım ve Geliştirme (Developer)
                </span>
                <span className="text-gold font-bold text-lg block">Hamed Mohamed</span>
              </div>

              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Unvan / Rol
                </span>
                <span className="text-cream font-medium">Web Designer &amp; Developer</span>
              </div>

              <div>
                <span className="text-cream-dim/60 text-xs uppercase tracking-wider block mb-1">
                  Geliştirici Portfolyo / İletişim
                </span>
                <a
                  href="https://www.hamedmohamed.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-copper/20 hover:bg-copper/30 border border-copper/40 text-cream font-semibold transition-all duration-300 group"
                >
                  <span>hamedmohamed.dev</span>
                  <ExternalLink size={14} className="text-gold group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Technical Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-cream flex items-center gap-2.5">
            <Cpu className="text-teal" size={22} />
            <span>Doğrulanmış Teknik Özellikler ve Mimari</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold">
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
