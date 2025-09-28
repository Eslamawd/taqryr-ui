"use client";
import { createContext, useContext, useState } from "react";
import { useLanguage } from "./LanguageContext";

const CurrencyContext = createContext();

const SarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1124.14 1256.39"
    fill="currentColor"
    {...props}
  >
    <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
    <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
  </svg>
);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("SAR");
  const [rates, setRates] = useState({ USD: 0.27, SAR: 1 }); // Example
  const { lang } = useLanguage();

  // تحويل المبلغ
  const convertPrice = (amount, toCurrency = currency) => {
    if (!rates[toCurrency]) return amount;
    return amount * rates[toCurrency];
  };

  // تنسيق السعر
  const formatPrice = (amount, curr = currency) => {
    const converted = convertPrice(amount, curr);

    // تنسيق الرقم فقط (من غير رمز عملة)
    const numberOnly = new Intl.NumberFormat(
      lang === "ar" ? "en-US" : "en-US",
      {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }
    ).format(converted);

    // لو العملة SAR و اللغة عربي → نعرض الأيقونة
    if (curr === "SAR") {
      return (
        <span className="inline-flex items-center gap-1">
          <span>{numberOnly}</span>
          <SarIcon className="w-6 h-6 text-white" />
        </span>
      );
    }

    // باقي الحالات → نعرض بالعملة العادية
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(converted);
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
