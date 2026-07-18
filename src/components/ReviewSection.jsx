"use client";

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Star, ExternalLink } from "lucide-react";

export default function ReviewSection() {
  const { t } = useAppContext();
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      id: "google",
      name: "Google",
      rating: "4.7",
      reviewsCount: "1,200+",
      link: "https://www.google.com/maps/search/Kardeşler+Kebap+Cihangir+Firuzağa",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      id: "yandex",
      name: "Yandex Maps",
      rating: "4.7",
      reviewsCount: "800+",
      link: "https://yandex.com.tr/harita/org/kardesler_kebap_cafe/1044439169/",
      icon: (
        <div className="w-6 h-6 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-[12px]">
          Y
        </div>
      )
    },
    {
      id: "yemeksepeti",
      name: "Yemeksepeti",
      rating: "4.5",
      reviewsCount: "2,500+",
      link: "https://www.yemeksepeti.com/restaurant/v8xk/kardesler-kebap",
      icon: (
        <div className="w-6 h-6 bg-[#EA004B] rounded-full flex items-center justify-center text-white font-bold text-[10px]">
          ys
        </div>
      )
    }
  ];

  const userComments = [
    { id: 1, name: 'Ayşe Y.', source: 'Yandex Maps', initial: 'A', link: 'https://yandex.com.tr/harita/org/kardesler_kebap_cafe/1044439169/' },
    { id: 2, name: 'Serkan A.', source: 'Google', initial: 'S', link: 'https://www.google.com/maps/search/Kardeşler+Kebap+Cihangir+Firuzağa' },
    { id: 3, name: 'Burak K.', source: 'Google', initial: 'B', link: 'https://www.google.com/maps/search/Kardeşler+Kebap+Cihangir+Firuzağa' },
    { id: 4, name: 'Maria G.', source: 'TripAdvisor', initial: 'M', link: 'https://www.google.com/maps/search/Kardeşler+Kebap+Cihangir+Firuzağa' },
    { id: 5, name: 'Ahmed S.', source: 'Yemeksepeti', initial: 'A', link: 'https://www.yemeksepeti.com/restaurant/v8xk/kardesler-kebap' },
    { id: 6, name: 'Canan E.', source: 'Yandex Maps', initial: 'C', link: 'https://yandex.com.tr/harita/org/kardesler_kebap_cafe/1044439169/' },
  ];

  const marqueeItems = [...userComments, ...userComments];

  return (
    <section className="py-16 bg-ink border-t border-teal-dim/20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4 mb-14">
        
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[10px] text-gold tracking-[0.4em] uppercase mb-2">★★★</span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-cream tracking-wide mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.reviewsTitle || "What our guests say"}
          </h3>
          <p className="text-cream-dim/60 text-sm font-light tracking-wide max-w-md">
            {t.reviewsSubtitle || "Real ratings from trusted platforms. Click to verify."}
          </p>
        </div>

        {/* Platform Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl">
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-ink-2 border border-teal-dim/20 hover:border-copper/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(198,98,43,0.1)]"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={14} className="text-cream-dim/40" />
              </div>
              
              <div className="mb-3">
                {review.icon}
              </div>
              
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-3xl font-black text-cream">{review.rating}</span>
                <Star size={16} className="text-gold fill-gold" />
              </div>
              
              <span className="text-sm font-bold text-cream-dim tracking-wide mb-0.5">
                {review.name}
              </span>
              <span className="text-[10px] text-cream-dim/40 uppercase tracking-widest">
                {review.reviewsCount} {t.reviewsCountText || "reviews"}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* CSS-only Infinite Marquee */}
      <div 
        className="relative w-full pb-4" 
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>

        <div
          className="flex gap-6 pl-6 w-max"
          style={{
            animation: "marqueeScroll 40s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeItems.map((comment, idx) => (
            <a
              key={`marquee-${comment.id}-${idx}`}
              href={comment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[280px] sm:w-[350px] shrink-0 p-7 rounded-2xl bg-ink-2/80 backdrop-blur-md border border-teal-dim/20 flex flex-col justify-between hover:border-copper/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(198,98,43,0.1)] cursor-pointer"
            >
              <div className="absolute top-4 right-4 text-gold/5 text-6xl font-serif leading-none group-hover:text-gold/20 transition-colors">"</div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={14} className="text-copper" />
              </div>
              
              <div className="flex items-center gap-1 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              
              <p className="text-[14px] sm:text-[15px] text-cream-dim/90 font-light leading-relaxed mb-6 relative z-10">
                {t[`review${comment.id}`]}
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-teal-dim/10 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-dim to-ink flex items-center justify-center text-cream font-bold border border-teal-dim/30">
                  {comment.initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-cream">
                    {comment.name}
                  </span>
                  <span className="text-[10px] text-cream-dim/50 uppercase tracking-widest font-medium">
                    {comment.source}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
