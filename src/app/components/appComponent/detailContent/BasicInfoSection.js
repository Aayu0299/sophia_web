import React from "react";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import { DetailInputField } from "../../ui/InputField";
import { TEXT } from "@/app/utils/Text";

export default function BasicInfoSection({ role }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-[30px]">
      {/* LEFT COLUMN */}
      <div className="space-y-8">
        <DetailInputField
          label={TEXT.EMAIL}
          name="email"
          type="email"
          placeholder={TEXT.ENTER_YOU_EMAIL}
          defaultValue="meachel123@gmail.com"
        />
        {role === "doctor" ? (
          <DetailInputField
            label={TEXT.NPI_NO}
            name="npi_number"
            type="text"
            placeholder={TEXT.NPI_NO_PLACEHOLDER}
            defaultValue="5676578745654433"
          />
        ) : (
          <DetailInputField
            label={TEXT.MRN_NO}
            name="mrn_number"
            type="text"
            placeholder={TEXT.ENTER_MRN_NO}
            defaultValue="5676578745654433"
          />
        )}

        {/* Emergency Contact Section */}
        {role !== "doctor" ? (
          <div>
            <p className="text-sm font-semibold text-(--black)">
              {TEXT.EMERGENCY_TITLE}{" "}
              <span className="text-[#8f8f8f]">{TEXT.OPTIONAL}</span>
            </p>

            <div className="mt-4 space-y-6">
              <DetailInputField
                label={TEXT.EMERGENCY_NAME}
                name="emergency_name"
                placeholder={TEXT.EMERGENCY_NAME_PLACEHOLDER}
                defaultValue="John Doe"
              />

              <DetailInputField
                label={TEXT.EMERGENCY_RELATION}
                name="emergency_relationship"
                placeholder={TEXT.EMERGENCY_RELATION_PLACEHOLDER}
                defaultValue="Brother"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            <DetailInputField
              label={TEXT.CAREGIVER_ROTARY}
              name="rotary_role"
              placeholder={TEXT.EMERGENCY_NAME_PLACEHOLDER}
              defaultValue="Lorem Ipsum"
            />

            <DetailInputField
              label={TEXT.GENRIC_ROLE}
              name="genericrole"
              placeholder={TEXT.EMERGENCY_RELATION_PLACEHOLDER}
              defaultValue="Lorem Ipsum"
            />
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-8 pl-4">
        {role !== "doctor" && (
          <DetailInputField
            label={TEXT.BIRTH_DATE}
            name="birth_date"
            placeholder={TEXT.BIRTH_DATE_PLACEHOLDER}
            defaultValue="2000-07-20"
            icon={
              <Image
                src={images.date}
                width={20}
                height={20}
                alt="date"
                className="pb-2"
              />
            }
          />
        )}

        {role === "doctor" && (
          <DetailInputField
            label={TEXT.SPECIALIZATION}
            name="Specialization"
            type="text"
            placeholder={TEXT.SPECIALIZATION_PLACEHOLDER}
            defaultValue="lorem Ipsum"
          />
        )}

        <DetailInputField
          label={TEXT.PHONE_NUMBER}
          placeholder={TEXT.PHONE_PLACEHOLDER}
          name="phone"
          defaultValue="+1 7564 456 4567"
        />

        {/* ID PHOTO */}
        <div className="mt-[30px]">
          <label className="text-[20px] font-medium text-(--black)">
            {TEXT.ID_PHOTO}
          </label>

          <div className="w-fit mt-3 rounded-xl overflow-hidden shadow-[0px_2px_6px_0px_#0000002E]">
            {role === "doctor" ? (
              <Image
                src={images.doctorID}
                width={424}
                height={258}
                alt="ID Card"
                className="object-cover"
              />
            ) : (
              <Image
                src={images.idCard}
                width={424}
                height={258}
                alt="ID Card"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
