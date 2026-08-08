"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { menuData } from "@/data/menuData";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, Check } from "lucide-react";

// ─── 5 Real Signature Dishes with Authentic Photos & Official Prices ───
const featuredDishes = [
  {
    id: "karisik_kebap_1",
    menuItemId: "karisik_kebap_1",
    categoryId: "kebap",
    price: 1600.0,
    image: "/images/27-Karisik-Kebap_1.webp",
    badge: {
      tr: "KÖZDE PİŞİRİLİR",
      ar: "مشوي على الفحم",
      en: "CHARCOAL GRILLED"
    },
    title: {
      tr: "Karışık Kebap Ziyafeti",
      ar: "وليمة كباب مشكل فاخر",
      en: "Grand Mixed Kebab Feast"
    },
    desc: {
      tr: "350 gr. Tavuk, kuzu şiş, köfte, domatesli kebap, zırh kıyması, közlenmiş biber ve bulgur pilavı ile.",
      ar: "350 غرام من المشويات: دجاج، لحم غنم، كفتة، كباب طماطم، مفروم مشوي مع برغل وسلطة.",
      en: "350g grilled chicken, lamb, meatball, tomato kebab, minced meat with bulgur rice and salad."
    }
  },
  {
    id: "kasarli_sucuklu_pide",
    menuItemId: "kasarli_sucuklu_pide",
    categoryId: "pide",
    price: 430.0,
    image: "/images/kasarli_sucuklu_pide.webp",
    badge: {
      tr: "TAŞ FIRIN",
      ar: "فرن حجري",
      en: "WOOD-FIRED"
    },
    title: {
      tr: "Kaşarlı & Sucuklu Fırın Pide",
      ar: "بيدا بالجبن والسجق التركي",
      en: "Kashar Cheese & Spiced Sucuk Pide"
    },
    desc: {
      tr: "Odun ateşinde nar gibi kızaran çıtır hamur üzerinde eriyen hakiki kaşar peyniri ve baharatlı Türk sucuğu.",
      ar: "عجينة مقرمشة مخبوزة على الحطب ومغطاة بجبن القشقوان الذائب مع شرائح السجق التركي المتبل.",
      en: "Crispy wood-fired dough topped with melting Turkish kashar cheese and spicy garlic beef sucuk."
    }
  },
  {
    id: "lahmacun_item",
    menuItemId: "lahmacun_item",
    categoryId: "lahmacun",
    price: 190.0,
    image: "/images/lahmacun.webp",
    badge: {
      tr: "GELENEKSEL LEZZET",
      ar: "طبق تقليدي",
      en: "TRADITIONAL"
    },
    title: {
      tr: "Çıtır Fırın Lahmacun",
      ar: "لحم بعجين مقرمش على الحطب",
      en: "Crispy Stone-Baked Lahmacun"
    },
    desc: {
      tr: "İncecik açılmış çıtır hamur, zırh çekimi kıyma, özel baharatlar, taze maydanoz, sumaklı soğan ve limon eşliğinde.",
      ar: "عجينة رقيقة جداً ومقرمشة بلحم مفروم متبل، تقدم مع البقدونس الطازج وبصل السماق والليمون.",
      en: "Ultra-thin crispy crust topped with seasoned minced meat, served with fresh parsley, sumac onions, and lemon."
    }
  },
  {
    id: "serpme_kahvalti",
    menuItemId: "serpme_kahvalti",
    categoryId: "kahvalti",
    price: 900.0,
    image: "/images/kahvalti.webp",
    badge: {
      tr: "ZENGİN SERPME",
      ar: "فطور قروي مشكل",
      en: "VILLAGE SPREAD"
    },
    title: {
      tr: "Serpme Kahvaltı (2 Kişilik)",
      ar: "فطور تركي متكامل (شخصين)",
      en: "Authentic Turkish Breakfast (2 Person)"
    },
    desc: {
      tr: "Zengin kahvaltı tabağı: Yöresel peynirler, bal-kaymak, reçeller, zeytinler, sahanda yumurta ve sıcacık ekmekler.",
      ar: "تشكيلة فطور غنية ومتنوعة: أجبان بلدية، عسل وقشطة، مربيات، زيتون وبيض مقلي.",
      en: "Rich Turkish breakfast spread for 2: artisanal cheeses, honeycomb & clotted cream, jams, olives, and eggs."
    }
  },
  {
    id: "kunefe",
    menuItemId: "kunefe",
    categoryId: "tatli",
    price: 250.0,
    image: "/images/kunefe.webp",
    badge: {
      tr: "ŞEFİN İMZASI",
      ar: "توصية الشيف",
      en: "CHEF'S SIGNATURE"
    },
    title: {
      tr: "Hatay Usulü Tereyağlı Künefe",
      ar: "كنافة هاتاي بالجبنة والفستق",
      en: "Hatay Crispy Cheese Künefe"
    },
    desc: {
      tr: "Közde altın sarısı kızartılmış çıtır kadayıf, uzayan özel Hatay peyniri, hakiki tereyağı ve bol Antep fıstığı ile.",
      ar: "كنافة مقرمشة على الجمر محشوة بجبنة هاتاي الذائبة ومغطاة بالفستق العنتابي الفاخر والقطر الساخن.",
      en: "Golden crispy shredded pastry layered with stretchy Hatay cheese, pure butter, warm syrup and crushed Gaziantep pistachios."
    }
  }
];

/**
 * Appetite-Inducing Featured Specials Showcase
 */
function FeaturedDishesShowcase({ onExplore, onSelectCategory }) {
  const { lang, convertPrice, getCurrencySymbol, addToCart, removeFromCart, getItemQuantity } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeLang = lang || "tr";
  const currentDish = featuredDishes[activeIndex];
  const totalItemsCount = menuData.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);

  // Safe Price Formatter
  const formatItemPrice = (priceVal) => {
    const symbol = getCurrencySymbol ? getCurrencySymbol() : "₺";
    const formatted = convertPrice ? convertPrice(priceVal) : priceVal;
    return `${symbol}${formatted}`;
  };

  // Auto-play timer (pauses on interaction)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredDishes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % featuredDishes.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
  };

  // Find exact menu item object to support 1-tap cart actions
  const matchedMenuItem = menuData
    .flatMap((c) => c.items || [])
    .find((it) => it.id === currentDish.menuItemId) || {
    id: currentDish.menuItemId,
    price: currentDish.price,
    image: currentDish.image,
  };

  const qty = getItemQuantity(matchedMenuItem.id);

  // Get 3 circular items for bottom orbit
  const len = featuredDishes.length;
  const prevDishIndex = (activeIndex - 1 + len) % len;
  const nextDishIndex = (activeIndex + 1) % len;

  return (
    <section 
      className="relative w-full overflow-hidden bg-gradient-to-b from-ink via-ink-2 to-ink border-b border-teal-dim/15"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background Subtle Warmth ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-copper/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-5 pb-6">
        
        {/* ── Brand Header ── */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-gold" style={{ fontFamily: "var(--font-inter)" }}>
              Kardeşler Cihangir
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h1 
            className="text-2xl sm:text-3xl font-black text-cream tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {activeLang === "ar" ? "قائمة المأكولات والمشويات" : activeLang === "en" ? "Digital Dining Menu" : "Lezzet Menüsü"}
          </h1>
          <p className="text-cream-dim/60 text-xs mt-0.5">
            {totalItemsCount} {activeLang === "ar" ? "صنف محضر على الفحم والحطب" : activeLang === "en" ? "Handcrafted wood-fired dishes" : "Közde ve taş fırında pişen lezzet"}
          </p>
        </div>

        {/* ── Hero Dish Spotlight Card ── */}
        <div className="relative rounded-2xl overflow-hidden border border-gold/25 bg-ink-2/90 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
          
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Dish High-Res Image with Badge & Fixed LTR Arrow Controls */}
            <div className="relative md:col-span-7 h-[230px] sm:h-[290px] w-full overflow-hidden bg-ink">
              <Image
                key={currentDish.id}
                src={currentDish.image}
                alt={currentDish.title[activeLang] || currentDish.title.tr}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 600px"
                className="transition-transform duration-700 hover:scale-105"
              />
              
              {/* Image Gradient Edge */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink-2" />

              {/* Quality Badge */}
              <div className="absolute top-3 start-3">
                <span className="px-3 py-1 rounded-full bg-ink/85 border border-gold/40 backdrop-blur-md text-[10px] sm:text-xs font-bold text-gold tracking-widest uppercase shadow-md">
                  {currentDish.badge[activeLang] || currentDish.badge.tr}
                </span>
              </div>

              {/* Price Tag Overlay on Mobile */}
              <div className="absolute bottom-3 end-3 md:hidden">
                <span className="px-3 py-1 rounded-lg bg-ink/90 border border-copper/50 backdrop-blur-md text-sm font-black text-copper tracking-wide shadow-lg">
                  {formatItemPrice(currentDish.price)}
                </span>
              </div>

              {/* Carousel Arrows on Image - Locked LTR to avoid RTL inversion */}
              <div dir="ltr" className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous dish"
                  className="pointer-events-auto w-8 h-8 rounded-full bg-ink/80 hover:bg-copper text-cream border border-gold/30 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next dish"
                  className="pointer-events-auto w-8 h-8 rounded-full bg-ink/80 hover:bg-copper text-cream border border-gold/30 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Dish Story, Details & Action */}
            <div className="md:col-span-5 p-4 sm:p-6 flex flex-col justify-between text-start">
              <div>
                
                {/* Desktop Price */}
                <div className="hidden md:flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-gold uppercase tracking-wider">
                    {activeLang === "ar" ? "مختارات الشيف" : activeLang === "en" ? "Chef's Special" : "Şefin Seçimi"}
                  </span>
                  <span className="text-lg font-black text-copper tracking-wide">
                    {formatItemPrice(currentDish.price)}
                  </span>
                </div>

                {/* Dish Title */}
                <h2 
                  className="text-lg sm:text-xl font-bold text-cream mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-cairo)" }}
                >
                  {currentDish.title[activeLang] || currentDish.title.tr}
                </h2>

                {/* Dish Appetizing Description */}
                <p className="text-cream-dim/75 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {currentDish.desc[activeLang] || currentDish.desc.tr}
                </p>
              </div>

              {/* Action Buttons: Add to Cart + Jump to Category */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-teal-dim/15">
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(matchedMenuItem)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-copper to-brick hover:brightness-110 text-cream text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_4px_15px_rgba(217,116,60,0.35)] active:scale-95"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>{activeLang === "ar" ? "أضف للطلب" : activeLang === "en" ? "Add to Order" : "Sepete Ekle"}</span>
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-ink border border-copper/50 rounded-xl px-3 py-1.5 shadow-md">
                    <span className="text-xs font-bold text-gold flex items-center gap-1">
                      <Check size={14} className="text-teal" />
                      {activeLang === "ar" ? "تمت الإضافة" : activeLang === "en" ? "In Order" : "Eklendi"} ({qty})
                    </span>
                    <div className="flex items-center gap-2" dir="ltr">
                      <button
                        onClick={() => removeFromCart(matchedMenuItem.id)}
                        className="w-7 h-7 rounded-lg bg-ink-2 hover:bg-brick/30 text-cream flex items-center justify-center transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-cream w-4 text-center">{qty}</span>
                      <button
                        onClick={() => addToCart(matchedMenuItem)}
                        className="w-7 h-7 rounded-lg bg-copper hover:bg-copper/80 text-cream flex items-center justify-center transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onSelectCategory(currentDish.categoryId)}
                  className="px-3.5 py-2.5 rounded-xl border border-gold/30 hover:border-gold hover:bg-gold/10 text-cream-dim hover:text-cream text-xs font-semibold tracking-wider transition-all duration-200"
                >
                  {activeLang === "ar" ? "القسم" : activeLang === "en" ? "Category" : "Kategori"}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* ── 3 Circular Dishes Orbit at Bottom (Fixed LTR arrows) ── */}
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3 sm:gap-4 py-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Featured Dish"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ink/80 hover:bg-copper border border-gold/30 text-cream flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-90"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {[prevDishIndex, activeIndex, nextDishIndex].map((dishIdx, i) => {
              const dish = featuredDishes[dishIdx];
              const isCenter = i === 1;
              return (
                <button
                  key={dish.id + i}
                  onClick={() => {
                    setIsPaused(true);
                    setActiveIndex(dishIdx);
                  }}
                  className={`group relative rounded-full transition-all duration-400 flex items-center justify-center ${
                    isCenter
                      ? "w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] scale-105"
                      : "w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`absolute -inset-1 rounded-full transition-all duration-300 ${
                      isCenter
                        ? "border-2 border-gold shadow-[0_0_15px_rgba(212,162,76,0.5)]"
                        : "border border-gold/30 group-hover:border-gold/60"
                    }`}
                  />
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-ink bg-ink-2">
                    <Image
                      src={dish.image}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Featured Dish"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ink/80 hover:bg-copper border border-gold/30 text-cream flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-90"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}

/**
 * Sticky Category Navigation Bar
 */
function MenuCategoryBar({ categories, activeCategory, setActiveCategory }) {
  const { menuT } = useAppContext();
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
    <div className="relative w-full bg-ink-2/95 backdrop-blur-xl border-b border-teal-dim/15">
      {canScrollLeft && (
        <button 
          onClick={() => scroll(-1)} 
          aria-label="Scroll left"
          className="absolute start-0 top-0 bottom-0 z-10 w-9 flex items-center justify-center bg-gradient-to-r from-ink-2 via-ink-2/90 to-transparent"
        >
          <ChevronLeft size={16} className="text-cream-dim" />
        </button>
      )}
      {canScrollRight && (
        <button 
          onClick={() => scroll(1)} 
          aria-label="Scroll right"
          className="absolute end-0 top-0 bottom-0 z-10 w-9 flex items-center justify-center bg-gradient-to-l from-ink-2 via-ink-2/90 to-transparent"
        >
          <ChevronRight size={16} className="text-cream-dim" />
        </button>
      )}

      <div 
        ref={scrollRef}
        className="flex items-center gap-2 px-3.5 py-2.5 overflow-x-auto no-scrollbar"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative shrink-0 px-4 py-2 rounded-full border transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-r from-copper/25 to-gold/20 border-copper text-cream shadow-[0_0_15px_rgba(217,116,60,0.25)] scale-105" 
                  : "bg-ink/50 border-teal-dim/20 text-cream-dim/65 hover:border-teal-dim/40 hover:text-cream-dim"
              }`}
            >
              <span className="relative z-10 block text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                {menuT?.categories?.[cat.id] || cat.category.en}
              </span>
            </button>
          );
        })}
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
    <div className="pb-12 bg-transparent min-h-screen text-cream font-sans selection:bg-copper selection:text-cream">
      
      {/* ═══════════════════════════════════════════
          APPETITE-INDUCING SIGNATURE SPECIALS HERO
          ═══════════════════════════════════════════ */}
      <FeaturedDishesShowcase 
        onExplore={scrollToMenu} 
        onSelectCategory={handleCategorySelect} 
      />

      {/* ═══════════════════════════════════════════
          STICKY CATEGORY TABS & SMART FILTERS
          ═══════════════════════════════════════════ */}
      <div ref={menuSectionRef} className="sticky top-[56px] z-30 shadow-lg">
        <MenuCategoryBar 
          categories={menuData} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {/* Smart Filters */}
        <div className="bg-ink/95 backdrop-blur-md border-b border-teal-dim/10 py-1">
          <SmartFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MENU ITEMS GRID
          ═══════════════════════════════════════════ */}
      <section className="px-3 sm:px-6 py-6 min-h-[60vh]">
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
                  <p className="text-cream-dim font-light tracking-wide">
                    {t?.noResults || "No dishes match the selected filter."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
