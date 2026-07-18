"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "../i18n/translations";

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
  const [table, setTable] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(HARDCODED_FALLBACK);
  const [ratesSource, setRatesSource] = useState("fallback");
  const [ratesLastUpdated, setRatesLastUpdated] = useState(null);

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
    
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get("table");
    if (tableParam) {
      setTable(tableParam);
      localStorage.setItem("table", tableParam);
    } else {
      const savedTable = localStorage.getItem("table");
      if (savedTable) setTable(savedTable);
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
    const { rate } = exchangeRates[currency] || FALLBACK_RATES[currency];
    return (priceInTRY * rate).toFixed(2);
  };

  const getCurrencySymbol = () => (exchangeRates[currency] || FALLBACK_RATES[currency]).symbol;

  const t = translations[lang] || translations["en"];
  const isRtl = lang === "ar";

  return (
    <AppContext.Provider
      value={{
        lang,
        changeLang,
        currency,
        changeCurrency,
        convertPrice,
        getCurrencySymbol,
        t,
        isRtl,
        table,
        ratesSource,
        ratesLastUpdated,
      }}
    >
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
