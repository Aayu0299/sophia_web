"use client";
import { ROUTES } from "@/app/utils/Constant";
import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import { navItems } from "@/app/utils/MockData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute top-6 w-full z-50 flex justify-center">
      <div className="w-full flex flex-col items-center bg-white rounded-[9px] shadow-md px-6 mx-4 md:mx-[60px] lg:mx-32 transition-all duration-300">
        <div className="flex items-center justify-between w-full h-16">
          <Link href={ROUTES.HOME} className="flex items-center">
            <Image
              src={images.logo}
              alt="Sophia-logo"
              width={100}
              height={50}
              priority
              className="w-full max-w-[100px] h-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden sm:flex items-center gap-6 font-bold text-[16px]">
            {navItems().map((item) => {
              const isActive = pathname === item.link;
              return (
                <div
                  key={item.id}
                  className="relative flex flex-col items-center"
                >
                  <Link
                    href={item.link}
                    className={`transition ${
                      isActive
                        ? "text-(--darkblue)"
                        : "text-(--darkgray) hover:text-(--darkblue)"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <div className="absolute -bottom-6 w-2 h-2 bg-(--darkblue) rounded-t-full" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="sm:hidden text-(--darkblue) focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <Icons.FiX size={26} /> : <Icons.FiMenu size={26} />}
          </button>
        </div>

        {/* Mobile Menu (inside same header box, smooth expand) */}
        <div
          className={`sm:hidden w-full transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 font-bold text-[16px] text-(--darkgray) pt-2">
            {navItems().map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className={`transition ${
                    isActive
                      ? "text-(--darkblue)"
                      : "text-(--darkgray) hover:text-(--darkblue)"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
