"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function RestaurantMap({ 
  heightClass = "h-48 sm:h-56", 
  className = "mb-8",
  showDirectionsButton = false 
}) {
  const { lang, language } = useAppContext();
  const currentLang = lang || language || "tr";
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const mapRef = useRef(null);

  const googleMapsUrl = "https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g";
  
  // Use the Google Maps embed endpoint — more reliable on mobile browsers
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1505.5!2d28.9835!3d41.0315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7eb5ad33d33%3A0x68f3cc302fff9064!2sKarde%C5%9Fler%20Kebap!5e0!3m2!1str!2str!4v1";

  // Fallback: simple query-based embed (works on virtually all mobile browsers)
  const mapEmbedFallback = "https://www.google.com/maps/embed/v1/place?key=&q=Kardeşler+Kebap,Cihangir,Istanbul";

  // Use the simpler, most compatible format as primary
  const primaryEmbedUrl = "https://maps.google.com/maps?q=41.0315,28.9835&z=16&output=embed";

  useEffect(() => {
    // More aggressive observer for mobile — lower threshold and margin
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "400px",
        threshold: 0
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    // Fallback: if IntersectionObserver doesn't fire within 3s, force-show the map
    // This handles mobile browsers where IO can be unreliable
    const fallbackTimer = setTimeout(() => {
      setIsMapVisible(true);
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeFailed(true);
  }, []);

  const labels = {
    tr: {
      openMaps: "Haritalar'da Aç",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "Taksim Meydanı'na 5 dk",
      getDirections: "Yol Tarifi Al",
      loading: "Harita Yükleniyor...",
      tapToOpen: "Haritayı açmak için dokunun",
    },
    en: {
      openMaps: "Open in Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "5 min from Taksim Square",
      getDirections: "Get Directions",
      loading: "Loading Map...",
      tapToOpen: "Tap to open map",
    },
    ar: {
      openMaps: "افتح في الخرائط",
      restaurantName: "مطعم كارديشلر كباب",
      address: "حي فيروز آغا رقم 1/A، جيهانكير",
      nearTaksim: "٥ دقائق من ميدان تقسيم",
      getDirections: "الحصول على الاتجاهات",
      loading: "جاري تحميل الخريطة...",
      tapToOpen: "انقر لفتح الخريطة",
    },
    ru: {
      openMaps: "Открыть в картах",
      restaurantName: "Kardeşler Kebap",
      address: "Фирузага № 1/A, Джихангир",
      nearTaksim: "5 минут от площади Таксим",
      getDirections: "Маршрут",
      loading: "Загрузка карты...",
      tapToOpen: "Нажмите, чтобы открыть карту",
    },
    fa: {
      openMaps: "باز کردن در نقشه",
      restaurantName: "رستوران کاردشلر کباب",
      address: "محله فیروزآقا پلاک 1/A، جهانگیر",
      nearTaksim: "۵ دقیقه از میدان تکسیم",
      getDirections: "مسیریابی",
      loading: "در حال بارگذاری نقشه...",
      tapToOpen: "برای باز کردن نقشه لمس کنید",
    },
    fr: {
      openMaps: "Ouvrir dans Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "À 5 min de la place Taksim",
      getDirections: "Itinéraire",
      loading: "Chargement de la carte...",
      tapToOpen: "Appuyez pour ouvrir la carte",
    },
    de: {
      openMaps: "In Maps öffnen",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "5 Min. vom Taksim-Platz",
      getDirections: "Wegbeschreibung",
      loading: "Karte wird geladen...",
      tapToOpen: "Tippen zum Öffnen der Karte",
    },
    it: {
      openMaps: "Apri su Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "A 5 min da Piazza Taksim",
      getDirections: "Ottieni indicazioni",
      loading: "Caricamento mappa...",
      tapToOpen: "Tocca per aprire la mappa",
    },
    es: {
      openMaps: "Abrir en Maps",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "A 5 min de la plaza Taksim",
      getDirections: "Cómo llegar",
      loading: "Cargando mapa...",
      tapToOpen: "Toca para abrir el mapa",
    },
    zh: {
      openMaps: "在地图中打开",
      restaurantName: "Kardeşler Kebap",
      address: "Firuzağa No: 1/A, Cihangir",
      nearTaksim: "距离塔克西姆广场5分钟",
      getDirections: "获取路线",
      loading: "地图加载中...",
      tapToOpen: "点击打开地图",
    },
  };

  const currentLabels = labels[currentLang] || labels.en || labels.tr;
  const isRtl = currentLang === "ar" || currentLang === "fa";

  // Static map fallback for when iframe fails
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=41.0315,28.9835&zoom=16&size=600x300&markers=color:red%7C41.0315,28.9835&style=feature:all%7Celement:geometry%7Ccolor:0xEDE3CE`;

  return (
    <div className={`w-full ${className}`}>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        ref={mapRef}
        className={`block w-full ${heightClass} rounded-xl relative bg-[#EDE3CE] overflow-hidden group cursor-pointer border border-[#9C7A3F]/30 hover:border-[#9C7A3F] transition-colors shadow-sm`}
        aria-label="Google Maps Location for Kardeşler Kebap Cihangir"
        style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
      >
        {!isMapVisible ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-dim/60">
            <MapPin className="w-8 h-8 mb-2 animate-bounce text-copper" />
            <span className="text-xs uppercase tracking-widest font-medium">
              {currentLabels.loading}
            </span>
          </div>
        ) : !iframeFailed ? (
          <iframe
            src={primaryEmbedUrl}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kardeşler Cihangir Location"
            allow="geolocation"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="w-full h-full border-0 pointer-events-none"
            style={{ 
              minHeight: '192px',
              WebkitOverflowScrolling: 'touch'
            }}
            onError={handleIframeError}
          />
        ) : (
          /* Fallback: styled static placeholder when iframe fails */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EDE3CE]">
            <MapPin className="w-10 h-10 mb-2 text-[#4E5F4C]" />
            <span className="text-sm font-bold text-[#2B2620]">{currentLabels.restaurantName}</span>
            <span className="text-xs text-[#7A7364] mt-1">{currentLabels.address}</span>
            <span className="text-xs text-[#9C7A3F] mt-2 font-medium">{currentLabels.tapToOpen}</span>
          </div>
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

