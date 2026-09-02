"use client";

import React, { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, lang } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const phoneCallUrl = "tel:+902122513696";
  const mapUrl = "https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F7F2E7] border-t border-[#9C7A3F]/30 shadow-[0_-4px_20px_rgba(43,38,32,0.1)] pb-safe transition-transform duration-300 transform translate-y-0">
      <div className="flex items-center justify-between p-3 gap-3">
        <a
          href={phoneCallUrl}
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "click_call", {
                event_category: "engagement",
                event_label: "mobile_sticky_cta",
              });
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-[#4E5F4C] text-[#EAF0E6] py-3 px-4 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
        >
          <Phone size={18} />
          <span>{lang === "ar" ? "اتصل الآن" : lang === "tr" ? "Hemen Ara" : "Call Now"}</span>
        </a>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "click_directions", {
                event_category: "engagement",
                event_label: "mobile_sticky_cta",
              });
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-[#9C7A3F]/50 text-[#2B2620] py-3 px-4 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform"
        >
          <MapPin size={18} className="text-[#9C7A3F]" />
          <span>{lang === "ar" ? "الاتجاهات" : lang === "tr" ? "Yol Tarifi" : "Directions"}</span>
        </a>
      </div>
    </div>
  );
}
