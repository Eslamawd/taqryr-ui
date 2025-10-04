"use client";
import { toast } from "sonner";

export const handleMultipleFileUpload = async (e, setFormData) => {
  const file = e.target.files[0];

  // ✅ لازم يكون صورة أو فيديو
  if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
    toast.error("الملف لازم يكون صورة أو فيديو");
    return;
  }

  // ✅ الحجم الأقصى (32MB)
  if (file.size > 32 * 1024 * 1024) {
    toast.error(`الملف ${file.name} أكبر من 32MB`);
    return;
  }

  /**
   * 🖼️ صور
   */
  if (file.type.startsWith("image/")) {
    const img = new Image();
    img.onload = function () {
      if (img.width < 400 || img.height < 700) {
        toast.error(
          `جودة الصورة ${file.name} قليلة (${img.width}x${img.height})`
        );
        return;
      }
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, file],
        filePreviews: [...prev.filePreviews, preview],
      }));
    };
    img.src = URL.createObjectURL(file);
    return;
  }

  /**
   * 🎥 فيديوهات
   */
  const video = document.createElement("video");
  video.preload = "metadata";

  video.onloadedmetadata = function () {
    window.URL.revokeObjectURL(video.src);

    const duration = video.duration;
    const width = video.videoWidth;
    const height = video.videoHeight;

    // لو المتصفح مقدرش يجيب الأبعاد أو الطول → نقبل الملف مع تحذير
    if (!duration || !width || !height) {
      toast.warning(
        `تم قبول الفيديو ${file.name}، لكن المتصفح لم يتمكن من قراءة البيانات (قد يكون من iPhone)`
      );
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, file],
        filePreviews: [...prev.filePreviews, preview],
      }));
      return;
    }

    // ✅ المدة (3s - 180s)
    if (duration < 3 || duration > 180) {
      toast.error(`الفيديو ${file.name} لازم يكون بين 3 و 180 ثانية`);
      return;
    }

    // ✅ الأبعاد (540x960 على الأقل)
    if (width < 540 || height < 960) {
      toast.error(`جودة الفيديو ${file.name} قليلة (${width}x${height})`);
      return;
    }

    // ✅ الفيديو صالح → أضفه للـ state
    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, file],
      filePreviews: [...prev.filePreviews, preview],
    }));
  };

  video.onerror = function () {
    // 🔄 fallback لقبول فيديوهات MOV أو غير المقروءة
    toast.warning(
      `تم قبول الفيديو ${file.name} (صيغة غير مدعومة للمعاينة مثل iPhone MOV)`
    );
    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, file],
      filePreviews: [...prev.filePreviews, preview],
    }));
  };

  video.src = URL.createObjectURL(file);
};
