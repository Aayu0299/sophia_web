import { TEXT } from "@/app/utils/Text";
import Button from "../ui/Button";
import { Icons } from "@/app/utils/Icons";
import InputField, { CommonPhoneInput } from "../ui/InputField";
import { useEffect, useState } from "react";
import { validationRules } from "@/app/utils/Validation";
import { handleKeyPress, handleSpace } from "@/app/utils/InputFunction";
import { useForm } from "react-hook-form";
import CustomSelect from "../ui/CustomSelect";
import { relationshipOptions } from "@/app/utils/MockData";

//------function for invite family and friends modal--------------
export default function InviteFamilyModal({ open, onClose }) {
  if (!open) return null;

  const [phoneNo, setPhoneNo] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [countryCode, setCountryCode] = useState("us");
  const [relationship, setRelationship] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { name: "", phoneNumber: "", email: "" },
  });

  useEffect(() => {
    register("phoneNumber", validationRules.phoneNumber);
  }, [register]);

  const onSubmit = async (formData) => {};

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto scrollbar-hide">
          <div className="bg-white w-full max-w-[582px] rounded-[10px] m-3 mt-[30px]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3E3]">
              <h2 className="font-semibold text-[18px] text-(--black)">
                {TEXT.INVITE_FAMILY_OR_FRIEND}
              </h2>
              <Icons.ImCross onClick={onClose} className="cursor-pointer" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 space-y-4 p-4"
            >
              <p className="font-normal text-[16px] text-center text-(--darkgray) px-4 w-full max-w-[427px] mx-auto">
                {TEXT.INVITE_SOMEONE}
              </p>

              <InputField
                label={TEXT.NAME}
                name="name"
                placeholder={TEXT.ENTER_NAME}
                maxLength={50}
                error={errors?.name?.message}
                validationRules={validationRules?.name}
                register={register}
                onKeyDown={handleKeyPress}
                isPHI
              />

              <CommonPhoneInput
                name="phoneNumber"
                label={TEXT.PHONE_NUMBER}
                value={dialCode + phoneNo}
                defaultCountry="us"
                error={errors.phoneNumber?.message}
                isPHI
                onChange={(value, country) => {
                  const dial = country.dialCode;
                  const phone = value.slice(dial.length);
                  setDialCode(dial);
                  setPhoneNo(phone);
                  setCountryCode(country.countryCode);
                  setValue("phoneNumber", phone, { shouldValidate: true });
                  trigger("phoneNumber");
                }}
              />

              <InputField
                label={TEXT.EMAIL}
                name="email"
                placeholder={TEXT.ENTER_EMAIL}
                register={register}
                maxLength={100}
                validationRules={validationRules?.email}
                error={errors.email?.message}
                onKeyDown={handleSpace}
                isPHI
              />

              {/* Relationship field*/}
              <div className="mt-4">
                <CustomSelect
                  label={TEXT.RELATIONSHIP_YOU}
                  options={relationshipOptions}
                  placeholder={TEXT.SELECT_RELATION}
                  value={relationship}
                  onChange={setRelationship}
                />
                <p className="text-[11px] text-(--darkgray) font-normal text-end mt-1">
                  {TEXT.EXAMPLE_RELATION}
                </p>
              </div>
              <div className="flex sm:flex-row flex-col justify-around gap-4 mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 font-semibold text-[16px]! rounded-[100px] w-full"
                >
                  {TEXT.INVITE_BUTTON}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  className="px-4 font-semibold text-[16px]! rounded-[100px] w-full bg-(--buttonBg)! text-(--darkgray)!"
                >
                  {TEXT.CANCEL}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
