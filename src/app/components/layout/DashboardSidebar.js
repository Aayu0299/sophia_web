"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { sidebarNavItems } from "@/app/utils/MockData";
import Image from "next/image";
import { images } from "@/app/utils/Images";
import { Icons } from "@/app/utils/Icons";

export default function DashboardSidebar({ open, setOpen }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const handleTabClick = (tab) => {
    router.push(`/dashboard?tab=${tab}`, { scroll: false });
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-60 lg:w-64 h-screen md:h-auto
          bg-(--darkblue) text-(--lightBlue) border-r border-(--graycolor) shadow-sm 
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* LOGO SECTION */}
        <div className="flex justify-center items-center gap-3 px-6 py-6">
          <Image
            src={images.sidebarLogo}
            alt="Sophia logo"
            width={142}
            height={45}
            className="w-full max-w-[142px] cursor-pointer"
          />

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white ml-auto"
          >
            <Icons.ImCancelCircle className="w-6 h-6" />
          </button>
        </div>
        {/* SIDEBAR NAV */}
        <nav>
          {sidebarNavItems.map((item) => {
            const isActive = currentTab === item.tab;
            const icon = isActive ? item.activeIcon : item.inactiveIcon;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.tab)}
                className={`flex items-center w-full h-[50px] my-0.5 px-6 py-3 text-[14px] font-semibold transition-all gap-3
          ${
            isActive
              ? "bg-white text-(--darkblue)"
              : "text-(--lightBlue) bg-(--mediumBlue) hover:bg-white hover:text-(--darkblue)"
          }
        `}
              >
                <Image
                  src={icon}
                  alt={`${item.label} icon`}
                  width={22}
                  height={22}
                  className="object-contain"
                />

                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
