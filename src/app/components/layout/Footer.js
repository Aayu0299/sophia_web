import { ROUTES } from "@/app/utils/Constant";
import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";
import Link from "next/link";

//-----function for footer---------
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const range = `${currentYear}-${nextYear}`;

  return (
    <div className="bg-(--lightgray) z-40 ">
      <div className="section-container p-4 flex justify-between items-center">
        <Link href={ROUTES.HOME} className="w-full max-w-[100px]! h-auto">
          <Image
            src={images.logo}
            alt="Sophia logo"
            layout="responsive"
            priority
            style={{ cursor: "pointer" }}
            className="w-full max-w-[100px]! h-auto"
          />
        </Link>
        <p className="font-semibold text-[13px] text-(--lightBlack) gap-3 flex max-[400px]:flex-col">
          <span className="cursor-pointer hover:text-(--darkblue)">
            {TEXT.PRIVACY}
          </span>
          <span className="cursor-pointer hover:text-(--darkblue)">
            {TEXT.TERMS}
          </span>
        </p>
      </div>
      <div className="bg-(--black) text-(--white) font-medium text-[13px] text-center py-4">
        © {range} {TEXT.FOOTER_TEXT}
      </div>
    </div>
  );
}
