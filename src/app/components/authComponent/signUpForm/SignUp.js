"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTypeModal from "../../modal/UserTypeModal";
import InputField from "../../ui/InputField";
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

//---------function for signup form-------------
export default function SignUp({ role }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [tempSelectedUserType, setTempSelectedUserType] = useState("");

  const {
    register,
    handleSubmit,
    watch,
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
      agreeTerms: false,
    },
  });

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

  const onSubmit = async (formData) => {};

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
              alt="Sophia-logo"
              width={150}
              height={50}
              priority
              className="w-full max-w-[150px] h-auto cursor-pointer mx-auto mt-5 sm:hidden"
            />
          </Link>

          <div className="flex items-center mb-12 sm:hidden mt-4">
            <Icons.IoArrowBack className="h-5 w-5 mr-2" />
            <Button
              onClick={() => router.push(`/${role}/${ROUTES.LOGIN}`)}
              className="rounded-md font-bold! text-[13px]! text-(--white) w-[125px]! h-[35px] py-0!"
            >
              {TEXT.BACK_SIGNIN}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">
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
              placeholder={TEXT.ENTER_PASSWORD}
              register={register}
              validationRules={validationRules.password}
              error={errors.password?.message}
              onKeyDown={handleSpace}
            />
            <InputField
              label={TEXT.CONFIRM_PASSWORD}
              name="confirmPassword"
              type="password"
              placeholder={TEXT.ENTER_CONFIRM_PASSWORD}
              register={register}
              validationRules={{
                ...validationRules?.confirmPassword,
                validate: (value) =>
                  value === watch("password") || TEXT.PASSWORD_NOT_MATCH,
              }}
              error={errors.confirmPassword?.message}
              onKeyDown={handleSpace}
            />
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
