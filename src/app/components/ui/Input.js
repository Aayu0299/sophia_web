"use client";

export default function Input({ className = "", ...props }) {
  const base = "w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-[var(--darkblue)]";
  return <input className={`${base} ${className}`} {...props} />;
}


