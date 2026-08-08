import React from "react";
import Link from "next/link";
import { Utensils, Home, MessageCircle, MapPin, Compass } from "lucide-react";

export const metadata = {
  title: "404 - Sayfa Bulunamadı | Page Not Found | Kardeşler Cihangir",
  description: "Aradığınız sayfa bulunamadı. Kardeşler Kebap Cihangir lezzet menüsünü keşfedin.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg mx-auto space-y-6 glass-card p-8 sm:p-10 rounded-3xl border border-gold/30 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Accent */}
        <div className="absolute -top-24 -end-24 w-48 h-48 bg-copper/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper/15 border border-copper/40 text-copper text-sm font-bold tracking-widest uppercase">
          <Compass size={16} className="animate-spin" style={{ animationDuration: "10s" }} />
          <span>404 Error</span>
        </div>

        {/* Big Heading */}
        <div className="space-y-2">
          <h1
            className="text-3xl sm:text-4xl font-black text-cream"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            الصفحة غير متوفرة
          </h1>
          <p className="text-sm sm:text-base text-gold font-semibold">
            Sayfa Bulunamadı &bull; Page Not Found
          </p>
          <p className="text-xs sm:text-sm text-cream-dim/80 leading-relaxed font-light pt-2">
            ربما تم نقل الصفحة أو تحديث الرابط أثناء انتقالنا للموقع الجديد. لا تقلق، يمكنك تصفح أشهى الأطباق من المنيو الرقمي مباشرة:
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm hover:opacity-95 transition-all shadow-md hover:scale-[1.02]"
          >
            <Utensils size={17} />
            <span>قائمة الطعام (المنيو)</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-ink/80 hover:bg-ink border border-gold/30 hover:border-gold text-cream font-bold text-sm transition-all"
          >
            <Home size={17} />
            <span>الرئيسية (Ana Sayfa)</span>
          </Link>
        </div>

        {/* Secondary Links: WhatsApp & Map */}
        <div className="pt-4 border-t border-teal-dim/20 flex items-center justify-center gap-6 text-xs text-cream-dim">
          <a
            href="https://wa.me/905060453906"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>طلب واتساب مباشر</span>
          </a>
          <span className="opacity-30">&bull;</span>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <MapPin size={15} className="text-copper" />
            <span>موقعنا في جيهانكير</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
