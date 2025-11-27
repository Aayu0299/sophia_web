"use client";
import { TEXT } from "@/app/utils/Text";
import Button from "../ui/Button";
import { Icons } from "@/app/utils/Icons";
import { useForm } from "react-hook-form";
import { TextareaField } from "../ui/InputField";
import { handleKeyPress } from "@/app/utils/InputFunction";
import { validationRules } from "@/app/utils/Validation";

//------function for reply modal--------------
export default function ReplyModal({ open, onClose }) {
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
                  {TEXT.REPLY}
                </h2>
                <Icons.ImCross onClick={onClose} className="cursor-pointer" />
              </div>
              <p className="font-normal text-[16px] text-center text-(--darkgray) w-full max-w-[427px] mx-auto my-6">
                {TEXT.NOTE_INCLUDE}
              </p>

              <TextareaField
                label={TEXT.NOTE}
                name="notesAdd"
                placeholder={TEXT.TEXT_HERE}
                register={register}
                error={errors?.notesAdd?.message}
                validationRules={validationRules.notesAdd}
                isPHI={true}
                onKeyDown={handleKeyPress}
                className="rounded-sm! [box-shadow:var(--boxshadow-input)]!"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[100px] mt-8 mb-4 font-semibold text-[16px]!"
              >
                {TEXT.SUBMIT}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
