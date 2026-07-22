"use client";

import React from "react";
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const contactContent = {
  tr: {
    title: "İletişim",
    subtitle: "Bize ulaşın, rezervasyon yapın veya sipariş verin",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul",
    addressLabel: "Adres",
    phoneLabel: "Sipariş Hattı",
    hoursLabel: "Çalışma Saatleri",
    hours: "Her gün: 10:00 - 02:00",
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
    hours: "Everyday: 10:00 AM - 02:00 AM",
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
    hours: "يومياً: 10:00 صباحاً - 02:00 ليلاً",
    whatsapp: "اطلب عبر واتساب",
    directions: "احصل على الاتجاهات",
    findUs: "موقعنا",
  },
  fr: {
    title: "Contact",
    subtitle: "Contactez-nous, réservez ou passez commande",
    address: "Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, Istanbul",
    addressLabel: "Adresse",
    phoneLabel: "Ligne de commande",
    hoursLabel: "Horaires d'ouverture",
    hours: "Tous les jours : 10h00 - 02h00",
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
            href="https://maps.google.com/?q=Kardeşler+Kebap+Pide+Cihangir+Beyoğlu+İstanbul"
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
            href="tel:+905348662715"
            className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-copper/40 transition-all duration-300 group animate-fadeInUp"
            style={{ animationDelay: "150ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-medium text-cream text-sm mb-1">{c.phoneLabel}</h3>
              <p className="text-cream-dim/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                +90 534 866 27 15
              </p>
              <p className="text-cream-dim/40 text-xs mt-1">+90 212 243 28 22</p>
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
            href="https://wa.me/905348662715"
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
          <div className="map-dark-container w-full h-64 sm:h-80 rounded-2xl mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.4186457106093!2d28.981119576483584!3d41.0332822713498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sKarde%C5%9Fler%20Kebap%20Cihangir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kardeşler Cihangir Location"
              allowFullScreen
            ></iframe>
          </div>
          <a
            href="https://maps.google.com/?q=Kardeşler+Kebap+Pide+Cihangir+Beyoğlu+İstanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-copper/15 border border-copper/30 text-copper font-bold text-sm hover:bg-copper hover:text-cream transition-all duration-300"
          >
            <Navigation size={16} />
            <span>{c.directions}</span>
          </a>
        </section>
      </div>
    </div>
  );
}
