// WhatsApp ordering helpers for Kardeşler Kebap.
//
// The restaurant's WhatsApp number is the same number the site already
// uses everywhere else (ChatWidget, AI assistant prompt, tel: links):
// +90 212 251 36 96.
export const RESTAURANT_WHATSAPP_NUMBER = "902122513696";

const tryFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

// Prices in the WhatsApp message are always in ₺ (TRY) — the live price
// source (/api/prices via getLivePrice) is TRY-denominated and the
// restaurant settles in lira, regardless of the visitor's display currency.
export function formatTRY(amount) {
  return tryFormatter.format(amount);
}

function waUrl(text) {
  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Plain chat link with a short prefilled greeting (sticky bar entry point,
// no cart context).
export function buildWhatsAppChatUrl(greeting) {
  return greeting ? waUrl(greeting) : `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}`;
}

// Cart checkout link: composes a structured order message from the cart.
// - cart: [{ id, qty }] from AppContext
// - getItemName(id): localized dish name (menuT)
// - getLivePrice(item): live TRY unit price or null
// - labels: { title, total, name, address, note } localized strings
// Returns null when the cart is empty or any price is unavailable, so the
// caller can hide the button instead of sending a broken order.
export function buildWhatsAppOrderUrl({ cart, getItemName, getLivePrice, labels }) {
  if (!Array.isArray(cart) || cart.length === 0) return null;

  const lines = [];
  let grandTotal = 0;
  for (const item of cart) {
    const unitPrice = getLivePrice(item);
    if (unitPrice == null) return null;
    const lineTotal = unitPrice * item.qty;
    grandTotal += lineTotal;
    lines.push(`${item.qty} × ${getItemName(item.id)} — ${formatTRY(lineTotal)}`);
  }

  const divider = "———————————";
  const message = [
    `*${labels.title} — Kardeşler Kebap*`,
    divider,
    ...lines,
    divider,
    `*${labels.total}: ${formatTRY(grandTotal)}*`,
    "",
    `${labels.name}:`,
    `${labels.address}:`,
    `${labels.note}:`,
  ].join("\n");

  return waUrl(message);
}
