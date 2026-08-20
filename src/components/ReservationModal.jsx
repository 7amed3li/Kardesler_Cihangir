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
    const whatsappUrl = `https://wa.me/902122513696?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-xl p-6 sm:p-8 text-[#2B2620] overflow-hidden max-h-[90vh] overflow-y-auto"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/20 flex items-center justify-center text-[#2B2620] hover:text-[#9C7A3F] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#9C7A3F]/15 border border-[#9C7A3F]/30 text-[#9C7A3F] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3F]"></span>
            <span>VIP & Table Booking</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2B2620] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.title}
          </h3>
          <p className="text-[#7A7364] text-xs sm:text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#7A7364] mb-1 flex items-center gap-1.5">
              <User size={14} className="text-[#4E5F4C]" />
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2.5 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] placeholder-[#7A7364]/60 focus:outline-none focus:border-[#9C7A3F] transition-colors text-sm"
            />
          </div>

          {/* Guests and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold text-[#7A7364] mb-1 flex items-center gap-1.5">
                <Users size={14} className="text-[#4E5F4C]" />
                {t.guestsLabel}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] focus:outline-none focus:border-[#9C7A3F] transition-colors text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                  <option key={num} value={num} className="bg-[#EDE3CE] text-[#2B2620]">
                    {num} {lang === "tr" ? "Kişi" : lang === "ar" ? "شخص" : lang === "ru" ? "чел." : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-semibold text-[#7A7364] mb-1 flex items-center gap-1.5">
                <Clock size={14} className="text-[#4E5F4C]" />
                {t.timeLabel}
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] focus:outline-none focus:border-[#9C7A3F] transition-colors text-sm"
              >
                {[
                  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                  "16:00", "17:00", "18:00", "18:30", "19:00", "19:30",
                  "20:00", "20:30", "21:00", "21:30", "22:00", "23:00", "00:00"
                ].map((tStr) => (
                  <option key={tStr} value={tStr} className="bg-[#EDE3CE] text-[#2B2620]">
                    {tStr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-[#7A7364] mb-1 flex items-center gap-1.5">
              <Calendar size={14} className="text-[#4E5F4C]" />
              {t.dateLabel}
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] focus:outline-none focus:border-[#9C7A3F] transition-colors text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#7A7364] mb-1">
              {t.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] placeholder-[#7A7364]/60 focus:outline-none focus:border-[#9C7A3F] transition-colors text-sm resize-none"
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-md bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={16} />
              <span>{t.whatsappButton || "WhatsApp İle Rezerve Et"}</span>
            </button>

            <a
              href="tel:+902122513696"
              className="w-full py-2.5 px-4 rounded-md bg-[#EDE3CE] border border-[#9C7A3F]/30 text-[#2B2620] hover:bg-[#9C7A3F] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={14} className="text-[#9C7A3F]" />
              <span>{t.directCall}: +90 212 251 36 96</span>
            </a>
          </div>
        </form>

        <p className="text-center text-[11px] text-[#7A7364] mt-4 flex items-center justify-center gap-1">
          <span>Firuzağa Mah., Cihangir, Beyoğlu • 09:00 - 02:00</span>
        </p>
      </div>
    </div>
  );
}
