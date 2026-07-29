import { menuTranslations } from "../i18n/translations";

const WHATSAPP_NUMBER = "905060453906";

export function generateWhatsAppLink(cart, lang = "tr") {
  const menuT = menuTranslations[lang] || menuTranslations["tr"];
  const menuTFallback = menuTranslations["tr"];

  const lines = cart.map((item) => {
    const name =
      menuT.items?.[item.id]?.name ||
      menuTFallback.items?.[item.id]?.name ||
      item.id;
    const subtotal = Math.round(item.price * item.qty);
    return `- ${item.qty}x *${name}* (${subtotal} TL)`;
  });

  const total = Math.round(
    cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  const message = [
    "*** YENI SIPARIS - KARDESLER CIHANGIR ***",
    "",
    "SIPARIS DETAYLARI:",
    "------------------------",
    ...lines,
    "------------------------",
    "",
    `TOPLAM TUTAR: *${total} TL*`,
    "",
    "Lutfen siparisimi onaylayin. Tesekkurler!"
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
