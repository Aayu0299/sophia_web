import { caregiversList, doctorsList, patients } from "@/app/utils/MockData";
import React, { useState } from "react";
import Button from "../../ui/Button";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";
import CareTeamModal from "../../modal/CareTeamModal";

//------function for doctor dashboard--------------
export default function DoctorDashboard() {
  const [includeDischarged, setIncludeDischarged] = useState(false);
  const [careTeamModalOpen, setCareTeamModalOpen] = useState(false);

  return (
    <div className="min-h-screen mt-2">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3 bg-(--boxBgColor) border border-(--borderTextarea) p-4">
        <div className="flex items-center gap-2 flex-wrap ">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="font-medium text-[14px] sm:text-[16px] text-(--black)">
              {TEXT.INCLUDE_DISCHARGED_PATIENTS}
            </span>
            <div
              onClick={() => setIncludeDischarged(!includeDischarged)}
              className={`w-12 h-6 rounded-full p-1 transition ${
                includeDischarged ? "bg-(--darkblue)" : "bg-(--toggleGray)"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  includeDischarged ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
          <span className="text-(--grayshade) font-medium text-[12px] sm:text-[16px]">
            3 of 4 patients • 3 admitted
          </span>
        </div>

        <div className="flex max-[440px]:flex-col items-center gap-3">
          <Button className="px-3 py-2! font-medium text-[12px]! lg:text-[16px]! rounded-[100px]! w-[157px]! bg-white! text-black! shadow-(--boxshadow-button) border-[0.5px] border-(--graycolor)">
            <Icons.IoScan className="inline-block mr-2 w-5 h-5 mb-[3px]" />
            {TEXT.SACN_PATIENT}
          </Button>
          <Button className="px-3 py-2! font-medium text-[12px]! lg:text-[16px]! rounded-[100px]! w-[157px]!">
            <Icons.RiAddLargeFill className="inline-block mr-2 w-5 h-5 mb-[3px]" />
            {TEXT.ADD_PATIENT}
          </Button>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="space-y-4 bg-(--boxBgColor) border border-(--borderTextarea) p-4">
        {patients?.length === 0 ? (
          <div className="text-center py-6 text-gray-500 font-medium">
            {TEXT.NO_PATIENT_FOUND}
          </div>
        ) : (
          patients?.map((p, index) => (
            <div
              key={index}
              className={`${
                index !== patients.length - 1
                  ? "border-b border-(--buttonBg) pb-5"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-[70px] h-20 relative overflow-hidden rounded-[10px]">
                  <Image
                    src={p.avatar}
                    alt="Profile image"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h2 className="font-medium text-[16px] text-black">
                        {p.name}
                      </h2>
                      <p className="font-medium text-[12px] text-(--darkgray) flex items-center gap-1 my-1">
                        <Icons.FiMapPin />
                        {p.room} • Admitted {p.admitted}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-1 items-center">
                        <span className="px-2 py-1 font-semibold text-[12px] bg-(--bgGreen) text-(--lightGreen) rounded-md">
                          {p.status}
                        </span>

                        {/* {p.pending > 0 && (
                          <span className="px-2 py-1 font-semibold text-[12px] bg-(--bgRed) text-(--redshade) rounded-md">
                            {p.pending} Pending note
                          </span>
                        )} */}
                        <span className="font-semibold text-[12px] sm:text-[14px]">
                          Dr. Amanda Foster-Primary
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 lg:mt-0">
                      <Button
                        className="relative px-3 py-2! font-medium! text-[12px]! lg:text-[16px]! border-[0.5px] border-(--buttonBorder) rounded-[5px] w-[110px]! bg-white! text-black! flex items-center gap-2"
                        onClick={() => setCareTeamModalOpen(true)}
                      >
                        <Icons.RiStethoscopeLine className="w-5 h-5" />
                        {TEXT.DOCTOR}
                        {/* Count Badge */}
                        {p?.count?.length > 0 && (
                          <span
                            className="absolute -top-1 -right-1 bg-(--redshade) text-white 
                   text-xs w-4 h-4 flex items-center justify-center 
                   rounded-full"
                          >
                            {p.count}
                          </span>
                        )}
                      </Button>
                      <Button className="px-3 py-2! font-medium! text-[12px]! lg:text-[16px]! border-[0.5px] border-(--buttonBorder) rounded-[5px] w-[110px]! bg-white! text-black!">
                        <Icons.PiUsersThreeBold className="inline-block mr-2 w-5 h-5 mb-[3px]" />
                        {TEXT.FAMILY}
                      </Button>
                      <Button className="py-2! font-medium! text-[12px]! lg:text-[16px]! border-[0.5px] border-(--buttonBorder) rounded-[5px] w-[155px]! bg-white! text-black!">
                        <Icons.RiAddLargeFill className="inline-block mr-2 w-5 h-5 mb-[3px]" />
                        {TEXT.ADD_SCHEDULE}
                      </Button>
                      <Button className="py-2! font-medium! text-[12px]! lg:text-[16px]! rounded-[5px] w-[100px]!">
                        {TEXT.HIDE}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 p-3 bg-(--lightBlue) rounded-md border border-(--blueShadeadd) text-(--darkblue)">
                <strong className="font-semibold text-[13px] flex items-center gap-2 mb-2">
                  <Icons.CgNotes />
                  AI Summary - Patient History
                </strong>
                <p className="font-normal text-[11px]">{p.summary}</p>
              </div>
            </div>
          ))
        )}
        <div className="text-center mt-5 mb-1 text-(--darkblue) font-semibold text-[14px] sm:text-[18px] cursor-pointer uppercase">
          {TEXT.VIEW_BUTTON}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Doctors */}
        <div>
          <h3 className="font-medium text-[16px] mb-3">{TEXT.DOCTOR_LIST}</h3>
          <div className="bg-(--boxBgColor) border border-(--borderTextarea) p-4">
            <div className="space-y-3">
              {doctorsList.map((d, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 pb-3 ${
                    idx !== d.length - 1 ? "border-b border-(--buttonBg)" : ""
                  }`}
                >
                  <div className="sm:w-[50px] sm:h-[50px] w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={d.avatar}
                      alt="Profile image"
                      width={55}
                      height={55}
                      priority
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[17px] text-black">
                      {d.name}
                    </p>
                    <p className="font-normal text-[13px] text-(--darkblue)">
                      {d.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5 mb-1 text-(--darkblue) font-semibold text-[14px] sm:text-[18px] cursor-pointer uppercase">
              {TEXT.VIEW_BUTTON}
            </div>
          </div>
        </div>

        {/* Caregivers */}
        <div>
          <h3 className="font-medium text-[16px] mb-3">
            {TEXT.CAREGIVER_LIST}
          </h3>
          <div className="bg-(--boxBgColor) border border-(--borderTextarea) p-4">
            <div className="space-y-3">
              {caregiversList.map((c, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 pb-3 ${
                    idx !== c.length - 1 ? "border-b border-(--buttonBg)" : ""
                  }`}
                >
                  <div className="sm:w-[50px] sm:h-[50px] w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={c.avatar}
                      alt="Profile image"
                      width={55}
                      height={55}
                      priority
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[17px] text-black">
                      {c.name}
                    </p>
                    <p className="font-normal text-[13px] text-(--darkblue)">
                      {c.role}
                    </p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      c.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5 mb-1 text-(--darkblue) font-semibold text-[14px] sm:text-[18px] cursor-pointer uppercase">
              {TEXT.VIEW_BUTTON}
            </div>
          </div>
        </div>
      </div>
      <CareTeamModal
        open={careTeamModalOpen}
        onClose={() => setCareTeamModalOpen(false)}
      />
    </div>
  );
}
