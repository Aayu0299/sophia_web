import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";

//-----function for footer---------
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const range = `${currentYear}-${nextYear}`;

  return (
    <div className="bg-(--lightgray) ">
      <div className="section-container p-4 flex justify-between items-center">
        <Image
          src={images.logo}
          alt="Sophia-logo"
          layout="responsive"
          priority
          style={{ cursor: "pointer" }}
          className="w-full max-w-[100px]!"
        />
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
