import Image from "next/image";
import { images } from "@/app/utils/Images";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import { useSearchParams } from "next/navigation";

//--------funtion for after login header--------
export default function AuthHeader({ setOpen }) {
  const headerTitles = {
    users: "Users",
    patients: "Patients",
    family: "Family Member",
    doctors: "Doctors",
    caregivers: "Caregivers",
  };
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "users";

  const title = headerTitles[currentTab];

  return (
    <header className="w-full bg-white border-b border-(--graycolor) h-16 sm:h-[70px] flex items-center px-6 shadow-sm">
      {/* PAGE TITLE (LEFT SIDE) */}
      <p className="text-[20px] sm:text-[24px] font-semibold text-(--blackshade)">
        {title}
      </p>

      {/* RIGHT SIDE ITEMS */}
      <div className="ml-auto flex items-center gap-5">
        {/* NOTIFICATION BUTTON */}
        <button className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-(--sidebarText) bg-(--bgColor)">
          <Icons.FaBell className="w-5 h-5 text-(--blackshade)" />
        </button>

        {/* PROFILE IMAGE */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-(--darkblue)">
          <Image
            src={images.profile}
            alt="Profile image"
            width={50}
            height={50}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>

        {/* HAMBURGER - MOBILE ONLY */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Icons.CgMenuRound className="w-7 h-7 text-(--darkblue)" />
        </button>
      </div>
    </header>
  );
}
