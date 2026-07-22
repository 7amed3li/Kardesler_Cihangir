"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, menuTranslations } from "../i18n/translations";

const AppContext = createContext();

// Hardcoded fallback (only used if no cached rates exist at all)
const HARDCODED_FALLBACK = {
  TRY: { symbol: "₺", rate: 1 },
  USD: { symbol: "$", rate: 0.02121 },
  EUR: { symbol: "€", rate: 0.01855 },
  GBP: { symbol: "£", rate: 0.01579 },
};

const RATES_STORAGE_KEY = "app_last_rates";
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // Refresh every 5 minutes

// Load the last successfully fetched rates from localStorage
function getLastKnownRates() {
  try {
    const stored = localStorage.getItem(RATES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.rates && parsed.rates.TRY) {
        return parsed;
      }
    }
  } catch (_) { /* ignore parse errors */ }
  return null;
}

// Save successful rates to localStorage
function saveRatesToStorage(rates, source, lastUpdated) {
  try {
    localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify({
      rates,
      source,
      lastUpdated,
      savedAt: new Date().toISOString(),
    }));
  } catch (_) { /* ignore storage errors */ }
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const [currency, setCurrency] = useState("TRY");
  const [exchangeRates, setExchangeRates] = useState(HARDCODED_FALLBACK);
  const [ratesSource, setRatesSource] = useState("fallback");
  const [ratesLastUpdated, setRatesLastUpdated] = useState(null);

  // ═══════════════════════════════════════════
  // EXCHANGE RATES
  // ═══════════════════════════════════════════

  // Fetch live exchange rates from our API route
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setExchangeRates(data.rates);
      setRatesSource(data.source);
      setRatesLastUpdated(data.lastUpdated);

      // Persist successful rates as fallback for next time
      saveRatesToStorage(data.rates, data.source, data.lastUpdated);
    } catch (err) {
      console.warn("Failed to fetch live rates, using last known rates:", err.message);
      // Keep current rates (either previous live or localStorage fallback)
    }
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
    
    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && HARDCODED_FALLBACK[savedCurrency]) {
      setCurrency(savedCurrency);
    }

    // Load last known rates from localStorage immediately (instant, no network)
    const lastKnown = getLastKnownRates();
    if (lastKnown) {
      setExchangeRates(lastKnown.rates);
      setRatesSource(lastKnown.source + " (cached)");
      setRatesLastUpdated(lastKnown.lastUpdated);
    }

    // Then fetch fresh rates from the server
    fetchRates();

    // Refresh every 5 minutes
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("app_currency", newCurrency);
  };

  const convertPrice = (priceInTRY) => {
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    const { rate } = rateData;
    return (priceInTRY * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    return rateData.symbol;
  };

  const t = translations[lang] || translations["en"];
  const menuT = menuTranslations[lang] || menuTranslations["en"];
  const isRtl = lang === "ar";

  // Context Value
  // ═══════════════════════════════════════════
  const value = {
    // Language
    lang,
    changeLang,
    t,
    menuT,
    isRtl,
    // Exchange Rates
    currency,
    changeCurrency,
    exchangeRates,
    ratesSource,
    ratesLastUpdated,
    getCurrencySymbol,
    convertPrice,
  };

  return (
    <AppContext.Provider value={value}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-[var(--font-tajawal)]" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
