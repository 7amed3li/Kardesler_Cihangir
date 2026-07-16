"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const AppContext = createContext();

const EXCHANGE_RATES = {
  TRY: { symbol: "₺", rate: 1 },
  USD: { symbol: "$", rate: 0.031 }, // 1 USD = ~32 TRY
  EUR: { symbol: "€", rate: 0.029 }, // 1 EUR = ~34 TRY
  GBP: { symbol: "£", rate: 0.024 }, // 1 GBP = ~41 TRY
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const [currency, setCurrency] = useState("TRY");
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState(null);

  // Load saved preferences on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
    
    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }
    
    // Check URL for table number
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get("table");
    if (tableParam) {
      setTable(tableParam);
      localStorage.setItem("table", tableParam);
    } else {
      const savedTable = localStorage.getItem("table");
      if (savedTable) setTable(savedTable);
    }
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("app_currency", newCurrency);
  };

  const convertPrice = (priceInTRY) => {
    const { rate } = EXCHANGE_RATES[currency];
    return (priceInTRY * rate).toFixed(2);
  };

  const getCurrencySymbol = () => EXCHANGE_RATES[currency].symbol;

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = i.qty + delta;
          return newQty > 0 ? { ...i, qty: newQty } : i;
        }
        return i;
      })
    );
  };

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
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        table,
      }}
    >
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

