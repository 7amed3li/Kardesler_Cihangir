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
      tr: "5 Yıldızlı Yorumlar",
      en: "5-Star Reviews",
      ar: "تقييمات 5 نجوم",
      fa: "نظرات ۵ ستاره",
      fr: "Avis 5 Étoiles",
      ru: "Отзывы 5 звезд",
    },
    filterPhotos: {
      tr: "Fotoğraflı Yorumlar",
      en: "With Food Photos",
      ar: "تجارب مصورة",
      fa: "همراه با عکس غذا",
      fr: "Avec photos des plats",
      ru: "С фото блюд",
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
    <section className="py-16 bg-[#EDE3CE] border-t border-[#9C7A3F]/20 overflow-hidden relative" id="reviews">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Ottoman Divider */}
        <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider mb-3">
            <Star size={13} className="text-[#9C7A3F] fill-[#9C7A3F]" />
            <span>{labels.badge[lang] || labels.badge.en}</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2B2620] tracking-wide mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.reviewsTitle || "Misafirlerimiz Ne Diyor?"}
          </h3>
          
          <p className="text-[#7A7364] text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
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
              className="group relative flex items-center justify-between p-4 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/20 hover:border-[#9C7A3F] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-md bg-[#EDE3CE] flex items-center justify-center border border-[#9C7A3F]/20">
                  <PlatformIcon id={p.id} size="lg" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-lg text-[#2B2620]">{p.rating}</span>
                    <div className="flex text-[#9C7A3F]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-[#9C7A3F]" />
                      ))}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[#2B2620] group-hover:text-[#9C7A3F] transition-colors">{p.name}</h4>
                  <span className="text-[11px] text-[#7A7364] font-medium">{p.reviewsCount} {t.reviewsCountText || "reviews"}</span>
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
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedFilter === "five-star"
                ? "bg-[#4E5F4C] text-[#EAF0E6]"
                : "bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/30 hover:border-[#9C7A3F]"
            }`}
          >
            <span>{labels.filter5Star[lang] || labels.filter5Star.en}</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-black/10 rounded-full font-bold">4,550+</span>
          </button>

          {/* 3. Google Maps Filter */}
          <button
            onClick={() => setSelectedFilter("google")}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedFilter === "google"
                ? "bg-[#4E5F4C] text-[#EAF0E6]"
                : "bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/30 hover:border-[#9C7A3F]"
            }`}
          >
            <PlatformIcon id="google" size="sm" />
            <span>Google Maps</span>
            <span className="text-[10px] opacity-70">1,280+</span>
          </button>

          {/* 4. Yemeksepeti Filter */}
          <button
            onClick={() => setSelectedFilter("yemeksepeti")}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedFilter === "yemeksepeti"
                ? "bg-[#4E5F4C] text-[#EAF0E6]"
                : "bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/30 hover:border-[#9C7A3F]"
            }`}
          >
            <PlatformIcon id="yemeksepeti" size="sm" />
            <span>Yemeksepeti</span>
            <span className="text-[10px] opacity-70">2,450+</span>
          </button>

          {/* 5. Yandex Maps Filter */}
          <button
            onClick={() => setSelectedFilter("yandex")}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
              selectedFilter === "yandex"
                ? "bg-[#4E5F4C] text-[#EAF0E6]"
                : "bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/30 hover:border-[#9C7A3F]"
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
            className="w-8 h-8 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 flex items-center justify-center text-[#2B2620] hover:text-[#9C7A3F] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScrollManual("right")}
            aria-label="Next Reviews"
            className="w-8 h-8 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 flex items-center justify-center text-[#2B2620] hover:text-[#9C7A3F] transition-colors"
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
        <div
          ref={scrollContainerRef}
          className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth"
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
                className="group w-[310px] sm:w-[380px] shrink-0 p-5 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/20 hover:border-[#9C7A3F] transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Platform Badge, 5 Stars & Exact Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-[#2B2620]"
                      style={{ backgroundColor: "#EDE3CE", border: `1px solid rgba(156, 122, 63, 0.3)` }}
                    >
                      <PlatformIcon id={item.platform} size="sm" />
                      <span className="text-[11px] font-bold">{currentPlatform?.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={13} className="text-[#9C7A3F] fill-[#9C7A3F]" />
                      ))}
                    </div>
                  </div>

                  {/* Customer Food Photo */}
                  {item.photo && (
                    <div 
                      onClick={() => setActivePhotoModal(item)}
                      className="relative w-full h-36 rounded-md overflow-hidden mb-3.5 border border-[#9C7A3F]/20 cursor-zoom-in group/photo bg-[#EDE3CE]"
                    >
                      <Image
                        src={item.photo}
                        alt={photoCaptionText || item.dish || "Delicious food"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/photo:scale-105"
                        sizes="(max-width: 768px) 300px, 380px"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#2B2620]/40 flex items-end p-2.5">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            {photoCaptionText}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#2B2620]/80 text-[#9C7A3F] font-bold flex items-center gap-1">
                            <Camera size={10} />
                            Fotoğraf
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-[13.5px] sm:text-[14px] text-[#2B2620] leading-relaxed mb-4 line-clamp-4 italic font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Bottom Reviewer Info & Direct Platform Verification Link */}
                <div className="pt-3 border-t border-[#9C7A3F]/20 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#EDE3CE] flex items-center justify-center text-[#9C7A3F] font-bold text-sm border border-[#9C7A3F]/30 shrink-0">
                      {item.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#2B2620]">{item.author}</span>
                        <CheckCircle2 size={12} className="text-[#4E5F4C] shrink-0" title={labels.verifiedGuest[lang] || labels.verifiedGuest.en} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#7A7364]">
                        <span className="font-semibold text-[#9C7A3F]">{reviewTag}</span>
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
                    className="p-1.5 rounded-md bg-[#EDE3CE] text-[#2B2620] hover:text-[#9C7A3F] transition-colors"
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
          className="fixed inset-0 z-50 bg-[#2B2620]/80 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-2xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#9C7A3F]/20">
              <div className="flex items-center gap-2.5">
                <PlatformIcon id={activePhotoModal.platform} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-[#2B2620]">{activePhotoModal.author}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#9C7A3F]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-[#9C7A3F]" />
                    ))}
                    <span className="text-[#7A7364] ms-1">
                      {activePhotoModal.date[lang] || activePhotoModal.date.en || activePhotoModal.date.tr}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="w-8 h-8 rounded-md bg-[#EDE3CE] text-[#2B2620] hover:text-[#9C7A3F] flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* High-res Image */}
            <div className="relative w-full h-[320px] sm:h-[420px] bg-[#EDE3CE]">
              <Image
                src={activePhotoModal.photo}
                alt={activePhotoModal.dish || "Dish photo"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            {/* Modal Footer Caption & Quote */}
            <div className="p-4 bg-[#F7F2E7]">
              <p className="text-xs sm:text-sm text-[#2B2620] italic font-medium leading-relaxed mb-2">
                &ldquo;{activePhotoModal.text[lang] || activePhotoModal.text.en || activePhotoModal.text.tr}&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-[#9C7A3F] font-bold pt-2 border-t border-[#9C7A3F]/20">
                <span>{activePhotoModal.photoCaption ? (activePhotoModal.photoCaption[lang] || activePhotoModal.photoCaption.en || activePhotoModal.photoCaption.tr) : activePhotoModal.dish}</span>
                <a
                  href={activePhotoModal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#7A7364] hover:text-[#2B2620] transition-colors"
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
      <div className="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-[#9C7A3F]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 flex items-center justify-center text-[#9C7A3F] shrink-0">
            <MessageSquarePlus size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2B2620]">
              {
                lang === "ar" ? "هل قمت بزيارتنا مؤخراً؟" :
                lang === "fa" ? "آیا اخیراً مهمان ما بوده‌اید؟" :
                lang === "de" ? "Haben Sie uns kürzlich besucht?" :
                lang === "it" ? "Ci hai visitato di recente?" :
                lang === "es" ? "¿Nos has visitado recientemente?" :
                lang === "zh" ? "您最近到访过我们店吗？" :
                lang === "fr" ? "Nous avez-vous rendu visite récemment ?" :
                lang === "ru" ? "Вы посещали нас в последнее время?" :
                lang === "en" ? "Have you visited us recently?" :
                "Bizi yakın zamanda ziyaret ettiniz mi?"
              }
            </h4>
            <p className="text-xs text-[#7A7364]">
              {
                lang === "ar" ? "يسعدنا جداً مشاركتك لتجربتك على منصات التقييم Google أو Yemeksepeti أو Yandex" :
                lang === "fa" ? "خوشحال می‌شویم تجربه خود را در گوگل، یمکسپتی یا یاندکس ثبت کنید" :
                lang === "de" ? "Teilen Sie Ihre Erfahrungen auf Google, Yemeksepeti oder Yandex" :
                lang === "it" ? "Condividi la tua esperienza su Google, Yemeksepeti o Yandex" :
                lang === "es" ? "Comparte tu experiencia en Google, Yemeksepeti o Yandex" :
                lang === "zh" ? "在 Google、Yemeksepeti 或 Yandex 上分享您的就餐体验" :
                lang === "fr" ? "Partagez votre expérience sur Google, Yemeksepeti ou Yandex" :
                lang === "ru" ? "Поделитесь впечатлениями в Google, Yemeksepeti или Yandex" :
                lang === "en" ? "Share your experience with us on Google, Yemeksepeti or Yandex" :
                "Google, Yemeksepeti veya Yandex üzerinden deneyiminizi paylaşın"
              }
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
              className="px-3.5 py-2 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 hover:border-[#9C7A3F] text-xs font-semibold text-[#2B2620] flex items-center gap-2 transition-colors"
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
