"use client";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMoreHorizontal, FiSearch } from "react-icons/fi";

export default function TableLayout({ title, columns, data, currentTab }) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(null);

  const routeMap = {
    users: "/user-detail",
    patients: "/patient-detail",
    family: "/family-member-detail",
    doctors: "/doctor-detail",
    caregivers: "/caregiver-detail",
  };

  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-(--white) rounded-lg border border-(--tbordergray)">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 pb-4">
        <h2 className="text-[20px] font-medium text-(--black)">{title}</h2>

        {/* Search Box */}
        <div className="max-w-[310px] w-full flex items-center gap-2 bg-(--bgDarkGray) px-4 py-2 rounded-sm border border-[#E6E6E6]">
          <FiSearch className="text-(--black) w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-base font-normal w-full placeholder:text-[#C0C0C0]"
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-y-auto max-h-[calc(100vh-320px)]"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 text-left bg-(--blackshade) text-(--white)">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-[16px] font-medium whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-2 text-[16px] font-medium">
                {TEXT.ACTION}
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-(--tablebg)" : "bg-(--white)"
                } border-t-[0.5px] border-[#AEAEAE]`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 text-[14px] ${
                      col.key === "image" ? "w-[60px] min-w-[60px]" : ""
                    }`}
                  >
                    {col.key === "image" ? (
                      <Image
                        src={row[col.key]}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full w-[30px] h-[30px] object-cover"
                      />
                    ) : col.key === "status" ? (
                      <span
                        className={`px-4 py-2 text-[14px] font-medium rounded-[3px] inline-flex items-center justify-center min-w-[95px] ${
                          row[col.key] === "Approved"
                            ? "bg-(--lightGreen) text-(--green)"
                            : "bg-(--lightRed) text-(--redshade)"
                        }`}
                      >
                        {row[col.key]}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}

                <td className="pl-8 py-2 text-lg cursor-pointer relative">
                  <FiMoreHorizontal
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === idx ? null : idx);
                    }}
                  />
                  {openMenu === idx && (
                    <div className="absolute right-9 w-16 bg-(--lightBlack) rounded-sm z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `${routeMap[currentTab]}?tab=${currentTab}`
                          );
                        }}
                        className="w-full py-2 px-3.5 text-left text-[12px] text-(--white) font-medium"
                      >
                        {TEXT.DETAIL}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
