"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { translations, menuTranslations } from "../i18n/translations";
// WhatsApp functionality removed based on user request (phone calls only)
import SaudiRiyalIcon from "../components/SaudiRiyalIcon";
import { menuData } from "../data/menuData";
import {
  DEFAULT_PORTION,
  getPortionOptions,
  isSoupItem,
  normalizePortion,
  portionUnitPrice,
} from "../lib/portions";
import {
  trackGoogleAdsCallConversion,
  trackGoogleAdsDirectionsConversion,
  trackGoogleAdsWhatsAppConversion,
} from "../lib/trackingUtils";

// Flat lookup for menuData items by id (used only for images/names, NOT prices)
const allMenuItems = menuData.flatMap(cat => cat.items || []);

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
  const [livePrices, setLivePrices] = useState({});
  const [pricesLoading, setPricesLoading] = useState(true);
  const [pricesError, setPricesError] = useState(null);

  // ═══════════════════════════════════════════
  // CART STATE
  // ═══════════════════════════════════════════
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
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
    // URL Locale > LocalStorage Locale
    const locales = ['tr', 'en', 'ar', 'ru', 'fa', 'fr', 'de', 'it', 'es', 'zh'];
    const pathLocale = window.location.pathname.split('/')[1];
    const initialLang = locales.includes(pathLocale) ? pathLocale : "tr";
    localStorage.setItem("app_lang", initialLang);
    requestAnimationFrame(() => setLang(initialLang));
    
    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && ["TRY", "USD", "EUR", "GBP", "RUB", "SAR"].includes(savedCurrency)) {
      requestAnimationFrame(() => setCurrency(savedCurrency));
    }

    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize legacy lines (saved before portions existed) to the default portion
          const normalized = parsed.map((line) => ({
            ...line,
            portion: normalizePortion(line.id, line.portion || DEFAULT_PORTION),
          }));
          // Normalizing can collapse distinct lines onto the same
          // (dish + portion) key — e.g. a breakfast dish saved at 1,5x
          // before breakfast portions were removed now falls back to
          // "full" alongside an existing full line. Merge duplicates,
          // summing quantities, so cart keys stay unique.
          const merged = [];
          for (const line of normalized) {
            const existing = merged.find((i) => i.id === line.id && i.portion === line.portion);
            if (existing) existing.qty += line.qty;
            else merged.push({ ...line });
          }
          requestAnimationFrame(() => setCart(merged));
        }
      }
    } catch (_) { /* ignore parse errors */ }

    // Load last known rates from localStorage immediately (instant, no network)
    const lastKnown = getLastKnownRates();
    if (lastKnown) {
      requestAnimationFrame(() => {
        setExchangeRates(lastKnown.rates);
        setRatesSource(lastKnown.source + " (cached)");
        setRatesLastUpdated(lastKnown.lastUpdated);
      });
    }

    // Then fetch fresh rates from the server
    const initialFetchTimer = setTimeout(fetchRates, 0);

    // Refresh every 5 minutes
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);

    // Fetch live prices from unified API
    async function fetchPrices() {
      setPricesLoading(true);
      setPricesError(null);
      try {
        const res = await fetch('/api/prices', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        
        if (result.success && result.data) {
          setLivePrices(result.data);
        } else {
          throw new Error(result.error || "Failed to load prices");
        }
      } catch (e) {
        console.error("Failed to load live prices", e);
        setPricesError(e.message || "Failed to load prices");
      } finally {
        setPricesLoading(false);
      }
    }
    fetchPrices();

    return () => {
      clearTimeout(initialFetchTimer);
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

  const getLivePrice = useCallback((item) => {
    if (livePrices[item.id] !== undefined) return livePrices[item.id];
    return item.price || null; // Fallback to menuData price if live price is unavailable
  }, [livePrices]);

  const convertPrice = (priceInTRY) => {
    if (priceInTRY == null) return null;
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    const { rate } = rateData;
    return (priceInTRY * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    if (currency === "SAR") {
      return <SaudiRiyalIcon className="h-[0.9em] w-auto inline-block fill-current" />;
    }
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

  // A cart line is identified by (dish id + portion): the same dish at
  // different portions is a separate line.
  const addToCart = useCallback((item, portion = DEFAULT_PORTION) => {
    // Guard: don't add items if prices haven't loaded or item has no price
    if (pricesLoading || getLivePrice(item) === null) {
      console.warn(`Cannot add ${item.id} to cart: price not available`);
      return;
    }
    const linePortion = normalizePortion(item.id, portion);

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.portion === linePortion);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.portion === linePortion ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: item.id, portion: linePortion, image: item.image, qty: 1 }];
    });

    // Trigger FAB pulse animation
    setCartPulse(true);
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = setTimeout(() => setCartPulse(false), 600);
  }, [pricesLoading, getLivePrice]);

  const removeFromCart = useCallback((itemId, portion = DEFAULT_PORTION) => {
    const linePortion = normalizePortion(itemId, portion);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId && i.portion === linePortion);
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter((i) => !(i.id === itemId && i.portion === linePortion));
      }
      return prev.map((i) =>
        i.id === itemId && i.portion === linePortion ? { ...i, qty: i.qty - 1 } : i
      );
    });
  }, []);

  // Move a whole cart line to another portion, merging into the target
  // line when the same dish already exists at that portion.
  const changeCartLinePortion = useCallback((itemId, fromPortion, toPortion) => {
    const from = normalizePortion(itemId, fromPortion);
    const to = normalizePortion(itemId, toPortion);
    if (from === to) return;
    setCart((prev) => {
      const source = prev.find((i) => i.id === itemId && i.portion === from);
      if (!source) return prev;
      const target = prev.find((i) => i.id === itemId && i.portion === to);
      const withoutSource = prev.filter((i) => !(i.id === itemId && i.portion === from));
      if (target) {
        return withoutSource.map((i) =>
          i.id === itemId && i.portion === to ? { ...i, qty: i.qty + source.qty } : i
        );
      }
      return [...withoutSource, { ...source, portion: to }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (_) { /* ignore */ }
  }, []);

  // Total quantity of a dish across ALL of its portion lines (card badge)
  const getItemQuantity = useCallback((itemId) => {
    return cart
      .filter((i) => i.id === itemId)
      .reduce((sum, i) => sum + i.qty, 0);
  }, [cart]);

  // Quantity of one specific (dish + portion) line
  const getPortionQuantity = useCallback((itemId, portion = DEFAULT_PORTION) => {
    const linePortion = normalizePortion(itemId, portion);
    return cart.find((i) => i.id === itemId && i.portion === linePortion)?.qty ?? 0;
  }, [cart]);

  // Unit price (TRY) of a dish at a portion — base price x multiplier,
  // rounded to the nearest whole lira (see src/lib/portions.js)
  const getPortionUnitPrice = useCallback((item, portion = DEFAULT_PORTION) => {
    const base = getLivePrice(item);
    if (base === null) return null;
    return portionUnitPrice(base, normalizePortion(item.id, portion));
  }, [getLivePrice]);

  // Derived values
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => {
    if (sum === null) return null;
    const price = getPortionUnitPrice(item, item.portion);
    if (price === null) return null;
    return sum + price * item.qty;
  }, 0);

  // Global Google Ads conversion listener for Call, WhatsApp, and Directions links across the site
  useEffect(() => {
    const handleActionLinkClick = (e) => {
      const anchor = e.target?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        trackGoogleAdsCallConversion();
      } else if (
        (href.includes("wa.me/") || href.includes("api.whatsapp.com/")) &&
        !href.includes("905060453906") &&
        !window.location.pathname.includes("tasarim-gelistirme")
      ) {
        trackGoogleAdsWhatsAppConversion();
      } else if (
        href.includes("google.com/maps") ||
        href.includes("maps.app.goo.gl")
      ) {
        trackGoogleAdsDirectionsConversion();
      }
    };
    document.addEventListener("click", handleActionLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleActionLinkClick, { capture: true });
  }, []);

  // Initiate phone call instead of WhatsApp
  const submitOrder = useCallback(() => {
    if (cart.length === 0) return;

    trackGoogleAdsCallConversion();

    // Redirect user to phone dialer
    window.location.href = "tel:+902122513696";
    
    setOrderStatus("sent");

    // After 3 seconds: clear cart, close drawer, reset status
    if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
    orderTimeoutRef.current = setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setOrderStatus("idle");
    }, 3000);
  }, [cart, clearCart]);

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
    getLivePrice,
    convertPrice,
    // Cart
    cart,
    isCartOpen,
    setIsCartOpen,
    // Reservation modal
    isReservationOpen,
    setIsReservationOpen,
    cartCount,
    cartTotal,
    cartPulse,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    getPortionQuantity,
    changeCartLinePortion,
    getPortionUnitPrice,
    getPortionOptions,
    isSoupItem,
    submitOrder,
    orderStatus,
    pricesLoading,
    pricesError,
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
