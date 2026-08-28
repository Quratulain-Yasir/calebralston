"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";

export default function SpeakingForm({ blok }: { blok: any }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    blok.fields?.forEach((field: any) => {
      if (field.required && !values[field.field_name]) {
        newErrors[field.field_name] = true;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", values);
    }
  }

  return (
    <form
      {...storyblokEditable(blok)}
      onSubmit={handleSubmit}
      className="rounded-md bg-primary p-6 sm:p-10 md:w-3/5"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {blok.fields?.map((field: any) => {
          const options = field.options
            ? field.options.split(",").map((o: string) => o.trim())
            : [];

          return (
            <div key={field._uid}>
              <label className="mb-2 block text-sm font-semibold text-white">
                {field.label} {field.required && "*"}
              </label>

              {field.field_type === "select" ? (
                <select
                  value={values[field.field_name] || ""}
                  onChange={(e) =>
                    handleChange(field.field_name, e.target.value)
                  }
                  className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sage"
                >
                  <option value="" disabled>
                    Select one...
                  </option>
                  {options.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.field_type || "text"}
                  placeholder={field.placeholder}
                  value={values[field.field_name] || ""}
                  onChange={(e) =>
                    handleChange(field.field_name, e.target.value)
                  }
                  className="w-full rounded-lg bg-ink/60 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sage"
                />
              )}

              {errors[field.field_name] && (
                <p className="mt-1 text-sm text-red-400">
                  {field.label} is required
                </p>
              )}
            </div>
          );
        })}
      </div>

      {blok.submit_label && (
        <div className="mt-8 flex justify-center items-center sm:justify-start">
          <button
            type="submit"
            className="rounded-lg bg-white px-8 py-3 font-bold text-ink transition hover:opacity-90"
          >
            {blok.submit_label}
          </button>
        </div>
      )}
    </form>
  );
}