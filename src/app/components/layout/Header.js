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
  const pathname = usePathname("");

  return (
    <header className="fixed inset-x-0 top-5 left-8 right-8 lg:left-[90px] lg:right-[90px] z-50 rounded-[9px] bg-(--white) shadow-md">
      <div className="section-container flex items-center justify-between h-16 rounded-[9px] bg-(--white) px-4">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center">
          <Image
            src={images.logo}
            alt="Logo"
            width={100}
            height={50}
            priority
            className="w-full max-w-[100px]! h-auto cursor-pointer"
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

                {/* Blue bottom dot positioned at the header bottom */}
                {isActive && (
                  <div className="absolute -bottom-5 w-2 h-2 bg-(--darkblue) rounded-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-(--darkblue) focus:outline-none"
        >
          {menuOpen ? <Icons.FiX size={26} /> : <Icons.FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-(--white) mx-4 transition-all duration-300">
          <nav className="flex flex-col gap-4 py-4 px-6 font-bold text-[16px] text-(--darkgray)">
            {navItems().map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className={`transition flex items-center gap-2 ${
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
      )}
    </header>
  );
}
