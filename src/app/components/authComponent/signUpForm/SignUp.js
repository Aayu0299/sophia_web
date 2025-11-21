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
import { usePathname, useRouter } from "next/navigation";
import { CommonDatePicker } from "../../ui/Datepicker";
import CustomSelect from "../../ui/CustomSelect";
import { CommonIDPhotoUpload } from "../../ui/PhotoUpload";
import {
  genericRoleOptions,
  rotaryRoleOptions,
  securityQuestionOptions,
  specializationOptions,
  relationshipOptions,
} from "@/app/utils/MockData";

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
  const [specialization, setSpecialization] = useState("");
  const [rotaryRole, setRotaryRole] = useState(null);
  const [GenericRole, setGenericRole] = useState(null);
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);

  const isPatientOrFamily =
    selectedUserType === "Patient" || selectedUserType === "Family";

  const isDoctorOrCareGiver =
    selectedUserType === "Doctor" || selectedUserType === "Caregiver";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      userType: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      mrnNumber: "",
      password: "",
      confirmPassword: "",
      name: "",
      contactEmail: "",
      Specialization: "",
      npiNumber: "",
      answerOne: "",
      answerTwo: "",
      consents: false,
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

  const onSubmit = (data) => {
    if (!consent1 || !consent2 || !consent3) {
      setError("consents", {
        message: TEXT.ACCEPT_TERMS,
      });
      return;
    }
  };

  return (
    <div className="bg-(--lightblue) p-[30px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-12">
        <div className="w-full p-4 lg:p-10 h-[calc(100vh-60px)] overflow-y-auto [box-shadow:var(--shadow-form)] rounded-[5px] bg-(--white) scrollbar-hide">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <h1 className="[text-shadow:0px_2px_2px_0px_#00000066] text-(--lightblack) font-black text-[25px] sm:text-[29px] lg:text-[40px] text-center">
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
                className="rounded-md font-bold! text-[13px]! text-(--white) w-[125px]! h-[35px] py-0! uppercase"
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
                maxLength={50}
                error={errors.fullName?.message}
                register={register}
                validationRules={validationRules.fullName}
                onKeyDown={handleKeyPress}
                isPHI
              />

              <InputField
                label={TEXT.EMAIL}
                name="email"
                placeholder={TEXT.ENTER_YOU_EMAIL}
                register={register}
                maxLength={100}
                validationRules={validationRules.email}
                error={errors.email?.message}
                onKeyDown={handleSpace}
                isPHI
              />

              {/* Datepicker Field*/}
              {isPatientOrFamily && (
                <CommonDatePicker
                  label={TEXT.BIRTH_DATE}
                  selected={date}
                  onChange={setDate}
                  isPHI
                  // error={!date ? TEXT.BOD_REQUIRED : ""}
                />
              )}

              {/* Phone Number Field*/}
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

              {isDoctorOrCareGiver && (
                <CustomSelect
                  label={TEXT.SPECIALIZATION}
                  options={specializationOptions}
                  placeholder={TEXT.SELECT_SPECIALIZATION}
                  value={specialization}
                  onChange={setSpecialization}
                />
              )}

              {isPatientOrFamily && (
                <InputField
                  label={TEXT.MRN_NUMBER}
                  name="mrnNumber"
                  placeholder={TEXT.ENTER_MRN_NUMBER}
                  maxLength={20}
                  register={register}
                  validationRules={validationRules.mrnNumber}
                  error={errors.mrnNumber?.message}
                  onKeyDown={handleSpace}
                  isPHI
                />
              )}

              <InputField
                label={TEXT.PASSWORD}
                name="password"
                type="password"
                placeholder={TEXT.ENTER_PASSWORD_TEXT}
                maxLength={15}
                autoComplete="new-password"
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
                maxLength={15}
                autoComplete="new-password"
                register={register}
                validationRules={{
                  ...validationRules?.confirmPassword,
                  validate: (value) =>
                    value === watch("password") || TEXT.PASSWORD_NOT_MATCH,
                }}
                error={errors.confirmPassword?.message}
                onKeyDown={handleSpace}
              />

              {isDoctorOrCareGiver && (
                <div className="space-y-4">
                  <div>
                    <InputField
                      label={TEXT.NPI_NUMBER}
                      name="npiNumber"
                      placeholder={TEXT.ENTER_NPI_NUMBER}
                      register={register}
                      maxLength={10}
                      // validationRules={validationRules.npiNumber}
                      // error={errors.npiNumber?.message}
                      numberType={true}
                      onKeyDown={handleSpace}
                    />
                    <span className="font-normal text-[13px] text-(--darkgray) mt-2">
                      {TEXT.NPI_TEXT}
                    </span>
                  </div>

                  {/* Caregiver rotary role*/}
                  <CustomSelect
                    label={TEXT.ROTARY_ROLE}
                    options={rotaryRoleOptions}
                    placeholder={TEXT.SELECT_ROTARY_ROLE}
                    value={rotaryRole}
                    onChange={setRotaryRole}
                  />
                  {/* Generic role */}
                  <CustomSelect
                    label={TEXT.GENERIC_ROLE}
                    options={genericRoleOptions}
                    placeholder={TEXT.SELECT_GENERIC_ROLE}
                    value={GenericRole}
                    onChange={setGenericRole}
                  />
                </div>
              )}

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
                {isDoctorOrCareGiver && (
                  <InputField
                    name="answerOne"
                    placeholder={TEXT.YOUR_ANSWER}
                    register={register}
                    onKeyDown={handleKeyPress}
                    isPHI
                  />
                )}

                {/* Security Question 2 */}
                <CustomSelect
                  label={TEXT.SQ_TEXT_TWO}
                  options={securityQuestionOptions}
                  placeholder={TEXT.SELECT_SQ}
                  value={securityQ2}
                  onChange={setSecurityQ2}
                />
                {isDoctorOrCareGiver && (
                  <InputField
                    name="answerTwo"
                    placeholder={TEXT.YOUR_ANSWER}
                    register={register}
                    onKeyDown={handleKeyPress}
                    isPHI
                  />
                )}
              </div>

              {/* Emergency contact info section */}
              {isPatientOrFamily && (
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
                    maxLength={50}
                    register={register}
                    onKeyDown={handleKeyPress}
                    isPHI
                  />
                  <InputField
                    label={TEXT.EMAIL}
                    name="contactEmail"
                    placeholder={TEXT.ENTER_EMAIL}
                    maxLength={100}
                    register={register}
                    onKeyDown={handleSpace}
                    isPHI
                  />
                  {/* Phone Number Field*/}
                  <CommonPhoneInput
                    name="alternatePhone"
                    label={TEXT.PHONE_NUMBER}
                    value={secondaryDialCode + secondaryPhone}
                    defaultCountry="us"
                    isPHI
                    onChange={(value, country) => {
                      const dial = country.dialCode;
                      const phone = value.slice(dial.length);
                      setSecondaryDialCode(dial);
                      setSecondaryPhone(phone);
                      setSecondaryCountryCode(country.countryCode);
                      setValue("alternatePhone", phone, {
                        shouldValidate: false,
                      }); // no validation
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
              )}

              {/* ID Photo */}
              <CommonIDPhotoUpload
                label={TEXT.ID_PHOTO}
                sublabel={isDoctorOrCareGiver ? TEXT.OPTIONAL : ""}
                image={idPhoto}
                setImage={setIdPhoto}
              />

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="space-y-3">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consent1}
                      onChange={(e) => {
                        setConsent1(e.target.checked);
                        clearErrors("consents");
                      }}
                    />
                    <span className="text-(--darkgray) font-semibold text-[15px]">
                      <Link href="#" className="underline">
                        {TEXT.PATIENT_CONSENT}
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consent2}
                      onChange={(e) => {
                        setConsent2(e.target.checked);
                        clearErrors("consents");
                      }}
                    />
                    <span className="text-(--darkgray) font-semibold text-[15px]">
                      <Link href="#" className="underline">
                        {TEXT.HIPPA_CONDITION}
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consent3}
                      onChange={(e) => {
                        setConsent3(e.target.checked);
                        clearErrors("consents");
                      }}
                    />
                    <span className="text-(--darkgray) font-semibold text-[15px]">
                      <Link href="#" className="underline">
                        {TEXT.TEXT_CONTENT}
                      </Link>
                    </span>
                  </label>
                </div>

                {errors.consents && (
                  <p className="mt-2 text-[12px] text-(--redshade)">
                    {errors.consents.message}
                  </p>
                )}
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
        </div>

        {/* signup invite details page */}
        <SignUpInviteDetail role={role} isPatientOrFamily={isPatientOrFamily} />
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
