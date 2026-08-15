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
        className={`block w-full ${heightClass} rounded-xl relative bg-[#EDE3CE] overflow-hidden group cursor-pointer border border-[#9C7A3F]/30 hover:border-[#9C7A3F] transition-colors shadow-sm`}
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

        {/* ── Overlay for clean contrast ── */}
        <div className="absolute inset-0 bg-[#EDE3CE]/20 pointer-events-none" />

        {/* ── RESTAURANT PIN OVERLAY ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center -translate-y-4">
            {/* Floating Info Pill */}
            <div className="px-3 py-1.5 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-md flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9C7A3F]" />
              <span className="text-xs font-bold text-[#2B2620] tracking-tight whitespace-nowrap">
                {currentLabels.restaurantName}
              </span>
              <span className="text-[10px] text-[#9C7A3F] font-semibold hidden sm:inline-block">
                (1998)
              </span>
            </div>

            {/* Custom Clean Map Pin */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#4E5F4C] shadow-md flex items-center justify-center">
                <MapPin size={18} className="text-[#EAF0E6] fill-[#4E5F4C]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Top Floating Action: Open in Maps ── */}
        <div className="absolute top-3 end-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#2B2620] text-xs font-bold shadow-sm">
            <span>{currentLabels.openMaps}</span>
            <ExternalLink size={12} className="text-[#9C7A3F]" />
          </div>
        </div>

        {/* ── Bottom Floating Tag: Distance from Taksim ── */}
        <div className="absolute bottom-3 start-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#7A7364] text-[11px] font-semibold shadow-sm">
            <Navigation size={11} className="text-[#4E5F4C]" />
            <span>{currentLabels.nearTaksim}</span>
          </div>
        </div>
      </a>

      {/* Directions CTA Button below the map */}
      {showDirectionsButton && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Navigation size={16} />
          <span>{currentLabels.getDirections}</span>
        </a>
      )}
    </div>
  );
}
