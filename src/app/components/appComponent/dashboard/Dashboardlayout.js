"use client";
import { useState } from "react";
import DashboardSidebar from "../../layout/DashboardSidebar";
import AuthHeader from "../../layout/AuthHeader";
import PatientDashboard from "./PatientDashboard";

//--------funtion for dashboard layout--------
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AuthHeader setOpen={setOpen} />
      <div className="md:grid md:grid-cols-[250px_1fr] bg-(--lightblue)">
        {/* Sidebar */}
        <DashboardSidebar open={open} setOpen={setOpen} />

        {/* Right Content */}
        <div className="p-6 bg-(--lightblue)">
          <PatientDashboard />
        </div>
      </div>
    </div>
  );
}
