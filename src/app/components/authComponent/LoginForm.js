"use client";
import { useForm } from "react-hook-form";
import InputField from "@/app/components/ui/InputField";
import { validationRules } from "@/app/utils/Validation";
import Button from "../ui/Button";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import { handleSpace } from "@/app/utils/InputFunction";
import { ROUTES } from "@/app/utils/Constant";
import { useRouter } from "next/navigation";

//---------function for login form-------------
export default function LoginForm({ role }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { username: "", password: "" },
  });

  const roleImages = {
    patient: images.patientLogin,
    family: images.familyLogin,
    doctor: images.doctorLogin,
    caregiver: images.caregiverLogin,
  };

  // fallback to default if role not matched
  const imageSrc = roleImages[role];

  const onSubmit = async (formData) => {
    router.push(`/${role}/${ROUTES.DASHBOARD}`);
  };

  return (
    <div className="min-h-screen bg-(--lightblue)">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full max-w-[450px] m-auto px-4 xl:px-0">
            <div>
              <Link href={ROUTES.HOME}>
                <p className="font-bold text-[16px] sm:text-[17px] text-center underline text-(--lightBlack) mt-5 sm:mt-10 cursor-pointer">
                  {TEXT.BACK_HOME}
                </p>
              </Link>
              <h1 className="font-black text-[30px] sm:text-[40px] lg:text-[61px] text-center text-(--lightBlack)">
                {TEXT.WELCOME}
              </h1>
              <p className="mt-1 font-black text-[30px] sm:text-[40px] lg:text-[61px] text-center">
                <span className="text-(--orange) uppercase">
                  {TEXT.SOPHIA} !
                </span>
              </p>
              <p className="mt-4 font-normal text-[21px] sm:text-[24px] text-center text-(--darkgray)">
                {TEXT.SIGN_ACCOUNT}
              </p>

              <div className="mt-8 space-y-5 ">
                <InputField
                  label={TEXT.USERNAME}
                  name="username"
                  placeholder={TEXT.ENTER_USERNAME}
                  maxLength={30}
                  register={register}
                  validationRules={validationRules.username}
                  error={errors.username?.message}
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

                <div className="text-end">
                  <Link
                    href={`/${role}/${ROUTES.FORGOT_PASSWORD}`}
                    className="text-(--orange) font-semibold text-[14px] hover:underline"
                  >
                    {TEXT.FORGOT_PASSWORD}
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-[100px]"
                >
                  {TEXT.SIGN_IN}
                </Button>

                <p className="font-semibold text-[15px] text-(--darkgray) text-center">
                  {TEXT.DONT_ACCOUNT}{" "}
                  <Link
                    href={`/${role}/${ROUTES.SIGNUP}`}
                    className="text-(--darkblue) hover:underline"
                  >
                    {TEXT.CREATE_ACCOUNT}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-[calc(100vh-40px)] mt-5 mb-5">
              <Image
                src={imageSrc}
                alt={`${role} login`}
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-bl-[38px] rounded-tl-[38px]"
                priority
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
