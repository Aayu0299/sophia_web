"use client";
import { useState } from "react";
import DashboardSidebar from "../../layout/DashboardSidebar";
import AuthHeader from "../../layout/AuthHeader";
import PatientDashboard from "./PatientDashboard";

//--------funtion for dashboard layout--------
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-(--lightblue)">
      <div className="fixed top-0 left-0 right-0 z-50">
        <AuthHeader setOpen={setOpen} />
      </div>

      <div className="flex flex-1 pt-[70px]">
        <div className="hidden md:block fixed left-0 top-[70px] h-[calc(100vh-70px)] bg-white">
          <DashboardSidebar open={open} setOpen={setOpen} />
        </div>

        {open && (
          <div className="md:hidden fixed top-0 left-0 w-[250px] h-full bg-white z-50 shadow-lg">
            <DashboardSidebar open={open} setOpen={setOpen} />
          </div>
        )}

        <div className="flex-1 md:ml-[250px] overflow-y-auto p-6">
          <PatientDashboard />
        </div>
      </div>
    </div>
  );
}
