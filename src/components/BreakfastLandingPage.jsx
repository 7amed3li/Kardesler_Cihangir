"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, Phone, Award,
  Navigation, ChevronDown,
  Coffee, Utensils, ExternalLink
} from "lucide-react";
import { menuData } from "@/data/menuData";
import { menuTranslations } from "@/i18n/translations";
import breakfastTranslations from "@/i18n/breakfastTranslations";
import { useAppContext } from "@/context/AppContext";
import {
  BREAKFAST_HOURS,
  BREAKFAST_DISH_IDS,
  RESTAURANT_INFO,
  getBreakfastUrl,
} from "@/data/breakfastConfig";
import { trackEvent, captureUTMParams, appendUTMToUrl } from "@/lib/trackingUtils";

// ─── Helper: get breakfast items from menuData (single price source) ───
function getBreakfastItems() {
  const kahvaltiCategory = menuData.find((cat) => cat.id === "kahvalti");
  if (!kahvaltiCategory) return { featured: null, dishes: [] };

  const featured = kahvaltiCategory.items.find(
    (item) => item.id === BREAKFAST_DISH_IDS.featured
  );
  const dishes = BREAKFAST_DISH_IDS.dishes
    .map((id) => kahvaltiCategory.items.find((item) => item.id === id))
    .filter(Boolean);

  return { featured, dishes };
}

// ─── FAQ Accordion Item ───
function FAQItem({ question, answer, isRTL }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-[#9C7A3F]/20 rounded-xl overflow-hidden bg-[#F7F2E7]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-start hover:bg-[#9C7A3F]/5 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-[#2B2620] leading-snug flex-1">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#9C7A3F] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div 
          className="px-5 pb-4 pt-0 text-sm text-[#7A7364] leading-relaxed animate-fadeIn"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function BreakfastLandingPage({ locale = "en" }) {
  const { convertPrice, getCurrencySymbol } = useAppContext();
  const t = breakfastTranslations[locale] || breakfastTranslations.en;
  const mt = menuTranslations[locale] || menuTranslations.en;
  const isRTL = locale === "ar" || locale === "fa";
  const { featured, dishes } = getBreakfastItems();

  // UTM capture + page view event on mount
  useEffect(() => {
    captureUTMParams();
    trackEvent("breakfast_page_view", {
      language: locale,
      page: "turkish-breakfast-cihangir",
    });
  }, [locale]);

  // Track button click helper
  const handleTrack = (eventName, extra = {}) => {
    trackEvent(eventName, { language: locale, page: "turkish-breakfast-cihangir", ...extra });
  };

  return (
    <div className={`min-h-screen bg-[#EDE3CE] text-[#2B2620]`} dir={isRTL ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative pt-10 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Restaurant Name */}
          <p
            className="text-lg sm:text-xl font-bold text-[#9C7A3F] tracking-wide"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {RESTAURANT_INFO.name}
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#9C7A3F]/10 border border-[#9C7A3F]/30 text-[#9C7A3F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Award size={14} className="text-[#9C7A3F] shrink-0" />
            <span>{t.badgeText}</span>
          </div>

          {/* H1 */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2B2620] leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.h1}
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#7A7364] font-medium leading-relaxed">
            {t.heroDescription}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. HERO IMAGE
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#9C7A3F]/20 shadow-md">
          <Image
            src="/images/Serpme-Kahvalti-2-Kisilik.webp"
            alt={t.heroImageAlt}
            width={1024}
            height={677}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. CTA BUTTONS
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-xl mx-auto flex flex-col gap-3">
          {/* Call */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            onClick={() => handleTrack("phone_click", { button_location: "hero_cta" })}
            id="breakfast-call-cta"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-sm transition-colors"
          >
            <Phone size={16} />
            <span>{t.ctaCall}: {RESTAURANT_INFO.phoneDisplay}</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            {/* Get Directions */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("directions_click", { button_location: "hero_cta" })}
              id="breakfast-directions-cta"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#2B2620] hover:bg-[#EDE3CE] font-semibold text-xs transition-colors"
            >
              <Navigation size={15} className="text-[#9C7A3F]" />
              <span>{t.ctaDirections}</span>
            </a>

            {/* View Breakfast Menu */}
            <Link
              href={appendUTMToUrl("/menu")}
              onClick={() => handleTrack("breakfast_menu_click", { button_location: "hero_cta" })}
              id="breakfast-menu-cta"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/30 text-[#2B2620] hover:bg-[#EDE3CE] font-semibold text-xs transition-colors"
            >
              <Utensils size={15} className="text-[#9C7A3F]" />
              <span>{t.ctaViewMenu}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. SERPME KAHVALTI — FEATURED DISH
          ══════════════════════════════════════════════════════ */}
      {featured && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2
                className="text-2xl sm:text-3xl font-black text-[#2B2620]"
                style={{ fontFamily: "var(--font-cairo)" }}
              >
                {t.serpmeTitle}
              </h2>
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#9C7A3F] to-transparent mx-auto mt-3" />
            </div>

            <div className="bg-[#F7F2E7] rounded-2xl overflow-hidden border border-[#9C7A3F]/20 shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={featured.image}
                  alt={mt.items?.[featured.id]?.name || "Serpme Kahvaltı"}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute top-3 start-3 px-3 py-1 rounded-md bg-[#9C7A3F] text-white text-xs font-bold uppercase">
                  {t.forTwoPeople}
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2B2620]">
                    {mt.items?.[featured.id]?.name || "Serpme Kahvaltı (2 Kişilik)"}
                  </h3>
                  <span className="text-xl sm:text-2xl font-black text-[#9C7A3F]">
                    {getCurrencySymbol()}{convertPrice(featured.price)}
                  </span>
                </div>
                <p className="text-sm text-[#7A7364] leading-relaxed">
                  {mt.items?.[featured.id]?.desc || t.serpmeDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          5. BREAKFAST DISHES GRID
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 space-y-2">
            <h2
              className="text-2xl sm:text-3xl font-black text-[#2B2620]"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {t.breakfastDishesTitle}
            </h2>
            <p className="text-sm text-[#7A7364]">{t.breakfastDishesSubtitle}</p>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#9C7A3F] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dishes.map((dish) => {
              const dishT = mt.items?.[dish.id] || {};
              const isVeg = dish.tags?.includes("vegetarian");
              return (
                <div
                  key={dish.id}
                  className="bg-[#F7F2E7] rounded-xl overflow-hidden border border-[#9C7A3F]/15 shadow-sm food-card-hover"
                >
                  {dish.image && (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={dish.image}
                        alt={dishT.name || dish.id}
                        fill
                        sizes="(max-width: 640px) 100vw, 384px"
                        className="object-cover"
                      />
                      {isVeg && (
                        <div className="absolute top-2 end-2 px-2 py-0.5 rounded bg-[#4E5F4C] text-white text-[10px] font-bold uppercase">
                          {t.vegLabel}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#2B2620]">
                        {dishT.name || dish.id}
                      </h3>
                      <span className="text-base font-black text-[#9C7A3F] whitespace-nowrap">
                        {getCurrencySymbol()}{convertPrice(dish.price)}
                      </span>
                    </div>
                    {dishT.desc && (
                      <p className="text-xs text-[#7A7364] leading-relaxed line-clamp-2">
                        {dishT.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. BREAKFAST HOURS
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-xl mx-auto bg-[#F7F2E7] rounded-2xl border border-[#9C7A3F]/20 p-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#9C7A3F]">
            <Coffee size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-[#2B2620]">{t.breakfastHoursTitle}</h2>
          </div>
          <p className="text-base sm:text-lg font-semibold text-[#2B2620]">
            {BREAKFAST_HOURS.display[locale] || BREAKFAST_HOURS.display.en}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-[#7A7364]">
            <Clock size={14} />
            <span>
              {locale === "tr" ? "Ana menü: Her gün 09:00 – 02:00" :
               locale === "ar" ? "القائمة الكاملة: يومياً 09:00 – 02:00" :
               "Full menu: Daily 09:00 AM – 02:00 AM"}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. ADDRESS & DIRECTIONS
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2
            className="text-xl sm:text-2xl font-black text-[#2B2620]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.addressTitle}
          </h2>
          <p className="flex items-center justify-center gap-2 text-sm text-[#7A7364]">
            <MapPin size={16} className="text-[#9C7A3F] shrink-0" />
            <span>{t.fullAddress}</span>
          </p>
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("maps_click", { button_location: "address_section" })}
            id="breakfast-maps-link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-sm transition-colors"
          >
            <Navigation size={16} />
            <span>{t.ctaDirections}</span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. NEARBY LANDMARKS
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto bg-[#F7F2E7] rounded-2xl border border-[#9C7A3F]/20 p-6 sm:p-8 space-y-4">
          <h2
            className="text-xl sm:text-2xl font-black text-[#2B2620] text-center"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.nearbyTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#7A7364] leading-relaxed text-center">
            {t.nearbyText}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. FAQ
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2
            className="text-xl sm:text-2xl font-black text-[#2B2620] text-center"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.faqTitle}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#9C7A3F] to-transparent mx-auto mb-2" />
          <div className="space-y-2.5">
            {t.faq.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. BOTTOM CTA
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-xl mx-auto bg-[#4E5F4C] rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <h2
            className="text-xl sm:text-2xl font-black text-[#EAF0E6]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {t.ctaBookNow}
          </h2>
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("directions_click", { button_location: "bottom_cta" })}
            id="breakfast-bottom-directions"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#9C7A3F] hover:bg-[#7A5F2E] text-white font-bold text-sm transition-colors shadow-md"
          >
            <Navigation size={18} />
            <span>{t.ctaBookNow}</span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. CROSS-LINKS
          ══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <Link
            href={appendUTMToUrl("/menu")}
            className="flex items-center gap-1.5 text-[#9C7A3F] hover:text-[#7A5F2E] font-semibold transition-colors"
          >
            <Utensils size={14} />
            <span>{t.menuLinkText}</span>
            <ExternalLink size={12} />
          </Link>
          <span className="hidden sm:inline text-[#9C7A3F]/40">•</span>
          <Link
            href={appendUTMToUrl("/contact")}
            className="flex items-center gap-1.5 text-[#9C7A3F] hover:text-[#7A5F2E] font-semibold transition-colors"
          >
            <Phone size={14} />
            <span>{t.contactLinkText}</span>
          </Link>
          <span className="hidden sm:inline text-[#9C7A3F]/40">•</span>
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("maps_click", { button_location: "footer_links" })}
            className="flex items-center gap-1.5 text-[#9C7A3F] hover:text-[#7A5F2E] font-semibold transition-colors"
          >
            <MapPin size={14} />
            <span>{t.mapsLinkText}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </section>
    </div>
  );
}
