import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";
import React from "react";

export default function TopCard({ name, status, age }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-[27px] bg-[#EBF6FA] rounded-md">
      <div className="flex gap-4">
        <div className="relative sm:w-[110px] sm:h-[110px] w-[60px] h-[60px]">
          {/* PROFILE IMAGE */}
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-(--darkblue)">
            <Image
              src={images.profile}
              width={110}
              height={110}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>

          {/* OVERLAY ICON (BOTTOM CENTER) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[30px] h-[30px] sm:w-9 sm:h-9 bg-(--purple) rounded-full flex items-center justify-center shadow-md">
            <Image
              src={images.patient}
              width={20}
              height={20}
              alt="type-icon"
              className="p-0.5"
            />
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-[22px] sm:text-[25px] text-(--black)">
            {name}
          </h1>

          <p className="w-fit mt-3.5 sm:mt-[18px] py-2 px-4 flex items-center gap-2 font-medium text-[16px] text-(--green) bg-(--lightGreen) rounded-md">
            <Icons.FiUserCheck size={20} />
            {status}
          </p>
        </div>
      </div>

      <p className="mt-2 font-normal text-[15px] text-(--black) text-end">
        {TEXT.AGE} :{" "}
        <span className="text-(--darkblue)">
          {age} {TEXT.YEARS}
        </span>
      </p>
    </div>
  );
}
