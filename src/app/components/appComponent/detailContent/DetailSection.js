import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import React from "react";

export default function DetailSection() {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-5">
      {/* Schedule Section */}
      <div className="border border-(--blueBorder) rounded-md">
        <h2 className="flex items-center gap-2 font-semibold text-[18px] text-(--blackshade) bg-(--fadeBlue) p-4">
          <Icons.RiCalendar2Fill size={24} className="text-(--darkblue)" />
          {TEXT.SCHEDULE}
        </h2>

        {/* Card for Appointment 1 */}
        <div className="p-[15px]">
          <h3 className="text-(--black) font-semibold text-[15px]">
            Cardiology Consultation
          </h3>
          <p className="text-(--lightBlack) font-normal pt-2 text-xs">
            Follow-up consultation for hypertension management
          </p>
          <div className="flex justify-between items-center pt-[27px]">
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.RiCalendar2Fill
                size={16}
                className="text-(--sidebarText)"
              />{" "}
              Jan 15, 03:00 AM
            </p>
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.GrLocation size={16} className="text-(--sidebarText)" />{" "}
              Room 112-A
            </p>
          </div>
          <p className="text-(--darkblue) text-xs font-medium pt-2">
            Dr. Michael Roberts
          </p>
          <p className="text-[#202020] text-xs font-medium pt-2 italic ...">
            BP stable, continue current regimen
          </p>

          <h5 className="w-fit bg-(--lightGreen) text-(--green) px-6 py-2 mt-[15px] text-[12px] font-medium rounded-[5px]">
            Completed
          </h5>
        </div>

        <div className="border border-(--singleBorder) mx-[15px]"></div>

        {/* Card for Appointment 2 */}
        <div className="p-[15px]">
          <h3 className="text-(--black) font-semibold text-[15px]">
            Blood Draw
          </h3>
          <p className="text-(--lightBlack) font-normal pt-2 text-xs">
            Follow-up consultation for hypertension management{" "}
          </p>
          <div className="flex justify-between items-center pt-[27px]">
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.RiCalendar2Fill
                size={16}
                className="text-(--sidebarText)"
              />{" "}
              Jan 15, 03:00 AM
            </p>
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.GrLocation size={16} className="text-(--sidebarText)" />{" "}
              Room 112-A
            </p>
          </div>
          <p className="text-(--darkblue) text-xs font-medium pt-2">
            Dr. Michael Roberts
          </p>
          <p className="text-[#202020] text-xs font-medium pt-2 italic ...">
            BP stable, continue current regimen
          </p>
          <h5 className="w-fit bg-[#8282821F] text-(--grayshade) px-6 py-2 mt-[15px] text-[12px] font-medium rounded-[5px]">
            Scheduled
          </h5>
        </div>

        <div className="border border-(--singleBorder) mx-[15px]"></div>

        {/* Card for Appointment 3 */}
        <div className="p-[15px]">
          <h3 className="text-(--black) font-semibold text-[15px]">
            Dietitian Consultation
          </h3>
          <p className="text-(--lightBlack) font-normal pt-2 text-xs">
            Follow-up consultation for hypertension management
          </p>
          <div className="flex justify-between items-center pt-[27px]">
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.RiCalendar2Fill
                size={16}
                className="text-(--sidebarText)"
              />{" "}
              Jan 15, 03:00 AM
            </p>
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.GrLocation size={16} className="text-(--sidebarText)" />{" "}
              Room 112-A
            </p>
          </div>
          <p className="text-(--darkblue) text-xs font-medium pt-2">
            Dr. Michael Roberts
          </p>
          <p className="text-[#202020] text-xs font-medium pt-2 italic ...">
            BP stable, continue current regimen
          </p>
          <h5 className="w-fit bg-[#8282821F] text-(--grayshade) px-6 py-2 mt-[15px] text-[12px] font-medium rounded-[5px]">
            Scheduled
          </h5>
        </div>
      </div>

      {/* FAMILY & FRIENDS SECTION */}
      <div className="border border-(--blueBorder) rounded-md">
        {/* Header */}
        <h2 className="flex items-center gap-2 font-semibold text-[18px] text-(--blackshade) bg-(--fadeBlue) p-4">
          <Icons.TbMessage2 size={24} className="text-(--darkblue)" />
          {TEXT.FAMILY_FRNDS}
        </h2>
        <div className="p-[15px]">
          {/* Patient & Room */}
          <div className="flex justify-between items-center">
            <p className="flex gap-3 text-(--darkgray) font-medium pt-2 text-xs">
              Meachal Marsh
            </p>
            <p className="flex gap-2 sm:gap-3 text-(--lightBlack) font-normal pt-2 text-xs">
              <Icons.GrLocation size={16} className="text-(--sidebarText)" />{" "}
              Room 101-A
            </p>
          </div>

          {/* Question for Care Team */}
          <div className="px-4 py-[9px] bg-(--blueshade) mt-[15px]">
            <div className="flex items-center justify-between">
              <p className="font-medium text-(--black) text-xs">
                {TEXT.QUE_CARE_TEAM}
              </p>

              <div className="flex items-center gap-1.5">
                <Icons.LuFilter
                  size={16}
                  className="text-(--darkblue) cursor-pointer"
                />
                <Icons.IoMdAdd
                  size={16}
                  className="text-(--darkblue) cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div
            className="py-6 space-y-8 max-h-[540px] overflow-y-auto pr-2 custom-scroll"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Message 1 */}
            <div className="flex justify-end">
              <div className="flex flex-col items-start max-w-[70%]">
                <p className="text-[10px] text-(--black) font-medium flex gap-1">
                  John Johnson <span className="text-(--redshade)">Family</span>
                </p>

                <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                  What dietary restrictions should Sarah follow when she gets
                  home?
                </div>

                <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                  Jan 15 10:05 AM
                </span>
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex flex-col items-start">
              <p className="text-[10px] text-(--black) font-medium flex gap-1 pl-1">
                Meachal Marsh <span className="text-(--darkblue)">Patient</span>
              </p>

              <div className="mt-1 bg-(--white) border border-(--msgBorder) p-3 rounded-lg max-w-[70%] text-[10px] text-(--black)">
                When can I expect to be discharged? Need to arrange time off
                from work.
              </div>

              <span className="text-[9px] text-(--grayshade) font-medium pt-1 pl-1">
                Jan 15 10:05 AM
              </span>
            </div>

            {/* Message 3 */}
            <div className="flex justify-end">
              <div className="flex flex-col items-start max-w-[70%]">
                <p className="text-[10px] text-(--black) font-medium flex gap-1">
                  Addie Brock <span className="text-(--redshade)">Family</span>
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
                Emma Johnson <span className="text-(--darkblue)">Patient</span>
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
                  Addie Brock <span className="text-(--redshade)">Family</span>
                </p>
                <div className="mt-1 bg-(--msgbg) border border-(--msgBorder) p-3 rounded-lg text-[10px] text-(--black)">
                  How has she been feeling since morning hs w krer ewqme wq?
                </div>
                <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                  Jan 15 11:00 AM
                </span>
              </div>
            </div>

            {/* Message 6 */}
            <div>
              <p className="flex gap-2 text-[8px] text-(--black) font-medium">
                Meachal Marsh <span className="text-(--darkblue)">Patient</span>
              </p>
              <div className="mt-2 bg-(--white) border border-(--msgBorder) p-3 rounded-lg w-fit max-w-[70%] text-[10px] text-(--black)">
                She complained of mild headache. Should we inform the nurse?
              </div>
              <span className="text-[9px] text-(--grayshade) font-medium pt-1">
                Jan 15 11:20 AM
              </span>
            </div>

            {/* Message 7 */}
            <div className="flex justify-end">
              <div className="flex flex-col items-start max-w-[70%]">
                <p className="text-[10px] text-(--black) font-medium flex gap-1">
                  Emma Johnson <span className="text-(--redshade)">Family</span>
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
    </div>
  );
}
