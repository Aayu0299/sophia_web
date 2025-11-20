"use client";

import DashboardLayout from "@/app/components/appComponent/dashboard/Dashboardlayout";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { role } = useParams();

  return <DashboardLayout role={role} />;
}
