// WhatsApp ordering helpers for Kardeşler Kebap.
//
// The restaurant's WhatsApp number is the same number the site already
// uses everywhere else (tel: links, reservation flow):
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
// - cart: [{ id, qty, portion? }] from AppContext (lines are keyed by
//   dish + portion, so the same dish can appear at several portions)
// - getItemName(id): localized dish name (menuT)
// - getLivePrice(item): live TRY unit price (base portion) or null
// - getUnitPrice(item) (optional): portion-aware TRY unit price or null;
//   when provided it replaces getLivePrice so Duble/Yarım lines are
//   priced — and totalled — correctly in the message.
// - getPortionLabel(item) (optional): localized portion label for
//   non-default portions (e.g. "Duble"), appended to the dish name so
//   the restaurant sees which portion each line is.
// - labels: { title, total, name, phone, address, note, payment } localized
//   strings
// - payment (optional): localized payment-method value chosen in the cart
//   (e.g. "Kapıda Nakit Ödeme"); when provided it is added as its own line
//   under the total so the restaurant knows whether to send the card
//   terminal with the courier.
// - delivery (optional): { name, phone, address, note } from the cart's
//   delivery-address form. When provided, the contact lines at the end of
//   the message are filled from it (the note line only when a note was
//   given); when absent, the legacy blank Name/Address/Note lines are
//   emitted for the customer to fill in by hand.
// Returns null when the cart is empty or any price is unavailable, so the
// caller can hide the button instead of sending a broken order.
export function buildWhatsAppOrderUrl({ cart, getItemName, getLivePrice, getUnitPrice, getPortionLabel, labels, payment, delivery }) {
  if (!Array.isArray(cart) || cart.length === 0) return null;

  const lines = [];
  let grandTotal = 0;
  for (const item of cart) {
    const unitPrice = getUnitPrice ? getUnitPrice(item) : getLivePrice(item);
    if (unitPrice == null) return null;
    const lineTotal = unitPrice * item.qty;
    grandTotal += lineTotal;
    const portionLabel = getPortionLabel ? getPortionLabel(item) : null;
    const name = portionLabel ? `${getItemName(item.id)} (${portionLabel})` : getItemName(item.id);
    lines.push(`${item.qty} × ${name} — ${formatTRY(lineTotal)}`);
  }

  const contactLines = delivery
    ? [
        `${labels.name}: ${delivery.name}`,
        ...(delivery.phone ? [`${labels.phone}: ${delivery.phone}`] : []),
        `${labels.address}: ${delivery.address}`,
        ...(delivery.note ? [`${labels.note}: ${delivery.note}`] : []),
      ]
    : [`${labels.name}:`, `${labels.address}:`, `${labels.note}:`];

  const divider = "———————————";
  const message = [
    `*${labels.title} — Kardeşler Kebap*`,
    divider,
    ...lines,
    divider,
    `*${labels.total}: ${formatTRY(grandTotal)}*`,
    ...(payment ? [`${labels.payment}: ${payment}`] : []),
    "",
    ...contactLines,
  ].join("\n");

  return waUrl(message);
}
