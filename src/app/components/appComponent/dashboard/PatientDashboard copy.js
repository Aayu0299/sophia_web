import { Icons } from "@/app/utils/Icons";
import { images } from "@/app/utils/Images";
import Image from "next/image";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen">
      {/* Top Card */}
      <div className="bg-white [box-shadow:var(--shadow-form)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5">
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

          <span className="flex items-center gap-3 bg-green-100 text-(--lightGreen) px-4 py-2 rounded-[40px] font-medium text-[16px]">
            <Icons.LuUserCheck /> Admitted
          </span>
        </div>
        {/* Room & Contacts */}
        <div className="grid sm:grid-cols-3 gap-4 bg-(--lightBlack) text-white p-4 text-center">
          <div>
            <p className="font-medium text-[12px] text-[#D8D8D8]">Room</p>
            <p className="font-medium text-[14px]">101-A</p>
          </div>
          <div>
            <p className="font-medium text-[12px] text-[#D8D8D8]">Contact</p>
            <p className="font-medium text-[14px]">(555) 123-4567</p>
          </div>
          <div>
            <p className="font-medium text-[12px] text-[#D8D8D8]">
              Emergency contact
            </p>
            <p className="font-medium text-[14px]">
              John Johnson (555) 987-6543
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-6">
          <h2 className="text-lg font-semibold mb-4">Consulting</h2>
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

      {/* Patient History */}
      <div className="mt-8 bg-white rounded-[5px] [box-shadow:var(--shadow-form)] p-6">
        <h2 className="text-lg font-semibold mb-6">Patient History</h2>

        <div className="border rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="font-medium">Note - Patient Update</p>
            <span className="text-sm text-gray-500">Sat 15 Oct 09:32 AM</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Patient examination completed successfully. Meachel is doing much
            better today – her blood pressure is stable at 135/85, down from the
            initial 180/110. She reports that the chest pain has completely
            resolved and she’s feeling much more comfortable. Her glucose levels
            are showing improvement with the medication adjustments we made
            yesterday. She’s been ambulating well and appears ready for
            discharge planning.
          </p>
          <p className="text-(--darkblue) font-semibold mt-3">
            Dr. Michael Roberts, Cardiologist
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium">Voice Note - Patient Update</p>
            <span className="text-sm text-gray-500">Sun 16 Oct 09:32 AM</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg w-full sm:w-auto">
              <span className="text-(--darkblue) text-xl">🎤</span>
              <p className="font-medium">
                Voice Mail{" "}
                <span className="text-gray-500 text-sm">(52 sec)</span>
              </p>
              <button className="ml-auto bg-blue-600 text-white px-3 py-2 rounded-full">
                ▶
              </button>
            </div>
          </div>

          <p className="text-(--darkblue) font-semibold mt-3">
            Dr. Michael Roberts, Cardiologist
          </p>
        </div>
      </div>

      <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">
        {/* Add Note Section */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Add Note for Care Team
            </h2>
            <button className="text-blue-600 font-medium">Add Note</button>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            Ask a question that you’d like addressed during the next caregiver
            visit.
          </p>

          <textarea
            placeholder="What would you like to ask the Care Team"
            className="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          ></textarea>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-4">
            <button className="px-4 py-2 bg-black text-white rounded-lg w-full md:w-auto">
              Add External Files
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full md:w-auto">
              Add Note
            </button>
          </div>
        </div>

        {/* Existing Notes Section */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Existing Notes
          </h2>

          {/* Note 1 */}
          <div className="border rounded-xl p-4 mb-4">
            <div className="font-semibold text-gray-800">Sarah (You)</div>
            <div className="text-xs text-gray-500 mb-2">Today, 9:15 AM</div>
            <p className="text-sm text-gray-700 mb-2">
              I've been experiencing some dizziness when I stand up. Is this
              related to my blood pressure medication?
            </p>
          </div>

          {/* Note 2 */}
          <div className="border rounded-xl p-4 mb-4">
            <div className="font-semibold text-gray-800">Dr. Johnson</div>
            <div className="text-xs text-gray-500 mb-2">Today, 11:30 AM</div>
            <p className="text-sm text-gray-700 mb-3">
              The dizziness could be related to your medication. I’ll review
              your dosage during my next visit. In the meantime, please stand up
              slowly and stay hydrated.
            </p>

            <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700 mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-blue-600">
                Responding to your question about dizziness
              </p>
              <button className="text-blue-600 text-sm font-medium">
                Reply
              </button>
            </div>
          </div>

          {/* Note 3 */}
          <div className="border rounded-xl p-4 mb-4">
            <div className="font-semibold text-gray-800">Mom</div>
            <div className="text-xs text-gray-500 mb-2">Yesterday, 2:45 PM</div>
            <p className="text-sm text-gray-700">
              Sarah mentioned she’s been having trouble sleeping. Could this be
              affecting her recovery?
            </p>
          </div>

          <div className="text-center mt-4">
            <button className="text-blue-600 font-semibold">VIEW ALL</button>
          </div>
        </div>

        {/* Footer Buttons */}
        {/* <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-around md:static md:mt-6 md:bg-transparent md:shadow-none">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full max-w-xs">
            Schedule
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full max-w-xs">
            Family & Friend Chat
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full max-w-xs">
            Invite Friend
          </button>
        </div> */}
      </div>

      {/* <div className="w-full bg-gray-100 p-4 md:p-8">
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 text-lg">📤</span>
            <h2 className="text-lg font-semibold text-gray-800">
              Medical data sharing consent
            </h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            You are about to invite Test (Friend) to view your medical update
            and participate in this chat.
          </p>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-gray-700 mb-5">
            By approving this invitation, you consent to share your medical
            updates, treatment information, and care progress with test.
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">
            They will be able to
          </h3>
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1 mb-6">
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

          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium">
            I Agree - Send Invite
          </button>
        </div>
      </div> */}
    </div>
  );
}
