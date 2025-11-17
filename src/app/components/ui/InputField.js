"use client";

import { Icons } from "@/app/utils/Icons";
import { sanitizeHtmlTags } from "@/app/utils/InputFunction";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  error,
  register,
  validationRules = {},
  disabled = false,
  autoComplete,
  onKeyDown,
  className = "",
  icon = false,
  numberType = false,
  maxLength,
  watch,
  isPHI = false,
  inputMode,
  ariaLabel,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const computedAutoComplete =
    autoComplete || (isPHI && !isPassword ? "off" : undefined);
  const errorId = error ? `${name}-error` : undefined;
  const phiHandlers = isPHI
    ? {
        onCopy: (e) => e.preventDefault(),
        onCut: (e) => e.preventDefault(),
        onPaste: (e) => e.preventDefault(),
        "data-phi": "true",
      }
    : {};
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[20px] text-(--black) mt-4"
        >
          {label}
        </label>
      )}

      <div className="mt-2 relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={computedAutoComplete || "off"}
          maxLength={maxLength}
          autoCorrect="off"
          spellCheck={false}
          autoCapitalize="none"
          onKeyDown={onKeyDown}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          aria-label={ariaLabel || label || name}
          aria-required={validationRules?.required ? "true" : undefined}
          {...phiHandlers}
          {...(numberType && {
            onInput: (e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            },
          })}
          className={`w-full rounded-xl text-[16px] [box-shadow:var(--boxshadow-input)] px-3 h-[60px] outline-none  bg-white placeholder:text-(--grayshade)`}
          {...(register
            ? register(name, {
                ...validationRules,
                ...sanitizeHtmlTags(),
                validate: validationRules.validate
                  ? (value) => validationRules.validate(value, { watch })
                  : undefined,
              })
            : {})}
          {...rest}
        />
        {icon && !isPassword && (
          <Icons.IoIosArrowDown className="absolute top-5 right-5 text-(--grayshade) w-5 h-5 cursor-pointer" />
        )}

        {/* PASSWORD SHOW/HIDE ICON */}
        {isPassword && (
          <span
            className="absolute top-4 right-5 cursor-pointer text-(--grayshade)"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Icons.FaEye size={20} />
            ) : (
              <Icons.FaEyeSlash size={20} />
            )}
          </span>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-2 text-[12px] text-(--redshade)"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export const CommonPhoneInput = ({
  name,
  label,
  value,
  defaultCountry,
  onChange,
  error,
  isPHI = false,
}) => {
  return (
    <div>
      <label htmlFor={name} className="font-medium text-[20px] text-(--black)">
        {label}
      </label>

      <div className="mt-2">
        <PhoneInput
          country={defaultCountry}
          value={value}
          onChange={onChange}
          countryCodeEditable={false}
          inputProps={{
            name,
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            autoFocus: false,
            "data-phi": isPHI ? "true" : undefined,
            onCopy: isPHI ? (e) => e.preventDefault() : undefined,
            onCut: isPHI ? (e) => e.preventDefault() : undefined,
            onPaste: isPHI ? (e) => e.preventDefault() : undefined,
          }}
          containerClass="!w-full"
          buttonClass="!border-none !bg-transparent !pl-3 !rounded-l-xl"
          inputClass="!w-full !border-none !h-[60px] !text-[16px] !bg-white !px-3 !outline-none 
              !shadow-[var(--boxshadow-input)] !rounded-xl placeholder:!text-[var(--grayshade)] 
              !pl-[60px]" // space for flag
          dropdownClass="!text-[14px]"
        />
      </div>

      {error && (
        <p className="mt-2 text-[12px] text-(--redshade)" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
