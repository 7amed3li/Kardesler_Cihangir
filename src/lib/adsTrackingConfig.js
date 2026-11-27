/**
 * ============================================================
 *  GOOGLE ADS CONVERSION TRACKING — CONFIG (FILL BEFORE LAUNCH)
 * ============================================================
 *  Single source of truth for the Google Ads conversion actions
 *  used by kardeslercihangir.com (plan: FINAL-ADS-PLAN.md §8).
 *
 *  Account: Google Ads 704-528-3992 (₺, GMT+3) — restaurant account (kardeslerkebappidesalonu@gmail.com).
 *
 *  HOW TO ACTIVATE (after the conversion actions are created in
 *  the Google Ads account — plan §12 launch gate, item 7):
 *    1. Replace googleAdsId with the real "AW-..." id.
 *    2. Replace each label below with the label Google Ads shows
 *       for that conversion action.
 *  Until BOTH are real values, `isAdsTrackingConfigured()` returns
 *  false and NO Ads conversion is fired — the site keeps pushing
 *  the plain dataLayer events (whatsapp_click / phone_click) only,
 *  so GTM-based measurement keeps working either way.
 *
 *  Honest naming (plan §8): a WhatsApp click is a click / chat
 *  start — NOT a confirmed order. A phone click is a click — NOT
 *  a confirmed call (Turkey has no Google forwarding numbers, so
 *  no call duration exists). Directions are measured by the GBP
 *  location asset inside Google Ads, not on this site.
 * ============================================================
 */
export const ADS_TRACKING_CONFIG = {
  // TODO(ads-launch): real Google Ads tag id, e.g. "AW-1234567890"
  googleAdsId: "AW-17852480798",

  conversions: {
    // PRIMARY for G3 order campaigns — click on any wa.me /
    // WhatsApp order link anywhere on the site.
    whatsappOrderClick: {
      // TODO(ads-launch): label of the "WhatsApp order click" action
      label: "H0nPCNmFo8AdEJ763MBC",
      eventName: "whatsapp_click",
    },
    // SECONDARY for G2/G3 — click on any tel: phone link.
    callClick: {
      // TODO(ads-launch): label of the "Call click (website)" action
      label: "REPLACE_WITH_CALL_CLICK_LABEL",
      eventName: "phone_click",
    },
  },
};

function looksReal(value, prefix) {
  return (
    typeof value === "string" &&
    value.startsWith(prefix) &&
    !value.includes("XXXX") &&
    !value.includes("REPLACE_WITH")
  );
}

/** True only when the Ads id AND both labels hold real values. */
export function isAdsTrackingConfigured() {
  const c = ADS_TRACKING_CONFIG;
  return (
    looksReal(c.googleAdsId, "AW-") &&
    !c.conversions.whatsappOrderClick.label.includes("REPLACE_WITH") &&
    c.conversions.whatsappOrderClick.label.length > 0 &&
    !c.conversions.callClick.label.includes("REPLACE_WITH") &&
    c.conversions.callClick.label.length > 0
  );
}

/** "AW-.../label" send_to string for a configured conversion, else null. */
export function conversionSendTo(key) {
  if (!isAdsTrackingConfigured()) return null;
  const conv = ADS_TRACKING_CONFIG.conversions[key];
  if (!conv) return null;
  return `${ADS_TRACKING_CONFIG.googleAdsId}/${conv.label}`;
}
