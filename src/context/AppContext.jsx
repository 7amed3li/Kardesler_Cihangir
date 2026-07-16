"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const AppContext = createContext();

const EXCHANGE_RATES = {
  TRY: { symbol: "₺", rate: 1 },
  USD: { symbol: "$", rate: 0.031 },
  EUR: { symbol: "€", rate: 0.029 },
  GBP: { symbol: "£", rate: 0.024 },
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const [currency, setCurrency] = useState("TRY");
  const [table, setTable] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
    
    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
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
      }}
    >
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
