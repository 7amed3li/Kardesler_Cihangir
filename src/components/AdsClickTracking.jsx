"use client";

/**
 * Site-wide Google Ads click tracking (plan: FINAL-ADS-PLAN.md §8).
 *
 * Mounted once in the root layout. It:
 *  1. Captures gclid / gbraid / wbraid from the landing URL into
 *     sessionStorage ("kardesler_gclid") so the order flow can store
 *     the click id with each WhatsApp order (plan §8, install item 4).
 *  2. Registers the Google Ads tag (gtag config for the AW- id) —
 *     ONLY when real values are filled in src/lib/adsTrackingConfig.js
 *     and the GA4 gtag.js loader is present. No duplicate tag is ever
 *     injected: the existing GA4 gtag in layout.js is the one loader,
 *     and GTM (GTM-PRHLP84Z) stays untouched.
 *  3. Delegated click listener (capture phase, document level) that
 *     fires for EVERY tel: and WhatsApp (wa.me / api.whatsapp.com)
 *     link on the site — header, footer, sticky CTA, menu, order
 *     flow — via the existing trackEvent() helper (dataLayer + GA4),
 *     and additionally fires the Google Ads conversion when the
 *     config above is filled in.
 *
 * Event names match the existing convention in trackingUtils.js:
 * "phone_click" and "whatsapp_click".
 */

import { useEffect } from "react";
import { trackEvent } from "@/lib/trackingUtils";
import {
  ADS_TRACKING_CONFIG,
  conversionSendTo,
  isAdsTrackingConfigured,
} from "@/lib/adsTrackingConfig";

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"];
const STORAGE_KEY = "kardesler_gclid";

function captureClickId() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    for (const key of CLICK_ID_KEYS) {
      const val = params.get(key);
      if (val) found[key] = val;
    }
    if (Object.keys(found).length) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...found, captured_at: new Date().toISOString() })
      );
    }
  } catch {
    // storage unavailable (private mode etc.) — tracking must never break the page
  }
}

/** Stored Google click id for the current session, if any. */
export function getStoredClickId() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function fireAdsConversion(key, params) {
  const sendTo = conversionSendTo(key);
  if (!sendTo || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: sendTo, ...params });
}

export default function AdsClickTracking() {
  useEffect(() => {
    captureClickId();

    // Register the Ads tag on the existing gtag loader (no new script).
    if (isAdsTrackingConfigured() && typeof window.gtag === "function") {
      window.gtag("config", ADS_TRACKING_CONFIG.googleAdsId);
    }

    const onClick = (e) => {
      const anchor = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        const params = { link_url: href, link_text: (anchor.textContent || "").trim().slice(0, 60) };
        trackEvent("phone_click", params);
        fireAdsConversion("callClick", params);
        return;
      }

      if (
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com") ||
        href.includes("whatsapp.com/send")
      ) {
        const params = { link_url: href, link_text: (anchor.textContent || "").trim().slice(0, 60) };
        const clickId = getStoredClickId();
        if (clickId && clickId.gclid) params.gclid = clickId.gclid;
        trackEvent("whatsapp_click", params);
        fireAdsConversion("whatsappOrderClick", params);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
