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

export default function FamilyDetail() {
  const [activeTab, setActiveTab] = useState("basic");

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
    <div className="flex flex-col">
      <div className="bg-white border border-(--lightGreish) rounded-md flex flex-col h-full">
        <TopCard name={user.name} status={user.status} age={user.age} />

        <InfoTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabLabels="Family Member"
        />

        {/* SCROLL WRAPPER */}
        <div
          className="flex-1 overflow-y-auto custom-scroll"
          style={{ scrollbarWidth: "thin" }}
        >
          {activeTab === "basic" && <BasicInfoSection />}

          {activeTab === "other" && (
            <div className="px-[18px] sm:px-[30px] py-[26px]">
              <StaffList />

              <DetailSection />
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
