export default function Button({
  children,
  onClick,
  type,
  className = "",
  disabled,
}) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-(--darkblue) font-semibold text-[18px] sm:text-[24px] text-(--white) hover:opacity-90 py-3 cursor-pointer block ${className}`}
    >
      {children}
    </button>
  );
}
