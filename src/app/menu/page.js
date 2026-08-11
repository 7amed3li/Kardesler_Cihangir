"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { menuData } from "@/data/menuData";
import SmartFilters from "@/components/SmartFilters";
import FoodCard from "@/components/FoodCard";
import DishModal from "@/components/DishModal";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, Check, UtensilsCrossed, Coffee } from "lucide-react";

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
  },
  {
    id: "iskender_kebap",
    menuItemId: "iskender_kebap",
    categoryId: "kebap",
    price: 360.0,
    image: "/images/18-Iskender-Kebap.webp",
    badge: { tr: "🔥 EN ÇOK SATAN", ar: "🔥 الأكثر مبيعاً", en: "🔥 BEST SELLER" },
    title: { tr: "İskender Kebap", ar: "إسكندر كباب الأصلي", en: "Traditional Iskender Kebab" },
    desc: {
      tr: "Özel pide üzerinde döner, sıcak tereyağı ve taze yoğurt.",
      ar: "شرائح اللحم على قطع الخبز مع زبدة ساخنة وصلصة الطماطم والزبادي.",
      en: "Thinly cut grilled meat on pita with hot tomato sauce over pieces of pita bread and generously slathered with melted sheep butter and yogurt."
    }
  },
  {
    id: "adana_urfa",
    menuItemId: "adana_urfa",
    categoryId: "kebap",
    price: 300.0,
    image: "/images/adana.webp",
    badge: { tr: "⭐ MÜŞTERİ FAVORİSİ", ar: "⭐ المفضل للزبائن", en: "⭐ CUSTOMER FAVORITE" },
    title: { tr: "Adana / Urfa Kebap", ar: "أضنة / أورفا كباب", en: "Adana / Urfa Kebab" },
    desc: {
      tr: "Zırh kıymasından efsane Adana kebap.",
      ar: "كباب أضنة الحار أو أورفا العادي المفروم يدوياً.",
      en: "Hand-minced meat kebab mounted on a wide iron skewer and grilled on an open mangal filled with burning charcoal."
    }
  }
];

/**
 * Appetite-Inducing Featured Specials Showcase (Portrait Cards Style)
 */
function FeaturedDishesShowcase({ onExplore, onSelectCategory }) {
  const { lang, menuData: contextMenuData } = useAppContext();
  const activeLang = lang || "tr";
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section className="relative w-full overflow-hidden bg-ink pt-6 pb-4 border-b border-teal-dim/15">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-black text-cream mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-cairo)" }}>
          <span className="text-gold text-2xl">🌟</span> 
          {activeLang === "ar" ? "الأكثر مبيعاً" : activeLang === "en" ? "Best Sellers" : "Çok Satanlar"}
        </h2>
        <div className="flex overflow-x-auto gap-4 sm:gap-6 no-scrollbar pb-3 px-1 snap-x snap-mandatory">
          {featuredDishes.map((dish) => (
             <div 
                key={dish.id} 
                className="relative flex flex-col items-center gap-3 shrink-0 cursor-pointer group w-[100px] sm:w-[130px] snap-center" 
                onClick={() => setSelectedDish(dish)}
             >
                {/* Premium Circular Wrapper with Gradient Ring */}
                <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-full p-[3px] bg-gradient-to-tr from-gold via-copper to-gold/50 group-hover:from-gold group-hover:via-gold group-hover:to-copper group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(217,116,60,0.3)]">
                   {/* Inner Circle (The Image) */}
                   <div className="relative w-full h-full rounded-full overflow-hidden bg-ink border-2 border-ink">
                     <Image 
                        src={dish.image} 
                        alt={dish.title[activeLang] || dish.title.en} 
                        fill 
                        style={{objectFit:"cover"}} 
                        sizes="(max-width: 640px) 90px, 120px"
                        className="transition-transform duration-700 group-hover:scale-110"
                     />
                   </div>
                   
                   {/* Badge Overlapping Bottom Center */}
                   <div className="absolute -bottom-2 inset-x-0 flex justify-center z-10">
                     <span className="px-2 py-0.5 bg-ink text-gold border border-gold/50 rounded-full text-[9px] sm:text-[10px] font-bold whitespace-nowrap shadow-lg">
                       {dish.badge[activeLang] || dish.badge.tr}
                     </span>
                   </div>
                </div>

                {/* Title */}
                <span 
                   className="text-[11px] sm:text-xs text-center font-bold text-cream leading-tight mt-1 group-hover:text-gold transition-colors line-clamp-2 px-1"
                   style={{ fontFamily: "var(--font-cairo)" }}
                >
                   {dish.title[activeLang] || dish.title.en}
                </span>
             </div>
          ))}
        </div>
      </div>
      
      {/* Modal for Featured Dish */}
      {selectedDish && (
         <DishModal 
           isOpen={true} 
           setIsOpen={() => setSelectedDish(null)} 
           item={menuData.flatMap(c => c.items || []).find(i => i.id === selectedDish.menuItemId) || { id: selectedDish.menuItemId, price: selectedDish.price, image: selectedDish.image }}
           customName={selectedDish.title[activeLang] || selectedDish.title.tr}
           customDesc={selectedDish.desc[activeLang] || selectedDish.desc.tr}
           customImage={selectedDish.image}
         />
      )}
    </section>
  );
}

/**
 * Sticky Category Navigation Bar (Premium Thumbnail Style)
 */
function MenuCategoryBar({ categories, activeCategory, setActiveCategory }) {
  const { menuT, lang } = useAppContext();
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
    scrollRef.current?.scrollBy({ left: dir * 180, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-ink/95 backdrop-blur-xl border-b border-teal-dim/15 pt-3 pb-2">
      <div className="px-4 mb-2 max-w-5xl mx-auto">
        <h3 className="text-sm font-bold text-cream-dim tracking-wide" style={{ fontFamily: "var(--font-cairo)" }}>
           {activeLang === "ar" ? "تصفح القائمة" : activeLang === "en" ? "Browse Menu" : "Menüyü İncele"}
        </h3>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {canScrollLeft && (
          <button 
            onClick={() => scroll(-1)} 
            aria-label="Scroll left"
            className="absolute start-0 top-0 bottom-0 z-10 w-8 sm:w-12 flex items-center justify-center bg-gradient-to-r from-ink via-ink/90 to-transparent"
          >
            <ChevronLeft size={20} className="text-cream" />
          </button>
        )}
        {canScrollRight && (
          <button 
            onClick={() => scroll(1)} 
            aria-label="Scroll right"
            className="absolute end-0 top-0 bottom-0 z-10 w-8 sm:w-12 flex items-center justify-center bg-gradient-to-l from-ink via-ink/90 to-transparent"
          >
            <ChevronRight size={20} className="text-cream" />
          </button>
        )}

        <div 
          ref={scrollRef}
          className="flex items-start gap-3 px-4 overflow-x-auto no-scrollbar pb-1 pt-1"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const firstItemImage = cat.items && cat.items.length > 0 && cat.items[0].image ? cat.items[0].image : "";
            
            return (
              <button
                key={cat.id}
                data-cat={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative shrink-0 flex flex-col items-center gap-1.5 w-[70px] sm:w-[84px] group transition-all duration-300 ${
                  isActive ? "scale-105" : "hover:scale-105"
                }`}
              >
                {/* Premium Image Thumbnail */}
                <div className={`relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? "border-[2px] border-copper shadow-[0_0_15px_rgba(217,116,60,0.35)]" 
                    : "border-[2px] border-ink-2 shadow-md group-hover:border-copper/50"
                }`}>
                  <div className="absolute inset-0 bg-ink-2" />
                  {firstItemImage ? (
                    <Image
                      src={firstItemImage}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="72px"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-copper/50 group-hover:text-copper transition-colors">
                      {cat.id.includes("icecek") || cat.id.includes("kahve") ? (
                        <Coffee size={24} strokeWidth={1.5} />
                      ) : (
                        <UtensilsCrossed size={24} strokeWidth={1.5} />
                      )}
                    </div>
                  )}
                  {isActive && <div className="absolute inset-0 bg-copper/10 mix-blend-overlay" />}
                </div>

                <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight px-1 transition-colors ${
                  isActive ? "text-cream" : "text-cream-dim group-hover:text-cream"
                }`}>
                  {menuT?.categories?.[cat.id] || cat.category.en}
                </span>
              </button>
            );
          })}
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
