import React from "react";

const CommonSearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  icon: Icon,
  className = "",
}) => {
  return (
    <div className="relative w-full">
      {/* Left Icon (only if passed) */}
      {Icon && (
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-lg">
          <Icon className="w-6 h-6 text-(--grayshade)" />
        </div>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full border-[0.5px] border-(--borderGrayColor)! rounded-[5px] px-4 h-[50px] focus:outline-none
          ${Icon ? "pl-10" : ""} ${className}`}
      />
    </div>
  );
};

export default CommonSearchInput;
