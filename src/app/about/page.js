"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, MessageCircle, Globe } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import RestaurantMap from "@/components/RestaurantMap";

const aboutContent = {
  tr: {
    storyTitle: "Hikayemiz: Babadan Oğula Bir Lezzet Mirası",
    storyP1: "1998 yılında Cihangir'in tarihi sokaklarında başlayan yolculuğumuz, bugün ikinci kuşağın ellerinde ilk günkü heyecanıyla devam ediyor. 'Kardeşler' ismimiz sadece bir tabela değil; babalardan oğullara, amcalardan yeğenlere aktarılan köklü bir aile geleneğinin sembolüdür.",
    storyP2: "Yıllardır aynı köşede, aynı ateşte pişen lezzetlerimizle hizmet vermekten gurur duyuyoruz. Zırhla çekilen etlerimiz, odun ateşinde yanan fırınımız ve en önemlisi 'kardeşlik' bağımızla hazırladığımız her porsiyon, sizi otantik Türk mutfağının kalbine unutulmaz bir yolculuğa davet ediyor.",
    contactTitle: "İletişim & Çalışma Saatleri",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul",
    orderLine: "Sipariş Hattı",
    workHoursLabel: "Çalışma Saatleri",
    workHours: "Her gün: 09:00 - 02:00",
    followUs: "Bizi Takip Edin",
    whatsapp: "WhatsApp Sipariş",
    findUs: "Bizi Bulun",
  },
  en: {
    storyTitle: "Our Story: A Legacy from Father to Son",
    storyP1: "Our journey, which began in the historic streets of Cihangir in 1998, continues today in the hands of the second generation with the exact same passion. Our name 'Kardeşler' (Brothers) is not just a sign; it is the symbol of a deep-rooted family tradition passed down from fathers to sons, from uncles to nephews.",
    storyP2: "We take immense pride in serving at the exact same corner for decades, cooking over the very same traditional fire. With hand-minced meats, a wood-fired stone oven, and the strong bond of brotherhood infused into every dish, we invite you to an unforgettable journey into the heart of authentic Turkish culinary heritage.",
    contactTitle: "Contact & Working Hours",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Order Line",
    workHoursLabel: "Working Hours",
    workHours: "Everyday: 09:00 AM - 02:00 AM",
    followUs: "Follow Us",
    whatsapp: "WhatsApp Order",
    findUs: "Find Us",
  },
  ar: {
    storyTitle: "قصتنا: إرث يتوارثه الأبناء عن الآباء",
    storyP1: "رحلتنا التي بدأت في شوارع جيهانكير التاريخية عام 1998، تستمر اليوم على يد الجيل الثاني بنفس الشغف الأصيل. اسمنا 'كارديشلر' (الإخوة) ليس مجرد لافتة تجارية؛ بل هو رمز لتقليد عائلي متجذر ينتقل من الآباء إلى الأبناء، ومن الأعمام إلى أبناء الإخوة.",
    storyP2: "نفخر بخدمة ضيوفنا في نفس الزاوية لسنوات طويلة، ونطهو أطباقنا على نفس النيران التقليدية. من خلال اللحوم المفرومة يدوياً (بالساطور الأناضولي)، والفرن الحجري المشتعل بالحطب، ورابطة 'الأخوة' القوية التي نضعها في كل طبق، ندعوكم لرحلة لا تُنسى في قلب تراث الطهي التركي الأصيل.",
    contactTitle: "التواصل وساعات العمل",
    address: "فيروز آغا مح. فيروز آغا جامع سوك. رقم: 1A، جيهانكير، بيوغلو، إسطنبول",
    orderLine: "خط الطلبات",
    workHoursLabel: "ساعات العمل",
    workHours: "يومياً: 09:00 صباحاً - 02:00 ليلاً",
    followUs: "تابعنا",
    whatsapp: "اطلب عبر واتساب",
    findUs: "موقعنا",
  },
  fa: {
    storyTitle: "داستان ما: میراثی از پدر به پسر",
    storyP1: "سفر ما که در سال ۱۹۹۸ در خیابان‌های تاریخی جهانگیر آغاز شد، امروز با همان اشتیاق روز اول در دستان نسل دوم ادامه دارد. نام ما 'کارداشلر' (برادران) تنها یک تابلوی تجاری نیست؛ بلکه نمادی از یک سنت ریشه‌دار خانوادگی است که از پدران به پسران و از عموها به برادرزاده‌ها منتقل شده است.",
    storyP2: "ما مفتخریم که سال‌هاست در همان گوشه همیشگی و روی همان آتش سنتی به مهمانان خود خدمت می‌کنیم. با گوشت‌های خرد شده با دست (ساطور)، تنور سنگی هیزمی، و پیوند محکم 'برادری' که در هر بشقاب جاری است، شما را به سفری فراموش‌نشدنی در قلب میراث اصیل آشپزی ترکیه دعوت می‌کنیم.",
    contactTitle: "تماس و ساعات کاری",
    address: "استانبول، بی اوغلو، جهانگیر، محله فیروزآقا، کوچه مسجد فیروزآقا، پلاک ۱A",
    orderLine: "خط سفارشات",
    workHoursLabel: "ساعات کاری",
    workHours: "همه‌روزه: ۰۹:۰۰ صبح تا ۰۲:۰۰ بامداد",
    followUs: "ما را دنبال کنید",
    whatsapp: "سفارش واتس‌اپ",
    findUs: "مسیریابی به رستوران",
  },
  fr: {
    storyTitle: "Notre Histoire : Un Héritage de Père en Fils",
    storyP1: "Notre voyage, qui a commencé dans les rues historiques de Cihangir en 1998, se poursuit aujourd'hui entre les mains de la deuxième génération avec la même passion. Notre nom 'Kardeşler' (Frères) n'est pas qu'une simple enseigne ; c'est le symbole d'une tradition familiale profondément enracinée, transmise de père en fils, d'oncle en neveu.",
    storyP2: "Nous sommes fiers de servir au même endroit depuis des décennies, en cuisinant sur le même feu traditionnel. Avec des viandes hachées à la main, un four en pierre au feu de bois et le lien fort de la 'fraternité' infusé dans chaque plat, nous vous invitons à un voyage inoubliable au cœur de l'authentique héritage culinaire turc.",
    contactTitle: "Contact & Horaires",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Ligne de commande",
    workHoursLabel: "Horaires d'ouverture",
    workHours: "Tous les jours : 09h00 - 02h00",
    followUs: "Suivez-nous",
    whatsapp: "Commande WhatsApp",
    findUs: "Trouvez-nous",
  },
  ru: {
    storyTitle: "Наша История: Наследие от Отца к Сыну",
    storyP1: "Наше путешествие, начавшееся на исторических улицах Джихангира в 1998 году, сегодня продолжается в руках второго поколения с той же страстью. Наше название 'Kardeşler' (Братья) — это не просто вывеска; это символ глубоко укоренившейся семейной традиции, передаваемой от отцов к сыновьям, от дядей к племянникам.",
    storyP2: "Мы гордимся тем, что на протяжении десятилетий обслуживаем гостей на одном и том же углу, готовя на том же традиционном огне. С рубленным вручную мясом, каменной печью на дровах и крепкими узами 'братства', вложенными в каждое блюдо, мы приглашаем вас в незабываемое путешествие в самое сердце подлинного турецкого кулинарного наследия.",
    contactTitle: "Контакты и Часы Работы",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Линия заказов",
    workHoursLabel: "Часы работы",
    workHours: "Ежедневно: 09:00 - 02:00",
    followUs: "Следите за нами",
    whatsapp: "Заказ по WhatsApp",
    findUs: "Как нас найти",
  },
};

function InstagramIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function AboutPage() {
  const { t } = useAppContext();
  const content = t.aboutPage || {};

  return (
    <div className="min-h-screen bg-[#EDE3CE] text-[#2B2620] pb-16">
      {/* Hero Header */}
      <section className="pt-12 pb-10 px-4 text-center animate-fadeInUp">
        <div className="relative w-20 h-20 mx-auto mb-6 shrink-0">
          <Image src="/logo.webp" alt="Kardeşler Cihangir Logo" fill sizes="80px" style={{ objectFit: 'contain' }} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2620] mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
          {t.about}
        </h1>
        <p className="text-[#9C7A3F] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-inter)" }}>
          Kebap · Pide · Lahmacun
        </p>
        <p className="text-[#7A7364] text-sm font-medium max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          {content.address}
        </p>
      </section>

      {/* Ottoman Divider */}
      <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Our Story */}
        <section className="bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-[#9C7A3F] mb-5" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.storyTitle}
          </h2>
          <p className="text-[#2B2620] leading-relaxed mb-4 text-sm sm:text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            {content.storyP1}
          </p>
          <p className="text-[#2B2620] leading-relaxed text-sm sm:text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            {content.storyP2}
          </p>
        </section>

        {/* Contact Info */}
        <section className="bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-[#9C7A3F] mb-6" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.contactTitle}
          </h2>
          
          <div className="space-y-5">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#EDE3CE] text-[#9C7A3F] flex items-center justify-center shrink-0 border border-[#9C7A3F]/20">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#2B2620] text-sm mb-1">Adres / Address</h3>
                <p className="text-[#7A7364] text-sm font-medium leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {content.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#EDE3CE] text-[#4E5F4C] flex items-center justify-center shrink-0 border border-[#9C7A3F]/20">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#2B2620] text-sm mb-1">{content.orderLine}</h3>
                <a href="tel:+902122513696" className="text-[#7A7364] text-sm font-medium hover:text-[#2B2620] transition-colors">+90 212 251 36 96</a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#EDE3CE] text-[#9C7A3F] flex items-center justify-center shrink-0 border border-[#9C7A3F]/20">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#2B2620] text-sm mb-1">{content.workHoursLabel}</h3>
                <p className="text-[#7A7364] text-sm font-medium">{content.workHours}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/902122513696"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-6 py-3 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] transition-colors"
          >
            <MessageCircle size={18} />
            <span className="font-bold text-xs uppercase tracking-wider">{content.whatsapp}</span>
          </a>
        </section>

        {/* Map Section */}
        <section className="bg-[#F7F2E7] border border-[#9C7A3F]/30 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-[#9C7A3F] mb-5" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.findUs}
          </h2>
          <RestaurantMap heightClass="h-56 sm:h-72" className="mb-0" showDirectionsButton={true} />
        </section>

        {/* Social Media */}
        <section className="text-center py-8">
          <h3 className="text-lg font-bold text-[#2B2620] mb-6" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.followUs}
          </h3>
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 flex items-center justify-center text-[#9C7A3F] hover:border-[#9C7A3F] transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 flex items-center justify-center text-[#9C7A3F] hover:border-[#9C7A3F] transition-colors">
              <FacebookIcon size={20} />
            </a>
            <a href="https://kardeslercihangir.com" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-10 h-10 rounded-md bg-[#F7F2E7] border border-[#9C7A3F]/30 flex items-center justify-center text-[#9C7A3F] hover:border-[#9C7A3F] transition-colors">
              <Globe size={20} />
            </a>
          </div>

          {/* Ottoman Divider */}
          <div className="ottoman-divider max-w-xs mx-auto mb-6"></div>

          <p className="text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Kardeşler Cihangir
          </p>
        </section>
      </div>
    </div>
  );
}
