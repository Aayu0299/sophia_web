"use client";
import { useState } from "react";
import DashboardSidebar from "../../layout/DashboardSidebar";
import AuthHeader from "../../layout/AuthHeader";
import PatientDashboard from "./PatientDashboard";

//--------funtion for dashboard layout--------
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    // <div>
    //   <AuthHeader setOpen={setOpen} />
    //   <div className="md:grid md:grid-cols-[250px_1fr] bg-(--lightblue)">
    //     {/* Sidebar */}
    //     <DashboardSidebar open={open} setOpen={setOpen} />

    //     {/* Right Content */}
    //     <div className="p-6 bg-(--lightblue)">
    //       <PatientDashboard />
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-(--lightblue) flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <AuthHeader setOpen={setOpen} />
      </header>

      {/* Main Layout */}
      <div className="flex pt-20 h-screen overflow-hidden">
        {/* Sidebar (fixed height + scroll) */}
        <aside className="hidden md:block w-[250px] bg-white shadow-md h-full overflow-y-auto sticky top-20">
          <DashboardSidebar open={open} setOpen={setOpen} />
        </aside>

        {/* Mobile Sidebar (Overlay)*/}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-20 left-0 h-[calc(100vh-80px)] w-[250px] bg-white shadow-md z-50 transform md:hidden transition-transform duration-300 overflow-y-auto ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardSidebar open={open} setOpen={setOpen} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <PatientDashboard />
        </main>
      </div>
    </div>
  );
}
