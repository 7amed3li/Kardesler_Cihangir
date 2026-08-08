"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Home, MessageCircle, MapPin, Compass, Globe } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const notFoundI18n = {
  tr: {
    badge: "404 Hata",
    title: "Sayfa Bulunamadı",
    subtitle: "Aradığınız lezzet başka bir masada olabilir!",
    desc: "Sayfa taşınmış veya bağlantı güncellenmiş olabilir. Endişelenmeyin, dijital menümüzden tüm geleneksel lezzetlerimizi hemen keşfedebilirsiniz:",
    menuBtn: "Menüyü İncele",
    homeBtn: "Ana Sayfaya Dön",
    whatsapp: "WhatsApp Hızlı Sipariş",
    location: "Cihangir'deki Konumumuz",
  },
  en: {
    badge: "404 Error",
    title: "Page Not Found",
    subtitle: "The dish you're looking for might be at another table!",
    desc: "The page may have been moved or updated. Don't worry, you can explore our full authentic Turkish menu right away:",
    menuBtn: "Explore Full Menu",
    homeBtn: "Return to Home",
    whatsapp: "Direct WhatsApp Order",
    location: "Find Us in Cihangir",
  },
  ar: {
    badge: "خطأ 404",
    title: "الصفحة غير متوفرة",
    subtitle: "ربما انتقل الطبق الذي تبحث عنه إلى طاولة أخرى!",
    desc: "قد يكون الرابط تم تحديثه أو نقله أثناء تحديث موقعنا. يمكنك تصفح قائمة الطعام الشاملة وطلب أشهى المشويات مباشرة:",
    menuBtn: "قائمة الطعام (المنيو)",
    homeBtn: "الصفحة الرئيسية",
    whatsapp: "طلب واتساب مباشر",
    location: "موقعنا في جيهانكير",
  },
  ru: {
    badge: "Ошибка 404",
    title: "Страница не найдена",
    subtitle: "Возможно, искомое блюдо на другом столе!",
    desc: "Страница была перемещена или обновлена. Вы можете сразу перейти к нашему полному цифровому меню:",
    menuBtn: "Открыть Меню",
    homeBtn: "На Главную",
    whatsapp: "Заказ через WhatsApp",
    location: "Наше расположение в Джихангире",
  },
  fa: {
    badge: "خطای ۴۰۴",
    title: "صفحه مورد نظر یافت نشد",
    subtitle: "شاید غذایی که به دنبال آن هستید روی میز دیگری باشد!",
    desc: "ممکن است پیوند منتقل یا به‌روزرسانی شده باشد. نگران نباشید، می‌توانید منوی کامل غذاهای اصیل ترکی ما را مشاهده کنید:",
    menuBtn: "مشاهده منوی کامل",
    homeBtn: "بازگشت به صفحه اصلی",
    whatsapp: "سفارش مستقیم واتساپ",
    location: "موقعیت ما در جهانگیر",
  },
  fr: {
    badge: "Erreur 404",
    title: "Page Introuvable",
    subtitle: "Le plat que vous cherchez est peut-être sur une autre table !",
    desc: "La page a peut-être été déplacée ou mise à jour. Découvrez dès maintenant notre menu turc authentique :",
    menuBtn: "Explorer le Menu",
    homeBtn: "Retour à l'Accueil",
    whatsapp: "Commande directe WhatsApp",
    location: "Notre adresse à Cihangir",
  },
};

export default function NotFound() {
  const { lang, setLang } = useAppContext();
  const t = notFoundI18n[lang] || notFoundI18n.tr;
  const isRTL = lang === "ar" || lang === "fa";

  const languages = [
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "العربية" },
    { code: "ru", label: "RU" },
    { code: "fa", label: "فارسی" },
    { code: "fr", label: "FR" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 text-center" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-lg mx-auto space-y-6 glass-card p-8 sm:p-10 rounded-3xl border border-gold/30 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Accent */}
        <div className="absolute -top-24 -end-24 w-48 h-48 bg-copper/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge & Language Selector */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-copper/15 border border-copper/40 text-copper text-xs font-bold tracking-widest uppercase">
            <Compass size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
            <span>{t.badge}</span>
          </div>

          {/* Inline Language Selector */}
          <div className="inline-flex items-center gap-1 bg-ink/60 p-1 rounded-full border border-teal-dim/30">
            <Globe size={13} className="text-teal-dim ms-1.5 me-0.5" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  lang === l.code
                    ? "bg-gradient-to-r from-copper to-gold text-[#0E0804] shadow-sm"
                    : "text-cream-dim/70 hover:text-cream"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Heading */}
        <div className="space-y-2 pt-2">
          <h1
            className="text-3xl sm:text-4xl font-black text-cream"
            style={{ fontFamily: isRTL ? "var(--font-cairo)" : "var(--font-inter)" }}
          >
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-gold font-semibold">
            {t.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-cream-dim/80 leading-relaxed font-light pt-2 max-w-md mx-auto">
            {t.desc}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm hover:opacity-95 transition-all shadow-md hover:scale-[1.02]"
          >
            <Utensils size={17} />
            <span>{t.menuBtn}</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-ink/80 hover:bg-ink border border-gold/30 hover:border-gold text-cream font-bold text-sm transition-all"
          >
            <Home size={17} />
            <span>{t.homeBtn}</span>
          </Link>
        </div>

        {/* Secondary Links: WhatsApp & Map */}
        <div className="pt-4 border-t border-teal-dim/20 flex items-center justify-center gap-6 text-xs text-cream-dim flex-wrap">
          <a
            href="https://wa.me/905060453906"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>{t.whatsapp}</span>
          </a>
          <span className="opacity-30">&bull;</span>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <MapPin size={15} className="text-copper" />
            <span>{t.location}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
