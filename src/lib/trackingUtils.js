/**
 * Tracking Utilities for Google Ads / GA4 / GTM
 * Fires conversion events to dataLayer (GTM) and gtag (GA4).
 */

/**
 * Get stored UTM params from sessionStorage
 */
function getUTMParams() {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem("kardesler_utm");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

const GOOGLE_ADS_CALL_SEND_TO = "AW-17852480798/nc8MCNXrpcAdEJ763MBC";
let lastCallConversionAt = 0;

/**
 * Fire Google Ads Call Click conversion ("Call Click (website)")
 * Debounced (500ms) to prevent duplicate firing across overlapping handlers.
 */
export function trackGoogleAdsCallConversion() {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastCallConversionAt < 500) return;
  lastCallConversionAt = now;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CALL_SEND_TO,
    });
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "google_ads_call_conversion",
      send_to: GOOGLE_ADS_CALL_SEND_TO,
    });
  }
}

/**
 * Fire a tracking event to GTM dataLayer and gtag
 * @param {string} eventName - e.g. 'whatsapp_click', 'phone_click'
 * @param {Object} params - additional params like { language, page, button_location }
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  if (eventName === "phone_click") {
    trackGoogleAdsCallConversion();
  }

  const utm = getUTMParams();
  const enrichedParams = {
    ...params,
    utm_source: utm.utm_source || undefined,
    utm_medium: utm.utm_medium || undefined,
    utm_campaign: utm.utm_campaign || undefined,
    utm_content: utm.utm_content || undefined,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // GTM dataLayer push
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });
  }

  // GA4 gtag event
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, enrichedParams);
  }
}

/**
 * Store UTM params from current URL into sessionStorage
 * Call this once on page load.
 */
export function captureUTMParams() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const utm = {};
    let hasUTM = false;
    for (const key of utmKeys) {
      const val = params.get(key);
      if (val) {
        utm[key] = val;
        hasUTM = true;
      }
    }
    if (hasUTM) {
      sessionStorage.setItem("kardesler_utm", JSON.stringify(utm));
    }
  } catch {
    // Silently fail in restricted environments
  }
}

/**
 * Append stored UTM params to a URL
 * @param {string} url - The target URL
 * @returns {string} URL with UTM params appended
 */
export function appendUTMToUrl(url) {
  if (typeof window === "undefined") return url;
  try {
    const utm = getUTMParams();
    if (!Object.keys(utm).length) return url;

    const separator = url.includes("?") ? "&" : "?";
    const utmString = Object.entries(utm)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");

    return utmString ? `${url}${separator}${utmString}` : url;
  } catch {
    return url;
  }
}
