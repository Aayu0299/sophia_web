"use client";

import { TEXT } from "@/app/utils/Text";
import { useEffect } from "react";

export default function UserTypeModal({ open, onClose, onSelect, selected }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const options = [
    { key: "patient", label: TEXT.PATIENT },
    { key: "doctor", label: TEXT.DOCTOR },
    { key: "family", label: TEXT.FAMILY },
    { key: "caregiver", label: TEXT.CAREGIVER },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--black)">{TEXT.USER_TYPE}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-(--grayshade) hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.label)}
              className={`h-20 rounded-xl border text-sm font-medium transition [box-shadow:var(--boxshadow-input)] hover:shadow ${
                selected === opt.label ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-(--black)"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 rounded-lg bg-(--black) px-4 text-white"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}


