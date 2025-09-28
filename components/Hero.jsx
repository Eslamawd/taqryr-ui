"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ChevronLeft,
  BarChart3,
  Rocket,
  CheckCircle2,
} from "lucide-react";

export const Hero = () => {
  const { lang } = useLanguage();

  const text = {
    ar: {
      platformBadge: "منصة سعودية لحوكمة الإعلانات الممولة",
      heading: "أطلق حملاتك الإعلانية عبر تقرير بسهولة، امتثال، وشفافية.",
      paragraph:
        "تقرير هي منصة مركزية لمراجعة واعتماد الإعلانات قبل بثّها وربطها تلقائيًا مع سناب شات ومنصات التواصل. سجل كشركة تسويق وابدأ إدارة حملاتك من مكان واحد.",
      getStarted: "ابدأ الآن",
      ctaNote: "خاص بشركات التسويق المعتمدة – التجربة مجانية لأول حملة.",
      howItWorks: "كيف تعمل المنصة",
      compliance: "امتثال محلي",
      instantReports: "تقارير فورية",
      oneClickLaunch: "إطلاق بنقرة",
      dashboardTitle: "لوحة تحكم الشركة",
      status: "حالة: حملة معتمدة",
      adNumber: "رقم تصريح الإعلان: AD-TR-2025-000312",
      reviewStatus: "تمت المراجعة بنجاح – تم الإرسال إلى Snap Ads API.",
      stats: [
        { title: "الإنفاق", value: "SAR 12,500" },
        { title: "المشاهدات", value: "1.2M" },
        { title: "النقرات", value: "58,340" },
      ],
    },
    en: {
      platformBadge: "Saudi platform for paid ads governance",
      heading:
        "Launch your ad campaigns via TQRYR easily, compliantly, and transparently.",
      paragraph:
        "TQRYR is a centralized platform to review and approve ads before publishing and automatically link them with Snapchat and social platforms. Register as a marketing company and start managing your campaigns from one place.",
      getStarted: "Get Started",
      ctaNote: "For certified marketing agencies – first campaign is free.",
      howItWorks: "How the platform works",
      compliance: "Local compliance",
      instantReports: "Instant reports",
      oneClickLaunch: "One-click launch",
      dashboardTitle: "Company Dashboard",
      status: "Status: Approved Campaign",
      adNumber: "Ad approval number: AD-TR-2025-000312",
      reviewStatus: "Successfully reviewed – sent to Snap Ads API.",
      stats: [
        { title: "Spending", value: "SAR 12,500" },
        { title: "Views", value: "1.2M" },
        { title: "Clicks", value: "58,340" },
      ],
    },
  };

  const t = text[lang];

  return (
    <motion.section
      dir={lang === "ar" ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#0f1020] text-gray-200"
    >
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 items-center gap-10">
          {/* Left content */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-xs text-white/70 border border-white/10 rounded-full px-3 py-1 mb-4">
              <ShieldCheck className="h-4 w-4" /> {t.platformBadge}
            </span>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl  font-extrabold leading-tight tracking-tight">
              {t.heading}
            </h1>
            {/* Paragraph */}
            <p className="mt-4 text-white/80 max-w-xl">{t.paragraph}</p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="/auth/register?source=hero"
                aria-label={
                  lang === "ar"
                    ? "التسجيل في منصة تقرير كشركة تسويق"
                    : "Register on Taqreer as a marketing company"
                }
                className="px-6 py-3 rounded-2xl bg-gradient-to-l from-emerald-400 to-cyan-500 text-[#0f1020] font-bold shadow-lg hover:scale-105 transition-transform"
              >
                {t.getStarted}
              </a>
              <a
                href="#how"
                aria-label={
                  lang === "ar"
                    ? "التعرف على كيفية عمل منصة تقرير"
                    : "Learn how Taqreer works"
                }
                className="px-6 py-3 rounded-2xl border border-white/20 hover:border-white/40 transition flex items-center gap-2"
              >
                {t.howItWorks} <ChevronLeft className="h-4 w-4" />
              </a>
            </div>

            {/* CTA Note */}
            <p className="mt-2 text-sm text-white/60">{t.ctaNote}</p>

            {/* Features */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />{" "}
                {t.compliance}
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-400" />{" "}
                {t.instantReports}
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-emerald-400" />{" "}
                {t.oneClickLaunch}
              </div>
            </div>
          </div>

          {/* Right content (Dashboard Preview) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-l from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="rounded-2xl bg-[#141530] p-4">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center text-xs text-white/60 mb-3">
                  <span>{t.dashboardTitle}</span>
                  <span>{t.status}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {t.stats.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/5 p-3 border border-white/10"
                    >
                      <div className="text-white/60 text-xs">{c.title}</div>
                      <div className="text-lg font-bold">{c.value}</div>
                    </div>
                  ))}
                </div>

                {/* Review Status */}
                <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{t.adNumber}</span>
                  </div>
                  <div className="mt-2 text-white/60">{t.reviewStatus}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};
