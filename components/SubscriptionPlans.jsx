"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { loadPlanSub } from "@/lib/planSubApi";
import { useCurrency } from "@/context/CurrencyContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { renewSubscriptionAPI } from "@/lib/subscriptionApi";

const SubscriptionCard = ({ plan, isSelected, onClick, onRenew }) => {
  const discount = plan.discount || 30;
  const discountedPrice = plan.price;
  const oldPrice = discountedPrice * (1 + discount / 100);
  const { lang } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative cursor-pointer rounded-xl p-6 md:p-8 shadow-lg ${
        isSelected
          ? "bg-gradient-to-r from-purple-700 to-purple-500"
          : "bg-gray-900"
      }`}
      onClick={onClick}
    >
      {discount > 0 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
          -{discount}%
        </div>
      )}

      <h3
        className={`text-xl md:text-2xl font-bold mb-2 ${
          discount > 20 ? "text-yellow-400" : "text-white"
        }`}
      >
        {lang === "ar" ? plan.name_ar : plan.name}
      </h3>
      <h3
        className={`text-xl md:text-2xl font-bold mb-2 ${
          discount > 20 ? "text-yellow-400" : "text-white"
        }`}
      >
        {Math.floor(plan.duration_days / 30)} {lang === "ar" ? "شهر" : "Month"}
      </h3>

      <p className="text-3xl md:text-4xl font-bold text-white mb-4">
        {formatPrice(discountedPrice)}
      </p>

      <span className="line-through text-gray-400 text-sm">
        {formatPrice(oldPrice)}
      </span>

      <ul className="text-gray-300 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index}>
            {lang === "ar" ? `• ${feature.title_ar}` : `• ${feature.title}`}
          </li>
        ))}
      </ul>

      <button
        className="mt-6 w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
        onClick={(e) => {
          e.stopPropagation();
          onRenew(plan);
        }}
      >
        {lang === "ar" ? "اختر الاشتراك " : " Select Plan"}
      </button>
    </motion.div>
  );
};

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(3);
  const { user } = useAuth();
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { lang } = useLanguage();

  const fetchPlanSubs = async () => {
    try {
      const response = await loadPlanSub();
      setPlans(response || []);

      if (response?.length === 0) {
        toast.info(lang === "ar" ? "لا يوجد خطط" : "No plans available");
      }
    } catch (error) {
      console.error("فشل في جلب الخطط ", error);
      toast.error("خطأ في تحميل البيانات");
    }
  };

  useEffect(() => {
    fetchPlanSubs();
  }, []);

  const handleRenewPlan = (plan) => {
    setSelectedPlan(plan);
    setShowRenewDialog(true);
  };

  const confirmRenew = async () => {
    try {
      if (!user) {
        toast.error(
          lang === "ar" ? "يرجى تسجيل الدخول أولاً" : "Please log in first"
        );
        setShowRenewDialog(false);
        return;
      }
      if (user.balance < selectedPlan.price) {
        toast.error(lang === "ar" ? "رصيدك غير كافٍ" : "Insufficient balance");
        setShowRenewDialog(false);
        return;
      }
      const res = renewSubscriptionAPI(selectedPlan.id);
      // await renewPlanAPI(selectedPlan.id);  // ← هنا
      // توصل بالـ backend
      toast.success(lang === "ar" ? "تم التجديد بنجاح" : "Plan renewed!");
      toast.success(`${res.message}`);
      setShowRenewDialog(false);
    } catch (err) {
      toast.error(lang === "ar" ? "فشل التجديد" : "Renew failed");
    }
  };

  return (
    <>
      <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 text-center">
          {lang === "ar" ? "اختر خطة الاشتراك " : "Choose Your Subscription"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          <AnimatePresence>
            {plans.map((plan, idx) => (
              <SubscriptionCard
                key={idx}
                plan={plan}
                isSelected={selected === idx}
                onClick={() => setSelected(idx)}
                onRenew={handleRenewPlan}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AlertDialog open={showRenewDialog} onOpenChange={setShowRenewDialog}>
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lang === "ar" ? "تأكيد التجديد" : "Confirm Renewal"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {lang === "ar"
                ? `هل تريد تجديد خطة ${selectedPlan?.name_ar} ؟`
                : `Do you want to renew the ${selectedPlan?.name} plan?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRenew}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              {lang === "ar" ? "تجديد" : "Renew"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
