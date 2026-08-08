"use client";

import React from "react";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";
import { reviewsList, platforms } from "../data/reviewsData";

const uiTexts = {
  ar: {
    badge: "تقييمات موثقة ومباشرة من ضيوفنا",
    title: "آراء حقيقية لضيوف مطعم كارديشلر",
    subtitle: "تقييمات حقيقية مسجلة على خرائط Google Maps ومنصات التوصيل الرسمية. انقر على أي تقييم للتحقق منه:",
    verifiedBadge: "تقييم معتمد على Google",
    viewAllReviews: "قراءة كافة التقييمات على خرائط Google Maps (+1280 تقييم)",
    verifyReview: "التحقق من المصدر",
  },
  en: {
    badge: "Authentic & Verified Guest Reviews",
    title: "What Our Real Guests Say",
    subtitle: "Genuine reviews recorded on Google Maps and official platforms. Click any review to verify directly on the source:",
    verifiedBadge: "Verified on Google",
    viewAllReviews: "Read all 1,280+ reviews on Google Maps",
    verifyReview: "Verify on Google",
  },
  tr: {
    badge: "Doğrulanmış Misafir Yorumları",
    title: "Misafirlerimiz Ne Diyor?",
    subtitle: "Google Maps ve resmi sipariş platformlarındaki gerçek yorumlar. Kaynağında doğrulamak için tıklayın:",
    verifiedBadge: "Google'da Doğrulandı",
    viewAllReviews: "Google Maps'teki 1.280+ yorumun tümünü oku",
    verifyReview: "Yorumu İncele",
  },
  ru: {
    badge: "Проверенные отзывы гостей",
    title: "Что говорят наши гости?",
    subtitle: "Реальные отзывы с Google Maps и официальных платформ. Нажмите, чтобы проверить источник:",
    verifiedBadge: "Проверено на Google",
    viewAllReviews: "Читать все 1 280+ отзывов на Google Maps",
    verifyReview: "Проверить отзыв",
  },
  fa: {
    badge: "نظرات تایید شده و واقعی مهمانان",
    title: "دیدگاه مهمانان ما در گوگل مپ",
    subtitle: "نظرات واقعی ثبت شده در Google Maps و پلتفرم‌های معتبر. برای مشاهده و تایید روی هر نظر کلیک کنید:",
    verifiedBadge: "تایید شده در گوگل",
    viewAllReviews: "مشاهده تمام ۱۲۸۰+ نظر در گوگل مپ",
    verifyReview: "مشاهده در گوگل مپ",
  },
  fr: {
    badge: "Avis Vérifiés et Authentiques",
    title: "Ce que disent nos clients",
    subtitle: "Avis réels déposés sur Google Maps et plateformes officielles. Cliquez pour vérifier la source :",
    verifiedBadge: "Vérifié sur Google",
    viewAllReviews: "Lire tous les 1 280+ avis sur Google Maps",
    verifyReview: "Vérifier la source",
  },
};

export default function LandingVerifiedReviews({ currentLocale = "ar" }) {
  const texts = uiTexts[currentLocale] || uiTexts.en;
  const isRtl = currentLocale === "ar" || currentLocale === "fa";

  // Pick top 3 verified google reviews from reviewsList
  const googleReviews = reviewsList.filter((r) => r.platform === "google").slice(0, 3);
  const googlePlatform = platforms.find((p) => p.id === "google") || {
    link: "https://www.google.com/maps/search/?api=1&query=Kardeşler+Kebap+Firuzağa+Cihangir+Beyoğlu",
    rating: "4.6",
    reviewsCount: "1,280+",
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
          <Star size={13} className="text-gold fill-gold" />
          <span>{texts.badge}</span>
        </div>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-black text-cream"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          {texts.title}
        </h2>
        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        <p className="text-cream-dim/80 text-xs sm:text-sm leading-relaxed">
          {texts.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {googleReviews.map((review) => {
          const reviewText = review.text[currentLocale] || review.text.en;
          const reviewDate = review.date[currentLocale] || review.date.en;
          const reviewTag = review.tag?.[currentLocale] || review.tag?.en;

          return (
            <div
              key={review.id}
              className="p-5 sm:p-6 rounded-2xl glass-card border border-teal-dim/30 flex flex-col justify-between space-y-4 hover:border-gold/40 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-gold" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                    <ShieldCheck size={11} />
                    <span>Google Maps</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-cream-dim/90 italic leading-relaxed font-light">
                  "{reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-teal-dim/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-copper/30 border border-gold/40 text-gold flex items-center justify-center font-bold text-xs">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="text-cream font-bold text-xs sm:text-sm">{review.author}</h4>
                    <span className="text-[10px] text-cream-dim/60">
                      {reviewTag ? `${reviewTag} • ` : ""}{reviewDate}
                    </span>
                  </div>
                </div>

                <a
                  href={googlePlatform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gold hover:text-cream flex items-center gap-1 font-semibold group-hover:underline underline-offset-2 transition-colors"
                >
                  <span>{texts.verifyReview}</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verified Google Maps Overview Banner */}
      <div className="text-center pt-2">
        <a
          href={googlePlatform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ink/90 border border-gold/30 text-cream hover:border-gold hover:text-gold text-xs sm:text-sm font-bold transition-all shadow-lg hover:scale-[1.01]"
        >
          <div className="flex items-center gap-1 text-gold">
            <Star size={14} className="fill-gold" />
            <span>4.6</span>
          </div>
          <span>•</span>
          <span>{texts.viewAllReviews}</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
