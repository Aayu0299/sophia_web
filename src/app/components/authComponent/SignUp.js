"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/app/components/ui/InputField";
import UserTypeModal from "@/app/components/authComponent/UserTypeModal";
import { validationRules } from "@/app/utils/Validation";
import { TEXT } from "@/app/utils/Text";
import { handleKeyPress } from "@/app/utils/InputFunction";

//---------function for signup form-------------
export default function SignUp({ role }) {
  console.log("role", role);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      userType: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const selectedUserType = watch("userType");

  const onSubmit = async (formData) => {
    // Demo submit – replace with API call later
    // eslint-disable-next-line no-console
    console.log("SignUp form:", formData);
  };

  const handleSelectUserType = (type) => {
    setValue("userType", type, { shouldDirty: true, shouldTouch: true });
    trigger("userType");
    setIsUserTypeOpen(false);
  };

  return (
    <div className="min-h-screen bg-(--lightblue)">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="flex items-start justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-2xl bg-white p-5 shadow-sm [box-shadow:var(--boxshadow-input)] sm:p-6 md:p-8"
          >
            <h1 className="text-xl font-semibold text-(--black)">{TEXT.CREATE_ACCOUNT}</h1>
            <p className="mt-1 text-sm text-(--grayshade)">{TEXT.SIGN_ACCOUNT}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label={TEXT.USER_TYPE}
                name="userType"
                placeholder="Select user type"
                error={errors.userType?.message}
                register={register}
                validationRules={validationRules.userType}
                readOnly
                onClick={() => setIsUserTypeOpen(true)}
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
                label={TEXT.EMAIL_ID}
                name="email"
                type="email"
                placeholder={TEXT.ENTER_EMAIL}
                error={errors.email?.message}
                register={register}
                validationRules={validationRules.email}
              />
              <InputField
                label={TEXT.PHONE_NUMBER}
                name="phone"
                type="tel"
                placeholder={TEXT.ENTER_PHONE_NUMBER}
                error={errors.phone?.message}
                register={register}
                validationRules={validationRules.phone}
              />
              <InputField
                label={TEXT.PASSWORD}
                name="password"
                type="password"
                placeholder={TEXT.ENTER_PASSWORD}
                error={errors.password?.message}
                register={register}
                validationRules={validationRules.password}
              />
              <InputField
                label={TEXT.CONFIRM_PASSWORD}
                name="confirmPassword"
                type="password"
                placeholder={TEXT.ENTER_CONFIRM_PASSWORD}
                error={errors.confirmPassword?.message}
                register={register}
                validationRules={{
                  ...validationRules.confirmPassword,
                  validate: (value, { watch }) =>
                    value === watch("password") || TEXT.PASSWORD_NOT_MATCH,
                }}
                watch={watch}
              />
            </div>

            <div className="mt-5 space-y-3">
              <label className="flex items-center gap-3 text-sm text-(--black)">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  {...register("agreeTerms", { required: true })}
                />
                <span>
                  I agree to the <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy Policy</a>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[12px] text-red-600">Please accept the terms to continue.</p>
              )}
            </div>

            <div className="mt-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="h-12 w-full rounded-xl bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {TEXT.CREATE_ACCOUNT}
              </button>
            </div>
          </form>
        </div>

        <aside className="hidden rounded-2xl bg-white p-6 lg:block [box-shadow:var(--boxshadow-input)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="text-xl font-semibold text-blue-700">{TEXT.SOPHIA}</div>
              <p className="mt-3 text-sm text-(--grayshade)">
                Welcome to our digital health platform. Create your account to get started.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="font-medium">Website Details</div>
                  <div className="mt-2 text-(--grayshade)">Secure and private by design.</div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-xs text-(--grayshade)">Need help? Contact support</div>
          </div>
        </aside>
      </div>

      <UserTypeModal
        open={isUserTypeOpen}
        onClose={() => setIsUserTypeOpen(false)}
        onSelect={handleSelectUserType}
        selected={selectedUserType}
      />
    </div>
  );
}
