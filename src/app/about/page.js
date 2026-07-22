"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, MessageCircle, Globe } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const aboutContent = {
  tr: {
    storyTitle: "Hikayemiz",
    storyP1: "Kardeşler Kebap & Pide, İstanbul'un en renkli ve tarihi semtlerinden biri olan Cihangir'in kalbinde, Firuzağa Mahallesi'nde hizmet vermektedir. Yıllardır geleneksel Türk mutfağının en seçkin lezzetlerini sunarak hem yerel halkın hem de dünyanın dört bir yanından gelen turistlerin vazgeçilmez durağı olmuştur.",
    storyP2: "Sırrımız, yalnızca en taze malzemeleri kullanmamız, geleneksel odun ateşinde pişirme yöntemlerimiz ve nesilden nesile aktarılan orijinal tariflerimizdir. Her lokmanızda İstanbul'un gerçek tadını yaşayın.",
    contactTitle: "İletişim & Çalışma Saatleri",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul",
    orderLine: "Sipariş Hattı",
    workHoursLabel: "Çalışma Saatleri",
    workHours: "Her gün: 10:00 - 02:00",
    followUs: "Bizi Takip Edin",
    whatsapp: "WhatsApp Sipariş",
    findUs: "Bizi Bulun",
  },
  en: {
    storyTitle: "Our Story",
    storyP1: "Kardeşler Kebap & Pide is located in the heart of Cihangir, one of Istanbul's most vibrant and historic neighborhoods, in Firuzağa Mahallesi. For years, we have been an essential stop for locals and tourists from around the world, serving the finest flavors of traditional Turkish cuisine.",
    storyP2: "Our secret lies in using only the freshest ingredients, traditional wood-fired cooking methods, and original recipes passed down through generations. Experience the true taste of Istanbul with every bite.",
    contactTitle: "Contact & Working Hours",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Order Line",
    workHoursLabel: "Working Hours",
    workHours: "Everyday: 10:00 AM - 02:00 AM",
    followUs: "Follow Us",
    whatsapp: "WhatsApp Order",
    findUs: "Find Us",
  },
  ar: {
    storyTitle: "قصتنا",
    storyP1: "يقع مطعم كارديشلر كباب وبيدا في قلب حي جيهانكير، أحد أكثر أحياء إسطنبول حيوية وتاريخية، في محلة فيروز آغا. لسنوات عديدة، كنا محطة أساسية للسكان المحليين والسياح من جميع أنحاء العالم، نقدم أرقى نكهات المطبخ التركي التقليدي.",
    storyP2: "سرّنا يكمن في استخدام أطازج المكونات فقط، وطرق الطهي التقليدية على نار الحطب، ووصفات أصيلة متوارثة عبر الأجيال. عِش طعم إسطنبول الحقيقي مع كل لقمة.",
    contactTitle: "التواصل وساعات العمل",
    address: "فيروز آغا مح. فيروز آغا جامع سوك. رقم: 1A، جيهانكير، بيوغلو، إسطنبول",
    orderLine: "خط الطلبات",
    workHoursLabel: "ساعات العمل",
    workHours: "يومياً: 10:00 صباحاً - 02:00 ليلاً",
    followUs: "تابعنا",
    whatsapp: "اطلب عبر واتساب",
    findUs: "موقعنا",
  },
  fr: {
    storyTitle: "Notre Histoire",
    storyP1: "Kardeşler Kebap & Pide est situé au cœur de Cihangir, l'un des quartiers les plus vibrants et historiques d'Istanbul, à Firuzağa Mahallesi. Depuis des années, nous sommes un arrêt incontournable pour les habitants et les touristes du monde entier, servant les meilleures saveurs de la cuisine turque traditionnelle.",
    storyP2: "Notre secret réside dans l'utilisation des ingrédients les plus frais, des méthodes de cuisson traditionnelles au feu de bois et des recettes originales transmises de génération en génération. Vivez le vrai goût d'Istanbul à chaque bouchée.",
    contactTitle: "Contact & Horaires",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Ligne de commande",
    workHoursLabel: "Horaires d'ouverture",
    workHours: "Tous les jours : 10h00 - 02h00",
    followUs: "Suivez-nous",
    whatsapp: "Commande WhatsApp",
    findUs: "Trouvez-nous",
  },
  ru: {
    storyTitle: "Наша История",
    storyP1: "Kardeşler Kebap & Pide находится в самом сердце Джихангира, одного из самых ярких и исторических районов Стамбула, в квартале Фирузага. На протяжении многих лет мы являемся обязательной остановкой для местных жителей и туристов со всего мира, предлагая лучшие вкусы традиционной турецкой кухни.",
    storyP2: "Наш секрет кроется в использовании только самых свежих ингредиентов, традиционных методов приготовления на дровах и оригинальных рецептах, передаваемых из поколения в поколение. Почувствуйте настоящий вкус Стамбула с каждым кусочком.",
    contactTitle: "Контакты и Часы Работы",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    orderLine: "Линия заказов",
    workHoursLabel: "Часы работы",
    workHours: "Ежедневно: 10:00 - 02:00",
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
    <div className="min-h-screen bg-transparent text-cream pb-16">
      {/* Hero Header */}
      <section className="pt-12 pb-10 px-4 text-center animate-fadeInUp">
        <div className="relative w-20 h-20 mx-auto mb-6 shrink-0">
          <Image src="/logo.webp" alt="Kardeşler Cihangir Logo" fill sizes="80px" style={{ objectFit: 'contain' }} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
          {t.about}
        </h1>
        <p className="text-copper text-sm tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Kebap · Pide · Lahmacun
        </p>
        <p className="text-cream-dim/60 text-sm max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          {content.address}
        </p>
      </section>

      {/* Ottoman Divider */}
      <div className="ottoman-divider max-w-xs mx-auto mb-8"></div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Our Story */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-5" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.storyTitle}
          </h2>
          <p className="text-cream-dim/80 leading-loose mb-4 text-sm sm:text-base" style={{ fontFamily: "var(--font-inter)" }}>
            {content.storyP1}
          </p>
          <p className="text-cream-dim/80 leading-loose text-sm sm:text-base" style={{ fontFamily: "var(--font-inter)" }}>
            {content.storyP2}
          </p>
        </section>

        {/* Contact Info */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.contactTitle}
          </h2>
          
          <div className="space-y-5">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="font-medium text-cream text-sm mb-1">Adres / Address</h3>
                <p className="text-cream-dim/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {content.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="font-medium text-cream text-sm mb-1">{content.orderLine}</h3>
                <a href="tel:+905348662715" className="text-cream-dim/60 text-sm hover:text-copper transition-colors">+90 534 866 27 15</a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="font-medium text-cream text-sm mb-1">{content.workHoursLabel}</h3>
                <p className="text-cream-dim/60 text-sm">{content.workHours}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/905348662715"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-6 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300"
          >
            <MessageCircle size={18} className="text-[#25D366]" />
            <span className="text-[#25D366] font-medium text-sm">{content.whatsapp}</span>
          </a>
        </section>

        {/* Map Section */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-5" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.findUs}
          </h2>
          <div className="map-dark-container w-full h-56 sm:h-72 rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.4186457106093!2d28.981119576483584!3d41.0332822713498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sKarde%C5%9Fler%20Kebap%20Cihangir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kardeşler Cihangir Location"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center py-8 animate-fadeInUp" style={{ animationDelay: "400ms" }}>
          <h3 className="text-lg font-medium text-cream mb-6" style={{ fontFamily: "var(--font-cairo)" }}>
            {content.followUs}
          </h3>
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://www.instagram.com/kardeslerkebapcihangir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-copper/50 hover:text-copper transition-all text-cream-dim">
              <InstagramIcon size={22} />
            </a>
            <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-copper/50 hover:text-copper transition-all text-cream-dim">
              <FacebookIcon size={22} />
            </a>
            <a href="https://kardeslercihangir.com" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-copper/50 hover:text-copper transition-all text-cream-dim">
              <Globe size={22} />
            </a>
          </div>

          {/* Ottoman Divider */}
          <div className="ottoman-divider max-w-xs mx-auto mb-6"></div>

          <p className="text-cream-dim/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Kardeşler Cihangir
          </p>
        </section>
      </div>
    </div>
  );
}
