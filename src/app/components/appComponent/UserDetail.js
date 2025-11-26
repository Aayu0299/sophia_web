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

export default function UserDetail() {
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
          tabLabels="Patient"
        />

        {/* SCROLL WRAPPER */}
        <div
          className="flex-1 overflow-y-auto custom-scroll"
          style={{ scrollbarWidth: "thin" }}
        >
          {activeTab === "basic" && <BasicInfoSection />}

          {activeTab === "other" && (
            <div className="px-[18px] sm:px-[30px] py-[26px]">
              {/* Consulting Section */}
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
                <Icons.RiStethoscopeLine className="text-(--darkblue)" />
                {TEXT.CONSULTING}
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="border border-(--blueBorder) text-base rounded-sm p-[15px] cursor-pointer bg-(--bgBlue) transition">
                  <h3 className="text-(--darkblue) font-semibold">
                    Dr. Michael Roberts
                  </h3>
                  <p className="text-(--lightBlack) font-normal pt-3">
                    Cardiologist
                  </p>
                </div>

                <div className="border border-(--blueBorder) text-base rounded-sm p-[15px] cursor-pointer bg-(--bgBlue) transition">
                  <h3 className="text-(--darkblue) font-semibold">
                    Dr. Jennifer Lee
                  </h3>
                  <p className="text-(--lightBlack) font-normal pt-3">
                    Endocrinologist
                  </p>
                </div>
              </div>

              <DetailSection />

              {/* Patient History */}
              <div className="mt-[15px] border border-(--blueBorder) text-base rounded-sm p-[15px]">
                <h3 className="flex items-center gap-3 text-lg text-(--blackshade) font-semibold">
                  <Icons.IoTimerOutline
                    size={20}
                    className="text-(--darkblue)"
                  />
                  {TEXT.PATIENT_HOSTORY}
                </h3>

                <div className="mt-3.5 border border-(--whiteBorder) bg-(--lightYellow) py-5 px-[15px]">
                  <div className="flex justify-between items-center">
                    <h1 className="text-sm text-(--blackshade) font-semibold">
                      Voice Note - Patient Update
                    </h1>
                    <span className="text-sm text-(--lightBlack) font-medium">
                      Sat 15 oct 09:32 AM
                    </span>
                  </div>
                  <p className="pt-3 text-[13px] text-(--lightBlack) font-normal">
                    Patient examination completed successfully. Meachel is doing
                    much better today - her blood pressure is stable at 135/85,
                    down from the initial 180/110. She reports that the chest
                    pain has completely resolved and she’s feeling much more
                    comfortable. Her glucose levels are showing improvement with
                    the medication adjustments we made yesterday. She’s been
                    ambulating well and appears ready for discharge planning.
                  </p>

                  <div className="pt-[18px] flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <h4 className="text-[14px] text-(--darkblue) font-semibold">
                      Dr. Micheal Roberts. Cardiologist
                    </h4>
                    <div className="flex items-center gap-2 py-2 px-5 bg-[#0043961F] mt-1 rounded-sm">
                      <h2 className="flex items-center gap-2 font-normal text-sm text-(--darkblue)">
                        {/* Microphone Icon */}
                        <Icons.PiMicrophone
                          size={20}
                          className="text-(--darkblue)"
                        />
                        Voice Mail
                      </h2>
                      <p className="text-[8px] text-(--lightBlack) font-medium pt-2">
                        (52 sec)
                      </p>

                      {/* Play Button */}
                      <button className="pl-2 flex items-center justify-center">
                        <Icons.FaPlayCircle
                          size={22}
                          className="text-(--darkblue)"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[15px] border border-(--blueBorder) text-base rounded-sm p-[15px]">
                <h3 className="flex items-center gap-3 text-lg text-(--blackshade) font-semibold">
                  {TEXT.EXIST_QUE}
                </h3>

                <div className="mt-[15px] p-[15px] border border-(--whiteBorder) bg-(--lightYellow) text-base rounded-[5px]">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-2.5 w-full">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-(--grayShadeborder)">
                        <Image
                          src={images.profile}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          alt="profile"
                        />
                      </div>

                      <div>
                        <h1 className="text-[15px] text-(--black) font-semibold">
                          Sarah (You)
                        </h1>
                        <span className="text-[13px] text-(--darkblue) font-normal">
                          Today, 9:15 AM
                        </span>
                      </div>
                    </div>

                    <p className="w-fit font-normal text-[15px] py-1 px-3 bg-[#0243991F] text-(--darkblue) text-end rounded-[3px]">
                      Question
                    </p>
                  </div>

                  <p className="pt-3 text-[12px] text-(--lightBlack) font-medium">
                    I've been experiencing some dizziness when i stand up. Is
                    this related to my blood pressure medication?
                  </p>

                  <div className="flex items-center justify-between mt-[27px]">
                    <h4 className="flex items-center gap-1.5 text-[13px] font-medium text-(--lightBlack)">
                      <Icons.FaTag size={17} className="text-(--darkgray)" />
                      Tagged : Dr. Johson
                    </h4>
                    <p className="flex items-center gap-1.5 text-[13px] font-medium text-(--green)">
                      <Icons.FaCheck size={17} /> Resolved
                    </p>
                  </div>
                </div>

                <div className="mt-[15px] p-[15px] border border-(--whiteBorder) bg-(--lightYellow) text-base rounded-[5px]">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-2.5 w-full">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-(--grayShadeborder)">
                        <Image
                          src={images.profile}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          alt="profile"
                        />
                      </div>

                      <div>
                        <h1 className="text-[15px] text-(--black) font-semibold">
                          Dr. Johnson
                        </h1>
                        <span className="text-[13px] text-(--darkblue) font-normal">
                          Today, 11:30 AM
                        </span>
                      </div>
                    </div>

                    <p className="w-fit font-normal text-[15px] py-1 px-3 bg-(--lightGreen) text-(--green) text-end rounded-[3px]">
                      Response
                    </p>
                  </div>

                  <p className="pt-3 text-[12px] text-(--lightBlack) font-medium">
                    The dizziness could be related to your medication. I'll
                    review your dosage during my next visit. In the meantime,
                    please stand up slowly and stay hydrated.
                  </p>

                  <div className="flex items-center justify-between mt-[27px]">
                    <h4 className="flex items-center gap-1.5 text-[13px] font-medium text-(--lightBlack)">
                      <Icons.BsFillReplyFill
                        size={17}
                        className="text-(--darkgray)"
                      />
                      Responding to your question about dizziness
                    </h4>
                    <p className="flex items-center gap-1.5 text-[13px] font-medium text-(--darkblue)">
                      <Icons.BsFillReplyFill size={17} /> Reply
                    </p>
                  </div>
                </div>
                {showAll && (
                  <div className="mt-[15px] p-[15px] border border-(--whiteBorder) bg-(--lightYellow) text-base rounded-[5px]">
                    <div className="flex sm:justify-between items-center gap-4">
                      <div className="flex gap-2.5 w-full">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-(--grayShadeborder)">
                          <Image
                            src={images.profile}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            alt="profile"
                          />
                        </div>

                        <div>
                          <h1 className="text-[15px] text-(--black) font-semibold">
                            Mom
                          </h1>
                          <span className="text-[13px] text-(--darkblue) font-normal">
                            Yesterday, 2:45 PM
                          </span>
                        </div>
                      </div>

                      <p className="w-fit font-normal text-[15px] py-1 px-3 bg-(--lightGreen) text-(--green) text-end rounded-[3px]">
                        Resolved
                      </p>
                    </div>

                    <p className="pt-3 text-[12px] text-(--lightBlack) font-medium">
                      Sarah mentioned she's been having trouble sleeping. Could
                      this be affecting her recovery?
                    </p>

                    <div className="flex items-center justify-between mt-[27px]">
                      <h4 className="flex items-center gap-1.5 text-[13px] font-medium text-(--lightBlack)">
                        <Icons.GrGroup
                          size={17}
                          className="text-(--darkgray)"
                        />
                        Family member
                      </h4>
                      <p className="flex items-center gap-1.5 text-[13px] font-medium text-(--green)">
                        <Icons.FaCheck size={17} /> Addresses during rounds
                      </p>
                    </div>
                  </div>
                )}

                {!showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="mt-[25px] w-full flex justify-center text-[18px] text-(--darkblue) font-semibold"
                  >
                    {TEXT.VIEW_ALL}
                  </button>
                )}
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
