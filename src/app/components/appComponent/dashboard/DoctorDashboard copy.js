import { caregiversList, doctorsList, patients } from "@/app/utils/MockData";
import React, { useState } from "react";
import Button from "../../ui/Button";
import { Icons } from "@/app/utils/Icons";

//------function for doctor dashboard--------------
export default function DoctorDashboard() {
  const [includeDischarged, setIncludeDischarged] = useState(false);

  return (
    <div className="min-h-screen mt-2">
      <div className="flex flex-wrap justify-between items-center p-4 mb-4 gap-3 bg-(--boxBgColor) border border-(--borderTextarea)">
        <div className="flex items-center gap-2 ">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="font-medium text-[16px] text-(--black)">
              Include discharged patients
            </span>
            <div
              onClick={() => setIncludeDischarged(!includeDischarged)}
              className={`w-12 h-6 rounded-full p-1 transition ${
                includeDischarged ? "bg-(--darkblue)" : "bg-(--toggleGray)"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  includeDischarged ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
          <span className="text-(--grayshade) font-medium text-[16px]">
            3 of 4 patients • 3 admitted
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="px-3 py-2! font-medium text-[12px]! lg:text-[16px]! rounded-[100px]! w-full max-w-[157px]! bg-white! text-black! shadow-(--boxshadow-button) border-[0.5px] border-(--graycolor)"
          >
            <Icons.RiAddLargeFill className="inline-block mr-2 w-5 h-5 mb-[3px]" />
            Scan Patient
          </Button>
          <Button
            type="button"
            className="px-3 py-2! font-medium text-[12px]! lg:text-[16px]! rounded-[100px]! w-full max-w-[157px]!"
          >
            <Icons.RiAddLargeFill className="inline-block mr-2 w-5 h-5 mb-[3px]" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="space-y-4">
        {patients.map((p) => (
          <div key={p.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-start gap-4">
              <img
                src={p.avatar}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">{p.name}</h2>
                    <p className="text-gray-600 text-sm">
                      {p.room} • Admitted {p.admitted}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        {p.status}
                      </span>
                      {p.pending > 0 && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                          {p.pending} Pending note
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 lg:mt-0">
                    <button className="px-3 py-1 border rounded">Doctor</button>
                    <button className="px-3 py-1 border rounded">Family</button>
                    <button className="px-3 py-1 border rounded">
                      + Add Schedule
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-blue-50 rounded border text-sm text-gray-700">
                  <strong>AI Summary - Patient History</strong>
                  <p>{p.summary}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-4 text-(--darkblue) font-semibold cursor-pointer">
        VIEW ALL
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Doctors */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-3">Doctors List</h3>
          <div className="space-y-3">
            {doctorsList.map((d, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={d.avatar} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-gray-600 text-sm">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3 text-(--darkblue) cursor-pointer">
            VIEW ALL
          </div>
        </div>

        {/* Caregivers */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-3">Caregivers List</h3>
          <div className="space-y-3">
            {caregiversList.map((c, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={c.avatar} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-gray-600 text-sm">{c.role}</p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    c.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3 text-(--darkblue) cursor-pointer">
            VIEW ALL
          </div>
        </div>
      </div>
    </div>
  );
}
