"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { translations, menuTranslations } from "../i18n/translations";
import { generateWhatsAppLink } from "../lib/generateWhatsAppLink";

const AppContext = createContext();

// Hardcoded fallback (only used if no cached rates exist at all)
const HARDCODED_FALLBACK = {
  TRY: { symbol: "₺", rate: 1 },
  USD: { symbol: "$", rate: 0.02121 },
  EUR: { symbol: "€", rate: 0.01855 },
  GBP: { symbol: "£", rate: 0.01579 },
  RUB: { symbol: "₽", rate: 2.65 },
  SAR: { symbol: "ر.س", rate: 0.0795 },
};

const RATES_STORAGE_KEY = "app_last_rates";
const CART_STORAGE_KEY = "kardesler_cart";
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
  // CART STATE
  // ═══════════════════════════════════════════
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle"); // "idle" | "sent"
  const pulseTimeoutRef = useRef(null);
  const orderTimeoutRef = useRef(null);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(savedLang);
    }
    
    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && ["TRY", "USD", "EUR", "GBP", "RUB", "SAR"].includes(savedCurrency)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrency(savedCurrency);
    }

    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(parsed);
        }
      }
    } catch (_) { /* ignore parse errors */ }

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
    return () => {
      clearInterval(interval);
      // Cleanup cart-related timeouts
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
    };
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

  // ═══════════════════════════════════════════
  // CART OPERATIONS
  // ═══════════════════════════════════════════

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (_) { /* ignore storage errors */ }
  }, [cart]);

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: item.id, price: item.price, image: item.image, qty: 1 }];
    });

    // Trigger FAB pulse animation
    setCartPulse(true);
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = setTimeout(() => setCartPulse(false), 600);
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter((i) => i.id !== itemId);
      }
      return prev.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty - 1 } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (_) { /* ignore */ }
  }, []);

  const getItemQuantity = useCallback((itemId) => {
    return cart.find((i) => i.id === itemId)?.qty ?? 0;
  }, [cart]);

  // Derived values
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Submit order via WhatsApp
  const submitOrder = useCallback(() => {
    if (cart.length === 0) return;
    const link = generateWhatsAppLink(cart, lang);
    window.open(link, "_blank");
    setOrderStatus("sent");

    // After 3 seconds: clear cart, close drawer, reset status
    if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
    orderTimeoutRef.current = setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setOrderStatus("idle");
    }, 3000);
  }, [cart, lang, clearCart]);

  const createDeepProxy = (target, fallback) => {
    return new Proxy(target || {}, {
      get(obj, prop) {
        if (prop in obj) {
          if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            return createDeepProxy(obj[prop], fallback?.[prop]);
          }
          return obj[prop];
        }
        return fallback?.[prop];
      }
    });
  };

  const t = createDeepProxy(translations[lang], translations["en"]);
  const menuT = createDeepProxy(menuTranslations[lang], menuTranslations["en"]);
  const isRtl = lang === "ar" || lang === "fa";

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
    // Cart
    cart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal,
    cartPulse,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    submitOrder,
    orderStatus,
  };

  return (
    <AppContext.Provider value={value}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-[var(--font-cairo)]" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
