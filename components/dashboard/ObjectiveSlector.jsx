import React, { useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { ImageUpIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";

function TooltipLabel({ label, tooltip, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mb-4">
      <Label className="flex items-center gap-2">
        {label}
        <InfoIcon
          className="h-4 w-4 cursor-pointer text-white"
          onMouseEnter={() => setShow(true)}
          onClick={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        />
      </Label>
      {show && (
        <span className="absolute left-0 top-full mt-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg z-10">
          {tooltip}
        </span>
      )}
      {children}
    </div>
  );
}

function ObjectiveSelector({ formData, onChange, lang }) {
  const [logo, setLogo] = useState({ imageFile: null, imageUrl: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // ✅ تحقق من حجم
    if (file.size > 2 * 1024 * 1024) {
      toast.error("⚠️ حجم الملف أكبر من 2MB. اختر صورة أصغر.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const { width, height } = img;
        if (
          width < 200 ||
          height < 200 ||
          width > 2000 ||
          height > 2000 ||
          width !== height
        ) {
          toast.error(
            "⚠️ الأبعاد غير صحيحة. يجب أن تكون مربعة، وألا تقل عن 200x200 ولا تزيد عن 2000x2000."
          );
          return;
        } // ✅ لو كل شيء تمام
        setLogo({ imageFile: file, imageUrl: reader.result });
        onChange({ ...formData, logo_image: file });
      };
    };
    reader.readAsDataURL(file);
  };
  const handleInputChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    if (logo.imageFile) updated.logo_image = logo.imageFile;
    onChange(updated);
  };

  const TRAFFIC = () => (
    <TooltipLabel
      label={lang === "ar" ? "عنوان URL للموقع الإلكتروني" : "Link or Url Site"}
      tooltip={
        lang === "ar"
          ? "الرابط الذي سيتم توجيه المستخدم إليه عند الضغط على الإعلان."
          : "The link where users will be directed after clicking your ad."
      }
    >
      <Input
        name="link"
        value={formData.link || ""}
        placeholder={
          lang === "ar" ? "أدخل رابط موقعك" : "Enter your website URL"
        }
        onChange={handleInputChange}
        required
      />
    </TooltipLabel>
  );

  const APP_PROMOTION = () => (
    <>
      <TooltipLabel
        label={lang === "ar" ? "اسم التطبيق" : "App Name"}
        tooltip={
          lang === "ar"
            ? "يعرضه كجزء من إعلانك."
            : "Display it as part of your ad."
        }
      >
        <Input
          name="name_app"
          value={formData.name_app || ""}
          placeholder={
            lang === "ar" ? "أدخل  اسم التطبيق" : "Enter your App Name"
          }
          onChange={handleInputChange}
          required
        />
      </TooltipLabel>

      <TooltipLabel
        label={lang === "ar" ? "معرّف Uri لرابط تشعبي" : "Uri ID"}
        tooltip={
          lang === "ar"
            ? "الوجهة التي سينتقل إليها المُستخدم بعد النقر على إعلانك."
            : "The destination where users will go after clicking your ad."
        }
      >
        <Input
          name="uri_app_id"
          type="url"
          value={formData.uri_app_id || ""}
          placeholder={"yourapp://yourlink"}
          onChange={handleInputChange}
          required
        />
      </TooltipLabel>

      <TooltipLabel
        label={lang === "ar" ? "عنوان URL لتطبيق Android" : "Android URL"}
        tooltip={
          lang === "ar"
            ? "مطلوب إذا كنت تريد الإعلان عن تطبيق Android. معرّف المتجر بعد id= في الرابط (مثال: com.android)."
            : "Required if you want to advertise an Android app. The Play Store ID comes after id= in the URL (e.g. com.android)."
        }
      >
        <Input
          name="android_id"
          value={formData.android_id || ""}
          placeholder={"myapp.android.com"}
          onChange={handleInputChange}
          required
        />
      </TooltipLabel>

      <TooltipLabel
        label={lang === "ar" ? "معرّف تطبيق iOS" : "iOS ID"}
        tooltip={
          lang === "ar"
            ? "مطلوب إذا كنت تريد الإعلان عن تطبيق iOS. يجب أن يكون رقمًا فقط (مثال: 447188370)."
            : "Required if you want to advertise an iOS app. Must be numeric only (e.g. 447188370)."
        }
      >
        <Input
          name="iphone_id"
          value={formData.iphone_id || ""}
          placeholder={"123456789"}
          onChange={handleInputChange}
          required
        />
      </TooltipLabel>

      <TooltipLabel
        label={lang === "ar" ? "أيقونة تطبيقك" : "App Logo"}
        tooltip={
          lang === "ar"
            ? "الأبعاد: من 200×200 إلى 2000×2000 بكسل. مربعة الشكل. الحجم الأقصى: 2MB."
            : "Min size: 200x200, Max size: 2000x2000. Must be square. Max file size: 2MB."
        }
      >
        <Input
          id="image"
          type="file"
          className="hidden"
          onChange={handleImageChange}
          required
        />
        <Label
          htmlFor="image"
          className="cursor-pointer flex items-center gap-2"
        >
          <ImageUpIcon className="h-6 w-6 text-white" />
          {lang === "ar" ? "رفع أيقونة" : "Upload Icon"}
        </Label>
        {logo.imageUrl && (
          <img
            src={logo.imageUrl}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover border rounded"
          />
        )}
      </TooltipLabel>
    </>
  );

  switch (formData.objective) {
    case "TRAFFIC":
      return TRAFFIC();
    case "APP_PROMOTION":
      return APP_PROMOTION();
    default:
      return null;
  }
}

export default ObjectiveSelector;
