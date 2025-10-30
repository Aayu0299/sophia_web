"use client";

export default function Button({ children, className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[var(--darkblue)] text-white hover:opacity-90 focus:ring-[var(--darkblue)]/40",
    outline: "border border-current text-[var(--darkblue)] hover:bg-[var(--darkblue)] hover:text-white",
    ghost: "text-[var(--darkblue)] hover:bg-[var(--darkblue)]/10",
  };
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}


