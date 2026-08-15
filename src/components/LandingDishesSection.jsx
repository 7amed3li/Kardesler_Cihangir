"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Utensils, ArrowUpRight, ArrowUpLeft, ChevronRight, ChevronLeft, Coins, Check, ZoomIn } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SaudiRiyalIcon from "./SaudiRiyalIcon";
import DishModal from "./DishModal";

export const landingDishesData = {
  ar: [
    {
      id: "adana",
      name: "كباب أضنة العثماني بالساطور",
      tag: "الطبق المميز منذ 1998",
      desc: "لحم غنم وعجل بلدي مفروم يدوياً بساطور الزيرح ومتبل بالفلفل الأحمر، مشوي على جمر خشب السنديان الطبيعي ويقدم مع خبز اللواش الساخن.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "كباب بيتي الملكي بالفرن الحجري",
      tag: "وصفة متوارثة",
      desc: "كباب لحم ملفوف في خبز لواش مقرمش مخبوز على الحجر، مغطى بصلصة الطماطم والزبدة المذابة ويقدم مع اللبن الزبادي الطازج.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "وليمة المشاوي الملكية المشكلة",
      tag: "وليمة الشيف الكبرى",
      desc: "تشكيلة فاخرة مشوية على الفحم: كباب أضنة، شيش طاووق، أوصال غنم طرية، كفتة إينيغول وأجنحة دجاج مع مقبلات البيت.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "فطيرة بيدا باللحم المقرمش وجبن القشقوان",
      tag: "فرن حجري 450 درجة",
      desc: "عجين رقيق طازج مغطى بقطع لحم الضأن المتبلة وجبن القشقوان الذائب ومخبوزة على حرارة الحجر الطبيعي فور الطلب.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "لحم بعجين عثماني رقيق ومقرمش",
      tag: "مخبوز في دقيقتين",
      desc: "عجين رقيق جداً متبل باللحم المفروم الطازج، البقدونس، الطماطم والتوابل الأناضولية الأصيلة مقرمش ولذيذ.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "كنافة أنطاكيا الساخنة بالفستق الحلبي",
      tag: "حلوى طازجة بالفرن",
      desc: "كنافة شعر ذهبية مقرمشة محشوة بالجبن الماط وتُسقى بالقطر الساخن وتزين بوفرة من الفستق الحلبي الفاخر.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
  en: [
    {
      id: "adana",
      name: "Hand-Minced Artisanal Adana Kebab",
      tag: "Signature Since 1998",
      desc: "Prime lamb & beef hand-minced with traditional Zırh knife, spiced with Urfa pepper, slow-grilled over natural oak embers.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "Royal Oven-Baked Beyti Kebab",
      tag: "Heritage Recipe",
      desc: "Tender kebab wrapped in stone-baked lavash, topped with sizzling melted butter tomato sauce and fresh farm yoghurt.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "Sultan’s Mixed Charcoal Grill Platter",
      tag: "Grand Feast for 2-3",
      desc: "The ultimate charcoal feast: Adana kebab, tender lamb cubes, chicken shish, Inegol meatballs & marinated wings with home mezes.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "Marinated Beef & Melted Kaşar Pide",
      tag: "Stone Oven 450°C",
      desc: "Fresh hand-stretched dough, marinated tender beef cuts, and premium melting Kaşar cheese, baked instantly on hot stone tiles.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "Crispy Traditional Stone-Oven Lahmacun",
      tag: "Baked to Order",
      desc: "Ultra-thin crispy dough topped with seasoned minced meat, fresh herbs, and Mediterranean spices, served with fresh lemon and parsley.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "Warm Antakya Künefe with Antep Pistachios",
      tag: "Artisanal Dessert",
      desc: "Golden crispy shredded phyllo pastry with molten stringy cheese, scented warm syrup, and generous green Antep pistachios.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
  tr: [
    {
      id: "adana",
      name: "Zırhta Çekilmiş Hakiki Adana Kebabı",
      tag: "1998'den Beri İmza Lezzet",
      desc: "Günlük taze kuzu ve dana eti, geleneksel zırh bıçağı ile elde kıyılarak meşe kömürü ateşinde közlenir. Tırnak pide ve köz biberle sunulur.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "Özel Soslu Sarma Beyti Kebabı",
      tag: "Tarihi Reçete",
      desc: "Taş fırından yeni çıkmış sıcak lavaşa sarılan zırh kebabı, tereyağlı özel domates sosu ve süzme yoğurt eşliğinde servis edilir.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "Ziyafet Karışık Izgara Tepsisi",
      tag: "2-3 Kişilik Şölen",
      desc: "Meşe kömüründe pişen Adana kebap, kuzu şiş, tavuk şiş, İnegöl köfte ve kanat; köz sebzeler ve taze mezeler ile.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "Kuşbaşılı Kaşarlı Taş Fırın Pidesi",
      tag: "450°C Taş Fırın",
      desc: "Anında açılan ince hamur, marine edilmiş dana eti ve eriyen leziz kaşar peyniri ile odun ateşinde nar gibi kızarır.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "Çıtır Çıtır Taş Fırın Lahmacun",
      tag: "Anında Fırından",
      desc: "İncecik çıtır hamur, özenle hazırlanan zırh harcı, maydanoz ve limon eşliğinde sıcacık servis edilir.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "Bol Antep Fıstıklı Hatay Künefesi",
      tag: "Sıcak Servis",
      desc: "Altın sarısı kadayıf, sünme Hatay peyniri, sıcak şerbet ve hakiki Antep fıstığı tozu ile tatlı bir lezzet şöleni.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
  ru: [
    {
      id: "adana",
      name: "Фирменный Адана Кебаб ручной рубки",
      tag: "Хит с 1998 года",
      desc: "Свежая баранина и телятина, рубленная вручную османским ножом Зырх, обжаренная на углях из дуба. Подается с горячим лавашем.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "Королевский Бейти Кебаб в лаваше",
      tag: "Исторический рецепт",
      desc: "Сочный кебаб, запеченный в хрустящем лаваше, политый горячим томатно-сливочным маслом и подаваемый с фермерским йогуртом.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "Большое мясное ассорти на углях",
      tag: "Блюдо для 2-3 гостей",
      desc: "Богатое ассорти: Адана кебаб, шашлык из баранины, куриный шашлык, котлеты Инегёль и крылышки на углях с мезе.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "Пиде с нежным мясом и сыром кашар",
      tag: "Каменная печь 450°C",
      desc: "Тонкое тесто ручной раскатки, маринованная сочная говядина и тянущийся сыр, выпекается на раскаленном камне печи.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "Хрустящий турецкий лахмаджун",
      tag: "Выпекается за 2 мин",
      desc: "Ультратонкая хрустящая лепешка с мясным фаршем, зеленью и восточными пряностями прямо из дровяной печи.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "Горячий кюнефе с антепскими фисташками",
      tag: "Традиционный десерт",
      desc: "Золотистое хрустящее тесто кадаиф, тягучий сыр, горячий ароматный сироп и щедрая порция зеленых фисташек.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
  fa: [
    {
      id: "adana",
      name: "کباب آدانا مخصوص ساطوری عثمانی",
      tag: "شاهکار رستوران از ۱۹۹۸",
      desc: "گوشت تازه بره و گوساله ساطوری شده با چاقوی زره و فلفل اورفا، کباب شده روی زغال طبیعی بلوط با نان لواش داغ تنوری.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "بیتی کباب شاهانه پیچیده در لواش",
      tag: "دستورپخت تاریخی",
      desc: "کباب لذیذ پیچیده شده در نان تنوری با سس کره مخصوص گوجه‌فرنگی و ماست چکیده سنتی تازه.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "سینی مجلل کباب شاهانه مخلوط",
      tag: "ولیمه ۲ الی ۳ نفره",
      desc: "مجموعه کباب‌های زغالی: کباب آدانا، کباب برگ و چنجه بره، جوجه کباب، کوفته مخصوص و بال کبابی با مخلفات.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "پیده تنوری با گوشت راسته و پنیر کش‌دار",
      tag: "پخت در تنور ۴۵۰ درجه",
      desc: "خمیر دست‌ساز تازه، گوشت تازه مرینیت شده و پنیر درجه یک کاشار، پخته شده بر روی سنگ داغ تنور هیزمی.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "لاه‌ماجون ترد و برشته سنتی",
      tag: "دست‌ساز و برشته",
      desc: "خمیر بسیار نازک و ترد با گوشت چرخ‌کرده، جعفری تازه، گوجه و ادویه‌جات معطر ترکی پخته شده در لحظه.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "کونفه داغ هاتای با پسته فراوان",
      tag: "دسر اصیل شیرین",
      desc: "رشته‌های کادایف طلایی با پنیر مخصوص و شهد داغ معطر و پودر پسته اعلا.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
  fr: [
    {
      id: "adana",
      name: "Adana Kebab Artisanal au Couteau Zırh",
      tag: "Plat Signature Depuis 1998",
      desc: "Agneau et bœuf frais hachés au couteau traditionnel, assaisonnés au piment d'Antep et grillés sur braises de chêne avec lavash chaud.",
      priceTRY: 625,
      image: "/images/adana.webp",
    },
    {
      id: "beyti",
      name: "Beyti Kebab Signature au Four",
      tag: "Recette Historique",
      desc: "Kebab roulé dans un pain lavash croustillant, nappé de sauce tomate au beurre fondu et servi avec du yaourt frais fermier.",
      priceTRY: 730,
      image: "/images/beyti-1024x677.webp",
    },
    {
      id: "karisik",
      name: "Plateau Royal de Grillades Mixtes",
      tag: "Festin pour 2-3 personnes",
      desc: "Le festin au charbon de bois : Adana kebab, agneau tendre, brochettes de poulet, boulettes İnegöl et ailes grillées.",
      priceTRY: 1600,
      image: "/images/27-Karisik-Kebap_1.webp",
    },
    {
      id: "kusbasi-pide",
      name: "Pide Gourmande Viande & Kaşar",
      tag: "Four à Pierre 450°C",
      desc: "Pâte fine étalée à la minute, dés de viande marinée et fromage Kaşar fondant, cuite sur pierre volcanique au feu de bois.",
      priceTRY: 480,
      image: "/images/kusbasili_kasarli_pide.webp",
    },
    {
      id: "lahmacun",
      name: "Lahmacun Traditionnel Croustillant",
      tag: "Cuit à la Minute",
      desc: "Pâte extra-fine garnie de viande hachée, persil frais, tomates et épices d'Anatolie, cuite en 2 minutes au four à pierre.",
      priceTRY: 190,
      image: "/images/lahmacun.webp",
    },
    {
      id: "kunefe",
      name: "Künefe d'Antakya aux Pistaches",
      tag: "Dessert Chaud Artisanal",
      desc: "Cheveux d'ange dorés, fromage fondant d'Antakya, sirop parfumé chaud et éclats de pistaches vertes.",
      priceTRY: 250,
      image: "/images/kunefe.webp",
    },
  ],
};

const currencyOptions = [
  { code: "TRY", label: "TRY", symbol: "₺" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "EUR", label: "EUR", symbol: "€" },
  { code: "SAR", label: "SAR", symbol: <SaudiRiyalIcon className="h-3.5 w-auto inline-block" /> },
  { code: "RUB", label: "RUB", symbol: "₽" },
  { code: "GBP", label: "GBP", symbol: "£" },
];

const uiLabels = {
  ar: {
    badge: "مختارات الشيف الخاصة",
    title: "أطباق أسطورية مشوية على جمر السنديان",
    subtitle: "أسعار دقيقة ومطابقة للمنيو الرسمي مع إمكانية التحويل الفوري بالدولار واليورو والريال:",
    currencyHint: "اختر عملة العرض المفضلة لديك:",
    orderNow: "اطلب عبر واتساب",
    woodFired: "مشوي على جمر السنديان",
    viewFullMenu: "تصفح المنيو الرقمي الكامل (+100 صنف مع تحويل العملات)",
  },
  en: {
    badge: "Chef's Signature Selection",
    title: "Legendary Dishes Grilled on Oak Embers",
    subtitle: "Official live menu prices with instant currency conversion for international travelers:",
    currencyHint: "Select your preferred display currency:",
    orderNow: "Order on WhatsApp",
    woodFired: "Oak Charcoal Grilled",
    viewFullMenu: "Explore Full Digital Menu (100+ items with currency converter)",
  },
  tr: {
    badge: "Şefin Özel Seçimleri",
    title: "Meşe Kömüründe Pişen Efsane Lezzetler",
    subtitle: "Canlı ve güncel menü fiyatları (farklı para birimleriyle görüntüleyebilirsiniz):",
    currencyHint: "Görüntüleme para birimini seçin:",
    orderNow: "WhatsApp'tan Sipariş Ver",
    woodFired: "Meşe Kömürü Ateşinde",
    viewFullMenu: "Tüm Dijital Menüyü İnceleyin (100+ Çeşit)",
  },
  ru: {
    badge: "Выбор шеф-повара",
    title: "Легендарные блюда на углях из дуба",
    subtitle: "Официальные актуальные цены с мгновенной конвертацией в рубли, доллары и евро:",
    currencyHint: "Выберите удобную валюту:",
    orderNow: "Заказать в WhatsApp",
    woodFired: "На натуральных углях",
    viewFullMenu: "Смотреть полное меню (более 100 блюд с конвертером)",
  },
  fa: {
    badge: "پیشنهادهای سرآشپز",
    title: "غذاهای شاهکار پخته شده روی زغال بلوط",
    subtitle: "قیمت‌های رسمی منو با قابلیت تبدیل خودکار به دلار، یورو، ریال و لیر:",
    currencyHint: "انتخاب واحد پول نمایشی:",
    orderNow: "سفارش در واتس‌اپ",
    woodFired: "پخت روی زغال چوب",
    viewFullMenu: "مشاهده منوی کامل (بیش از ۱۰۰ تنوع غذایی)",
  },
  fr: {
    badge: "Sélection du Chef",
    title: "Grillades d'Exception sur Braises de Chêne",
    subtitle: "Tarifs officiels avec conversion en direct en Euros, Dollars et autres devises :",
    currencyHint: "Choisissez votre devise d'affichage :",
    orderNow: "Commander sur WhatsApp",
    woodFired: "Braises de Chêne",
    viewFullMenu: "Découvrir notre Menu Complet (100+ Plats avec convertisseur)",
  },
};

export default function LandingDishesSection({ currentLocale = "ar" }) {
  const { currency, changeCurrency, convertPrice, getCurrencySymbol } = useAppContext();
  const [modalDish, setModalDish] = useState(null);

  const dishes = landingDishesData[currentLocale] || landingDishesData.en;
  const labels = uiLabels[currentLocale] || uiLabels.en;
  const isRtl = currentLocale === "ar" || currentLocale === "fa";

  const getWhatsAppOrderLink = (dish) => {
    const symbolStr = currency === "SAR" ? "SAR" : getCurrencySymbol();
    const formattedPrice = `${convertPrice(dish.priceTRY)} ${symbolStr}`;
    const message = isRtl
      ? `مرحباً مطعم كارديشلر، أود طلب: ${dish.name} (${formattedPrice} / ${dish.priceTRY} ₺)`
      : `Hello Kardeşler Kebap, I would like to order: ${dish.name} (${formattedPrice} / ${dish.priceTRY} ₺)`;
    return `https://wa.me/905060453906?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CE] border-y border-[#9C7A3F]/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider">
            <Utensils size={13} />
            <span>{labels.badge}</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2B2620]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            {labels.title}
          </h2>
          <div className="h-0.5 w-20 bg-[#9C7A3F]/40 mx-auto"></div>
          <p className="text-[#7A7364] text-xs sm:text-sm md:text-base font-medium">
            {labels.subtitle}
          </p>
        </div>

        {/* Currency Switcher Pill Bar */}
        <div className="max-w-xl mx-auto p-2 sm:p-2.5 rounded-xl bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-sm">
          <div className="flex items-center justify-between gap-2 px-2 pb-2 text-[11px] sm:text-xs text-[#9C7A3F] font-bold">
            <span className="flex items-center gap-1.5">
              <Coins size={13} />
              <span>{labels.currencyHint}</span>
            </span>
            <span className="text-[#7A7364] text-[10px] flex items-center gap-1">
              <span>{currency}</span>
              <span>
                (
                {currency === "SAR" ? (
                  <SaudiRiyalIcon className="h-3 w-auto inline-block text-[#9C7A3F] fill-current" />
                ) : (
                  getCurrencySymbol()
                )}
                )
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {currencyOptions.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => changeCurrency(c.code)}
                  className={`py-2 px-1.5 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#4E5F4C] text-[#EAF0E6]"
                      : "bg-[#EDE3CE] text-[#2B2620] border border-[#9C7A3F]/20 hover:border-[#9C7A3F]"
                  }`}
                >
                  <span>{c.code}</span>
                  <span className="flex items-center opacity-90">{c.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {dishes.map((dish) => {
            const converted = convertPrice(dish.priceTRY);
            const symbol = getCurrencySymbol();
            const waLink = getWhatsAppOrderLink(dish);

            return (
              <div
                key={dish.id}
                className="bg-[#F7F2E7] rounded-xl overflow-hidden border border-[#9C7A3F]/30 shadow-sm flex flex-col group transition-transform hover:scale-101"
              >
                {/* Clickable Image Area */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-[#EDE3CE]"
                  onClick={() => setModalDish(dish)}
                  role="button"
                  aria-label={`View details for ${dish.name}`}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover zoom hint overlay */}
                  <div className="absolute inset-0 bg-[#2B2620]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-[#4E5F4C] flex items-center justify-center text-white">
                      <ZoomIn size={18} />
                    </div>
                  </div>

                  <div className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[#2B2620] text-[#EDE3CE] text-[11px] font-bold uppercase tracking-wider">
                    {dish.tag}
                  </div>

                  {/* Dynamic Converted Price Badge */}
                  <div className="absolute top-3 end-3 px-3 py-1.5 rounded-md bg-[#4E5F4C] text-[#EAF0E6] shadow-sm flex flex-col items-end leading-tight">
                    <span className="text-xs font-black tracking-tight flex items-center gap-1">
                      {currency !== "TRY" && (
                        <>
                          <span>{converted}</span>
                          {currency === "SAR" ? (
                            <SaudiRiyalIcon className="h-3.5 w-auto inline-block fill-current" />
                          ) : (
                            <span>{symbol}</span>
                          )}
                        </>
                      )}
                      {currency === "TRY" && `${dish.priceTRY} ₺`}
                    </span>
                    {currency !== "TRY" && (
                      <span className="text-[9px] font-bold opacity-90">
                        ({dish.priceTRY} ₺)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => setModalDish(dish)}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#2B2620] group-hover:text-[#9C7A3F] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A7364] font-medium leading-relaxed mt-1">
                      {dish.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#9C7A3F]/20 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#9C7A3F] font-semibold flex items-center gap-1">
                      <Flame size={13} /> {labels.woodFired}
                    </span>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{labels.orderNow}</span>
                      {isRtl ? <ArrowUpLeft size={13} /> : <ArrowUpRight size={13} />}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>{labels.viewFullMenu}</span>
            {isRtl ? <ArrowUpLeft size={16} /> : <ArrowUpRight size={16} />}
          </Link>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {modalDish && (
        <DishModal
          isOpen={!!modalDish}
          setIsOpen={(open) => { if (!open) setModalDish(null); }}
          customName={modalDish.name}
          customDesc={modalDish.desc}
          customPrice={modalDish.priceTRY}
          customImage={modalDish.image}
          customTags={["signature"]}
          hideCart={true}
        />
      )}
    </section>
  );
}
