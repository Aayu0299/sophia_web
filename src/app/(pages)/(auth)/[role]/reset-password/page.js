"use client";

import ResetPassword from "@/app/components/authComponent/ResetPassword";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { role } = useParams();

  return <ResetPassword role={role} />;
}
