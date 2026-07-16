"use client";

import React from "react";
import { MapPin, Phone, Clock, Globe, MessageCircle } from "lucide-react";
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
  },
};

// Inline SVG icons for social media (not available in lucide-react)
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
  const { t, lang } = useAppContext();
  const content = aboutContent[lang] || aboutContent.en;

  return (
    <div className="pb-24 px-4 py-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8a6b1c] flex items-center justify-center shadow-xl shadow-[#D4AF37]/20">
          <span className="font-bold text-black text-3xl">K</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">{t.about}</h1>
        <p className="text-gray-400 text-lg">
          Kebap · Pide · Lahmacun
        </p>
        <p className="text-[#D4AF37] text-sm mt-1">{content.address}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Storytelling */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-[#D4AF37]/30 transition-colors">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">{content.storyTitle}</h2>
          <p className="text-gray-300 leading-relaxed mb-4">{content.storyP1}</p>
          <p className="text-gray-300 leading-relaxed">{content.storyP2}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col gap-6 hover:border-[#D4AF37]/30 transition-colors">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">{content.contactTitle}</h2>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">Adres / Address</h3>
              <p className="text-gray-400 text-sm">{content.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">{content.orderLine}</h3>
              <a href="tel:+905348662715" className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors">+90 534 866 27 15</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">{content.workHoursLabel}</h3>
              <p className="text-gray-400 text-sm">{content.workHours}</p>
            </div>
          </div>

          {/* WhatsApp Quick Order */}
          <a
            href="https://wa.me/905348662715"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-2 py-3 rounded-xl bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 transition-colors"
          >
            <MessageCircle size={20} className="text-green-400" />
            <span className="text-green-400 font-medium text-sm">{content.whatsapp}</span>
          </a>
        </div>
      </div>

      {/* Social */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-6">{content.followUs}</h3>
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-gray-400">
            <InstagramIcon size={24} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-gray-400">
            <FacebookIcon size={24} />
          </a>
          <a href="https://kardeslercihangir.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-gray-400">
            <Globe size={24} />
          </a>
        </div>
        <p className="text-gray-500 text-xs">© 2026 Kardeşler Cihangir | Ava Istanbul</p>
      </div>
    </div>
  );
}
