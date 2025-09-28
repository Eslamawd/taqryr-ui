"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Briefcase,
  Building2,
  Contact,
  CreditCard,
  LogOut,
  Plane,
  TicketCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminLayout({ children }) {
  const { lang, t } = useLanguage();
  const { logout, user } = useAuth();
  const router = useRouter();

  if (!user && user?.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("فشل تسجيل الخروج:", err);
    }
  };

  return (
    <motion.div
      dir={lang === "ar" ? "rtl" : "ltr"} // الاتجاه
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mt-16 py-8"
    >
      {/* العنوان + زر تسجيل الخروج */}
      <div className="flex justify-between  items-center mb-8">
        <h1 className="text-3xl font-bold">
          {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
        </h1>
        <div className="flex items-center gap-3">
          <Button onClick={handleLogout}>
            <LogOut className="" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* القائمة الجانبية */}
        <motion.div
          dir={lang === "ar" ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="md:col-span-1 text-gray-200"
        >
          <Card>
            <CardContent className="p-8">
              <nav className="space-y-2">
                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <BarChart3 className="h-6 w-6" />
                    {lang === "ar" ? "لوحة المعلومات" : "Dashboard"}
                  </Link>
                </Button>

                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/customers"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <Users className="h-6 w-6" />
                    {lang === "ar" ? "العملاء" : "Customers"}
                  </Link>
                </Button>

                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/ads"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <TicketCheck className="h-6 w-6" />
                    {lang === "ar" ? "الإعلانات" : "Ads"}
                  </Link>
                </Button>

                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/subscriptions"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <Building2 className="h-6 w-6" />
                    {lang === "ar" ? " الاشتراكات" : "Subscriptions"}
                  </Link>
                </Button>
                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/plan-sub"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <Plane className="h-6 w-6" />
                    {lang === "ar" ? "  خطط الاشتراكات" : " Plans"}
                  </Link>
                </Button>
                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/payments"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <CreditCard className="h-6 w-6" />
                    {lang === "ar" ? "  المدفوعات" : " Payments"}
                  </Link>
                </Button>
                <Button className="flex items-center w-full hover: justify-center">
                  <Link
                    href="/admin/contacts"
                    className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-primary"
                  >
                    <Contact className="h-6 w-6" />
                    {lang === "ar" ? "  الاتصالات" : " Contacts"}
                  </Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* المحتوى الرئيسي */}
        <main className="md:col-span-4">{children}</main>
      </div>
    </motion.div>
  );
}
