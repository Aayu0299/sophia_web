"use client";

import { useState } from "react";
import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import TopCard from "./detailContent/TopCard";
import InfoTabs from "./detailContent/InfoTabs";
import BasicInfoSection from "./detailContent/BasicInfoSection";
import DetailSection from "./detailContent/DetailSection";
import { TEXT } from "@/app/utils/Text";
import StaffList from "./detailContent/StaffList";

export default function DoctorDetail() {
  const [activeTab, setActiveTab] = useState("basic");
  const [showAll, setShowAll] = useState(false);

  const user = {
    image: images.profile,
    name: "Meachel Marsh",
    status: "Admitted",
    age: 40,
    email: "meachel123@gmail.com",
    mrn: "5676578745654433",
    birthDate: "2000-07-20",
    phone: "+1 7564 456 4567",
    idImage: images.idCard,
    emergency: {
      name: "John Marsh",
      relationship: "Brother",
      phone: "+1 7564 456 4567",
    },
  };

  return (
    // <div className="flex flex-col h-[calc(100vh-109px)]">
    <div className="flex flex-col">
      <div className="bg-(--white) border border-(--tbordergray) rounded-md flex flex-col h-full">
        <TopCard name={user.name} status={user.status} age={user.age} />

        <InfoTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabLabels="Doctor"
        />

        {/* SCROLL WRAPPER */}
        <div className="">
          {activeTab === "basic" && <BasicInfoSection role="doctor" />}

          {activeTab === "other" && (
            <div className="p-[18px] sm:p-[30px] space-y-6">
              <div className="space-y-6">
                {/* PATIENT CARD */}
                {[1, 2].map((item, index) => (
                  <div key={index} className="space-y-4">
                    {/* TOP SECTION */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* LEFT SIDE */}
                      <div className="flex items-start gap-4">
                        <Image
                          src={images.profile}
                          width={70}
                          height={80}
                          className="w-[60px] h-[70px] md:w-[70px] md:h-[80px] rounded-[10px] object-cover"
                          alt="profile"
                        />

                        <div>
                          {/* NAME */}
                          <h2 className="text-[16px] md:text-[18px] font-medium text-(--black)">
                            {index === 0 ? "Sarah Johnson" : "Michael Chen"}
                          </h2>

                          {/* ROOM + DATE */}
                          <div className="flex flex-wrap items-center gap-2 text-[12px] text-(--darkgray) font-medium pt-2">
                            <p className="flex gap-1">
                              <Icons.GrLocation
                                size={15}
                                className="text-(--sidebarText)"
                              />
                              {index === 0 ? "Room 101-A" : "Room102-B"}
                            </p>
                            <span className="text-(--grayshade)">•</span>
                            <p>
                              {index === 0
                                ? "Admitted Jan 13"
                                : "Admitted Jan 14"}
                            </p>
                          </div>

                          {/* BADGES */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-(--lightGreen) text-(--darkGreen) px-3 py-1 rounded-md text-[11px] font-semibold">
                              Admitted
                            </span>

                            {index === 0 && (
                              <span className="bg-(--lightRed) text-(--redshade) px-3 py-1 rounded-md text-[11px] font-semibold">
                                1 Pending note
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE BUTTONS */}
                      <div className="flex flex-wrap items-center gap-3 text-[14px] md:text-[16px] font-medium text-(--black)">
                        {/* Doctor Button with optional badge */}
                        <div className="relative">
                          <button className="flex items-center gap-2 border border-[#C5C5C5] rounded-[5px] px-3 py-1">
                            <Icons.RiStethoscopeLine /> Doctor
                          </button>

                          {/* Badge only on card 1 */}
                          {index === 0 && (
                            <span className="absolute -top-1.5 -right-1 bg-(--redshade) text-(--white) text-[10px] px-[5px] py-[1px] rounded-full">
                              3
                            </span>
                          )}
                        </div>

                        <button className="flex items-center gap-2 border border-[#C5C5C5] rounded-[5px] px-3 py-1">
                          <Icons.GrGroup />
                          Family
                        </button>

                        <button className="flex items-center gap-2 border border-[#C5C5C5] rounded-[5px] px-3 py-1">
                          + Add Schedule
                        </button>
                      </div>
                    </div>

                    {/* AI SUMMARY */}
                    <div className="border border-(--blueBorder) bg-(--bgBlue) rounded-md p-3">
                      <h3 className="flex items-center gap-2.5 text-(--darkblue) font-semibold text-[13px]">
                        <Icons.LuNotebookText size={15} /> AI Summary – Patient
                        History
                      </h3>
                      <p className="text-[11px] text-(--darkblue) mt-1 font-normal leading-5">
                        ADMITTED : Initial assessment completed. Internal
                        Medicine evaluation in progress. Treatment plan
                        development underway.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <StaffList />

              <div className="border border-(--tbordergray)">
                <div className="px-4 py-5 bg-(--blueshade)">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-(--black) text-[17px]">
                      {TEXT.QUE_CARE_TEAM}
                    </p>

                    <div className="flex items-center gap-1.5">
                      <Icons.LuFilter
                        size={22}
                        className="text-(--darkblue) cursor-pointer"
                      />
                      <Icons.IoMdAdd
                        size={22}
                        className="text-(--darkblue) cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Thread */}
                <div
                  className="py-5 px-[15px] space-y-8 max-h-[540px] overflow-y-auto pr-2 custom-scroll"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {/* Message 1 */}
                  <div className="flex justify-end">
                    <div className="flex flex-col items-start max-w-[70%]">
                      <p className="text-[10px] text-(--black) font-medium flex gap-1">
                        John Johnson{" "}
                        <span className="text-(--redshade)">Family</span>
                      </p>

                      <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                        What dietary restrictions should Sarah follow when she
                        gets home?
                      </div>

                      <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                        Jan 15 10:05 AM
                      </span>
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div className="flex flex-col items-start">
                    <p className="text-[10px] text-(--black) font-medium flex gap-1 pl-1">
                      Meachal Marsh{" "}
                      <span className="text-(--darkblue)">Patient</span>
                    </p>

                    <div className="mt-1 bg-(--white) border border-(--msgBorder) p-3 rounded-lg max-w-[70%] text-[10px] text-(--black)">
                      When can I expect to be discharged? Need to arrange time
                      off from work.
                    </div>

                    <span className="text-[9px] text-(--grayshade) font-medium pt-1 pl-1">
                      Jan 15 10:05 AM
                    </span>
                  </div>

                  {/* Message 3 */}
                  <div className="flex justify-end">
                    <div className="flex flex-col items-start max-w-[70%]">
                      <p className="text-[10px] text-(--black) font-medium flex gap-1">
                        Addie Brock{" "}
                        <span className="text-(--redshade)">Family</span>
                      </p>
                      <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                        Is she allowed to walk without support this function?
                      </div>
                      <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                        {" "}
                        Jan 15 10:05 AM
                      </span>
                    </div>
                  </div>

                  {/* Message 4 */}
                  <div>
                    <p className="flex gap-2 text-[8px] text-(--black) font-medium">
                      Emma Johnson{" "}
                      <span className="text-(--darkblue)">Patient</span>
                    </p>
                    <div className="mt-2 bg-(--white) border border-(--msgBorder) p-3 rounded-lg w-fit max-w-[70%] text-[10px] text-(--black)">
                      Can we bring her home-cooked food tomorrow?
                    </div>
                    <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                      Jan 15 10:10 AM
                    </span>
                  </div>

                  {/* Message 5 */}
                  <div className="flex justify-end">
                    <div className="flex flex-col items-start max-w-[70%]">
                      <p className="text-[10px] text-(--black) font-medium flex gap-1">
                        Addie Brock{" "}
                        <span className="text-(--redshade)">Family</span>
                      </p>
                      <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                        How has she been feeling since morning hs w krer ewqme
                        wq?
                      </div>
                      <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                        Jan 15 11:00 AM
                      </span>
                    </div>
                  </div>

                  {/* Message 6 */}
                  <div>
                    <p className="flex gap-2 text-[8px] text-(--black) font-medium">
                      Meachal Marsh{" "}
                      <span className="text-(--darkblue)">Patient</span>
                    </p>
                    <div className="mt-2 bg-(--white) border border-(--msgBorder) p-3 rounded-lg w-fit max-w-[70%] text-[10px] text-(--black)">
                      She complained of mild headache. Should we inform the
                      nurse?
                    </div>
                    <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                      Jan 15 11:20 AM
                    </span>
                  </div>

                  {/* Message 7 */}
                  <div className="flex justify-end">
                    <div className="flex flex-col items-start max-w-[70%]">
                      <p className="text-[10px] text-(--black) font-medium flex gap-1">
                        Emma Johnson{" "}
                        <span className="text-(--redshade)">Family</span>
                      </p>
                      <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                        Can someone update me if the doctor visits her today?
                      </div>
                      <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                        Jan 15 12:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VALIDATE BUTTON */}
      <div className="w-full flex justify-end mt-5 pr-4 pb-4">
        <button className="px-6 py-2 bg-(--darkblue) text-(--white) rounded-md text-base font-semibold">
          {TEXT.VALIDATE}
        </button>
      </div>
    </div>
  );
}
