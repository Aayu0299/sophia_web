import Image from "next/image";
import { images } from "@/app/utils/Images";
import { Icons } from "@/app/utils/Icons";
import Link from "next/link";
import { ROUTES } from "@/app/utils/Constant";

//--------funtion for after login header--------
export default function AuthHeader({ setOpen }) {
  return (
    <header className="w-full bg-white border-b border-(--graycolor)">
      <div className="mx-auto px-4 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={ROUTES.HOME}>
            <Image
              src={images.logo}
              alt="Sophia logo"
              width={169}
              height={50}
              priority
              className="w-full  sm:max-w-[169px] h-auto cursor-pointer"
            />
          </Link>
          {/* -------- Mobile Top Bar with Hamburger -------- */}
          <div className="md:hidden w-full h-14 flex items-center">
            <button onClick={() => setOpen(true)}>
              <Icons.CgMenuRound className="w-7 h-7 text-(--redshade)" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="sm:w-[50px] sm:h-[50px] w-10 h-10  rounded-full overflow-hidden border border-(--grayShadeborder) ">
            <Image
              src={images.profile}
              alt="Profile image"
              width={50}
              height={50}
              priority
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>

          <button className="relative sm:w-[50px] sm:h-[50px] w-10 h-10 flex items-center justify-center rounded-full border border-(--grayShadeborder) bg-(--bgColor)">
            <Icons.FaBell className="w-5 h-5 text-(-iconColor)" />

            <span className="absolute -top-1 -right-1 bg-[--redshade] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
