import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import Image from "next/image";

//------function for home page about section----------
export default function HomeAboutSection() {
  return (
    <div>
      <div className="bg-(--lightblue)">
        <div className="section-container sm:py-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center md:justify-start">
            <Image
              src={images.aboutService}
              alt="about-section"
              width={411}
              height={473}
              className="rounded-[40px] w-full max-w-[411px] sm:h-[473px] h-auto"
            />
          </div>

          <div className="mx-auto">
            <p className="font-semibold text-[16px] sm:text-[22px] text-(--lightBlack) mb-2">
              {TEXT.ABOUT}
            </p>
            <h2 className="font-semibold text-[20px] sm:text-[45px] text-(--lightBlack) mb-4 sm:leading-[45px] leading-[23px]">
              Advanced primary care services
            </h2>
            <p className="text-(--grayshade) font-normal text-[14px] sm:text-[15px] mb-6">
              Bringing precision, empathy, and technology together to create the
              next generation of primary care.
            </p>
            <Image
              src={images.service}
              alt="doctor-service"
              width={513}
              height={473}
              className="rounded-[40px] w-full max-w-[513px] h-auto"
            />
          </div>
        </div>
      </div>

      <div className="section-container sm:py-12 py-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
        <div className="order-2 md:order-1 xl:ml-[-36px]!">
          <Image
            src={images.about}
            alt="patient-care"
            width={589}
            height={600}
            className="rounded-[15px] w-full max-w-[589px] h-auto"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="font-bold text-[20px] sm:text-[35px] text-(--lightBlack) mb-4">
            Data-driven empathy for better patient outcomes.
          </h2>
          <p className="font-medium text-[14px] sm:text-[16px] text-(--darkgray) sm:leading-[39px] leading-[30px]">
            At the heart of Sophia lies a simple truth: communication is the
            key. That’s why we combine different technologies to give clinicians
            insights that feel intuitive and human-centered helping transform
            fragmented communication into clearer decisions, better outcomes,
            and a more empathetic kind of healthcare.
          </p>
        </div>
      </div>
    </div>
  );
}
