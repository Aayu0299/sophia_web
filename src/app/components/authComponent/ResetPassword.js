"use client";
import { ROUTES } from "@/app/utils/Constant";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import Link from "next/link";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { TEXT } from "@/app/utils/Text";
import { validationRules } from "@/app/utils/Validation";
import { handleSpace } from "@/app/utils/InputFunction";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useState } from "react";

//--------function for reset password----------
export default function ResetPassword({ role }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (formData) => {
    if (otp.trim().length < 4) {
      setError(TEXT.ENTER_OTP);
      return;
    }

    setError("");
  };

  return (
    <div className="bg-[url('/health-background-image.webp')] w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-7">
      <div className="bg-(--white) rounded-[15px] md:rounded-[55px] w-full max-w-[740px] mx-auto shadow-lg px-3 sm:px-8 py-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link href={ROUTES.HOME}>
            <Image
              src={images.logo}
              alt="Sophia-logo"
              width={208}
              height={50}
              priority
              className="w-full max-w-40 sm:max-w-52 h-auto cursor-pointer mx-auto"
            />
          </Link>
          <h1 className="text-center font-semibold text-[20px] sm:text-[30px] text-(--black) my-5 sm:my-6">
            {TEXT.RESET_PASSWORD}
          </h1>
          <p className="w-full text-center max-w-[540px] mx-auto text-(--darkgray) font-medium text-[14px] sm:text-[20px] my-5 sm:my-8">
            {TEXT.RESET_TEXT}
          </p>

          <div className="flex flex-col gap-2">
            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError("");
              }}
              numInputs={4}
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-11! h-11! sm:w-[60px]! sm:h-[60px]! text-center text-[24px] font-semibold text-(--darkblue) bg-(--blueshade) rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-(--darkblue) selection:text-(--darkblue)"
                />
              )}
              containerStyle="flex justify-center gap-3"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

          <InputField
            label={TEXT.PASSWORD}
            name="password"
            type="password"
            placeholder={TEXT.ENTER_PASSWORD}
            register={register}
            validationRules={validationRules.password}
            error={errors.password?.message}
            onKeyDown={handleSpace}
            className="max-w-[450px] mx-auto my-8"
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
            className="max-w-[450px] mx-auto my-8"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[100px] max-w-[450px] mx-auto "
          >
            {TEXT.SUBMIT}
          </Button>

          <Link href={`/${role}/${ROUTES.LOGIN}`}>
            <p className="font-bold text-[16px] sm:text-[17px] underline text-(--lightBlack) text-center mt-5 sm:mt-10 cursor-pointer">
              {TEXT.BACK_SIGNIN}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
