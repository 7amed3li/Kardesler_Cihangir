"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { X, Calendar, Clock, Users, User, MessageCircle, Phone } from "lucide-react";

const reservationTranslations = {
  tr: {
    title: "Masa Rezervasyonu",
    subtitle: "Kardeşler Cihangir'de yerinizi hemen ayırtın",
    nameLabel: "Adınız Soyadınız",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    guestsLabel: "Kişi Sayısı",
    dateLabel: "Tarih",
    timeLabel: "Saat",
    notesLabel: "Özel İstek / Not (İsteğe bağlı)",
    notesPlaceholder: "Örn: Dış mekan masası, doğum günü vb.",
    submitWhatsApp: "WhatsApp ile Rezervasyon Yap",
    directCall: "Doğrudan Ara",
    instantConfirmation: "Anında onay & rezervasyon",
  },
  en: {
    title: "Table Reservation",
    subtitle: "Reserve your table at Kardeşler Cihangir",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. John Doe",
    guestsLabel: "Guests",
    dateLabel: "Date",
    timeLabel: "Time",
    notesLabel: "Special Requests / Notes (Optional)",
    notesPlaceholder: "e.g. Outdoor seating, celebration",
    submitWhatsApp: "Reserve via WhatsApp",
    directCall: "Call Directly",
    instantConfirmation: "Instant confirmation via WhatsApp",
  },
  ar: {
    title: "حجز طاولة",
    subtitle: "احجز طاولتك في مطعم كارديشلر جيهانكير",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: أحمد محمد",
    guestsLabel: "عدد الأشخاص",
    dateLabel: "التاريخ",
    timeLabel: "الوقت",
    notesLabel: "طلبات خاصة / ملاحظات (اختياري)",
    notesPlaceholder: "مثال: طاولة خارجية، مناسبة خاصة",
    submitWhatsApp: "تأكيد الحجز عبر واتساب",
    directCall: "اتصال مباشر",
    instantConfirmation: "تأكيد فوري عبر واتساب",
  },
  ru: {
    title: "Бронирование Столика",
    subtitle: "Забронируйте столик в Kardeşler Cihangir",
    nameLabel: "Ваше Имя",
    namePlaceholder: "например, Иван Петров",
    guestsLabel: "Количество гостей",
    dateLabel: "Дата",
    timeLabel: "Время",
    notesLabel: "Пожелания (необязательно)",
    notesPlaceholder: "например, столик на веранде",
    submitWhatsApp: "Забронировать в WhatsApp",
    directCall: "Позвонить",
    instantConfirmation: "Мгновенное подтверждение в WhatsApp",
  },
  fa: {
    title: "رزرو میز",
    subtitle: "میز خود را در رستوران کارداشلر جهانگیر رزرو کنید",
    nameLabel: "نام و نام خانوادگی",
    namePlaceholder: "مثال: علی رضایی",
    guestsLabel: "تعداد نفرات",
    dateLabel: "تاریخ",
    timeLabel: "ساعت",
    notesLabel: "درخواست خاص (اختیاری)",
    notesPlaceholder: "مثال: میز در فضای باز",
    submitWhatsApp: "رزرو از طریق واتس‌اپ",
    directCall: "تماس مستقیم",
    instantConfirmation: "تایید فوری از طریق واتس‌اپ",
  },
  fr: {
    title: "Réservation de Table",
    subtitle: "Réservez votre table chez Kardeşler Cihangir",
    nameLabel: "Nom Complet",
    namePlaceholder: "ex: Jean Dupont",
    guestsLabel: "Nombre de personnes",
    dateLabel: "Date",
    timeLabel: "Heure",
    notesLabel: "Demandes particulières (Optionnel)",
    notesPlaceholder: "ex: Terrasse, anniversaire",
    submitWhatsApp: "Réserver via WhatsApp",
    directCall: "Appeler directement",
    instantConfirmation: "Confirmation instantanée par WhatsApp",
  },
};

export default function ReservationModal({ isOpen, onClose }) {
  const { lang, isRtl } = useAppContext();
  const t = reservationTranslations[lang] || reservationTranslations.en;

  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:30");
  const [notes, setNotes] = useState("");

  // Default date to today
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const guestName = name.trim() || (lang === "tr" ? "Misafir" : "Guest");
    
    let messageLines = [];

    if (lang === "tr") {
      messageLines = [
        "*MASA REZERVASYONU - KARDEŞLER CİHANGİR*",
        "--------------------------------",
        `• *İsim:* ${guestName}`,
        `• *Kişi Sayısı:* ${guests} Kişi`,
        `• *Tarih:* ${date}`,
        `• *Saat:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *Not:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("Lütfen rezervasyonumu onaylayın. Teşekkürler!");
    } else if (lang === "ar") {
      messageLines = [
        "*طلب حجز طاولة - مطعم كارديشلر جيهانكير*",
        "--------------------------------",
        `• *الاسم:* ${guestName}`,
        `• *عدد الأشخاص:* ${guests}`,
        `• *التاريخ:* ${date}`,
        `• *الوقت:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *ملاحظات:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("يرجى تأكيد الحجز، شكراً لكم!");
    } else if (lang === "ru") {
      messageLines = [
        "*БРОНИРОВАНИЕ СТОЛИКА - KARDEŞLER CIHANGIR*",
        "--------------------------------",
        `• *Имя:* ${guestName}`,
        `• *Гостей:* ${guests} чел.`,
        `• *Дата:* ${date}`,
        `• *Время:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *Пожелания:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("Пожалуйста, подтвердите бронирование. Спасибо!");
    } else if (lang === "fa") {
      messageLines = [
        "*درخواست رزرو میز - رستوران کارداشلر جهانگیر*",
        "--------------------------------",
        `• *نام:* ${guestName}`,
        `• *تعداد نفرات:* ${guests} نفر`,
        `• *تاریخ:* ${date}`,
        `• *ساعت:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *یادداشت:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("لطفاً رزرو را تایید بفرمایید. با تشکر!");
    } else if (lang === "fr") {
      messageLines = [
        "*RÉSERVATION DE TABLE - KARDEŞLER CIHANGIR*",
        "--------------------------------",
        `• *Nom:* ${guestName}`,
        `• *Personnes:* ${guests} personnes`,
        `• *Date:* ${date}`,
        `• *Heure:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *Notes:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("Merci de bien vouloir confirmer la réservation !");
    } else {
      messageLines = [
        "*TABLE RESERVATION - KARDEŞLER CIHANGIR*",
        "--------------------------------",
        `• *Name:* ${guestName}`,
        `• *Guests:* ${guests} Guests`,
        `• *Date:* ${date}`,
        `• *Time:* ${time}`,
      ];
      if (notes.trim()) messageLines.push(`• *Notes:* ${notes.trim()}`);
      messageLines.push("--------------------------------");
      messageLines.push("Please confirm the table reservation. Thank you!");
    }

    const message = messageLines.join("\n");
    const whatsappUrl = `https://wa.me/905060453906?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-ink-2 border border-teal-dim/30 shadow-2xl p-6 sm:p-8 text-cream overflow-hidden max-h-[90vh] overflow-y-auto"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Background glow & decorative header */}
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-64 h-24 bg-copper/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-ink/60 border border-teal-dim/30 flex items-center justify-center text-cream-dim hover:text-cream hover:border-gold/50 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/10 border border-copper/30 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
            <span>VIP & Table Booking</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-cream tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.title}
          </h3>
          <p className="text-cream-dim/70 text-xs sm:text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-cream-dim mb-1 flex items-center gap-1.5">
              <User size={14} className="text-teal" />
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-teal-dim/30 text-cream placeholder-cream-dim/30 focus:outline-none focus:border-copper transition-colors text-sm"
            />
          </div>

          {/* Guests and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Guests */}
            <div>
              <label className="block text-xs font-medium text-cream-dim mb-1 flex items-center gap-1.5">
                <Users size={14} className="text-teal" />
                {t.guestsLabel}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-teal-dim/30 text-cream focus:outline-none focus:border-copper transition-colors text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                  <option key={num} value={num} className="bg-ink text-cream">
                    {num} {lang === "tr" ? "Kişi" : lang === "ar" ? "شخص" : lang === "ru" ? "чел." : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-medium text-cream-dim mb-1 flex items-center gap-1.5">
                <Clock size={14} className="text-teal" />
                {t.timeLabel}
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-teal-dim/30 text-cream focus:outline-none focus:border-copper transition-colors text-sm"
              >
                {[
                  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                  "16:00", "17:00", "18:00", "18:30", "19:00", "19:30",
                  "20:00", "20:30", "21:00", "21:30", "22:00", "23:00", "00:00"
                ].map((tStr) => (
                  <option key={tStr} value={tStr} className="bg-ink text-cream">
                    {tStr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-cream-dim mb-1 flex items-center gap-1.5">
              <Calendar size={14} className="text-teal" />
              {t.dateLabel}
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-teal-dim/30 text-cream focus:outline-none focus:border-copper transition-colors text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-cream-dim mb-1">
              {t.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-ink/80 border border-teal-dim/30 text-cream placeholder-cream-dim/30 focus:outline-none focus:border-copper transition-colors text-sm resize-none"
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>{t.submitWhatsApp}</span>
            </button>

            <a
              href="tel:+902122513696"
              className="w-full py-2.5 px-4 rounded-xl glass-card border border-teal-dim/30 text-cream-dim hover:text-cream text-xs font-medium flex items-center justify-center gap-2 hover:border-gold/40 transition-colors"
            >
              <Phone size={14} className="text-gold" />
              <span>{t.directCall}: +90 212 251 36 96</span>
            </a>
          </div>
        </form>

        <p className="text-center text-[11px] text-cream-dim/40 mt-4">
          📍 Firuzağa Mah., Cihangir, Beyoğlu • 09:00 - 02:00
        </p>
      </div>
    </div>
  );
}
