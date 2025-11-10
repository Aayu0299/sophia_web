"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import { ROUTES } from "@/app/utils/Constant";

//------function for home page role section----------
export default function HomeRoleSection() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleSelect = (role) => {
    setActiveRole(role.name);
    router.push(role.path);
  };

  const roles = [
    {
      name: TEXT.PATIENT,
      icon: "/patient.svg",
      activeIcon: "/patientIcon.svg",
      path: ROUTES.PATIENT_LOGIN,
    },
    {
      name: TEXT.FAMILY,
      icon: "/familyicon.svg",
      activeIcon: "/family.svg",
      path: ROUTES.FAMILY_LOGIN,
    },
    {
      name: TEXT.DOCTOR,
      icon: "/doctor.svg",
      activeIcon: "/icons_doctor.svg",
      path: ROUTES.DOCTOR_LOGIN,
    },
    {
      name: TEXT.CAREGIVER,
      icon: "/healthicons.svg",
      activeIcon: "/health.svg",
      path: ROUTES.CAREGIVER_LOGIN,
    },
  ];

  return (
    <div className="section-container grid grid-cols-2 sm:grid-cols-4 sm:gap-6 gap-y-3 justify-center sm:py-10">
      {roles.map((role, index) => {
        const isActive = activeRole === role.name;
        const isHovered = hoveredRole === role.name;
        return (
          <div
            key={role.name}
            onClick={() => handleSelect(role)}
            onMouseEnter={() => setHoveredRole(role.name)}
            onMouseLeave={() => setHoveredRole(null)}
            className={`
    relative flex flex-col items-center sm:items-start justify-center cursor-pointer py-10
    ${
      (index % 2 === 0 && index < roles.length - 1
        ? "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[100px] after:w-[1px] after:bg-gray-300 after:content-[''] sm:after:hidden"
        : "") +
      (index < roles.length - 1 ? " sm:border-r sm:border-gray-300" : "")
    }
  `}
          >
            <Image
              src={isActive || isHovered ? role.activeIcon : role.icon}
              alt={role.name}
              width={66.67}
              height={83.33}
              className="transition-transform duration-200 hover:scale-105"
            />
            <h3
              className={`mt-4 font-semibold text-[22px] sm:text-[35px] leading-[25px] ${
                isActive ? "text-black" : "text-gray-700"
              }`}
            >
              {role.name}
            </h3>
            <p className="font-semibold text-[9px] sm:text-[13px] text-black flex items-center gap-2 mt-6">
              {TEXT.READ_MORE}{" "}
              <Icons.FaArrowRight className="w-3 h-3 text-(--lightBlack)" />
            </p>
          </div>
        );
      })}
    </div>
  );
}
