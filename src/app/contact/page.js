"use client";

import React from "react";
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import RestaurantMap from "@/components/RestaurantMap";

const contactContent = {
  tr: {
    title: "İletişim",
    subtitle: "Bize ulaşın, rezervasyon yapın veya sipariş verin",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul",
    addressLabel: "Adres",
    phoneLabel: "Sipariş Hattı",
    hoursLabel: "Çalışma Saatleri",
    hours: "Her gün: 09:00 - 02:00",
    whatsapp: "WhatsApp Sipariş",
    directions: "Yol Tarifi Al",
    findUs: "Bizi Bulun",
  },
  en: {
    title: "Contact",
    subtitle: "Reach out to us, make a reservation, or place an order",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    addressLabel: "Address",
    phoneLabel: "Order Line",
    hoursLabel: "Working Hours",
    hours: "Everyday: 09:00 AM - 02:00 AM",
    whatsapp: "WhatsApp Order",
    directions: "Get Directions",
    findUs: "Find Us",
  },
  ar: {
    title: "التواصل",
    subtitle: "تواصل معنا، احجز طاولة، أو قدّم طلبك",
    address: "فيروز آغا مح. فيروز آغا جامع سوك. رقم: 1A، جيهانكير، بيوغلو، إسطنبول",
    addressLabel: "العنوان",
    phoneLabel: "خط الطلبات",
    hoursLabel: "ساعات العمل",
    hours: "يومياً: 09:00 صباحاً - 02:00 ليلاً",
    whatsapp: "اطلب عبر واتساب",
    directions: "احصل على الاتجاهات",
    findUs: "موقعنا",
  },
  fa: {
    title: "تماس با ما",
    subtitle: "برای رزرو میز، سفارش یا هرگونه سوال با ما در ارتباط باشید",
    address: "استانبول، بی اوغلو، جهانگیر، محله فیروزآقا، کوچه مسجد فیروزآقا، پلاک ۱A",
    addressLabel: "آدرس",
    phoneLabel: "تلفن تماس و سفارش",
    hoursLabel: "ساعات کاری",
    hours: "همه‌روزه: ۰۹:۰۰ صبح تا ۰۲:۰۰ بامداد",
    whatsapp: "سفارش واتس‌اپ",
    directions: "مسیریابی روی نقشه",
    findUs: "ما را پیدا کنید",
  },
  fr: {
    title: "Contact",
    subtitle: "Contactez-nous, réservez ou passez commande",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    addressLabel: "Adresse",
    phoneLabel: "Ligne de commande",
    hoursLabel: "Horaires d'ouverture",
    hours: "Tous les jours : 09h00 - 02h00",
    whatsapp: "Commande WhatsApp",
    directions: "Itinéraire",
    findUs: "Trouvez-nous",
  },
};

export default function ContactPage() {
  const { t } = useAppContext();
  const c = t.contactPage || {};

  return (
    <div className="min-h-screen bg-transparent text-cream pb-16">
      {/* Header */}
      <section className="pt-12 pb-8 px-4 text-center animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
          {c.title}
        </h1>
        <div className="ottoman-divider max-w-xs mx-auto my-6"></div>
        <p className="text-cream-dim/60 text-sm max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          {c.subtitle}
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Address */}
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-copper/40 transition-all duration-300 group animate-fadeInUp"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-medium text-cream text-sm mb-1">{c.addressLabel}</h3>
              <p className="text-cream-dim/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {c.address}
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+905060453906"
            className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-copper/40 transition-all duration-300 group animate-fadeInUp"
            style={{ animationDelay: "150ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-medium text-cream text-sm mb-1">{c.phoneLabel}</h3>
              <p className="text-cream-dim/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                +90 506 045 39 06
              </p>
              <p className="text-cream-dim/40 text-xs mt-1">+90 212 251 36 96</p>
            </div>
          </a>

          {/* Hours */}
          <div
            className="glass-card rounded-2xl p-6 flex items-start gap-4 animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-medium text-cream text-sm mb-1">{c.hoursLabel}</h3>
              <p className="text-cream-dim/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                {c.hours}
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/905060453906"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-[#25D366]/40 transition-all duration-300 group animate-fadeInUp"
            style={{ animationDelay: "250ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-cream text-sm mb-1">{c.whatsapp}</h3>
              <p className="text-cream-dim/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                +90 534 866 27 15
              </p>
            </div>
          </a>
        </div>

        {/* Map Section */}
        <section className="glass-card rounded-2xl p-6 animate-fadeInUp" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-bold text-gold mb-4" style={{ fontFamily: "var(--font-cairo)" }}>
            {c.findUs}
          </h2>
          <RestaurantMap heightClass="h-64 sm:h-80" className="mb-4" showDirectionsButton={true} />
        </section>
      </div>
    </div>
  );
}
