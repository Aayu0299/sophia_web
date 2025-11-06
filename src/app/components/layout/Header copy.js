"use client";
import { ROUTES } from "@/app/utils/Constant";
import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import { navItems } from "@/app/utils/MockData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect if user has scrolled beyond the hero section height (like 80px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled
          ? "fixed top-0 left-0 w-full bg-white shadow-md rounded-none transition-all duration-300 ease-in-out"
          : "absolute top-6 left-0 w-full flex justify-center transition-all duration-300 ease-in-out"
      } z-50`}
    >
      <div
        className={`section-container flex items-center justify-between h-16 px-6 ${
          isScrolled
            ? "max-w-full bg-white"
            : "max-w-[1200px] bg-white rounded-[9px]"
        }`}
      >
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
                  <div className="absolute -bottom-6 w-2 h-2 bg-(--darkblue) rounded-t-full" />
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
