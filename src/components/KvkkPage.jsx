"use client";

import React from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { kvkkContent } from "@/i18n/kvkkTranslations";

// KVKK Aydınlatma Metni ve Gizlilik Politikası page. Content lives in
// src/i18n/kvkkTranslations.js (full text per locale; the Turkish text is
// the operative version, translations carry the "Turkish prevails" note).
export default function KvkkPage() {
  const { lang } = useAppContext();
  const c = kvkkContent[lang] || kvkkContent.tr;

  return (
    <div className="min-h-screen bg-[#EDE3CE] text-[#2B2620] pb-16">
      {/* Hero Header */}
      <section className="pt-12 pb-10 px-4 text-center animate-fadeInUp">
        <div className="relative w-20 h-20 mx-auto mb-6 shrink-0">
          <Image src="/logo.webp" alt="Kardeşler Cihangir Logo" fill sizes="80px" style={{ objectFit: "contain" }} />
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#2B2620] mb-3 max-w-3xl mx-auto leading-snug"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {c.title}
        </h1>
        <p className="text-[#9C7A3F] text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
          Kardeşler Kebap Cihangir
        </p>
      </section>

      {/* Ottoman Divider */}
      <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {c.sections.map((section) => (
          <section
            key={section.heading}
            className="bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-lg sm:text-xl font-bold text-[#9C7A3F] mb-4" style={{ fontFamily: "var(--font-cairo)" }}>
              {section.heading}
            </h2>

            {(section.paragraphs || []).map((p, i) => (
              <p
                key={i}
                className="text-[#2B2620] leading-relaxed mb-4 last:mb-0 text-sm sm:text-base font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {p}
              </p>
            ))}

            {section.table && (
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-xs sm:text-sm border-collapse" style={{ fontFamily: "var(--font-inter)" }}>
                  <thead>
                    <tr>
                      {section.table.head.map((h) => (
                        <th
                          key={h}
                          className="text-start font-bold text-[#2B2620] bg-[#EDE3CE] border border-[#9C7A3F]/30 px-3 py-2 align-top"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="text-[#2B2620] border border-[#9C7A3F]/20 px-3 py-2 align-top leading-relaxed"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {(section.after || []).map((p, i) => (
              <p
                key={`after-${i}`}
                className="text-[#2B2620] leading-relaxed mt-4 text-sm sm:text-base font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        {c.prevailingNote && (
          <p className="text-[#7A7364] text-xs sm:text-sm leading-relaxed px-2" style={{ fontFamily: "var(--font-inter)" }}>
            {c.prevailingNote}
          </p>
        )}
      </div>
    </div>
  );
}
