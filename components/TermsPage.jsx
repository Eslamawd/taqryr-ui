"use client";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    titleAr: "1. المقدمة",
    titleEn: "1. Introduction",
    contentAr: [
      "تُقدّم منصة تقرير (TQRYR) خدمات تقنية متخصصة في إدارة وتنظيم الإعلانات الرقمية، بهدف تعزيز الامتثال للأنظمة المحلية، رفع مستوى الشفافية، وضمان جودة الإعلانات الموجهة إلى السوق السعودي. باستخدامك لخدماتنا، فإنك توافق على الالتزام بالشروط والأحكام الواردة أدناه.",
    ],
    contentEn: [
      "TQRYR provides specialized digital advertising management and compliance services designed to enhance transparency, ensure regulatory alignment, and improve the quality of ads targeting the Saudi market. By accessing or using our services, you agree to be bound by the terms and conditions set forth below.",
    ],
  },
  {
    titleAr: "2. استخدام الخدمة",
    titleEn: "2. Use of Service",
    contentAr: [
      "يتوجب عليك تقديم معلومات دقيقة وصحيحة عند التسجيل أو عند إدارة الحملات الإعلانية عبر منصتنا.",
      "تحتفظ منصة تقرير بحقها في مراجعة، تعديل، إيقاف أو رفض أي إعلان في حال تبين أنه مخالف للأنظمة المحلية أو لشروط الاستخدام.",
      "لا يجوز استخدام المنصة في أي أنشطة غير قانونية أو مضللة أو تضر بالمصلحة العامة.",
    ],
    contentEn: [
      "You must provide accurate and truthful information when registering or managing advertising campaigns through our platform.",
      "TQRYR reserves the right to review, modify, suspend, or reject any advertisement that violates local regulations, community standards, or these Terms of Service.",
      "The platform must not be used for unlawful, misleading, or harmful activities.",
    ],
  },
  {
    titleAr: "3. المحتوى وحقوق الملكية",
    titleEn: "3. Content and Intellectual Property",
    contentAr: [
      "أنت وحدك المسؤول عن كافة المحتويات التي تُقدّمها عبر منصتنا، بما في ذلك الصور، النصوص، الفيديوهات، الرسومات، وأي مواد أخرى.",

      "باستخدامك لمنصة تقرير، فإنك تمنحنا ترخيصًا محدودًا وغير حصري لاستخدام هذا المحتوى فقط في نطاق تقديم خدماتنا التشغيلية.",
      "	تظل جميع حقوق الملكية الفكرية للمحتويات ملكًا لأصحابها الأصليين، مع التزامك بعدم انتهاك حقوق الغير.",
    ],
    contentEn: [
      "You are solely responsible for all content submitted through our platform, including but not limited to images, text, videos, graphics, and other materials.",
      "By submitting content, you grant TQRYR a limited, non-exclusive license to use such content solely for the purpose of delivering our services.",
      "All intellectual property rights remain with their respective owners, and you agree not to infringe upon the rights of third parties.",
    ],
  },
  {
    titleAr: "4. الخصوصية وحماية البيانات",
    titleEn: "4. Privacy and Data Protection",
    contentAr: [
      "يخضع استخدامك للمنصة لسياسة الخصوصية الخاصة بنا، والتي توضح كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.",

      "	نحن ملتزمون بحماية خصوصيتك وفق أعلى المعايير المتبعة وبما يتوافق مع القوانين المحلية في المملكة العربية السعودية.",
    ],
    contentEn: [
      "Your use of the platform is subject to our Privacy Policy, which outlines how we collect, use, and safeguard your personal data.",

      "We are committed to protecting your privacy in compliance with applicable laws and the highest industry standards.",
    ],
  },
  {
    titleAr: "5. الدفع والاشتراكات",
    titleEn: "5. Payment and Subscriptions",
    contentAr: [
      "تعتمد خدمات منصة تقرير على رسوم تسجيل واشتراكات دورية ورسوم تدقيق الإعلانات، وفقًا لما هو معلن في واجهة المنصة.",
      "يتحمل المستخدم مسؤولية تسديد المدفوعات المستحقة في مواعيدها.",
      "		لا يتم رد المبالغ المدفوعة إلا وفق الشروط والسياسات المعتمدة لدينا.",
    ],
    contentEn: [
      "	TQRYR services are subject to registration fees, subscription charges, and advertisement review fees, as displayed within the platform.",
      "	Users are responsible for timely payment of all applicable fees.",
      "Payments are non-refundable except as explicitly stated in our policies.",
    ],
  },
  {
    titleAr: "6. حقوق المستخدم",
    titleEn: "6. User Rights",
    contentAr: [
      "	يحق للمستخدم الوصول إلى بياناته الشخصية، وتعديلها أو طلب حذفها ضمن الحدود المسموح بها قانونًا.",
      "يمكن للمستخدمين الانسحاب من أي اتصالات تسويقية في أي وقت.",
      "نضمن للمستخدمين الشفافية الكاملة في متابعة حالة إعلاناتهم وقرارات الموافقة أو الرفض الصادرة من المنصة.",
    ],
    contentEn: [
      "Users have the right to access, update, or request the deletion of their personal data within the limits permitted by law.",
      "Users may opt out of marketing communications at any time.",
      "Users are entitled to full transparency regarding the review, approval, or rejection status of their advertisements.",
    ],
  },
  {
    titleAr: "7. إجراءات الأمان",
    titleEn: "7. Security Measures",
    contentAr: [
      "	نطبّق أحدث معايير الأمان الإلكتروني وتقنيات التشفير لحماية بيانات المستخدمين.",

      "كما نعتمد آليات تحقق متعددة الهوية (مثل النفاذ الوطني الموحد) لضمان أمان الحسابات ومنع أي استخدام غير مصرح به.",
    ],
    contentEn: [
      "We implement advanced security measures, including encryption and secure authentication protocols, to safeguard user data.",
      "Multi-factor verification methods (such as National Single Sign-On where applicable) may be required to ensure account security and prevent unauthorized access.",
    ],
  },
  {
    titleAr: "8. التغييرات على الشروط",
    titleEn: "8. Amendments to Terms",
    contentAr: [
      "	تحتفظ منصة تقرير بحق تعديل أو تحديث هذه الشروط في أي وقت.",

      "سنقوم بإشعار المستخدمين عند وجود تغييرات جوهرية، ويُعد استمرار استخدامك للخدمة بعد التعديلات موافقة ضمنية على الشروط الجديدة.",
    ],
    contentEn: [
      "TQRYR reserves the right to amend or update these Terms of Service at any time.",
      "Material changes will be communicated to users, and continued use of the platform after such updates constitutes acceptance of the revised terms.",
    ],
  },
  {
    titleAr: "9. القانون الحاكم",
    titleEn: "9. Governing Law",
    contentAr: [
      "	تخضع شروط الخدمة هذه وتُفسّر وفقًا للأنظمة والقوانين النافذة في المملكة العربية السعودية.",

      "أي نزاع ينشأ حول تفسير أو تطبيق هذه الشروط يخضع للاختصاص القضائي للمحاكم السعودية.",
    ],
    contentEn: [
      "These Terms of Service are governed by and construed in accordance with the laws and regulations of the Kingdom of Saudi Arabia.",
      "Any disputes shall be subject to the exclusive jurisdiction of Saudi courts.",
    ],
  },
  {
    titleAr: "10. التواصل والدعم الفني",
    titleEn: "10. Contact and Support",
    contentAr: [
      "	لأي استفسارات أو للحصول على الدعم الفني، يمكنك التواصل معنا عبر البريد الإلكتروني الرسمي: info@TQRYR.io",
      "كما يمكنكم متابعة قنواتنا الرسمية لمعرفة آخر التحديثات.",
    ],
    contentEn: [
      "	For inquiries or technical support, please contact us at info@TQRYR.io.",

      "Updates and announcements are shared through our official communication channels.",
    ],
  },
  {
    titleAr: "11. إخلاء المسؤولية",
    titleEn: "11. Disclaimer of Liability",
    contentAr: [
      "منصة تقرير (TQRYR) هي منصة تقنية لتنظيم ومراجعة الإعلانات الرقمية، ولا تُعد مسؤولة عن النتائج التجارية أو معدلات الأداء أو العوائد الناتجة عن الحملات الإعلانية التي ينفذها المستخدمون.",

      "المنصة لا تضمن تحقيق أهداف تسويقية محددة، ولا تتحمل أي خسائر مباشرة أو غير مباشرة أو أضرار ناتجة عن استخدام الخدمة.",
      "يظل المستخدم هو المسؤول الأول عن محتواه، ميزانياته، ونتائج حملاته.",
    ],
    contentEn: [
      "TQRYR is a technology platform for the regulation and review of digital advertisements. It is not responsible for the commercial outcomes, performance metrics, or financial returns of advertising campaigns executed by users.",
      "The platform does not guarantee the achievement of specific marketing objectives and shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of its services.",
      "Users remain fully responsible for their content, budgets, and campaign outcomes.",
    ],
  },
];

export const TermsPage = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#0f1020] text-gray-200 py-16 px-6 md:px-20 lg:px-40"
    >
      <h1 className="text-3xl font-extrabold mb-12 text-center text-white">
        {lang === "ar"
          ? "شروط الخدمة – منصة تقرير (TQRYR)"
          : "Terms of Service – TQRYR Platform"}
      </h1>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-[#1a1b2e] rounded-xl p-6 cursor-pointer shadow-md hover:shadow-xl transition relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            {/* Gradient Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-20 blur-xl pointer-events-none transition-all duration-500 hover:opacity-40"></div>

            <div
              onClick={() => toggleSection(idx)}
              className="relative flex justify-between items-center z-10"
            >
              <h2 className="text-xl font-bold text-emerald-400">
                {lang === "ar" ? section.titleAr : section.titleEn}
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-gray-300 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === idx && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 list-disc list-inside text-gray-300 space-y-1 relative z-10"
              >
                {(lang === "ar" ? section.contentAr : section.contentEn).map(
                  (line, i) => (
                    <li key={i}>{line}</li>
                  )
                )}
              </motion.ul>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-center text-gray-400 text-sm">
        {lang === "ar"
          ? "لأي استفسارات، تواصل معنا عبر info@TQRYR.io"
          : "For any inquiries, contact us at info@TQRYR.io"}
      </p>
    </div>
  );
};
