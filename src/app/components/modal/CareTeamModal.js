import { Icons } from "@/app/utils/Icons";
import { filteredDoctorsList } from "@/app/utils/MockData";
import { useState } from "react";
import Button from "../ui/Button";
import { TEXT } from "@/app/utils/Text";
import CommonSearchInput from "../ui/CommonSearchInput";

//-------------Care team modal selection-------------
export default function CareTeamModal({ open, onClose }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");

  const filteredDoctors = filteredDoctorsList.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = async (text) => {
    setSearch(text);
  };

  const handleAddClick = async () => {
    if (!selectedDoctor) return;

    try {
      onClose();
    } catch (error) {
      console.error("Failed to add doctor", error);
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50 overflow-y-auto scrollbar-hide pt-12">
          <div className="w-full max-w-[582px] rounded-[10px] bg-white shadow-xl overflow-hidden animate-fadeIn p-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E3E3]">
              <h2 className="font-semibold text-[18px] text-(--black)">
                {TEXT.CARE_TEAM}
              </h2>
              <Icons.ImCross onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="font-normal text-[16px] text-center text-(--darkgray) w-full max-w-[427px] mx-auto my-6">
              {TEXT.DOCTOR_SELECTION}
            </p>

            {/* Search */}
            <div className="mt-4 mb-6">
              <CommonSearchInput
                value={search}
                onChange={handleSearch}
                placeholder={TEXT.SEARCH_CARE}
                icon={Icons.IoSearchOutline}
                className="font-medium text-[14px] bg-(--searchColor)"
              />
            </div>

            {/* Doctor List */}
            <div className="max-h-90 overflow-y-auto pb-4 space-y-4 scrollbar-hide">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className={`border-[0.5px] border-(--grayShadeborder) rounded-xl p-4 cursor-pointer flex justify-between items-center shadow-(--user-box) transition-all ${
                    selectedDoctor?.id === doc.id
                      ? "bg-(--blueBoxColor)"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <div>
                    <p
                      className={`font-semibold text-[16px] ${
                        selectedDoctor?.id === doc.id
                          ? "text-(--darkblue)"
                          : "text-black"
                      }`}
                    >
                      {doc.name}
                    </p>
                    <p className="text-(--darkblue) font-semibold text-[13px] my-1">
                      {doc.specialty}
                    </p>
                    <p
                      className={`font-medium text-[13px] ${
                        selectedDoctor?.id === doc.id
                          ? "text-(--darkblue)"
                          : "text-(--darkgray)"
                      } `}
                    >
                      {doc.phone}
                    </p>
                  </div>

                  {/* Radio Button */}
                  <div className="flex items-center gap-2">
                    {selectedDoctor?.id === doc.id && (
                      <span className="font-medium text-[15px] text-(--darkblue)">
                        {TEXT.MAKE_PRIMARY}
                      </span>
                    )}

                    <input
                      type="radio"
                      checked={selectedDoctor?.id === doc.id}
                      onChange={() => setSelectedDoctor(doc)}
                      className="h-5 w-5 accent-(--darkblue)"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex sm:flex-row flex-col justify-around gap-4 mt-6 mb-4">
              <Button
                type="submit"
                onClick={handleAddClick}
                className="px-4 font-semibold text-[16px]! rounded-[100px] w-full"
              >
                {TEXT.ADD_DOCTOR}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="px-4 font-semibold text-[16px]! rounded-[100px] w-full bg-(--buttonBg)! text-(--darkgray)!"
              >
                {TEXT.CANCEL}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
