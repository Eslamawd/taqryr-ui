"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function Counter({ start, minStep, maxStep, interval, label }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomStep =
        Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
      setCount((prev) => prev + randomStep);
    }, interval);

    return () => clearInterval(timer);
  }, [minStep, maxStep, interval]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black p-6 rounded-2xl shadow text-center"
    >
      <h3 className="text-4xl font-bold text-emerald-400 mb-2">
        {count.toLocaleString()}
      </h3>
      <p className="text-gray-50">{label}</p>
    </motion.div>
  );
}

function UsersCounterSection() {
  const { lang } = useLanguage();
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-50 mb-12">
          {lang === "ar" ? " نمو المنصة اليومي" : "Daily platform growth"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Counter
            start={9852}
            minStep={2}
            maxStep={6}
            interval={3000}
            label={
              lang === "ar"
                ? "عدد المستخدمين المتصلين "
                : "Number of connected users"
            }
          />
          <Counter
            start={12500}
            minStep={10}
            maxStep={25}
            interval={2500}
            label={
              lang === "ar"
                ? "إجمالي الإنفاق الإعلاني اليومي"
                : "Total daily advertising spend"
            }
          />
          <Counter
            start={58340}
            minStep={15}
            maxStep={30}
            interval={2000}
            label={
              lang === "ar" ? "إجمالي النقرات اليومي " : "Total daily clicks"
            }
          />
        </div>
      </div>
    </section>
  );
}

export default UsersCounterSection;
