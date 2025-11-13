"use client";

import { Icons } from "@/app/utils/Icons";
import { sanitizeHtmlTags } from "@/app/utils/InputFunction";
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
  watch,
  ...rest
}) {
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
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          autoCorrect="off"
          spellCheck={false}
          onKeyDown={onKeyDown}
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
        {icon && (
          <Icons.IoIosArrowDown className="absolute top-6 right-5 text-(--grayshade) w-5 h-5" />
        )}
      </div>

      {error && (
        <p className="mt-2 text-[12px] text-(--redshade)" role="alert">
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
            required: true,
            autoFocus: false,
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
