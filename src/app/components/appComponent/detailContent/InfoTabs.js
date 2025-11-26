import { TEXT } from "@/app/utils/Text";
import React from "react";

export default function InfoTabs({ activeTab, setActiveTab, tabLabels }) {
  return (
    <div className="h-[60px] w-full shadow-[0px_2px_6px_0px_#0000002E] px-5 flex items-end">
      <div className="flex justify-center items-center h-full w-full relative">
        {/* BASIC TAB */}
        <button
          onClick={() => setActiveTab("basic")}
          className={`flex-1 text-center py-[18px] text-[13px] sm:text-[16px] font-medium relative
            ${activeTab === "basic" ? "text-(--black)" : "text-(--darkgray)"}
        `}
        >
          {tabLabels} {TEXT.BASIC_INFO}
          {activeTab === "basic" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-(--darkblue)" />
          )}
        </button>

        {/* DIVIDER */}
        <div className="w-px h-[22px] bg-(--tbordergray) absolute left-1/2 top-1/2 -translate-y-1/2"></div>

        {/* OTHER TAB */}
        <button
          onClick={() => setActiveTab("other")}
          className={`flex-1 text-center py-[18px] text-[13px] sm:text-[16px] font-medium relative
            ${activeTab === "other" ? "text-(--black)" : "text-(--darkgray)"}
        `}
        >
          {tabLabels} {TEXT.OTHER_INFO}
          {activeTab === "other" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-(--darkblue)" />
          )}
        </button>
      </div>
    </div>
  );
}
