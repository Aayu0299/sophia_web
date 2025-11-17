export default function Button({
  children,
  onClick,
  type,
  className = "",
  disabled,
}) {
  const buttonType = type ? type : "button";
  return (
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      data-loading={disabled ? "true" : undefined}
      className={`w-full bg-(--darkblue) font-semibold text-[18px] sm:text-[24px] text-(--white) hover:opacity-90 py-3 cursor-pointer block ${className}`}
    >
      {children}
    </button>
  );
}
