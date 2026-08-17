"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { menuData } from "@/data/menuData";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import DishModal from "@/components/DishModal";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";
const ReviewSection = dynamic(() => import("@/components/ReviewSection"), { ssr: true });
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, Check, UtensilsCrossed, Coffee } from "lucide-react";
import { OttomanSeal, OttomanStar, KebabSkewer } from "@/components/BrandIcons";
import Link from "next/link";
import DeepMenuSchema from "@/components/DeepMenuSchema";

// ─── Breakfast Cross-Link Banner (shown on /menu) ───
function BreakfastBanner() {
  const { lang } = useAppContext();
  const breakfastHref = {
    tr: "/tr/turkish-breakfast-cihangir", ar: "/ar/turkish-breakfast-cihangir",
    ru: "/ru/turkish-breakfast-cihangir", fa: "/fa/turkish-breakfast-cihangir",
    fr: "/fr/turkish-breakfast-cihangir", de: "/de/turkish-breakfast-cihangir",
    it: "/it/turkish-breakfast-cihangir", es: "/es/turkish-breakfast-cihangir",
    zh: "/zh/turkish-breakfast-cihangir", en: "/turkish-breakfast-cihangir",
  }[lang] || "/turkish-breakfast-cihangir";

  const label = lang === "ar" ? "استكشف الإفطار التركي ←" :
    lang === "tr" ? "Türk Kahvaltısını Keşfet →" :
    lang === "ru" ? "Турецкий завтрак →" :
    lang === "fa" ? "صبحانه ترکی ←" :
    lang === "fr" ? "Découvrir le petit-déjeuner turc →" :
    lang === "de" ? "Türkisches Frühstück entdecken →" :
    lang === "it" ? "Scopri la colazione turca →" :
    lang === "es" ? "Descubre el desayuno turco →" :
    lang === "zh" ? "探索土耳其早餐 →" :
    "Explore Our Turkish Breakfast →";

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3">
      <Link
        href={breakfastHref}
        className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/25 hover:border-[#9C7A3F]/50 hover:bg-[#9C7A3F]/5 transition-all group"
      >
        <Coffee size={16} className="text-[#9C7A3F]" />
        <span className="text-sm font-semibold text-[#9C7A3F] group-hover:text-[#7A5F2E] transition-colors">
          {label}
        </span>
      </Link>
    </div>
  );
}

// ─── Real Signature Dishes with Authentic Photos & Official Prices ───
const featuredDishes = [
  {
    id: "karisik_kebap_2",
    menuItemId: "karisik_kebap_2",
    categoryId: "kebap",
    price: 2400.0,
    image: "/images/28-Karisik-Kebap_2.webp",
    badgeKey: "signature",
    defaultBadge: "ŞEFİN SEÇİMİ"
  },
  {
    id: "vali_kebabi",
    menuItemId: "vali_kebabi",
    categoryId: "kebap",
    price: 870.0,
    image: "/images/17-Vali-Kebabi.webp",
    badgeKey: "trending",
    defaultBadge: "EN ÇOK SATAN"
  },
  {
    id: "beyti_kebap",
    menuItemId: "beyti_kebap",
    categoryId: "kebap",
    price: 730.0,
    image: "/images/beyti-1024x677.webp",
    badgeKey: "trending",
    defaultBadge: "EN ÇOK SATAN"
  },
  {
    id: "mardin_kebap",
    menuItemId: "mardin_kebap",
    categoryId: "kebap",
    price: 750.0,
    image: "/images/12-Mardin-Kebap.webp",
    badgeKey: "trending",
    defaultBadge: "EN ÇOK SATAN"
  },
  {
    id: "kasarli_sucuklu_pide",
    menuItemId: "kasarli_sucuklu_pide",
    categoryId: "pide",
    price: 430.0,
    image: "/images/kasarli_sucuklu_pide.webp",
    badgeKey: "trending",
    defaultBadge: "TAŞ FIRIN"
  },
  {
    id: "lahmacun_item",
    menuItemId: "lahmacun_item",
    categoryId: "lahmacun",
    price: 190.0,
    image: "/images/lahmacun.webp",
    badgeKey: "signature",
    defaultBadge: "GELENEKSEL LEZZET"
  },
  {
    id: "serpme_kahvalti",
    menuItemId: "serpme_kahvalti",
    categoryId: "kahvalti",
    price: 900.0,
    image: "/images/Serpme-Kahvalti-2-Kisilik.webp",
    badgeKey: "signature",
    defaultBadge: "ZENGİN SERPME"
  },
  {
    id: "kunefe",
    menuItemId: "kunefe",
    categoryId: "tatli",
    price: 250.0,
    image: "/images/kunefe.webp",
    badgeKey: "signature",
    defaultBadge: "ŞEFİN İMZASI"
  },
  {
    id: "iskender_kebap",
    menuItemId: "iskender_kebap",
    categoryId: "kebap",
    price: 625.0,
    image: "/images/18-Iskender-Kebap.webp",
    badgeKey: "trending",
    defaultBadge: "EN ÇOK SATAN"
  },
  {
    id: "adana_urfa",
    menuItemId: "adana_urfa",
    categoryId: "kebap",
    price: 625.0,
    image: "/images/adana.webp",
    badgeKey: "trending",
    defaultBadge: "EN ÇOK SATAN"
  }
];

/**
 * Appetite-Inducing Featured Specials Showcase (Portrait Cards Style)
 */
function FeaturedDishesShowcase({ onExplore, onSelectCategory }) {
  const { lang, menuT, t } = useAppContext();
  const activeLang = lang || "tr";
  const [selectedDish, setSelectedDish] = useState(null);

  const getBestSellersTitle = () => {
    if (activeLang === "ar") return "الأكثر مبيعاً";
    if (activeLang === "tr") return "En Çok Satanlar";
    if (activeLang === "fa") return "پرفروش‌ترین‌ها";
    if (activeLang === "ru") return "Хиты продаж";
    if (activeLang === "de") return "Bestseller";
    if (activeLang === "it") return "I Più Venduti";
    if (activeLang === "es") return "Los Más Vendidos";
    if (activeLang === "zh") return "热销推荐";
    if (activeLang === "fr") return "Meilleures Ventes";
    return "Best Sellers";
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F2E7] pt-2.5 pb-1">
      <div className="max-w-5xl mx-auto px-2.5 sm:px-5">
        <div className="bg-[#FAF7F0] border-2 border-[#9C7A3F]/35 rounded-xl p-3 sm:p-4 shadow-xs relative">
          <h2 className="text-base sm:text-lg font-black text-[#2B2620] mb-2.5 flex items-center gap-1.5" style={{ fontFamily: "var(--font-cairo)" }}>
            <KebabSkewer size={16} className="text-[#9C7A3F]" />
            <span>{getBestSellersTitle()}</span>
          </h2>
          <div className="flex overflow-x-auto gap-2.5 sm:gap-4 no-scrollbar pb-1 px-0.5 snap-x snap-mandatory">
            {featuredDishes.map((dish) => {
              const translatedName = menuT?.items?.[dish.menuItemId]?.name || dish.defaultTitle || "Special Dish";
              const translatedDesc = menuT?.items?.[dish.menuItemId]?.desc || "";
              const translatedBadge = t?.[dish.badgeKey] || dish.defaultBadge;

              return (
                <div 
                  key={dish.id} 
                  className="relative flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group w-[78px] sm:w-[96px] snap-center" 
                  onClick={() => setSelectedDish({ ...dish, translatedName, translatedDesc })}
                >
                  {/* Flat Circular Wrapper */}
                  <div className="relative w-[68px] h-[68px] sm:w-[84px] sm:h-[84px] rounded-full p-[2px] bg-[#9C7A3F]/30 group-hover:bg-[#9C7A3F] transition-colors shadow-xs">
                     {/* Inner Circle (The Image) */}
                     <div className="relative w-full h-full rounded-full overflow-hidden bg-[#EDE3CE] border border-[#F7F2E7] p-0.5">
                       <Image 
                          src={dish.image} 
                          alt={translatedName} 
                          fill 
                          style={{ objectFit: "contain" }} 
                          sizes="(max-width: 640px) 68px, 84px"
                          className="transition-transform duration-500 group-hover:scale-105 p-0.5"
                       />
                     </div>
                     
                     {/* Badge Overlapping Bottom Center */}
                     <div className="absolute -bottom-1.5 inset-x-0 flex justify-center z-10">
                       <span className="px-1.5 py-0.5 bg-[#4E5F4C] text-[#EAF0E6] rounded text-[8px] sm:text-[9px] font-bold whitespace-nowrap shadow-xs uppercase tracking-tight scale-90 max-w-full overflow-hidden text-ellipsis">
                         {translatedBadge}
                       </span>
                     </div>
                  </div>

                  {/* Title */}
                  <span 
                     className="text-[10px] sm:text-[11px] text-center font-bold text-[#2B2620] leading-tight mt-0.5 group-hover:text-[#9C7A3F] transition-colors line-clamp-2 px-0.5"
                     style={{ fontFamily: "var(--font-cairo)" }}
                  >
                     {translatedName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Modal for Featured Dish */}
      {selectedDish && (
         <DishModal 
           isOpen={true} 
           setIsOpen={() => setSelectedDish(null)} 
           item={menuData.flatMap(c => c.items || []).find(i => i.id === selectedDish.menuItemId) || { id: selectedDish.menuItemId, price: selectedDish.price, image: selectedDish.image }}
           customName={selectedDish.translatedName}
           customDesc={selectedDish.translatedDesc}
           customImage={selectedDish.image}
         />
      )}
    </section>
  );
}

/**
 * Sticky Category Navigation Bar (Flat Style)
 */
function MenuCategoryBar({ categories, activeCategory, setActiveCategory }) {
  const { menuT, t, lang } = useAppContext();
  const activeLang = lang || "tr";
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  // Center active category tab when selected
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeBtn) {
      const containerRect = el.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const offset = btnRect.left - containerRect.left - (containerRect.width / 2) + (btnRect.width / 2);
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [activeCategory]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-[#F7F2E7] pt-1 pb-2">
      {/* Ornamental Divider Line */}
      <div className="max-w-5xl mx-auto px-4 my-1 flex items-center justify-center gap-2">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#9C7A3F]/30 to-transparent flex-grow max-w-[120px]" />
        <OttomanStar size={10} className="text-[#9C7A3F]/40 shrink-0" />
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#9C7A3F]/30 to-transparent flex-grow max-w-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-2.5 sm:px-5">
        <div className="bg-[#FAF7F0] border-2 border-[#9C7A3F]/35 rounded-xl p-2.5 sm:p-3.5 shadow-xs relative">
          <div className="px-0.5 mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-[#7A7364] tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
               {t?.exploreMenu || "Menüyü İncele"}
            </h3>
          </div>
          
          <div className="relative">
            {canScrollLeft && (
              <button 
                onClick={() => scroll(-1)} 
                aria-label="Scroll left"
                className="absolute start-0 top-0 bottom-0 z-10 w-7 sm:w-9 flex items-center justify-center bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent"
              >
                <ChevronLeft size={18} className="text-[#2B2620]" />
              </button>
            )}
            {canScrollRight && (
              <button 
                onClick={() => scroll(1)} 
                aria-label="Scroll right"
                className="absolute end-0 top-0 bottom-0 z-10 w-7 sm:w-9 flex items-center justify-center bg-gradient-to-l from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent"
              >
                <ChevronRight size={18} className="text-[#2B2620]" />
              </button>
            )}

            <div 
              ref={scrollRef}
              className="flex items-start gap-2 sm:gap-3 px-0.5 pe-8 overflow-x-auto no-scrollbar pb-0.5 pt-0.5"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const firstItemImage = cat.items && cat.items.length > 0 && cat.items[0].image ? cat.items[0].image : "";
                
                return (
                  <button
                    key={cat.id}
                    data-cat={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative shrink-0 flex flex-col items-center gap-1 w-[56px] sm:w-[68px] group transition-all duration-200 ${
                      isActive ? "scale-105" : "hover:scale-105"
                    }`}
                  >
                    {/* Image Thumbnail */}
                    <div className={`relative w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 ${
                      isActive 
                        ? "border-2 border-[#4E5F4C] shadow-xs" 
                        : "border border-[#9C7A3F]/30 group-hover:border-[#9C7A3F]"
                    }`}>
                      <div className="absolute inset-0 bg-[#EDE3CE]" />
                      {firstItemImage ? (
                        <Image
                          src={firstItemImage}
                          alt=""
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="56px"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#9C7A3F]">
                          {cat.id.includes("icecek") || cat.id.includes("kahve") ? (
                            <Coffee size={20} strokeWidth={1.5} />
                          ) : (
                            <UtensilsCrossed size={20} strokeWidth={1.5} />
                          )}
                        </div>
                      )}
                    </div>

                    <span className={`text-[9.5px] sm:text-[10.5px] font-bold text-center leading-tight px-0.5 transition-colors line-clamp-2 ${
                      isActive ? "text-[#2B2620]" : "text-[#7A7364] group-hover:text-[#2B2620]"
                    }`}>
                      {menuT?.categories?.[cat.id] || cat.category.en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [activeFilter, setActiveFilter] = useState(null);
  const { t } = useAppContext();
  const menuSectionRef = useRef(null);

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    scrollToMenu();
  };

  return (
    <div className="pb-12 bg-[#EDE3CE] min-h-screen text-[#2B2620] font-sans">
      <DeepMenuSchema locale="en" />
      
      {/* ═══════════════════════════════════════════
          APPETITE-INDUCING SIGNATURE SPECIALS HERO
          ═══════════════════════════════════════════ */}
      <FeaturedDishesShowcase 
        onExplore={scrollToMenu} 
        onSelectCategory={handleCategorySelect} 
      />

      {/* ── Breakfast Cross-Link Banner ── */}
      <BreakfastBanner />

      {/* ═══════════════════════════════════════════
          STICKY CATEGORY TABS & SMART FILTERS
          ═══════════════════════════════════════════ */}
      <div ref={menuSectionRef} className="sticky top-[56px] z-30 shadow-sm">
        <MenuCategoryBar 
          categories={menuData} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {/* Smart Filters */}
        <div className="bg-[#F7F2E7] border-b border-[#9C7A3F]/20 py-1">
          <SmartFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MENU ITEMS GRID
          ═══════════════════════════════════════════ */}
      <section className="px-3 sm:px-6 py-6 min-h-[60vh] bg-[#EDE3CE]">
        {menuData.map((category) => {
          if (activeCategory !== category.id) return null;

          const filteredItems = category.items.filter(item => {
            if (!activeFilter) return true;
            return item.tags?.includes(activeFilter);
          });

          return (
            <div 
              key={category.id} 
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 animate-fadeIn"
            >
              {filteredItems.filter(item => item && item.id).length > 0 ? (
                filteredItems.filter(item => item && item.id).map((item, index) => (
                  <FoodCard key={item.id} item={item} index={index} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-[#7A7364] font-medium tracking-wide">
                    {t?.noResults || "No dishes match the selected filter."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Verified Guest Reviews Section */}
      <ReviewSection />
    </div>
  );
}
