import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import Image from "next/image";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen">
      {/* Top Card */}
      <div className="bg-white [box-shadow:var(--shadow-form)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
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
              <h1 className="font-semibold text-[25px] text-(--black)">
                Meachel Marsh
              </h1>
              <p className="font-normal text-[15px] text-(--lightBlack)">
                Age : <span className="text-(--darkblue)">40 years</span>
              </p>
            </div>
          </div>

          <span className="flex items-center gap-3 w-[135px] bg-green-100 text-(--lightGreen) px-4 py-2 rounded-[40px] font-medium text-[16px]">
            <Icons.LuUserCheck /> Admitted
          </span>
        </div>
        {/* Room & Contacts */}
        <div className="grid sm:grid-cols-3 gap-4 bg-(--lightBlack) text-white p-2 text-center">
          <div className="relative flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">Room</p>
            <p className="font-medium text-[14px]">101-A</p>

            <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-(--borderGray)"></span>
          </div>

          <div className="relative flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">Contact</p>
            <p className="font-medium text-[14px]">(555) 123-4567</p>

            <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-(--borderGray)"></span>
          </div>

          <div className="flex flex-col items-center py-2">
            <p className="font-medium text-[12px] text-(--textGray)">
              Emergency contact
            </p>
            <p className="font-medium text-[14px]">
              John Johnson (555) 987-6543
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-[18px] text-(--blackshade)">
            <Icons.RiStethoscopeLine className="text-(--darkblue)" />
            Consulting
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition">
              <h3 className="text-(--darkblue) font-semibold">
                Dr. Michael Roberts
              </h3>
              <p className="text-gray-600 text-sm">Cardiologist</p>
            </div>
            <div className="border rounded-xl p-4 cursor-pointer hover:bg-blue-50 transition">
              <h3 className="text-(--darkblue) font-semibold">
                Dr. Jennifer Lee
              </h3>
              <p className="text-gray-600 text-sm">Endocrinologist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
