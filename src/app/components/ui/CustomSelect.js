"use client";
import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, placeholder, value, onChange, label }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "12px",
      boxShadow: "var(--boxshadow-input)",
      paddingLeft: "8px",
      paddingRight: "8px",
      height: "60px",
      backgroundColor: "white",
      border: "none",
      outline: "none",
      fontSize: "16px",
      color: "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--grayshade)",
      fontSize: "16px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontSize: "16px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "gray",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div>
      {label && (
        <label className="font-medium text-[20px] text-(--black)">
          {label}
        </label>
      )}
      <div className="mt-2">
        <Select
          styles={customStyles}
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CustomSelect;
