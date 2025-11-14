"use client";
import { Icons } from "@/app/utils/Icons";
import Button from "../../ui/Button";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/app/utils/Constant";
import { images } from "@/app/utils/Images";
import { TEXT } from "@/app/utils/Text";
import { useRouter } from "next/navigation";

//---------function for signup form invite details page-------------
export default function SignUpInviteDetail({ role, isPatientOrFamily }) {
  const router = useRouter();

  return (
    <div className="w-full sm:mt-8 xl:p-[30px]">
      <div className="sm:flex items-center mb-10 hidden">
        <Button
          onClick={() => router.push(`/${role}/${ROUTES.LOGIN}`)}
          className="rounded-md font-bold! text-[13px]! text-(--white) w-[125px]! h-[35px] py-0! uppercase"
        >
          {TEXT.BACK_SIGNIN}
        </Button>
      </div>

      <div className="mb-8">
        <Link href={ROUTES.HOME} className="hidden sm:block">
          <Image
            src={images.logo}
            alt="Sophia logo"
            width={318}
            height={94}
            priority
            className="w-full max-w-[200px] xl:max-w-[318px] h-auto cursor-pointer my-6"
          />
        </Link>

        <div className="space-y-4">
          <h2 className="font-semibold text-[16px] sm:text-[18px] text-(--blackshade)">
            {TEXT.MEDICAL_TEXT}
          </h2>

          <div className="space-y-2 font-normal text-[16px] leading-relaxed text-(--lightBlack)">
            <p>{TEXT.SOPHIA_JOURNEY}</p>
            <p>
              {TEXT.CONNECT_TEXT}
              <span className="block">{TEXT.SIMPLE_TEXT}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Invitation Details Card */}
      <div className="bg-(--white) p-3 sm:p-6 border border-(--slategray) rounded-xl">
        <h3 className="font-semibold text-[19px] text-(--black) mb-6">
          {TEXT.INVITATION_DETAILS}
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center ">
            <span className="font-medium text-[15px] sm:text-[17px] text-(--grayshade)">
              {TEXT.INVITED_BY} :
            </span>
            <span className="font-medium text-[15px] sm:text-[17px] text-(--lightBlack)">
              Dr. Michael Roberts
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-[15px] sm:text-[17px] text-(--grayshade)">
              {TEXT.YOUR_NAME} :
            </span>
            <span className="font-medium text-[15px] sm:text-[17px] text-(--lightBlack)">
              John Smith
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-[15px] sm:text-[17px] text-(--grayshade)">
              {TEXT.PHONE_NUMBER} :
            </span>
            <span className="font-medium text-[15px] sm:text-[17px] text-(--lightBlack)">
              (555) 123-4567
            </span>
          </div>

          {isPatientOrFamily && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-[15px] sm:text-[17px] text-(--grayshade)">
                {TEXT.ACCESS_TYPE} :
              </span>
              <span className="font-medium text-[15px] sm:text-[17px] text-(--darkblue)">
                Friends & Family
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
