"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function RestaurantMap({ 
  heightClass = "h-48 sm:h-56", 
  className = "mb-8",
  showDirectionsButton = false 
}) {
  const { language } = useAppContext();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef(null);

  const googleMapsUrl = "https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g";
  
  // High-accuracy Google Maps embed with place marker
  const mapEmbedUrl = "https://maps.google.com/maps?q=Karde%C5%9Fler+Kebap,+Firuza%C4%9Fa+Camii+Sok.+No:1A,+Cihangir,+Beyo%C4%9Flu,+%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const labels = {
    tr: {
      openMaps: "Haritalar'da Aç",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "Taksim Meydanı'na 5 dk",
      getDirections: "Yol Tarifi Al",
      loading: "Harita Yükleniyor...",
    },
    en: {
      openMaps: "Open in Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "5 min from Taksim Square",
      getDirections: "Get Directions",
      loading: "Loading Map...",
    },
    ar: {
      openMaps: "افتح في الخرائط",
      restaurantName: "مطعم كارديشلر كباب",
      address: "حي فيروز آغا رقم 1/A، جيهانكير",
      nearTaksim: "٥ دقائق من ميدان تقسيم",
      getDirections: "الحصول على الاتجاهات",
      loading: "جاري تحميل الخريطة...",
    },
    ru: {
      openMaps: "Открыть в картах",
      restaurantName: "Kardeşler Kebap",
      address: "Фирузага № 1/A, Джихангир",
      nearTaksim: "5 минут от площади Таксим",
      getDirections: "Маршрут",
      loading: "Загрузка карты...",
    },
    fa: {
      openMaps: "باز کردن در نقشه",
      restaurantName: "رستوران کاردشلر کباب",
      address: "محله فیروزآقا پلاک 1/A، جهانگیر",
      nearTaksim: "۵ دقیقه از میدان تکسیم",
      getDirections: "مسیریابی",
      loading: "در حال بارگذاری نقشه...",
    },
    fr: {
      openMaps: "Ouvrir dans Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "À 5 min de la place Taksim",
      getDirections: "Itinéraire",
      loading: "Chargement de la carte...",
    },
  };

  const currentLabels = labels[language] || labels.tr;
  const isRtl = language === "ar" || language === "fa";

  return (
    <div className={`w-full ${className}`}>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        ref={mapRef}
        className={`map-dark-container block w-full ${heightClass} rounded-2xl relative bg-ink/70 overflow-hidden group cursor-pointer border border-teal-dim/30 hover:border-gold/60 transition-all duration-300 shadow-lg`}
        aria-label="Google Maps Location for Kardeşler Kebap Cihangir"
      >
        {!isMapVisible ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-dim/60">
            <MapPin className="w-8 h-8 mb-2 animate-bounce text-copper" />
            <span className="text-xs uppercase tracking-widest font-medium">
              {currentLabels.loading}
            </span>
          </div>
        ) : (
          <iframe
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kardeşler Cihangir Location"
            allowFullScreen
            className="w-full h-full border-0 pointer-events-none"
          />
        )}

        {/* ── Overlay Dimmer for sleek look ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/70 via-transparent to-[#0E0804]/40 pointer-events-none group-hover:from-[#0E0804]/50 transition-all duration-300" />

        {/* ── PROMINENT RESTAURANT PIN OVERLAY ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center -translate-y-4 group-hover:-translate-y-5 transition-transform duration-300">
            {/* Floating Info Pill */}
            <div className="px-3 py-1.5 rounded-full bg-[#0E0804]/90 backdrop-blur-md border border-gold/50 shadow-xl shadow-black/80 flex items-center gap-2 mb-1.5 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
              <span className="text-xs font-bold text-cream tracking-tight whitespace-nowrap">
                {currentLabels.restaurantName}
              </span>
              <span className="text-[10px] text-gold font-medium hidden sm:inline-block">
                (1998)
              </span>
            </div>

            {/* Custom Glowing Map Pin */}
            <div className="relative flex items-center justify-center">
              {/* Pulse Ring */}
              <div className="absolute w-8 h-8 rounded-full bg-copper/30 animate-ping" />
              <div className="absolute w-5 h-5 rounded-full bg-gold/40 animate-pulse" />
              
              {/* Pin Icon with vibrant red-copper gradient */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-copper to-gold p-0.5 shadow-2xl flex items-center justify-center transform drop-shadow-[0_4px_10px_rgba(230,81,0,0.7)]">
                <div className="w-full h-full bg-[#0E0804] rounded-full flex items-center justify-center">
                  <MapPin size={18} className="text-gold fill-copper animate-bounce" />
                </div>
              </div>

              {/* Pin Base Shadow / Point */}
              <div className="absolute -bottom-1 w-2 h-1 bg-black/60 rounded-full blur-[1px]" />
            </div>
          </div>
        </div>

        {/* ── Top Floating Action: Open in Maps ── */}
        <div className="absolute top-3 end-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E0804]/80 backdrop-blur-md border border-gold/30 text-cream group-hover:text-gold group-hover:border-gold text-xs font-medium transition-all shadow-md">
            <span>{currentLabels.openMaps}</span>
            <ExternalLink size={12} className="text-gold" />
          </div>
        </div>

        {/* ── Bottom Floating Tag: Distance from Taksim ── */}
        <div className="absolute bottom-3 start-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0E0804]/85 backdrop-blur-md border border-copper/30 text-cream-dim text-[11px] font-normal shadow-md">
            <Navigation size={11} className="text-copper" />
            <span>{currentLabels.nearTaksim}</span>
          </div>
        </div>
      </a>

      {/* Optional Directions CTA Button below the map */}
      {showDirectionsButton && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-copper/15 border border-copper/30 text-copper font-bold text-sm hover:bg-copper hover:text-cream transition-all duration-300 shadow-sm hover:shadow-copper/20"
        >
          <Navigation size={16} />
          <span>{currentLabels.getDirections}</span>
        </a>
      )}
    </div>
  );
}
