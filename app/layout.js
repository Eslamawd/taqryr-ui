import "./globals.css";
import Providers from "@/components/layout/Providers";
import { useLanguage } from "@/context/LanguageContext";
import { Dancing_Script, Poppins, Reem_Kufi, Tajawal } from "next/font/google";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "تقرير - أفضل منصة سعودية لإدارة الإعلانات الممولة",
  description:
    "تقرير هي المنصة المركزية للشركات المسوقة لإطلاق ومراجعة واعتماد الحملات الإعلانية بسهولة، امتثال وشفافية كاملة، وربط تلقائي مع Snapchat ومنصات التواصل الاجتماعي. ابدأ الآن واستفد من تقارير أداء فورية وتحكم كامل في حملاتك.",
  keywords: [
    "إعلانات ممولة",
    "منصة إعلانات سعودية",
    "إدارة الحملات الإعلانية",
    "Snapchat Ads",
    "Marketing Platform",
    "Facebook Ads",
    "Meta Ads",
    "Tiktok Ads",
    "Google Ads",
    "Youtub Ads",
    "تقارير أداء فورية",
    "امتثال وحوكمة",
    "حملات إعلانية بنقرة واحدة",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      </head>
      <body
        className={`${poppins.variable} ${tajawal.variable} ${dancingScript.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
