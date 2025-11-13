"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTypeModal from "../../modal/UserTypeModal";
import InputField, { CommonPhoneInput } from "../../ui/InputField";
import { validationRules } from "@/app/utils/Validation";
import { handleKeyPress, handleSpace } from "@/app/utils/InputFunction";
import SignUpInviteDetail from "./SignUpInviteDetail";
import { TEXT } from "@/app/utils/Text";
import Button from "../../ui/Button";
import Link from "next/link";
import { ROUTES } from "@/app/utils/Constant";
import Image from "next/image";
import { images } from "@/app/utils/Images";
import { Icons } from "@/app/utils/Icons";
import { usePathname, useRouter } from "next/navigation";
import { CommonDatePicker } from "../../ui/Datepicker";
import CustomSelect from "../../ui/CustomSelect";
import { CommonIDPhotoUpload } from "../../ui/PhotoUpload";

//---------function for signup form-------------
export default function SignUp({ role }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [tempSelectedUserType, setTempSelectedUserType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [countryCode, setCountryCode] = useState("us");
  const [date, setDate] = useState(null);
  const [securityQ1, setSecurityQ1] = useState(null);
  const [securityQ2, setSecurityQ2] = useState(null);
  const [relationship, setRelationship] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [secondaryDialCode, setSecondaryDialCode] = useState("");
  const [secondaryCountryCode, setSecondaryCountryCode] = useState("us");

  const securityQuestionOptions = [
    { value: "birthCity", label: "What city were you born in?" },
    { value: "petName", label: "What was your first pet’s name?" },
    { value: "schoolName", label: "What was the name of your first school?" },
    { value: "favTeacher", label: "Who was your favorite teacher?" },
  ];

  // dynamic options (API se bhi la sakte ho)
  const relationshipOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "spouse", label: "Spouse" },
    { value: "guardian", label: "Guardian" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      userType: "",
      fullName: "",
      email: "",
      mrnNumber: "",
      password: "",
      confirmPassword: "",
      name: "",
      contactEmail: "",
      agreeTerms: false,
    },
  });

  useEffect(() => {
    register("phoneNumber", validationRules.phoneNumber);
  }, [register]);

  //  set default user type from URL or prop
  useEffect(() => {
    if (!selectedUserType) {
      const urlRole = pathname?.split("/")?.[1] || role || "";
      if (urlRole) {
        // Capitalize or match label from TEXT constants
        const defaultType = urlRole.charAt(0).toUpperCase() + urlRole.slice(1);
        setSelectedUserType(defaultType);
      }
    }
  }, [pathname, role, selectedUserType]);

  const onSubmit = async (formData) => {
    // if (idPhoto?.file) {
    //   formData.append("id_photo", idPhoto.file); // only append if selected
    // }
  };

  return (
    <div className="min-h-screen bg-(--lightblue) p-[30px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-[5px] bg-(--white) shadow-sm [box-shadow:var(--shadow-form)] p-4 lg:p-10"
        >
          <h1 className="[text-shadow:0px_2px_2px_0px_#00000066] text-(--lightblack) font-black text-[25px] sm:text-[29px] lg:text-[40px] text-center uppercase">
            {TEXT.CREATE_ACCOUNT}
          </h1>
          <p className="mt-1 text-[18px] lg:text-[24px] text-center text-(--darkgray)">
            {TEXT.HEALTHCARE_ACCOUNT}
          </p>

          <Link href={ROUTES.HOME}>
            <Image
              src={images.logo}
              alt="Sophia logo"
              width={150}
              height={50}
              priority
              className="w-full max-w-[150px] h-auto cursor-pointer mx-auto mt-5 sm:hidden"
            />
          </Link>

          <div className="flex items-center mb-12 sm:hidden mt-4">
            <Button
              onClick={() => router.push(`/${role}/${ROUTES.LOGIN}`)}
              className="rounded-md font-bold! text-[13px]! text-(--white) w-[125px]! h-[35px] py-0!"
            >
              {TEXT.BACK_SIGNIN}
            </Button>
          </div>

          <div className="mt-8 space-y-4">
            <InputField
              label={TEXT.USER_TYPE}
              name="userType"
              placeholder={TEXT.SELECT_USERTYPE}
              value={selectedUserType}
              readOnly
              icon={true}
              onClick={() => {
                setTempSelectedUserType(selectedUserType);
                setIsUserTypeOpen(true);
              }}
            />
            <InputField
              label={TEXT.FULL_NAME}
              name="fullName"
              placeholder={TEXT.ENTER_FULL_NAME}
              error={errors.fullName?.message}
              register={register}
              validationRules={validationRules.fullName}
              onKeyDown={handleKeyPress}
            />

            <InputField
              label={TEXT.EMAIL}
              name="email"
              placeholder={TEXT.ENTER_YOU_EMAIL}
              register={register}
              validationRules={validationRules.email}
              error={errors.email?.message}
              onKeyDown={handleSpace}
            />

            {/* Datepicker Field*/}
            <CommonDatePicker
              label={TEXT.BIRTH_DATE}
              selected={date}
              onChange={setDate}
              // error={!date ? TEXT.BOD_REQUIRED : ""}
            />

            {/* Phone Number Field*/}
            <CommonPhoneInput
              name="phoneNumber"
              label={TEXT.PHONE_NUMBER}
              value={dialCode + phoneNo}
              defaultCountry="us"
              error={errors.phoneNumber?.message}
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
              label={TEXT.MRN_NUMBER}
              name="mrnNumber"
              placeholder={TEXT.ENTER_MRN_NUMBER}
              register={register}
              validationRules={validationRules.mrnNumber}
              error={errors.mrnNumber?.message}
              onKeyDown={handleSpace}
            />
            <InputField
              label={TEXT.PASSWORD}
              name="password"
              type="password"
              placeholder={TEXT.ENTER_PASSWORD_TEXT}
              register={register}
              validationRules={validationRules.password}
              error={errors.password?.message}
              onKeyDown={handleSpace}
            />
            <InputField
              label={TEXT.CONFIRM_PASSWORD}
              name="confirmPassword"
              type="password"
              placeholder={TEXT.ENTER_CNF_PASSWORD}
              register={register}
              validationRules={{
                ...validationRules?.confirmPassword,
                validate: (value) =>
                  value === watch("password") || TEXT.PASSWORD_NOT_MATCH,
              }}
              error={errors.confirmPassword?.message}
              onKeyDown={handleSpace}
            />

            {/* Security questions section */}
            <div className="space-y-4">
              <h2 className="font-semibold text-[20px] sm:text-[22px] max-[400px]:text-[16px] text-(--black) mt-8">
                {TEXT.SQ_TEXT}
              </h2>

              {/* Security Question 1 */}
              <CustomSelect
                label={TEXT.SQ_TEXT_ONE}
                options={securityQuestionOptions}
                placeholder={TEXT.SELECT_SQ}
                value={securityQ1}
                onChange={setSecurityQ1}
              />

              {/* Security Question 2 */}
              <CustomSelect
                label={TEXT.SQ_TEXT_TWO}
                options={securityQuestionOptions}
                placeholder={TEXT.SELECT_SQ}
                value={securityQ2}
                onChange={setSecurityQ2}
              />
            </div>

            {/* Emergency contact info section */}
            <div className="space-y-4">
              <div className="text-center mt-8">
                <h2 className="font-semibold text-[20px] sm:text-[22px] max-[400px]:text-[16px] text-(--black) inline-block relative">
                  {TEXT.EMERGENCY_CONTACT} :
                  <span className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-[25px] border-b-4 border-(--darkblue) rounded-sm"></span>
                </h2>
              </div>

              <InputField
                label={TEXT.NAME}
                name="name"
                placeholder={TEXT.ENTER_NAME}
                error={errors.name?.message}
                register={register}
                onKeyDown={handleKeyPress}
              />
              <InputField
                label={TEXT.EMAIL}
                name="contactEmail"
                placeholder={TEXT.ENTER_EMAIL}
                register={register}
                error={errors.email?.message}
                onKeyDown={handleSpace}
              />
              {/* Phone Number Field*/}
              <CommonPhoneInput
                name="alternatePhone"
                label={TEXT.PHONE_NUMBER}
                value={secondaryDialCode + secondaryPhone}
                defaultCountry="us"
                onChange={(value, country) => {
                  const dial = country.dialCode;
                  const phone = value.slice(dial.length);
                  setSecondaryDialCode(dial);
                  setSecondaryPhone(phone);
                  setSecondaryCountryCode(country.countryCode);
                  setValue("alternatePhone", phone, { shouldValidate: false }); // no validation
                }}
              />

              {/* Relationship field*/}
              <div className="mt-4">
                <CustomSelect
                  label={TEXT.RELATIONSHIP}
                  options={relationshipOptions}
                  placeholder={TEXT.SELECT_RELATION}
                  value={relationship}
                  onChange={setRelationship}
                />
              </div>
            </div>

            {/* ID Photo */}
            <CommonIDPhotoUpload
              label={TEXT.ID_PHOTO}
              image={idPhoto}
              setImage={setIdPhoto}
            />

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-(--darkgray) font-semibold text-[15px]">
                  <Link href="#" className="underline">
                    {TEXT.PATIENT_CONSENT}
                  </Link>
                </span>
              </label>

              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-(--darkgray) font-semibold text-[15px]">
                  <Link href="#" className="underline">
                    {TEXT.HIPPA_CONDITION}
                  </Link>
                </span>
              </label>

              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-(--darkgray) font-semibold text-[15px]">
                  <Link href="#" className="underline">
                    {TEXT.TEXT_CONTENT}
                  </Link>
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[100px]"
            >
              {TEXT.CREATE_ACCOUNT}
            </Button>

            <p className="font-semibold text-[15px] text-(--darkgray) text-center mt-4">
              {TEXT.ALREADY_ACCOUNT}{" "}
              <Link
                href={`/${role}/${ROUTES.LOGIN}`}
                className="text-(--darkblue) hover:underline"
              >
                {TEXT.SIGN_IN}
              </Link>
            </p>
          </div>
        </form>

        {/* signup invite details page */}
        <SignUpInviteDetail role={role} />
      </div>

      <UserTypeModal
        open={isUserTypeOpen}
        onClose={() => setIsUserTypeOpen(false)}
        selected={tempSelectedUserType}
        onSelect={(value) => setTempSelectedUserType(value)} // only temp update on click
        onApply={() => {
          setSelectedUserType(tempSelectedUserType); // apply final value
          setIsUserTypeOpen(false);
        }}
      />
    </div>
  );
}
