"use client";
import { toast } from "sonner";

export const handleMultipleFileUpload = async (e, setFormData) => {
  const file = e.target.files[0];
  if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
    toast.error("الملف لازم يكون صورة أو فيديو");
    return;
  }

  if (file.size > 32 * 1024 * 1024) {
    toast.error(`الملف ${file.name} أكبر من 32MB`);
    return;
  }

  // 🖼️ صور
  if (file.type.startsWith("image/")) {
    const img = new Image();
    img.onload = function () {
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

  // 🎥 فيديوهات
  const video = document.createElement("video");
  video.preload = "metadata";

  video.onloadedmetadata = function () {
    window.URL.revokeObjectURL(video.src);
    const duration = video.duration;
    const width = video.videoWidth;
    const height = video.videoHeight;

    // 🧠 Detect Safari or iPhone MOV
    const isMOV = file.name.toLowerCase().endsWith(".mov");
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // لو Safari أو MOV → نتجاهل التحقق الصارم
    if (isMOV || isSafari) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, file],
        filePreviews: [...prev.filePreviews, preview],
      }));
      toast.success(`تم قبول فيديو iPhone (${file.name})`);
      return;
    }

    if (duration < 3 || duration > 180) {
      toast.error(`الفيديو ${file.name} لازم يكون بين 3 و 180 ثانية`);
      return;
    }

    if (width < 540 || height < 960) {
      toast.warning(
        `الفيديو ${file.name} تم قبوله رغم أن الجودة (${width}x${height}) أقل من الموصى بها`
      );
    }

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, file],
      filePreviews: [...prev.filePreviews, preview],
    }));
  };

  video.onerror = function () {
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
