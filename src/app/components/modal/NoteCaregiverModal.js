"use client";
import { TEXT } from "@/app/utils/Text";
import Button from "../ui/Button";
import { Icons } from "@/app/utils/Icons";
import { useForm } from "react-hook-form";
import { TextareaField } from "../ui/InputField";
import { handleKeyPress } from "@/app/utils/InputFunction";
import { validationRules } from "@/app/utils/Validation";

//------function for add note for caregiver modal--------------
export default function NoteCaregiverModal({ open, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (formData) => {};

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-12">
          <div className="w-full max-w-[582px] rounded-[10px] bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E3E3]">
                <h2 className="font-semibold text-[18px] text-(--black)">
                  {TEXT.CAREGIVER_NOTE}
                </h2>
                <Icons.ImCross onClick={onClose} className="cursor-pointer" />
              </div>

              <p className="font-normal text-[16px] text-center text-(--darkgray) w-full max-w-[396px] mx-auto my-6">
                {TEXT.CAREGIVER_NOTE_DESCRIPTION}
              </p>

              <TextareaField
                label={TEXT.YOUR_NOTE}
                name="notesAdd"
                placeholder={TEXT.CAREGIVER_NOTE_PLACEHOLDER}
                register={register}
                rows={5}
                error={errors?.notesAdd?.message}
                validationRules={validationRules.notesAdd}
                isPHI={true}
                onKeyDown={handleKeyPress}
                className="rounded-sm! [box-shadow:var(--boxshadow-input)]!"
              />

              <div className="flex sm:flex-row flex-col justify-around gap-4 mt-6 mb-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 font-semibold text-[16px]! rounded-[100px] w-full"
                >
                  {TEXT.ADD_NOTE}
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
