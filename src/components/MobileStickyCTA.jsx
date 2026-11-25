"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Calendar } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { buildWhatsAppChatUrl } from "@/lib/whatsappOrder";

export default function MobileStickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { t, lang, cartCount, setIsReservationOpen } = useAppContext();

  const isDevProfile = pathname?.includes("tasarim-gelistirme") || pathname?.includes("design-development");
  const isAdmin = pathname?.startsWith("/admin");

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

  if (isDevProfile || isAdmin) return null;
  if (!isVisible) return null;
  // When the list has items, the cart FAB (which opens the drawer with the
  // WhatsApp checkout) is the primary action — hide the bar so the two
  // never overlap or crowd each other.
  if (cartCount > 0) return null;

  const phoneCallUrl = "tel:+902122513696";
  const mapUrl = "https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g";
  const whatsappUrl = buildWhatsAppChatUrl(
    t.whatsappOrder?.greeting ||
      (lang === "ar" ? "مرحبًا، أودّ تقديم طلب." : lang === "tr" ? "Merhaba, sipariş vermek istiyorum." : "Hello, I would like to place an order.")
  );

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
          <span>{t.callNow || (lang === "ar" ? "اتصل الآن" : lang === "tr" ? "Hemen Ara" : "Call Now")}</span>
        </a>

        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "click_reserve", {
                event_category: "engagement",
                event_label: "mobile_sticky_cta",
              });
            }
            setIsReservationOpen(true);
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-[#9C7A3F] text-[#F7F2E7] py-3 px-4 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
        >
          <Calendar size={18} />
          <span>{lang === "ar" ? "احجز طاولة" : lang === "tr" ? "Rezervasyon" : "Reserve"}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "click_whatsapp", {
                event_category: "engagement",
                event_label: "mobile_sticky_cta",
              });
            }
          }}
          aria-label="WhatsApp"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
        >
          <WhatsAppIcon size={18} />
          <span className="hidden min-[400px]:inline">WhatsApp</span>
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
          <span>{t.directions || (lang === "ar" ? "الاتجاهات" : lang === "tr" ? "Yol Tarifi" : "Directions")}</span>
        </a>
      </div>
    </div>
  );
}
