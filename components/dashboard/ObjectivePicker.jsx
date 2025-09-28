import { FaCheck } from "react-icons/fa";
import { Label } from "../ui/Label";
import { useLanguage } from "@/context/LanguageContext";

import { motion } from "framer-motion";

export default function ObjectivePicker({ value = "", onChange }) {
  const { lang } = useLanguage();
  const objectives = [
    {
      id: "AWARENESS_AND_ENGAGEMENT",
      name: "Awareness & Engagement",
      name_ar: "الوعي والتفاعل",
      desc: "Increase awareness of your brand and encourage users to engage with your content.",
      desc_ar:
        "زيادة وعي المستخدمين بعلامتك التجارية وتشجيعهم على التفاعل مع محتواك.",
    },
    {
      id: "SALES",
      name: "Sales",
      name_ar: "المبيعات",
      desc: "Drive more purchases and sales conversions through your campaign.",
      desc_ar: "زيادة المبيعات وتحفيز المستخدمين على إتمام عمليات الشراء.",
    },
    {
      id: "TRAFFIC",
      name: "Traffic",
      name_ar: "الزيارات",
      desc: "Send more people to your website or landing page.",
      desc_ar: "زيادة عدد الزوار لموقعك أو صفحة الهبوط الخاصة بك.",
    },
    {
      id: "APP_PROMOTION",
      name: "App Promotion",
      name_ar: "ترويج التطبيق",
      desc: "Get more installs and in-app actions for your mobile application.",
      desc_ar: "زيادة تنزيلات التطبيق وتشجيع المستخدمين على التفاعل داخله.",
    },
    {
      id: "LEADS",
      name: "Leads",
      name_ar: "العملاء المحتملون",
      desc: "Collect contact details and generate leads for your business.",
      desc_ar: "جمع بيانات العملاء المحتملين وزيادة فرص المبيعات لشركتك.",
    },
  ];

  return (
    <div className="space-y-2">
      <Label>هدف الإعلان</Label>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        {objectives.map((obj) => (
          <span
            key={obj.id}
            type="button"
            onClick={() => onChange(obj.id)}
            className={`relative p-3 rounded-xl border text-sm ${
              lang === "ar" ? "text-right" : "text-left"
            } transition ${
              value === obj.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
            }`}
          >
            <div className="font-semibold">
              {lang === "ar" ? obj.name_ar : obj.name}
            </div>
            <div className="text-xs opacity-80">
              {lang === "ar" ? obj.desc_ar : obj.desc}
            </div>
            {value === obj.id && (
              <span
                className={`absolute top-2 ${
                  lang === "ar" ? "left-2" : "right-2"
                } bg-gray-700 rounded-full p-1`}
              >
                <FaCheck className="text-white text-xs" />
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
