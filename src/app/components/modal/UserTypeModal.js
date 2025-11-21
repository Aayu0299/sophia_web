import { TEXT } from "@/app/utils/Text";
import Button from "../ui/Button";
import Image from "next/image";
import { Icons } from "@/app/utils/Icons";
import { userTypeOptions } from "@/app/utils/MockData";

//------function for select user type modal--------------
export default function UserTypeModal({
  open,
  onClose,
  onSelect,
  selected,
  onApply,
}) {
  if (!open) return null;

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[582px] rounded-[10px] bg-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3E3]">
              <h2 className="font-semibold text-[18px] text-(--black)">
                {TEXT.SELECT_USERTYPE}
              </h2>
              <Icons.ImCross onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="font-normal text-[16px] text-center text-(--darkgray) w-full max-w-[427px] mx-auto p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <div className="grid grid-cols-2 gap-3 p-6">
              {userTypeOptions.map((opt) => {
                const isActive = selected === opt.label;
                return (
                  <button
                    key={opt.key}
                    onClick={() => onSelect(opt.label)}
                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-sm font-medium [box-shadow:var(--user-box)] cursor-pointer ${
                      isActive
                        ? "border-((--darkblue)) bg-(--darkblue) text-white"
                        : "border-gray-200 bg-white text-(--black)"
                    }`}
                  >
                    <Image
                      src={isActive ? opt.activeIcon : opt.icon}
                      alt={`${opt.label} icon`}
                      width={50}
                      height={50}
                      className={`transition-transform duration-200 hover:scale-105 ${
                        isActive ? "brightness-0 invert" : ""
                      }`}
                    />
                    <span className="font-semibold text-[16px] text-(--lightblack)">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <Button
              type="submit"
              onClick={onApply}
              className="rounded-[100px] max-w-[260px] mx-auto m-6"
            >
              {TEXT.SUBMIT}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
