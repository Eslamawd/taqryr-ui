"use client";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Rocket, FileCheck2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Features = () => {
  const { lang } = useLanguage();

  const text = {
    ar: {
      title: "مميزات المنصة",
      subtitle: "كل ما تحتاجه لإدارة إعلاناتك الممولة بسهولة وشفافية.",
      items: [
        {
          icon: ShieldCheck,
          title: "امتثال محلي",
          desc: "مراجعة واعتماد إعلاناتك وفق القوانين المحلية قبل النشر.",
        },
        {
          icon: BarChart3,
          title: "تقارير فورية",
          desc: "احصل على إحصائيات مباشرة لحملاتك الإعلانية في أي وقت.",
        },
        {
          icon: Rocket,
          title: "إطلاق بنقرة",
          desc: "اربط منصتك مع سناب شات وقنوات التواصل بنقرة واحدة فقط.",
        },
        {
          icon: FileCheck2,
          title: "شفافية كاملة",
          desc: "تابع حالة الإعلانات والتصاريح في لوحة تحكم واضحة.",
        },
      ],
    },
    en: {
      title: "Platform Features",
      subtitle:
        "Everything you need to manage your paid ads with ease and transparency.",
      items: [
        {
          icon: ShieldCheck,
          title: "Local Compliance",
          desc: "Your ads are reviewed and approved based on local regulations before publishing.",
        },
        {
          icon: BarChart3,
          title: "Instant Reports",
          desc: "Get real-time statistics and insights about your ad campaigns anytime.",
        },
        {
          icon: Rocket,
          title: "One-click Launch",
          desc: "Connect directly with Snapchat and other social channels in one click.",
        },
        {
          icon: FileCheck2,
          title: "Full Transparency",
          desc: "Track ad status and approval numbers clearly in your dashboard.",
        },
      ],
    },
  };

  const t = text[lang];

  return (
    <section className="bg-[#0f1020] text-gray-200 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-white/70 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="rounded-2xl bg-white/5 p-6 border border-white/10 shadow-lg hover:bg-white/10 transition"
            >
              <item.icon className="h-10 w-10 text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
