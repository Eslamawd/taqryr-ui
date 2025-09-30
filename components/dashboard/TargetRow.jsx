import React from "react";
import MultiSelect from "../ui/MultiSelect";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export default function TargetRow({
  index,
  data,
  onChange,
  countries,
  onRemove,
  targetingsSnap,
}) {
  const handle = (field, value) => onChange(index, field, value);

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MultiSelect
          label="الدوله"
          name="countries"
          options={countries}
          value={data.country}
          valueKey="code"
          onChange={(_, v) => handle("country", v)}
        />

        <MultiSelect
          label="المنطقة"
          name="region"
          options={targetingsSnap.regions}
          value={data.region}
          onChange={(_, v) => handle("region", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>الجنس</Label>
          <select
            value={data.gender}
            onChange={(e) => handle("gender", e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-gray-100"
          >
            <option value="all">الكل</option>
            <option value="male">ذكور</option>
            <option value="female">إناث</option>
          </select>
        </div>
        <MultiSelect
          label="فئة العمر"
          name="age_group"
          options={targetingsSnap.ageGroups}
          value={data.age_group ? [data.age_group] : []}
          onChange={(_, v) => handle("age_group", v[0] || "")}
          valueKey="name"
        />
        <MultiSelect
          label="فئة languages"
          name="languages"
          options={targetingsSnap.languages}
          value={data.languages}
          onChange={(_, v) => handle("languages", v)}
        />
        <MultiSelect
          label="نظام التشغيل"
          name="os_type"
          options={targetingsSnap.osTypes}
          value={data.os_type}
          onChange={(_, v) => handle("os_type", v)}
        />
      </div>
      <MultiSelect
        label="الاهتمامات"
        name="interests"
        options={targetingsSnap.interests}
        value={data.interests}
        onChange={(_, v) => handle("interests", v)}
      />
      {index > 0 && (
        <span
          type="button"
          onClick={() => onRemove(index)}
          className="bg-red-600 text-white"
        >
          حذف
        </span>
      )}
    </div>
  );
}
