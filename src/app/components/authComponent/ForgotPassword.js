import { ROUTES } from "@/app/utils/Constant";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { TEXT } from "@/app/utils/Text";
import { validationRules } from "@/app/utils/Validation";
import { handleSpace } from "@/app/utils/InputFunction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../ui/InputField";

//---------function for forgot pasword------------
export default function ForgotPassword({ role }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { email: "" },
  });
  const router = useRouter();

  const onSubmit = async (formData) => {
    router.push(`/${role}/${ROUTES.RESET_PASSWORD}`);
  };

  return (
    <div className="bg-[url('/health-background-image.webp')] w-full min-h-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center p-5">
      <div className="bg-(--white) rounded-[15px] md:rounded-[55px] w-full max-w-[740px] mx-auto shadow-lg px-3 sm:px-8 py-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link href={ROUTES.HOME}>
            <Image
              src={images.logo}
              alt="Sophia logo"
              width={208}
              height={50}
              priority
              className="w-full max-w-40 sm:max-w-52 h-auto cursor-pointer mx-auto"
            />
          </Link>
          <h1 className="text-center font-semibold text-[20px] sm:text-[30px] text-(--black) my-5 sm:my-8">
            {TEXT.FORGOT_PASSWORD}
          </h1>
          <p className="w-full text-center max-w-[540px] mx-auto text-(--darkgray) font-medium text-[14px] sm:text-[20px] my-5 sm:my-8">
            {TEXT.FORGOT_TEXT}
          </p>
          <InputField
            label={TEXT.EMAIL_ID}
            name="email"
            placeholder={TEXT.ENTER_EMAIL}
            maxLength={100}
            register={register}
            validationRules={validationRules.email}
            error={errors.email?.message}
            onKeyDown={handleSpace}
            className="max-w-[450px] mx-auto my-10"
            isPHI
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[100px] max-w-[450px] mx-auto"
          >
            {TEXT.SEND_LINK}
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
