"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("SAR"); // العملة الحالية
  const [rates, setRates] = useState({ USD: 0.27, SAR: 1 }); // افتراضي:
  // 1 USD = 3.75 SAR
  const { lang } = useLanguage();
  // هنا تقدر تحدث الأسعار من API لو عايز

  // تحويل المبلغ
  const convertPrice = (amount, toCurrency = currency) => {
    if (!rates[toCurrency]) return amount;
    return amount * rates[toCurrency];
  };

  // تنسيق السعر حسب اللغة والعملة
  const formatPrice = (amount, curr = currency) => {
    const converted = convertPrice(amount, curr);
    let formatted = new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 0,
    }).format(converted);

    if (lang === "ar" && curr === "SAR") {
      formatted = formatted.replace("SAR", "ر.س");
    }

    return formatted;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, convertPrice, rates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
