"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Star, ExternalLink, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { platforms, reviewsList } from "../data/reviewsData";

// Platform brand icons
const PlatformIcon = ({ id, size = "md" }) => {
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-7 h-7" : "w-6 h-6";
  
  if (id === "google") {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  
  if (id === "yemeksepeti") {
    return (
      <div className={`${sizeClass} bg-[#EA004B] rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-sm tracking-tighter`}>
        ys
      </div>
    );
  }

  if (id === "yandex") {
    return (
      <div className={`${sizeClass} bg-[#FF0000] rounded-full flex items-center justify-center text-white font-black text-[11px] shadow-sm`}>
        Y
      </div>
    );
  }

  return null;
};

export default function ReviewSection() {
  const { lang, t, isRtl } = useAppContext();
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [isPaused, setIsPaused] = useState(false);
  const [livePlatformsData, setLivePlatformsData] = useState(platforms);
  const [liveReviewsData, setLiveReviewsData] = useState(reviewsList);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const scrollContainerRef = useRef(null);

  // Dynamic fetch from live /api/reviews endpoint
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.platforms && data.platforms.length > 0) {
              setLivePlatformsData(data.platforms);
            }
            if (data.reviews && data.reviews.length > 0) {
              setLiveReviewsData(data.reviews);
            }
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        console.warn("Using cached reviews data:", err.message);
      }
    }
    fetchLiveReviews();
    return () => { isMounted = false; };
  }, []);

  // Filter reviews
  const filteredReviews = selectedPlatform === "all"
    ? liveReviewsData
    : liveReviewsData.filter((r) => r.platform === selectedPlatform);

  // Duplicate for smooth seamless continuous loop
  const displayItems = [...filteredReviews, ...filteredReviews, ...filteredReviews];

  // Auto-scroll loop
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animationFrameId;
    const speed = 0.75; // smooth auto-scrolling speed

    const scrollStep = () => {
      if (!isPaused && el) {
        if (isRtl) {
          el.scrollLeft -= speed;
          // Loop reset for RTL
          if (Math.abs(el.scrollLeft) >= (el.scrollWidth - el.clientWidth) / 2) {
            el.scrollLeft = 0;
          }
        } else {
          el.scrollLeft += speed;
          // Loop reset for LTR
          if (el.scrollLeft >= (el.scrollWidth - el.clientWidth) / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isRtl, selectedPlatform]);



  const getPlatformName = (platformId) => {
    if (platformId === "google") return "Google Maps";
    if (platformId === "yemeksepeti") return "Yemeksepeti";
    if (platformId === "yandex") return "Yandex Maps";
    return platformId;
  };

  // Section UI labels
  const labels = {
    all: {
      tr: "Tüm Platformlar",
      en: "All Platforms",
      ar: "جميع المنصات",
      fa: "همه پلتفرم‌ها",
      fr: "Toutes les plateformes",
      ru: "Все платформы",
    },
    verified: {
      tr: "Doğrulanmış Misafir",
      en: "Verified Guest",
      ar: "عميل موثّق",
      fa: "مهمان تایید شده",
      fr: "Avis vérifié",
      ru: "Проверенный отзыв",
    },
    verifyOn: {
      tr: "Platformda İncele",
      en: "Verify on",
      ar: "عرض على",
      fa: "مشاهده در",
      fr: "Vérifier sur",
      ru: "Смотреть на",
    },
    liveStream: {
      tr: "Canlı Müşteri Değerlendirmeleri",
      en: "Live Customer Reviews",
      ar: "بث حي لتقييمات الضيوف",
      fa: "نظرات زنده و واقعی مشتریان",
      fr: "Avis clients en direct",
      ru: "Живые отзывы гостей",
    },
    writeReview: {
      tr: "Siz de Yorum Yapın",
      en: "Write a Review",
      ar: "شاركنا تقييمك",
      fa: "شما هم نظر دهید",
      fr: "Laisser un avis",
      ru: "Оставить отзыв",
    }
  };

  return (
    <section className="py-16 bg-ink border-t border-teal-dim/20 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {labels.liveStream[lang] || labels.liveStream.en}
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream tracking-wide mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.reviewsTitle || "Misafirlerimiz Ne Diyor?"}
          </h3>
          
          <p className="text-cream-dim/70 text-sm max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {t.reviewsSubtitle || "Google Maps, Yemeksepeti ve Yandex üzerinden gelen gerçek misafir deneyimleri"}
          </p>
        </div>

        {/* Platform Overview Cards (Google Maps, Yemeksepeti, Yandex) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          {livePlatformsData.map((p) => (
            <a
              key={p.id}
              href={p.writeReviewUrl || p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-4 rounded-2xl glass-card border-teal-dim/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_25px_rgba(212,162,76,0.15)] cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  <PlatformIcon id={p.id} size="lg" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-lg text-cream">{p.rating}</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-gold" />
                      ))}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-cream-dim group-hover:text-gold transition-colors">{p.name}</h4>
                  <span className="text-[11px] text-cream-dim/50 font-medium">{p.reviewsCount} {t.reviewsCountText || "reviews"}</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-teal-dim/20 flex items-center justify-center text-cream-dim group-hover:text-gold group-hover:bg-gold/20 transition-all">
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Interactive Platform Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedPlatform("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlatform === "all"
                ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)]"
                : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
            }`}
          >
            <span>{labels.all[lang] || labels.all.en}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-black/20 rounded-full">{liveReviewsData.length}</span>
          </button>

          {livePlatformsData.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                selectedPlatform === p.id
                  ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)]"
                  : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
              }`}
            >
              <PlatformIcon id={p.id} size="sm" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-moving Infinite Carousel (بيتحرك تلقائي) */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge gradient fades */}
        <div className="absolute start-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute end-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 px-4 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ cursor: isPaused ? "grab" : "default" }}
        >
          {displayItems.map((item, index) => {
            const currentPlatform = livePlatformsData.find((p) => p.id === item.platform);
            const reviewText = item.text[lang] || item.text.en || item.text.tr;
            const reviewDate = item.date[lang] || item.date.en || item.date.tr;
            const reviewTag = item.tag[lang] || item.tag.en || item.tag.tr;

            return (
              <a
                key={`${item.id}-${index}`}
                href={currentPlatform?.writeReviewUrl || currentPlatform?.link || "https://www.google.com/maps/search/?api=1&query=Karde%C5%9Fler+Kebap+Cihangir+Firuza%C4%9Fa"}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[300px] sm:w-[360px] shrink-0 p-6 rounded-2xl glass-card-strong border-teal-dim/20 hover:border-gold/60 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(212,162,76,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Platform Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-cream"
                      style={{ backgroundColor: currentPlatform?.badgeBg, border: `1px solid ${currentPlatform?.badgeBorder}` }}
                    >
                      <PlatformIcon id={item.platform} size="sm" />
                      <span className="text-[11px] font-semibold">{currentPlatform?.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={13} className="text-gold fill-gold drop-shadow-[0_0_4px_rgba(212,162,76,0.6)]" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-[13.5px] sm:text-[14px] text-cream-dim/95 leading-relaxed mb-4 line-clamp-4 italic" style={{ fontFamily: "var(--font-inter)" }}>
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Bottom Reviewer Info */}
                <div className="pt-3.5 border-t border-teal-dim/15 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-dim to-ink flex items-center justify-center text-gold font-bold text-sm border border-gold/30 shadow-sm">
                      {item.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-cream group-hover:text-gold transition-colors">{item.author}</span>
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" title={labels.verified[lang] || labels.verified.en} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-cream-dim/50">
                        <span>{reviewTag}</span>
                        <span>•</span>
                        <span>{reviewDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gold">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Write a Review Callout */}
      <div className="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-teal-dim/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
            <MessageSquarePlus size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-cream">
              {lang === "ar" ? "هل قمت بزيارتنا مؤخراً؟" : lang === "fa" ? "آیا اخیراً مهمان ما بوده‌اید؟" : "Bizi yakın zamanda ziyaret ettiniz mi?"}
            </h4>
            <p className="text-xs text-cream-dim/60">
              {lang === "ar" ? "يسعدنا جداً مشاركتك لتجربتك على منصات التقييم" : lang === "fa" ? "خوشحال می‌شویم تجربه خود را در پلتفرم‌های بررسی ثبت کنید" : "Google, Yemeksepeti veya Yandex üzerinden deneyiminizi paylaşın"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {livePlatformsData.map((p) => (
            <a
              key={p.id}
              href={p.writeReviewUrl || p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl glass-card border border-teal-dim/30 hover:border-gold/60 text-xs font-semibold text-cream flex items-center gap-2 transition-all hover:scale-105 shadow-sm hover:shadow-[0_0_15px_rgba(212,162,76,0.2)]"
            >
              <PlatformIcon id={p.id} size="sm" />
              <span>{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
