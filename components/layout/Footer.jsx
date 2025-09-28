import { useLanguage } from "@/context/LanguageContext";
import { Separator } from "../ui/Separator";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold"></span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {lang === "ar" ? "تقرير" : "Taqreer"}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "ar"
                ? "منصة إعلانية معتمدة تبدأ من سناب شات وتمتد لاحقاً إلى إنستجرام، تيك توك والمزيد. هدفنا تسهيل عملية إدارة الحملات وضمان الامتثال المحلي."
                : "An official advertising platform starting with Snapchat and expanding later to Instagram, TikTok, and more. Our goal is to simplify campaign management and ensure compliance."}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "كيف تعمل المنصة" : "How it Works"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "تسجيل الشركات" : "Company Registration"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "رفع الحملات" : "Upload Campaigns"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "التقارير الفورية" : "Instant Reports"}
                </a>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {lang === "ar" ? "للشركات" : "For Companies"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "إدارة الحملات" : "Manage Campaigns"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar"
                    ? "التقارير والتحليلات"
                    : "Reports & Analytics"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "بوابات الدفع" : "Payment Gateways"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "إدارة الحساب" : "Account Management"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@tqryrads.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+966 55 574 4807</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {lang === "ar"
                    ? "مكة المكرمة. المملكة العربية السعودية"
                    : "Maka Elmokarama, Saudi Arabia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {lang === "ar"
              ? "© 2024 منصة تقرير. جميع الحقوق محفوظة."
              : "© 2024 Taqreer Platform. All rights reserved."}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "ar" ? "شروط الاستخدام" : "Terms of Use"}
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "ar" ? "اتفاقية الاستخدام" : "User Agreement"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
