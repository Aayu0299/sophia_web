"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNavItems } from "@/app/utils/MockData";
import Image from "next/image";
import { images } from "@/app/utils/Images";
import { Icons } from "@/app/utils/Icons";
import { ROUTES } from "@/app/utils/Constant";

export default function DashboardSidebar({ open, setOpen }) {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const activeSegment = pathParts[2];

  return (
    <>
      {/* -------- Mobile Sidebar Overlay -------- */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* -------- Sidebar Panel (Desktop + Mobile) -------- */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          bg-white border-r border-(--graycolor) shadow-sm 
          w-60 lg:w-64 min-h-screen
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Close Button for Mobile */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-[#F4F4F4]">
          <Link href={ROUTES.HOME}>
            <Image
              src={images.logo}
              alt="Sophia logo"
              width={100}
              height={50}
              priority
              className="w-full max-w-[100px] h-full cursor-pointer"
            />
          </Link>
          <button onClick={() => setOpen(false)}>
            <Icons.ImCancelCircle className="w-5 h-5 text-(--redshade)" />
          </button>
        </div>

        <nav className="pt-4 space-y-1">
          {sidebarNavItems.map((item, index) => {
            const isActive = activeSegment === item?.link.replace("/", "");
            const hasNext = index < sidebarNavItems.length - 1;

            return (
              <div
                key={item.id}
                className={hasNext ? "border-b border-[#F4F4F4]" : ""}
              >
                <Link
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-6 py-3 rounded-lg transition-colors font-medium text-[16px] ${
                    isActive
                      ? "text-(--darkblue)"
                      : "text-(--sidebarText) hover:text-(--darkblue)"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
