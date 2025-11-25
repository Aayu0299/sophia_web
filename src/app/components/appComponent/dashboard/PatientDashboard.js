"use client";
import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import Image from "next/image";
import Button from "../../ui/Button";
import { TextareaField } from "../../ui/InputField";
import { handleKeyPress } from "@/app/utils/InputFunction";
import { doctors, notes } from "@/app/utils/MockData";
import { TEXT } from "@/app/utils/Text";
import InviteFamilyModal from "../../modal/InviteFamilyModal";
import ReplyModal from "../../modal/ReplyModal";
import CreateNoteModal from "../../modal/CreateNoteModal";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PatientDashboard() {
  const [isInviteFamilyModalOpen, setIsInviteFamilyModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="min-h-screen">
      {/* Patient details */}
      <div className="bg-white rounded-[5px] [box-shadow:var(--shadow-form)]">
        <div className="flex max-[400px]:flex-col flex-row items-center max-[400px]:items-start justify-between gap-4 p-5">
          <div className="flex items-center gap-4">
            <div className="sm:w-[50px] sm:h-[50px] w-10 h-10 rounded-full overflow-hidden border border-(--grayShadeborder) ">
              <Image
                src={images.profile}
                alt="Profile image"
                width={60}
                height={60}
                priority
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div>
              <h1 className="font-semibold text-[14px] sm:text-[25px] text-(--black)">
                Meachel Marsh
              </h1>
              <p className="font-normal text-[12px] sm:text-[15px] text-(--lightBlack)">
                {TEXT.AGE} : <span className="text-(--darkblue)">40 years</span>
              </p>
            </div>
          </div>

          <span className="flex items-center gap-3 w-[135px] bg-green-100 text-(--lightGreen) px-4 py-2 rounded-[40px] font-medium text-[12px] sm:text-[16px]">
            <Icons.LuUserCheck className="w-5 h-5" /> Admitted
          </span>
        </div>

        <div className="grid max-[400px]:grid-cols-1 grid-cols-3 md:grid-cols-3  gap-4 bg-(--lightBlack) text-white p-2 text-center justify-center">
          <div className="relative flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">
              {TEXT.ROOM}
            </p>
            <p className="font-medium text-[14px]">101-A</p>

            <span className="max-[400px]:hidden block absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-(--borderGray)"></span>
          </div>

          <div className="relative flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">
              {TEXT.CONTACT}
            </p>
            <p className="font-medium text-[14px]">(555) 123-4567</p>

            <span className="max-[400px]:hidden block absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-(--borderGray)"></span>
          </div>

          <div className="flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">
              {TEXT.EMERGENCY_CONTACT}
            </p>
            <p className="font-medium text-[14px]">
              John Johnson (555) 987-6543
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
            <Icons.RiStethoscopeLine className="text-(--darkblue)" />
            {TEXT.CONSULTING}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc, index) => (
              <div
                key={index}
                className="border border-(--blueShadeadd) rounded-sm p-4 cursor-pointer bg-blue-50 transition"
              >
                <h3 className="text-(--darkblue) font-semibold text-[16px]">
                  {doc.name}
                </h3>
                <p className="text-(--lightBlack) font-normal text-[16px]">
                  {doc.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient History */}
      <div className="mt-6 bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
          <Icons.MdOutlineWatchLater className="text-(--darkblue)" />
          {TEXT.PATIENT_HISTORY}
        </h2>

        <div className="border border-(--borderGray) rounded-[3px] p-5 mb-4 bg-(--bgBoxColor)">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
            <p className="font-semibold text-[14px] text-(--blackshade)">
              Note - Patient Update
            </p>
            <span className="font-medium text-[14px] text-(--lightBlack) mt-2 sm:mt-0">
              Sat 15 Oct 09:32 AM
            </span>
          </div>
          <p className="font-normal text-[13px] leading-relaxed text-(--lightBlack)">
            Patient examination completed successfully. Meachel is doing much
            better today – her blood pressure is stable at 135/85, down from the
            initial 180/110. She reports that the chest pain has completely
            resolved and she’s feeling much more comfortable. Her glucose levels
            are showing improvement with the medication adjustments we made
            yesterday. She’s been ambulating well and appears ready for
            discharge planning.
          </p>
          <p className="text-(--darkblue) font-semibold text-[14px] mt-3">
            Dr. Michael Roberts, Cardiologist
          </p>
        </div>

        <div className="border border-(--borderGray) rounded-[3px] p-5 bg-(--bgBoxColor)">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <p className="font-semibold text-[14px] text-(--blackshade)">
              Voice Note - Patient Update
            </p>
            <span className="font-medium text-[14px] text-(--lightBlack) mt-2 sm:mt-0">
              Sun 16 Oct 09:32 AM
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#0043961F] px-3 py-4 rounded-sm w-full max-w-[415px]">
            <div className="flex items-center gap-4">
              <Icons.MdOutlineKeyboardVoice className="text-(--darkblue) w-[26px] h-[26px]" />
              <p className="text-(--darkblue) font-medium text-[16px]">
                Voice Mail
                <span className="font-medium text-[12px] text-(--lightBlack) ml-2">
                  (52 sec)
                </span>
              </p>
            </div>
            <Icons.FaPlayCircle className="text-(--darkblue) w-[26px] h-[26px]" />
          </div>
          <p className="text-(--darkblue) font-semibold text-[14px] mt-3">
            Dr. Michael Roberts, Cardiologist
          </p>
        </div>
      </div>

      {/* Add Note Section */}
      <div className="mt-6 bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
          <h2 className="flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
            <Icons.FaRegQuestionCircle className="text-(--darkblue)" />
            {TEXT.ADD_NOTE_FOR_CARE_TEAM}
          </h2>
          <div className="text-(--redshade) font-semibold text-[15px] flex items-center gap-2 mt-3 sm:mt-0 cursor-pointer">
            <Icons.MdOutlineKeyboardVoice className="bg-(--redshade) rounded-full text-white w-[35px] h-[35px] p-1" />
            <span
              onClick={() => {
                setNoteModalOpen(true);
              }}
            >
              {TEXT.ADD_NOTE}
            </span>
          </div>
        </div>

        <p className="font-normal text-[14px] text-(--blackshade) mb-5">
          Ask a question that you’d like addressed during the next caregiver
          visit.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextareaField
            label={TEXT.YOUR_NOTE}
            name="notesAdd"
            placeholder={TEXT.NOTE_PLACEHOLDER}
            register={register}
            // error={errors?.message?.message}
            // validationRules={{ required: "Message is required" }}
            isPHI={true}
            onKeyDown={handleKeyPress}
            className="border border-(--borderTextarea) bg-(--bgTextarea)! shadow-none! rounded-sm!"
          />

          <div className="flex max-[390px]:flex-col flex-row justify-between items-center gap-3 mt-4">
            <Button
              type="button"
              className="px-4 py-0! h-10 font-semibold text-[12px]! sm:text-[16px]! bg-(--black)! rounded-[3px]! w-full md:w-auto"
            >
              {TEXT.EXTERNAL_ADD_BUTTON}
            </Button>

            <Button
              type="submit"
              className="px-4 py-0! h-10 font-semibold text-[12px]! sm:text-[16px]! rounded-[3px]! w-full md:w-auto"
            >
              {TEXT.ADD_NOTE}
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Notes Section */}
      <div className="mt-6 bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
          {TEXT.EXISTING_NOTE}
        </h2>

        {notes.map((note) => (
          <div
            key={note.id}
            className="border border-(--borderGray) rounded-[3px] p-5 mb-4 bg-(--bgBoxColor)"
          >
            <div className="flex gap-2 mb-3">
              <div className="sm:w-10 sm:h-10 w-10 h-10  rounded-full overflow-hidden border border-(--grayShadeborder) ">
                <Image
                  src={images.profile}
                  alt="Profile image"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
              <div>
                <div className="font-semibold text-[15px] text-(--black)">
                  {note.author}
                </div>
                <div className="font-normal text-[13px] text-(--darkblue) mb-2">
                  {note.time}
                </div>
              </div>
            </div>

            <p className="font-medium text-[12px] text-[#535353]">
              {note.message}
            </p>

            {/* EXTRA BOX IF EXISTS */}
            {note.extraBox && (
              <div className="border-[0.3px] border-(--bgColorBox) bg-(--white) rounded-sm p-3 my-4">
                <div className="font-medium text-[10px] text-(--lightText) mb-2">
                  Reply by Patient
                </div>
                <div className="font-medium text-[10px] text-(--lightBlack)">
                  {note.extraBox}
                </div>
              </div>
            )}

            {/* REPLY SECTION */}
            {note.showReplyButton && (
              <div className="flex items-center justify-between mt-2">
                <p className="font-medium text-[13px] text-(--lightBlack) flex items-center gap-2">
                  <Icons.FaReply className="w-4 h-4 shrink-0" />{" "}
                  {note.replyText}
                </p>
                <button
                  className="text-(--darkblue) font-medium text-[13px] flex items-center gap-2 mt-8 sm:mt-0 cursor-pointer"
                  onClick={() => {
                    setReplyModalOpen(true);
                  }}
                >
                  <Icons.FaReply /> {TEXT.REPLY}
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-4 cursor-pointer text-(--darkblue) font-semibold text-[14px] sm:text-[18px]">
          {TEXT.VIEW_ALL}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex sm:flex-row flex-col justify-around gap-4 mt-6">
        <Button
          type="button"
          className="lg:px-4 font-semibold text-[12px]! lg:text-[16px]! rounded-lg w-full"
        >
          <Icons.SlCalender className="inline-block mr-2 w-5 h-5 mb-[3px]" />
          {TEXT.SCHEDULE}
        </Button>
        <Button
          type="button"
          className="lg:px-4 font-semibold text-[12px]! lg:text-[16px]! rounded-lg w-full"
        >
          <Icons.BsChatText className="inline-block mr-2 w-5 h-5 mb-[3px]" />
          {TEXT.FAMILY_CHAT}
        </Button>
        <Button
          type="button"
          className="px-2 lg:px-4 font-semibold text-[12px]! lg:text-[16px]! rounded-lg w-full"
          onClick={() => {
            setIsInviteFamilyModalOpen(true);
          }}
        >
          <Icons.RiAddLargeFill className="inline-block mr-2 w-5 h-5 mb-[3px]" />
          {TEXT.INVITE_FRIEND}
        </Button>
      </div>

      {/* Agreement section */}
      <div className="mt-6 bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-5">
        <h2 className="flex items-center gap-2 font-semibold text-[16px] sm:text-[18px] text-(--blackshade)">
          <Icons.MdOutlineFileUpload className="text-(--darkblue) w-5 h-5" />
          {TEXT.MEDICAL_SHARE}
        </h2>

        <p className="font-normal text-[14px] text-(--blackshade) mb-4 mt-2">
          You are about to invite Test (Friend) to view your medical update and
          participate in this chat.
        </p>

        <div
          className="flex gap-3 items-start bg-(--bgBoxColor) border border-(--borderGray)
p-2 sm:p-4 rounded-[5px] font-normal text-[12px] sm:text-[14px] text-(--blackShade) mb-5"
        >
          <Icons.MdOutlineFileUpload className="text-(--darkblue) w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />

          <span>
            By approving this invitation, you consent to share your medical
            updates, treatment information, and care progress with test
          </span>
        </div>

        <h3 className="font-semibold text-[16px] text-(--black) mb-2">
          {TEXT.ABLE_TEXT}
        </h3>
        <ul className="list-disc ml-6 font-normal text-[14px] text-(--blackshade) space-y-1 mb-6">
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
          <li>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s,
          </li>
          <li>
            When an unknown printer took a galley of type and scrambled it to
            make a type specimen book.
          </li>
        </ul>

        <Button
          type="submit"
          className="px-4 py-0! h-10 font-semibold text-[16px]! rounded-[3px]! w-full max-w-[210px]"
        >
          {TEXT.SEND_INVITE}
        </Button>
      </div>
      <InviteFamilyModal
        open={isInviteFamilyModalOpen}
        onClose={() => setIsInviteFamilyModalOpen(false)}
      />
      <ReplyModal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
      />
      <CreateNoteModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
      />
    </div>
  );
}
