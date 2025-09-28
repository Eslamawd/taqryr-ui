"use client";
import { Layers, Rocket, ShieldCheck, BarChart3 } from "lucide-react";
import PlatformCarousel3D from "./Home/PlatformCarousel3D";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export const Categories = () => {
  const { lang } = useLanguage();

  const text = {
    ar: {
      howTitle: "كيف تعمل المنصة؟",
      steps: [
        {
          icon: <Layers className="h-5 w-5" />,
          title: "تسجيل الشركات",
          desc: "تسجيل شركات التسويق والتحقق من البيانات.",
        },
        {
          icon: <Rocket className="h-5 w-5" />,
          title: "رفع الحملة",
          desc: "إدخال التفاصيل ورفع المواد الإعلانية للمراجعة.",
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: "المراجعة والاعتماد",
          desc: "تدقيق المحتوى وإصدار رقم تصريح فريد.",
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "الإطلاق والتقارير",
          desc: "إرسال لسناب شات ومتابعة الأداء من لوحة واحدة.",
        },
      ],
      featuresTitle: "لماذا تقرير؟",
      features: [
        {
          title: "حوكمة وامتثال",
          desc: "سياسات واضحة ومراجعة مسبقة قبل النشر لضمان الالتزام المحلي.",
        },
        { title: "تقارير فورية", desc: "مؤشرات أداء لحظية مع تصدير PDF/CSV." },
        {
          title: "تعدد اللغات وRTL",
          desc: "دعم العربية والإنجليزية مع تجربة استخدام متناسقة.",
        },
        { title: "تكامل دفع", desc: "بوابات دفع محلية ودولية لرسوم المنصة." },
        {
          title: "أمان عالي",
          desc: "تشفير، سجلات تدقيق، وإدارة وصول حسب الأدوار.",
        },
        {
          title: "قابلية التوسع",
          desc: "معمارية قابلة لإضافة منصات إعلانية جديدة بسهولة.",
        },
      ],
      faqTitle: "الأسئلة الشائعة",
      faq: [
        {
          q: "هل المنصة بديلة عن سناب شات؟",
          a: 'لا، "تقرير" وسيط منظم يراجع ويعتمد المحتوى ثم يرسله عبر تكامل API لمنصات الإعلانات.',
        },
        {
          q: "كيف يتم الدفع؟",
          a: "في المرحلة الأولى، يدفع العميل لمنصة الإعلانات مباشرة (سناب)، مع تحصيل رسوم المنصة عبر بوابة دفع داخل 'تقرير'. لاحقًا يمكن اعتماد نموذج وكالة مركزي.",
        },
        {
          q: "كم يستغرق اعتماد الإعلان؟",
          a: "يعتمد على نوع المحتوى وحجمه. الهدف في النسخة الأولية: 4–12 ساعة عمل.",
        },
      ],
      ctaTitle: "جاهز للانطلاق؟",
      ctaDesc:
        "سجل شركتك الآن وابدأ برفع حملاتك للحصول على موافقة سريعة وإطلاقها على سناب شات.",
      register: "إنشاء حساب ",
      contact: "تواصل معنا",
    },
    en: {
      howTitle: "How the platform works",
      steps: [
        {
          icon: <Layers className="h-5 w-5" />,
          title: "Company Registration",
          desc: "Register marketing companies and verify their data.",
        },
        {
          icon: <Rocket className="h-5 w-5" />,
          title: "Upload Campaign",
          desc: "Enter details and submit ad materials for review.",
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: "Review & Approval",
          desc: "Audit content and issue a unique approval number.",
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Launch & Reports",
          desc: "Send to Snapchat and track performance from a single dashboard.",
        },
      ],
      featuresTitle: "Why Taqreer?",
      features: [
        {
          title: "Governance & Compliance",
          desc: "Clear policies and pre-review to ensure local compliance.",
        },
        {
          title: "Instant Reports",
          desc: "Real-time performance metrics with PDF/CSV export.",
        },
        {
          title: "Multilingual & RTL",
          desc: "Supports Arabic and English with a consistent user experience.",
        },
        {
          title: "Payment Integration",
          desc: "Local & international gateways for platform fees.",
        },
        {
          title: "High Security",
          desc: "Encryption, audit logs, and role-based access control.",
        },
        {
          title: "Scalability",
          desc: "Architecture allows adding new ad platforms easily.",
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faq: [
        {
          q: "Is the platform a replacement for Snapchat?",
          a: 'No, "Taqreer" is an organized intermediary that reviews and approves content, then sends it via API integration to ad platforms.',
        },
        {
          q: "How is payment handled?",
          a: "Initially, the client pays the ad platform directly (Snap), while platform fees are collected via Taqreer's payment gateway. Later, a centralized agency model may be implemented.",
        },
        {
          q: "How long does ad approval take?",
          a: "Depends on content type and size. Goal for the first version: 4–12 working hours.",
        },
      ],
      ctaTitle: "Ready to get started?",
      ctaDesc:
        "Register your company now and start uploading campaigns for fast approval and launch on Snapchat.",
      register: "Create Account",
      contact: "Contact Us",
    },
  };

  const t = text[lang];

  return (
    <>
      {/* Platforms */}
      <PlatformCarousel3D />

      {/* How it works */}
      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16" id="how">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8">
          {t.howTitle}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white/5 p-6 border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 25px 40px rgba(16, 185, 129, 0.5)", // أخضر (emerald)
              }}
            >
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-emerald-400">
                {step.icon}
              </div>
              <div className="font-semibold text-lg mb-2">{step.title}</div>
              <div className="text-white/70 text-sm">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16" id="features">
        <h2 className="text-2xl md:text-3xl font-extrabold">
          {t.featuresTitle}
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {t.features.map((f, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white/5 p-6 border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl sh"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 25px 40px rgba(16, 185, 129, 0.5)", // أخضر (emerald)
              }}
            >
              <div className="font-semibold">{f.title}</div>
              <div className="text-white/70 text-sm mt-1">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-16" id="faq">
        <h2 className="text-2xl md:text-3xl font-extrabold">{t.faqTitle}</h2>
        <div className="mt-6 space-y-3">
          {t.faq.map((q, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-white/5 p-5 border border-white/10"
            >
              <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
                {q.q}
                <span className="text-white/50 text-sm">
                  {lang === "ar" ? "انقر للعرض" : "Click to view"}
                </span>
              </summary>
              <p className="mt-3 text-white/80">{q.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-emerald-500/10 to-cyan-500/10 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-extrabold">{t.ctaTitle}</h3>
          <p className="text-white/80 mt-2 max-w-2xl">{t.ctaDesc}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="/register"
              className="px-5 py-3 rounded-2xl bg-gradient-to-l from-emerald-400 to-cyan-500 text-[#0f1020] font-bold"
            >
              {t.register}
            </a>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-2xl border border-white/20 hover:border-white/40 transition"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
