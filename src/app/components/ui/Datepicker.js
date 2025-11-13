"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";

export const CommonDatePicker = ({ label, selected, onChange, error }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="font-medium text-[20px] text-(--black)">{label}</label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex border-none items-center justify-between bg-white rounded-xl border transition-all duration-200 cursor-pointer 
          hover:border-(--darkblue) focus-within:border-(--darkblue) 
          [box-shadow:var(--boxshadow-input)] mt-2`}
      >
        <input
          readOnly
          value={selected ? format(selected, "dd/MM/yyyy") : ""}
          placeholder={TEXT.ENTER_BOD}
          className="w-full h-[58px] text-[16px] px-3 bg-transparent outline-none  placeholder:text-(--grayshade) rounded-xl "
        />
        <Icons.SlCalender
          size={22}
          className="text-gray-500 mr-4 pointer-events-none"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-xl mt-2 border border-gray-200 p-2">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            styles={{
              caption: { color: "var(--darkblue)", fontWeight: 600 },
              head_cell: { color: "#004396" },
              day: { borderRadius: "8px", fontSize: "14px" },
              day_selected: {
                backgroundColor: "var(--darkblue)",
                color: "white",
              },
              day_today: {
                border: "1px solid var(--darkblue)",
                fontWeight: 600,
              },
              day_outside: { color: "#d1d5db" },
            }}
          />
        </div>
      )}

      {error && <p className="mt-2 text-[12px] text-(--redshade)">{error}</p>}
    </div>
  );
};
