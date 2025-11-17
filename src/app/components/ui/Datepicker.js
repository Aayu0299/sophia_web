"use client";

import React, { useState, useRef, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";

const dateFormat = "DD/MM/YYYY";

export const CommonDatePicker = ({
  label,
  selected,
  onChange,
  error,
  disabled = false,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const datePickerRef = useRef(null);

  // CLOSE WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        // Check if click is on Ant Design calendar popup
        const antdCalendar = document.querySelector(".ant-picker-dropdown");
        if (antdCalendar && antdCalendar.contains(e.target)) {
          return; // Don't close if clicking inside calendar
        }
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close calendar when date is selected
  const handleDateChange = (date) => {
    onChange(date ? date.toDate() : null);
    setIsOpen(false);
  };

  // Handle input click
  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Convert selected date to dayjs format
  const getDayjsValue = () => {
    if (!selected) return null;
    try {
      // Handle both Date objects and dayjs objects
      if (selected instanceof Date) {
        return dayjs(selected);
      }
      return dayjs(selected);
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  // Format display value
  const getDisplayValue = () => {
    if (!selected) return "";
    try {
      if (selected instanceof Date) {
        return dayjs(selected).format(dateFormat);
      }
      return dayjs(selected).format(dateFormat);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Label */}
      {label && (
        <label className="font-medium text-[20px] text-(--black) block mb-2">
          {label}
        </label>
      )}

      {/* Custom input wrapper */}
      <div
        onClick={handleInputClick}
        className={`flex items-center justify-between bg-white rounded-xl cursor-pointer mt-2
          transition-all duration-200 
          ${error ? "border-(--redshade)" : "border-gray-300"}
         
          [box-shadow:var(--boxshadow-input)]`}
      >
        <input
          readOnly
          value={getDisplayValue()}
          placeholder={placeholder || TEXT.ENTER_BOD}
          disabled={disabled}
          className="w-full h-[58px] text-[16px] px-3 bg-transparent 
                     outline-none placeholder:text-(--grayshade) rounded-xl
                     cursor-pointer"
          aria-label={label || "Date picker"}
          aria-expanded={isOpen}
          aria-haspopup="true"
        />

        <Icons.SlCalender
          size={22}
          className={`text-gray-500 mr-4 ${disabled ? "opacity-50" : ""}`}
          aria-hidden="true"
        />
      </div>

      {/* Hidden DatePicker for popup - positioned absolutely to trigger popup */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
          visibility: "hidden",
        }}
      >
        <DatePicker
          ref={datePickerRef}
          open={isOpen}
          onChange={handleDateChange}
          onOpenChange={setIsOpen}
          value={getDayjsValue()}
          format={dateFormat}
          getPopupContainer={() => wrapperRef.current || document.body}
          classNames={{
            popup: {
              root: "custom-calendar-popup",
            },
          }}
          disabled={disabled}
          allowClear={false}
          showToday={true}
          placeholder={placeholder || TEXT.ENTER_BOD}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-[12px] text-(--redshade)" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
