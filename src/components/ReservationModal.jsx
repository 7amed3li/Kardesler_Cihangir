"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { X, Calendar, Clock, Users, User, MessageCircle, Phone, CheckCircle } from "lucide-react";

// Restaurant WhatsApp number — the same wa.me number used across the site
// (about pages, chat widget, AI system prompt).
const WHATSAPP_NUMBER = "902122513696";
const PHONE_DISPLAY = "+90 212 251 36 96";

// Reservation slots inside opening hours (09:00 – 02:00), every 30 minutes.
function buildAllSlots() {
  const slots = [];
  for (let mins = 9 * 60; mins <= 24 * 60 + 90; mins += 30) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}
const ALL_SLOTS = buildAllSlots();

const LOCALE_TAGS = {
  tr: "tr-TR",
  en: "en-GB",
  ar: "ar",
  ru: "ru-RU",
  fa: "fa-IR",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
  zh: "zh-CN",
};

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const reservationTranslations = {
  tr: {
    title: "Masa Rezervasyonu",
    subtitle: "Kardeşler Cihangir'de yerinizi hemen ayırtın",
    nameLabel: "Adınız Soyadınız",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    phoneLabel: "Telefon Numaranız",
    phonePlaceholder: "Örn: 05xx xxx xx xx",
    guestsLabel: "Kişi Sayısı",
    guestsGroupOption: "11+ (Grup)",
    groupNote: "9 kişi ve üzeri gruplar için detayları telefonda teyit ediyoruz.",
    dateLabel: "Tarih",
    timeLabel: "Saat",
    selectTime: "Saat seçin",
    notesLabel: "Özel İstek / Not (İsteğe bağlı)",
    notesPlaceholder: "Örn: Dış mekan masası, doğum günü vb.",
    submitWhatsApp: "WhatsApp ile Rezervasyon Yap",
    directCall: "Doğrudan Ara",
    orCall: "veya doğrudan arayın",
    instantConfirmation: "Anında onay & rezervasyon",
    messageIntro: "Merhaba, masa rezervasyonu yapmak istiyorum:",
    errorName: "Lütfen adınızı yazın",
    errorPhone: "Lütfen geçerli bir telefon numarası yazın",
    errorDate: "Lütfen geçerli bir tarih seçin",
    errorTime: "Lütfen bir saat seçin",
    sentTitle: "Talebiniz WhatsApp'a Aktarıldı",
    sentBody: "Rezervasyon talebiniz WhatsApp üzerinden iletildi. Onayınız aynı sohbet içinde gönderilecektir.",
    openWhatsAppAgain: "WhatsApp'ı Tekrar Aç",
    doneButton: "Tamam",
    kvkkNotice: "Rezervasyon bilgileriniz, talebinizin karşılanması amacıyla işlenir. Rezervasyonunuzu gönderdiğinizde talebiniz WhatsApp üzerinden işletmemize iletilir; WhatsApp altyapısı yurt dışında bulunduğundan bilgileriniz bu yolla yurt dışına aktarılır. Ayrıntılar için:",
    kvkkLinkLabel: "Aydınlatma Metni",
    notesHint: "Lütfen bu alana sağlık bilgisi (alerji vb.) yazmayınız.",
  },
  en: {
    title: "Table Reservation",
    subtitle: "Reserve your table at Kardeşler Cihangir",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. John Doe",
    phoneLabel: "Your Phone Number",
    phonePlaceholder: "e.g. +90 5xx xxx xx xx",
    guestsLabel: "Guests",
    guestsGroupOption: "11+ (Group)",
    groupNote: "For groups of 9 or more, we confirm the details by phone.",
    dateLabel: "Date",
    timeLabel: "Time",
    selectTime: "Select a time",
    notesLabel: "Special Requests / Notes (Optional)",
    notesPlaceholder: "e.g. Outdoor seating, celebration",
    submitWhatsApp: "Reserve via WhatsApp",
    directCall: "Call Directly",
    orCall: "or call us directly",
    instantConfirmation: "Instant confirmation via WhatsApp",
    messageIntro: "Hello, I would like to reserve a table:",
    errorName: "Please enter your name",
    errorPhone: "Please enter a valid phone number",
    errorDate: "Please choose a valid date",
    errorTime: "Please select a time",
    sentTitle: "Your Request Was Sent to WhatsApp",
    sentBody: "Your reservation request has been passed to WhatsApp. Your confirmation will be sent in the same chat.",
    openWhatsAppAgain: "Open WhatsApp Again",
    doneButton: "Done",
    kvkkNotice: "Your reservation details are processed so we can fulfil your request. When you send your reservation, your request is transmitted to us via WhatsApp; as WhatsApp's infrastructure is located abroad, your details are transferred abroad through this channel. For details, see:",
    kvkkLinkLabel: "Information Notice",
    notesHint: "Please do not enter health information (allergies, etc.) in this field.",
  },
  ar: {
    title: "حجز طاولة",
    subtitle: "احجز طاولتك في مطعم كارديشلر جيهانكير",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: أحمد محمد",
    phoneLabel: "رقم هاتفك",
    phonePlaceholder: "مثال: ‎+90 5xx xxx xx xx",
    guestsLabel: "عدد الأشخاص",
    guestsGroupOption: "11+ (مجموعة)",
    groupNote: "للمجموعات من 9 أشخاص فأكثر، نؤكد التفاصيل عبر الهاتف.",
    dateLabel: "التاريخ",
    timeLabel: "الوقت",
    selectTime: "اختر الوقت",
    notesLabel: "طلبات خاصة / ملاحظات (اختياري)",
    notesPlaceholder: "مثال: طاولة خارجية، مناسبة خاصة",
    submitWhatsApp: "تأكيد الحجز عبر واتساب",
    directCall: "اتصال مباشر",
    orCall: "أو اتصل بنا مباشرة",
    instantConfirmation: "تأكيد فوري عبر واتساب",
    messageIntro: "مرحباً، أود حجز طاولة:",
    errorName: "يرجى إدخال الاسم",
    errorPhone: "يرجى إدخال رقم هاتف صحيح",
    errorDate: "يرجى اختيار تاريخ صحيح",
    errorTime: "يرجى اختيار الوقت",
    sentTitle: "تم إرسال طلبك إلى واتساب",
    sentBody: "تم إرسال طلب الحجز عبر واتساب، وسيصلك التأكيد في نفس المحادثة.",
    openWhatsAppAgain: "فتح واتساب مجدداً",
    doneButton: "تم",
    kvkkNotice: "تُعالج بيانات حجزك لغرض تلبية طلبك. عند إرسال حجزك، يُرسل طلبك إلينا عبر واتساب؛ وبما أن البنية التحتية لواتساب موجودة خارج البلاد، تُنقل بياناتك إلى الخارج عبر هذه القناة. للتفاصيل، راجع:",
    kvkkLinkLabel: "نص الإفصاح",
    notesHint: "يرجى عدم كتابة معلومات صحية (حساسية وغيرها) في هذا الحقل.",
  },
  ru: {
    title: "Бронирование Столика",
    subtitle: "Забронируйте столик в Kardeşler Cihangir",
    nameLabel: "Ваше Имя",
    namePlaceholder: "например, Иван Петров",
    phoneLabel: "Ваш номер телефона",
    phonePlaceholder: "например, +90 5xx xxx xx xx",
    guestsLabel: "Количество гостей",
    guestsGroupOption: "11+ (группа)",
    groupNote: "Для групп от 9 человек мы подтверждаем детали по телефону.",
    dateLabel: "Дата",
    timeLabel: "Время",
    selectTime: "Выберите время",
    notesLabel: "Пожелания (необязательно)",
    notesPlaceholder: "например, столик на веранде",
    submitWhatsApp: "Забронировать в WhatsApp",
    directCall: "Позвонить",
    orCall: "или позвоните нам напрямую",
    instantConfirmation: "Мгновенное подтверждение в WhatsApp",
    messageIntro: "Здравствуйте, я хотел(а) бы забронировать столик:",
    errorName: "Пожалуйста, укажите имя",
    errorPhone: "Пожалуйста, укажите корректный номер телефона",
    errorDate: "Пожалуйста, выберите корректную дату",
    errorTime: "Пожалуйста, выберите время",
    sentTitle: "Ваш запрос отправлен в WhatsApp",
    sentBody: "Ваш запрос на бронирование передан в WhatsApp. Подтверждение придёт в том же чате.",
    openWhatsAppAgain: "Открыть WhatsApp снова",
    doneButton: "Готово",
    kvkkNotice: "Данные вашего бронирования обрабатываются для выполнения вашего запроса. При отправке бронирования ваш запрос передаётся нам через WhatsApp; поскольку инфраструктура WhatsApp находится за рубежом, ваши данные при этом передаются за границу. Подробнее см.:",
    kvkkLinkLabel: "Информационное уведомление",
    notesHint: "Пожалуйста, не указывайте в этом поле сведения о здоровье (аллергии и т. п.).",
  },
  fa: {
    title: "رزرو میز",
    subtitle: "میز خود را در رستوران کارداشلر جهانگیر رزرو کنید",
    nameLabel: "نام و نام خانوادگی",
    namePlaceholder: "مثال: علی رضایی",
    phoneLabel: "شماره تلفن شما",
    phonePlaceholder: "مثال: ‎+90 5xx xxx xx xx",
    guestsLabel: "تعداد نفرات",
    guestsGroupOption: "11+ (گروه)",
    groupNote: "برای گروه‌های ۹ نفر به بالا، جزئیات را تلفنی تأیید می‌کنیم.",
    dateLabel: "تاریخ",
    timeLabel: "ساعت",
    selectTime: "ساعت را انتخاب کنید",
    notesLabel: "درخواست خاص (اختیاری)",
    notesPlaceholder: "مثال: میز در فضای باز",
    submitWhatsApp: "رزرو از طریق واتس‌اپ",
    directCall: "تماس مستقیم",
    orCall: "یا مستقیم با ما تماس بگیرید",
    instantConfirmation: "تایید فوری از طریق واتس‌اپ",
    messageIntro: "سلام، می‌خواهم یک میز رزرو کنم:",
    errorName: "لطفاً نام خود را وارد کنید",
    errorPhone: "لطفاً شماره تلفن معتبر وارد کنید",
    errorDate: "لطفاً تاریخ معتبری انتخاب کنید",
    errorTime: "لطفاً ساعت را انتخاب کنید",
    sentTitle: "درخواست شما به واتس‌اپ ارسال شد",
    sentBody: "درخواست رزرو شما از طریق واتس‌اپ ارسال شد. تأییدیه در همان گفتگو برایتان فرستاده می‌شود.",
    openWhatsAppAgain: "باز کردن دوباره واتس‌اپ",
    doneButton: "تمام",
    kvkkNotice: "اطلاعات رزرو شما برای انجام درخواستتان پردازش می‌شود. هنگام ارسال رزرو، درخواست شما از طریق واتس‌اپ برای ما ارسال می‌شود؛ از آنجا که زیرساخت واتس‌اپ در خارج از کشور قرار دارد، اطلاعات شما از این طریق به خارج از کشور منتقل می‌شود. برای جزئیات، به این متن مراجعه کنید:",
    kvkkLinkLabel: "متن اطلاع‌رسانی",
    notesHint: "لطفاً در این قسمت اطلاعات سلامتی (حساسیت و غیره) ننویسید.",
  },
  fr: {
    title: "Réservation de Table",
    subtitle: "Réservez votre table chez Kardeşler Cihangir",
    nameLabel: "Nom Complet",
    namePlaceholder: "ex: Jean Dupont",
    phoneLabel: "Votre numéro de téléphone",
    phonePlaceholder: "ex : +90 5xx xxx xx xx",
    guestsLabel: "Nombre de personnes",
    guestsGroupOption: "11+ (groupe)",
    groupNote: "Pour les groupes de 9 personnes ou plus, nous confirmons les détails par téléphone.",
    dateLabel: "Date",
    timeLabel: "Heure",
    selectTime: "Choisissez un horaire",
    notesLabel: "Demandes particulières (Optionnel)",
    notesPlaceholder: "ex: Terrasse, anniversaire",
    submitWhatsApp: "Réserver via WhatsApp",
    directCall: "Appeler directement",
    orCall: "ou appelez-nous directement",
    instantConfirmation: "Confirmation instantanée par WhatsApp",
    messageIntro: "Bonjour, je souhaite réserver une table :",
    errorName: "Veuillez saisir votre nom",
    errorPhone: "Veuillez saisir un numéro de téléphone valide",
    errorDate: "Veuillez choisir une date valide",
    errorTime: "Veuillez choisir un horaire",
    sentTitle: "Votre demande a été envoyée sur WhatsApp",
    sentBody: "Votre demande de réservation a été transmise sur WhatsApp. Votre confirmation sera envoyée dans la même conversation.",
    openWhatsAppAgain: "Rouvrir WhatsApp",
    doneButton: "Terminé",
    kvkkNotice: "Les informations de votre réservation sont traitées afin de répondre à votre demande. Lorsque vous envoyez votre réservation, votre demande nous est transmise via WhatsApp ; l'infrastructure de WhatsApp étant située à l'étranger, vos informations sont ainsi transférées à l'étranger. Pour plus de détails, consultez la :",
    kvkkLinkLabel: "Notice d'information",
    notesHint: "Veuillez ne pas indiquer d'informations de santé (allergies, etc.) dans ce champ.",
  },
  de: {
    title: "Tischreservierung",
    subtitle: "Reservieren Sie Ihren Tisch im Kardeşler Cihangir",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "z.B. Max Mustermann",
    phoneLabel: "Ihre Telefonnummer",
    phonePlaceholder: "z.B. +90 5xx xxx xx xx",
    guestsLabel: "Gästeanzahl",
    guestsGroupOption: "11+ (Gruppe)",
    groupNote: "Bei Gruppen ab 9 Personen bestätigen wir die Details telefonisch.",
    dateLabel: "Datum",
    timeLabel: "Uhrzeit",
    selectTime: "Uhrzeit wählen",
    notesLabel: "Besondere Wünsche / Notizen (Optional)",
    notesPlaceholder: "z.B. Außensitzplatz, Geburtstag",
    submitWhatsApp: "Über WhatsApp reservieren",
    directCall: "Direkt anrufen",
    orCall: "oder rufen Sie uns direkt an",
    instantConfirmation: "Sofortige Bestätigung über WhatsApp",
    messageIntro: "Hallo, ich möchte einen Tisch reservieren:",
    errorName: "Bitte geben Sie Ihren Namen ein",
    errorPhone: "Bitte geben Sie eine gültige Telefonnummer ein",
    errorDate: "Bitte wählen Sie ein gültiges Datum",
    errorTime: "Bitte wählen Sie eine Uhrzeit",
    sentTitle: "Ihre Anfrage wurde an WhatsApp gesendet",
    sentBody: "Ihre Reservierungsanfrage wurde per WhatsApp übermittelt. Ihre Bestätigung erhalten Sie im selben Chat.",
    openWhatsAppAgain: "WhatsApp erneut öffnen",
    doneButton: "Fertig",
    kvkkNotice: "Ihre Reservierungsdaten werden verarbeitet, um Ihre Anfrage zu erfüllen. Wenn Sie Ihre Reservierung senden, wird Ihre Anfrage uns über WhatsApp übermittelt; da sich die WhatsApp-Infrastruktur im Ausland befindet, werden Ihre Daten auf diesem Weg ins Ausland übertragen. Einzelheiten finden Sie im:",
    kvkkLinkLabel: "Aufklärungstext",
    notesHint: "Bitte geben Sie in diesem Feld keine Gesundheitsdaten (Allergien usw.) an.",
  },
  it: {
    title: "Prenotazione Tavolo",
    subtitle: "Prenota il tuo tavolo da Kardeşler Cihangir",
    nameLabel: "Nome Completo",
    namePlaceholder: "es: Mario Rossi",
    phoneLabel: "Il tuo numero di telefono",
    phonePlaceholder: "es: +90 5xx xxx xx xx",
    guestsLabel: "Numero di ospiti",
    guestsGroupOption: "11+ (gruppo)",
    groupNote: "Per gruppi di 9 o più persone, confermiamo i dettagli per telefono.",
    dateLabel: "Data",
    timeLabel: "Ora",
    selectTime: "Seleziona un orario",
    notesLabel: "Richieste particolari / Note (Opzionale)",
    notesPlaceholder: "es: Tavolo all'aperto, festa",
    submitWhatsApp: "Prenota su WhatsApp",
    directCall: "Chiama direttamente",
    orCall: "oppure chiamaci direttamente",
    instantConfirmation: "Conferma immediata via WhatsApp",
    messageIntro: "Buongiorno, vorrei prenotare un tavolo:",
    errorName: "Inserisci il tuo nome",
    errorPhone: "Inserisci un numero di telefono valido",
    errorDate: "Scegli una data valida",
    errorTime: "Seleziona un orario",
    sentTitle: "La tua richiesta è stata inviata su WhatsApp",
    sentBody: "La tua richiesta di prenotazione è stata inoltrata su WhatsApp. La conferma arriverà nella stessa chat.",
    openWhatsAppAgain: "Riapri WhatsApp",
    doneButton: "Fatto",
    kvkkNotice: "I dati della sua prenotazione vengono trattati per evadere la sua richiesta. Quando invia la prenotazione, la sua richiesta ci viene trasmessa tramite WhatsApp; poiché l'infrastruttura di WhatsApp si trova all'estero, i suoi dati vengono trasferiti all'estero tramite questo canale. Per i dettagli, consultare l':",
    kvkkLinkLabel: "Informativa",
    notesHint: "Si prega di non inserire informazioni sanitarie (allergie, ecc.) in questo campo.",
  },
  es: {
    title: "Reserva de Mesa",
    subtitle: "Reserva tu mesa en Kardeşler Cihangir",
    nameLabel: "Nombre Completo",
    namePlaceholder: "ej: Juan Pérez",
    phoneLabel: "Tu número de teléfono",
    phonePlaceholder: "ej: +90 5xx xxx xx xx",
    guestsLabel: "Número de personas",
    guestsGroupOption: "11+ (grupo)",
    groupNote: "Para grupos de 9 o más personas, confirmamos los detalles por teléfono.",
    dateLabel: "Fecha",
    timeLabel: "Hora",
    selectTime: "Selecciona una hora",
    notesLabel: "Peticiones especiales / Notas (Opcional)",
    notesPlaceholder: "ej: Mesa exterior, aniversario",
    submitWhatsApp: "Reservar por WhatsApp",
    directCall: "Llamar directamente",
    orCall: "o llámanos directamente",
    instantConfirmation: "Confirmación inmediata por WhatsApp",
    messageIntro: "Hola, quiero reservar una mesa:",
    errorName: "Introduce tu nombre",
    errorPhone: "Introduce un número de teléfono válido",
    errorDate: "Elige una fecha válida",
    errorTime: "Selecciona una hora",
    sentTitle: "Tu solicitud se envió a WhatsApp",
    sentBody: "Tu solicitud de reserva se envió por WhatsApp. Recibirás la confirmación en el mismo chat.",
    openWhatsAppAgain: "Abrir WhatsApp de nuevo",
    doneButton: "Listo",
    kvkkNotice: "Los datos de su reserva se tratan para atender su solicitud. Al enviar su reserva, su solicitud se nos transmite por WhatsApp; dado que la infraestructura de WhatsApp se encuentra en el extranjero, sus datos se transfieren al extranjero por esta vía. Para más detalles, consulte el:",
    kvkkLinkLabel: "Texto de información",
    notesHint: "Por favor, no escriba información de salud (alergias, etc.) en este campo.",
  },
  zh: {
    title: "餐位预订",
    subtitle: "在 Kardeşler Cihangir 预订您的专属餐位",
    nameLabel: "姓名",
    namePlaceholder: "例如：张先生",
    phoneLabel: "您的电话号码",
    phonePlaceholder: "例如：+90 5xx xxx xx xx",
    guestsLabel: "用餐人数",
    guestsGroupOption: "11+（团体）",
    groupNote: "9人或以上团体，我们会通过电话确认细节。",
    dateLabel: "日期",
    timeLabel: "时间",
    selectTime: "请选择时间",
    notesLabel: "特殊要求 / 备注（选填）",
    notesPlaceholder: "例如：室外座位、生日聚会",
    submitWhatsApp: "通过 WhatsApp 预订",
    directCall: "直接致电",
    orCall: "或直接致电我们",
    instantConfirmation: "通过 WhatsApp 快速确认",
    messageIntro: "您好，我想预订一张餐桌：",
    errorName: "请输入您的姓名",
    errorPhone: "请输入有效的电话号码",
    errorDate: "请选择有效日期",
    errorTime: "请选择时间",
    sentTitle: "您的请求已发送至 WhatsApp",
    sentBody: "您的预订请求已通过 WhatsApp 发送，确认信息将在同一聊天中回复。",
    openWhatsAppAgain: "重新打开 WhatsApp",
    doneButton: "完成",
    kvkkNotice: "您的预订信息仅用于处理您的请求。提交预订时，您的请求将通过 WhatsApp 发送给我们；由于 WhatsApp 的基础设施位于境外，您的信息将由此传输至境外。详情请参阅：",
    kvkkLinkLabel: "信息告知文本",
    notesHint: "请勿在此栏填写健康信息（如过敏等）。",
  },
};

const inputClass =
  "w-full rounded-xl border border-[#9C7A3F]/30 bg-white/70 px-4 py-3 text-sm text-[#2B2620] placeholder:text-[#7A7364]/70 focus:outline-none focus:border-[#9C7A3F] focus:ring-2 focus:ring-[#9C7A3F]/25 transition";
const labelClass =
  "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A7364] mb-1.5";
const errorClass = "text-[#B3261E] text-xs font-semibold mt-1.5";

export default function ReservationModal({ isOpen, onClose }) {
  const { lang, isRtl, t: appT } = useAppContext();
  const t = reservationTranslations[lang] || reservationTranslations.en;

  const todayISO = useMemo(() => toISODate(new Date()), []);
  const maxISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return toISODate(d);
  }, []);

  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);

  // Sensible defaults each time the modal opens: today + a clean slate.
  // (Render-time state adjustment — the pattern React recommends for
  // reacting to a prop change, instead of setState inside an effect.)
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setDate((prev) => prev || todayISO);
      setSentUrl(null);
      setErrors({});
    }
  }

  // Slots for the chosen day — for today, drop slots less than ~45 min away.
  const availableSlots = useMemo(() => {
    if (!date) return ALL_SLOTS;
    if (date !== todayISO) return ALL_SLOTS;
    const now = new Date();
    const cutoff = now.getTime() + 45 * 60 * 1000;
    return ALL_SLOTS.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
      // Slots past midnight (00:00–01:30) belong to tonight's service.
      if (h < 9) slotDate.setDate(slotDate.getDate() + 1);
      return slotDate.getTime() > cutoff;
    });
  }, [date, todayISO]);

  // If the chosen day makes the selected time unavailable (e.g. a slot that
  // has since passed today), the select falls back to its placeholder and
  // submit-time validation asks for a new pick.
  const effectiveTime = availableSlots.includes(time) ? time : "";

  // Escape to close + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDateLong = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    const local = new Date(y, m - 1, d);
    try {
      return new Intl.DateTimeFormat(LOCALE_TAGS[lang] || "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(local);
    } catch (_) {
      return iso;
    }
  };

  const buildMessage = () => {
    const guestsText = guests === "11+" ? t.guestsGroupOption : guests;
    const lines = [
      t.messageIntro,
      `• ${t.nameLabel}: ${name.trim()}`,
      `• ${t.dateLabel}: ${formatDateLong(date)}`,
      `• ${t.timeLabel}: ${effectiveTime}`,
      `• ${t.guestsLabel}: ${guestsText}`,
      `• ${t.phoneLabel}: ${phone.trim()}`,
    ];
    if (notes.trim()) lines.push(`• ${t.notesLabel}: ${notes.trim()}`);
    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (name.trim().length < 2) nextErrors.name = t.errorName;
    if (phone.replace(/\D/g, "").length < 7) nextErrors.phone = t.errorPhone;
    if (!date || date < todayISO || date > maxISO) nextErrors.date = t.errorDate;
    if (!effectiveTime) nextErrors.time = t.errorTime;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#F7F2E7] border border-[#9C7A3F]/30 shadow-xl p-6 sm:p-8 text-[#2B2620] overflow-hidden max-h-[90vh] overflow-y-auto"
        dir={isRtl ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
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
            <span>{appT?.vipBooking || "VIP & Table Booking"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2B2620] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.title}
          </h3>
          <p className="text-[#7A7364] text-xs sm:text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            {t.subtitle}
          </p>
        </div>

        {sentUrl ? (
          /* ── Sent state: request handed to WhatsApp, confirmation follows in-chat ── */
          <div className="text-center space-y-4 pb-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#4E5F4C]/15 border border-[#4E5F4C]/30 flex items-center justify-center text-[#4E5F4C]">
              <CheckCircle size={28} />
            </div>
            <h4 className="text-lg font-black text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
              {t.sentTitle}
            </h4>
            <div className="bg-[#EDE3CE] border border-[#9C7A3F]/20 rounded-xl px-4 py-3 text-sm font-semibold text-[#2B2620] space-y-1" style={{ fontFamily: "var(--font-inter)" }}>
              <p>{formatDateLong(date)} • {effectiveTime}</p>
              <p>{t.guestsLabel}: {guests === "11+" ? t.guestsGroupOption : guests} • {name}</p>
            </div>
            <p className="text-[#7A7364] text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              {t.sentBody}
            </p>
            <div className="space-y-2.5 pt-1">
              <a
                href={sentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors shadow-lg"
              >
                <MessageCircle size={19} />
                <span>{t.openWhatsAppAgain}</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-xl bg-transparent border-2 border-[#9C7A3F]/50 text-[#2B2620] font-bold text-sm tracking-wider uppercase hover:bg-[#EDE3CE] transition-colors"
              >
                {t.doneButton}
              </button>
            </div>
          </div>
        ) : (
          /* ── Reservation form ── */
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Guests */}
            <div>
              <label htmlFor="res-guests" className={labelClass}>
                <Users size={14} className="text-[#9C7A3F]" />
                {t.guestsLabel}
              </label>
              <select
                id="res-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={String(n)}>{n}</option>
                ))}
                <option value="11+">{t.guestsGroupOption}</option>
              </select>
              {(Number(guests) >= 9 || guests === "11+") && (
                <p className="text-[#7A7364] text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {t.groupNote}
                </p>
              )}
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="res-date" className={labelClass}>
                  <Calendar size={14} className="text-[#9C7A3F]" />
                  {t.dateLabel}
                </label>
                <input
                  id="res-date"
                  type="date"
                  value={date}
                  min={todayISO}
                  max={maxISO}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
                {errors.date && <p className={errorClass}>{errors.date}</p>}
              </div>
              <div>
                <label htmlFor="res-time" className={labelClass}>
                  <Clock size={14} className="text-[#9C7A3F]" />
                  {t.timeLabel}
                </label>
                <select
                  id="res-time"
                  value={effectiveTime}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t.selectTime}</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time && <p className={errorClass}>{errors.time}</p>}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="res-name" className={labelClass}>
                <User size={14} className="text-[#9C7A3F]" />
                {t.nameLabel}
              </label>
              <input
                id="res-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className={inputClass}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="res-phone" className={labelClass}>
                <Phone size={14} className="text-[#9C7A3F]" />
                {t.phoneLabel}
              </label>
              <input
                id="res-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className={inputClass}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="res-notes" className={labelClass}>
                <MessageCircle size={14} className="text-[#9C7A3F]" />
                {t.notesLabel}
              </label>
              <textarea
                id="res-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className={`${inputClass} resize-none`}
              />
              {/* Sensitive-data hint: free-text notes must not be used
                  for health data (KVKK Art. 6). */}
              <p className="text-[#7A7364] text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                {t.notesHint}
              </p>
            </div>

            {/* Submit via WhatsApp */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <MessageCircle size={22} />
                <span>{t.submitWhatsApp}</span>
              </button>
              {/* KVKK short notice (Art. 10) — information only, no
                  consent checkbox: reservation data rests on Art. 5/2-c. */}
              <p className="text-start text-[11px] leading-relaxed text-[#7A7364]" style={{ fontFamily: "var(--font-inter)" }}>
                {t.kvkkNotice}{" "}
                <Link
                  href={lang === "en" ? "/kvkk" : `/${lang}/kvkk`}
                  className="font-semibold text-[#9C7A3F] underline underline-offset-2 hover:text-[#2B2620] transition-colors"
                >
                  {t.kvkkLinkLabel}
                </Link>
              </p>
              <p className="text-center text-xs text-[#7A7364] flex items-center justify-center gap-1.5">
                <CheckCircle size={13} className="text-[#4E5F4C]" />
                {t.instantConfirmation}
                <span aria-hidden="true">•</span>
                <a href="tel:+902122513696" dir="ltr" className="font-semibold text-[#2B2620] hover:text-[#9C7A3F] transition-colors [unicode-bidi:isolate] whitespace-nowrap">
                  {t.orCall}: {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </form>
        )}

        <p className="text-center text-[11px] text-[#7A7364] mt-4 flex items-center justify-center gap-1">
          <span>Firuzağa Mah., Cihangir, Beyoğlu • 09:00 - 02:00</span>
        </p>
      </div>
    </div>
  );
}
