"use client";
import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";
import React, { useState } from "react";

export default function StaffList() {
  const [showMoreDoctors, setShowMoreDoctors] = useState(false);
  const [showMoreCaregivers, setShowMoreCaregivers] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Doctors List */}
      <div>
        <h3 className="text-[16px] font-semibold text-(--black) pb-3">
          {TEXT.DOCTOR_LIST}
        </h3>
        <div className="border border-(--lightGreish) px-3">
          {/* 1 */}
          <div className="flex items-center gap-3 py-[15px] border-b border-(--singleBorder)">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
              <Image
                src={images.profile}
                width={55}
                height={55}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
            <div>
              <p className="font-semibold text-[17px] text-(--black)">
                Dr. Michael Chen
              </p>
              <p className="text-(--darkblue) text-[13px] font-normal">
                Cardiologist - Primary
              </p>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3 py-[15px] border-b border-(--singleBorder)">
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
              <Image
                src={images.profile}
                width={55}
                height={55}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
            <div>
              <p className="font-semibold text-[17px] text-(--black)">
                Dr. Lisa Martinez
              </p>
              <p className="text-(--darkblue) text-[13px] font-normal">
                Emergency Medicine
              </p>
            </div>
          </div>

          {/* 3 */}
          {showMoreDoctors && (
            <div className="flex items-center gap-3 py-[15px] border-b border-(--singleBorder)">
              <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
                <Image
                  src={images.profile}
                  width={55}
                  height={55}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
              <div>
                <p className="font-semibold text-[17px] text-(--black)">
                  Dr. James Wilson
                </p>
                <p className="text-(--darkblue) text-[13px] font-normal">
                  Internal Medicine
                </p>
              </div>
            </div>
          )}

          {/* VIEW ALL */}
          <div className="py-[25px] text-center">
            <button
              className="text-(--darkblue) text-[18px] font-semibold"
              onClick={() => setShowMoreDoctors(true)}
            >
              {TEXT.VIEW_ALL}
            </button>
          </div>
        </div>
      </div>

      {/* Caregivers List */}
      <div>
        <h3 className="text-[16px] font-semibold text-(--black) pb-3">
          {TEXT.CAREGIVER_LIST}
        </h3>
        <div className="border border-(--lightGreish) px-3">
          {/* 1 */}
          <div className="flex items-center justify-between py-[15px] border-b border-(--singleBorder)">
            <div className="flex items-center gap-3">
              <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
                <Image
                  src={images.profile}
                  width={55}
                  height={55}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
              <div>
                <p className="font-semibold text-[17px] text-(--black)">
                  Dr. Johnson
                </p>
                <p className="text-(--darkblue) text-[13px] font-normal">
                  Primary Physician
                </p>
              </div>
            </div>
            <div className="w-3 h-3 bg-(--darkGreen) rounded-full"></div>
          </div>

          {/* 2 */}
          <div className="flex items-center justify-between py-[15px] border-b border-(--singleBorder)">
            <div className="flex items-center gap-3">
              <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
                <Image
                  src={images.profile}
                  width={55}
                  height={55}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
              <div>
                <p className="font-semibold text-[17px] text-(--black)">
                  Jennifer M.
                </p>
                <p className="text-(--darkblue) text-[13px] font-normal">
                  Primary Nurse
                </p>
              </div>
            </div>
            <div className="w-3 h-3 bg-(--darkGreen) rounded-full"></div>
          </div>

          {/* 3 */}
          {showMoreCaregivers && (
            <div className="flex items-center justify-between py-[15px] border-b border-(--singleBorder)">
              <div className="flex items-center gap-3">
                <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-(--grayShadeborder)">
                  <Image
                    src={images.profile}
                    width={55}
                    height={55}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[17px] text-(--black)">
                    Dr. Smith
                  </p>
                  <p className="text-(--darkblue) text-[13px] font-normal">
                    Specialist
                  </p>
                </div>
              </div>
              <div className="w-3 h-3 bg-(--singleBorder) rounded-full"></div>
            </div>
          )}

          {/* VIEW ALL */}
          <div className="py-[25px] text-center">
            <button
              className="text-(--darkblue) text-[18px] font-semibold"
              onClick={() => setShowMoreCaregivers(true)}
            >
              {TEXT.VIEW_ALL}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
