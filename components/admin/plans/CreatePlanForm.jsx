// src/components/admin/customization/CreatePlanForm.jsx
"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/Input.jsx";
import { Label } from "../../ui/Label.jsx";
import { Separator } from "../../ui/Separator.jsx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addNewPlanSub } from "@/lib/planSubApi.js";

function CreatePlanForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    duration_days: 0,
    features: [{ title: "", title_ar: "" }],
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index][field] = value;
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", title_ar: "" }],
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a valid plan name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await addNewPlanSub(formData);
      if (res) {
        toast.success("تم إنشاء الخطة بنجاح ✅");
        onSuccess && onSuccess(res);
        router.push("/admin/plan-sub");
        onCancel && onCancel();
      }
    } catch (err) {
      console.error("Error creating plan:", err);
      toast.error("حدث خطأ أثناء الإنشاء");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg shadow bg-black"
    >
      {/* Plan Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Plan Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Example: Premium Plan"
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          min="0"
          required
        />
      </div>

      {/* Duration Days */}
      <div className="space-y-2">
        <Label htmlFor="duration_days">Duration (Days)</Label>
        <Input
          id="duration_days"
          name="duration_days"
          type="number"
          value={formData.duration_days}
          onChange={handleInputChange}
          min="1"
          required
        />
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-4">
        <Label>Features</Label>
        {formData.features.map((feature, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
          >
            <Input
              type="text"
              value={feature.title}
              onChange={(e) =>
                handleFeatureChange(index, "title", e.target.value)
              }
              placeholder={`Feature ${index + 1} (EN)`}
              required
            />
            <Input
              type="text"
              value={feature.title_ar}
              onChange={(e) =>
                handleFeatureChange(index, "title_ar", e.target.value)
              }
              placeholder={`الميزة ${index + 1} (AR)`}
              required
            />
            {formData.features.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeFeature(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addFeature}>
          + Add Feature
        </Button>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Plan"}
        </Button>
      </div>
    </form>
  );
}

export default CreatePlanForm;
