import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, Phone, Utensils, Award, CheckCircle2, 
  Navigation, MessageCircle, Flame, ShieldCheck, 
  Heart, Compass, ChevronLeft, ArrowUpLeft, Check, ExternalLink
} from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";
import SeoStorytelling from "../../../components/SeoStorytelling";

export const metadata = {
  title: "بهترین کباب اصیل عثمانی نزدیک میدان تقسیم استانبول (از ۱۹۹۸) | رستوران کاردشلر جهانگیر",
  description:
    "تجربه کباب اصیل ترکی روی زغال طبیعی بلوط و پیده‌های تنوری در محله تاریخی جهانگیر از سال ۱۹۹۸. گوشت ۱۰۰٪ تازه حلال ساطوری. فقط ۵ دقیقه پیاده تا میدان تقسیم.",
  keywords: [
    "بهترین کباب در تکسیم",
    "رستوران حلال در استانبول",
    "کجا در تکسیم غذا بخوریم",
    "کباب اصیل ترکی",
    "رستوران های نزدیک خیابان استقلال",
    "بهترین لاهماجون تکسیم",
    "غذاهای سنتی آناتولی",
    "بهترین کباب آدانا در استانبول",
    "پیتزای ترکی در بی اوغلو",
    "کباب زغالی استانبول",
    "رستوران های محله جیهانگیر",
    "صبحانه ترکی تکسیم",
    "صبحانه سنتی استانبول",
    "بهترین صبحانه در تکسیم",
    "منمن تکسیم",
    "تخم مرغ با سوجوک",
    "صبحانه ارزان تکسیم",
    "صبحانه در جیهانگیر",
    "کباب آدانا",
    "کباب اورفا",
    "کباب بیتی",
    "سوپ عدس ترکی",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/fa/best-kebab-taksim",
    languages: {
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "بهترین کباب اصیل روی زغال بلوط نزدیک تقسیم (تاسیس ۱۹۹۸) — رستوران کاردشلر",
    description: "بیش از ۲۸ سال اصالت، گوشت تازه ساطوری و پخت در تنور ۴۵۰ درجه در قلب استانبول.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchemaFa = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "بهترین کباب اصیل و حلال نزدیک میدان تقسیم کجاست؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "رستوران کاردشلر کباب (تاسیس ۱۹۹۸) در محله تاریخی جهانگیر، تنها ۵ دقیقه پیاده (۴۵۰ متر) با میدان تقسیم فاصله دارد و به کباب‌های ساطوری روی زغال چوب و پیده‌های تنوری مشهور است.",
      },
    },
    {
      "@type": "Question",
      name: "تفاوت کاردشلر با رستوران‌های تجاری خیابان استقلال چیست؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "کاردشلر پاتوق اصیل اهالی استانبول از سال ۱۹۹۸ است. گوشت‌ها دست‌ساز و با ساطور سنتی خرد می‌شوند، روی زغال طبیعی بلوط کباب شده و با قیمت‌های محلی منصفانه عرضه می‌شوند.",
      },
    },
  ],
};

export default function PersianLandingPage() {
  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("سلام رستوران کاردشلر، قصد رزرو میز یا سفارش غذا دارم.");

  return (
    <div className="min-h-screen bg-[#0E0804] text-cream selection:bg-copper selection:text-white" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaFa) }}
      />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.webp"
            alt="رستوران کاردشلر کباب جهانگیر تقسیم استانبول از ۱۹۹۸"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/90 via-[#0E0804]/60 to-[#0E0804]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/10 to-copper/10 border border-gold/30 text-gold text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] shadow-[0_0_15px_rgba(217,119,6,0.15)] relative overflow-hidden group">
            <Award size={14} className="text-copper shrink-0" />

            <span className="relative z-10">تاسیس ۱۹۹۸ • جهانگیر تاریخی</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.25] tracking-tight luxury-title"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            کباب اصیل عثمانی <br className="hidden sm:inline" />
            روی <span className="luxury-gold-serif">زغال طبیعی چوب بلوط</span> نزدیک تقسیم
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            بیش از ۲۸ سال پایبندی به هنر آشپزی اصیل: گوشت‌های تازه ساطوری با چاقوی سنتی زره، کباب زغالی و پیده‌های داغ تنور سنگی ۴۵۰ درجه.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-bold text-cream">۴.۶ از ۵</span>
              <span className="text-cream-dim/70">(+۱۲۸۰ نظر گوگل مپ)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" />
              <span>۵ دقیقه پیاده از میدان تقسیم (۴۵۰ متر)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" />
              <span>گوشت ۱۰۰٪ تازه و حلال روز</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>رزرو فوری میز VIP در واتس‌اپ</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <Navigation size={16} className="text-copper" />
              <span>مسیریابی در گوگل مپ</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-teal-dim/30 bg-[#140D07]/90 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">۱۹۹۸</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">سال تاسیس در جهانگیر</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-cream">۱۰۰٪</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">گوشت تازه حلال روز</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">۴.۶★</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">+۱۲۸۰ نظر تایید شده</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cream">۴۵۰°C</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">حرارت تنور سنگی هیزمی</div>
          </div>
        </div>
      </section>

      {/* ── SEO STORYTELLING (MAGAZINE LAYOUT) ── */}
      <SeoStorytelling locale="fa" />

      {/* ── 3. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="fa" />

      {/* ── 4. VERIFIED GOOGLE MAPS REVIEWS (DIRECT LINKS & AUTHENTIC SOURCE) ── */}
      <LandingVerifiedReviews currentLocale="fa" />

      {/* ── 5. FINAL VIP CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140D07] to-[#0E0804] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-gold text-xs font-bold uppercase tracking-wider">
            <span>رزرو ویژه و پذیرایی از مهمانان گرامی</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            طعم ۲۸ سال اصالت و مهارت کباب زغالی را امشب بچشید
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            میزبان دورهمی‌های خانوادگی و دوستانه شما در فضایی آرام و دلنشین در محله جهانگیر هستیم.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>ارتباط و رزرو سریع در واتس‌اپ</span>
            </a>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream hover:border-gold/50 font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone size={16} className="text-teal" />
              <span>+90 212 251 36 96</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
