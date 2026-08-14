"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Compass } from 'lucide-react';
import DishModal from './DishModal';

export default function SeoStorytelling({ locale = 'en' }) {
  const [activeModal, setActiveModal] = useState(null);
  const content = {
    en: {
      storyTitle: "A Heritage Born in Cihangir",
      storyText1: "Just a short walk from the bustling center of Taksim Square lies Cihangir, Beyoğlu’s most historic and bohemian neighborhood. It is here, among winding streets favored by artists and culinary enthusiasts, that Kardeşler Kebap was established in 1998.",
      storyText2: "While tourist-focused restaurants come and go on Istiklal Avenue, we have stood as a bastion of genuine local flavor. We are not just a restaurant; we are a family tradition dedicated to preserving the rich heritage of authentic Anatolian grilling and warm Turkish hospitality.",
      craftTitle: "The Mastery of Fire & Stone",
      craftText1: "We compromise on nothing. Our master chefs continue to use the traditional heavy crescent knife, known as a 'Zırh', to hand-mince our 100% fresh, daily halal meat, completely rejecting frozen products.",
      craftText2: "Once prepared, the kebabs are slow-roasted over real oak charcoal embers. Equally important is our 450°C stone oven, the heart of our bakery, where every lahmacun and wood-fired pide is baked fresh to order to achieve the perfect crispy balance.",
      kebabDesc: "A luxurious mix of our finest kebabs, slowly charcoal-grilled to perfection.",
      lahmacunDesc: "Authentic Turkish Lahmacun baked in our 450°C stone oven for the perfect crispiness.",
      viewDish: "View Dish"
    },
    ar: {
      storyTitle: "من قلب جيهانكير.. وُلدت الحكاية",
      storyText1: "على بُعد مسافة قصيرة من صخب ميدان تقسيم، يقع حي جيهانكير، الحي الأكثر عراقة وفناً في منطقة بيوغلو. وهنا، وسط الشوارع المتعرجة التي يفضلها الفنانون وعشاق الطعام الأصيل، تأسس مطعم كارديشلر كباب في عام 1998.",
      storyText2: "وبينما تظهر وتختفي المطاعم السياحية في شارع الاستقلال، صمدنا كمعقل للنكهة المحلية الأصيلة. نحن تقليد عائلي مكرس للحفاظ على التراث الغني للشواء الأناضولي الأصيل وحسن الضيافة التركية في قلب إسطنبول.",
      craftTitle: "سر النكهة: نار السنديان وحجر الفرن",
      craftText1: "لا نساوم أبداً على الجودة. لا يزال طهاتنا يستخدمون السكين الهلالي الثقيل 'الزره' (Zırh) لفرم اللحم يدوياً للحفاظ على عصارته، مستخدمين لحوماً حلال طازجة 100% يومياً ومبتعدين تماماً عن المجمدات.",
      craftText2: "يتم شواء الكباب ببطء على جمر السنديان الحقيقي. وبنفس الأهمية يأتي فرننا الحجري بدرجة حرارة 450 مئوية، حيث تُخبز كل قطعة من اللحمجون وفطائر البيدا طازجة عند الطلب للوصول إلى القرمشة المثالية.",
      kebabDesc: "مزيج فاخر من أفضل أنواع الكباب لدينا، مشوي على الفحم ببطء للوصول إلى الطعم المثالي.",
      lahmacunDesc: "اللحمجون التركي الأصيل المحضر في فرننا الحجري على حرارة 450 مئوية.",
      viewDish: "عرض التفاصيل"
    },
    ru: {
      storyTitle: "Наследие, рожденное в Джихангире",
      storyText1: "Всего в нескольких минутах ходьбы от шумного центра площади Таксим находится Джихангир, самый исторический и богемный район Бейоглу. Именно здесь, на извилистых улочках, в 1998 году был основан Kardeşler Kebap.",
      storyText2: "В то время как туристические рестораны на улице Истикляль открываются и закрываются, мы остаемся оплотом истинного местного вкуса и семейной традицией, сохраняющей настоящее анатолийское мастерство приготовления на гриле и турецкое гостеприимство.",
      craftTitle: "Мастерство Огня и Камня",
      craftText1: "Мы не идем на компромиссы. Наши шеф-повара используют традиционный тяжелый нож 'Zırh' для ручной рубки свежего 100% халяльного мяса каждый день, полностью отказываясь от замороженных продуктов.",
      craftText2: "Кебабы медленно жарятся на углях из натурального дуба. Не менее важна наша каменная печь при 450°C, где каждый лахмаджун и пиде на дровах выпекаются на заказ до идеального хруста.",
      kebabDesc: "Роскошный микс наших лучших кебабов, медленно приготовленных на углях до совершенства.",
      lahmacunDesc: "Настоящий турецкий лахмаджун, запеченный в каменной печи при 450°C для идеального хруста.",
      viewDish: "Смотреть Блюдо"
    },
    tr: {
      storyTitle: "Cihangir'de Doğan Bir Miras",
      storyText1: "Taksim Meydanı'nın hareketli merkezinden sadece kısa bir yürüyüş mesafesinde, Beyoğlu'nun en tarihi ve bohem semti Cihangir yer alır. Kardeşler Kebap, 1998 yılında sanatçıların ve lezzet tutkunlarının gözdesi olan bu dolambaçlı sokaklarda kuruldu.",
      storyText2: "İstiklal Caddesi'nde turistik restoranlar açılıp kapanırken, biz gerçek yerel lezzetlerin kalesi olarak ayakta kaldık. Biz sadece bir restoran değiliz; otantik Anadolu ızgara mirasını ve sıcak Türk misafirperverliğini yaşatmaya adanmış bir aile geleneğiyiz.",
      craftTitle: "Ateş ve Taşın Ustalığı",
      craftText1: "Kaliteden asla ödün vermeyiz. Ustalarımız, dondurulmuş ürünleri tamamen reddederek, %100 taze günlük helal etimizi 'Zırh' adı verilen geleneksel ağır bıçakla elde zırhlamaya devam ediyor.",
      craftText2: "Hazırlanan kebaplar, gerçek meşe kömürü ateşinde yavaşça közlenir. Aynı derecede önemli olan, her bir lahmacun ve odun ateşli pidenin mükemmel çıtırlığa ulaşmak için sipariş üzerine taze olarak pişirildiği 450°C'lik taş fırınımızdır.",
      kebabDesc: "En iyi kebaplarımızın mükemmel kıvamda meşe kömüründe pişirilmiş lüks karışımı.",
      lahmacunDesc: "Mükemmel çıtırlık için 450°C taş fırınımızda pişirilen otantik Türk Lahmacunu.",
      viewDish: "Yemeği Gör"
    },
    fa: {
      storyTitle: "میراثی متولد شده در جهانگیر",
      storyText1: "تنها با چند دقیقه پیاده‌روی از مرکز پر هیاهوی میدان تکسیم، محله جهانگیر، تاریخی‌ترین و هنری‌ترین محله بی‌اوغلو قرار دارد. در همین کوچه‌های پرپیچ و خم محبوب هنرمندان و عاشقان غذا بود که کاردشلر کباب در سال ۱۹۹۸ تاسیس شد.",
      storyText2: "در حالی که رستوران‌های توریستی خیابان استقلال مدام باز و بسته می‌شوند، ما به عنوان سنگری از طعم اصیل محلی پابرجا مانده‌اییم. ما فقط یک رستوران نیستیم؛ ما یک سنت خانوادگی هستیم که به حفظ میراث غنی کباب‌های آناتولی و مهمان‌نوازی گرم ترکی در قلب استانبول اختصاص یافته‌ایم.",
      craftTitle: "مهارت آتش و سنگ",
      craftText1: "ما هرگز در کیفیت سازش نمی‌کنیم. سرآشپزهای ما همچنان از چاقوی سنتی و سنگین هلالی شکل به نام «زره» (Zırh) برای خرد کردن دستی گوشت حلال ۱۰۰٪ تازه و روزانه استفاده می‌کنند و محصولات یخ‌زده را کاملاً رد می‌کنند.",
      craftText2: "کباب‌های آماده شده، روی زغال واقعی چوب بلوط به آرامی کباب می‌شوند. تنور سنگی ۴۵۰ درجه ما نیز به همان اندازه مهم است؛ قلب تپنده نانوایی ما که در آن هر لاهماجون و پیده هیزمی برای رسیدن به تردی کامل، تازه و به سفارش مشتری پخته می‌شود.",
      kebabDesc: "ترکیبی مجلل از بهترین کباب‌های ما که به آرامی روی زغال کباب شده‌اند.",
      lahmacunDesc: "لاهماجون اصیل ترکی که در تنور سنگی ۴۵۰ درجه ما برای تردی کامل پخته شده است.",
      viewDish: "مشاهده غذا"
    },
    fr: {
      storyTitle: "Un Héritage Né à Cihangir",
      storyText1: "À quelques pas du centre animé de la place Taksim se trouve Cihangir, le quartier le plus historique et bohème de Beyoğlu. C'est ici, parmi les rues sinueuses prisées des artistes et des passionnés de gastronomie, que Kardeşler Kebap a été fondé en 1998.",
      storyText2: "Alors que les restaurants touristiques vont et viennent sur l'avenue Istiklal, nous sommes restés un bastion de saveurs locales authentiques. Nous ne sommes pas seulement un restaurant; nous sommes une tradition familiale dédiée à la préservation du riche héritage des grillades anatoliennes authentiques.",
      craftTitle: "La Maîtrise du Feu et de la Pierre",
      craftText1: "Nous ne faisons aucun compromis. Nos maîtres chefs continuent d'utiliser le lourd couteau traditionnel en croissant, le 'Zırh', pour hacher à la main notre viande halal 100% fraîche du jour.",
      craftText2: "Une fois préparés, les kebabs sont lentement rôtis sur de véritables braises de chêne. Tout aussi important est notre four en pierre à 450°C, où chaque lahmacun et pide au feu de bois est cuit à la commande pour obtenir un équilibre croustillant parfait.",
      kebabDesc: "Un mélange luxueux de nos meilleurs kebabs, lentement grillés au charbon de bois à la perfection.",
      lahmacunDesc: "Authentique Lahmacun turc cuit dans notre four en pierre à 450°C pour un croustillant parfait.",
      viewDish: "Voir le Plat"
    }
  };

  const t = content[locale] || content.en;
  const isRtl = locale === 'ar' || locale === 'fa';
  
  // Custom float class for drop cap based on direction
  const dropCapFloat = isRtl ? "float-right ml-3" : "float-left mr-3";

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0E0804] border-y border-teal-dim/20">
      <div className={`max-w-6xl mx-auto ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          
          {/* Main Story Block (Bento Large) */}
          <div className="col-span-1 lg:col-span-7 bg-[#140D07] rounded-3xl p-6 sm:p-12 border border-copper/20 relative overflow-hidden group hover:border-copper/40 transition-colors shadow-2xl order-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="w-12 h-[2px] bg-copper/60 mb-4 rounded-full"></div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-cream leading-tight luxury-title" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.storyTitle}
              </h2>
              <div className="space-y-4 text-cream-dim/90 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  <span className={`text-6xl font-black text-gold leading-none mt-1 ${dropCapFloat}`} style={{ fontFamily: "var(--font-cairo)" }}>
                    {t.storyText1.charAt(0)}
                  </span>
                  {t.storyText1.substring(1)}
                </p>
                <p className="pt-2">{t.storyText2}</p>
              </div>
            </div>
          </div>

          {/* Image Block 1 */}
          <button 
            onClick={() => setActiveModal('kebab')}
            className="col-span-1 lg:col-span-5 relative min-h-[250px] sm:min-h-[320px] rounded-3xl overflow-hidden border border-teal-dim/30 shadow-2xl block w-full text-left cursor-zoom-in group order-2"
          >
            <Image 
              src="/images/27-Karisik-Kebap_1.webp" 
              alt="Authentic Kebab Taksim" 
              fill 
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-cream text-sm font-bold bg-ink/70 px-4 py-2 rounded-full backdrop-blur-md">View Dish</span>
            </div>
          </button>

          {/* Image Block 2 */}
          <button 
            onClick={() => setActiveModal('lahmacun')}
            className="col-span-1 lg:col-span-4 relative min-h-[250px] sm:min-h-[300px] rounded-3xl overflow-hidden border border-gold/20 shadow-2xl block w-full text-left cursor-zoom-in group order-4 lg:order-3"
          >
            <Image 
              src="/images/lahmacun.webp" 
              alt="Stone Oven Lahmacun" 
              fill 
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804]/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-cream text-sm font-bold bg-ink/70 px-4 py-2 rounded-full backdrop-blur-md">{t.viewDish}</span>
            </div>
          </button>

          {/* Secondary Story Block */}
          <div className="col-span-1 lg:col-span-8 bg-gradient-to-br from-[#140D07] to-[#0a0603] rounded-3xl p-6 sm:p-10 border border-teal-dim/30 relative overflow-hidden group hover:border-gold/30 transition-colors shadow-2xl order-3 lg:order-4">
            <div className="relative z-10 space-y-4 sm:space-y-5">
              <div className="w-12 h-[2px] bg-gold/60 mb-4 rounded-full"></div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-cream luxury-title" style={{ fontFamily: "var(--font-cairo)" }}>
                {t.craftTitle}
              </h3>
              <div className="space-y-3 text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
                <p>{t.craftText1}</p>
                <p>{t.craftText2}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Dish Modals */}
      <DishModal 
        isOpen={activeModal === 'kebab'} 
        setIsOpen={() => setActiveModal(null)} 
        customName="Karışık Kebap"
        customDesc={t.kebabDesc}
        customImage="/images/27-Karisik-Kebap_1.webp"
        hideCart={true}
      />
      <DishModal 
        isOpen={activeModal === 'lahmacun'} 
        setIsOpen={() => setActiveModal(null)} 
        customName="Taş Fırın Lahmacun"
        customDesc={t.lahmacunDesc}
        customImage="/images/lahmacun.webp"
        hideCart={true}
      />
    </section>
  );
}
