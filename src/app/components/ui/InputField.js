"use client";

import { sanitizeHtmlTags } from "@/app/utils/InputFunction";

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
  watch,
  ...rest
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[20px] text-(--black)"
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
      </div>

      {error && (
        <p className="mt-2 text-[12px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
