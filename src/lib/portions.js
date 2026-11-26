import { menuData } from "../data/menuData";

/**
 * Portion options for menu dishes.
 *
 * Owner spec (narrowed 2026-11-25):
 *  - The [1 | 1,5 | Duble] selector exists ONLY on kebab / ocakbaşı,
 *    pide, lahmacun and dürüm dishes (see PORTION_CATEGORY_IDS below).
 *    Price = base price x multiplier.
 *  - Soups ONLY get a half option (0.5x, "Yarım") instead — no 1.5x/2x
 *    for soups, and no half option for non-soups. They keep
 *    [Yarım | Tam] even though they live in the breakfast category
 *    (see audit note below).
 *  - EVERYTHING else gets NO portion options at all — breakfast,
 *    mezes, salads, desserts, drinks and every other category are
 *    sold at the base price only.
 *
 * Soup detection — data audit note:
 *  menuData.js has NO soup category, and neither does the database
 *  (items.category_id is copied from menuData category ids — see
 *  src/lib/adminMenuItems.js). The soups sold on the site are items
 *  inside the "kahvalti" (Breakfast) category whose ids carry the
 *  "corba" marker: "sehriyeli_tavuk_corbasi" and
 *  "ezogelin_mercimek_corbasi" ("kuzu_gerdan_corba" exists in the i18n
 *  files and would be picked up automatically if it is ever added to
 *  menuData). The set below is therefore derived from the menu data
 *  itself — not from display names — and stays correct if more soups
 *  are added with the same id convention.
 */
const SOUP_ITEM_IDS = new Set(
  menuData
    .flatMap((cat) => cat.items || [])
    .map((item) => item.id)
    .filter((id) => typeof id === "string" && id.includes("corba"))
);

export function isSoupItem(itemId) {
  return SOUP_ITEM_IDS.has(itemId);
}

/** Item id -> category id, derived from menuData (same source as the soup set). */
const ITEM_CATEGORY_IDS = new Map(
  menuData.flatMap((cat) =>
    (cat.items || [])
      .filter((item) => item && typeof item.id === "string")
      .map((item) => [item.id, cat.id])
  )
);

/**
 * Categories that carry the standard [1 | 1,5 | Duble] portions
 * (owner rule, 2026-11-25). Category ids are the real menuData ids:
 *  - "kebap"            kebab / ocakbaşı mains
 *  - "durumler"         dürüm wraps
 *  - "pide"             pide
 *  - "lahmacun"         lahmacun & etli ekmek
 * "ozel_menu" and "mezeli_kebaplar" carried portions briefly but the
 * owner ordered them removed the same day — those dishes are sold at
 * the base price only. Any category not listed here (kahvalti, meze,
 * salata, tatli, soguk_icecek, sicak_icecek, ozel_menu,
 * mezeli_kebaplar) gets no standard portions.
 */
const PORTION_CATEGORY_IDS = new Set([
  "kebap",
  "durumler",
  "pide",
  "lahmacun",
]);

export function hasStandardPortions(itemId) {
  return PORTION_CATEGORY_IDS.has(ITEM_CATEGORY_IDS.get(itemId));
}

export const DEFAULT_PORTION = "full";

/** Portion key -> price multiplier. */
export const PORTION_MULTIPLIERS = {
  half: 0.5,
  full: 1,
  oneHalf: 1.5,
  double: 2,
};

/**
 * Turkish portion labels — kitchen language (owner ruling 2026-11-26:
 * "what's in the cart is Turkish only"). The cart drawer and the
 * WhatsApp order message ALWAYS use these strings, whatever the UI
 * locale is; menu pages keep their localized labels. Keep in sync
 * with the "portions" block of src/i18n/locales/tr.json.
 */
export const PORTION_LABELS_TR = {
  label: "Porsiyon",
  half: "Yarım",
  full: "1 Porsiyon",
  oneHalf: "1,5 Porsiyon",
  double: "Duble",
};

const STANDARD_OPTIONS = [
  { key: "full", mult: PORTION_MULTIPLIERS.full },
  { key: "oneHalf", mult: PORTION_MULTIPLIERS.oneHalf },
  { key: "double", mult: PORTION_MULTIPLIERS.double },
];

const SOUP_OPTIONS = [
  { key: "half", mult: PORTION_MULTIPLIERS.half },
  { key: "full", mult: PORTION_MULTIPLIERS.full },
];

/** No portion options — the dish is sold at its base price only. */
const NO_OPTIONS = [];

/**
 * Ordered portion options available for a dish.
 * Soups are checked first so they keep [Yarım | Tam] even though they
 * sit in the breakfast category; only the allowed grill/pide/lahmacun/
 * dürüm categories get the standard options; everything else gets none.
 */
export function getPortionOptions(itemId) {
  if (isSoupItem(itemId)) return SOUP_OPTIONS;
  if (hasStandardPortions(itemId)) return STANDARD_OPTIONS;
  return NO_OPTIONS;
}

/** True when the portion key is a valid option for this dish. */
export function isValidPortion(itemId, portion) {
  return getPortionOptions(itemId).some((opt) => opt.key === portion);
}

/** Fall back to the default portion when a stored/unknown key is invalid for the dish. */
export function normalizePortion(itemId, portion) {
  return portion && isValidPortion(itemId, portion) ? portion : DEFAULT_PORTION;
}

/**
 * Unit price for a portion, in TRY.
 * Rounding rule: multiply the base price by the portion multiplier, then
 * round to the nearest whole lira — applied per unit price, consistently
 * in the menu card, the cart and the order summary.
 */
export function portionUnitPrice(basePrice, portion) {
  if (basePrice == null) return null;
  const mult = PORTION_MULTIPLIERS[portion] ?? 1;
  return Math.round(basePrice * mult);
}
