import { menuData } from "../data/menuData";

/**
 * Portion options for menu dishes.
 *
 * Owner spec:
 *  - Every dish can be ordered as 1x (default), 1.5x ("1,5 Porsiyon") or
 *    2x ("Duble"). Price = base price x multiplier.
 *  - Soups ONLY get a half option (0.5x, "Yarım") instead — no 1.5x/2x
 *    for soups, and no half option for non-soups.
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

export const DEFAULT_PORTION = "full";

/** Portion key -> price multiplier. */
export const PORTION_MULTIPLIERS = {
  half: 0.5,
  full: 1,
  oneHalf: 1.5,
  double: 2,
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

/** Ordered portion options available for a dish. */
export function getPortionOptions(itemId) {
  return isSoupItem(itemId) ? SOUP_OPTIONS : STANDARD_OPTIONS;
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
