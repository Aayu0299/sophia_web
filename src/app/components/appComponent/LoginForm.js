"use client";
import { ROUTES } from "@/app/utils/Constant";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { TEXT } from "@/app/utils/Text";
import { validationRules } from "@/app/utils/Validation";
import { handleSpace } from "@/app/utils/InputFunction";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";

//---------function for forgot pasword------------
export default function LoginForm({ role }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { email: "" },
  });
  const router = useRouter();

  const onSubmit = async () => {
    router.push(`${ROUTES.DASHBOARD}`);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/adminLogin_img.jpg')] bg-cover bg-no-repeat"></div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative min-h-screen flex flex-col items-center justify-center p-5">
        <Image
          src={images.logo}
          alt="login"
          width={240}
          height={72}
          className="pb-7"
          priority
        />
        <div className="bg-(--white) rounded-[20px] max-w-[460px] w-full mx-auto shadow-lg p-5 sm:p-[30px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="font-bold text-[20px] sm:text-[30px] text-center text-(--black)">
                {TEXT.WELCOME_BACK}
              </h1>
              <p className="mt-4 font-normal text-[20px] sm:text-[22px] text-center text-(--darkgray)">
                {TEXT.LOGIN_ACC}
              </p>

              <div className="mt-8 space-y-5 ">
                <InputField
                  label={TEXT.EMAIL}
                  name="email"
                  placeholder={TEXT.ENTER_YOU_EMAIL}
                  maxLength={30}
                  register={register}
                  validationRules={validationRules.email}
                  error={errors.email?.message}
                  onKeyDown={handleSpace}
                />

                <InputField
                  label={TEXT.PASSWORD}
                  name="password"
                  type="password"
                  placeholder={TEXT.ENTER_PASSWORD}
                  maxLength={15}
                  register={register}
                  validationRules={validationRules.password}
                  error={errors.password?.message}
                  onKeyDown={handleSpace}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-[10px] mt-[53px]"
                >
                  {TEXT.SIGN_IN}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
