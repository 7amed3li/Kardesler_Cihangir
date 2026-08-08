"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquarePlus, 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Flame
} from "lucide-react";
import { platforms as fallbackPlatforms, reviewsList as fallbackReviews } from "../data/reviewsData";

// Platform brand icons
const PlatformIcon = ({ id, size = "md" }) => {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  
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
      <div className={`${sizeClass} bg-[#EA004B] rounded-full flex items-center justify-center text-white font-black text-[9px] shadow-sm tracking-tighter shrink-0`}>
        ys
      </div>
    );
  }

  if (id === "yandex") {
    return (
      <div className={`${sizeClass} bg-[#FF0000] rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-sm shrink-0`}>
        Y
      </div>
    );
  }

  return null;
};

export default function ReviewSection() {
  const { lang, t, isRtl } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState("five-star"); // default: all 5-star reviews
  const [isPaused, setIsPaused] = useState(false);
  const [livePlatformsData, setLivePlatformsData] = useState(fallbackPlatforms);
  const [liveReviewsData, setLiveReviewsData] = useState(fallbackReviews);
  const [activePhotoModal, setActivePhotoModal] = useState(null);
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
          }
        }
      } catch (err) {
        console.warn("Using cached reviews data:", err.message);
      }
    }
    fetchLiveReviews();
    return () => { isMounted = false; };
  }, []);

  // Filter reviews based on selected filter
  const filteredReviews = useMemo(() => {
    if (selectedFilter === "five-star") {
      return liveReviewsData.filter((r) => r.rating === 5);
    }
    if (selectedFilter === "with-photos") {
      return liveReviewsData.filter((r) => !!r.photo);
    }
    if (selectedFilter === "google" || selectedFilter === "yemeksepeti" || selectedFilter === "yandex") {
      return liveReviewsData.filter((r) => r.platform === selectedFilter);
    }
    return liveReviewsData;
  }, [liveReviewsData, selectedFilter]);

  // Duplicate for smooth seamless continuous marquee loop
  const displayItems = useMemo(() => {
    if (filteredReviews.length === 0) return [];
    return [...filteredReviews, ...filteredReviews, ...filteredReviews];
  }, [filteredReviews]);

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
          if (Math.abs(el.scrollLeft) >= (el.scrollWidth - el.clientWidth) / 2) {
            el.scrollLeft = 0;
          }
        } else {
          el.scrollLeft += speed;
          if (el.scrollLeft >= (el.scrollWidth - el.clientWidth) / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isRtl, filteredReviews]);

  // Manual scroll controls
  const handleScrollManual = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 380;
    const modifier = (isRtl ? -1 : 1) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: scrollAmount * modifier, behavior: "smooth" });
  };

  // Section UI labels
  const labels = {
    badge: {
      tr: "Canlı 5 Yıldızlı Müşteri Değerlendirmeleri",
      en: "Live 5-Star Verified Customer Reviews",
      ar: "تقييمات 5 نجوم حية وموثقة من الضيوف",
      fa: "نظرات زنده و تایید شده ۵ ستاره مشتریان",
      fr: "Avis clients 5 étoiles vérifiés en direct",
      ru: "Живые проверенные отзывы 5 звезд",
    },
    filter5Star: {
      tr: "⭐ 5 Yıldızlı Yorumlar",
      en: "⭐ 5-Star Reviews",
      ar: "⭐ تقييمات 5 نجوم",
      fa: "⭐ نظرات ۵ ستاره",
      fr: "⭐ Avis 5 Étoiles",
      ru: "⭐ Отзывы 5 звезд",
    },
    filterPhotos: {
      tr: "📷 Fotoğraflı Yorumlar",
      en: "📷 With Food Photos",
      ar: "📷 تجارب مصورة",
      fa: "📷 همراه با عکس غذا",
      fr: "📷 Avec photos des plats",
      ru: "📷 С фото блюд",
    },
    verifiedGuest: {
      tr: "Doğrulanmış 5★ Deneyim",
      en: "Verified 5★ Guest",
      ar: "تجربة 5★ موثقة",
      fa: "تجربه ۵★ تایید شده",
      fr: "Expérience 5★ vérifiée",
      ru: "Проверенный отзыв 5★",
    },
    verifyLink: {
      tr: "Orijinal Yorumu İncele",
      en: "View Original Review",
      ar: "عرض التقييم الأصلي",
      fa: "مشاهده نظر اصلی",
      fr: "Voir l'avis original",
      ru: "Посмотреть оригинал",
    },
    totalStats: {
      tr: "Toplam 4,550+ Doğrulanmış Yorum",
      en: "Over 4,550+ Verified Reviews Across Platforms",
      ar: "أكثر من 4,550+ تقييم حقيقي وموثق عبر المنصات",
      fa: "بیش از ۴,۵۵۰+ نظر واقعی در پلتفرم‌ها",
      fr: "Plus de 4 550+ avis vérifiés",
      ru: "Более 4 550+ проверенных отзывов",
    }
  };

  return (
    <section className="py-16 bg-ink border-t border-teal-dim/20 overflow-hidden relative" id="reviews">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(212,162,76,0.15)]">
            <Star size={13} className="text-gold fill-gold" />
            <span>{labels.badge[lang] || labels.badge.en}</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream tracking-wide mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.reviewsTitle || "Misafirlerimiz Ne Diyor?"}
          </h3>
          
          <p className="text-cream-dim/80 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {labels.totalStats[lang] || labels.totalStats.en}
          </p>
        </div>

        {/* Platform Summary Cards */}
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
                <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
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
                  <span className="text-[11px] text-cream-dim/60 font-medium">{p.reviewsCount} {t.reviewsCountText || "reviews"}</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-teal-dim/20 flex items-center justify-center text-cream-dim group-hover:text-gold group-hover:bg-gold/20 transition-all">
                <ExternalLink size={13} />
              </div>
            </a>
          ))}
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {/* 1. All 5-Star Reviews */}
          <button
            onClick={() => setSelectedFilter("five-star")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === "five-star"
                ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)] scale-105"
                : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
            }`}
          >
            <span>{labels.filter5Star[lang] || labels.filter5Star.en}</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-black/20 rounded-full font-bold">4,550+</span>
          </button>

          {/* 2. Reviews With Food Photos (REMOVED due to authenticity strict rules) */}

          {/* 3. Google Maps Filter */}
          <button
            onClick={() => setSelectedFilter("google")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === "google"
                ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)] scale-105"
                : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
            }`}
          >
            <PlatformIcon id="google" size="sm" />
            <span>Google Maps</span>
            <span className="text-[10px] opacity-70">1,280+</span>
          </button>

          {/* 4. Yemeksepeti Filter */}
          <button
            onClick={() => setSelectedFilter("yemeksepeti")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === "yemeksepeti"
                ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)] scale-105"
                : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
            }`}
          >
            <PlatformIcon id="yemeksepeti" size="sm" />
            <span>Yemeksepeti</span>
            <span className="text-[10px] opacity-70">2,450+</span>
          </button>

          {/* 5. Yandex Maps Filter */}
          <button
            onClick={() => setSelectedFilter("yandex")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === "yandex"
                ? "bg-gold text-ink shadow-[0_0_15px_rgba(212,162,76,0.4)] scale-105"
                : "bg-ink-2/80 text-cream-dim hover:text-cream border border-teal-dim/30 hover:bg-teal-dim/20"
            }`}
          >
            <PlatformIcon id="yandex" size="sm" />
            <span>Yandex Maps</span>
            <span className="text-[10px] opacity-70">820+</span>
          </button>
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="flex items-center justify-end gap-2 mb-3 px-2">
          <button
            onClick={() => handleScrollManual("left")}
            aria-label="Previous Reviews"
            className="w-8 h-8 rounded-full bg-ink-2 border border-gold/30 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScrollManual("right")}
            aria-label="Next Reviews"
            className="w-8 h-8 rounded-full bg-ink-2 border border-gold/30 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Auto-moving Infinite Carousel with Photos & Verified Details */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge gradient fades */}
        <div className="absolute start-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute end-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>

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
            const photoCaptionText = item.photoCaption ? (item.photoCaption[lang] || item.photoCaption.en || item.photoCaption.tr) : item.dish;

            return (
              <div
                key={`${item.id}-${index}`}
                className="group w-[310px] sm:w-[380px] shrink-0 p-5 rounded-2xl glass-card-strong border-teal-dim/20 hover:border-gold/60 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(212,162,76,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Platform Badge, 5 Stars & Exact Date */}
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

                  {/* Customer Food Photo (if attached) */}
                  {item.photo && (
                    <div 
                      onClick={() => setActivePhotoModal(item)}
                      className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 border border-gold/20 cursor-zoom-in group/photo"
                    >
                      <Image
                        src={item.photo}
                        alt={photoCaptionText || item.dish || "Delicious food"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
                        sizes="(max-width: 768px) 300px, 380px"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-cream drop-shadow-md flex items-center gap-1">
                            <Flame size={12} className="text-copper shrink-0" />
                            {photoCaptionText}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gold font-bold flex items-center gap-1 border border-gold/30">
                            <Camera size={10} />
                            Fotoğraf
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-[13.5px] sm:text-[14px] text-cream-dim/95 leading-relaxed mb-4 line-clamp-4 italic" style={{ fontFamily: "var(--font-inter)" }}>
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Bottom Reviewer Info & Direct Platform Verification Link */}
                <div className="pt-3.5 border-t border-teal-dim/15 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-dim to-ink flex items-center justify-center text-gold font-bold text-sm border border-gold/30 shadow-sm shrink-0">
                      {item.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-cream group-hover:text-gold transition-colors">{item.author}</span>
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" title={labels.verifiedGuest[lang] || labels.verifiedGuest.en} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-cream-dim/60">
                        <span className="font-semibold text-gold/80">{reviewTag}</span>
                        <span>•</span>
                        <span>{reviewDate}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={item.link || currentPlatform?.writeReviewUrl || currentPlatform?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${item.author}'s review on ${currentPlatform?.name}`}
                    className="p-1.5 rounded-lg bg-teal-dim/10 hover:bg-gold/20 text-cream-dim hover:text-gold transition-all"
                    title={labels.verifyLink[lang] || labels.verifyLink.en}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Customer Food Photo */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-ink-2 border border-gold/30 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-gold/20">
              <div className="flex items-center gap-2.5">
                <PlatformIcon id={activePhotoModal.platform} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-cream">{activePhotoModal.author}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-gold" />
                    ))}
                    <span className="text-cream-dim/60 ms-1">
                      {activePhotoModal.date[lang] || activePhotoModal.date.en || activePhotoModal.date.tr}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* High-res Image */}
            <div className="relative w-full h-[320px] sm:h-[420px] bg-black">
              <Image
                src={activePhotoModal.photo}
                alt={activePhotoModal.dish || "Dish photo"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            {/* Modal Footer Caption & Quote */}
            <div className="p-4 bg-ink">
              <p className="text-xs sm:text-sm text-cream/90 italic leading-relaxed mb-2">
                &ldquo;{activePhotoModal.text[lang] || activePhotoModal.text.en || activePhotoModal.text.tr}&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-gold font-bold pt-2 border-t border-teal-dim/20">
                <span>{activePhotoModal.photoCaption ? (activePhotoModal.photoCaption[lang] || activePhotoModal.photoCaption.en || activePhotoModal.photoCaption.tr) : activePhotoModal.dish}</span>
                <a
                  href={activePhotoModal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-cream-dim hover:text-gold transition-colors"
                >
                  <span>{labels.verifyLink[lang] || labels.verifyLink.en}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write a Review Callout Section */}
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
