"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { addNewAd } from "@/lib/adsApi";
import { getCountry, getTargetingSnap } from "@/lib/targetingApi";
import TargetRow from "./TargetRow";
import PhoneVideoPreview from "../PhoneVideoPreview";
import PlatformPicker from "./PlatformPicker";
import { useAuth } from "@/context/AuthContext";
import { getBalanceUser } from "@/lib/walletApi";
import PlatformPickerCreate from "./PlatformPickerCreate";
import ObjectivePicker from "./ObjectivePicker";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { InfoIcon } from "lucide-react";
import ObjectiveSelector from "./ObjectiveSlector";

export default function CreateAdsForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    platform: [],
    objective: "",
    budget: "100",
    start_date: "",
    link: "",
    iphone_id: "",
    android_id: "",
    name_app: "",
    logo_image: "",
    end_date: "",
    files: [],
    filePreviews: [],
  });
  const [countries, setCountries] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  const { formatPrice } = useCurrency();

  const [days, setDays] = useState("2");
  const [dailySpend, setDailySpend] = useState(0);
  const [targets, setTargets] = useState([
    {
      country: "",
      gender: "all",
      region: [],
      age_group: "",
      languages: [],
      os_type: [],
      interests: [],
    },
  ]);

  const [targetingsSnap, setTargetingsSnap] = useState({
    regions: [],
    languages: [],
    ageGroups: [],
    osTypes: [],
    interests: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const { lang } = useLanguage();
  const { user } = useAuth();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMultipleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      // ✅ التحقق من النوع
      if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
        toast.error("الملف لازم يكون صورة أو فيديو");
        return;
      }

      // ✅ التحقق من الحجم (مثال: 30MB)
      if (file.size > 30 * 1024 * 1024) {
        toast.error(`الملف ${file.name} أكبر من 30MB`);
        return;
      }

      // لو صورة ندخلها على طول
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, file],
          filePreviews: [...prev.filePreviews, preview],
        }));
        return;
      }

      // لو فيديو: نعمل تحقق من الطول والأبعاد
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);

        const duration = video.duration;
        const width = video.videoWidth;
        const height = video.videoHeight;

        if (duration > 180) {
          toast.error(`الفيديو ${file.name} أطول من 3 دقائق`);
          return;
        }

        if (width < 540 || height < 960) {
          toast.error(`جودة الفيديو ${file.name} قليلة (${width}x${height})`);
          return;
        }

        // ✅ الفيديو صالح → أضف للـ state
        const preview = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, file],
          filePreviews: [...prev.filePreviews, preview],
        }));
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(formData.filePreviews[index]);
    setFormData((prev) => {
      const files = [...prev.files];
      const previews = [...prev.filePreviews];
      files.splice(index, 1);
      previews.splice(index, 1);
      return { ...prev, files, filePreviews: previews };
    });
  };

  const updateTarget = (index, field, value) => {
    const updated = [...targets];
    updated[index][field] = value;
    setTargets(updated);
  };

  const addTargetRow = () =>
    setTargets((prev) => [
      ...prev,
      {
        country: "",
        gender: "all",
        region: [],
        age_group: "",
        languages: [],
        os_type: [],
        interests: [],
      },
    ]);

  const removeTargetRow = (index) =>
    setTargets((prev) => prev.filter((_, i) => i !== index));

  const fetchTargeting = async (country) => {
    try {
      const res = await getTargetingSnap(country);
      const data = await res.data;
      console.log(data);
      const extract = (type) =>
        data.find((x) => x.type === type)?.options ?? [];
      setTargetingsSnap({
        regions: extract("geos:region").map((o) => o.region.region || o),
        languages: extract("demographics:languages").map(
          (o) => o.languages || o
        ),
        ageGroups: extract("demographics:age_groups").map(
          (o) => o.age_group || o
        ),
        osTypes: extract("devices:os_type").map((o) => o.os_type || o),
        interests: extract("interests:slc").map((o) => o.scls || o),
      });
      console.log(targetingsSnap);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await getCountry();
      setCountries(res.country);
    } catch (eror) {
      toast.error("Can not Get Country");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userBalance);
    const totalCost = formData.budget * days * formData.platform.length;

    if (userBalance < totalCost) {
      return toast.error(
        "رصيدك لا يكفي لتشغيل الإعلان على كل المنصات المختارة"
      );
    }
    if (!formData.name || !formData.platform)
      return toast.error("أدخل اسم الإعلان والمنصة");
    if (!formData.files.length)
      return toast.error("ارفع صورة أو فيديو واحد على الأقل");
    setIsLoading(true);
    try {
      const payload = new FormData();
      for (let key of [
        "name",
        "objective",
        "start_date",
        "end_date",
        "link",
        "name_app",
        "iphone_id",
        "android_id",
      ])
        payload.append(key, formData[key]);
      // المنصات (array)
      formData.platform.forEach((p) => payload.append("platform[]", p));
      payload.append("budget", formData.budget * days);

      formData.files.forEach((f) => payload.append("files[]", f));
      if (formData.logo_image) {
        payload.append("logo_image", formData.logo_image);
      }
      payload.append("targets", JSON.stringify(targets));
      const res = await addNewAd(payload);
      if (res?.status === "success") {
        onSuccess();
        toast.success("تم إنشاء الإعلان");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else toast.error("فشل إنشاء الإعلان");
    } catch (err) {
      console.error(err);
      toast.error("فشل في إنشاء الإعلان");
    } finally {
      setIsLoading(false);
    }
  };
  const updateValues = useCallback(() => {
    const daysNum = Number(days) || 2; // ضمان إنه رقم
    const budgetNum = Number(formData.budget) || 100;

    const calculatedSpend = daysNum > 0 ? budgetNum * daysNum : 0;
    setDailySpend(calculatedSpend);

    const today = new Date();
    const start = today.toISOString().split("T")[0];

    today.setDate(today.getDate() + daysNum); // ✅ استخدم رقم
    const end = today.toISOString().split("T")[0];

    setFormData((prev) => ({
      ...prev,
      start_date: start,
      end_date: end,
    }));
  }, [days, formData.budget]);

  const fetchUserBalance = async () => {
    if (user) {
      try {
        const response = await getBalanceUser(user.id);
        const safeBalance = Math.max(0, response.balance || 0);
        setUserBalance(safeBalance);
      } catch (error) {
        console.error("Error fetching user balance:", error);
        toast.error("Failed to fetch balance");
      }
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchUserBalance();
  }, []);

  useEffect(() => {
    updateValues();
    if (targets.length && targets[0].country) {
      fetchTargeting(targets[0].country);
    }
  }, [updateValues, targets]);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-2xl shadow-xl bg-gray-900 text-gray-100"
    >
      <h2 className="text-2xl font-bold">إنشاء إعلان جديد</h2>

      {/* الحقول الأساسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <PlatformPickerCreate
            value={formData.platform}
            onChange={(val) => setFormData({ ...formData, platform: val })}
          />
          <p className="text-xs text-gray-400 mt-2">
            * سيتم خصم{" "}
            <span className="font-bold text-white">{formData.budget}</span> من
            رصيدك لكل منصة يتم اختيارها.
          </p>
        </div>
        <div>
          <Label>اسم الحملة</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="md:col-span-2">
          <ObjectivePicker
            value={formData.objective}
            onChange={(val) => setFormData({ ...formData, objective: val })}
          />
        </div>

        <ObjectiveSelector
          formData={formData}
          onChange={setFormData}
          lang={lang}
        />

        {/* Calculated Results Section */}
        <div className="flex flex-col gap-4 border-t border-[#424e6c] pt-6 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#a4b0c0]">
              الميزانية الإجمالية المتوقعة:
            </span>
            <span className="font-bold text-white text-lg">
              {formatPrice(dailySpend)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#a4b0c0]">
              تاريخ انتهاء الحملة:
            </span>
            <span className="font-bold text-white text-lg">
              {formData.end_date}
            </span>
          </div>
        </div>

        <div>
          <Label
            htmlFor="budgetSlider"
            className="text-lg font-medium text-[#a4b0c0]"
          >
            الميزانية اليومية الإجمالية
          </Label>
          <div className="flex items-center gap-4 ">
            <Input
              type="number"
              name="budget"
              id="budget"
              min="100"
              max="5000"
              step="50"
              value={formData.budget || "100"}
              onChange={handleInputChange}
            />
            <span className="text-xl font-bold text-white min-w-[90px] text-right">
              {formatPrice(formData.budget || 100)}
            </span>
          </div>

          {/* Duration Slider Section */}

          <Label
            htmlFor="daysSlider"
            className="text-lg font-medium text-[#a4b0c0]"
          >
            مدة الحملة بالأيام
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              id="daysSlider"
              min="2"
              max="30"
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 2)} // ✅ خليه دايمًا رقم
            />

            <span className="text-xl font-bold text-white min-w-[90px] text-right">
              {days} يوم
            </span>
          </div>
        </div>
      </div>

      {/* رفع الملفات */}
      <div>
        <Label>الملفات</Label>
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-4 text-center hover:bg-gray-800 transition cursor-pointer">
          <label className="cursor-pointer text-sm text-gray-400">
            اسحب أو اضغط للرفع
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleMultipleFileUpload}
            />
          </label>
        </div>
        {!!formData.filePreviews.length && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.filePreviews.map((src, idx) => (
              <div key={idx} className="relative">
                {formData.files[idx].type.startsWith("video") ? (
                  <video
                    src={src}
                    className="w-24 h-24 object-cover rounded border border-gray-700"
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={src}
                    alt=""
                    className="w-24 h-24 object-cover rounded border border-gray-700"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {/* معاينة الفيديو داخل الموبايل */}
        {formData.filePreviews.some((_, idx) =>
          formData.files[idx].type.startsWith("video")
        ) && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">معاينة الفيديو (موبايل)</h3>
            <PhoneVideoPreview
              videoUrl={formData.filePreviews.find((_, idx) =>
                formData.files[idx].type.startsWith("video")
              )}
            />
          </div>
        )}
      </div>

      {/* الاستهداف */}
      <div>
        <Label>الاستهدافات</Label>
        {targets.map((t, i) => (
          <TargetRow
            key={i}
            index={i}
            data={t}
            countries={countries}
            onChange={updateTarget}
            onRemove={removeTargetRow}
            targetingsSnap={targetingsSnap}
          />
        ))}
        <Button
          type="button"
          onClick={addTargetRow}
          className="mt-2 bg-emerald-500 text-black font-semibold"
        >
          + إضافة استهداف
        </Button>
      </div>

      {/* أزرار التحكم */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onCancel}
          className="border border-gray-700 text-gray-100"
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-500 text-black font-semibold"
        >
          {isLoading ? "جارٍ الإرسال..." : "إنشاء الإعلان"}
        </Button>
      </div>
    </form>
  );
}
