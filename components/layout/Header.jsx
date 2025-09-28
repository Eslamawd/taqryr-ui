"use client";
import { User, LogOut, Settings, Globe2, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import UserBalance from "../balance/UserBalance";
import { useCurrency } from "@/context/CurrencyContext";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { user, logout } = useAuth();

  return (
    <motion.div
      dir={lang === "ar" ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#0f1020] text-gray-200 w-full relative"
    >
      <header className="fixed top-0 left-0 pb-2 right-0  z-50  backdrop-blur-md   rounded-b-4xl">
        <div className="mx-auto max-w-7xl px-4 pt-2 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-3">
            <div className="h-10 w-10 hidden md:block rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500  items-center justify-center font-black text-[#0f1020] text-lg"></div>
            <h1 className="font-extrabold text-xl text-emerald-500">
              {lang === "ar" ? "تقرير" : "TQRYR"}
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <Link href="/#how" className="hover:text-white transition">
              {lang === "ar" ? "آلية العمل" : "How It Works"}
            </Link>
            <Link href="/#features" className="hover:text-white transition">
              {lang === "ar" ? "المميزات" : "Features"}
            </Link>
            <Link href="/#faq" className="hover:text-white transition">
              {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </Link>
            <Link href="/#contact" className="hover:text-white transition">
              {lang === "ar" ? "التواصل" : "Contact"}
            </Link>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <span
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-600 hover:border-gray-400 text-sm transition"
            >
              {lang === "ar" ? "EN" : "AR"}
            </span>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-1  text-sm rounded-xl border border-white/20"
            >
              <option className="bg-black" value="SAR">
                SAR
              </option>
              <option className="bg-black" value="USD">
                USD
              </option>
            </select>

            {/* Admin / Dashboard */}
            {user && user.role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 hidden md:block rounded-xl border border-gray-600 hover:border-gray-400 transition"
              >
                {lang === "ar" ? "إدارة" : "Admin"}
              </Link>
            )}

            {user ? (
              <>
                <UserBalance />
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl hidden md:block border border-gray-600 hover:border-gray-400 transition"
                >
                  {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 hidden md:block rounded-xl border border-gray-600 hover:border-gray-400 transition"
                >
                  {lang === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
                <Link
                  href="/register"
                  className="px-2 py-1 md:px-4 md:py-2 md:text text-sm rounded-xl bg-gradient-to-l from-emerald-400 to-cyan-500  text-[#0f1020] font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition"
                >
                  {lang === "ar" ? "إنشاء حساب" : "Register"}
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <span onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-7 h-7 text-white" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-2/3 bg-gray-900 shadow-xl p-6 z-50 md:hidden flex flex-col gap-4"
            >
              {user?.role === "admin" && (
                <Button
                  onClick={() => setMenuOpen(false)}
                  className="justify-between"
                >
                  <Link
                    href="/admin"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <Settings className="w-4 h-4" />
                    {lang === "ar" ? "إدارة" : "Admin"}
                  </Link>
                </Button>
              )}

              {user ? (
                <>
                  <Button
                    onClick={() => setMenuOpen(false)}
                    className="justify-between"
                  >
                    <Link
                      href={"/dashboard"}
                      className="flex items-center justify-center gap-2 w-full"
                    >
                      <User className="w-4 h-4" />
                      {user.name || (lang === "ar" ? "حسابي" : "My Account")}
                    </Link>
                  </Button>
                  <Button onClick={() => logout()} className=" justify-center">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <LogOut className="w-4 h-4" />
                      {lang === "ar" ? "تسجيل  " : "LogOut"}
                    </div>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setMenuOpen(false)}
                  className="justify-center"
                >
                  <Link
                    href={"/login"}
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <User className="w-4 h-4" />
                    {lang === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                </Button>
              )}

              {/* Other Links */}

              <Button className="w-full">
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  {lang === "ar" ? "عنّا" : "About Us"}
                </Link>
              </Button>
            </motion.div>

            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
